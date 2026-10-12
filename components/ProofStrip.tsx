"use client";
import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";
import { proof } from "@/lib/content";

function Counter({ to, prefix, suffix }: { to: number; prefix: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  useEffect(() => {
    const el = ref.current;
    if (!inView || !el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const c = animate(0, to, {
      duration: 1.4, ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => { el.textContent = `${prefix}${Math.round(v)}${suffix}`; },
    });
    return () => c.stop();
  }, [inView, to, prefix, suffix]);
  return <span ref={ref}>{prefix}{to}{suffix}</span>;
}

export default function ProofStrip() {
  return (
    <section aria-label="Highlights" className="mx-auto max-w-[1200px] px-6 py-24">
      <dl className="grid grid-cols-2 gap-x-8 gap-y-12 border-t border-line pt-12 lg:grid-cols-4">
        {proof.map((p) => (
          <div key={p.label}>
            <dt className="text-5xl font-semibold tracking-[-0.03em] tabular-nums sm:text-6xl">
              <Counter to={p.to} prefix={p.prefix} suffix={p.suffix} />
            </dt>
            <dd className="mt-3 max-w-[22ch] text-[15px] text-muted">{p.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
