import type { MetadataRoute } from "next";
import { getPublishedArticles } from "@/lib/blog-store";

const siteUrl = "https://rachididev.site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    "",
    "/a-propos",
    "/services",
    "/projets",
    "/blog",
    "/competences",
    "/contact",
  ];

  const staticRoutes = routes.map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.7,
  }));
  const posts = await getPublishedArticles();
  const articles = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...articles];
}
