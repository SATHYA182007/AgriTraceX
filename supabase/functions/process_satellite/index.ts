import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

Deno.serve(async (req: Request) => {
  try {
    const payload = await req.json();
    const record = payload.record;

    // Simulate NDVI calculation
    const ndviValue = Math.random() * 0.8 + 0.1; // 0.1 to 0.9
    const NDVI_THRESHOLD = 0.35;

    if (ndviValue < NDVI_THRESHOLD) {
      // Insert alert for the parcel
      const { error } = await supabase.from("alerts").insert({
        type: "DROUGHT",
        severity: ndviValue < 0.2 ? "CRITICAL" : "HIGH",
        parcel_id: record.parcel_id,
        district: record.district || "Unknown",
        description: `Satellite NDVI anomaly detected. NDVI value: ${ndviValue.toFixed(2)} below threshold ${NDVI_THRESHOLD}. Possible crop stress.`,
        acknowledged: false,
      });

      if (error) throw error;
      return new Response(JSON.stringify({ message: "Alert inserted", ndvi: ndviValue }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ message: "No anomaly detected", ndvi: ndviValue }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
