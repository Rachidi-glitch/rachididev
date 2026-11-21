import type { Metadata } from "next";
import { ErrorPage } from "@/components/errors/ErrorPage";

export const metadata: Metadata = {
  title: { absolute: "Page introuvable | RachidiDev" },
  description:
    "Cette page n’existe pas ou a été déplacée. Retrouvez les projets et services de RachidiDev.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <ErrorPage
      code="404"
      title="Oups, cette page est introuvable"
      message="La page recherchée a peut-être été déplacée ou n’existe plus. La mascotte peut vous aider à retrouver votre chemin."
    />
  );
}
