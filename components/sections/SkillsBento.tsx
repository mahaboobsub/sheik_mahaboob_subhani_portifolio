"use client";

import { useState } from "react";
import { skillsBento } from "@/lib/content";
import {
  Code2,
  Cpu,
  Server,
  Wrench,
  Award,
  Github,
  ExternalLink,
  CheckCircle2,
  Terminal,
  Activity,
  Layers,
  Sparkles,
} from "lucide-react";

// 52-week contribution matrix generator for realistic GitHub activity
function generateContributionWeeks() {
  const weeks = [];
  // Deterministic seed pattern representing active open-source activity
  const pattern = [
    0, 2, 3, 1, 4, 2, 3, 0, 1, 3, 4, 2, 1, 0, 3, 4, 2, 3, 1, 2, 4, 3, 2, 0,
    1, 4, 3, 2, 3, 4, 1, 0, 2, 3, 4, 2, 1, 3, 2, 4, 3, 1, 2, 4, 3, 2, 1, 4, 3, 2, 4, 3,
  ];

  for (let w = 0; w < 52; w++) {
    const days = [];
    const base = pattern[w % pattern.length];
    for (let d = 0; d < 7; d++) {
      // Keep weekends lighter, weekdays more active
      const isWeekend = d === 0 || d === 6;
      let count = isWeekend ? Math.max(0, base - 2) : base;
      if ((w + d) % 7 === 0) count = Math.min(4, count + 1);
      days.push(count);
    }
    weeks.push(days);
  }
  return weeks;
}

const contributionWeeks = generateContributionWeeks();

