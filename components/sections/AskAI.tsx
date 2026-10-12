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
  MessageSquare,
  User,
  Bot,
  ArrowRight,
  X,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

type AgentPhase = "idle" | "retrieving" | "connecting" | "processing" | "complete";

const agentSteps = [
  { id: "retrieving", label: "Retrieving", desc: "Searching resume & case studies", icon: Search, color: "text-accent" },
  { id: "connecting", label: "Connecting", desc: "Cross-referencing projects", icon: GitBranch, color: "text-purple-400" },
  { id: "processing", label: "Processing", desc: "Gemini generating response", icon: Cpu, color: "text-amber-400" },
  { id: "complete", label: "Verified", desc: "Grounded in knowledge base", icon: CheckCircle2, color: "text-emerald-400" },
];

const suggestedPrompts = [
  "What did you build at Ruvinsys?",
  "Explain BloodBridge's architecture",
  "What's your tech stack?",
  "Tell me about your experience",
  "What is your education background?",
  "How does the exam pipeline work?",
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
    await new Promise((r) => setTimeout(r, 600));
    setAgentPhase("connecting");
    await new Promise((r) => setTimeout(r, 500));
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

    // Start agent animation
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
      await new Promise((r) => setTimeout(r, 400));

      setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    } finally {
      setIsLoading(false);
      setTimeout(() => setAgentPhase("idle"), 600);
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
          An AI grounded in my résumé and case studies. Ask anything about my work, stack, or experience.
        </p>
      </div>

      {/* CHAT PANEL */}
      <div className="rounded-[28px] border border-line bg-card shadow-sm overflow-hidden">
        {/* Agent Pipeline Status Bar */}
        {agentPhase !== "idle" && (
          <div className="border-b border-line bg-bg/50 px-5 py-3">
            <div className="flex items-center gap-4">
              {agentSteps.map((step) => {
                const StepIcon = step.icon;
                const stepIndex = agentSteps.findIndex((s) => s.id === step.id);
                const activeIndex = agentSteps.findIndex((s) => s.id === agentPhase);
                const isActive = step.id === agentPhase;
                const isDone = stepIndex < activeIndex || agentPhase === "complete";
                const isPending = stepIndex > activeIndex && agentPhase !== "complete";

                return (
                  <div
                    key={step.id}
                    className={`flex items-center gap-2 text-xs transition-all duration-300 ${
                      isActive
                        ? `${step.color} font-semibold`
                        : isDone
                        ? "text-emerald-400"
                        : "text-muted/40"
                    }`}
                  >
                    {isActive ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : isDone ? (
                      <CheckCircle2 size={14} />
                    ) : (
                      <StepIcon size={14} />
                    )}
                    <span className="hidden sm:inline">{step.label}</span>
                    {stepIndex < agentSteps.length - 1 && (
                      <ArrowRight size={10} className="text-muted/30 ml-1" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Chat Messages Area */}
        <div
          ref={scrollRef}
          className="h-[400px] overflow-y-auto px-5 py-5 sm:px-6 space-y-4"
        >
          {messages.length === 0 && !isLoading && (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                <Sparkles size={24} />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-semibold text-text">Ask me anything about Subhani</p>
                <p className="text-xs text-muted max-w-[40ch]">
                  Answers come from my résumé and case studies only.
                </p>
              </div>

              {/* Suggested Prompt Chips */}
              <div className="flex flex-wrap justify-center gap-2">
                {suggestedPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    className="glass rounded-full px-4 py-2 text-xs text-text font-medium hover:border-accent transition-all cursor-pointer"
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
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Bot size={16} />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-accent text-white"
                    : "bg-bg border border-line text-text"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
              {msg.role === "user" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-text/10 text-text">
                  <User size={16} />
                </div>
              )}
            </div>
          ))}

          {/* Loading state with agent animation */}
          {isLoading && !error && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Bot size={16} />
              </div>
              <div className="flex items-center gap-2 rounded-2xl bg-bg border border-line px-4 py-3 text-sm text-muted">
                <Loader2 size={14} className="animate-spin text-accent" />
                <span>Thinking...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                <X size={16} />
              </div>
              <div className="rounded-2xl bg-red-500/5 border border-red-500/20 px-4 py-3 text-sm text-red-400">
                {error}
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
            placeholder="Ask about my projects, stack, or experience..."
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

        {/* Disclaimer */}
        <div className="border-t border-line px-5 py-2 text-center">
          <p className="text-[10px] text-muted">
            Answers come from my résumé and case studies · Powered by Gemini · 10 msgs/min limit
          </p>
        </div>
      </div>
    </section>
  );
}
