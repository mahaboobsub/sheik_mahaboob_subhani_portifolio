"use client";
import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useTheme } from "next-themes";
import { nav, profile } from "@/lib/content";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((o) => !o); }
    };
    const show = () => setOpen(true);
    window.addEventListener("keydown", key);
    window.addEventListener("open-palette", show);
    return () => { window.removeEventListener("keydown", key); window.removeEventListener("open-palette", show); };
  }, []);

  const run = (fn: () => void) => () => { setOpen(false); fn(); };
  const item = "flex cursor-pointer items-center rounded-xl px-3 py-2 text-[15px] aria-selected:bg-text/10";

  return (
    <Command.Dialog open={open} onOpenChange={setOpen} label="Command menu"
      overlayClassName="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
      contentClassName="glass fixed left-1/2 top-[18vh] z-[70] w-[min(560px,92vw)] -translate-x-1/2 overflow-hidden rounded-3xl">
      <Command.Input placeholder="Search or jump to…"
        className="w-full border-b border-line bg-transparent px-5 py-4 text-[17px] outline-none placeholder:text-muted" />
      <Command.List className="max-h-80 overflow-auto p-2">
        <Command.Empty className="px-3 py-6 text-center text-muted">No results.</Command.Empty>
        <Command.Group heading="Go to" className="text-sm text-muted [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2">
          {nav.map((n) => (
            <Command.Item key={n.href} className={item} onSelect={run(() => { location.hash = n.href; })}>{n.label}</Command.Item>
          ))}
        </Command.Group>
        <Command.Group heading="Actions" className="text-sm text-muted [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2">
          <Command.Item className={item} onSelect={run(() => navigator.clipboard.writeText(profile.email))}>Copy email</Command.Item>
          <Command.Item className={item} onSelect={run(() => window.open("/resume.pdf", "_blank"))}>Download résumé</Command.Item>
          <Command.Item className={item} onSelect={run(() => window.open(profile.github, "_blank"))}>Open GitHub</Command.Item>
          <Command.Item className={item} onSelect={run(() => window.open(profile.linkedin, "_blank"))}>Open LinkedIn</Command.Item>
          <Command.Item className={item} onSelect={run(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))}>Toggle theme</Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}
