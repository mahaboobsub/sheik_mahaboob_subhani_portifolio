"use client";
import { motion } from "motion/react";
import { pipelineLog, profile } from "@/lib/content";

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

      <motion.div variants={list} initial="hidden" animate="show" className="relative mx-auto w-full max-w-[1200px] pt-24">
        <motion.p variants={rise} className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Open to developer roles · 2026
        </motion.p>

        <motion.p variants={rise} className="text-sm font-medium tracking-wide text-accent">
          {profile.role}
        </motion.p>

        <motion.h1 variants={rise}
          className="mt-3 text-[clamp(3rem,9vw,7.5rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
          {profile.name.split(" ").slice(0, -1).join(" ")}{" "}
          <span className="bg-gradient-to-r from-[#0a84ff] via-[#bf5af2] to-[#ff375f] bg-clip-text text-transparent">
            {profile.name.split(" ").slice(-1)[0]}
          </span>
        </motion.h1>

        <motion.p variants={rise} className="mt-4 max-w-[20ch] text-[clamp(1.5rem,4vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-muted">
          {profile.headline}
        </motion.p>

        <motion.p variants={rise} className="mt-6 max-w-[52ch] text-lg text-muted">{profile.sub}</motion.p>

        <motion.div variants={rise} className="mt-10 flex flex-wrap items-center gap-3">
          <a href="#work" className="rounded-full bg-text px-7 py-3.5 font-medium text-bg shadow-[0_0_40px_-8px_var(--accent)] transition-transform hover:scale-[1.03]">See my work</a>
          <a href="#ask" className="glass rounded-full px-7 py-3.5 font-medium transition-transform hover:scale-[1.03]">Ask my AI</a>
          <a href="/resume.pdf" className="px-3 py-3.5 text-muted underline-offset-4 hover:text-text hover:underline">Download résumé</a>
        </motion.div>

        <motion.div variants={rise} aria-hidden
          className="glass absolute -bottom-6 right-0 hidden w-[420px] rounded-3xl p-5 font-mono text-[13px] leading-6 lg:block">
          <div className="mb-3 flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          {pipelineLog.map((line, i) => (
            <motion.p key={line} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 1.2 + i * 0.55, duration: 0.3 }}
              className={i === pipelineLog.length - 1 ? "text-emerald-400" : "text-muted"}>
              {i === pipelineLog.length - 1 ? "✓ " : "› "}{line}
            </motion.p>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
