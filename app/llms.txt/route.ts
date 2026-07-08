import { NextResponse } from "next/server";
import { getAllArticles } from "@/lib/hub";
import { SITE_NAME, SITE_TAGLINE, CORE_PROMISE, PILLARS } from "@/lib/site";

export async function GET() {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://aiagentsfirst.com").trim();

  const articleLines = getAllArticles()
    .map((a) => `- [${a.title}](${siteUrl}/articles/${a.slug})`)
    .join("\n");

  const pillarLines = PILLARS.map(
    (p) => `- /articles/topic/${p.slug} - ${p.label}: ${p.tagline}`,
  ).join("\n");

  const content = `# ${SITE_NAME}

> ${SITE_TAGLINE}. ${CORE_PROMISE}

## About
${SITE_NAME} is a plain-language library for using AI to make money and make things, written for curious beginners rather than engineers. No hype, no jargon, real results.

## Topics
${pillarLines}

## Articles
${articleLines}

## Pages
- /articles - The full library
- /start-here - New here? Start with this path
- /community - A free community for learning alongside others
- /about - Why this exists

## Feeds
- Sitemap: /sitemap.xml
- RSS: /feed.xml
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
