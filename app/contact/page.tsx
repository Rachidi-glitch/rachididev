import type { Metadata } from "next";
import {
  IconDownload,
  IconMail,
  IconMapPin,
  IconPhone,
} from "@tabler/icons-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/animations/FadeIn";
import { ContactForm } from "@/components/contact/ContactForm";
import { contactInfo } from "@/data/socials";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Demandez un devis à RachidiDev pour votre projet WordPress, site vitrine, e-commerce ou application web.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="bg-hero-gradient py-16 sm:py-20">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <FadeIn>
          <Badge>Contact</Badge>
          <h1 className="mt-6 text-3xl font-bold leading-tight text-white sm:text-4xl">
            Parlons de votre projet
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted">
            Vous avez un projet web ou une idée à concrétiser ? Décrivez-moi
            votre besoin et je vous recontacterai afin d&apos;échanger sur votre
            projet et vous proposer une solution adaptée.
          </p>

          <div className="mt-10 space-y-5">
            <div className="flex items-center gap-3 text-sm text-white/85">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand-light">
                <IconMail size={18} />
              </span>
              {contactInfo.email}
            </div>
            <div className="flex items-center gap-3 text-sm text-white/85">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand-light">
                <IconPhone size={18} />
              </span>
              {contactInfo.phone}
            </div>
            <div className="flex items-center gap-3 text-sm text-white/85">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand-light">
                <IconMapPin size={18} />
              </span>
              {contactInfo.location}
            </div>
          </div>
          <Button
            href="/cv/rachididev-cv.pdf"
            download
            variant="secondary"
            className="mt-8"
          >
            <IconDownload size={18} /> Télécharger mon CV
          </Button>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="rounded-2xl border border-white/10 bg-dark-card/50 p-6 sm:p-10">
            <ContactForm />
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
