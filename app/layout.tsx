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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aiagentsfirst.com";

export const metadata: Metadata = {
  title: { default: "AI Agents First", template: "%s | AI Agents First" },
  description: "The intelligence hub for the agent era. News, build guides, tools, and deep analysis from the AI agent frontier.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    siteName: "AI Agents First",
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "AI Agents First",
    description: "News, tutorials, tools, and deep analysis from the AI agent frontier.",
  },
  twitter: { card: "summary_large_image", site: "@aiagentsfirst" },
  alternates: { canonical: siteUrl },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "AI Agents First",
      description: "The intelligence hub for the agent era.",
      publisher: { "@id": `${siteUrl}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${siteUrl}/search?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "AI Agents First",
      url: siteUrl,
      sameAs: [
        "https://x.com/aiagentsfirst",
        "https://linkedin.com/company/aiagentsfirst",
        "https://youtube.com/@aiagentsfirst",
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
