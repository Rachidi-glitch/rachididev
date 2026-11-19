import { IconRocket } from "@tabler/icons-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/animations/FadeIn";

export function CTA() {
  return (
    <section className="bg-dark py-5 sm:py-10">
      <Container>
        <FadeIn>
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-dark-card/60 px-6 py-14 text-center sm:px-16">
            <div
              className="pointer-events-none absolute inset-0 bg-grid-fade"
              aria-hidden
            />
            <div className="relative mx-auto flex max-w-xl flex-col items-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/15 text-brand-light">
                <IconRocket size={26} />
              </span>
              <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl">
                Travaillons ensemble
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                Vous avez un projet web ou une idée à concrétiser ?
                N&apos;hésitez pas à me contacter, je suis disponible pour
                échanger et vous accompagner.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button href="/contact" size="lg">
                  Demander un devis
                </Button>
                <Button href="/a-propos" variant="secondary" size="lg">
                  En savoir plus
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
