"use client";

import { useState } from "react";
import { profile, socials } from "@/lib/content";
import { Send, Copy, Check, Github, Linkedin, ArrowUp, Mail } from "lucide-react";

export default function ContactFooter() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "", honey: "" });

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honey) return; // honeypot
    setFormState("sending");
    // Simulate send (replace with real Resend API call in Phase 8)
    await new Promise((r) => setTimeout(r, 1200));
    setFormState("sent");
    setFormData({ name: "", email: "", message: "", honey: "" });
    setTimeout(() => setFormState("idle"), 4000);
  };

  return (
    <>
      {/* CONTACT SECTION */}
      <section id="contact" className="mx-auto max-w-[1200px] scroll-mt-24 px-6 py-28 sm:py-36">
        <div className="mb-14">
          <p className="text-sm font-medium tracking-wide text-accent">Get In Touch</p>
          <h2 className="mt-3 text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[1.04] tracking-[-0.03em]">
            Let&apos;s build something.
          </h2>
          <p className="mt-4 max-w-[56ch] text-lg text-muted">
            Looking for an AI-SDE who ships autonomous agents, RAG pipelines, and full-stack products? Let&apos;s talk.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* LEFT: QUICK LINKS */}
          <div className="col-span-12 lg:col-span-5 space-y-6">
            {/* Copy Email Pill */}
            <button
              onClick={copyEmail}
              className="group flex w-full items-center justify-between rounded-[22px] border border-line bg-card p-5 text-left transition-all hover:border-accent/40 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-xs text-muted">Email</div>
                  <div className="text-sm font-medium text-text">{profile.email}</div>
                </div>
              </div>
              <span className="text-muted group-hover:text-text transition-colors">
                {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
              </span>
            </button>

            {/* Social Links */}
            <div className="space-y-3">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-[22px] border border-line bg-card p-5 transition-all hover:border-accent/40"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-text/10 text-text">
                  <Github size={18} />
                </div>
                <div>
                  <div className="text-xs text-muted">GitHub</div>
                  <div className="text-sm font-medium text-text">github.com/mahaboobsub</div>
                </div>
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-[22px] border border-line bg-card p-5 transition-all hover:border-accent/40"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0a66c2]/10 text-[#0a66c2]">
                  <Linkedin size={18} />
                </div>
                <div>
                  <div className="text-xs text-muted">LinkedIn</div>
                  <div className="text-sm font-medium text-text">sheik-mahaboob-subhani</div>
                </div>
              </a>
            </div>

            {/* Resume Download */}
            <a
              href="/resume.pdf"
              target="_blank"
              className="block rounded-[22px] border border-line bg-card p-5 text-center transition-all hover:border-accent/40"
            >
              <span className="text-sm font-medium text-text">Download Résumé (PDF)</span>
            </a>
          </div>

          {/* RIGHT: CONTACT FORM */}
          <div className="col-span-12 lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="rounded-[28px] border border-line bg-card p-7 sm:p-8 shadow-sm space-y-5"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="contact-name" className="block text-xs font-medium text-muted mb-1.5">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm text-text outline-none focus:border-accent transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="contact-email" className="block text-xs font-medium text-muted mb-1.5">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm text-text outline-none focus:border-accent transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-medium text-muted mb-1.5">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm text-text outline-none focus:border-accent transition-colors resize-none"
                  placeholder="Tell me about the role or project..."
                />
              </div>

              {/* Honeypot */}
              <input
                type="text"
                name="honey"
                value={formData.honey}
                onChange={(e) => setFormData({ ...formData, honey: e.target.value })}
                className="sr-only"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <button
                type="submit"
                disabled={formState !== "idle"}
                className="inline-flex items-center gap-2 rounded-full bg-text px-7 py-3 text-sm font-medium text-bg shadow-[0_0_40px_-8px_var(--accent)] transition-all hover:scale-[1.02] disabled:opacity-60"
              >
                {formState === "idle" && (
                  <>
                    Send Message <Send size={14} />
                  </>
                )}
                {formState === "sending" && "Sending..."}
                {formState === "sent" && (
                  <>
                    <Check size={14} className="text-emerald-400" /> Sent successfully
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-line px-6 py-10">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted">
            Designed and built by{" "}
            <span className="font-medium text-text">{profile.name}</span>
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted">Last updated October 2026</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="rounded-full border border-line p-2 text-muted hover:text-text hover:border-accent transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
