"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { howIBuildChapters, examAgents } from "@/lib/content";
import {
  FileText,
  Cpu,
  Server,
  CheckCircle2,
  Zap,
  ArrowRight,
  Database,
  Activity,
  Layers,
  Sparkles,
  Shield,
  RefreshCw,
  GitBranch,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HowIBuild() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeChapter, setActiveChapter] = useState(0);
  const [selectedAgent, setSelectedAgent] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [liveLatency, setLiveLatency] = useState(94);

  // Live jitter effect for latency meter to give authentic production feel
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveLatency(Math.floor(92 + Math.random() * 8));
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const checkMedia = () => {
      setIsDesktop(window.innerWidth >= 1024);
      setIsReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    };
    checkMedia();
    window.addEventListener("resize", checkMedia);
    return () => window.removeEventListener("resize", checkMedia);
  }, []);

  useEffect(() => {
    if (!isDesktop || isReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress < 0.34) {
            setActiveChapter(0);
          } else if (progress < 0.68) {
            setActiveChapter(1);
          } else {
            setActiveChapter(2);
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isDesktop, isReducedMotion]);

  const scrollToChapter = (index: number) => {
    setActiveChapter(index);
    if (!isDesktop || isReducedMotion || !containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    const containerTop = rect.top + scrollTop;
    const totalScrollable = container.offsetHeight - window.innerHeight;
    const targetScroll = containerTop + (index / 2) * totalScrollable;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  const curr = howIBuildChapters[activeChapter];

  return (
    <section id="how-i-build" className="relative scroll-mt-20">
      {/* SECTION HEADER */}
      <div className="mx-auto max-w-[1200px] px-6 pt-32 pb-12 sm:pt-40">
        <p className="text-sm font-medium tracking-wide text-accent">Architecture & Process</p>
        <h2 className="mt-3 text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[1.04] tracking-[-0.03em]">
          How I build.
        </h2>
        <p className="mt-4 max-w-[56ch] text-lg text-muted">
          From unstructured textbook PDFs to stateful agent graphs and production microservices with sub-100 ms execution.
        </p>
      </div>

      {/* DESKTOP PINNED STORYTELLING CONTAINER (300vh) */}
      <div
        ref={containerRef}
        className={`${isDesktop && !isReducedMotion ? "relative h-[300vh]" : "hidden"}`}
      >
        <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden px-6">
          <div className="mx-auto grid w-full max-w-[1200px] grid-cols-12 gap-12 items-center">
            {/* LEFT COLUMN: CHAPTER SELECTOR & DETAILS */}
            <div className="col-span-5 flex flex-col justify-between py-6">
              {/* Stepper buttons */}
              <div className="space-y-4">
                {howIBuildChapters.map((ch, idx) => {
                  const isActive = activeChapter === idx;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => scrollToChapter(idx)}
                      className={`group w-full text-left transition-all duration-300 rounded-2xl p-4 border ${
                        isActive
                          ? "bg-card border-line shadow-lg"
                          : "border-transparent hover:bg-card/40 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`font-mono text-xs font-semibold px-2 py-0.5 rounded-full ${
                            isActive
                              ? "bg-accent text-white"
                              : "bg-line text-muted group-hover:text-text"
                          }`}
                        >
                          {ch.number}
                        </span>
                        <span className="text-xs uppercase tracking-wider text-muted font-medium">
                          {ch.tag}
                        </span>
                      </div>
                      <h3 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-text">
                        {ch.title}
                      </h3>
                      {isActive && (
                        <p className="mt-2 text-[15px] leading-relaxed text-muted animate-fadeIn">
                          {ch.headline}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Active Chapter Details & Stats */}
              <div className="mt-8 pt-6 border-t border-line">
                <p className="text-[15px] leading-relaxed text-muted">{curr.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {curr.pills.map((pill) => (
                    <span
                      key={pill}
                      className="rounded-full bg-card border border-line px-3 py-1 text-xs text-text font-medium"
                    >
                      {pill}
                    </span>
                  ))}
                </div>

                <div className="mt-6 grid grid-cols-3 gap-4">
                  {curr.stats.map((s) => (
                    <div key={s.label}>
                      <div className="text-xl font-semibold tracking-tight text-text tabular-nums">
                        {s.value}
                      </div>
                      <div className="text-xs text-muted mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: DYNAMIC MORPHING VISUAL */}
            <div className="col-span-7">
              <div className="relative min-h-[560px] rounded-[28px] border border-line bg-card p-6 shadow-2xl transition-all duration-500 overflow-hidden">
                {activeChapter === 0 && <RetrieveVisual />}
                {activeChapter === 1 && (
                  <ReasonVisual
                    selectedAgent={selectedAgent}
                    setSelectedAgent={setSelectedAgent}
                  />
                )}
                {activeChapter === 2 && <ShipVisual liveLatency={liveLatency} />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE & REDUCED MOTION STACKED LAYOUT */}
      <div className={`${isDesktop && !isReducedMotion ? "hidden" : "block"} mx-auto max-w-[1200px] px-6 space-y-20 pb-28`}>
        {howIBuildChapters.map((ch, idx) => (
          <div key={ch.id} className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-full bg-accent text-white">
                  {ch.number}
                </span>
                <span className="text-xs uppercase tracking-wider text-muted font-medium">
                  {ch.tag}
                </span>
              </div>
              <h3 className="text-3xl font-semibold tracking-[-0.03em]">{ch.title}</h3>
              <p className="text-lg font-medium text-text">{ch.headline}</p>
              <p className="text-[15px] leading-relaxed text-muted">{ch.description}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {ch.pills.map((pill) => (
                  <span
                    key={pill}
                    className="rounded-full bg-card border border-line px-3 py-1 text-xs text-text font-medium"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-line bg-card p-6 shadow-xl overflow-hidden">
              {idx === 0 && <RetrieveVisual />}
              {idx === 1 && (
                <ReasonVisual
                  selectedAgent={selectedAgent}
                  setSelectedAgent={setSelectedAgent}
                />
              )}
              {idx === 2 && <ShipVisual liveLatency={liveLatency} />}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// CHAPTER 01: RETRIEVE VISUAL (PDF -> OCR -> Embeddings -> Qdrant)
// -------------------------------------------------------------
function RetrieveVisual() {
  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Card Header */}
      <div className="flex items-center justify-between border-b border-line pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
            <FileText size={16} />
          </div>
          <div>
            <div className="text-xs font-medium text-muted">Ingestion Engine</div>
            <div className="text-sm font-semibold tracking-tight text-text">
              PyMuPDF + Gemini Vision OCR Pipeline
            </div>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-500">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          99.2% OCR Fidelity
        </span>
      </div>

      {/* Source PDF Document Extraction Preview */}
      <div className="rounded-2xl border border-line bg-bg p-4 space-y-3">
        <div className="flex items-center justify-between text-xs text-muted">
          <span className="font-mono">NCERT_Physics_Ch04_Electromagnetism.pdf</span>
          <span className="rounded bg-card px-2 py-0.5 text-[11px] border border-line">Page 142</span>
        </div>

        {/* Math & Diagram Formula Block */}
        <div className="relative rounded-xl border border-line/80 bg-card p-3 font-mono text-xs text-text">
          <div className="text-[11px] text-muted mb-1 flex items-center justify-between">
            <span>Formula Extraction &amp; LaTeX Conversion</span>
            <span className="text-accent text-[10px]">Gemini Vision OCR</span>
          </div>
          <div className="p-2 rounded bg-bg/80 text-center font-serif text-sm tracking-wide text-text border border-line/60">
            F&#8407; = q(E&#8407; + v&#8407; &times; B&#8407;) &nbsp;&bull;&nbsp; &epsilon; = -d&Phi;<sub>B</sub>/dt
          </div>
          <div className="mt-2 flex items-center gap-2 text-[11px] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Diagram detected: Magnetic field lines around current loop (Vectorized)
          </div>
        </div>
      </div>

      {/* Vector Embedding Flow */}
      <div className="rounded-2xl border border-line bg-bg/60 p-4">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-medium text-text flex items-center gap-1.5">
            <Layers size={14} className="text-accent" /> Dense Embedding (1536-dim)
          </span>
          <span className="font-mono text-muted text-[11px]">[0.312, -0.841, 0.509, 0.128, ...]</span>
        </div>
        {/* Progress simulation bar */}
        <div className="h-1.5 w-full rounded-full bg-line overflow-hidden">
          <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-accent via-[#bf5af2] to-[#ff375f]" />
        </div>
      </div>

      {/* Qdrant Vector Grid Matches */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-muted">
          <span className="font-medium text-text flex items-center gap-1.5">
            <Database size={13} className="text-accent" /> Qdrant Hybrid Search Results
          </span>
          <span className="text-[11px] text-accent">Dense + BM25 Fusion (RRF)</span>
        </div>

        <div className="space-y-1.5">
          {[
            { chunk: "Chunk #402: Lorentz force on charge in electromagnetic field", sim: "0.942", rank: "#1" },
            { chunk: "Chunk #405: Faraday induction law and Lenz directional rule", sim: "0.918", rank: "#2" },
            { chunk: "Chunk #411: Magnetic flux density through solenoid geometry", sim: "0.885", rank: "#3" },
          ].map((item) => (
            <div
              key={item.chunk}
              className="flex items-center justify-between rounded-xl border border-line bg-bg px-3 py-2 text-xs"
            >
              <div className="flex items-center gap-2 truncate max-w-[78%]">
                <span className="font-mono font-medium text-muted text-[11px]">{item.rank}</span>
                <span className="truncate text-text font-medium">{item.chunk}</span>
              </div>
              <div className="font-mono text-emerald-400 font-semibold text-[11px]">
                {item.sim}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// CHAPTER 02: REASON VISUAL (4-Agent Pipeline & LangGraph Graph)
// -------------------------------------------------------------
function ReasonVisual({
  selectedAgent,
  setSelectedAgent,
}: {
  selectedAgent: number;
  setSelectedAgent: (idx: number) => void;
}) {
  const active = examAgents[selectedAgent];

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-line pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
            <Cpu size={16} />
          </div>
          <div>
            <div className="text-xs font-medium text-muted">Orchestration Graph</div>
            <div className="text-sm font-semibold tracking-tight text-text">
              4-Agent CBSE Exam Pipeline &amp; LangGraph
            </div>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent">
          Stateful Graph
        </span>
      </div>

      {/* 4 Agent Nodes Pipeline Selector */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {examAgents.map((agent, i) => {
          const isSel = selectedAgent === i;
          return (
            <button
              key={agent.id}
              onClick={() => setSelectedAgent(i)}
              className={`flex flex-col justify-between rounded-xl p-3 text-left transition-all border ${
                isSel
                  ? "bg-bg border-accent shadow-md scale-[1.02]"
                  : "bg-bg/40 border-line hover:border-line hover:bg-bg/80"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-muted font-bold">0{i + 1}</span>
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
              </div>
              <div className="mt-3">
                <div className="text-xs font-semibold text-text leading-tight">{agent.name}</div>
                <div className="text-[10px] text-muted font-mono mt-1">{agent.latency}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Inspector for Selected Agent */}
      <div className="rounded-2xl border border-line bg-bg p-4 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-text">{active.name}</span>
            <span className="text-[11px] text-muted">({active.role})</span>
          </div>
          <span className="font-mono text-xs text-accent">Avg: {active.latency}</span>
        </div>
        <p className="text-xs leading-relaxed text-muted">{active.description}</p>

        {/* State snapshot JSON preview */}
        <div className="rounded-xl border border-line/70 bg-card p-3 font-mono text-[11px] text-text leading-relaxed">
          <div className="text-muted text-[10px] mb-1 flex items-center justify-between">
            <span>LangGraph Node Payload</span>
            <span className="text-emerald-400">status: verified_compliant</span>
          </div>
          {selectedAgent === 0 && (
            <p className="text-muted">
              {`{ blueprint: "CBSE_Physics_12", marks: 70, sections: 4, distribution: "30% Recall, 40% Apply, 30% Analyze" }`}
            </p>
          )}
          {selectedAgent === 1 && (
            <p className="text-muted">
              {`{ query_expansion: true, qdrant_top_k: 24, rerank_method: "cross-encoder", chunks_retrieved: 18 }`}
            </p>
          )}
          {selectedAgent === 2 && (
            <p className="text-muted">
              {`{ mcq: 16, sa1: 5, sa2: 7, case_study: 2, step_marking_scheme: true, sample_answers: "generated" }`}
            </p>
          )}
          {selectedAgent === 3 && (
            <p className="text-muted">
              {`{ compliance_score: 0.992, bloom_level_match: true, syllabus_overlap: "0% out-of-scope", verdict: "APPROVED" }`}
            </p>
          )}
        </div>
      </div>

      {/* Cyclic feedback loop badge */}
      <div className="flex items-center justify-between rounded-xl border border-line/60 bg-card px-3.5 py-2.5 text-xs text-muted">
        <div className="flex items-center gap-2">
          <RefreshCw size={13} className="text-accent animate-spin-slow" />
          <span>Autonomous feedback loop if compliance score &lt; 0.95</span>
        </div>
        <span className="font-mono text-[11px] text-emerald-400 font-medium">Zero Human Loop</span>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// CHAPTER 03: SHIP VISUAL (FastAPI, Prisma, Neo4j, Live WebSockets)
// -------------------------------------------------------------
function ShipVisual({ liveLatency }: { liveLatency: number }) {
  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-line pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
            <Server size={16} />
          </div>
          <div>
            <div className="text-xs font-medium text-muted">Production Infrastructure</div>
            <div className="text-sm font-semibold tracking-tight text-text">
              FastAPI + Node.js/Prisma + Neo4j Engine
            </div>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-500">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          All Services Online
        </span>
      </div>

      {/* Active Production Endpoints */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-muted">
          <span className="font-medium text-text">High-Throughput Microservice Routes</span>
          <span className="text-[11px]">Strict SLA targets</span>
        </div>

        {[
          {
            method: "POST",
            route: "/api/v1/exam/generate",
            service: "FastAPI 4-Agent Pipeline",
            latency: "< 10s (8.4s avg)",
            color: "text-accent bg-accent/10",
          },
          {
            method: "POST",
            route: "/api/v1/donors/match",
            service: "Neo4j 8-Antigen Graph Scorer",
            latency: `${liveLatency} ms`,
            color: "text-emerald-400 bg-emerald-500/10",
          },
          {
            method: "WSS",
            route: "/ws/v1/pipeline/stream",
            service: "Bi-directional WebSocket Bus",
            latency: "12 ms pulse",
            color: "text-purple-400 bg-purple-500/10",
          },
        ].map((item) => (
          <div
            key={item.route}
            className="flex items-center justify-between rounded-xl border border-line bg-bg p-3 text-xs"
          >
            <div className="flex items-center gap-2.5 truncate max-w-[70%]">
              <span
                className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded ${item.color}`}
              >
                {item.method}
              </span>
              <div>
                <div className="font-mono text-xs font-medium text-text truncate">{item.route}</div>
                <div className="text-[10px] text-muted">{item.service}</div>
              </div>
            </div>
            <div className="text-right font-mono font-semibold text-text text-xs tabular-nums">
              {item.latency}
            </div>
          </div>
        ))}
      </div>

      {/* Live WebSocket Event Stream Box */}
      <div className="rounded-2xl border border-line bg-bg p-4 space-y-2">
        <div className="flex items-center justify-between text-xs text-muted mb-1">
          <span className="flex items-center gap-1.5 text-text font-medium">
            <Activity size={13} className="text-emerald-400" /> Live Telemetry Log
          </span>
          <span className="font-mono text-[10px] text-emerald-400">WebSocket Connected</span>
        </div>
        <div className="font-mono text-[11px] text-muted space-y-1 bg-card rounded-xl p-3 border border-line/70">
          <div className="text-emerald-400">
            [WS:CONNECTED] Client subscribed to stream_exam_cbse_2026
          </div>
          <div>[00:01.2] Blueprint Planner resolved chapters &amp; marks schema</div>
          <div>[00:03.3] Hybrid Retriever fetched 18 verified textbook chunks</div>
          <div>[00:06.7] Question Generator produced 30 items with marking keys</div>
          <div className="text-emerald-400">
            [00:08.5] Compliance Reviewer validated 100% CBSE compliance
          </div>
          <div className="text-accent font-semibold">
            [00:08.9] Artifact packaged &bull; Exam ready for download
          </div>
        </div>
      </div>

      {/* Security & Regulatory Compliance */}
      <div className="flex items-center justify-between rounded-xl border border-line/60 bg-card px-3.5 py-2 text-xs text-muted">
        <div className="flex items-center gap-2">
          <Shield size={13} className="text-emerald-400" />
          <span>India DPDP Act 2023 Consent-First Architecture</span>
        </div>
        <span className="text-[11px] text-text font-medium">Encrypted at rest</span>
      </div>
    </div>
  );
}
