import type { Metadata } from "next";
import { Fraunces, Newsreader, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { GpuTierProvider } from "@/components/ui/GpuTierProvider";
import { ScrollProvider } from "@/components/ui/ScrollProvider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
});
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal", "italic"],
});
const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-plex",
  display: "swap",
  weight: ["400", "500", "600"],
});
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://aiagentsfirst.com").trim();
const gaId = (process.env.NEXT_PUBLIC_GA_ID || "G-0Y001SRLK3").trim();

export const metadata: Metadata = {
  title: { default: `${SITE_NAME} · ${SITE_TAGLINE}`, template: `%s · ${SITE_NAME}` },
  description:
    "Learn to actually use AI to make money and make things, without the hype. Plain-language guides for people who want a real result.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: `${SITE_NAME} · ${SITE_TAGLINE}`,
    description:
      "Learn to actually use AI to make money and make things, without the hype.",
    images: [{ url: `${siteUrl}/og?title=${encodeURIComponent(SITE_NAME)}`, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    images: [{ url: `${siteUrl}/og?title=${encodeURIComponent(SITE_NAME)}`, alt: SITE_NAME }],
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
      name: SITE_NAME,
      description: SITE_TAGLINE,
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: SITE_NAME,
      url: siteUrl,
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${newsreader.variable} ${plex.variable} ${jetbrains.variable}`}
    >
      <head>
        <link rel="alternate" type="application/rss+xml" title={SITE_NAME} href="/feed.xml" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="bg-paper font-sans antialiased text-ink">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-md focus:bg-accent focus:text-paper focus:text-sm focus:font-semibold"
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
        <SpeedInsights />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
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
