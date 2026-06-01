import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppShell } from "@/components/layout/app-shell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://python-automation-center.vercel.app"),
  title: {
    default: "Python Automation Center | Matheus Siqueira",
    template: "%s | Python Automation Center",
  },
  description:
    "Central interativa de automacoes corporativas com Python, BI, tratamento de dados, logs operacionais, relatorios e dashboard de eficiencia.",
  applicationName: "Python Automation Center",
  authors: [{ name: "Matheus Siqueira", url: "https://www.matheussiqueira.dev" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Python Automation Center | Matheus Siqueira",
    description:
      "Operational Intelligence Platform para simular automacoes Python, tratamento de dados, relatorios e ganho operacional.",
    url: "/",
    siteName: "Python Automation Center",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Python Automation Center | Matheus Siqueira",
    description:
      "Central interativa de automacoes corporativas com Python, BI, logs operacionais e dashboard de eficiencia.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
