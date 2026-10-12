import { GoogleGenAI } from "@google/genai";
import { systemPrompt } from "@/lib/rag";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

// Verified active production model
const CANDIDATE_MODELS = ["gemini-2.5-flash"];

// In-memory rate limiter: 20 messages per minute per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (entry.count >= 20) return false;
  entry.count++;
  return true;
}

// Reactive, grounded local knowledge retriever when Gemini experiences 503 capacity spikes
function getLocalKnowledgeAnswer(query: string): string {
  const lower = query.toLowerCase().trim();

  // 1. Greetings & conversational introductions
  if (
    lower === "hi" ||
    lower === "hello" ||
    lower === "hey" ||
    lower.startsWith("hi ") ||
    lower.startsWith("hello ") ||
    lower.startsWith("hey ") ||
    lower.includes("who are you") ||
    lower.includes("what can you do") ||
    lower.includes("how can you help") ||
    lower.includes("introduce yourself")
  ) {
    return (
      "Hello! I'm **Subhani's AI Assistant**, embedded right here in his developer portfolio.\n\n" +
      "I'm here to answer anything about Sheik Mahaboob Subhani's engineering work as an **AI-SDE & Full Stack Developer**:\n\n" +
      "• **Autonomous Agent Systems**: BloodBridge AI (14-node LangGraph & sub-100ms Neo4j antigen matching)\n" +
      "• **Enterprise RAG Pipelines**: AI Exam Generator at Ruvinsys Global Solutions (<10s generation SLA)\n" +
      "• **Technical Repertoire**: LangGraph, FastAPI, Python, Qdrant, Neo4j, Node.js, and React\n" +
      "• **Background & Credentials**: 250+ DSA problems solved, Oracle GenAI Certified, Top 12 Hackathon Finalist\n\n" +
      "What would you like to explore first?"
    );
  }

  // 2. Why hire / elevator pitch
  if (
    lower.includes("why hire") ||
    lower.includes("why should we hire") ||
    lower.includes("pitch") ||
    lower.includes("about mahaboob") ||
    lower.includes("tell me about yourself") ||
    lower.includes("tell me about him") ||
    lower.includes("summary")
  ) {
    return (
      "**Why hire Sheik Mahaboob Subhani:**\n\n" +
      "1. **Production-Minded AI Architect**: Builds stateful, multi-agent systems (e.g. 14-node LangGraph in BloodBridge AI) with cyclic fallbacks and sub-100ms Neo4j graph queries.\n" +
      "2. **Real Enterprise RAG Experience**: At Ruvinsys Global Solutions, built custom textbook ingestion pipelines combining PyMuPDF, Gemini Vision OCR, and Qdrant dense+BM25 hybrid search.\n" +
      "3. **End-to-End Full Stack Capability**: Fluent in FastAPI, Node.js, Express, React, WebSockets, and database architecture (SQL, Neo4j, Qdrant).\n" +
      "4. **Algorithmic Discipline**: Solved 250+ DSA problems across platforms, ensuring clean time/space complexity.\n" +
      "5. **Certified & Recognized**: Oracle Cloud Infrastructure 2025 Generative AI Certified, and Top 12 Finalist at AI for Good Hackathon 2.0."
    );
  }

  // 3. Contact & hiring availability
  if (
    lower.includes("contact") ||
    lower.includes("reach") ||
    lower.includes("hire") ||
    lower.includes("email") ||
    lower.includes("phone") ||
    lower.includes("linkedin") ||
    lower.includes("available") ||
    lower.includes("location")
  ) {
    return (
      "**Get in Touch with Subhani**:\n\n" +
      "• **Email**: [skmahaboobsubhani62@gmail.com](mailto:skmahaboobsubhani62@gmail.com)\n" +
      "• **LinkedIn**: [linkedin.com/in/sheik-mahaboob-subhani](https://linkedin.com/in/sheik-mahaboob-subhani)\n" +
      "• **GitHub**: [github.com/mahaboobsub](https://github.com/mahaboobsub)\n" +
      "• **Location**: Bhimavaram, Andhra Pradesh, India (Open to Remote & Relocation)\n" +
      "• **Phone**: Available upon request via email or the portfolio contact form to prevent automated spam."
    );
  }

  // 4. Ruvinsys & CBSE Exam Generator
  if (lower.includes("ruvinsys") || lower.includes("exam") || lower.includes("cbse") || lower.includes("blueprint")) {
    return (
      "At **Ruvinsys Global Solutions** (Dec 2025 – Present), Sheik Mahaboob Subhani engineered:\n\n" +
      "1. **CBSE Examination Generator**: An asynchronous 4-agent FastAPI pipeline (Blueprint Planner, Hybrid Retriever, Question Generator, Compliance Reviewer) that synthesizes valid exams in under 10 seconds.\n" +
      "2. **Custom RAG Ingestion**: Ingests complex textbook PDFs with formulas and diagrams using PyMuPDF and Gemini Vision OCR into Qdrant vector embeddings.\n" +
      "3. **Backend Integration**: Collaborated with a 4-member team across Node.js, Prisma ORM, and automated review workflows."
    );
  }

  // 5. BloodBridge AI
  if (lower.includes("bloodbridge") || lower.includes("donor") || lower.includes("neo4j") || lower.includes("antigen") || lower.includes("blood") || lower.includes("14 node") || lower.includes("14-node")) {
    return (
      "**BloodBridge AI** is an emergency blood coordination system:\n\n" +
      "1. **14-Node Stateful LangGraph Machine**: Orchestrates intake, geospatial radius filtering, donor ranking, and cyclic fallback retry loops.\n" +
      "2. **Neo4j 8-Antigen Matching**: Graph traversals calculate donor compatibility (ABO, Rh, Kell, Duffy, Kidd) in sub-100ms.\n" +
      "3. **Vapi.ai Voice Outreach**: Automates voice dispatching with DPDP Act 2023 tokenized privacy compliance.\n\n" +
      "• **Result**: Top 12 Finalist at AI for Good Hackathon 2.0 (github.com/mahaboobsub/AI4FullStack)."
    );
  }

  // 6. Skills & Tech Stack
  if (lower.includes("skill") || lower.includes("tech") || lower.includes("stack") || lower.includes("fastapi") || lower.includes("python") || lower.includes("backend")) {
    return (
      "**Technical Repertoire & Skills**:\n\n" +
      "• **Languages**: Java, Python, SQL, JavaScript\n" +
      "• **Core Foundations**: OOP, DBMS, Machine Learning, Deep Learning, RAG Pipelines\n" +
      "• **AI & Agents**: LangGraph, Qdrant Vector DB, Neo4j Graph DB, Gemini Vision OCR, PyMuPDF, VGG16\n" +
      "• **Backend**: FastAPI, Node.js, Express.js, Prisma ORM, REST APIs, WebSockets\n" +
      "• **Problem Solving**: 250+ DSA problems solved across platforms."
    );
  }

  // 7. NIT Andhra Pradesh
  if (lower.includes("nit") || lower.includes("intern") || lower.includes("experience")) {
    return (
      "**Professional Experience**:\n\n" +
      "1. **AI & Full Stack Developer** at *Ruvinsys Global Solutions* (Dec 2025 – Present): 4-agent CBSE exam synthesis (<10s SLA) and custom textbook RAG pipelines.\n" +
      "2. **Product Development Intern** at *NIT Andhra Pradesh* (May – Jul 2025): Developed AI student chatbot dashboard with PDF uploads, vector retrieval, and Postman API testing."
    );
  }

  // 8. Achievements & Certifications
  if (lower.includes("cert") || lower.includes("oracle") || lower.includes("hackathon") || lower.includes("dsa") || lower.includes("leetcode") || lower.includes("achievement")) {
    return (
      "**Achievements & Certifications**:\n\n" +
      "• **250+ DSA Problems Solved**: Active problem solver across coding platforms.\n" +
      "• **Oracle Cloud Infrastructure 2025**: Generative AI Professional Certified.\n" +
      "• **AI for Good Hackathon 2.0**: Top 12 Finalist with BloodBridge AI."
    );
  }

  // 9. Education
  if (lower.includes("education") || lower.includes("college") || lower.includes("b.tech") || lower.includes("diploma") || lower.includes("dnr")) {
    return (
      "**Educational Background**:\n\n" +
      "• **B.Tech in Computer Science and Engineering**: DNR College of Engineering and Technology (2023–2026) · CGPA: 8.04/10\n" +
      "• **Diploma in ECE**: SMT B. Seetha Polytechnic (2020–2023) · CGPA: 9.3/10"
    );
  }

  // 10. Fashion Recommender & Password Manager
  if (lower.includes("fashion") || lower.includes("vgg16") || lower.includes("recommender")) {
    return (
      "**Women Fashion Image Recommender System**:\n\n" +
      "• Uses a pretrained **VGG16 CNN** to extract visual feature embeddings from catalog imagery.\n" +
      "• Pre-computed embedding matrix enables sub-second query-time cosine similarity matching on CPU.\n" +
      "• Tech: Python, TensorFlow, VGG16, Streamlit, Scikit-learn (github.com/mahaboobsub/Fashion_Recommendation_System_using_Image_Features)."
    );
  }

  if (lower.includes("password") || lower.includes("aes") || lower.includes("jwt") || lower.includes("security")) {
    return (
      "**Secure Password Manager**:\n\n" +
      "• **AES-256-GCM AEAD**: Authenticated symmetric encryption for stored credential vaults.\n" +
      "• **Bcrypt 12 Rounds**: Salted password hashing with zero plain-text storage.\n" +
      "• **Stateless JWT**: Secure user authentication APIs (github.com/mahaboobsub/passwordManager-ls)."
    );
  }

  // Default intelligent overview
  return (
    "Sheik Mahaboob Subhani is an **AI-SDE (AI & Full Stack Developer)** in Bhimavaram, AP specializing in autonomous agent pipelines and full-stack systems:\n\n" +
    "• **Ruvinsys Global Solutions**: 4-agent CBSE exam generator (<10s generation SLA)\n" +
    "• **BloodBridge AI**: 14-node LangGraph emergency donor matcher on Neo4j (<100ms)\n" +
    "• **Technical Repertoire**: FastAPI, Python, LangGraph, Qdrant, Neo4j, Node.js, React\n" +
    "• **Credentials**: 250+ DSA solved, Oracle GenAI Certified, Top 12 Hackathon Finalist.\n\n" +
    "Feel free to ask about any of these systems, his background, or how to contact him!"
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

    // Try candidate models with jittered retry for 503 capacity spikes
    let lastError: Error | null = null;
    for (const modelName of CANDIDATE_MODELS) {
      for (let attempt = 0; attempt < 3; attempt++) {
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

          if (response.text) {
            return Response.json({ content: response.text });
          }
        } catch (err: unknown) {
          lastError = err instanceof Error ? err : new Error(String(err));
          const errStr = String(err);
          // If 503 or 429, wait and retry
          if (errStr.includes("503") || errStr.includes("UNAVAILABLE") || errStr.includes("429")) {
            await new Promise((r) => setTimeout(r, 400 * (attempt + 1)));
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
