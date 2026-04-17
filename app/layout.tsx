import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AI Agents First -- The Living AI Intelligence Hub",
    template: "%s | AI Agents First",
  },
  description:
    "Real-time AI agent intelligence, tutorials, build guides, and curated resources. The internet became conscious.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://aiagentsfirst.com"
  ),
  openGraph: {
    siteName: "AI Agents First",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="bg-void font-sans antialiased">{children}</body>
    </html>
  );
}
