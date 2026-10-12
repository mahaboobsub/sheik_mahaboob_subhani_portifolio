import { GoogleGenAI } from "@google/genai";
import { systemPrompt } from "@/lib/rag";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

// Simple in-memory rate limiter: 10 messages per minute per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (entry.count >= 10) return false;
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
        { error: "Rate limit exceeded. Please wait a minute before sending another message." },
        { status: 429 }
      );
    }

    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: "Messages array is required." }, { status: 400 });
    }

    // Build conversation history for Gemini
    const contents = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === "user" ? ("user" as const) : ("model" as const),
      parts: [{ text: msg.content }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.4,
        maxOutputTokens: 1024,
      },
      contents,
    });

    const text = response.text || "I couldn't generate a response. Please try again.";

    return Response.json({ content: text });
  } catch (error: unknown) {
    console.error("Chat API error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return Response.json({ error: message }, { status: 500 });
  }
}
