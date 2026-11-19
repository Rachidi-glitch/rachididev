export type ProjectCategory =
  | "Site vitrine"
  | "WordPress"
  | "Next.js / React"
  | "E-commerce"
  | "Applications web"
  | "Autres";

export interface Project {
  slug: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: ProjectCategory;
  url?: string;
}

export const projects: Project[] = [
  {
    slug: "the-organic-crave",
    title: "The Organic Crave",
    description:
      "Site vitrine pour présenter une marque de snacks bio, avec une expérience visuelle colorée et une mise en avant des produits.",
    image: "/images/projects/crave.jpg",
    technologies: ["HTML", "CSS", "JavaScript"],
    category: "Site vitrine",
    url: "https://positive-energy-plum.vercel.app/",
  },
  {
    slug: "site-vitrine-entreprise",
    title: "Dream Football Club",
    description:
      "Site vitrine moderne et responsive pour présenter le Dream Football Club.",
    image: "/images/projects/placeholder-1.jpg",
    technologies: ["WordPress", "PHP", "MySQL"],
    category: "WordPress",
    url: "https://youtube.com/shorts/lLB35vUqZME?feature=shared",
  },
  {
    slug: "boutique-en-ligne",
    title: "Benipharma",
    description:
      "Boutique en ligne Benipharma développée avec WordPress et WooCommerce.",
    image: "/images/projects/placeholder-2.jpg",
    technologies: ["WordPress", "WooCommerce"],
    category: "E-commerce",
    url: "https://benipharma.com",
  },
  {
    slug: "application-dashboard",
    title: "NanaBooster",
    description:
      "Plateforme web de services SMM avec tableau de bord, commandes et suivi.",
    image: "/images/projects/placeholder-3.jpg",
    technologies: ["Next.js", "Tailwind CSS", "Prisma"],
    category: "Applications web",
    url: "https://nana-booster.vercel.app/",
  },
];
