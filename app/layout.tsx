import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "Sheik Mahaboob Subhani | AI & Full Stack Developer",
  description: "RAG pipelines, agentic workflows and full-stack products.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body><Providers>{children}</Providers></body>
    </html>
  );
}
