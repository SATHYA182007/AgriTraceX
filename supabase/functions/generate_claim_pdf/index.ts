import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

Deno.serve(async (req: Request) => {
  try {
    const payload = await req.json();
    const claim = payload.record;

    if (claim.status !== "APPROVED") {
      return new Response(JSON.stringify({ message: "Not an APPROVED claim — skipping" }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    const storagePath = `claims_reports/${claim.id}/loss_assessment_${Date.now()}.pdf`;

    // In production: generate PDF and upload to storage
    // const pdf = await generateLossAssessmentPDF(claim);
    // await supabase.storage.from("claims_reports").upload(storagePath, pdf);

    const { error } = await supabase
      .from("claims")
      .update({ report_url: storagePath })
      .eq("id", claim.id);

    if (error) throw error;

    return new Response(JSON.stringify({ message: "Claim PDF generated", url: storagePath }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
