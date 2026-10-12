"use client";

import { useState } from "react";
import { experience } from "@/lib/content";
import { Briefcase, Calendar, ChevronDown, ChevronUp } from "lucide-react";

export default function ExperienceTimeline() {
  const [expandedIdx, setExpandedIdx] = useState<number>(0);

  return (
    <section id="experience" className="mx-auto max-w-[1200px] scroll-mt-24 px-6 py-28 sm:py-36">
      {/* SECTION HEADER */}
      <div className="mb-14">
        <p className="text-sm font-medium tracking-wide text-accent">Career Path</p>
        <h2 className="mt-3 text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[1.04] tracking-[-0.03em]">
          Experience.
        </h2>
        <p className="mt-4 max-w-[56ch] text-lg text-muted">
          Building production AI systems and full-stack platforms from day one.
        </p>
      </div>

      {/* TIMELINE */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[19px] top-2 bottom-2 w-px bg-line hidden sm:block" />

        <div className="space-y-8">
          {experience.map((exp, idx) => {
            const isExpanded = expandedIdx === idx;
            return (
              <div key={exp.company} className="relative sm:pl-14">
                {/* Dot on timeline */}
                <div className="absolute left-[12px] top-3 hidden sm:flex h-[15px] w-[15px] items-center justify-center">
                  <div className={`h-3 w-3 rounded-full border-2 ${idx === 0 ? "border-accent bg-accent" : "border-line bg-card"}`} />
                </div>

                <button
                  onClick={() => setExpandedIdx(isExpanded ? -1 : idx)}
                  className="w-full text-left rounded-[28px] border border-line bg-card p-6 sm:p-8 shadow-sm transition-all duration-300 hover:border-accent/40 cursor-pointer"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-semibold tracking-tight text-text sm:text-2xl">
                          {exp.role}
                        </h3>
                        <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                          {exp.type}
                        </span>
                      </div>
                      <p className="text-[15px] text-muted font-medium">{exp.company}</p>
                      <p className="flex items-center gap-1.5 text-xs text-muted">
                        <Calendar size={12} />
                        {exp.period}
                      </p>
                    </div>
                    <span className="mt-1 text-muted">
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="mt-6 space-y-5 animate-fadeIn">
                      <ul className="space-y-3">
                        {exp.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-3 text-sm text-muted leading-relaxed">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-line">
                        {exp.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-lg bg-bg border border-line px-2.5 py-1 text-xs text-muted font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
