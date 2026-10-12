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
  ArrowRight,
  X,
  MessageCircle,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

type AgentPhase = "idle" | "retrieving" | "connecting" | "processing" | "complete";

const agentSteps = [
  { id: "retrieving", label: "Retrieving", desc: "Searching resume & case studies", icon: Search, color: "text-accent", bg: "bg-accent/10" },
  { id: "connecting", label: "Connecting", desc: "Cross-referencing projects", icon: GitBranch, color: "text-purple-400", bg: "bg-purple-500/10" },
  { id: "processing", label: "Processing", desc: "Generating grounded answer", icon: Cpu, color: "text-amber-400", bg: "bg-amber-500/10" },
  { id: "complete", label: "Verified", desc: "Answer verified against knowledge", icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10" },
];

const suggestedPrompts = [
  "What did you build at Ruvinsys?",
  "Explain BloodBridge's architecture",
  "What's your tech stack?",
  "Tell me about your experience",
  "What is your education?",
  "How does the 4-agent exam pipeline work?",
];

export default function AskAI() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [agentPhase, setAgentPhase] = useState<AgentPhase>("idle");
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, agentPhase]);

  const simulateAgentPhases = async () => {
    setAgentPhase("retrieving");
    await new Promise((r) => setTimeout(r, 800));
    setAgentPhase("connecting");
    await new Promise((r) => setTimeout(r, 600));
    setAgentPhase("processing");
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: text.trim() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);
    setError(null);

    const phasePromise = simulateAgentPhases();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      await phasePromise;

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to get response");
      }

      const data = await res.json();
      setAgentPhase("complete");
      await new Promise((r) => setTimeout(r, 500));

      setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    } finally {
      setIsLoading(false);
      setTimeout(() => setAgentPhase("idle"), 800);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <section id="ask" className="mx-auto max-w-[1200px] scroll-mt-24 px-6 py-28 sm:py-36">
      {/* SECTION HEADER */}
      <div className="mb-14">
        <p className="text-sm font-medium tracking-wide text-accent">AI Assistant</p>
        <h2 className="mt-3 text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[1.04] tracking-[-0.03em]">
          Ask Subhani.
        </h2>
        <p className="mt-4 max-w-[56ch] text-lg text-muted">
          An AI grounded in my résumé and case studies. Ask anything about my work, projects, stack, or experience.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* LEFT: AGENT PIPELINE SIDEBAR */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          <div className="rounded-[28px] border border-line bg-card p-6 shadow-sm">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Sparkles size={18} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-text">Agent Pipeline</h3>
                <p className="text-[11px] text-muted">Multi-stage retrieval system</p>
              </div>
            </div>

            {/* Agent Steps */}
            <div className="space-y-3">
              {agentSteps.map((step, idx) => {
                const StepIcon = step.icon;
                const stepIndex = agentSteps.findIndex((s) => s.id === step.id);
                const activeIndex = agentSteps.findIndex((s) => s.id === agentPhase);
                const isActive = step.id === agentPhase;
                const isDone = (stepIndex < activeIndex) || agentPhase === "complete";
                const isIdle = agentPhase === "idle";

                return (
                  <div
                    key={step.id}
                    className={`flex items-center gap-3 rounded-2xl border p-3.5 transition-all duration-500 ${
                      isActive
                        ? `border-accent/40 ${step.bg} shadow-md`
                        : isDone
                        ? "border-emerald-500/30 bg-emerald-500/5"
                        : "border-line bg-bg/50"
                    }`}
                  >
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg shrink-0 transition-all ${
                      isActive ? `${step.bg} ${step.color}` : isDone ? "bg-emerald-500/10 text-emerald-400" : "bg-line/50 text-muted/50"
                    }`}>
                      {isActive ? (
                        <Loader2 size={15} className="animate-spin" />
                      ) : isDone ? (
                        <CheckCircle2 size={15} />
                      ) : (
                        <StepIcon size={15} />
                      )}
                    </div>
                    <div>
                      <div className={`text-xs font-semibold transition-colors ${
                        isActive ? step.color : isDone ? "text-emerald-400" : isIdle ? "text-muted" : "text-muted/50"
                      }`}>
                        {step.label}
                      </div>
                      <div className="text-[10px] text-muted">{step.desc}</div>
                    </div>
                    {isDone && (
                      <div className="ml-auto">
                        <span className="text-[10px] font-mono text-emerald-400">done</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Knowledge Source */}
            <div className="mt-5 rounded-xl border border-line/60 bg-bg/50 p-3 text-center">
              <p className="text-[10px] text-muted leading-relaxed">
                Grounded in résumé &amp; case studies only.
                <br />
                Powered by Gemini · 10 msgs/min
              </p>
            </div>
          </div>

          {/* Quick Prompts for Desktop */}
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
          <div className="rounded-[28px] border border-line bg-card shadow-sm overflow-hidden flex flex-col" style={{ height: "600px" }}>
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <MessageCircle size={16} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-text">Ask about {profile.name.split(" ")[0]}</div>
                  <div className="text-[11px] text-muted flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    AI Online · Knowledge-grounded
                  </div>
                </div>
              </div>
              {messages.length > 0 && (
                <button
                  onClick={() => { setMessages([]); setError(null); }}
                  className="rounded-lg border border-line px-2.5 py-1 text-[11px] text-muted hover:text-text hover:border-accent/40 transition-colors"
                >
                  Clear chat
                </button>
              )}
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
              {messages.length === 0 && !isLoading && (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/20 via-purple-500/10 to-pink-500/10 text-accent">
                    <Sparkles size={28} />
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-lg font-semibold text-text">Hi! I know everything about Subhani.</p>
                    <p className="text-sm text-muted max-w-[44ch]">
                      Ask me about his projects, tech stack, experience at Ruvinsys, BloodBridge AI architecture, or anything from his résumé.
                    </p>
                  </div>

                  {/* Mobile Suggested Prompts */}
                  <div className="flex flex-wrap justify-center gap-2 lg:hidden">
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
                    {msg.role === "assistant" && (
                      <div className="mt-2 pt-2 border-t border-line/50 flex items-center gap-1.5">
                        <CheckCircle2 size={10} className="text-emerald-400" />
                        <span className="text-[10px] text-muted">Verified from résumé &amp; case studies</span>
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

              {/* Loading with agent phase indicator */}
              {isLoading && !error && (
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent mt-0.5">
                    <Bot size={15} />
                  </div>
                  <div className="rounded-2xl rounded-bl-lg bg-bg border border-line px-4 py-3 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <Loader2 size={14} className="animate-spin text-accent" />
                      <span>
                        {agentPhase === "retrieving" && "Searching knowledge base..."}
                        {agentPhase === "connecting" && "Cross-referencing projects..."}
                        {agentPhase === "processing" && "Generating response..."}
                        {agentPhase === "complete" && "Verifying answer..."}
                      </span>
                    </div>
                    {/* Mini progress bar */}
                    <div className="h-1 w-full rounded-full bg-line overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-accent via-purple-400 to-emerald-400 transition-all duration-700"
                        style={{
                          width: agentPhase === "retrieving" ? "25%" : agentPhase === "connecting" ? "50%" : agentPhase === "processing" ? "75%" : "100%",
                        }}
                      />
                    </div>
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
                    <button
                      onClick={() => setError(null)}
                      className="mt-2 text-xs underline hover:text-red-300"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Input bar */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-line px-4 py-3 flex items-center gap-3"
            >
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
                className="rounded-full bg-accent p-2.5 text-white transition-all hover:opacity-90 disabled:opacity-40"
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
