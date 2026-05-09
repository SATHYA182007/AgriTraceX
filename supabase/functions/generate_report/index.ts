import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

Deno.serve(async (req: Request) => {
  try {
    const payload = await req.json();
    const reportId: string = payload.record?.id;
    const parcelId: string = payload.record?.parcel_id;

    if (!reportId || !parcelId) {
      return new Response(JSON.stringify({ error: "Missing report or parcel ID" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Simulate PDF generation (in production, use npm:pdfkit or Deno-compatible PDF library)
    const storagePath = `reports/${reportId}/crop_intelligence_${Date.now()}.pdf`;

    // In a real implementation, you'd generate a PDF here and upload to Storage:
    // const pdfBuffer = await generatePDF(parcelId, reportId);
    // await supabase.storage.from("reports").upload(storagePath, pdfBuffer);

    // Update the report record with the simulated path
    const { error } = await supabase
      .from("reports")
      .update({ storage_path: storagePath, status: "verified" })
      .eq("id", reportId);

    if (error) throw error;

    return new Response(JSON.stringify({ message: "Report generated", path: storagePath }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
