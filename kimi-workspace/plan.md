# Plan: AI Agents First — Modern AI Education + News Website

## User Goal
Build a completely new Next.js 15 website from scratch for aiagentsfirst.com. Not based on the old site. Value-first AI education + news hub with soft community integration.

## Non-Goals
- Do NOT replicate the old site
- Do NOT make it a landing page or ad
- Do NOT hammer the community CTA
- Do NOT use guru hype or hard sell

## Stack
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4
- shadcn/ui
- Lucide React icons
- Framer Motion
- MDX for articles (next-mdx-remote or similar)
- next/image for all imagery

## Pages / Routes
1. `/` — Homepage (hero, featured article, content feed, categories, soft community strip, footer)
2. `/articles/[slug]` — Article template (cover, body, rich media, soft CTA, JSON-LD schema)
3. `/tools` — AI Tools category page
4. `/make-money` — Make Money With AI category page
5. `/create` — Create With AI category page
6. `/news` — AI News category page
7. `/about` — About page (first person, real)

## Shared Components
- Navbar (logo, nav links, one "Community" link, mobile menu)
- Footer (links, community link, copyright)
- ArticleCard (visual card with cover image, title, excerpt, date, category)
- CategoryBadge
- SectionHeader
- CodeBlock / PromptBlock (for article body)
- Figure / Screenshot / Diagram components
- SoftCommunityInvite (reusable strip for end of articles + homepage)
- JSON-LD schema helpers

## Design System Requirements
- Near-white canvas, near-black text
- One confident accent color for links
- Display font + readable body font + mono for tags/dates/code
- Lucide icons, no emoji
- Light tasteful motion, respect reduced-motion
- Mobile-first

## SEO Requirements
- Meta tags per page
- Article JSON-LD schema
- FAQ JSON-LD schema
- Sitemap
- Semantic HTML
- Strong Core Web Vitals
- Keyboard focus management

## Stages

### Stage 1 — Design (plan agent)
Load: webapp-design reference
Agent: Designer (plan)
Output: design/design.md, design/home.md, design/article.md, design/about.md, design/category.md
- Global design system (colors, typography, spacing, animation)
- Page-by-page section layouts with real copy
- Component catalog
- Asset manifest (placeholder images for demo content)
- Responsive rules
- Animation details

### Stage 2 — Scaffold (main agent locally)
- Initialize Next.js 15 project with shadcn/ui
- Install dependencies (framer-motion, next-mdx-remote, lucide-react, etc.)
- Set up Tailwind v4 + global CSS variables
- Set up fonts (display, body, mono)
- Set up shared layout (Navbar, Footer)
- Create directory structure
- Set up MDX configuration
- Create baseline SEO helpers (metadata, JSON-LD)
- Commit baseline

### Stage 3 — Parallel Page Implementation (coder agents in worktrees)
Create worktrees after baseline commit. Workers:
- **Worker_Home**: Homepage (all sections from design/home.md)
- **Worker_Article**: Article template + MDX rendering pipeline
- **Worker_Categories**: Category pages + About page
- **Worker_Content**: Demo MDX articles (3-4 sample posts with rich content)

### Stage 4 — Integration & Polish (main agent)
- Merge all worktrees
- Wire up routes
- Verify all pages render
- Build check
- Accessibility check
- Final commit

### Stage 5 — Delivery
- Summarize what was built
- List all files created
- Note any remaining work
