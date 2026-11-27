import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { getAdminSession } from "@/lib/admin-auth";

export const metadata = {
  title: "Connexion administrateur | RachidiDev",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await getAdminSession()) {
    redirect("/admin/articles");
  }

  return (
    <main className="flex min-h-[calc(100vh-5rem)] items-center bg-hero-gradient py-12">
      <Container className="max-w-md">
        <div className="rounded-3xl border border-white/10 bg-dark-card/70 p-7 shadow-card backdrop-blur sm:p-9">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-light">
              RachidiDev · Studio
            </p>
            <h1 className="mt-4 text-3xl font-bold text-white">
              Espace éditorial
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Connectez-vous pour créer, modifier et publier vos articles.
            </p>
          </div>
          <AdminLoginForm />
          <p className="mt-6 text-center text-xs leading-relaxed text-muted">
            Accès privé réservé à l’administrateur du site.
          </p>
        </div>
      </Container>
    </main>
  );
}
