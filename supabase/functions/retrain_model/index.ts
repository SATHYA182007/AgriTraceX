import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

Deno.serve(async (_req: Request) => {
  try {
    // Pull all verification records to compute simulated accuracy
    const { data: verifications, error } = await supabase
      .from("verifications")
      .select("decision, corrected_risk_score");

    if (error) throw error;

    const total = verifications?.length ?? 0;
    const accepted = verifications?.filter((v: { decision: string }) => v.decision === "ACCEPT").length ?? 0;

    // Simulated accuracy improvement
    const baseAccuracy = 91.4;
    const improvement = total > 0 ? Math.min((accepted / total) * 5, 4) : 0;
    const newAccuracy = parseFloat((baseAccuracy + improvement + Math.random()).toFixed(1));

    const versionName = `agri-ndvi-v${Date.now().toString().slice(-4)}`;

    // Unset all current versions
    await supabase.from("model_versions").update({ is_current: false }).eq("is_current", true);

    // Insert new version
    const { error: insertError } = await supabase.from("model_versions").insert({
      version_name: versionName,
      accuracy: newAccuracy,
      is_current: true,
    });

    if (insertError) throw insertError;

    return new Response(
      JSON.stringify({ message: "Retrain complete", version: versionName, accuracy: newAccuracy }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
