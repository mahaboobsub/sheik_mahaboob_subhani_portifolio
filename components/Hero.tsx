"use client";
import { motion } from "motion/react";
import { pipelineLog, profile } from "@/lib/content";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;
const list = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } };
const rise = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease } },
};

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-svh items-center overflow-hidden px-6">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="aurora -left-[10vw] top-[8vh] h-[46vw] w-[46vw] bg-[#0a84ff]/40" />
        <div className="aurora right-[-12vw] top-[30vh] h-[40vw] w-[40vw] bg-[#bf5af2]/30" style={{ animationDelay: "-10s" }} />
        <div className="aurora bottom-[-18vh] left-[28vw] h-[36vw] w-[36vw] bg-[#ff375f]/20" style={{ animationDelay: "-20s" }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--bg)_100%)]" />
      </div>

      <motion.div variants={list} initial="hidden" animate="show" className="relative mx-auto w-full max-w-[1200px] pt-24 pb-12 sm:pt-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 xl:col-span-7">
            <motion.p variants={rise} className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs sm:text-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Open to AI-SDE &amp; Full Stack roles · 2026
            </motion.p>

            <motion.p variants={rise} className="text-sm font-medium tracking-wide text-accent">
              {profile.role}
            </motion.p>

            <motion.h1 variants={rise}
              className="mt-3 text-[clamp(2.75rem,7vw,6.5rem)] font-semibold leading-[1.03] tracking-[-0.04em]">
              {profile.name.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="bg-gradient-to-r from-[#0a84ff] via-[#bf5af2] to-[#ff375f] bg-clip-text text-transparent">
                {profile.name.split(" ").slice(-1)[0]}
              </span>
            </motion.h1>

            <motion.p variants={rise} className="mt-4 max-w-[24ch] text-[clamp(1.35rem,3.2vw,2.25rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-muted">
              {profile.headline}
            </motion.p>

            <motion.p variants={rise} className="mt-5 max-w-[50ch] text-base sm:text-lg text-muted">{profile.sub}</motion.p>

            {/* Social / Contact Links — Pill tags that wrap cleanly and never collide */}
            <motion.div variants={rise} className="mt-6 flex flex-wrap items-center gap-2.5 text-xs sm:text-sm text-muted">
              <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card/70 px-3 py-1.5 hover:text-text hover:border-accent/40 transition-colors">
                <Github size={14} /> mahaboobsub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card/70 px-3 py-1.5 hover:text-text hover:border-accent/40 transition-colors">
                <Linkedin size={14} className="text-[#0a84ff]" /> LinkedIn
              </a>
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card/70 px-3 py-1.5 hover:text-text hover:border-accent/40 transition-colors">
                <Mail size={14} className="text-[#bf5af2]" /> {profile.email}
              </a>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card/70 px-3 py-1.5">
                <MapPin size={14} className="text-[#ff9f0a]" /> {profile.location}
              </span>
            </motion.div>

            {/* CTA Action Buttons */}
            <motion.div variants={rise} className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#work" className="rounded-full bg-text px-7 py-3.5 text-sm sm:text-base font-medium text-bg shadow-[0_0_40px_-8px_var(--accent)] transition-transform hover:scale-[1.03]">See my work</a>
              <a href="#ask" className="glass rounded-full px-7 py-3.5 text-sm sm:text-base font-medium transition-transform hover:scale-[1.03]">Ask my AI</a>
              <a href="/resume.pdf" target="_blank" className="px-3 py-3.5 text-sm sm:text-base text-muted underline-offset-4 hover:text-text hover:underline">Download résumé</a>
            </motion.div>
          </div>

          {/* Right Column: Interactive Terminal Box in Dedicated Column */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-5">
            <motion.div variants={rise} aria-hidden
              className="glass w-full rounded-3xl p-6 font-mono text-[13px] leading-6 shadow-xl border border-line/60">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-[11px] text-muted">pipeline-stream.log</span>
              </div>
              <div className="space-y-1.5">
                {pipelineLog.map((line, i) => (
                  <motion.p key={line} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.4, duration: 0.3 }}
                    className={i === pipelineLog.length - 1 ? "text-emerald-400 font-semibold" : "text-muted"}>
                    {i === pipelineLog.length - 1 ? "✓ " : "› "}{line}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
