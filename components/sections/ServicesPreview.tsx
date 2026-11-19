import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { StaggerGrid, StaggerItem } from "@/components/animations/StaggerGrid";
import { services } from "@/data/services";

export function ServicesPreview() {
  const preview = services.slice(0, 6);

  return (
    <section className="bg-dark py-20 sm:py-28">
      <Container>
        <SectionTitle
          eyebrow="Mes services"
          title="Ce que je peux réaliser pour vous"
          description="Des sites WordPress aux applications web modernes, je vous accompagne sur l'ensemble de votre projet."
          align="center"
        />

        <StaggerGrid className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map((service) => (
            <StaggerItem key={service.title}>
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </StaggerGrid>

        <div className="mt-12 flex justify-center">
          <Button href="/services" variant="secondary">
            Voir tous mes services
          </Button>
        </div>
      </Container>
    </section>
  );
}
