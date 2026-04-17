import { NextResponse } from "next/server";

const content = `# AI Agents First

> The intelligence hub for the agent era.

## About
AI Agents First is a publication covering AI agents, autonomous systems, and the tools powering the next wave of software. We publish news, tutorials, deep analysis, and curated daily intelligence.

## Content Categories
- /news - Real-time drops from the AI agent frontier
- /learn - Zero to deployed build guides and tutorials
- /deep-dives - Architecture breakdowns and strategic analysis
- /tools - Frameworks, stacks, and tested resources
- /signal - Daily curated intelligence brief
- /network - Community questions, answers, and builder network

## API
- Content API: Ghost CMS (headless)
- Sitemap: /sitemap.xml
- RSS: /rss (via Ghost)

## Contact
- Website: https://aiagentsfirst.com
- X/Twitter: https://x.com/aiagentsfirst
- LinkedIn: https://linkedin.com/company/aiagentsfirst
`;

export async function GET() {
  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
