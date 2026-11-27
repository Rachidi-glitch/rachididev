import Link from "next/link";
import { redirect } from "next/navigation";
import {
  IconArrowUpRight,
  IconFileText,
  IconPencil,
  IconPlus,
} from "@tabler/icons-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { ArticleRowActions } from "@/components/admin/ArticleRowActions";
import { getAdminSession } from "@/lib/admin-auth";
import { getAdminArticles } from "@/lib/blog-store";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Articles | Studio RachidiDev",
  robots: { index: false, follow: false },
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default async function AdminArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  if (!(await getAdminSession())) {
    redirect("/admin/login");
  }

  const [articles, query] = await Promise.all([
    getAdminArticles(),
    searchParams,
  ]);
  const publishedCount = articles.filter(
    (article) => article.status === "published"
  ).length;
  const draftCount = articles.filter((article) => article.status === "draft").length;

  return (
    <AdminShell>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-brand-light">Votre contenu</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
            Articles
          </h1>
          <p className="mt-2 text-sm text-muted">
            Gérez vos publications et vos brouillons.
          </p>
        </div>
        <Link
          href="/admin/articles/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-light"
        >
          <IconPlus size={18} /> Créer un article
        </Link>
      </div>

      {query.saved === "1" && (
        <p
          role="status"
          className="mt-6 rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200"
        >
          Modifications enregistrées.
        </p>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-dark-card/50 p-5">
          <p className="text-sm text-muted">Total des articles</p>
          <p className="mt-2 text-3xl font-bold text-white">{articles.length}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-dark-card/50 p-5">
          <p className="text-sm text-muted">En ligne</p>
          <p className="mt-2 text-3xl font-bold text-emerald-300">
            {publishedCount}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-dark-card/50 p-5">
          <p className="text-sm text-muted">Brouillons</p>
          <p className="mt-2 text-3xl font-bold text-amber-200">{draftCount}</p>
        </div>
      </div>

      <section className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-dark-card/40">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <IconFileText className="text-brand-light" size={20} />
            <h2 className="font-semibold text-white">Toutes les publications</h2>
          </div>
          <span className="text-xs text-muted">{articles.length} article(s)</span>
        </div>

        {articles.length > 0 ? (
          <div className="divide-y divide-white/10">
            {articles.map((article) => (
              <article
                key={article.id}
                className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:px-6"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="truncate font-semibold text-white">
                      {article.title}
                    </h3>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        article.status === "published"
                          ? "bg-emerald-400/10 text-emerald-300"
                          : "bg-amber-400/10 text-amber-200"
                      }`}
                    >
                      {article.status === "published" ? "Publié" : "Brouillon"}
                    </span>
                    {article.id.startsWith("legacy:") && (
                      <span className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-muted">
                        Article existant
                      </span>
                    )}
                  </div>
                  <p className="mt-1 truncate text-sm text-muted">
                    {article.excerpt}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted">
                    <span>{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>
                      {article.publishedAt
                        ? `Publié le ${formatDate(article.publishedAt)}`
                        : `Modifié le ${formatDate(article.updatedAt)}`}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readingTime} min</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  {article.status === "published" && (
                    <Link
                      href={`/blog/${article.slug}`}
                      target="_blank"
                      aria-label={`Voir ${article.title}`}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-muted transition hover:border-brand/40 hover:text-brand-light"
                    >
                      <IconArrowUpRight size={18} />
                    </Link>
                  )}
                  <Link
                    href={`/admin/articles/${encodeURIComponent(article.id)}`}
                    aria-label={`Modifier ${article.title}`}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-muted transition hover:border-brand/40 hover:text-brand-light"
                  >
                    <IconPencil size={18} />
                  </Link>
                  <ArticleRowActions id={article.id} title={article.title} />
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="px-6 py-16 text-center">
            <p className="font-medium text-white">Aucun article pour le moment.</p>
            <p className="mt-2 text-sm text-muted">
              Créez votre premier article pour commencer.
            </p>
          </div>
        )}
      </section>
    </AdminShell>
  );
}
