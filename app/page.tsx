import { Hero } from "@/components/sections/Hero";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { SkillsPreview } from "@/components/sections/SkillsPreview";
import { ProjectsPreview } from "@/components/sections/ProjectsPreview";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { CTA } from "@/components/sections/CTA";
import { HomeStarfield } from "@/components/animations/HomeStarfield";

export default function HomePage() {
  return (
    <HomeStarfield>
      <Hero />
      <AboutPreview />
      <SkillsPreview />
      <ProjectsPreview />
      <ServicesPreview />
      <CTA />
    </HomeStarfield>
  );
}