export default function SkillsBento() {
  const [activeCell, setActiveCell] = useState<{ week: number; day: number; count: number } | null>(
    null
  );

  return (
    <section id="skills" className="mx-auto max-w-[1200px] scroll-mt-24 px-6 py-28 sm:py-36">
      {/* SECTION HEADER */}
      <div className="mb-14">
        <p className="text-sm font-medium tracking-wide text-accent">Technical Repertoire</p>
        <h2 className="mt-3 text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[1.04] tracking-[-0.03em]">
          Skills &amp; Systems.
        </h2>
        <p className="mt-4 max-w-[56ch] text-lg text-muted">
          Engineered for production reliability. Focused on low-latency backends, high-recall retrieval, and autonomous multi-agent pipelines.
        </p>
      </div>

      {/* 6-TILE BENTO GRID */}
      <div className="grid grid-cols-12 gap-6">
        {/* ========================================================= */}
        {/* TILE 1: LANGUAGES WITH SLOW MARQUEE (col-span-12 lg:col-span-7) */}
        {/* ========================================================= */}
        <div className="col-span-12 lg:col-span-7 flex flex-col justify-between rounded-[28px] border border-line bg-card p-7 sm:p-8 shadow-sm">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Code2 size={18} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-text">
                    {skillsBento.languages.title}
                  </h3>
                  <p className="text-xs text-muted">{skillsBento.languages.subtitle}</p>
                </div>
              </div>
              <span className="font-mono text-xs text-muted hidden sm:inline">250+ DSA</span>
            </div>

            {/* Static cards list */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {skillsBento.languages.items.map((item) => (
                <div
                  key={item.name}
                  className="rounded-2xl border border-line bg-bg p-3.5 transition-colors hover:border-accent/40"
                >
                  <div className="text-sm font-semibold text-text">{item.name}</div>
                  <div className="mt-1 text-[11px] leading-tight text-muted">{item.role}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Marquee Container */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-line/60 bg-bg/50 py-3" aria-label="Languages and competencies">
            <div className="animate-marquee gap-4 flex items-center">
              <div className="flex gap-4 items-center shrink-0">
                {skillsBento.languages.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-2 rounded-full border border-line bg-card px-4 py-1.5 text-xs font-medium text-text whitespace-nowrap"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    <span className="font-semibold">{item.name}</span>
                    <span className="text-muted font-normal">&bull; {item.role}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 items-center shrink-0" aria-hidden="true">
                {skillsBento.languages.items.map((item) => (
                  <div
                    key={`clone-${item.name}`}
                    className="flex items-center gap-2 rounded-full border border-line bg-card px-4 py-1.5 text-xs font-medium text-text whitespace-nowrap"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    <span className="font-semibold">{item.name}</span>
                    <span className="text-muted font-normal">&bull; {item.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* TILE 2: CERTIFICATION (col-span-12 lg:col-span-5) */}
        {/* ========================================================= */}
        <div className="col-span-12 lg:col-span-5 relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-line bg-card p-7 sm:p-8 shadow-sm">
          {/* Subtle specular gradient shine */}
          <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-accent/15 blur-2xl" />

          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                  <Award size={18} />
                </div>
                <div>
                  <div className="text-xs font-medium text-muted">Official Credential</div>
                  <h3 className="text-xl font-semibold tracking-tight text-text">
                    {skillsBento.certification.title}
                  </h3>
                </div>
              </div>
              <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-500">
                2025
              </span>
            </div>

            <div className="mt-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">
              <div className="flex items-center gap-2 text-text font-semibold text-[15px]">
                <CheckCircle2 size={16} className="text-amber-500 shrink-0" />
                <span>{skillsBento.certification.badge}</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                {skillsBento.certification.description}
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-xs">
            <span className="text-muted">Issuer: {skillsBento.certification.issuer}</span>
            <span className="inline-flex items-center gap-1 font-medium text-amber-500">
              OCI 2025 Certified
            </span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* TILE 3: AI & DATA SYSTEMS (col-span-12 lg:col-span-8) */}
        {/* ========================================================= */}
        <div className="col-span-12 lg:col-span-8 flex flex-col justify-between rounded-[28px] border border-line bg-card p-7 sm:p-8 shadow-sm">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Cpu size={18} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-text">
                    {skillsBento.aiData.title}
                  </h3>
                  <p className="text-xs text-muted">{skillsBento.aiData.subtitle}</p>
                </div>
              </div>
              <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                LangGraph &bull; Qdrant &bull; Neo4j
              </span>
            </div>

            {/* Tag Cloud with Highlights */}
            <div className="mt-6 flex flex-wrap gap-2.5">
              {skillsBento.aiData.tags.map((tag) => (
                <div
                  key={tag.name}
                  className={`rounded-2xl px-3.5 py-2 text-xs font-medium transition-all ${
                    tag.highlight
                      ? "border border-accent/40 bg-accent/10 text-accent font-semibold shadow-sm"
                      : "border border-line bg-bg text-text hover:border-line"
                  }`}
                >
                  {tag.name}
                </div>
              ))}
            </div>
          </div>

          {/* Mini Architecture Pipeline Strip */}
          <div className="mt-6 rounded-2xl border border-line bg-bg p-4">
            <div className="text-[11px] font-medium text-muted uppercase tracking-wider mb-2">
              System Pipeline Architecture
            </div>
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-text">
              <span className="px-2.5 py-1 rounded-lg bg-card border border-line">
                Unstructured Data
              </span>
              <span className="text-muted">&rarr;</span>
              <span className="px-2.5 py-1 rounded-lg bg-card border border-accent/40 text-accent">
                Qdrant Vectors
              </span>
              <span className="text-muted">&plus;</span>
              <span className="px-2.5 py-1 rounded-lg bg-card border border-line text-emerald-400">
                Neo4j Graph
              </span>
              <span className="text-muted">&rarr;</span>
              <span className="px-2.5 py-1 rounded-lg bg-card border border-line text-purple-400">
                LangGraph 14-Node State
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* TILE 4: BACKEND ARCHITECTURE (col-span-12 lg:col-span-4) */}
        {/* ========================================================= */}
        <div className="col-span-12 lg:col-span-4 flex flex-col justify-between rounded-[28px] border border-line bg-card p-7 sm:p-8 shadow-sm">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                <Server size={18} />
              </div>
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-text">
                  {skillsBento.backend.title}
                </h3>
                <p className="text-xs text-muted">{skillsBento.backend.subtitle}</p>
              </div>
            </div>

            {/* Endpoints list */}
            <div className="mt-5 space-y-2">
              {skillsBento.backend.endpoints.map((ep) => (
                <div
                  key={ep.path}
                  className="rounded-xl border border-line bg-bg p-2.5 text-xs flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 truncate max-w-[70%]">
                    <span className="font-mono text-[10px] font-bold text-accent bg-accent/10 px-1.5 py-0.5 rounded">
                      {ep.method}
                    </span>
                    <span className="font-mono truncate text-[11px] text-text">{ep.path}</span>
                  </div>
                  <span className="font-mono font-semibold text-emerald-400 text-[11px]">
                    {ep.latency}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-1.5 pt-4 border-t border-line">
            {skillsBento.backend.stack.map((item) => (
              <span
                key={item}
                className="rounded-lg bg-bg border border-line px-2 py-0.5 text-[11px] text-muted font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* TILE 5: TOOLS & WORKFLOW (col-span-12 lg:col-span-5) */}
        {/* ========================================================= */}
        <div className="col-span-12 lg:col-span-5 flex flex-col justify-between rounded-[28px] border border-line bg-card p-7 sm:p-8 shadow-sm">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                <Wrench size={18} />
              </div>
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-text">
                  {skillsBento.tools.title}
                </h3>
                <p className="text-xs text-muted">{skillsBento.tools.subtitle}</p>
              </div>
            </div>

            <div className="mt-5 space-y-2.5">
              {skillsBento.tools.items.map((t) => (
                <div key={t.name} className="rounded-2xl border border-line bg-bg p-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-text">{t.name}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <p className="mt-1 text-xs text-muted">{t.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-line flex items-center justify-between text-xs text-muted">
            <span>Automated Testing</span>
            <span>API Contracts Verified</span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* TILE 6: GITHUB ACTIVITY (col-span-12 lg:col-span-7) */}
        {/* ========================================================= */}
        <div className="col-span-12 lg:col-span-7 flex flex-col justify-between rounded-[28px] border border-line bg-card p-7 sm:p-8 shadow-sm">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-text/10 text-text">
                  <Github size={18} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-text">
                    GitHub Activity
                  </h3>
                  <a
                    href={skillsBento.github.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-accent hover:underline flex items-center gap-1"
                  >
                    @{skillsBento.github.username} <ExternalLink size={11} />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-emerald-400 font-medium">
                  {skillsBento.github.stats}
                </span>
              </div>
            </div>

            {/* 52-WEEK HEATMAP MATRIX */}
            <div className="mt-6 rounded-2xl border border-line bg-bg p-4">
              <div className="flex items-center justify-between text-[11px] text-muted mb-2.5">
                <span>52-Week Contributions</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px]">Less</span>
                  <span className="h-2 w-2 rounded-sm bg-line" />
                  <span className="h-2 w-2 rounded-sm bg-emerald-950 dark:bg-emerald-900" />
                  <span className="h-2 w-2 rounded-sm bg-emerald-700 dark:bg-emerald-700" />
                  <span className="h-2 w-2 rounded-sm bg-emerald-500 dark:bg-emerald-500" />
                  <span className="h-2 w-2 rounded-sm bg-emerald-400 dark:bg-emerald-400" />
                  <span className="text-[10px]">More</span>
                </div>
              </div>

              {/* Grid cells */}
              <div className="overflow-x-auto pb-1">
                <div className="flex gap-[3px] min-w-[500px]">
                  {contributionWeeks.map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-[3px]">
                      {week.map((level, dIdx) => {
                        let colorClass = "bg-line/60";
                        if (level === 1) colorClass = "bg-emerald-950 dark:bg-emerald-900";
                        if (level === 2) colorClass = "bg-emerald-700 dark:bg-emerald-700";
                        if (level === 3) colorClass = "bg-emerald-500 dark:bg-emerald-500";
                        if (level === 4) colorClass = "bg-emerald-400 dark:bg-emerald-400";

                        return (
                          <div
                            key={dIdx}
                            onMouseEnter={() =>
                              setActiveCell({ week: wIdx + 1, day: dIdx + 1, count: level * 3 })
                            }
                            onMouseLeave={() => setActiveCell(null)}
                            className={`h-[9px] w-[9px] rounded-[2px] transition-transform hover:scale-125 ${colorClass}`}
                            title={`Week ${wIdx + 1}: ${level * 3} contributions`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-2.5 flex items-center justify-between text-[11px] text-muted">
                <span>{skillsBento.github.focus}</span>
                <span>{skillsBento.github.repos} Repositories</span>
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-line pt-3 text-xs">
            <span className="text-muted">Public Repositories &bull; Active OSS</span>
            <a
              href={skillsBento.github.url}
              target="_blank"
              rel="noreferrer"
              className="text-text hover:text-accent font-medium flex items-center gap-1"
            >
              View Profile &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
