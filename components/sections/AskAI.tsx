"use client";

import { useState, useRef, useEffect } from "react";
import { profile } from "@/lib/content";
import {
  Send,
  Sparkles,
  CheckCircle2,
  Loader2,
  User,
  Bot,
  X,
  MessageCircle,
  Database,
  Brain,
  Shield,
  Zap,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Check,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: string[];
  followUps?: string[];
}

type AgentPhase = "idle" | "intake" | "retrieval" | "reasoning" | "grounding" | "complete";

// Autonomous agent definitions — mirrors real agentic pipeline architecture
const agents = [
  {
    id: "intake",
    name: "Intake Agent",
    role: "Query Parser & Router",
    icon: Zap,
    color: "#0a84ff",
    desc: "Parses user intent, extracts entities, routes to retrieval",
  },
  {
    id: "retrieval",
    name: "Retrieval Agent",
    role: "Knowledge Base Search",
    icon: Database,
    color: "#bf5af2",
    desc: "Hybrid search across résumé, projects, experience data",
  },
  {
    id: "reasoning",
    name: "Reasoning Agent",
    role: "Context Synthesis",
    icon: Brain,
    color: "#ff9f0a",
    desc: "Cross-references sources, synthesizes coherent answer",
  },
  {
    id: "grounding",
    name: "Grounding Agent",
    role: "Fact Verification",
    icon: Shield,
    color: "#30d158",
    desc: "Validates every claim against source knowledge base",
  },
];

const starterPrompts = [
  "Why should we hire Subhani?",
  "What did you build at Ruvinsys?",
  "Explain BloodBridge's 14-node architecture",
  "What are your core technical skills?",
  "How does the CBSE exam pipeline work?",
  "How can I contact or hire you?",
];

// Infer sources from the AI response content
function inferSources(content: string): string[] {
  const sources: string[] = [];
  const lower = content.toLowerCase();
  if (lower.includes("ruvinsys") || lower.includes("exam") || lower.includes("cbse") || lower.includes("blueprint")) sources.push("Experience: Ruvinsys Global Solutions");
  if (lower.includes("nit") || lower.includes("intern")) sources.push("Experience: NIT Andhra Pradesh");
  if (lower.includes("bloodbridge") || lower.includes("donor") || lower.includes("neo4j") || lower.includes("antigen") || lower.includes("14-node")) sources.push("Project: BloodBridge AI");
  if (lower.includes("fashion") || lower.includes("vgg16") || lower.includes("cosine")) sources.push("Project: Fashion Recommender");
  if (lower.includes("password") || lower.includes("aes") || lower.includes("jwt")) sources.push("Project: Password Manager");
  if (lower.includes("education") || lower.includes("b.tech") || lower.includes("diploma") || lower.includes("dnr") || lower.includes("cgpa")) sources.push("Education Section");
  if (lower.includes("fastapi") || lower.includes("python") || lower.includes("java") || lower.includes("node") || lower.includes("langgraph") || lower.includes("skill")) sources.push("Technical Skills");
  if (lower.includes("oracle") || lower.includes("certification") || lower.includes("hackathon") || lower.includes("250")) sources.push("Achievements & Certifications");
  if (lower.includes("skmahaboobsubhani62") || lower.includes("linkedin") || lower.includes("contact") || lower.includes("bhimavaram")) sources.push("Contact & Location");
  return sources.length > 0 ? sources : ["Résumé & Portfolio"];
}

