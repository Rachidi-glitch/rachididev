import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { socials } from "@/data/socials";
import "./globals.css";

const siteUrl = "https://rachididev.site";
const socialImage = {
  url: "/images/profile/hero-photo.png",
  alt: "RachidiDev, développeur web à Cotonou",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "RachidiDev",
  title: {
    default: "RachidiDev — Développeur web à Cotonou",
    template: "%s | RachidiDev",
  },
  description:
    "Développeur web freelance à Cotonou, spécialisé en WordPress, Next.js et React. Création de sites vitrines, boutiques WooCommerce et applications web sur mesure.",
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
    title: "RachidiDev — Développeur web à Cotonou",
    description:
      "Développeur web freelance à Cotonou. Sites WordPress, vitrines, boutiques en ligne et applications web.",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "RachidiDev — Développeur web à Cotonou",
    description: "Sites WordPress, sites vitrines et applications web sur mesure.",
    images: [socialImage.url],
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
  email: "contact@rachididev.site",
  telephone: "+2290141786631",
  sameAs: [socials.github, socials.linkedin, socials.tiktok],
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
  email: "contact@rachididev.site",
  telephone: "+2290141786631",
  areaServed: {
    "@type": "Country",
    name: "Bénin",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cotonou",
    addressCountry: "BJ",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "RachidiDev",
  url: siteUrl,
  inLanguage: "fr-FR",
  publisher: {
    "@type": "Person",
    name: "RachidiDev",
    url: siteUrl,
  },
};

function serializeJsonLd(value: object) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

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
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(professionalServiceJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(websiteJsonLd) }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
