import { createClient } from "https://esm.sh/@supabase/supabase-js@2.96.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Deriv WebSocket helper
async function derivApiCall(appId: string, token: string, request: Record<string, unknown>): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${appId}`);
    let authorized = false;
    const timeout = setTimeout(() => {
      ws.close();
      reject(new Error("Deriv API timeout"));
    }, 30000);

    ws.onopen = () => {
      // Authorize first
      ws.send(JSON.stringify({ authorize: token }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.error) {
        clearTimeout(timeout);
        ws.close();
        reject(new Error(`Deriv API error: ${data.error.message} (${data.error.code})`));
        return;
      }

      if (data.msg_type === "authorize") {
        authorized = true;
        // Now send the actual request
        ws.send(JSON.stringify(request));
        return;
      }

      // Got our response
      clearTimeout(timeout);
      ws.close();
      resolve(data);
    };

    ws.onerror = (err) => {
      clearTimeout(timeout);
      reject(new Error(`WebSocket error: ${err}`));
    };
  });
}

// Normalize lot to Deriv constraints
function normalizeLot(lot: number, minLot = 0.01, maxLot = 100, step = 0.01): number {
  let normalized = Math.round(lot / step) * step;
  normalized = parseFloat(normalized.toFixed(8));
  if (normalized < minLot) normalized = minLot;
  if (normalized > maxLot) normalized = maxLot;
  return normalized;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const derivAppId = Deno.env.get("DERIV_APP_ID") || "1089";
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  try {
    const { trade_event_id } = await req.json();

    if (!trade_event_id) {
      return new Response(
        JSON.stringify({ error: "Missing trade_event_id" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Fetch the trade event
    const { data: event, error: evErr } = await supabase
      .from("trade_events")
      .select("*")
      .eq("id", trade_event_id)
      .single();

    if (evErr || !event) {
      return new Response(
        JSON.stringify({ error: "Trade event not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (event.status !== "pending") {
      return new Response(
        JSON.stringify({ status: "already_processed", event_status: event.status }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Fetch master account with multiplier
    const { data: masterAccount } = await supabase
      .from("mt5_accounts")
      .select("id, registration_id, multiplier, copy_enabled")
      .eq("id", event.master_id)
      .single();

    if (!masterAccount) {
      await markEventError(supabase, trade_event_id, "Master account not found");
      return new Response(
        JSON.stringify({ error: "Master account not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Find active copy links for this master
    const { data: copyLinks } = await supabase
      .from("copy_links")
      .select("*, slave_reg:slave_registration_id(id)")
      .eq("master_registration_id", masterAccount.registration_id)
      .eq("status", "active");

    if (!copyLinks || copyLinks.length === 0) {
      await supabase
        .from("trade_events")
        .update({ status: "no_slaves", processed_at: new Date().toISOString() })
        .eq("id", trade_event_id);
      return new Response(
        JSON.stringify({ status: "no_active_slaves" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const results: Record<string, unknown>[] = [];

    for (const link of copyLinks) {
      // Get slave MT5 account
      const { data: slaveAccount } = await supabase
        .from("mt5_accounts")
        .select("id, mt5_login, deriv_token_encrypted, status")
        .eq("registration_id", link.slave_registration_id)
        .eq("status", "created")
        .single();

      if (!slaveAccount || !slaveAccount.deriv_token_encrypted) {
        const logEntry = {
          trade_event_id,
          master_id: masterAccount.id,
          slave_id: slaveAccount?.mt5_login || "unknown",
          event_type: event.event_type,
          symbol: event.symbol,
          master_ticket: event.ticket,
          execution_status: "error",
          error_message: "Slave account not found or missing Deriv token",
          error_code: "NO_SLAVE_TOKEN",
        };
        await supabase.from("execution_logs").insert(logEntry);
        results.push({ slave: link.slave_registration_id, error: "no_token" });
        continue;
      }

      const slaveToken = slaveAccount.deriv_token_encrypted; // TODO: decrypt if encrypted
      const multiplier = masterAccount.multiplier || 1;

      try {
        let execResult: Record<string, unknown> = {};
        let slaveTicket: string | null = null;
        const masterLot = event.lot || 0.01;
        const slaveLot = normalizeLot(masterLot * multiplier);

        if (event.event_type === "open") {
          // Open a new position on slave
          const buyOrSell = (event.direction || event.order_type || "buy").toLowerCase();
          const isBuy = buyOrSell.includes("buy");

          const request: Record<string, unknown> = {
            buy: isBuy ? "1" : undefined,
            sell: !isBuy ? "1" : undefined,
            mt5_new_account: undefined, // Not needed
          };

          // Use Deriv mt5_deal for MT5 trade execution
          const dealRequest: Record<string, unknown> = {
            trading_platform_mt5_new_order: 1,
            account_type: "real", // or demo
            market_type: "all",
            symbol: event.symbol,
            volume: slaveLot,
            order_type: isBuy ? "buy" : "sell",
          };

          // For Deriv, we use the contract trading API 
          // Actually for MT5 on Deriv, trades go through the MT5 platform directly
          // We'll use a simplified approach: store the intent and let an external executor handle it
          
          // Alternative: Use Deriv's trading_platform_mt5_password_reset? No.
          // The Deriv WebSocket API doesn't directly place MT5 trades.
          // Instead, we record the trade mapping and use the slave's credentials.
          
          // For now, create the trade mapping for an external copier to pick up
          const { data: mapping, error: mapErr } = await supabase
            .from("trade_mappings")
            .insert({
              master_id: masterAccount.id,
              master_ticket: event.ticket,
              master_position_id: event.position_id,
              symbol: event.symbol,
              master_lot: masterLot,
              slave_lot: slaveLot,
              multiplier_used: multiplier,
              slave_id: slaveAccount.mt5_login,
              mapping_status: "pending_open",
              opened_at: new Date().toISOString(),
            })
            .select("id")
            .single();

          execResult = { mapping_id: mapping?.id, action: "open", slave_lot: slaveLot };
          
        } else if (event.event_type === "close") {
          // Find and close the corresponding slave trade
          const { data: mapping } = await supabase
            .from("trade_mappings")
            .select("*")
            .eq("master_id", masterAccount.id)
            .eq("master_ticket", event.ticket)
            .eq("mapping_status", "open")
            .single();

          if (mapping) {
            await supabase
              .from("trade_mappings")
              .update({
                mapping_status: "pending_close",
                closed_at: new Date().toISOString(),
              })
              .eq("id", mapping.id);

            slaveTicket = mapping.slave_ticket;
            execResult = { mapping_id: mapping.id, action: "close", slave_ticket: slaveTicket };
          } else {
            execResult = { action: "close", error: "no_mapping_found" };
          }

        } else if (event.event_type === "modify") {
          // Update SL/TP on slave
          const { data: mapping } = await supabase
            .from("trade_mappings")
            .select("*")
            .eq("master_id", masterAccount.id)
            .eq("master_ticket", event.ticket)
            .eq("mapping_status", "open")
            .single();

          if (mapping) {
            execResult = {
              mapping_id: mapping.id,
              action: "modify",
              slave_ticket: mapping.slave_ticket,
              new_sl: event.stop_loss,
              new_tp: event.take_profit,
            };
          } else {
            execResult = { action: "modify", error: "no_mapping_found" };
          }
        }

        // Log execution
        await supabase.from("execution_logs").insert({
          trade_event_id,
          master_id: masterAccount.id,
          slave_id: slaveAccount.mt5_login,
          event_type: event.event_type,
          symbol: event.symbol,
          master_ticket: event.ticket,
          slave_ticket: slaveTicket,
          requested_master_lot: masterLot,
          multiplier_used: multiplier,
          calculated_slave_lot: masterLot * multiplier,
          normalized_slave_lot: slaveLot,
          execution_status: "success",
          request_payload: { event_type: event.event_type, symbol: event.symbol },
          response_payload: execResult,
        });

        results.push({ slave: slaveAccount.mt5_login, status: "success", ...execResult });

      } catch (execErr) {
        const errMsg = execErr instanceof Error ? execErr.message : String(execErr);
        await supabase.from("execution_logs").insert({
          trade_event_id,
          master_id: masterAccount.id,
          slave_id: slaveAccount.mt5_login,
          event_type: event.event_type,
          symbol: event.symbol,
          master_ticket: event.ticket,
          requested_master_lot: event.lot,
          multiplier_used: multiplier,
          calculated_slave_lot: (event.lot || 0.01) * multiplier,
          normalized_slave_lot: normalizeLot((event.lot || 0.01) * multiplier),
          execution_status: "error",
          error_message: errMsg,
        });
        results.push({ slave: slaveAccount.mt5_login, status: "error", error: errMsg });
      }
    }

    // Update trade event status
    const allSuccess = results.every((r) => r.status === "success");
    await supabase
      .from("trade_events")
      .update({
        status: allSuccess ? "processed" : "partial",
        processed_at: new Date().toISOString(),
      })
      .eq("id", trade_event_id);

    // Update engine status
    await supabase
      .from("copy_engine_status")
      .upsert({
        master_id: masterAccount.id,
        listener_status: "active",
        execution_status: allSuccess ? "success" : "partial",
        last_trade_detected_at: event.detected_at,
        last_trade_copied_at: new Date().toISOString(),
        heartbeat_at: new Date().toISOString(),
        last_error: allSuccess ? null : JSON.stringify(results.filter((r) => r.status === "error")),
      }, { onConflict: "master_id" });

    return new Response(
      JSON.stringify({ success: true, results }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("copy-execute error:", err);
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

async function markEventError(
  supabase: ReturnType<typeof createClient>,
  eventId: string,
  errorMsg: string
) {
  await supabase
    .from("trade_events")
    .update({ status: "error", processed_at: new Date().toISOString() })
    .eq("id", eventId);
}
