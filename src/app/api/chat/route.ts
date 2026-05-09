import { NextRequest, NextResponse } from "next/server";
import { retrieveContext } from "@/lib/knowledge";

const SYSTEM_PROMPT = `You are AgriTrace AI, an intelligent agricultural assistant built specifically for the AgriTrace X platform.

You help farmers, analysts, insurance managers, field officers, government authorities, and administrators understand:
- Agricultural intelligence and crop monitoring
- GIS analytics and NDVI satellite data
- IoT sensor readings and alerts
- Land certification workflows
- Insurance claims and payout processes
- Government subsidy verification
- Soil health and irrigation recommendations

Use the retrieved knowledge base context below to give accurate, grounded answers.

RETRIEVED CONTEXT:
{CONTEXT}

INSTRUCTIONS:
- Answer using the context above when relevant
- Use markdown formatting (bold, bullet points, numbered lists) for clarity
- Keep answers concise and practical — 3-8 sentences or a short structured list
- Be professional, helpful, and confident
- Do NOT mention Claude, Gemini, or any underlying AI model — you are AgriTrace AI
- If you don't know something specific, recommend contacting the platform admin or field officer`;

// ── Google Gemini ──
async function callGemini(systemPrompt: string, messages: any[]): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("No GEMINI_API_KEY");

  const { GoogleGenerativeAI } = await import("@google/generative-ai");
  const genAI = new GoogleGenerativeAI(apiKey);
  const MODELS = ["gemini-2.0-flash", "gemini-1.5-pro", "gemini-pro"];
  let lastError: any;

  for (const modelName of MODELS) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const history = messages.slice(0, -1).map((m: any) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));
      const lastMsg = messages[messages.length - 1];
      const chat = model.startChat({ history, systemInstruction: systemPrompt });
      const result = await chat.sendMessage(lastMsg.content);
      return result.response.text();
    } catch (err: any) {
      lastError = err;
      console.log(`Gemini ${modelName} failed:`, err.message?.substring(0, 60));
    }
  }
  throw lastError;
}

// ── Anthropic Claude (fallback) ──
async function callAnthropic(systemPrompt: string, messages: any[]): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("No ANTHROPIC_API_KEY");

  const Anthropic = (await import("@anthropic-ai/sdk")).default;
  const client = new Anthropic({ apiKey });

  const formattedMessages = messages
    .filter((m: any) => m.role === "user" || m.role === "assistant")
    .map((m: any) => ({ role: m.role as "user" | "assistant", content: m.content }));

  const response = await client.messages.create({
    model: "claude-3-5-haiku-20241022",
    max_tokens: 1024,
    system: systemPrompt,
    messages: formattedMessages,
  });

  return response.content[0].type === "text" ? response.content[0].text : "";
}

// ── Knowledge-base only fallback ──
function buildFallbackResponse(question: string, chunks: any[]): string {
  if (chunks.length === 0) {
    return "I can help with farming questions, GIS analytics, insurance workflows, certifications, and platform guidance. Could you rephrase your question?";
  }
  const best = chunks[0];
  return `**AgriTrace AI — Knowledge Base Answer**\n\n${best.content}\n\n*For more details, please consult your field officer or platform administrator.*`;
}

export async function POST(req: NextRequest) {
  try {
    const { messages, role } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Retrieve relevant context
    const lastUserMessage = [...messages].reverse().find((m: any) => m.role === "user");
    const question = lastUserMessage?.content || "";
    const chunks = retrieveContext(question, 4);
    const context = chunks.length > 0
      ? chunks.map(c => `[${c.category.toUpperCase()}]\n${c.content}`).join("\n\n---\n\n")
      : "Answer based on general agricultural and platform knowledge.";

    const systemPrompt = SYSTEM_PROMPT.replace("{CONTEXT}", context);

    // Try Gemini → Anthropic → Knowledge base fallback
    let content = "";

    try {
      content = await callGemini(systemPrompt, messages);
    } catch (geminiErr: any) {
      console.log("Gemini unavailable, trying Anthropic:", geminiErr.message);
      try {
        content = await callAnthropic(systemPrompt, messages);
      } catch (anthropicErr: any) {
        console.log("Anthropic unavailable, using knowledge base:", anthropicErr.message);
        content = buildFallbackResponse(question, chunks);
      }
    }

    return NextResponse.json({ content });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { content: "AgriTrace AI encountered an issue. Please try again." },
      { status: 200 }
    );
  }
}
