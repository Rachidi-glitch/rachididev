import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { socials } from "@/data/socials";
import "./globals.css";

const siteUrl = "https://rachididev.site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "RachidiDev",
  title: {
    default: "RachidiDev — Développeur Fullstack WordPress & Web moderne",
    template: "%s | RachidiDev",
  },
  description:
    "RachidiDev, développeur Fullstack spécialisé WordPress depuis plus de 7 ans et développement web moderne (Next.js, React, TypeScript). Sites vitrines, e-commerce et applications web sur mesure.",
  keywords: [
    "développeur web",
    "développeur fullstack",
    "WordPress",
    "Next.js",
    "React",
    "freelance",
    "développeur freelance Bénin",
  ],
  authors: [{ name: "RachidiDev" }],
  creator: "RachidiDev",
  category: "technology",
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: "/images/icone.ico",
    shortcut: "/images/icone.ico",
  },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "RachidiDev",
    title: "RachidiDev — Développeur Fullstack WordPress & Web moderne",
    description:
      "Développeur Fullstack spécialisé WordPress et développement web moderne. Sites vitrines, e-commerce et applications web sur mesure.",
    images: [
      {
        url: "/images/profile/hero-photo.jpg",
        width: 1200,
        height: 630,
        alt: "RachidiDev, développeur Fullstack",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RachidiDev — Développeur Fullstack",
    description:
      "Développeur Fullstack spécialisé WordPress et développement web moderne.",
    images: ["/images/profile/hero-photo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "RachidiDev",
  jobTitle: "Développeur Fullstack",
  url: siteUrl,
  sameAs: [socials.linkedin],
  knowsAbout: [
    "WordPress",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "PHP",
    "Node.js",
  ],
};

const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "RachidiDev",
  description:
    "Développement de sites WordPress, sites vitrines, applications web et solutions e-commerce sur mesure.",
  url: siteUrl,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "RachidiDev",
  url: siteUrl,
  inLanguage: "fr-FR",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" data-scroll-behavior="smooth">
      <body className="flex min-h-screen flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(professionalServiceJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
