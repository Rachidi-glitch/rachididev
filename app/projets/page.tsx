import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { CTA } from "@/components/sections/CTA";
import { ProjectsClient } from "./ProjectsClient";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Projets web",
  description:
    "Découvrez les sites vitrines, projets WordPress, boutiques WooCommerce et applications web réalisés par RachidiDev.",
  path: "/projets",
});

export default function ProjectsPage() {
  return (
    <>
      <section className="bg-hero-gradient py-5 sm:py-10">
        <Container>
          <Badge>Mes projets</Badge>
          <h1 className="mt-6 max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Quelques réalisations qui reflètent mon savoir-faire.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            Une sélection de projets sur lesquels j&apos;ai travaillé, du site
            vitrine à l&apos;application web complète.
          </p>
        </Container>
      </section>

      <section className="bg-dark py-5 sm:py-10">
        <Container>
          <ProjectsClient />
        </Container>
      </section>

      <CTA />
    </>
  );
}
