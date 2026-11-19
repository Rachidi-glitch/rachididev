import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StaggerGrid, StaggerItem } from "@/components/animations/StaggerGrid";

interface Stat {
  value: string;
  label: string;
}

export function StatsGrid({ stats }: { stats: Stat[] }) {
  return (
    <section className="bg-dark py-20 sm:py-28">
      <Container>
        <SectionTitle
          eyebrow="En chiffres"
          title="Mon expérience en quelques chiffres"
          align="center"
        />
        <StaggerGrid className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="rounded-2xl border border-white/10 bg-dark-card/50 p-6 text-center">
                <p className="text-3xl font-bold text-brand-light">{stat.value}</p>
                <p className="mt-2 text-xs text-muted">{stat.label}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </Container>
    </section>
  );
}
