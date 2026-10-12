import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "@/lib/content";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  CheckCircle2,
  Activity,
  Layers,
  Cpu,
  Shield,
  Zap,
} from "lucide-react";
import NavPill from "@/components/NavPill";
import CommandPalette from "@/components/CommandPalette";

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Case Study | Sheik Mahaboob Subhani`,
    description: project.outcome,
    openGraph: {
      title: `${project.title} - ${project.subtitle}`,
      description: project.outcome,
      type: "article",
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const nextProj = projects.find((p) => p.slug === project.nextProject.slug) || projects[0];

  return (
    <>
      <NavPill />
      <CommandPalette />

      <main className="min-h-screen bg-bg text-text pt-28 pb-36">
        <article className="mx-auto max-w-[1000px] px-6">
          {/* BACK NAVIGATION */}
          <div className="mb-10">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-text"
            >
              <ArrowLeft size={16} />
              <span>Back to selected work</span>
            </Link>
          </div>

          {/* HERO HEADER */}
          <header className="space-y-4 border-b border-line pb-12">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                {project.category}
              </span>
              {project.featured && (
                <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
                  Featured System
                </span>
              )}
            </div>

            <h1 className="text-[clamp(2.5rem,6vw,4.75rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-text">
              {project.title}
            </h1>

            <p className="max-w-[48ch] text-xl text-muted font-normal leading-relaxed">
              {project.subtitle}
            </p>

            {/* RESULTS COUNTERS STRIP */}
            <div className="pt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {project.results.map((r) => (
                <div
                  key={r.label}
                  className="rounded-2xl border border-line bg-card p-4 text-center shadow-sm"
                >
                  <div className="text-3xl font-semibold tracking-tight text-text tabular-nums">
                    {r.metric}
                  </div>
                  <div className="text-xs font-semibold text-text mt-1">{r.label}</div>
                  <div className="text-[11px] text-muted mt-0.5">{r.context}</div>
                </div>
              ))}
            </div>
          </header>

          {/* CASE STUDY CONTENT BODY */}
          <div className="mt-14 space-y-16">
            {/* 01 PROBLEM */}
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-full bg-accent text-white">
                  01
                </span>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">
                  The Problem
                </h2>
              </div>
              <p className="text-lg leading-relaxed text-text font-normal">{project.problem}</p>
            </section>

            {/* 02 CONSTRAINTS */}
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-full bg-accent text-white">
                  02
                </span>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Engineering Constraints
                </h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {project.constraints.map((c, i) => (
                  <div
                    key={c}
                    className="flex items-start gap-3 rounded-2xl border border-line bg-card p-4 text-sm text-muted"
                  >
                    <CheckCircle2 size={16} className="text-accent mt-0.5 shrink-0" />
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 03 ARCHITECTURE (ANIMATED SVG DIAGRAM) */}
            <section className="space-y-6">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-full bg-accent text-white">
                  03
                </span>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">
                  System Architecture
                </h2>
              </div>

              <div className="rounded-[28px] border border-line bg-card p-6 sm:p-8 shadow-sm">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold tracking-tight text-text">
                    {project.architecture.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted">
                    {project.architecture.description}
                  </p>
                </div>

                {/* ANIMATED SVG ARCHITECTURE DIAGRAM */}
                <div className="overflow-x-auto rounded-2xl border border-line/80 bg-bg p-6">
                  <svg
                    viewBox="0 0 800 240"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full min-w-[680px] h-auto"
                  >
                    <defs>
                      <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#0a84ff" />
                        <stop offset="50%" stopColor="#bf5af2" />
                        <stop offset="100%" stopColor="#ff375f" />
                      </linearGradient>
                      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path
                          d="M 20 0 L 0 0 0 20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="0.5"
                          className="text-line"
                        />
                      </pattern>
                    </defs>

                    <rect width="800" height="240" fill="url(#grid)" opacity="0.4" />

                    {/* Connecting Signal Lines */}
                    <path
                      d="M 120 120 L 260 120 M 360 120 L 480 120 M 580 120 L 700 120"
                      stroke="url(#flowGrad)"
                      strokeWidth="2.5"
                      strokeDasharray="6 4"
                      className="animate-pulse"
                    />

                    {/* Node 1: Input Ingestion */}
                    <g transform="translate(40, 80)">
                      <rect
                        width="110"
                        height="80"
                        rx="16"
                        className="fill-card stroke-line"
                        strokeWidth="1.5"
                      />
                      <text x="55" y="38" textAnchor="middle" className="fill-text text-xs font-bold">
                        Intake / Input
                      </text>
                      <text x="55" y="56" textAnchor="middle" className="fill-muted text-[10px]">
                        FastAPI Service
                      </text>
                    </g>

                    {/* Node 2: Vector / Graph Reasoning */}
                    <g transform="translate(240, 70)">
                      <rect
                        width="130"
                        height="100"
                        rx="18"
                        className="fill-card stroke-accent"
                        strokeWidth="2"
                      />
                      <text
                        x="65"
                        y="42"
                        textAnchor="middle"
                        className="fill-accent text-xs font-semibold"
                      >
                        Engine &amp; Retrieval
                      </text>
                      <text x="65" y="62" textAnchor="middle" className="fill-text text-[11px] font-bold">
                        {project.slug === "bloodbridge-ai"
                          ? "Neo4j 8-Antigen"
                          : project.slug === "ai-exam-generator"
                          ? "Qdrant Hybrid RRF"
                          : "Deep Vector Match"}
                      </text>
                      <text x="65" y="80" textAnchor="middle" className="fill-muted text-[9px]">
                        Sub-100ms Latency
                      </text>
                    </g>

                    {/* Node 3: Stateful Agent Coordination */}
                    <g transform="translate(470, 70)">
                      <rect
                        width="130"
                        height="100"
                        rx="18"
                        className="fill-card stroke-line"
                        strokeWidth="1.5"
                      />
                      <text
                        x="65"
                        y="42"
                        textAnchor="middle"
                        className="fill-emerald-400 text-xs font-semibold"
                      >
                        State Machine
                      </text>
                      <text x="65" y="62" textAnchor="middle" className="fill-text text-[11px] font-bold">
                        {project.slug === "bloodbridge-ai"
                          ? "14-Node LangGraph"
                          : project.slug === "ai-exam-generator"
                          ? "4 Async Agents"
                          : "Inference Engine"}
                      </text>
                      <text x="65" y="80" textAnchor="middle" className="fill-muted text-[9px]">
                        Checkpointed State
                      </text>
                    </g>

                    {/* Node 4: Production Output */}
                    <g transform="translate(680, 80)">
                      <rect
                        width="100"
                        height="80"
                        rx="16"
                        className="fill-card stroke-line"
                        strokeWidth="1.5"
                      />
                      <text x="50" y="38" textAnchor="middle" className="fill-text text-xs font-bold">
                        Production Output
                      </text>
                      <text x="50" y="56" textAnchor="middle" className="fill-muted text-[10px]">
                        WebSockets / APIs
                      </text>
                    </g>
                  </svg>
                </div>

                {/* Architecture Step Descriptions */}
                <div className="mt-6 space-y-3">
                  {project.architecture.steps.map((st, i) => (
                    <div
                      key={st}
                      className="flex items-start gap-3 rounded-xl border border-line bg-bg p-3.5 text-xs text-text"
                    >
                      <span className="font-mono text-accent font-semibold">0{i + 1}</span>
                      <span className="leading-relaxed">{st}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 04 KEY DECISIONS & TRADE-OFFS */}
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-full bg-accent text-white">
                  04
                </span>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Key Decisions &amp; Trade-offs
                </h2>
              </div>

              <div className="space-y-4">
                {project.keyDecisions.map((kd) => (
                  <div
                    key={kd.title}
                    className="rounded-[22px] border border-line bg-card p-5 sm:p-6"
                  >
                    <h3 className="text-base font-semibold text-text">{kd.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{kd.rationale}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 05 STACK */}
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-full bg-accent text-white">
                  05
                </span>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Technology Stack
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((st) => (
                  <span
                    key={st}
                    className="rounded-full border border-line bg-card px-4 py-1.5 text-xs font-medium text-text shadow-sm"
                  >
                    {st}
                  </span>
                ))}
              </div>
            </section>

            {/* 06 LINKS */}
            <section className="border-t border-line pt-8 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-text px-5 py-2.5 text-xs font-medium text-bg shadow-sm hover:opacity-90"
                  >
                    <Github size={15} /> View Source on GitHub
                  </a>
                )}
                {project.links.external && (
                  <a
                    href={project.links.external}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-5 py-2.5 text-xs font-medium text-text hover:border-accent"
                  >
                    <ExternalLink size={14} /> Organization Website
                  </a>
                )}
              </div>

              {/* 07 NEXT PROJECT LINK */}
              <Link
                href={`/work/${nextProj.slug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-text hover:text-accent group"
              >
                <span>Next Project: {nextProj.title}</span>
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </section>
          </div>
        </article>
      </main>
    </>
  );
}
