import { education, achievements } from "@/lib/content";
import { GraduationCap, Award, Trophy, CheckCircle2 } from "lucide-react";

export default function EducationSection() {
  return (
    <section id="education" className="mx-auto max-w-[1200px] scroll-mt-24 px-6 py-28 sm:py-36">
      {/* SECTION HEADER */}
      <div className="mb-14">
        <p className="text-sm font-medium tracking-wide text-accent">Academic Foundation</p>
        <h2 className="mt-3 text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[1.04] tracking-[-0.03em]">
          Education &amp; Achievements.
        </h2>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* EDUCATION CARDS */}
        {education.map((edu, idx) => (
          <div
            key={edu.degree}
            className="col-span-12 lg:col-span-6 rounded-[28px] border border-line bg-card p-7 sm:p-8 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent shrink-0">
                <GraduationCap size={20} />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold tracking-tight text-text">{edu.degree}</h3>
                <p className="text-sm text-muted">{edu.institution}</p>
                <div className="flex items-center gap-3 pt-1">
                  <span className="text-xs text-muted">{edu.period}</span>
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-500">
                    {edu.grade}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* ACHIEVEMENTS CARD */}
        <div className="col-span-12 rounded-[28px] border border-line bg-card p-7 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 shrink-0">
              <Trophy size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold tracking-tight text-text">
                Achievements &amp; Certifications
              </h3>
              <p className="text-xs text-muted">Competition finishes, DSA milestones, and industry credentials</p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {achievements.map((ach) => (
              <div
                key={ach}
                className="flex items-start gap-3 rounded-2xl border border-line bg-bg p-4"
              >
                <CheckCircle2 size={16} className="text-accent mt-0.5 shrink-0" />
                <span className="text-sm text-text leading-relaxed">{ach}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
