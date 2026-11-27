export type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readingTime: number;
  coverImage: string;
  coverAlt: string;
  introduction: string;
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "wordpress-ou-developpement-sur-mesure",
    title: "WordPress ou développement sur mesure : comment choisir ?",
    excerpt:
      "Le bon choix dépend de vos objectifs, de votre autonomie et des fonctionnalités dont votre activité a réellement besoin.",
    category: "Conseils web",
    publishedAt: "2026-11-26",
    readingTime: 5,
    coverImage: "/images/blog/blog-cover-placeholder.svg",
    coverAlt: "Illustration sur le choix d'une solution web",
    introduction:
      "WordPress et le développement sur mesure peuvent tous deux donner naissance à un excellent site. La meilleure solution n’est pas forcément la plus complexe : c’est celle qui répond à vos besoins aujourd’hui tout en laissant une marge d’évolution pour demain.",
    sections: [
      {
        heading: "Quand WordPress est-il un bon choix ?",
        paragraphs: [
          "WordPress convient très bien aux sites vitrines, blogs et boutiques en ligne qui reposent sur des besoins courants. Son interface d’administration permet de modifier des pages et de publier du contenu sans devoir intervenir dans le code.",
          "C’est souvent une option pertinente lorsque vous souhaitez gérer vous-même les contenus et vous appuyer sur un écosystème de thèmes et d’extensions éprouvés.",
        ],
        bullets: [
          "Vous voulez mettre à jour vos pages régulièrement.",
          "Les fonctionnalités recherchées sont couvertes par WordPress ou WooCommerce.",
          "Vous souhaitez une solution connue, administrable et extensible.",
        ],
      },
      {
        heading: "Quand envisager une application sur mesure ?",
        paragraphs: [
          "Une application spécifique peut être préférable lorsque votre projet repose sur des parcours utilisateurs particuliers, des règles métier complexes ou des intégrations qui ne s’adaptent pas facilement à un CMS.",
          "Cette liberté demande en contrepartie de définir précisément les fonctionnalités, le budget et la maintenance attendue. Le sur-mesure doit résoudre un besoin concret, pas seulement rendre le projet plus technique.",
        ],
      },
      {
        heading: "Une décision à prendre à partir de vos priorités",
        paragraphs: [
          "Avant de choisir, listez les objectifs du site, les personnes qui le mettront à jour, les fonctionnalités indispensables et celles qui pourront attendre. Comparez ensuite le coût initial avec le temps de gestion et d’évolution.",
          "Un échange autour de ces éléments permet de recommander une solution cohérente, sans complexité inutile et adaptée à la croissance de votre activité.",
        ],
      },
    ],
  },
  {
    slug: "preparer-la-creation-de-son-site-vitrine",
    title: "Comment bien préparer la création de son site vitrine",
    excerpt:
      "Quelques décisions prises avant le développement aident à créer un site plus clair, utile à vos visiteurs et aligné sur votre activité.",
    category: "Création de site",
    publishedAt: "2026-11-26",
    readingTime: 4,
    coverImage: "/images/blog/blog-cover-placeholder.svg",
    coverAlt: "Illustration représentant la préparation d'un site vitrine",
    introduction:
      "Un site vitrine efficace commence bien avant sa mise en ligne. En clarifiant vos objectifs et les informations à présenter, vous facilitez la conception et aidez vos visiteurs à comprendre rapidement ce que vous proposez.",
    sections: [
      {
        heading: "Définir l’objectif principal",
        paragraphs: [
          "Demandez-vous quelle action vous souhaitez que le visiteur réalise : demander un devis, appeler votre entreprise, prendre rendez-vous ou découvrir vos services. Un objectif prioritaire aide à organiser les pages et les appels à l’action.",
        ],
      },
      {
        heading: "Rassembler les contenus essentiels",
        paragraphs: [
          "Préparez une présentation de votre activité, vos services, vos coordonnées et les réponses aux questions courantes. Des textes clairs et des photos de bonne qualité sont plus utiles qu’une grande quantité de contenu générique.",
        ],
        bullets: [
          "Une courte présentation de votre entreprise et de votre public.",
          "La liste de vos services et leurs bénéfices.",
          "Des exemples de réalisations ou des témoignages, si vous en avez.",
          "Vos coordonnées et la manière dont vous souhaitez être contacté.",
        ],
      },
      {
        heading: "Prévoir la suite",
        paragraphs: [
          "Pensez aux mises à jour, à l’hébergement, au nom de domaine et à la personne qui maintiendra le site. Il est également utile de définir les fonctionnalités indispensables au lancement et celles qui pourront être ajoutées plus tard.",
          "Avec ces éléments, le projet démarre sur une base solide et le site peut évoluer avec votre activité.",
        ],
      },
    ],
  },
];
