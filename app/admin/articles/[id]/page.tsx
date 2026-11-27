import { notFound, redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ArticleEditor } from "@/components/admin/ArticleEditor";
import { getAdminSession } from "@/lib/admin-auth";
import { getAdminArticles } from "@/lib/blog-store";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Modifier un article | Studio RachidiDev",
  robots: { index: false, follow: false },
};

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await getAdminSession())) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const article = (await getAdminArticles()).find(
    (item) => item.id === decodeURIComponent(id)
  );

  if (!article) notFound();

  return (
    <AdminShell>
      <div className="mb-8">
        <p className="text-sm font-medium text-brand-light">Éditeur</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
          Modifier l’article
        </h1>
        <p className="mt-2 truncate text-sm text-muted">{article.title}</p>
      </div>
      <ArticleEditor article={article} />
    </AdminShell>
  );
}
