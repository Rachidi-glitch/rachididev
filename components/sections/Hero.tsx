"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { IconArrowRight, IconMail } from "@tabler/icons-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const technologies = [
  "WordPress",
  "React",
  "Next.js",
  "Tailwind CSS",
  "HTML",
  "CSS",
  "JavaScript",
  "PHP",
  "Python",
  "Node.js",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient">
      <div
        className="pointer-events-none absolute inset-0 bg-grid-fade"
        aria-hidden
      />
      <Container className="relative grid gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Badge>
            <span className="h-2 w-2 rounded-full bg-brand-light" />
            Développeur web fullstack & WordPress
          </Badge>

          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
            Je transforme vos idées en{" "}
            <span className="text-brand-light">solutions web</span> modernes
            et <span className="text-brand-light">performantes</span>.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Spécialisé en WordPress depuis plus de 7 ans et en développement
            web moderne, je conçois des sites modernes, rapides et performants
            ainsi que des solutions sur mesure adaptées aux besoins de mes
            clients.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/projets" size="lg">
              Voir mes projets <IconArrowRight size={18} />
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              <IconMail size={18} /> Me contacter
            </Button>
          </div>

          <div className="mt-12">
            <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted">
              Technologies
            </p>
            <div className="flex flex-wrap gap-2.5">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/85"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl border border-white/10 shadow-glow">
            <Image
              src="/images/profile/hero-photo.png"
              alt="Photo de RachidiDev, développeur web fullstack & WordPress"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 480px"
              className="object-cover"
            />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
