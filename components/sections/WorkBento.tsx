"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { projects, ProjectItem } from "@/lib/content";
import {
  ArrowRight,
  ExternalLink,
  Github,
  X,
  Layers,
  Cpu,
  Shield,
  Activity,
  CheckCircle2,
  GitBranch,
  Sparkles,
  Zap,
  Lock,
  Eye,
  FileCheck,
} from "lucide-react";

export default function WorkBento() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section id="work" className="mx-auto max-w-[1200px] scroll-mt-24 px-6 py-28 sm:py-36">
      {/* SECTION HEADER */}
      <div className="mb-14">
        <p className="text-sm font-medium tracking-wide text-accent">Selected Work</p>
        <h2 className="mt-3 text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[1.04] tracking-[-0.03em]">
          Engineered to ship.
        </h2>
        <p className="mt-4 max-w-[56ch] text-lg text-muted">
          Autonomous multi-agent systems, sub-100 ms graph traversals, and hybrid RAG pipelines engineered with production patterns.
        </p>
      </div>

      {/* BENTO GRID */}
      <div className="grid grid-cols-12 gap-6">
        {projects.map((proj) => {
          const isFeatured = proj.slug === "bloodbridge-ai";
          const isExam = proj.slug === "ai-exam-generator";
          const isFashion = proj.slug === "fashion-recommender";
          const isPass = proj.slug === "secure-password-manager";
          const isNit = proj.slug === "nit-student-dashboard";

          // Column spans
          let colSpan = "col-span-12 lg:col-span-6";
          if (isFeatured) colSpan = "col-span-12 lg:col-span-8 lg:row-span-2";
          if (isExam) colSpan = "col-span-12 lg:col-span-4";
          if (isNit) colSpan = "col-span-12 lg:col-span-4";

          return (
            <div
              key={proj.slug}
              className={`${colSpan} group relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-line bg-card p-7 sm:p-8 shadow-sm transition-all duration-300 hover:border-accent/40`}
            >
              {/* TOP CONTENT */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                    {proj.category}
                  </span>
                  {isFeatured && (
                    <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
                      Featured System
                    </span>
                  )}
                </div>

                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.02em] text-text sm:text-3xl">
                  {proj.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{proj.outcome}</p>

                {/* GRAPHIC / VISUAL PREVIEW PER PROJECT */}
                <div className="mt-6 overflow-hidden rounded-2xl border border-line/70 bg-bg p-4">
                  {isFeatured && (
                    <div className="space-y-3 font-mono text-xs">
                      <div className="flex items-center justify-between text-[11px] text-muted">
                        <span className="flex items-center gap-1.5 text-emerald-400">
                          <Activity size={12} /> 14-Node Stateful LangGraph
                        </span>
                        <span className="text-accent">100 ms Neo4j Match</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                        <div className="rounded-lg bg-card p-2 border border-line">
                          <div className="text-muted">ABO / Rh / Kell</div>
                          <div className="font-semibold text-text mt-0.5">8 Antigens</div>
                        </div>
                        <div className="rounded-lg bg-card p-2 border border-line">
                          <div className="text-muted">Vapi.ai Voice</div>
                          <div className="font-semibold text-text mt-0.5">Auto-Dispatch</div>
                        </div>
                        <div className="rounded-lg bg-card p-2 border border-line">
                          <div className="text-muted">DPDP 2023</div>
                          <div className="font-semibold text-emerald-400 mt-0.5">Tokenized</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-card/60 p-2 text-[11px] text-muted">
                        <span>Cyclic Checkpoints: active</span>
                        <span className="text-emerald-400 font-semibold">Persistent State</span>
                      </div>
                    </div>
                  )}

                  {isExam && (
                    <div className="space-y-2 font-mono text-xs">
                      <div className="flex items-center justify-between text-[11px] text-muted">
                        <span className="text-accent">4-Agent Async Pipeline</span>
                        <span className="text-emerald-400">&lt; 10s SLA</span>
                      </div>
                      <div className="rounded-lg bg-card p-2.5 text-[11px] text-muted space-y-1">
                        <div>&bull; PyMuPDF + Gemini Vision OCR</div>
                        <div>&bull; Qdrant Dense + BM25 Hybrid</div>
                        <div className="text-text font-semibold">&bull; CBSE Blueprint Conformance</div>
                      </div>
                    </div>
                  )}

                  {isNit && (
                    <div className="space-y-2 font-mono text-xs">
                      <div className="flex items-center justify-between text-[11px] text-muted">
                        <span className="text-accent">NIT-AP Platform</span>
                        <span className="text-text">Multi-Tenant Vault</span>
                      </div>
                      <div className="rounded-lg bg-card p-2.5 text-[11px] text-muted space-y-1">
                        <div>&bull; Academic PDF Dropzone &amp; Chunks</div>
                        <div>&bull; Multi-Turn Chatbot Session State</div>
                        <div className="text-emerald-400 font-semibold">&bull; Postman Verified APIs</div>
                      </div>
                    </div>
                  )}

                  {isFashion && (
                    <div className="space-y-2 font-mono text-xs">
                      <div className="flex items-center justify-between text-[11px] text-muted">
                        <span className="text-accent">VGG16 Deep Features</span>
                        <span className="text-emerald-400">Sub-Second Cosine Calc</span>
                      </div>
                      <div className="rounded-lg bg-card p-2.5 text-[11px] text-muted flex items-center justify-between">
                        <span>Deep Feature Embeddings</span>
                        <span className="text-text font-semibold">Top-4 Nearest Items</span>
                      </div>
                    </div>
                  )}

                  {isPass && (
                    <div className="space-y-2 font-mono text-xs">
                      <div className="flex items-center justify-between text-[11px] text-muted">
                        <span className="text-accent">AES-256-GCM AEAD</span>
                        <span className="text-emerald-400">Zero Plaintext</span>
                      </div>
                      <div className="rounded-lg bg-card p-2.5 text-[11px] text-muted flex items-center justify-between">
                        <span>Bcrypt 12 Salt Rounds</span>
                        <span className="text-text font-semibold">Stateless JWT Auth</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* BOTTOM ACTIONS & TECH PILLS */}
              <div className="mt-8">
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {proj.stack.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg bg-bg border border-line px-2.5 py-1 text-xs text-muted font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {proj.stack.length > 5 && (
                    <span className="rounded-lg bg-bg border border-line px-2 py-1 text-xs text-muted">
                      +{proj.stack.length - 5}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-line pt-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedProject(proj)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-text transition-colors hover:text-accent cursor-pointer"
                    >
                      Case study <ArrowRight size={14} />
                    </button>

                    {proj.links.github && (
                      <a
                        href={proj.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-text transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={13} /> GitHub
                      </a>
                    )}
                  </div>

                  <Link
                    href={`/work/${proj.slug}`}
                    className="text-xs text-muted hover:text-text flex items-center gap-1"
                  >
                    Full page <ExternalLink size={12} />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL / SHEET EXPANSION PREVIEW */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Modal Sheet Card */}
            <motion.div
              layoutId={`card-${selectedProject.slug}`}
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="relative z-10 flex max-h-[90vh] w-full max-w-[820px] flex-col overflow-hidden rounded-[28px] border border-line bg-card shadow-2xl"
            >
              {/* Sheet Header */}
              <div className="flex items-center justify-between border-b border-line px-6 py-4 sm:px-8">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-2xl font-semibold tracking-tight text-text">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="rounded-full p-2 text-muted hover:bg-bg hover:text-text"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Sheet Body (Scrollable) */}
              <div className="overflow-y-auto px-6 py-6 sm:px-8 space-y-7">
                {/* 1. Problem */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
                    01 The Problem
                  </h4>
                  <p className="mt-2 text-[15px] leading-relaxed text-text">
                    {selectedProject.problem}
                  </p>
                </div>

                {/* 2. Constraints */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
                    02 Technical Constraints
                  </h4>
                  <ul className="mt-2.5 space-y-2">
                    {selectedProject.constraints.map((c) => (
                      <li key={c} className="flex items-start gap-2.5 text-sm text-muted">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent mt-2 shrink-0" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. Architecture */}
                <div className="rounded-2xl border border-line bg-bg p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-text">
                      {selectedProject.architecture.title}
                    </h4>
                    <span className="text-[11px] font-mono text-accent">Architecture</span>
                  </div>
                  <p className="text-xs text-muted mb-4">
                    {selectedProject.architecture.description}
                  </p>
                  <div className="space-y-2">
                    {selectedProject.architecture.steps.map((st, i) => (
                      <div
                        key={st}
                        className="flex items-start gap-2.5 rounded-xl border border-line bg-card p-2.5 text-xs text-text"
                      >
                        <span className="font-mono text-accent font-semibold text-[11px]">
                          0{i + 1}
                        </span>
                        <span>{st}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Results With Numbers */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
                    03 Measurable Results
                  </h4>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {selectedProject.results.map((r) => (
                      <div
                        key={r.label}
                        className="rounded-2xl border border-line bg-bg p-3.5 text-center"
                      >
                        <div className="text-2xl font-semibold tracking-tight text-text tabular-nums">
                          {r.metric}
                        </div>
                        <div className="text-xs font-medium text-text mt-1">{r.label}</div>
                        <div className="text-[10px] text-muted mt-0.5">{r.context}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. Key Decisions & Trade-offs */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
                    04 Key Decisions &amp; Trade-offs
                  </h4>
                  <div className="space-y-3">
                    {selectedProject.keyDecisions.map((kd) => (
                      <div key={kd.title} className="rounded-xl border border-line bg-bg p-3.5">
                        <div className="text-sm font-semibold text-text">{kd.title}</div>
                        <p className="mt-1 text-xs text-muted leading-relaxed">{kd.rationale}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 6. Stack & External Links */}
                <div className="border-t border-line pt-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.stack.map((st) => (
                      <span
                        key={st}
                        className="rounded-lg bg-bg border border-line px-2.5 py-1 text-xs text-muted font-medium"
                      >
                        {st}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    {selectedProject.links.github && (
                      <a
                        href={selectedProject.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg px-4 py-2 text-xs font-medium text-text hover:border-accent"
                      >
                        <Github size={14} /> Repository
                      </a>
                    )}
                    <Link
                      href={`/work/${selectedProject.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-text px-4 py-2 text-xs font-medium text-bg hover:opacity-90"
                    >
                      Open Full Page <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
