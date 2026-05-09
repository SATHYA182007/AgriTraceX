import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { parcel_id, drone_image_path, satellite_data } = await req.json();

    // Logic: 
    // 1. Fetch NIR and Red bands (Mocking calculation here for demo)
    // 2. NDVI = (NIR - RED) / (NIR + RED)
    // 3. Divide parcel into spatial zones based on NDVI thresholds
    
    // Thresholds:
    // Zone A: NDVI > 0.5 -> Healthy
    // Zone B: NDVI 0.2-0.5 -> Dry/Watch
    // Zone C: NDVI < 0.2 -> Critical

    // Mock Zone Generation (in real case, this would use PostGIS or image processing)
    const zones = [
      { type: 'A', name: 'Zone A (Healthy)', ndvi: 0.72, status: 'OPTIMAL' },
      { type: 'B', name: 'Zone B (Watch)', ndvi: 0.35, status: 'WARNING' },
      { type: 'C', name: 'Zone C (Critical)', ndvi: 0.12, status: 'CRITICAL' },
    ];

    // Store zones in a hypothetical 'zones' table or update parcel health
    const { data, error } = await supabaseClient
      .from('parcel_health')
      .upsert({
        parcel_id,
        ndvi_avg: 0.45,
        zones_data: zones,
        last_fused_at: new Date().toISOString(),
      });

    if (error) throw error;

    // Trigger Rule Engine
    await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/rule_engine`, {
      method: 'POST',
      headers: { ...corsHeaders, 'Authorization': `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}` },
      body: JSON.stringify({ parcel_id, zones }),
    });

    return new Response(JSON.stringify({ success: true, zones }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
