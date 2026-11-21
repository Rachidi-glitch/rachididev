"use client";

import { ErrorPage } from "@/components/errors/ErrorPage";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorPage
      code="500"
      title="Une erreur est survenue"
      message="La page n’a pas pu être affichée correctement. Vous pouvez réessayer ou revenir à l’accueil."
      onRetry={reset}
    />
  );
}
