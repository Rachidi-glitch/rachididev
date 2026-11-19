export type SkillLevel = "Expertise" | "Avancé" | "Intermédiaire";

export interface Skill {
  name: string;
  category: string;
  level: SkillLevel;
  icon: string;
}

export const skills: Skill[] = [
  { name: "WordPress", category: "CMS", level: "Expertise", icon: "IconBrandWordpress" },
  { name: "Next.js", category: "Framework", level: "Avancé", icon: "IconBrandNextjs" },
  { name: "React.js", category: "Frontend", level: "Avancé", icon: "IconBrandReact" },
  { name: "Tailwind CSS", category: "CSS Framework", level: "Avancé", icon: "IconBrandTailwind" },
  { name: "HTML", category: "Markup", level: "Expertise", icon: "IconBrandHtml5" },
  { name: "CSS", category: "Style", level: "Expertise", icon: "IconBrandCss3" },
  { name: "JavaScript", category: "Langage", level: "Avancé", icon: "IconBrandJavascript" },
  { name: "TypeScript", category: "Langage", level: "Intermédiaire", icon: "IconBrandTypescript" },
  { name: "Python", category: "Scripting", level: "Intermédiaire", icon: "IconBrandPython" },
  { name: "PHP", category: "Backend", level: "Avancé", icon: "IconBrandPhp" },
  { name: "Node.js", category: "Runtime", level: "Intermédiaire", icon: "IconBrandNodejs" },
  { name: "Prisma", category: "ORM", level: "Intermédiaire", icon: "IconDatabase" },
  { name: "Supabase", category: "BaaS", level: "Intermédiaire", icon: "IconBolt" },
  { name: "API", category: "Intégrations", level: "Avancé", icon: "IconApi" },
  { name: "Git / GitHub", category: "Versioning", level: "Avancé", icon: "IconBrandGithub" },
  { name: "PostgreSQL", category: "Base de données", level: "Intermédiaire", icon: "IconDatabase" },
  { name: "Docker", category: "Conteneurisation", level: "Intermédiaire", icon: "IconBrandDocker" },
];