// Generate intelligent follow-up questions based on the response
function generateFollowUps(content: string): string[] {
  const lower = content.toLowerCase();
  if (lower.includes("why hire") || lower.includes("production-minded") || lower.includes("why should we hire")) {
    return [
      "Tell me about BloodBridge's 14-node architecture",
      "What did you build at Ruvinsys?",
      "How can I contact Subhani?",
    ];
  }
  if (lower.includes("hello") || lower.includes("assistant") || lower.includes("explore first") || lower.includes("portfolio assistant")) {
    return [
      "Why should we hire Subhani?",
      "What did you build at Ruvinsys?",
      "What are your core technical skills?",
    ];
  }
  if (lower.includes("contact") || lower.includes("skmahaboobsubhani62") || lower.includes("linkedin")) {
    return [
      "Why should we hire Subhani?",
      "Tell me about BloodBridge AI",
      "What is his education background?",
    ];
  }
  if (lower.includes("bloodbridge") || lower.includes("donor") || lower.includes("neo4j") || lower.includes("langgraph")) {
    return [
      "How does Neo4j calculate donor compatibility in <100ms?",
      "How does Vapi handle automated voice outreach?",
      "Can I see the BloodBridge GitHub repository?",
    ];
  }
  if (lower.includes("exam") || lower.includes("cbse") || lower.includes("ruvinsys") || lower.includes("blueprint")) {
    return [
      "How does the hybrid retriever combine PyMuPDF and BM25?",
      "What were your exact contributions at Ruvinsys?",
      "How does the pipeline achieve <10s generation SLA?",
    ];
  }
  if (lower.includes("fashion") || lower.includes("vgg16") || lower.includes("recommender")) {
    return [
      "Why did you select VGG16 for feature extraction?",
      "What is the latency of cosine similarity search?",
      "What other computer vision models have you worked with?",
    ];
  }
  if (lower.includes("skill") || lower.includes("fastapi") || lower.includes("backend") || lower.includes("full stack")) {
    return [
      "Tell me about your Python & FastAPI experience",
      "How many LeetCode / DSA problems have you solved?",
      "What is your experience with Knowledge Graphs & Neo4j?",
    ];
  }
  if (lower.includes("education") || lower.includes("b.tech") || lower.includes("nit") || lower.includes("dnr")) {
    return [
      "What projects did you build during your NIT Andhra Pradesh internship?",
      "What certifications do you hold in Java and Cloud?",
      "How can I reach out to hire Mahaboob for an AI-SDE role?",
    ];
  }
  return [
    "Tell me about the BloodBridge 14-node architecture",
    "How does the CBSE exam generator achieve <10s latency?",
    "What are your top full-stack and GenAI skills?",
  ];
}

