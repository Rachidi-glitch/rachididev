import Link from "next/link";
import {
  IconArrowUpRight,
  IconFileText,
  IconLayoutDashboard,
  IconPlus,
} from "@tabler/icons-react";
import { Container } from "@/components/ui/Container";
import { AdminSignOut } from "@/components/admin/AdminSignOut";

export function AdminShell({
  children,
  active = "articles",
}: {
  children: React.ReactNode;
  active?: "articles" | "dashboard";
}) {
  return (
    <main className="min-h-[calc(100vh-5rem)] bg-dark">
      <div className="border-b border-white/10 bg-dark-soft/80">
        <Container className="flex min-h-16 items-center justify-between gap-4">
          <Link href="/admin/articles" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand/15 text-brand-light">
              <IconLayoutDashboard size={19} />
            </span>
            <span>
              <span className="block text-sm font-semibold text-white">
                Studio RachidiDev
              </span>
              <span className="block text-xs text-muted">Administration</span>
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/blog"
              target="_blank"
              className="hidden items-center gap-1.5 rounded-xl px-3 py-2 text-sm text-muted transition hover:bg-white/5 hover:text-white sm:inline-flex"
            >
              Voir le blog <IconArrowUpRight size={16} />
            </Link>
            <AdminSignOut />
          </div>
        </Container>
      </div>

      <Container className="grid gap-8 py-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12 lg:py-12">
        <aside>
          <nav className="flex gap-2 overflow-x-auto lg:flex-col">
            <Link
              href="/admin/articles"
              className={`inline-flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                active === "articles"
                  ? "bg-brand/10 text-brand-light"
                  : "text-muted hover:bg-white/5 hover:text-white"
              }`}
            >
              <IconFileText size={18} /> Articles
            </Link>
            <Link
              href="/admin/articles/new"
              className="inline-flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted transition hover:bg-white/5 hover:text-white"
            >
              <IconPlus size={18} /> Nouvel article
            </Link>
          </nav>
          <div className="mt-8 hidden rounded-2xl border border-white/10 bg-dark-card/50 p-4 lg:block">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Conseil
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/80">
              Enregistrez vos brouillons, puis publiez-les quand votre article
              est prêt.
            </p>
          </div>
        </aside>
        <div className="min-w-0">{children}</div>
      </Container>
    </main>
  );
}
