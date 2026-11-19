"use client";

import { cn } from "@/lib/utils";
import type { ProjectCategory } from "@/data/projects";

const categories: (ProjectCategory | "Tous")[] = [
  "Tous",
  "Site vitrine",
  "WordPress",
  "Next.js / React",
  "E-commerce",
  "Applications web",
  "Autres",
];

export function ProjectFilter({
  active,
  onChange,
}: {
  active: ProjectCategory | "Tous";
  onChange: (category: ProjectCategory | "Tous") => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={cn(
            "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
            active === category
              ? "border-brand bg-brand text-white"
              : "border-white/10 text-white/75 hover:border-brand/50 hover:text-white"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
