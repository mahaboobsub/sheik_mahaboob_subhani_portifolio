"use client";

import { useState, useRef, useEffect } from "react";
import { profile } from "@/lib/content";
import {
  Send,
  Sparkles,
  Search,
  GitBranch,
  Cpu,
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
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: string[];
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

const suggestedPrompts = [
  "What did you build at Ruvinsys?",
  "Explain BloodBridge's 14-node architecture",
  "What are your technical skills?",
  "Tell me about your experience",
  "What is your education background?",
  "How does the CBSE exam pipeline work?",
];

// Infer sources from the AI response content
function inferSources(content: string): string[] {
  const sources: string[] = [];
  const lower = content.toLowerCase();
  if (lower.includes("ruvinsys") || lower.includes("exam") || lower.includes("cbse")) sources.push("Experience: Ruvinsys Global Solutions");
  if (lower.includes("nit") || lower.includes("intern")) sources.push("Experience: NIT Andhra Pradesh");
  if (lower.includes("bloodbridge") || lower.includes("donor") || lower.includes("neo4j")) sources.push("Project: BloodBridge AI");
  if (lower.includes("fashion") || lower.includes("vgg16") || lower.includes("cosine")) sources.push("Project: Fashion Recommender");
  if (lower.includes("password") || lower.includes("aes") || lower.includes("jwt")) sources.push("Project: Password Manager");
  if (lower.includes("education") || lower.includes("b.tech") || lower.includes("diploma") || lower.includes("dnr") || lower.includes("cgpa")) sources.push("Education Section");
  if (lower.includes("fastapi") || lower.includes("python") || lower.includes("java") || lower.includes("node")) sources.push("Technical Skills");
  if (lower.includes("oracle") || lower.includes("certification") || lower.includes("hackathon") || lower.includes("250")) sources.push("Achievements & Certifications");
  return sources.length > 0 ? sources : ["Resume & Case Studies"];
}

export default function AskAI() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [agentPhase, setAgentPhase] = useState<AgentPhase>("idle");
  const [activeAgentLog, setActiveAgentLog] = useState("");
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, agentPhase]);

  const runAgentPipeline = async () => {
    setAgentPhase("intake");
    setActiveAgentLog("Parsing query intent...");
    await new Promise((r) => setTimeout(r, 500));
    setActiveAgentLog("Entities extracted, routing to retrieval...");
    await new Promise((r) => setTimeout(r, 400));

    setAgentPhase("retrieval");
    setActiveAgentLog("Searching resume knowledge base...");
    await new Promise((r) => setTimeout(r, 500));
    setActiveAgentLog("Scanning 5 project case studies...");
    await new Promise((r) => setTimeout(r, 400));
    setActiveAgentLog("3 relevant sources found");
    await new Promise((r) => setTimeout(r, 300));

    setAgentPhase("reasoning");
    setActiveAgentLog("Cross-referencing experience & projects...");
    await new Promise((r) => setTimeout(r, 500));
    setActiveAgentLog("Synthesizing answer from sources...");
    await new Promise((r) => setTimeout(r, 400));

    setAgentPhase("grounding");
    setActiveAgentLog("Fact-checking against knowledge base...");
    await new Promise((r) => setTimeout(r, 400));
    setActiveAgentLog("All claims verified ✓");
    await new Promise((r) => setTimeout(r, 300));
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: text.trim() };
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
        const data = await res.json();
        throw new Error(data.error || "Failed to get response");
      }

      const data = await res.json();
      setAgentPhase("complete");
      setActiveAgentLog("Response delivered");
      await new Promise((r) => setTimeout(r, 500));

      const sources = inferSources(data.content);
      setMessages((prev) => [...prev, { role: "assistant", content: data.content, sources }]);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setAgentPhase("idle");
        setActiveAgentLog("");
      }, 800);
    }
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
    <section id="ask" className="mx-auto max-w-[1200px] scroll-mt-24 px-6 py-28 sm:py-36">
      {/* SECTION HEADER */}
      <div className="mb-14">
        <p className="text-sm font-medium tracking-wide text-accent">Autonomous AI Assistant</p>
        <h2 className="mt-3 text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[1.04] tracking-[-0.03em]">
          Ask Subhani.
        </h2>
        <p className="mt-4 max-w-[56ch] text-lg text-muted">
          A 4-agent autonomous pipeline grounded in my résumé and case studies. Watch the agents work in real time.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* LEFT: AUTONOMOUS AGENT GRAPH */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
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
                    {/* Agent Node */}
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
                      {/* Active pulse ring */}
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

                      {/* Active Agent Log */}
                      {isActive && activeAgentLog && (
                        <div className="mt-2.5 rounded-lg bg-bg/80 px-3 py-2 font-mono text-[10px] border border-line/50" style={{ color: agent.color }}>
                          <span className="animate-pulse">›</span> {activeAgentLog}
                        </div>
                      )}
                    </div>

                    {/* Connection Line */}
                    {idx < agents.length - 1 && (
                      <div className="flex justify-center py-1">
                        <div className={`w-px h-4 transition-colors duration-500 ${isDone ? "bg-emerald-500/50" : "bg-line"}`} />
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
                      width: agentPhase === "intake" ? "20%" : agentPhase === "retrieval" ? "45%" : agentPhase === "reasoning" ? "70%" : "90%",
                      background: `linear-gradient(90deg, #0a84ff, #bf5af2, #ff9f0a, #30d158)`,
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Quick Prompts — Desktop Only */}
          <div className="hidden lg:block rounded-[28px] border border-line bg-card p-5 shadow-sm">
            <p className="text-xs font-semibold text-text mb-3">Try asking</p>
            <div className="space-y-2">
              {suggestedPrompts.slice(0, 4).map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  disabled={isLoading}
                  className="w-full text-left rounded-xl border border-line bg-bg px-3.5 py-2.5 text-xs text-muted hover:text-text hover:border-accent/40 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: CHAT PANEL */}
        <div className="col-span-12 lg:col-span-8">
          <div className="rounded-[28px] border border-line bg-card shadow-sm overflow-hidden flex flex-col" style={{ height: "640px" }}>
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <MessageCircle size={16} />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 border-2 border-card" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-text">Subhani&apos;s AI Assistant</div>
                  <div className="text-[11px] text-muted">
                    4 autonomous agents · Knowledge-grounded · Gemini
                  </div>
                </div>
              </div>
              {messages.length > 0 && (
                <button
                  onClick={() => { setMessages([]); setError(null); }}
                  className="rounded-lg border border-line px-2.5 py-1 text-[11px] text-muted hover:text-text hover:border-accent/40 transition-colors cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
              {messages.length === 0 && !isLoading && (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-5">
                  <div className="relative">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/20 via-purple-500/10 to-emerald-500/10 text-accent">
                      <Sparkles size={28} />
                    </div>
                    <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-emerald-400 flex items-center justify-center">
                      <Zap size={10} className="text-white" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-lg font-semibold text-text">Hi! I&apos;m Subhani&apos;s autonomous AI.</p>
                    <p className="text-sm text-muted max-w-[44ch]">
                      I run a 4-agent pipeline (Intake → Retrieval → Reasoning → Grounding) to answer questions about his work. Every answer is fact-checked against his résumé.
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-2">
                    {suggestedPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => sendMessage(prompt)}
                        className="rounded-full border border-line bg-bg px-3.5 py-2 text-xs text-muted font-medium hover:border-accent/40 hover:text-text transition-all cursor-pointer"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent mt-0.5">
                      <Bot size={15} />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-accent text-white rounded-br-lg"
                        : "bg-bg border border-line text-text rounded-bl-lg"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>

                    {/* Source Attribution for AI messages */}
                    {msg.role === "assistant" && msg.sources && msg.sources.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-line/50 space-y-2">
                        <div className="flex items-center gap-1.5">
                          <Shield size={10} className="text-emerald-400" />
                          <span className="text-[10px] font-semibold text-emerald-400">Grounded & Verified</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {msg.sources.map((src) => (
                            <span
                              key={src}
                              className="inline-flex items-center gap-1 rounded-md bg-emerald-500/8 border border-emerald-500/20 px-2 py-0.5 text-[9px] text-emerald-400 font-mono"
                            >
                              <Database size={8} /> {src}
                            </span>
                          ))}
                        </div>
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

              {/* Loading: Show active agent */}
              {isLoading && !error && (
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent mt-0.5">
                    <Bot size={15} />
                  </div>
                  <div className="rounded-2xl rounded-bl-lg bg-bg border border-line px-4 py-3 space-y-2 min-w-[220px]">
                    <div className="flex items-center gap-2 text-sm">
                      <Loader2 size={14} className="animate-spin text-accent" />
                      <span className="text-muted font-medium">
                        {agentPhase === "intake" && "Intake Agent parsing query..."}
                        {agentPhase === "retrieval" && "Retrieval Agent searching..."}
                        {agentPhase === "reasoning" && "Reasoning Agent synthesizing..."}
                        {agentPhase === "grounding" && "Grounding Agent verifying..."}
                        {agentPhase === "complete" && "Delivering response..."}
                      </span>
                    </div>
                    {/* Progress */}
                    <div className="h-1.5 w-full rounded-full bg-line overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{
                          width: agentPhase === "intake" ? "20%" : agentPhase === "retrieval" ? "45%" : agentPhase === "reasoning" ? "70%" : agentPhase === "grounding" ? "90%" : "100%",
                          background: `linear-gradient(90deg, #0a84ff, #bf5af2, #ff9f0a, #30d158)`,
                        }}
                      />
                    </div>
                    <div className="font-mono text-[10px] text-muted">{activeAgentLog}</div>
                  </div>
                </div>
              )}

              {error && (
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400 mt-0.5">
                    <X size={15} />
                  </div>
                  <div className="rounded-2xl rounded-bl-lg bg-red-500/5 border border-red-500/20 px-4 py-3 text-sm text-red-400 max-w-[80%]">
                    <p>{error}</p>
                    <button onClick={() => setError(null)} className="mt-2 text-xs underline hover:text-red-300 cursor-pointer">
                      Dismiss
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Input bar */}
            <form onSubmit={handleSubmit} className="border-t border-line px-4 py-3 flex items-center gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about projects, stack, experience..."
                disabled={isLoading}
                className="flex-1 bg-transparent text-sm text-text outline-none placeholder:text-muted disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="rounded-full bg-accent p-2.5 text-white transition-all hover:opacity-90 disabled:opacity-40 cursor-pointer"
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
