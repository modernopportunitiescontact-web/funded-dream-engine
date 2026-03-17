import { createClient } from "https://esm.sh/@supabase/supabase-js@2.96.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-api-key",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authenticate webhook via API key
    const apiKey = req.headers.get("x-api-key");
    const expectedKey = Deno.env.get("TRADE_WEBHOOK_API_KEY");

    if (!expectedKey || apiKey !== expectedKey) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const {
      master_mt5_login,
      event_type, // "open", "close", "modify"
      ticket,
      position_id,
      symbol,
      order_type, // "buy", "sell"
      direction, // "buy", "sell"
      lot,
      entry_price,
      stop_loss,
      take_profit,
      profit_loss,
    } = body;

    // Validate required fields
    if (!master_mt5_login || !event_type || !ticket) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: master_mt5_login, event_type, ticket" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Find the master MT5 account
    const { data: masterAccount, error: maErr } = await supabase
      .from("mt5_accounts")
      .select("id, registration_id, multiplier, copy_enabled")
      .eq("mt5_login", String(master_mt5_login))
      .eq("status", "created")
      .single();

    if (maErr || !masterAccount) {
      console.error("Master account not found for login:", master_mt5_login);
      return new Response(
        JSON.stringify({ error: "Master account not found", login: master_mt5_login }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Deduplicate: check event_hash
    const eventHash = `${master_mt5_login}_${ticket}_${event_type}`;
    const { data: existing } = await supabase
      .from("trade_events")
      .select("id")
      .eq("event_hash", eventHash)
      .maybeSingle();

    if (existing) {
      return new Response(
        JSON.stringify({ status: "duplicate", event_hash: eventHash }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Insert trade event
    const { data: tradeEvent, error: teErr } = await supabase
      .from("trade_events")
      .insert({
        master_id: masterAccount.id,
        master_mt5_login: String(master_mt5_login),
        event_type,
        ticket: String(ticket),
        position_id: position_id ? String(position_id) : null,
        symbol: symbol || null,
        order_type: order_type || null,
        direction: direction || order_type || null,
        lot: lot || null,
        entry_price: entry_price || null,
        stop_loss: stop_loss || null,
        take_profit: take_profit || null,
        profit_loss: profit_loss || null,
        event_hash: eventHash,
        status: "pending",
        raw_payload: body,
      })
      .select("id")
      .single();

    if (teErr) {
      console.error("Failed to insert trade event:", teErr);
      return new Response(
        JSON.stringify({ error: "Failed to insert trade event", details: teErr.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Trade event recorded: ${eventHash}, id: ${tradeEvent.id}`);

    // Trigger copy-execute function
    try {
      const execUrl = `${supabaseUrl}/functions/v1/copy-execute`;
      await fetch(execUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${serviceRoleKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ trade_event_id: tradeEvent.id }),
      });
    } catch (e) {
      console.error("Failed to trigger copy-execute:", e);
      // Don't fail - event is stored, can be retried
    }

    return new Response(
      JSON.stringify({ success: true, trade_event_id: tradeEvent.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("trade-webhook error:", err);
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
