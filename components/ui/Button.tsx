import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonBaseProps = {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
};

const variants: Record<string, string> = {
  primary:
    "bg-brand hover:bg-brand-light text-white shadow-glow focus-visible:ring-brand",
  secondary:
    "bg-transparent border border-white/20 text-white hover:border-brand/60 hover:bg-white/5",
  ghost: "bg-transparent text-white hover:bg-white/5",
};

const sizes: Record<string, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-sm",
  lg: "px-6 py-3.5 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-dark active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none";

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  download,
  type,
  onClick,
  disabled,
  ariaLabel,
}: ButtonBaseProps & {
  href?: string;
  download?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
}) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    if (download) {
      return (
        <a
          href={href}
          download
          className={classes}
          aria-label={ariaLabel}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={classes}
        aria-label={ariaLabel}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type ?? "button"}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={classes}
    >
      {children}
    </button>
  );
}
