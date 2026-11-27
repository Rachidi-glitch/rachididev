import "server-only";
import { blogPosts } from "@/data/blog";
import { prisma } from "@/lib/prisma";

export type ArticleStatus = "draft" | "published" | "deleted";

export type BlogArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: Date | null;
  readingTime: number;
  coverImage: string;
  coverAlt: string;
  introduction: string;
  body: string;
  status: ArticleStatus;
  updatedAt: Date;
};

function sectionsToMarkdown(
  sections: (typeof blogPosts)[number]["sections"]
) {
  return sections
    .map((section) => {
      const paragraphs = section.paragraphs.join("\n\n");
      const bullets = section.bullets?.map((bullet) => `- ${bullet}`).join("\n");
      return [`## ${section.heading}`, paragraphs, bullets]
        .filter(Boolean)
        .join("\n\n");
    })
    .join("\n\n");
}

function getLegacyArticles(): BlogArticle[] {
  return blogPosts.map((post) => ({
    id: `legacy:${post.slug}`,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    publishedAt: new Date(`${post.publishedAt}T12:00:00Z`),
    readingTime: post.readingTime,
    coverImage: post.coverImage,
    coverAlt: post.coverAlt,
    introduction: post.introduction,
    body: sectionsToMarkdown(post.sections),
    status: "published",
    updatedAt: new Date(`${post.publishedAt}T12:00:00Z`),
  }));
}

async function getStoredArticles() {
  const rows = await prisma.blogPost.findMany({
    orderBy: { updatedAt: "desc" },
  });
  return rows.map((row) => ({
    ...row,
    status: row.status as ArticleStatus,
  }));
}

export async function getAdminArticles() {
  const stored = await getStoredArticles();
  const storedSlugs = new Set(stored.map((article) => article.slug));
  const legacy = getLegacyArticles().filter(
    (article) => !storedSlugs.has(article.slug)
  );

  return [...stored.filter((article) => article.status !== "deleted"), ...legacy]
    .sort((left, right) => {
      const leftDate = left.publishedAt?.getTime() ?? left.updatedAt.getTime();
      const rightDate = right.publishedAt?.getTime() ?? right.updatedAt.getTime();
      return rightDate - leftDate;
    });
}

export async function getPublishedArticles() {
  const stored = await getStoredArticles();
  const storedSlugs = new Set(stored.map((article) => article.slug));
  const publishedStored = stored.filter(
    (article) => article.status === "published"
  );
  const legacy = getLegacyArticles().filter(
    (article) =>
      article.status === "published" && !storedSlugs.has(article.slug)
  );

  return [...publishedStored, ...legacy].sort((left, right) => {
    const leftDate = left.publishedAt?.getTime() ?? 0;
    const rightDate = right.publishedAt?.getTime() ?? 0;
    return rightDate - leftDate;
  });
}

export async function getPublishedArticle(slug: string) {
  const stored = await prisma.blogPost.findUnique({ where: { slug } });
  if (stored) {
    return stored.status === "published"
      ? { ...stored, status: stored.status as ArticleStatus }
      : null;
  }

  return getLegacyArticles().find((article) => article.slug === slug) ?? null;
}
