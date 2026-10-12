import NavPill from "@/components/NavPill";
import CommandPalette from "@/components/CommandPalette";
import Hero from "@/components/Hero";
import ProofStrip from "@/components/ProofStrip";
import HowIBuild from "@/components/sections/HowIBuild";
import WorkBento from "@/components/sections/WorkBento";
import SkillsBento from "@/components/sections/SkillsBento";

// Placeholders so nav anchors work. Replaced in subsequent build phases.
function Soon({ id, title }: { id: string; title: string }) {
  return (
    <section id={id} className="mx-auto max-w-[1200px] scroll-mt-24 px-6 py-32 border-t border-line">
      <h2 className="text-4xl font-semibold tracking-[-0.03em]">{title}</h2>
      <p className="mt-3 text-muted">Coming in the next build phase.</p>
    </section>
  );
}

export default function Page() {
  return (
    <>
      <NavPill />
      <CommandPalette />
      <main>
        <Hero />
        <ProofStrip />
        <HowIBuild />
        <WorkBento />
        <Soon id="experience" title="Experience" />
        <SkillsBento />
        <Soon id="ask" title="Ask my AI" />
        <Soon id="contact" title="Let’s build something." />
      </main>
    </>
  );
}
