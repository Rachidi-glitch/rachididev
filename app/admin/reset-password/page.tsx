import { Container } from "@/components/ui/Container";
import { ResetPasswordForm } from "@/components/admin/ResetPasswordForm";

export const metadata = {
  title: "Nouveau mot de passe | RachidiDev",
  robots: { index: false, follow: false },
};

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; error?: string }>;
}) {
  const query = await searchParams;

  return (
    <main className="flex min-h-[calc(100vh-5rem)] items-center bg-hero-gradient py-12">
      <Container className="max-w-md">
        <div className="rounded-3xl border border-white/10 bg-dark-card/70 p-7 shadow-card backdrop-blur sm:p-9">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-light">
            RachidiDev · Studio
          </p>
          <h1 className="mt-4 text-3xl font-bold text-white">
            Choisir un nouveau mot de passe
          </h1>
          <p className="mb-7 mt-3 text-sm leading-relaxed text-muted">
            Choisissez un mot de passe d’au moins 12 caractères. Après sa
            modification, les autres sessions seront déconnectées.
          </p>
          <ResetPasswordForm
            token={query.token ?? ""}
            invalidToken={query.error === "INVALID_TOKEN"}
          />
        </div>
      </Container>
    </main>
  );
}
