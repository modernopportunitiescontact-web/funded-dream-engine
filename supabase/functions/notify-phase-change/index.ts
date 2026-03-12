import { createClient } from "https://esm.sh/@supabase/supabase-js@2.96.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const phaseLabels: Record<string, string> = {
  pending: "En attente",
  phase1: "Phase 1",
  phase2: "Phase 2",
  funded: "Funded ✅",
  disqualified: "Disqualifié ❌",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { registration_id, old_status, new_status } = await req.json();

    if (!registration_id || !new_status) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Fetch registration details
    const { data: reg, error: regErr } = await supabase
      .from("registrations")
      .select("*")
      .eq("id", registration_id)
      .single();

    if (regErr || !reg) {
      return new Response(JSON.stringify({ error: "Registration not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const traderEmail = reg.email;
    const traderName = reg.full_name || "Trader";
    const oldLabel = phaseLabels[old_status] || old_status;
    const newLabel = phaseLabels[new_status] || new_status;

    // Build email content based on new phase
    let subject = `Mise à jour de votre compte — ${newLabel}`;
    let body = "";

    if (new_status === "phase2") {
      subject = "🎉 Félicitations ! Vous passez en Phase 2";
      body = `Bonjour ${traderName},\n\nFélicitations ! Vous avez réussi la Phase 1 de votre challenge.\n\nVotre compte passe maintenant en Phase 2. De nouveaux identifiants MT5 vous seront communiqués prochainement.\n\nCapital: $${reg.plan_capital?.toLocaleString()}\nType: ${reg.account_type}\n\nBonne continuation et bon trading !\n\nL'équipe`;
    } else if (new_status === "funded") {
      subject = "🏆 Félicitations ! Votre compte est Funded !";
      body = `Bonjour ${traderName},\n\nExcellent travail ! Vous avez réussi toutes les phases d'évaluation.\n\nVotre compte est maintenant Funded. Vos nouveaux identifiants MT5 seront disponibles sous peu.\n\nCapital: $${reg.plan_capital?.toLocaleString()}\nType: ${reg.account_type}\n\nBienvenue parmi nos traders financés !\n\nL'équipe`;
    } else if (new_status === "disqualified") {
      subject = "⚠️ Notification — Compte disqualifié";
      body = `Bonjour ${traderName},\n\nNous vous informons que votre compte a été disqualifié.\n\nCapital: $${reg.plan_capital?.toLocaleString()}\nPhase précédente: ${oldLabel}\n\nSi vous pensez qu'il s'agit d'une erreur, veuillez contacter notre support.\n\nL'équipe`;
    } else {
      body = `Bonjour ${traderName},\n\nVotre statut de compte a été mis à jour.\n\nAncien statut: ${oldLabel}\nNouveau statut: ${newLabel}\n\nCapital: $${reg.plan_capital?.toLocaleString()}\nType: ${reg.account_type}\n\nL'équipe`;
    }

    // Send email via Lovable AI gateway
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (LOVABLE_API_KEY && traderEmail) {
      const emailResponse = await fetch("https://api.lovable.dev/v1/email/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: traderEmail,
          subject,
          text: body,
          purpose: "transactional",
        }),
      });

      if (!emailResponse.ok) {
        const errBody = await emailResponse.text();
        console.error("Email API error:", emailResponse.status, errBody);
        // Don't fail the function, just log
      } else {
        console.log(`Phase change email sent to ${traderEmail}: ${old_status} → ${new_status}`);
      }
    } else {
      console.warn("No LOVABLE_API_KEY or trader email, skipping email notification");
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error in notify-phase-change:", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
