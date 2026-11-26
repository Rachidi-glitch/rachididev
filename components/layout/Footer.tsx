import Link from "next/link";
import Image from "next/image";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTiktok,
} from "@tabler/icons-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { navLinks } from "@/lib/nav-links";
import { socials } from "@/data/socials";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-dark-soft">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8">
        <div>
          <div className="flex items-center gap-1">
            <Image
              src="/images/logo.png"
              alt="Logo RachidiDev"
              width={64}
              height={64}
              loading="eager"
              className="rounded-lg object-contain"
            />
            <span className="text-base font-bold text-white">
              Rachidi<span className="text-brand">Dev</span>
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            Développeur web fullstack &amp; WordPress, spécialisé dans la
            création de solutions web modernes.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white hover:border-brand/50 hover:text-brand-light"
            >
              <IconBrandGithub size={18} />
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white hover:border-brand/50 hover:text-brand-light"
            >
              <IconBrandLinkedin size={18} />
            </a>
            <a
              href={socials.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white hover:border-brand/50 hover:text-brand-light"
            >
              <IconBrandTiktok size={18} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Navigation</h3>
          <ul className="mt-4 space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">
            Un projet en tête ?
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Discutons de votre projet et voyons comment je peux vous aider.
          </p>
          <Button href="/contact" size="sm" className="mt-5">
            Demander un devis
          </Button>
        </div>
      </Container>

      <div className="border-t border-white/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-3 text-xs text-muted sm:flex-row">
          <p>© {year} RachidiDev. Tous droits réservés.</p>
          <p>Conçu et développé par RachidiDev.</p>
        </Container>
      </div>
    </footer>
  );
}
