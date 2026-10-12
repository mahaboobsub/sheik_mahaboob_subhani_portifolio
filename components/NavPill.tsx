"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Command, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { nav } from "@/lib/content";

export default function NavPill() {
  const [scrolled, setScrolled] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav aria-label="Primary"
        className={`glass flex items-center gap-1 rounded-full px-2 transition-[height] duration-300 ${scrolled ? "h-12" : "h-14"}`}>
        <a href="#top" aria-label="Home" className="px-3 text-sm font-semibold tracking-tight">SM</a>
        <ul className="hidden items-center sm:flex" onMouseLeave={() => setHover(null)}>
          {nav.map((i) => (
            <li key={i.href} className="relative">
              <a href={i.href} onMouseEnter={() => setHover(i.href)}
                className="relative z-10 block px-3 py-1.5 text-sm text-muted transition-colors hover:text-text">
                {i.label}
              </a>
              {hover === i.href && (
                <motion.span layoutId="nav-hover" className="absolute inset-0 rounded-full bg-text/10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }} />
              )}
            </li>
          ))}
        </ul>
        <button onClick={() => window.dispatchEvent(new Event("open-palette"))}
          className="ml-1 flex items-center gap-1 rounded-full px-3 py-1.5 text-sm text-muted hover:text-text"
          aria-label="Open command menu">
          <Command size={14} /> <span className="hidden sm:inline">K</span>
        </button>
        <button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="rounded-full p-2 text-muted hover:text-text" aria-label="Toggle theme">
          {mounted && resolvedTheme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <a href="/resume.pdf" className="ml-1 rounded-full bg-text px-4 py-1.5 text-sm font-medium text-bg">Résumé</a>
      </nav>
    </header>
  );
}
