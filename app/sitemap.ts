import type { MetadataRoute } from "next";

const siteUrl = "https://rachididev.site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/a-propos", "/services", "/projets", "/competences", "/contact"];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
