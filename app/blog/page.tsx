import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { getPublishedArticles } from "@/lib/blog-store";
import { createPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Blog web",
  description:
    "Conseils pratiques de RachidiDev, développeur web fullstack & WordPress : création de sites, WordPress et solutions web.",
  path: "/blog",
});

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export default async function BlogPage() {
  const blogPosts = await getPublishedArticles();

  return (
    <>
      <section className="bg-hero-gradient py-16 sm:py-20">
        <Container>
          <Badge>Le blog</Badge>
          <h1 className="mt-6 max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Des idées claires pour vos projets web.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
            Conseils, repères et bonnes pratiques autour de WordPress, de la
            création de sites et du développement web.
          </p>
        </Container>
      </section>

      <section className="bg-dark py-12 sm:py-16">
        <Container>
          {blogPosts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <article
                  key={post.slug}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-dark-card/50 transition-colors hover:border-brand/40"
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block focus-visible:outline-none"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={post.coverImage}
                        alt={post.coverAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
                        <span className="text-brand-light">{post.category}</span>
                        <span aria-hidden="true">·</span>
                        {post.publishedAt && (
                          <time dateTime={post.publishedAt.toISOString()}>
                            {formatDate(post.publishedAt)}
                          </time>
                        )}
                        <span aria-hidden="true">·</span>
                        <span>{post.readingTime} min de lecture</span>
                      </div>
                      <h2 className="mt-4 text-xl font-semibold text-white transition-colors group-hover:text-brand-light">
                        {post.title}
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-muted">
                        {post.excerpt}
                      </p>
                      <span className="mt-5 inline-flex text-sm font-medium text-brand-light">
                        Lire l’article <span className="ml-2" aria-hidden="true">→</span>
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-white/10 bg-dark-card/50 p-8 text-center text-muted">
              Les premiers articles arrivent bientôt.
            </p>
          )}
        </Container>
      </section>
    </>
  );
}
