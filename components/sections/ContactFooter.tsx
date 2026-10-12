"use client";

import { useState } from "react";
import { profile, socials } from "@/lib/content";
import { Send, Copy, Check, Github, Linkedin, ArrowUp, Mail } from "lucide-react";

export default function ContactFooter() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "", honey: "" });

  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honey) return; // honeypot

    setFormState("sending");
    setStatusMessage(null);

    try {
      const response = await fetch("https://formsubmit.co/ajax/f6a038cb7d8f6b507a10da93a55695b3", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `🚀 Portfolio Message from ${formData.name}`,
          _replyto: formData.email,
          _template: "table",
        }),
      });

      const data = await response.json().catch(() => null);

      if (data && (data.success === true || data.success === "true")) {
        setFormState("sent");
        setStatusMessage("✓ Message delivered directly to skmahaboobsubhani62@gmail.com!");
        setFormData({ name: "", email: "", message: "", honey: "" });
        setTimeout(() => setFormState("idle"), 6000);
        return;
      }

      // Check if FormSubmit needs 1-time activation
      if (data?.message?.toLowerCase().includes("activation")) {
        setFormState("sent");
        setStatusMessage(
          "✉️ FormSubmit sent an 'Activate Form' confirmation email to skmahaboobsubhani62@gmail.com. Please open Gmail (check Inbox & Spam) and click 'Activate Form' once. Once clicked, all future messages arrive instantly!"
        );
        return;
      }

      throw new Error(data?.message || "Failed to send message automatically.");
    } catch {
      // Fallback: If network or adblocker blocked formsubmit, open user's email client
      setFormState("idle");
      const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
        `Portfolio Inquiry from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoUrl;
      setStatusMessage("Opening your email client to send directly to skmahaboobsubhani62@gmail.com...");
    }
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

            {/* Location & Availability */}
            <div className="flex items-center gap-3 rounded-[22px] border border-line bg-card p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div>
                <div className="text-xs text-muted">Location &amp; Availability</div>
                <div className="text-sm font-medium text-text">Bhimavaram, AP · Open to Remote &amp; Relocation</div>
              </div>
            </div>

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

              {statusMessage && (
                <div
                  className={`rounded-xl p-3 text-xs sm:text-sm font-medium ${
                    formState === "sent"
                      ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                      : "bg-accent/10 border border-accent/30 text-accent"
                  }`}
                >
                  {statusMessage}
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="submit"
                  disabled={formState !== "idle"}
                  className="inline-flex items-center gap-2 rounded-full bg-text px-7 py-3 text-sm font-medium text-bg shadow-[0_0_40px_-8px_var(--accent)] transition-all hover:scale-[1.02] disabled:opacity-60 cursor-pointer"
                >
                  {formState === "idle" && (
                    <>
                      Send Message <Send size={14} />
                    </>
                  )}
                  {formState === "sending" && "Sending to Subhani..."}
                  {formState === "sent" && (
                    <>
                      <Check size={14} className="text-emerald-400" /> Sent to Inbox
                    </>
                  )}
                </button>

                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}&su=Portfolio%20Inquiry`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card/60 px-4 py-2.5 text-xs text-muted hover:text-text hover:border-accent/40 transition-colors"
                >
                  <Mail size={13} className="text-[#ea4335]" /> Open in Gmail
                </a>

                <a
                  href={`mailto:${profile.email}?subject=Portfolio%20Inquiry`}
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 text-xs text-muted hover:text-text transition-colors"
                >
                  Email app
                </a>
              </div>
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
