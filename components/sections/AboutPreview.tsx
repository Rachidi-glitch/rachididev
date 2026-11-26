import {
  IconBrandWordpress,
  IconBulb,
  IconSchool,
  IconTarget,
} from "@tabler/icons-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FadeIn } from "@/components/animations/FadeIn";

const stats = [
  { label: "WordPress", value: "7+ ans", icon: IconBrandWordpress },
  { label: "Développement", value: "1+ an", icon: IconBulb },
  { label: "Web developer", value: "Fullstack", icon: IconSchool },
];

const values = [
  { title: "Passionné par la technologie", icon: IconBulb },
  { title: "Toujours en apprentissage", icon: IconSchool },
  { title: "Orienté résultats", icon: IconTarget },
  { title: "Satisfaction client", icon: IconTarget },
];

export function AboutPreview() {
  return (
    <section className="relative overflow-hidden bg-dark py-20 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0 bg-grid-fade opacity-40"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-full max-w-3xl -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(10,132,255,0.14),transparent_68%)]"
        aria-hidden
      />

      <Container className="relative">
        <FadeIn>
          <SectionTitle
            eyebrow="À propos de moi"
            title="Développeur web fullstack & WordPress passionné"
            description="Je suis RachidiDev, développeur web fullstack & WordPress avec plus de 7 ans d'expérience en WordPress et environ 1 an en développement web moderne. J'aime transformer des idées en sites web performants, modernes et faciles à utiliser."
            align="center"
            className="max-w-3xl"
          />
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="relative mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-dark-card/35 shadow-card">
            <div
              className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand-light to-transparent"
              aria-hidden
            />
            <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {stats.map((stat) => (
                <div key={stat.label} className="p-6 text-center sm:p-8">
                  <stat.icon className="mx-auto mb-3 text-brand-light" size={22} />
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="mt-1 text-xs text-muted">{stat.label}</p>
                </div>
            ))}
            </div>
          </div>

          <ul className="mx-auto mt-10 grid max-w-3xl gap-x-10 gap-y-4 border-l border-brand/40 pl-5 sm:grid-cols-2 sm:border-l-0 sm:pl-0">
            {values.map((v) => (
              <li
                key={v.title}
                className="flex items-center gap-3 text-sm text-white/85 sm:rounded-lg sm:border sm:border-white/10 sm:bg-white/2 sm:px-4 sm:py-3"
              >
                <v.icon className="shrink-0 text-brand-light" size={18} />
                {v.title}
              </li>
            ))}
          </ul>
        </FadeIn>
      </Container>
    </section>
  );
}
