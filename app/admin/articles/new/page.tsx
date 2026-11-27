import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ArticleEditor } from "@/components/admin/ArticleEditor";
import { getAdminSession } from "@/lib/admin-auth";

export const metadata = {
  title: "Nouvel article | Studio RachidiDev",
  robots: { index: false, follow: false },
};

export default async function NewArticlePage() {
  if (!(await getAdminSession())) {
    redirect("/admin/login");
  }

  return (
    <AdminShell>
      <div className="mb-8">
        <p className="text-sm font-medium text-brand-light">Éditeur</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
          Créer un article
        </h1>
        <p className="mt-2 text-sm text-muted">
          Rédigez, enregistrez en brouillon ou publiez sur le blog.
        </p>
      </div>
      <ArticleEditor />
    </AdminShell>
  );
}
