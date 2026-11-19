import type { Metadata } from "next";
import Image from "next/image";
import { IconDownload } from "@tabler/icons-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/animations/FadeIn";
import { Timeline } from "@/components/sections/Timeline";
import { StatsGrid } from "@/components/sections/StatsGrid";
import { WhyChooseMe } from "@/components/sections/WhyChooseMe";
import { QuoteBlock } from "@/components/sections/QuoteBlock";
import { CTA } from "@/components/sections/CTA";
import { skills } from "@/data/skills";
import { DynamicIcon } from "@/components/ui/DynamicIcon";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Découvrez le parcours de RachidiDev, développeur Fullstack spécialisé WordPress et développement web moderne.",
  alternates: { canonical: "/a-propos" },
};

const stats = [
  { value: "7+", label: "ans d&apos;expérience WordPress" },
  { value: "1+", label: "an en développement web" },
  { value: "10+", label: "projets réalisés" },
  { value: "100%", label: "engagement qualité" },
];

const tools = skills.slice(0, 8);

export default function AboutPage() {
  return (
    <>
      <section className="bg-hero-gradient py-5 sm:py-10">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <FadeIn>
            <div className="relative mx-auto aspect-4/5 w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 shadow-glow">
              <Image
                src="/images/profile/about-photo.png"
                alt="Photo de RachidiDev"
                fill
                sizes="(max-width: 1024px) 80vw, 400px"
                className="object-cover"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Badge>À propos de moi</Badge>
            <h1 className="mt-6 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Passionné par le code, je construis des solutions web{" "}
              <span className="text-brand-light">modernes et performantes</span>.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
              Je suis RachidiDev, développeur web avec près de 7 ans
              d&apos;expérience en WordPress et 1 an en développement moderne. Je
              transforme des idées en sites web performants, modernes et
              faciles à utiliser.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/contact" size="lg">
                Me contacter
              </Button>
              <Button
                href="/cv/rachididev-cv.pdf"
                download
                variant="secondary"
                size="lg"
              >
                <IconDownload size={18} /> Télécharger mon CV
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="bg-dark py-5 sm:py-10">
        <Container>
          <SectionTitle
            eyebrow="Mon parcours"
            title="Une expérience solide en développement web"
            description="Depuis près de 7 ans, je me spécialise dans la création de sites web avec WordPress. Depuis 1 an, j'ai élargi mes compétences au développement moderne avec Next.js, React.js et d'autres technologies pour des projets plus complexes et performants."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <FadeIn className="rounded-2xl border border-white/10 bg-dark-card/50 p-6">
              <DynamicIcon name="IconBrandWordpress" className="text-brand-light" size={26} />
              <h3 className="mt-4 text-lg font-semibold text-white">
                WordPress
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Développement WordPress depuis plus de 7 ans : thèmes,
                plugins, personnalisation, maintenance.
              </p>
            </FadeIn>
            <FadeIn delay={0.1} className="rounded-2xl border border-white/10 bg-dark-card/50 p-6">
              <DynamicIcon name="IconCode" className="text-brand-light" size={26} />
              <h3 className="mt-4 text-lg font-semibold text-white">
                Développement Web
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Depuis 1 an : Next.js, React.js, HTML, CSS, Tailwind CSS et
                plus encore.
              </p>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="bg-dark-soft py-5 sm:py-10">
        <Container>
          <SectionTitle
            eyebrow="Mes outils & technologies"
            title="Un stack moderne pour des projets ambitieux"
            description="J'utilise des technologies modernes et fiables pour développer des applications web performantes, sécurisées et évolutives."
          />
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="rounded-xl border border-white/10 bg-dark-card/50 p-5"
              >
                <DynamicIcon name={tool.icon} className="text-brand-light" size={24} />
                <p className="mt-3 text-sm font-semibold text-white">
                  {tool.name}
                </p>
                <p className="mt-1 text-xs text-muted">{tool.category}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <WhyChooseMe />
      <StatsGrid stats={stats} />
      <Timeline />
      <QuoteBlock
        quote="Un bon site web n'est pas seulement beau, il doit aussi être rapide, sécurisé et utile."
        author="RachidiDev"
      />
      <CTA />
    </>
  );
}
