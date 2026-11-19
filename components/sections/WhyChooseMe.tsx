import { IconClock, IconHeart, IconMessageCircle, IconSparkles } from "@tabler/icons-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StaggerGrid, StaggerItem } from "@/components/animations/StaggerGrid";

const reasons = [
  {
    title: "Un travail de qualité",
    description: "Des résultats propres, performants et maintenables.",
    icon: IconSparkles,
  },
  {
    title: "Une bonne communication",
    description: "Je reste disponible et à l'écoute de vos besoins.",
    icon: IconMessageCircle,
  },
  {
    title: "Le respect des délais",
    description: "Je m'engage à livrer dans les temps, à chaque projet.",
    icon: IconClock,
  },
  {
    title: "Une passion réelle",
    description: "Le développement web est plus qu'un métier, c'est ce que j'aime faire.",
    icon: IconHeart,
  },
];

export function WhyChooseMe() {
  return (
    <section className="bg-dark-soft py-20 sm:py-28">
      <Container>
        <SectionTitle
          eyebrow="Pourquoi me choisir ?"
          title="Une collaboration basée sur la confiance"
          align="center"
        />
        <StaggerGrid className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <StaggerItem key={reason.title}>
              <div className="h-full rounded-2xl border border-white/10 bg-dark-card/50 p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand/15 text-brand-light">
                  <reason.icon size={20} />
                </span>
                <h3 className="mt-4 text-base font-semibold text-white">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {reason.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </Container>
    </section>
  );
}