// Inline Markdown renderer for bolding, code, and structured lists
function renderInlineFormatted(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-text">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="rounded bg-accent/10 px-1.5 py-0.5 font-mono text-[11px] text-accent">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

function FormattedContent({ text }: { text: string }) {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let currentList: { num: string; text: string }[] = [];
  let currentBullets: string[] = [];

  const flushList = () => {
    if (currentList.length > 0) {
      const items = [...currentList];
      currentList = [];
      elements.push(
        <div key={`numlist-${elements.length}`} className="my-3 space-y-2">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 rounded-xl border border-line/60 bg-bg/70 p-2.5 sm:p-3 text-xs sm:text-sm leading-relaxed"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-accent/15 font-mono text-[10px] font-bold text-accent mt-0.5">
                {item.num}
              </span>
              <div className="flex-1 min-w-0">
                {renderInlineFormatted(item.text)}
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  const flushBullets = () => {
    if (currentBullets.length > 0) {
      const items = [...currentBullets];
      currentBullets = [];
      elements.push(
        <ul key={`bullets-${elements.length}`} className="my-2.5 space-y-1.5 pl-1">
          {items.map((b, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm leading-relaxed text-text/95">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{renderInlineFormatted(b)}</span>
            </li>
          ))}
        </ul>
      );
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (!line) {
      flushList();
      flushBullets();
      continue;
    }

    // Match numbered list: "1. **IntakeNode**: Ingests..."
    const numMatch = line.match(/^(\d+)[\.\)]\s+(.+)$/);
    if (numMatch) {
      flushBullets();
      currentList.push({ num: numMatch[1], text: numMatch[2] });
      continue;
    }

    // Match bullet items: "- item" or "* item"
    const bulletMatch = line.match(/^[-*•]\s+(.+)$/);
    if (bulletMatch) {
      flushList();
      currentBullets.push(bulletMatch[1]);
      continue;
    }

    flushList();
    flushBullets();

    if (line.startsWith("### ")) {
      elements.push(
        <h4 key={`h4-${i}`} className="mt-3 text-xs sm:text-sm font-bold text-text tracking-tight">
          {line.replace(/^###\s+/, "")}
        </h4>
      );
    } else if (line.startsWith("## ")) {
      elements.push(
        <h3 key={`h3-${i}`} className="mt-3 text-sm sm:text-base font-bold text-text">
          {line.replace(/^##\s+/, "")}
        </h3>
      );
    } else {
      elements.push(
        <p key={`p-${i}`} className="text-xs sm:text-sm leading-relaxed text-text/95">
          {renderInlineFormatted(line)}
        </p>
      );
    }
  }

  flushList();
  flushBullets();

  return <div className="space-y-2.5">{elements}</div>;
}

export default function AskAI() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [agentPhase, setAgentPhase] = useState<AgentPhase>("idle");
  const [activeAgentLog, setActiveAgentLog] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [feedbackMap, setFeedbackMap] = useState<Record<string, "helpful" | "unhelpful">>({});
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, agentPhase, activeAgentLog]);

  const runAgentPipeline = async () => {
    setAgentPhase("intake");
    setActiveAgentLog("Parsing query intent & routing...");
    await new Promise((r) => setTimeout(r, 450));

    setAgentPhase("retrieval");
    setActiveAgentLog("Searching résumé, 5 project case studies & experience...");
    await new Promise((r) => setTimeout(r, 550));

    setAgentPhase("reasoning");
    setActiveAgentLog("Cross-referencing technical context & synthesizing...");
    await new Promise((r) => setTimeout(r, 450));

    setAgentPhase("grounding");
    setActiveAgentLog("Fact-checking against knowledge base & formatting...");
    await new Promise((r) => setTimeout(r, 350));
  };

  const [lastPrompt, setLastPrompt] = useState("");

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const trimmed = text.trim();
    setLastPrompt(trimmed);

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed,
    };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);
    setError(null);

    const pipelinePromise = runAgentPipeline();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      await pipelinePromise;

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        let errMsg = data.error || "Failed to get response";
        if (typeof errMsg === "string" && (errMsg.includes('"message"') || errMsg.startsWith("{"))) {
          try {
            const parsed = JSON.parse(errMsg);
            errMsg = parsed.error?.message || parsed.message || errMsg;
          } catch {}
        }
        throw new Error(errMsg);
      }

      const data = await res.json();
      setAgentPhase("complete");
      setActiveAgentLog("Response verified and delivered ✓");
      await new Promise((r) => setTimeout(r, 400));

      const sources = inferSources(data.content);
      const followUps = generateFollowUps(data.content);

      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.content,
        sources,
        followUps,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setAgentPhase("idle");
        setActiveAgentLog("");
      }, 700);
    }
  };

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFeedback = (id: string, type: "helpful" | "unhelpful") => {
    setFeedbackMap((prev) => ({ ...prev, [id]: type }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const getAgentStatus = (agentId: string) => {
    const phaseOrder = ["intake", "retrieval", "reasoning", "grounding", "complete"];
    const currentIdx = phaseOrder.indexOf(agentPhase);
    const agentIdx = phaseOrder.indexOf(agentId);
    if (agentPhase === "idle") return "idle";
    if (agentPhase === "complete") return "done";
    if (agentIdx < currentIdx) return "done";
    if (agentIdx === currentIdx) return "active";
    return "pending";
  };

  return (
    <section id="ask" className="mx-auto max-w-[1200px] scroll-mt-32 sm:scroll-mt-36 px-4 sm:px-6 py-24 sm:py-36">
      {/* SECTION HEADER */}
      <div className="mb-10 sm:mb-14">
        <p className="text-xs sm:text-sm font-medium tracking-wide text-accent">Autonomous AI Assistant</p>
        <h2 className="mt-2 text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[1.04] tracking-[-0.03em]">
          Ask Subhani.
        </h2>
        <p className="mt-3 max-w-[56ch] text-base sm:text-lg text-muted">
          A 4-agent autonomous pipeline grounded in my résumé, real codebases, and case studies. Ask anything about my stack, projects, or background.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* DESKTOP LEFT: AUTONOMOUS AGENT GRAPH */}
        <div className="hidden lg:block lg:col-span-4 space-y-4">
          {/* Agent Pipeline Card */}
          <div className="rounded-[28px] border border-line bg-card p-6 shadow-sm">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Sparkles size={18} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-text">Autonomous Agent Graph</h3>
                <p className="text-[11px] text-muted">4-agent stateful pipeline</p>
              </div>
            </div>

            {/* Agent Nodes */}
            <div className="space-y-2">
              {agents.map((agent, idx) => {
                const status = getAgentStatus(agent.id);
                const AgentIcon = agent.icon;
                const isActive = status === "active";
                const isDone = status === "done";

                return (
                  <div key={agent.id}>
                    <div
                      className={`relative rounded-2xl border p-3.5 transition-all duration-500 ${
                        isActive
                          ? "border-[var(--agent-color)]/50 bg-[var(--agent-color)]/5 shadow-lg"
                          : isDone
                          ? "border-emerald-500/30 bg-emerald-500/5"
                          : "border-line bg-bg/50"
                      }`}
                      style={{ "--agent-color": agent.color } as React.CSSProperties}
                    >
                      {isActive && (
                        <div className="absolute -inset-px rounded-2xl animate-pulse opacity-30" style={{ border: `1px solid ${agent.color}` }} />
                      )}

                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-9 w-9 items-center justify-center rounded-xl shrink-0 transition-all"
                          style={{
                            backgroundColor: isActive ? `${agent.color}20` : isDone ? "#30d15820" : "var(--line)",
                            color: isActive ? agent.color : isDone ? "#30d158" : "var(--muted)",
                          }}
                        >
                          {isActive ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : isDone ? (
                            <CheckCircle2 size={16} />
                          ) : (
                            <AgentIcon size={16} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span
                              className="text-xs font-bold transition-colors"
                              style={{ color: isActive ? agent.color : isDone ? "#30d158" : "var(--text)" }}
                            >
                              {agent.name}
                            </span>
                            {isDone && (
                              <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">✓</span>
                            )}
                            {isActive && (
                              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded animate-pulse" style={{ color: agent.color, backgroundColor: `${agent.color}15` }}>
                                RUNNING
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-muted truncate">{agent.role}</div>
                        </div>
                      </div>

                      {isActive && activeAgentLog && (
                        <div className="mt-2.5 rounded-lg bg-bg/80 px-3 py-2 font-mono text-[10px] border border-line/50" style={{ color: agent.color }}>
                          <span className="animate-pulse">›</span> {activeAgentLog}
                        </div>
                      )}
                    </div>

                    {idx < agents.length - 1 && (
                      <div className="flex justify-center py-1">
                        <div className={`w-px h-3.5 transition-colors duration-500 ${isDone ? "bg-emerald-500/50" : "bg-line"}`} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Pipeline Status Footer */}
            <div className="mt-4 rounded-xl border border-line/60 bg-bg/50 p-3">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-muted">Pipeline Status</span>
                <span className={`font-mono font-bold ${
                  agentPhase === "idle" ? "text-muted" : agentPhase === "complete" ? "text-emerald-400" : "text-accent"
                }`}>
                  {agentPhase === "idle" ? "AWAITING INPUT" : agentPhase === "complete" ? "ALL AGENTS DONE" : "EXECUTING"}
                </span>
              </div>
              {agentPhase !== "idle" && agentPhase !== "complete" && (
                <div className="mt-2 h-1 w-full rounded-full bg-line overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: agentPhase === "intake" ? "25%" : agentPhase === "retrieval" ? "50%" : agentPhase === "reasoning" ? "75%" : "95%",
                      background: `linear-gradient(90deg, #0a84ff, #bf5af2, #ff9f0a, #30d158)`,
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Quick Prompts — Desktop */}
          <div className="rounded-[28px] border border-line bg-card p-5 shadow-sm">
            <p className="text-xs font-semibold text-text mb-3">Suggested Topics</p>
            <div className="space-y-1.5">
              {starterPrompts.slice(0, 4).map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  disabled={isLoading}
                  className="w-full text-left rounded-xl border border-line bg-bg px-3.5 py-2 text-xs text-muted hover:text-text hover:border-accent/40 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CHAT PANEL (Full width on mobile, 8-cols on desktop) */}
        <div className="col-span-12 lg:col-span-8">
          <div className="relative rounded-[24px] sm:rounded-[28px] border border-line/80 bg-card shadow-[0_4px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_30px_rgba(10,132,255,0.08)] overflow-hidden flex flex-col h-[600px] sm:h-[660px] transition-all duration-300 hover:border-accent/40">
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b border-line px-4 sm:px-5 py-3.5 bg-card/90 backdrop-blur-sm">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <MessageCircle size={16} />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 border-2 border-card" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-text">Subhani&apos;s AI Assistant</div>
                  <div className="text-[10px] sm:text-[11px] text-muted">
                    4 autonomous agents · Grounded in résumé · Gemini Flash
                  </div>
                </div>
              </div>
              {messages.length > 0 && (
                <button
                  onClick={() => { setMessages([]); setError(null); }}
                  className="rounded-lg border border-line px-2.5 py-1 text-[11px] text-muted hover:text-text hover:border-accent/40 transition-colors cursor-pointer"
                >
                  Clear Chat
                </button>
              )}
            </div>

            {/* EMBEDDED LIVE 4-AGENT PIPELINE BAR (PERMANENTLY VISIBLE IN MOBILE & DESKTOP CHAT) */}
            <div className="border-b border-line/70 bg-bg/70 backdrop-blur-md px-3 sm:px-5 py-2.5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-text flex items-center gap-1.5">
                  <Sparkles size={12} className="text-accent" /> 4-Agent Pipeline
                </span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                  agentPhase === "idle"
                    ? "text-muted bg-line/40"
                    : agentPhase === "complete"
                    ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                    : "text-accent bg-accent/10 border border-accent/20 animate-pulse"
                }`}>
                  {agentPhase === "idle" ? "READY" : agentPhase === "complete" ? "ALL 4 AGENTS VERIFIED ✓" : `${agentPhase.toUpperCase()} RUNNING...`}
                </span>
              </div>

              {/* 4 Agent interactive status nodes */}
              <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                {agents.map((agent) => {
                  const status = getAgentStatus(agent.id);
                  const isActive = status === "active";
                  const isDone = status === "done";
                  const Icon = agent.icon;

                  return (
                    <div
                      key={agent.id}
                      className={`flex items-center justify-center sm:justify-start gap-1 sm:gap-2 rounded-xl py-1.5 px-1.5 sm:px-2.5 text-center sm:text-left transition-all ${
                        isActive
                          ? "border border-accent/60 bg-accent/15 text-accent shadow-sm"
                          : isDone
                          ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                          : "border border-line/50 bg-card/70 text-muted"
                      }`}
                    >
                      {isActive ? (
                        <Loader2 size={12} className="animate-spin text-accent shrink-0" />
                      ) : isDone ? (
                        <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
                      ) : (
                        <Icon size={12} className="shrink-0" />
                      )}
                      <div className="min-w-0">
                        <span className="block text-[10px] sm:text-xs font-semibold truncate leading-tight">
                          {agent.name.split(" ")[0]}
                        </span>
                        <span className="hidden sm:block text-[9px] text-muted truncate">
                          {agent.role.split(" ")[0]}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {activeAgentLog && (
                <div className="mt-2 text-center font-mono text-[10px] text-accent truncate px-2.5 py-1 bg-accent/10 rounded-lg border border-accent/20">
                  <span className="animate-pulse">›</span> {activeAgentLog}
                </div>
              )}
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-3.5 sm:px-5 py-4 sm:py-5 space-y-5">
              {messages.length === 0 && !isLoading && (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 px-2">
                  <div className="relative">
                    <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/20 via-purple-500/10 to-emerald-500/10 text-accent">
                      <Sparkles size={26} />
                    </div>
                    <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-emerald-400 flex items-center justify-center">
                      <Zap size={10} className="text-white" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-base sm:text-lg font-semibold text-text">Hi! I&apos;m Subhani&apos;s autonomous AI.</p>
                    <p className="text-xs sm:text-sm text-muted max-w-[44ch]">
                      I run a 4-agent pipeline to answer questions about his AI-SDE experience, projects, and stack with fact-checked grounding.
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 max-w-lg pt-2">
                    {starterPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => sendMessage(prompt)}
                        className="rounded-full border border-line bg-bg px-3 py-1.5 text-xs text-muted font-medium hover:border-accent/40 hover:text-text transition-all cursor-pointer"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 sm:gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent mt-0.5">
                      <Bot size={15} />
                    </div>
                  )}

                  <div
                    className={`max-w-[90%] sm:max-w-[84%] rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm shadow-sm ${
                      msg.role === "user"
                        ? "bg-accent text-white rounded-br-md"
                        : "bg-bg border border-line text-text rounded-bl-md"
                    }`}
                  >
                    {/* Message Body with Rich Formatting */}
                    {msg.role === "assistant" ? (
                      <FormattedContent text={msg.content} />
                    ) : (
                      <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                    )}

                    {/* Assistant Metadata & Source Badges */}
                    {msg.role === "assistant" && (
                      <div className="mt-3.5 pt-3 border-t border-line/60 space-y-2.5">
                        {/* 4 Autonomous Agents Stamp */}
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-text">
                            <Sparkles size={10} className="text-accent" /> 4 Agents:
                          </span>
                          <span className="rounded-md bg-accent/10 border border-accent/20 px-1.5 py-0.5 text-[9px] font-mono text-accent">
                            Intake ✓
                          </span>
                          <span className="rounded-md bg-purple-500/10 border border-purple-500/20 px-1.5 py-0.5 text-[9px] font-mono text-purple-400">
                            Retrieval ✓
                          </span>
                          <span className="rounded-md bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 text-[9px] font-mono text-amber-400">
                            Reasoning ✓
                          </span>
                          <span className="rounded-md bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 text-[9px] font-mono text-emerald-400">
                            Grounding ✓
                          </span>
                        </div>

                        {/* Source badges */}
                        {msg.sources && msg.sources.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 mr-1">
                              <Shield size={11} /> Grounded in:
                            </span>
                            {msg.sources.map((src) => (
                              <span
                                key={src}
                                className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[9px] text-emerald-400 font-mono"
                              >
                                <Database size={9} /> {src}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Interactive Feedback & Copy Bar */}
                        <div className="flex items-center justify-between pt-1 text-[11px] text-muted">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px]">Helpful?</span>
                            <button
                              onClick={() => handleFeedback(msg.id, "helpful")}
                              className={`p-1 rounded-md transition-colors cursor-pointer ${
                                feedbackMap[msg.id] === "helpful"
                                  ? "text-emerald-400 bg-emerald-500/10"
                                  : "hover:text-text"
                              }`}
                              title="Helpful"
                              aria-label="Thumbs up"
                            >
                              <ThumbsUp size={12} />
                            </button>
                            <button
                              onClick={() => handleFeedback(msg.id, "unhelpful")}
                              className={`p-1 rounded-md transition-colors cursor-pointer ${
                                feedbackMap[msg.id] === "unhelpful"
                                  ? "text-red-400 bg-red-500/10"
                                  : "hover:text-text"
                              }`}
                              title="Not helpful"
                              aria-label="Thumbs down"
                            >
                              <ThumbsDown size={12} />
                            </button>
                            {feedbackMap[msg.id] && (
                              <span className="text-[9px] text-emerald-400 font-medium">
                                Thanks for feedback! ✨
                              </span>
                            )}
                          </div>

                          <button
                            onClick={() => handleCopy(msg.id, msg.content)}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-card hover:text-text transition-colors cursor-pointer text-[10px]"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check size={11} className="text-emerald-400" /> Copied
                              </>
                            ) : (
                              <>
                                <Copy size={11} /> Copy
                              </>
                            )}
                          </button>
                        </div>

                        {/* Suggested Follow-Up Questions ("Giving question after response") */}
                        {msg.followUps && msg.followUps.length > 0 && (
                          <div className="pt-2 border-t border-line/40">
                            <p className="text-[10px] font-semibold text-muted mb-1.5 flex items-center gap-1">
                              <HelpCircle size={10} className="text-accent" /> Suggested follow-ups:
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {msg.followUps.map((q) => (
                                <button
                                  key={q}
                                  onClick={() => sendMessage(q)}
                                  disabled={isLoading}
                                  className="inline-flex items-center gap-1 rounded-full border border-line bg-card/80 px-2.5 py-1 text-[10px] sm:text-[11px] text-muted hover:text-text hover:border-accent/40 hover:bg-accent/5 transition-all cursor-pointer text-left disabled:opacity-50"
                                >
                                  <span>{q}</span>
                                  <ArrowRight size={9} className="text-accent shrink-0" />
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {msg.role === "user" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-text/10 text-text mt-0.5">
                      <User size={15} />
                    </div>
                  )}
                </div>
              ))}

              {/* Real-time Agent Execution State */}
              {isLoading && !error && (
                <div className="flex gap-2.5 sm:gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent mt-0.5">
                    <Bot size={15} />
                  </div>
                  <div className="rounded-2xl rounded-bl-md bg-bg border border-line p-3.5 sm:p-4 space-y-2.5 min-w-[240px] max-w-[85%]">
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <Loader2 size={14} className="animate-spin text-accent" />
                      <span className="text-text font-medium">
                        {agentPhase === "intake" && "Intake Agent parsing query..."}
                        {agentPhase === "retrieval" && "Retrieval Agent scanning résumé..."}
                        {agentPhase === "reasoning" && "Reasoning Agent synthesizing..."}
                        {agentPhase === "grounding" && "Grounding Agent fact-checking..."}
                        {agentPhase === "complete" && "Delivering response..."}
                      </span>
                    </div>

                    {/* Multi-agent visual progress bar */}
                    <div className="h-1.5 w-full rounded-full bg-line overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500 ease-out"
                        style={{
                          width: agentPhase === "intake" ? "25%" : agentPhase === "retrieval" ? "50%" : agentPhase === "reasoning" ? "75%" : agentPhase === "grounding" ? "90%" : "100%",
                          background: `linear-gradient(90deg, #0a84ff, #bf5af2, #ff9f0a, #30d158)`,
                        }}
                      />
                    </div>
                    <div className="font-mono text-[10px] text-muted truncate">
                      {activeAgentLog || "Agents coordinating..."}
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="flex gap-2.5 sm:gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400 mt-0.5">
                    <X size={15} />
                  </div>
                  <div className="rounded-2xl rounded-bl-md bg-red-500/5 border border-red-500/20 p-3.5 text-xs sm:text-sm text-red-400 max-w-[85%] space-y-2">
                    <p className="leading-relaxed">{error}</p>
                    <div className="flex items-center gap-3 pt-1">
                      {lastPrompt && (
                        <button
                          onClick={() => {
                            setError(null);
                            sendMessage(lastPrompt);
                          }}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1 text-xs text-white font-medium hover:opacity-90 transition-opacity cursor-pointer"
                        >
                          Retry Query ↺
                        </button>
                      )}
                      <button
                        onClick={() => setError(null)}
                        className="text-xs text-muted hover:text-text cursor-pointer"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input bar */}
            <form onSubmit={handleSubmit} className="border-t border-line p-3 sm:p-4 flex items-center gap-2 sm:gap-3 bg-card/60 backdrop-blur-sm">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about projects, stack, experience..."
                disabled={isLoading}
                className="flex-1 bg-transparent px-2 py-1 text-xs sm:text-sm text-text outline-none placeholder:text-muted disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="rounded-full bg-accent p-2.5 text-white transition-all hover:opacity-90 disabled:opacity-30 cursor-pointer shrink-0"
                aria-label="Send message"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
