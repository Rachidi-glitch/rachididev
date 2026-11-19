import { DynamicIcon } from "@/components/ui/DynamicIcon";
import type { Service } from "@/data/services";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="group h-full rounded-2xl border border-white/10 bg-dark-card/50 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-brand/50 hover:shadow-card">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand-light transition-colors group-hover:bg-brand group-hover:text-white">
        <DynamicIcon name={service.icon} size={24} />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-white">{service.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {service.description}
      </p>
    </div>
  );
}
