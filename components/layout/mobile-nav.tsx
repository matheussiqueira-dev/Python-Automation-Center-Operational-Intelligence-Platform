"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, FileText, Home, Info, Workflow } from "lucide-react";
import { cn } from "@/lib/formatters";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/automations", label: "Autos", icon: Workflow },
  { href: "/dashboard", label: "BI", icon: BarChart3 },
  { href: "/reports", label: "Docs", icon: FileText },
  { href: "/about", label: "Sobre", icon: Info },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-3 bottom-3 z-50 rounded-lg border border-white/12 bg-zinc-950/92 p-1.5 shadow-2xl backdrop-blur lg:hidden" aria-label="Navegacao mobile">
      <div className="grid grid-cols-5 gap-1">
        {navItems.map((item) => {
          const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-h-12 flex-col items-center justify-center gap-1 rounded-md text-[11px] font-medium text-zinc-500",
                active && "bg-white/10 text-emerald-200",
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
