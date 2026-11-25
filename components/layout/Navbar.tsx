"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { IconMenu2 } from "@tabler/icons-react";
import { navLinks } from "@/lib/nav-links";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-dark/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/images/logo.png"
            alt="Logo RachidiDev"
            width={64}
            height={64}
            loading="eager"
            className="rounded-lg object-contain"
          />
          <span className="flex flex-col leading-tight">
            <span className="text-base font-bold text-white">
              Rachidi<span className="text-brand">Dev</span>
            </span>
            <span className="text-xs text-muted">Développeur Fullstack</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "border border-brand/30 bg-brand/10 text-brand-light"
                    : "text-white/85 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <ThemeToggle />

        <div className="hidden md:block">
          <Button href="/contact" size="sm">
            Me contacter
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            className="rounded-full p-2 text-white hover:bg-white/10"
            onClick={() => setMenuOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <IconMenu2 size={24} />
          </button>
        </div>
      </Container>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
