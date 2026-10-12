import { GoogleGenAI } from "@google/genai";
import { systemPrompt } from "@/lib/rag";
import { resolveKnowledgeAnswer } from "@/lib/knowledge";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

// Production candidate models in failover order
const CANDIDATE_MODELS = [
  "gemini-2.5-flash",
  "gemini-flash-latest",
  "gemini-2.5-flash-lite",
];

// In-memory rate limiter: 25 messages per minute per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (entry.count >= 25) return false;
  entry.count++;
  return true;
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return Response.json(
        { error: "Rate limit reached. Please wait a moment before sending another query." },
        { status: 429 }
      );
    }

    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: "Messages array is required." }, { status: 400 });
    }

    const lastUserMessage =
      [...messages].reverse().find((m) => m.role === "user")?.content || "";

    // Build conversation history for Gemini
    const contents = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === "user" ? ("user" as const) : ("model" as const),
      parts: [{ text: msg.content }],
    }));

    // Try candidate models with jittered retry for 503 capacity spikes
    let lastError: Error | null = null;
    for (const modelName of CANDIDATE_MODELS) {
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            config: {
              systemInstruction: systemPrompt,
              temperature: 0.5,
              maxOutputTokens: 1024,
            },
            contents,
          });

          if (response.text && response.text.trim().length > 0) {
            return Response.json({ content: response.text });
          }
        } catch (err: unknown) {
          lastError = err instanceof Error ? err : new Error(String(err));
          const errStr = String(err);
          // If 503 or 429, wait briefly and retry or proceed to next candidate
          if (errStr.includes("503") || errStr.includes("UNAVAILABLE") || errStr.includes("429")) {
            await new Promise((r) => setTimeout(r, 300 * (attempt + 1)));
            continue;
          }
          break; // Other error, try next candidate model
        }
      }
    }

    // Zero-downtime safety net: If all Google models are congested (503), serve verified local RAG answer
    console.warn("Gemini API models congested. Serving verified local knowledge fallback.", lastError?.message);
    const resolved = resolveKnowledgeAnswer(lastUserMessage);
    return Response.json({ content: resolved.answer });
  } catch (error: unknown) {
    console.error("Chat API error:", error);
    // Double safety net: even on unexpected server throw, return grounded knowledge resolution
    try {
      const body = await request.clone().json().catch(() => null);
      const lastMsg = body?.messages?.slice(-1)?.[0]?.content || "hi";
      const fallback = resolveKnowledgeAnswer(lastMsg);
      return Response.json({ content: fallback.answer });
    } catch {
      return Response.json(
        { error: "Could not process request at this time. Please try again." },
        { status: 500 }
      );
    }
  }
}
