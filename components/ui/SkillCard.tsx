import { DynamicIcon } from "@/components/ui/DynamicIcon";
import type { Skill } from "@/data/skills";

export function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className="group rounded-xl border border-white/10 bg-dark-card/50 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-brand/50 hover:shadow-card">
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand/10 text-brand-light">
        <DynamicIcon name={skill.icon} size={22} />
      </div>
      <p className="mt-4 text-sm font-semibold text-white">{skill.name}</p>
      <p className="mt-1 text-xs text-muted">{skill.category}</p>
      <span className="mt-3 inline-block rounded-full border border-white/10 px-2.5 py-1 text-[11px] font-medium text-brand-light">
        {skill.level}
      </span>
    </div>
  );
}
