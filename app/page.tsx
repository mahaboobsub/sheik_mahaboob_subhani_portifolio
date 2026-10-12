import NavPill from "@/components/NavPill";
import CommandPalette from "@/components/CommandPalette";
import Hero from "@/components/Hero";
import ProofStrip from "@/components/ProofStrip";
import HowIBuild from "@/components/sections/HowIBuild";
import WorkBento from "@/components/sections/WorkBento";
import SkillsBento from "@/components/sections/SkillsBento";
import ExperienceTimeline from "@/components/sections/ExperienceTimeline";
import EducationSection from "@/components/sections/EducationSection";
import AskAI from "@/components/sections/AskAI";
import ContactFooter from "@/components/sections/ContactFooter";

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
        <ExperienceTimeline />
        <SkillsBento />
        <EducationSection />
        <AskAI />
        <ContactFooter />
      </main>
    </>
  );
}
