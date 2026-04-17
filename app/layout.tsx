import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { GpuTierProvider } from "@/components/ui/GpuTierProvider";
import { ScrollProvider } from "@/components/ui/ScrollProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  title: { default: "AI Agents First", template: "%s | AI Agents First" },
  description: "The intelligence hub for the agent era. News, build guides, tools, and community.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://aiagentsfirst.com"),
  openGraph: { siteName: "AI Agents First", type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="bg-surface font-sans antialiased text-text-primary">
        <GpuTierProvider>
          <ScrollProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </ScrollProvider>
        </GpuTierProvider>
        <Script
          src="https://aiagentsfirst.com/public/ghost-portal.min.js"
          data-ghost="https://aiagentsfirst.com"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
