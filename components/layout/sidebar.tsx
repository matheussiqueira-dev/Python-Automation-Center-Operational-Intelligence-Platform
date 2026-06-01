"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, FileText, Home, Info, Workflow } from "lucide-react";
import { cn } from "@/lib/formatters";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/automations", label: "Automacoes", icon: Workflow },
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/reports", label: "Relatorios", icon: FileText },
  { href: "/about", label: "Sobre", icon: Info },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-72 shrink-0 border-r border-white/10 bg-zinc-950/88 px-4 py-5 lg:sticky lg:top-0 lg:block">
      <Link href="/" className="flex items-center gap-3 rounded-md px-2 py-2 focus-visible:outline focus-visible:outline-2">
        <span className="grid h-10 w-10 place-items-center rounded-md bg-emerald-300 text-sm font-black text-zinc-950">Py</span>
        <span>
          <span className="block text-sm font-semibold text-white">Python Automation</span>
          <span className="block text-xs text-zinc-400">Operational Intelligence</span>
        </span>
      </Link>

      <nav className="mt-8 space-y-1" aria-label="Navegacao principal">
        {navItems.map((item) => {
          const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-zinc-400 transition hover:bg-white/8 hover:text-white",
                active && "bg-white/10 text-white",
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-10 rounded-lg border border-white/10 bg-white/[0.055] p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Creditos</p>
        <p className="mt-3 text-sm text-zinc-200">Desenvolvido por Matheus Siqueira</p>
        <a
          href="https://www.matheussiqueira.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 block text-sm font-semibold text-emerald-200 hover:text-emerald-100"
        >
          www.matheussiqueira.dev
        </a>
      </div>
    </aside>
  );
}
