"use client";

import { ErrorPage } from "@/components/errors/ErrorPage";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr">
      <body className="bg-dark font-sans text-white antialiased">
        <ErrorPage
          code="500"
          title="Une erreur est survenue"
          message="Le site rencontre un problème temporaire. Vous pouvez réessayer ou revenir à l’accueil."
          onRetry={reset}
        />
      </body>
    </html>
  );
}
