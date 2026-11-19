"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { IconExternalLink } from "@tabler/icons-react";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-dark-card"
    >
      <div className="relative aspect-16/10 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-brand px-3 py-1 text-xs font-medium text-white">
          {project.category}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-base font-semibold text-white">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-white/80"
            >
              {tech}
            </span>
          ))}
        </div>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-light hover:text-brand"
          >
            Voir le projet <IconExternalLink size={14} />
          </a>
        )}
      </div>
    </motion.div>
  );
}
