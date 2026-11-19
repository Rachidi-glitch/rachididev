import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-dark-card/60 p-6 backdrop-blur-sm transition-colors duration-200 hover:border-brand/40",
        className
      )}
    >
      {children}
    </div>
  );
}
