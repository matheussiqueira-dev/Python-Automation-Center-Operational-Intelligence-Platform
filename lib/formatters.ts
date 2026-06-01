import { format } from "date-fns";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCompactNumber(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatPercent(value: number) {
  return `${Math.round(value)}%`;
}

export function formatHours(value: number) {
  return `${value.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}h`;
}

export function formatDate(value: string) {
  return format(new Date(value), "dd/MM/yyyy");
}

export function impactLabel(value: string) {
  const labels: Record<string, string> = {
    critical: "Critico",
    high: "Alto",
    medium: "Medio",
  };

  return labels[value] ?? value;
}

export function statusLabel(value: string) {
  const labels: Record<string, string> = {
    ready: "Pronto",
    running: "Em execucao",
    success: "Concluido",
    attention: "Atencao",
  };

  return labels[value] ?? value;
}
