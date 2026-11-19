import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FadeIn } from "@/components/animations/FadeIn";
import { timeline } from "@/data/timeline";

export function Timeline() {
  return (
    <section className="bg-dark-soft py-20 sm:py-28">
      <Container>
        <SectionTitle
          eyebrow="Mon parcours professionnel"
          title="Une progression constante"
        />
        <div className="relative mt-12 max-w-2xl border-l border-white/10 pl-8">
          {timeline.map((item, index) => (
            <FadeIn key={item.title} delay={index * 0.1} className="relative pb-10 last:pb-0">
              <span className="absolute -left-[2.35rem] top-1 h-3 w-3 rounded-full border-2 border-dark-soft bg-brand" />
              <p className="text-sm font-semibold text-brand-light">{item.period}</p>
              <h3 className="mt-1 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
