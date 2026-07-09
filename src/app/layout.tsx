import type { Metadata } from "next";
import { DM_Serif_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SkipLink } from "@/components/SkipLink";

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aiagentsfirst.com"),
  title: {
    template: "%s — AI Agents First",
    default: "AI Agents First — Practical AI tutorials, tools, and news",
  },
  description:
    "Free, practical AI tutorials, tool breakdowns, and news for people who want to make money or create things with AI. No hype. Just what works.",
  keywords: [
    "AI tutorials",
    "AI tools",
    "make money with AI",
    "AI news",
    "AI agents",
    "practical AI",
  ],
  openGraph: {
    type: "website",
    siteName: "AI Agents First",
    images: ["/og-default.png"],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@aiagentsfirst",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://aiagentsfirst.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSerifDisplay.variable} ${inter.variable} ${jetbrainsMono.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-[100dvh] flex flex-col bg-[var(--canvas)] text-[var(--text-primary)] font-body">
        <SkipLink />
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
