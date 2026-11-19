import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/animations/FadeIn";

export function QuoteBlock({ quote, author }: { quote: string; author: string }) {
  return (
    <section className="bg-dark-soft py-16">
      <Container>
        <FadeIn>
          <blockquote className="mx-auto max-w-2xl text-center">
            <p className="text-xl font-medium italic leading-relaxed text-white sm:text-2xl">
              « {quote} »
            </p>
            <footer className="mt-4 text-sm text-brand-light">— {author}</footer>
          </blockquote>
        </FadeIn>
      </Container>
    </section>
  );
}
