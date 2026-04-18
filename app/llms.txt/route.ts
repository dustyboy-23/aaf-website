import { NextResponse } from "next/server";
import { getPosts } from "@/lib/content";

export async function GET() {
  const { posts } = await getPosts({ limit: 1000 });

  const articleLines = posts
    .map((p) => `- [${p.title}](https://aiagentsfirst.com/${p.slug})`)
    .join("\n");

  const content = `# AI Agents First

> The intelligence hub for the agent era.

## About
AI Agents First is a publication covering AI agents, autonomous systems, and the tools powering the next wave of software. We publish news, tutorials, deep analysis, and curated daily intelligence.

## Content Categories
- /news - All articles, newest first
- /tag/tutorials - Step-by-step build guides
- /tag/comparisons - Tool and model comparisons
- /tag/money - Revenue, pricing, and monetization
- /tag/opinion - Analysis and strategic takes
- /tag/news - Frontier dispatches and drops
- /playbook - Free "Build Your First AI Agent" PDF

## Articles
${articleLines}

## Feeds
- Sitemap: /sitemap.xml
- RSS: /feed.xml

## Contact
- Website: https://aiagentsfirst.com
- Community: https://www.skool.com/e-com-freedom-amazon-tiktok-4556
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
