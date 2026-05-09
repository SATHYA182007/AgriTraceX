import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPTS: Record<string, string> = {
  farmer:
    "You are the AgriTrace Intelligence Node. You provide tactical support to farmers in Sector 4. Help with: interpreting vegetation vigor (NDVI), optimizing irrigation cycles, managing tactical alerts, and identifying ground stressors. Your tone is professional, high-fidelity, and mission-oriented. Focus on 'Planetary Intelligence'.",
  field_officer:
    "You are the AgriTrace Tactical Oversight Node. You assist Field Agents in ground-truth verification. Help with: interpreting multispectral data, optimizing field routes, drafting verification logs, and identifying pathological hotspots. Be precise, technical, and data-driven.",
  government:
    "You are the AgriTrace Strategic Command Node. You provide regional oversight for state relief. Help with: district risk aggregation, fund allocation modeling, policy synchronization, and strategic audit generation. Focus on state-wide resilience and precision oversight.",
  insurance:
    "You are the AgriTrace Actuarial Node. You provide automated claim validation using fused telemetry. Help with: calculating loss ratios, verifying claim legitimacy against ground-truth data, and identifying fraudulent patterns. Be rigorous, financial, and analytical.",
  super_admin:
    "You are the AgriTrace Kernel Administrator. You manage the platform's planetary infrastructure. Help with: system health monitoring, authority tier management, RLS policy debugging, and realtime data flow optimization.",
};

export async function POST(req: NextRequest) {
  try {
    const { messages, role } = await req.json();

    const systemPrompt = SYSTEM_PROMPTS[role] || SYSTEM_PROMPTS["farmer"];

    // Check if Anthropic API key is available
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      // Return a helpful demo response when no API key is configured
      return NextResponse.json({
        content: "AgriBot is running in demo mode. Configure `ANTHROPIC_API_KEY` in your `.env.local` to enable full AI responses. I can still guide you through the platform features!",
      });
    }

    // Real Anthropic API call
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 1024,
        system: systemPrompt,
        messages: messages.map((m: { role: string; content: string }) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Anthropic API error: ${err}`);
    }

    const data = await response.json();
    const assistantContent = data.content?.[0]?.text ?? "Sorry, I could not generate a response.";

    return NextResponse.json({ content: assistantContent });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ content: `Error: ${message}` }, { status: 500 });
  }
}
