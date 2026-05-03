import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { GpuTierProvider } from "@/components/ui/GpuTierProvider";
import { ScrollProvider } from "@/components/ui/ScrollProvider";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://aiagentsfirst.com").trim();
const gaId = (process.env.NEXT_PUBLIC_GA_ID || "G-0Y001SRLK3").trim();

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
    images: [{
      url: `${siteUrl}/og?title=AI+Agents+First`,
      width: 1200,
      height: 630,
      alt: "AI Agents First -- The intelligence hub for the agent era",
    }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@aiagentsfirst",
    images: [{
      url: `${siteUrl}/og?title=AI+Agents+First`,
      alt: "AI Agents First -- The intelligence hub for the agent era",
    }],
  },
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
        <link rel="alternate" type="application/rss+xml" title="AI Agents First" href="/feed.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-surface font-sans antialiased text-text-primary">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-md focus:bg-accent focus:text-surface focus:text-sm focus:font-semibold"
        >
          Skip to content
        </a>
        <GpuTierProvider>
          <ScrollProvider>
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
          </ScrollProvider>
        </GpuTierProvider>
        <Analytics />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `}
        </Script>
      </body>
    </html>
  );
}
