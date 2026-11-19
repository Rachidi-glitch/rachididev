import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { SkillCard } from "@/components/ui/SkillCard";
import { StaggerGrid, StaggerItem } from "@/components/animations/StaggerGrid";
import { skills } from "@/data/skills";

export function SkillsPreview() {
  const preview = skills.slice(0, 12);

  return (
    <section className="bg-dark-soft py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionTitle
            eyebrow="Mes compétences"
            title="Un large éventail de technologies"
            description="Je maîtrise un ensemble d'outils et de technologies pour créer des sites web et des applications performantes et évolutives."
          />
          <Button href="/competences" variant="secondary" className="shrink-0">
            Voir toutes mes compétences
          </Button>
        </div>

        <StaggerGrid className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {preview.map((skill) => (
            <StaggerItem key={skill.name}>
              <SkillCard skill={skill} />
            </StaggerItem>
          ))}
        </StaggerGrid>
      </Container>
    </section>
  );
}
