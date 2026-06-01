import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/formatters";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  external?: boolean;
  icon?: ReactNode;
  variant?: ButtonVariant;
}

const variants: Record<ButtonVariant, string> = {
  primary: "bg-emerald-300 text-zinc-950 hover:bg-emerald-200",
  secondary: "border border-white/12 bg-white/8 text-white hover:bg-white/12",
  ghost: "text-zinc-300 hover:bg-white/10 hover:text-white",
  danger: "bg-rose-400 text-zinc-950 hover:bg-rose-300",
};

export function Button({
  href,
  external,
  icon,
  variant = "primary",
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex h-11 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 disabled:cursor-not-allowed disabled:opacity-55",
    variants[variant],
    className,
  );

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {icon}
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes}>
        {icon}
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {icon}
      {children}
    </button>
  );
}
