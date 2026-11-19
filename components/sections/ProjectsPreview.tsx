import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { StaggerGrid, StaggerItem } from "@/components/animations/StaggerGrid";
import { projects } from "@/data/projects";

export function ProjectsPreview() {
  const preview = projects.slice(0, 4);

  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionTitle
            eyebrow="Mes projets"
            title="Quelques réalisations"
            description="Voici une sélection de projets sur lesquels j'ai travaillé, reflétant mon engagement à fournir des solutions modernes et performantes."
            className="[&_h2]:text-dark [&_p]:text-dark/60"
          />
          <Button href="/projets" variant="secondary" className="shrink-0 border-dark/20! text-dark! hover:border-brand!">
            Voir tous mes projets
          </Button>
        </div>

        <StaggerGrid className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {preview.map((project) => (
            <StaggerItem key={project.slug}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerGrid>
      </Container>
    </section>
  );
}
