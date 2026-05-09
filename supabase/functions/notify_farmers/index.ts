import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

Deno.serve(async (req: Request) => {
  try {
    const payload = await req.json();
    const action = payload.record;
    const district: string = action.district;

    // Fetch all farmers in the target district
    const { data: farmers, error } = await supabase
      .from("profiles")
      .select("id, full_name, phone")
      .eq("role", "farmer")
      .eq("district", district);

    if (error) throw error;

    // In production: send FCM push notifications to each farmer
    // For demo: just log the notification targets
    const notifications = (farmers ?? []).map((farmer: { id: string; full_name: string; phone: string }) => ({
      farmer_id: farmer.id,
      name: farmer.full_name,
      message: `Government action: ${action.action} has been initiated for ${district}. ${action.notes}`,
    }));

    console.log("Notifications to send:", notifications);

    return new Response(
      JSON.stringify({
        message: `Notifications queued for ${notifications.length} farmers in ${district}`,
        targets: notifications,
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
