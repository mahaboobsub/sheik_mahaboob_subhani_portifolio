import { GoogleGenAI } from "@google/genai";
import { systemPrompt } from "@/lib/rag";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

// Candidate models in reliability order
const CANDIDATE_MODELS = ["gemini-2.5-flash", "gemini-3.8-flash"];

// Simple in-memory rate limiter: 15 messages per minute per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (entry.count >= 15) return false;
  entry.count++;
  return true;
}

// Fallback knowledge retriever when Google Gemini servers hit temporary 503 capacity spikes
function getLocalKnowledgeAnswer(query: string): string {
  const lower = query.toLowerCase();

  if (lower.includes("ruvinsys") || lower.includes("exam") || lower.includes("cbse") || lower.includes("blueprint")) {
    return (
      "At **Ruvinsys Global Solutions** (Dec 2025 – Present), Sheik Mahaboob Subhani built:\n\n" +
      "1. **CBSE Examination Generator**: An asynchronous 4-agent FastAPI pipeline (Blueprint Planner, Hybrid Retriever, Question Generator, Compliance Reviewer) that synthesizes valid exams in under 10 seconds.\n" +
      "2. **Custom RAG Ingestion**: Ingests textbooks with formulas and diagrams using PyMuPDF and Gemini Vision OCR into Qdrant vector embeddings.\n" +
      "3. **Backend Integration**: Collaborated with a 4-member team across Node.js, Prisma ORM, and review workflows."
    );
  }

  if (lower.includes("bloodbridge") || lower.includes("donor") || lower.includes("neo4j") || lower.includes("antigen") || lower.includes("blood")) {
    return (
      "**BloodBridge AI** is an emergency blood coordination system:\n\n" +
      "1. **14-Node Stateful LangGraph Machine**: Orchestrates emergency intake, geospatial radius filtering, and cyclic retry logic.\n" +
      "2. **Neo4j 8-Antigen Matching**: Graph traversals calculate blood compatibility in under 100ms.\n" +
      "3. **Vapi.ai Voice Outreach**: Automates voice dispatching with DPDP Act 2023 tokenized privacy compliance.\n\n" +
      "• Result: Top 12 Finalist at AI for Good Hackathon 2.0 (github.com/mahaboobsub/AI4FullStack)."
    );
  }

  if (lower.includes("skill") || lower.includes("tech") || lower.includes("stack") || lower.includes("fastapi") || lower.includes("python") || lower.includes("backend")) {
    return (
      "**Technical Skills & Expertise**:\n\n" +
      "• **Languages**: Java, Python, SQL, JavaScript\n" +
      "• **Core Foundations**: OOP, DBMS, Machine Learning, Deep Learning, RAG Pipelines\n" +
      "• **AI & Agents**: LangGraph, Qdrant Vector DB, Neo4j Graph DB, Gemini Vision OCR, PyMuPDF, VGG16\n" +
      "• **Backend**: FastAPI, Node.js, Express.js, Prisma ORM, REST APIs, WebSockets\n" +
      "• **Problem Solving**: 250+ DSA problems solved across platforms."
    );
  }

  if (lower.includes("nit") || lower.includes("intern") || lower.includes("experience")) {
    return (
      "**Professional Experience**:\n\n" +
      "1. **AI & Full Stack Developer** at *Ruvinsys Global Solutions* (Dec 2025 – Present): 4-agent CBSE exam synthesis (<10s) and custom textbook RAG pipelines.\n" +
      "2. **Product Development Intern** at *NIT Andhra Pradesh* (May – Jul 2025): Developed AI student chatbot dashboard with PDF uploads, vector retrieval, and Postman API testing."
    );
  }

  if (lower.includes("education") || lower.includes("college") || lower.includes("b.tech") || lower.includes("diploma")) {
    return (
      "**Educational Background**:\n\n" +
      "• **B.Tech in Computer Science and Engineering**: DNR College of Engineering and Technology (2023–2026) · CGPA: 8.04/10\n" +
      "• **Diploma in ECE**: SMT B. Seetha Polytechnic (2020–2023) · CGPA: 9.3/10"
    );
  }

  if (lower.includes("fashion") || lower.includes("vgg16") || lower.includes("recommender")) {
    return (
      "**Fashion Recommender System**:\n\n" +
      "• Uses a pretrained **VGG16 CNN** to extract visual feature embeddings from catalog images.\n" +
      "• Computes pairwise **cosine similarity distances** in sub-50ms to recommend visually harmonious outfit matches.\n" +
      "• Tech: Python, TensorFlow, VGG16, Streamlit, Scikit-learn."
    );
  }

  return (
    "Sheik Mahaboob Subhani is an **AI-SDE** in Bhimavaram, AP specializing in autonomous agent pipelines and full-stack systems:\n\n" +
    "• **Ruvinsys Global Solutions**: 4-agent CBSE exam generator (<10s latency)\n" +
    "• **BloodBridge AI**: 14-node LangGraph emergency donor matcher on Neo4j (<100ms)\n" +
    "• **Core Stack**: FastAPI, Python, LangGraph, Qdrant, Neo4j, Node.js, React"
  );
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

    // Try candidate models with automatic failover
    let lastError: Error | null = null;
    for (const modelName of CANDIDATE_MODELS) {
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            config: {
              systemInstruction: systemPrompt,
              temperature: 0.4,
              maxOutputTokens: 1024,
            },
            contents,
          });

          if (response.text) {
            return Response.json({ content: response.text });
          }
        } catch (err: unknown) {
          lastError = err instanceof Error ? err : new Error(String(err));
          // If 503 or 429, wait 400ms and retry or switch model
          const errStr = String(err);
          if (errStr.includes("503") || errStr.includes("UNAVAILABLE") || errStr.includes("429")) {
            await new Promise((r) => setTimeout(r, 450));
            continue;
          }
          break; // Other error, try next model
        }
      }
    }

    // Zero-downtime safety net: If all Google models are congested (503), serve verified local RAG answer
    console.warn("Gemini API models congested. Serving verified local knowledge fallback.", lastError?.message);
    const fallbackAnswer = getLocalKnowledgeAnswer(lastUserMessage);
    return Response.json({ content: fallbackAnswer });
  } catch (error: unknown) {
    console.error("Chat API error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return Response.json({ error: message }, { status: 500 });
  }
}
