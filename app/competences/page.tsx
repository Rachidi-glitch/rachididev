import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { SkillCard } from "@/components/ui/SkillCard";
import { StaggerGrid, StaggerItem } from "@/components/animations/StaggerGrid";
import { CTA } from "@/components/sections/CTA";
import { skills } from "@/data/skills";

export const metadata: Metadata = {
  title: "Compétences",
  description:
    "Les technologies et outils maîtrisés par RachidiDev : WordPress, Next.js, React, TypeScript, Node.js, Supabase et plus.",
  alternates: { canonical: "/competences" },
};

export default function SkillsPage() {
  return (
    <>
      <section className="bg-hero-gradient py-5 sm:py-10">
        <Container>
          <Badge>Mes compétences</Badge>
          <h1 className="mt-6 max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Un large éventail de technologies pour vos projets.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            Je combine plus de 7 ans d&apos;expérience WordPress avec des
            technologies modernes pour livrer des projets fiables et
            évolutifs.
          </p>
        </Container>
      </section>

      <section className="bg-dark py-5 sm:py-10">
        <Container>
          <SectionTitle
            eyebrow="Stack technique"
            title="Technologies et outils maîtrisés"
          />
          <StaggerGrid className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {skills.map((skill) => (
              <StaggerItem key={skill.name}>
                <SkillCard skill={skill} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </Container>
      </section>

      <CTA />
    </>
  );
}
