import Link from "next/link";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ForgotPasswordForm } from "@/components/admin/ForgotPasswordForm";
import { getAdminSession } from "@/lib/admin-auth";

export const metadata = {
  title: "Mot de passe oublié | RachidiDev",
  robots: { index: false, follow: false },
};

export default async function ForgotPasswordPage() {
  if (await getAdminSession()) {
    redirect("/admin/articles");
  }

  return (
    <main className="flex min-h-[calc(100vh-5rem)] items-center bg-hero-gradient py-12">
      <Container className="max-w-md">
        <div className="rounded-3xl border border-white/10 bg-dark-card/70 p-7 shadow-card backdrop-blur sm:p-9">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-light">
            RachidiDev · Studio
          </p>
          <h1 className="mt-4 text-3xl font-bold text-white">
            Mot de passe oublié ?
          </h1>
          <p className="mb-7 mt-3 text-sm leading-relaxed text-muted">
            Saisissez l’adresse e-mail de votre compte. Si elle est associée à
            l’espace administrateur, vous recevrez un lien sécurisé pour choisir
            un nouveau mot de passe.
          </p>
          <ForgotPasswordForm />
          <p className="mt-6 text-center text-xs leading-relaxed text-muted">
            <Link href="/" className="transition hover:text-white">
              Retour au site
            </Link>
          </p>
        </div>
      </Container>
    </main>
  );
}
