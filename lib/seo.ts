import type { Metadata } from "next";

const socialImage = {
  url: "/images/profile/hero-photo.png",
  alt: "RachidiDev, développeur web à Cotonou",
};

export function createPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = `${title} | RachidiDev`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      url: path,
      siteName: "RachidiDev",
      title: fullTitle,
      description,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [socialImage.url],
    },
  };
}
