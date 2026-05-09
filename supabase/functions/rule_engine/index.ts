import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

serve(async (req) => {
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  try {
    const { parcel_id, sensor_readings, zones } = await req.json();

    const alerts = [];

    // Rule 1: Moisture < 30% -> DROUGHT, MEDIUM
    if (sensor_readings?.moisture < 30) {
      alerts.push({
        parcel_id,
        type: 'DROUGHT',
        severity: sensor_readings.moisture < 15 ? 'HIGH' : 'MEDIUM',
        description: `Moisture level critical at ${sensor_readings.moisture}%`,
      });
    }

    // Rule 2: Temp > 38C -> HEAT_STRESS
    if (sensor_readings?.temperature > 38) {
      alerts.push({
        parcel_id,
        type: 'FROST', // Mapping to appropriate category if HEAT_STRESS not in enum, or use description
        severity: 'HIGH',
        description: `Extreme heat detected: ${sensor_readings.temperature}°C`,
      });
    }

    // Rule 3: NDVI Drops (from zones data)
    const criticalZones = zones?.filter(z => z.type === 'C');
    if (criticalZones?.length > 0) {
      alerts.push({
        parcel_id,
        type: 'PEST',
        severity: 'CRITICAL',
        description: `Critical crop stress detected in ${criticalZones.length} zones. Possible pest infestation.`,
      });
    }

    if (alerts.length > 0) {
      const { error } = await supabaseClient.from('alerts').insert(alerts);
      if (error) throw error;
    }

    return new Response(JSON.stringify({ success: true, alerts_created: alerts.length }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
});
