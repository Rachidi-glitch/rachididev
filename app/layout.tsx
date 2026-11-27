import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { socials } from "@/data/socials";
import "./globals.css";

const siteUrl = "https://rachididev.site";
const socialImage = {
  url: "/images/profile/hero-photo.png",
  alt: "RachidiDev, développeur web fullstack & WordPress",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "RachidiDev",
  title: {
    default: "RachidiDev — Développeur web fullstack & WordPress",
    template: "%s | RachidiDev",
  },
  description:
    "RachidiDev, développeur web fullstack & WordPress à Cotonou, crée des sites vitrines, boutiques WooCommerce et applications web sur mesure avec Next.js et React.",
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
    title: "RachidiDev — Développeur web fullstack & WordPress",
    description:
      "RachidiDev, développeur web fullstack & WordPress à Cotonou. Sites vitrines, boutiques en ligne et applications web sur mesure.",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "RachidiDev — Développeur web fullstack & WordPress",
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
  jobTitle: "Développeur web fullstack & WordPress",
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
    "RachidiDev, développeur web fullstack & WordPress, crée des sites vitrines, applications web et solutions e-commerce sur mesure.",
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
    <html
      lang="fr"
      data-scroll-behavior="smooth"
      data-theme="dark"
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col font-sans">
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function () {
            try {
              var savedTheme = localStorage.getItem("rachididev-theme");
              if (savedTheme === "light" || savedTheme === "dark") {
                document.documentElement.dataset.theme = savedTheme;
              }
            } catch {
              document.documentElement.dataset.theme = "dark";
            }
          })();`}
        </Script>
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
