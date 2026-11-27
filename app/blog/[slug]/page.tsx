import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { BlogMarkdown } from "@/lib/blog-markdown";
import { getPublishedArticle } from "@/lib/blog-store";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedArticle(slug);

  if (!post) {
    return { title: "Article introuvable" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      locale: "fr_FR",
      url: `/blog/${post.slug}`,
      siteName: "RachidiDev",
      title: post.title,
      description: post.excerpt,
      ...(post.publishedAt
        ? { publishedTime: post.publishedAt.toISOString() }
        : {}),
      images: [{ url: post.coverImage, alt: post.coverAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPublishedArticle(slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      <header className="bg-hero-gradient py-12 sm:py-16">
        <Container className="max-w-4xl">
          <Link
            href="/blog"
            className="text-sm font-medium text-brand-light transition-colors hover:text-brand"
          >
            ← Tous les articles
          </Link>
          <p className="mt-8 text-sm font-medium text-brand-light">
            {post.category}
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted">
            {post.excerpt}
          </p>
          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted">
            {post.publishedAt && (
              <time dateTime={post.publishedAt.toISOString()}>
                Publié le {formatDate(post.publishedAt)}
              </time>
            )}
            <span>{post.readingTime} min de lecture</span>
          </div>
        </Container>
      </header>

      <Container className="max-w-4xl py-10 sm:py-14">
        <div className="relative mb-10 aspect-video overflow-hidden rounded-2xl border border-white/10">
          <Image
            src={post.coverImage}
            alt={post.coverAlt}
            fill
            priority
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
          />
        </div>

        <div className="max-w-3xl">
          <p className="text-lg leading-relaxed text-muted">
            {post.introduction}
          </p>
          <div className="mt-10">
            <BlogMarkdown content={post.body} />
          </div>

          <aside className="mt-14 rounded-2xl border border-white/10 bg-dark-card/50 p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-white">
              Vous avez un projet web ?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Parlons de vos besoins et trouvons une solution adaptée à vos
              objectifs.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex rounded-full bg-brand px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-light"
            >
              Me contacter
            </Link>
          </aside>
        </div>
      </Container>
    </article>
  );
}
