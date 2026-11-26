import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { StaggerGrid, StaggerItem } from "@/components/animations/StaggerGrid";
import { CTA } from "@/components/sections/CTA";
import { services } from "@/data/services";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Services web",
  description:
    "RachidiDev, développeur web fullstack & WordPress à Cotonou, crée des sites vitrines, boutiques WooCommerce et applications web sur mesure.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <section className="bg-hero-gradient py-5 sm:py-8">
        <Container>
          <Badge>Mes services</Badge>
          <h1 className="mt-6 max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Des solutions web sur mesure, du site vitrine à l&apos;application complète.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            Que vous ayez besoin d&apos;un site WordPress, d&apos;une boutique en ligne
            ou d&apos;une application web moderne, je vous accompagne à chaque
            étape de votre projet.
          </p>
        </Container>
      </section>

      <section className="bg-dark py-5 sm:py-8">
        <Container>
          <SectionTitle
            eyebrow="Ce que je propose"
            title="Un accompagnement complet pour vos projets web"
          />
          <StaggerGrid className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <StaggerItem key={service.title}>
                <ServiceCard service={service} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </Container>
      </section>

      <CTA />
    </>
  );
}
