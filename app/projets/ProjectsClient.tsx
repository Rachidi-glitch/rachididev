"use client";

import { useMemo, useState } from "react";
import { ProjectFilter } from "@/components/projects/ProjectFilter";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects, type ProjectCategory } from "@/data/projects";

export function ProjectsClient() {
  const [active, setActive] = useState<ProjectCategory | "Tous">("Tous");

  const filtered = useMemo(() => {
    if (active === "Tous") return projects;
    return projects.filter((project) => project.category === active);
  }, [active]);

  return (
    <div>
      <ProjectFilter active={active} onChange={setActive} />

      {filtered.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <div key={project.slug}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-10 text-sm text-muted">
          Aucun projet dans cette catégorie pour le moment.
        </p>
      )}
    </div>
  );
}
