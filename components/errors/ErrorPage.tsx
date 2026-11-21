"use client";

import Link from "next/link";
import { ErrorMascot } from "@/components/errors/ErrorMascot";

export function ErrorPage({
  code,
  title,
  message,
  onRetry,
}: {
  code: string;
  title: string;
  message: string;
  onRetry?: () => void;
}) {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-hero-gradient px-6 py-16 text-center">
      <div className="w-full max-w-xl">
        <ErrorMascot />
        <p className="mt-5 text-sm font-semibold tracking-[0.3em] text-brand-light">
          ERREUR {code}
        </p>
        <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted">
          {message}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              Réessayer
            </button>
          )}
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-brand/60 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            Retour à l’accueil
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium text-brand-light transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            Contacter RachidiDev
          </Link>
        </div>
      </div>
    </section>
  );
}
