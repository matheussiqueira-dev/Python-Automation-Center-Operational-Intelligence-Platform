import type { MetadataRoute } from "next";
import { getAutomations } from "@/lib/mock-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://python-automation-center.vercel.app";
  const staticRoutes = ["", "/automations", "/dashboard", "/executions", "/reports", "/architecture", "/case-study", "/about"];
  const automationRoutes = getAutomations().map((automation) => `/automations/${automation.slug}`);

  return [...staticRoutes, ...automationRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date("2026-06-01"),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
