# AI Agents First — Global Design System

## Product Concept

AI Agents First (aiagentsfirst.com) is a free, genuinely useful AI education and news resource run by a single operator. The site publishes practical tutorials, tool breakdowns, money-making strategies, and AI news that stand on their own. The content is the product. A paid community exists behind the site, but it is never the headline. The voice is first-person, plain, generous, and direct, like a real person teaching a friend.

## Target User

People who want to use AI to make money or create things. Beginner to intermediate. Tired of guru hype. They want real, practical help with proof. They value credibility over flash.

## Color Palette

| Token | Hex | Role |
|-------|-----|------|
| `--canvas` | `#FDFCF8` | Primary background — warm near-white, never pure `#FFFFFF` |
| `--text-primary` | `#1A1A1A` | Headings, body text, primary copy |
| `--text-secondary` | `#5A5A5A` | Captions, meta, dates, reading time, secondary labels |
| `--text-muted` | `#8A8A8A` | Placeholders, disabled states, footer legal text |
| `--accent` | `#2563EB` | Links, CTAs, active nav state, category badges, focus rings, hover underlines |
| `--accent-hover` | `#1D4ED8` | Hover state for accent elements |
| `--accent-light` | `#EFF6FF` | Subtle accent backgrounds — callouts, prompt blocks, selected states |
| `--border` | `#E5E5E5` | Dividers, card borders, subtle separations |
| `--border-light` | `#F0EFEA` | Section background alternates, hover card backgrounds |
| `--surface` | `#FFFFFF` | Card backgrounds, popovers, modals (still warm via canvas contrast) |
| `--code-bg` | `#F8F9FA` | Inline code background, code block backgrounds |
| `--code-text` | `#1A1A1A` | Code text color |
| `--success` | `#16A34A` | Positive indicators (rare) |
| `--warning` | `#D97706` | Warning callouts (rare) |

### Color Usage Rules
- Canvas is always `#FDFCF8`. Never use pure white `#FFFFFF` as the page background.
- Accent blue (`#2563EB`) is used ONLY for links, active nav, category badges, and focus rings. No decorative gradients. No other accent colors.
- Body text is always `#1A1A1A`. Never use pure black `#000000`.
- Borders are always `#E5E5E5` or lighter. Never use dark dividers.

## Typography

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Display | `DM Serif Display` | 400 | H1, H2, page titles, hero statements, section headers |
| Body | `Inter` | 400, 500 | Body text, paragraphs, nav links, buttons, card titles |
| Mono | `JetBrains Mono` | 400, 500 | Tags, dates, reading times, code blocks, inline code, category badges |

### Font Loading
Load from Google Fonts in `layout.tsx`:
```
DM Serif Display: weight 400
Inter: weights 400, 500
JetBrains Mono: weights 400, 500
```

### Type Scale

| Token | Size | Line Height | Letter Spacing | Weight | Font |
|-------|------|-------------|----------------|--------|------|
| `hero` | `clamp(2.5rem, 5vw, 3.5rem)` | 1.15 | -0.02em | 400 | Display |
| `h1` | `clamp(2rem, 4vw, 2.75rem)` | 1.2 | -0.02em | 400 | Display |
| `h2` | `clamp(1.5rem, 3vw, 2rem)` | 1.25 | -0.01em | 400 | Display |
| `h3` | `1.25rem` (20px) | 1.35 | -0.01em | 500 | Body |
| `h4` | `1.125rem` (18px) | 1.4 | 0 | 500 | Body |
| `body` | `1rem` (16px) | 1.7 | 0 | 400 | Body |
| `body-sm` | `0.875rem` (14px) | 1.6 | 0 | 400 | Body |
| `caption` | `0.75rem` (12px) | 1.5 | 0.02em | 400 | Mono |
| `code` | `0.875rem` (14px) | 1.6 | 0 | 400 | Mono |

### Typography Rules
- Display font is reserved for headings and hero statements only. Never use it for body copy or UI labels.
- Body font is used for all UI text, paragraphs, card titles, and nav.
- Mono font is used for all metadata: dates, reading times, tags, category badges, code blocks, and inline code.
- Headings use tight negative letter-spacing. Body text uses normal letter-spacing.
- Never use font-weight 700 or bold. The heaviest weight is 500. The display font at 400 carries enough presence.

## Layout Rules

### Container
- Max width: `1200px` — centered with `margin: 0 auto`.
- Horizontal padding: `clamp(1rem, 4vw, 2rem)` on all breakpoints.

### Grid
- 12-column grid with `gap: 1.5rem` (24px) on desktop, `gap: 1rem` on mobile.
- Article cards: 3 columns on desktop (`≥1024px`), 2 columns on tablet (`768px–1023px`), 1 column on mobile (`<768px`).
- Featured article: spans full width on mobile, 2/3 on desktop.
- Category cards: 4 columns on desktop, 2 columns on tablet, 1 column on mobile.

### Section Rhythm
- Section vertical padding: `clamp(4rem, 8vw, 6rem)` top and bottom.
- Between sections: a single `1px` border (`--border`) or no divider at all. Never both.
- Content max width inside sections: `1200px`.
- Hero section has `padding-top: 8rem` to clear fixed navbar.

### Breakpoints
| Name | Width | Tailwind Prefix |
|------|-------|-----------------|
| Mobile | default | None (base) |
| Tablet | `768px` | `md:` |
| Desktop | `1024px` | `lg:` |
| Wide | `1280px` | `xl:` |

### Mobile Behavior
- Navbar collapses to a hamburger menu at `<768px`.
- Article grid drops to 1 column.
- Featured article image stacks above text on mobile.
- Code blocks become horizontally scrollable (no wrapping).
- Font sizes scale down via `clamp()`; no explicit mobile overrides needed for type.

## Shared Components

### Navbar
- Fixed top, `height: 64px`, background `rgba(253, 252, 248, 0.95)` with `backdrop-blur: 8px`.
- Bottom border: `1px solid --border`.
- Left: wordmark "AI Agents First" in Display font, `1.25rem`.
- Center: nav links — Home, Tools, Make Money, Create, News, About — in Body font, `0.875rem`, weight 500.
- Right: "Community" link (accent color, underline on hover) plus a subtle external-link icon.
- On mobile: hamburger icon (Lucide `Menu`), opens a full-height overlay with nav links stacked vertically.
- Active link: accent color (`--accent`) with no underline. Inactive links: `--text-primary` with underline on hover.
- Focus: `2px solid --accent` outline, `offset: 2px`.

### Footer
- Background: `--canvas`.
- Padding: `4rem` top, `2rem` bottom.
- Three columns on desktop: [About snippet + wordmark] [Links grouped by category] [Social + RSS + legal].
- Single column stacked on mobile.
- Wordmark: "AI Agents First" in Display font.
- About snippet: one sentence, Body font, `--text-secondary`.
- Links: Body font, `0.875rem`, `--text-secondary`, hover to `--text-primary` with underline.
- Social: Twitter/X, YouTube, RSS icons (Lucide).
- Legal: copyright, privacy, terms. `--text-muted`, `0.75rem`.
- Bottom border: `1px solid --border` on top of footer. No top border if the preceding section already has a bottom border.
- Community link in footer: plain text link, not a button.

### ArticleCard
- Background: `--surface` (`#FFFFFF`).
- Border: `1px solid --border`.
- Border radius: `12px`.
- Image: `aspect-ratio: 16/9`, object-fit cover, border-radius `12px 12px 0 0`.
- Content padding: `1.25rem`.
- Category badge: Mono font, `0.75rem`, accent color, background `accent-light`, padding `0.25rem 0.5rem`, border-radius `4px`.
- Title: Body font, `1.125rem`, weight 500, `--text-primary`, line-height 1.3.
- Excerpt: Body font, `0.875rem`, `--text-secondary`, 2-line clamp (`line-clamp: 2`), line-height 1.6.
- Meta row: date + reading time, Mono font, `0.75rem`, `--text-muted`.
- Hover: translateY `-4px`, `box-shadow: 0 8px 24px rgba(0,0,0,0.06)`, border-color `--accent-light`. Transition: `all 0.2s ease-out`.
- Focus: `2px solid --accent` outline, `offset: 2px`, border-radius `12px`.
- Entire card is a link (`<a>` wrapper). No nested buttons.

### CategoryBadge
- Used in ArticleCard, article header, and category listing.
- Mono font, `0.75rem`, weight 500.
- Text color: `--accent`. Background: `--accent-light`.
- Padding: `0.25rem 0.625rem`. Border-radius: `4px`.
- Hover: background darkens slightly to `#DBEAFE`. Transition: `background 0.15s ease`.

### SectionHeader
- Optional eyebrow: Mono font, `0.75rem`, `--accent`, uppercase, `letter-spacing: 0.05em`.
- Title: Display font, `h2` size, `--text-primary`.
- Optional subtitle: Body font, `body` size, `--text-secondary`, max-width `600px`.
- Spacing: `0.75rem` between eyebrow and title, `1rem` between title and subtitle.
- Centered alignment for homepage sections. Left-aligned for category pages.

### CodeBlock
- Background: `--code-bg` (`#F8F9FA`).
- Border: `1px solid --border`. Border-radius: `8px`.
- Padding: `1.25rem`.
- Font: Mono, `0.875rem`, `--code-text`.
- Line-height: `1.6`.
- Overflow: `auto` (horizontal scroll on mobile).
- Language label (optional): top-left corner, Mono font, `0.75rem`, `--text-muted`, background `--surface`, border-radius `4px`, padding `0.125rem 0.375rem`.
- Copy button (optional): top-right corner, Lucide `Copy` icon, `--text-muted`, hover `--text-primary`. Transition: `0.15s`.

### PromptBlock
- A special callout for AI prompts.
- Background: `--accent-light` (`#EFF6FF`).
- Border: `1px solid --accent`, left border: `4px solid --accent`.
- Border-radius: `8px`.
- Padding: `1.25rem`.
- Font: Mono, `0.875rem`, `--text-primary`.
- Line-height: `1.6`.
- Optional label: "Prompt" in Mono font, `0.75rem`, `--accent`, weight 500, above the block.
- Copy button: same as CodeBlock.

### Figure (Image + Caption)
- Image: full-width, border-radius `8px`, `box-shadow: 0 2px 8px rgba(0,0,0,0.04)`.
- Caption: below image, `padding-top: 0.75rem`, Body font, `0.875rem`, `--text-secondary`, centered or left-aligned (match image context).
- Optional label: "Figure 1" in Mono font, `0.75rem`, `--text-muted`, before the caption text.

### Screenshot
- A specialized Figure for UI screenshots.
- Image: `box-shadow: 0 4px 16px rgba(0,0,0,0.08)` to lift it off the page.
- Border: `1px solid --border`.
- Optional annotation overlay: numbered circles (12px, white background, `--accent` border, `--accent` text, Mono font) connected to subtle callout lines.
- Caption: same as Figure.

### Diagram
- A conceptual diagram (flowchart, decision tree, etc.).
- Rendered as an SVG or an image.
- Background: `--surface` or `--accent-light` depending on complexity.
- Border: `1px solid --border`. Border-radius: `12px`.
- Padding: `1.5rem`.
- Caption: same as Figure.

### SoftCommunityInvite
- A low-key, honest community mention. Used at the end of articles and on the homepage.
- Background: `--border-light` (`#F0EFEA`).
- Border: `1px solid --border`.
- Border-radius: `12px`.
- Padding: `1.5rem`.
- Content: a sentence or two in Body font, `1rem`, `--text-primary`. No heading. No button. Just text with a plain link to the community.
- Link: Body font, `--accent`, underline on hover. No arrow icon unless it feels natural.
- Example copy: "If you want help implementing this, there is a free community where people share what they are building. You are welcome to join."
- Never uses a button, badge, or highlighted background. It is a quiet paragraph in a slightly different box.

## Interaction Language

### Hover
- Links: underline appears with `transition: text-decoration 0.15s ease`. Color shifts to `--accent` from `--text-primary`.
- Cards: translateY `-4px`, shadow increases, border-color lightens. `transition: all 0.2s ease-out`.
- Buttons (if any): background darkens to `--accent-hover`. `transition: background 0.15s ease`.
- Images: subtle scale to `1.02` with `transition: transform 0.3s ease`.

### Active
- Links: color `--accent-hover`, no underline change.
- Cards: translateY `0`, shadow returns to default.
- Buttons: `scale(0.98)`.

### Focus
- All interactive elements: `outline: 2px solid --accent`, `outline-offset: 2px`. No `box-shadow` focus ring.
- Nav links: accent color text + underline.
- Skip-to-content link: first focusable element, visually hidden until focused, appears at top-left of viewport with `--accent` background and white text.

### Transitions
- Default easing: `cubic-bezier(0.4, 0, 0.2, 1)` (Tailwind default ease-out).
- Fast transitions: `150ms` (color, border).
- Medium transitions: `200ms` (transform, opacity).
- Slow transitions: `300ms` (shadow, image scale).

### Scroll Behavior
- `scroll-behavior: smooth` on `html`.
- Navbar becomes slightly more opaque after scrolling 50px (background transitions from `0.95` to `1` opacity). No other scroll effect.
- No scroll-triggered animations that hide content until scrolled into view. Content is always visible. Animations add polish, not gate access.

### Keyboard
- All cards are focusable via `<a>` wrapper.
- Tab order follows DOM order.
- Dropdown/mobile menu: `Escape` closes, `Tab` cycles items, focus trap while open.
- Code blocks: `Tab` key inside a code block does not trap focus (allow focus to pass through).

### Reduced Motion
- If `prefers-reduced-motion: reduce`:
  - All entrance animations disabled.
  - Hover transitions reduced to `0ms` (instant state change).
  - Image hover scale disabled.
  - Scroll-based opacity changes disabled.
  - Content remains fully accessible and visually identical.

## Animation Details

### Entrance Animations (Homepage)
- Hero text: `opacity: 0 → 1`, `translateY: 16px → 0`, duration `600ms`, easing `cubic-bezier(0.4, 0, 0.2, 1)`, delay `100ms`.
- Hero subtitle: same as hero text, delay `200ms`.
- Featured article image: `opacity: 0 → 1`, `translateY: 24px → 0`, duration `700ms`, delay `300ms`.
- Featured article text: same as image, delay `400ms`.
- Content grid cards: staggered `opacity: 0 → 1`, `translateY: 20px → 0`, duration `500ms`, stagger `80ms` between cards, triggered when section enters viewport (IntersectionObserver, `threshold: 0.1`).

### Entrance Animations (Article Page)
- Cover image: `opacity: 0 → 1`, `scale: 1.02 → 1`, duration `700ms`, delay `0ms`.
- Title: `opacity: 0 → 1`, `translateY: 16px → 0`, duration `600ms`, delay `150ms`.
- Meta row: `opacity: 0 → 1`, delay `250ms`.
- Body content: `opacity: 0 → 1`, `translateY: 12px → 0`, duration `500ms`, delay `350ms`.

### Hover Animations
- ArticleCard: `translateY: 0 → -4px`, `box-shadow: 0 2px 8px rgba(0,0,0,0.04) → 0 8px 24px rgba(0,0,0,0.06)`, duration `200ms`, easing `ease-out`.
- ArticleCard image: `scale: 1 → 1.02`, duration `300ms`, easing `ease-out`.
- Nav links: `border-bottom: 0 → 2px` (or `text-decoration` underline), duration `150ms`.

### Scroll Animations
- Navbar opacity shift: after `scrollY > 50`, background transitions from `rgba(253,252,248,0.95)` to `rgba(253,252,248,1)`. Duration: `200ms`.
- Section fade-in (optional): content sections below the fold can fade in on scroll using IntersectionObserver with `threshold: 0.1`. `opacity: 0 → 1`, `translateY: 20px → 0`, duration `500ms`. NOT mandatory — page works without it.

## Dependencies

```
next: ^15.0.0
react: ^19.0.0
react-dom: ^19.0.0
typescript: ^5.0.0
tailwindcss: ^4.0.0
@tailwindcss/postcss: ^4.0.0
framer-motion: ^11.0.0
lucide-react: ^0.400.0
```

### Fonts (Google Fonts via `next/font`)
- `DM Serif Display` — weight 400
- `Inter` — weights 400, 500
- `JetBrains Mono` — weights 400, 500

## Asset Manifest

| Filename | Type | Page/Section | Dimensions | Prompt / Sourcing |
|----------|------|-------------|------------|-------------------|
| `og-default.png` | Image | All pages (OpenGraph) | 1200x630 | Site brand card with "AI Agents First" wordmark and tagline |
| `favicon.svg` | SVG | All pages | 32x32 | Minimal abstract icon — a stylized "A" or agent node, single color |
| `hero-featured.png` | Image | Homepage, Hero | 1200x675 (16:9) | "A clean, modern workspace showing AI tools on a laptop screen. Warm natural lighting, minimal desk, plants. Editorial photography style." |
| `article-ai-tools.png` | Image | Homepage, Article grid | 800x450 (16:9) | "Screenshot-style illustration of a popular AI tool interface, clean and minimal" |
| `article-make-money.png` | Image | Homepage, Article grid | 800x450 (16:9) | "A person working on a laptop at a cafe, with subtle digital overlay elements suggesting automation. Warm, editorial." |
| `article-create.png` | Image | Homepage, Article grid | 800x450 (16:9) | "AI-generated artwork on a canvas next to a laptop, creative studio vibe. Warm lighting." |
| `article-news.png` | Image | Homepage, Article grid | 800x450 (16:9) | "A modern newsroom or desk with a laptop showing a headline, clean and minimal" |
| `about-portrait.png` | Image | About page | 600x600 (1:1) | "Friendly professional portrait of a person in a casual home office setting, warm lighting, genuine smile" |
| `diagram-workflow.svg` | SVG | Article template | Vector | A simple flowchart diagram showing an AI agent workflow: input → process → output |
| `screenshot-chatgpt.png` | Image | Article template | 1200x800 | "Clean screenshot of a ChatGPT conversation interface with a useful prompt and response, minimal UI, no personal data" |

### Fallback Behavior
- If any cover image fails to load, show a fallback div with background `--accent-light` and the article title in Display font centered. No broken image icon.
- If a portrait fails on the About page, show the same fallback with the site name.
- SVG diagrams fallback to a simple HTML/CSS flowchart using flexbox and borders.

## Page List

| Route | Purpose | Suggested Owner |
|-------|---------|-----------------|
| `/` | Homepage — content feed, featured article, categories, soft community invite | Main implementer |
| `/articles/[slug]` | Article template — full article with rich body, community invite, related articles | Main implementer |
| `/tools` | AI Tools category — all articles tagged "AI Tools" | Main implementer |
| `/make-money` | Make Money With AI category — all articles tagged "Make Money" | Main implementer |
| `/create` | Create With AI category — all articles tagged "Create" | Main implementer |
| `/news` | AI News category — all articles tagged "AI News" | Main implementer |
| `/about` | About page — first-person bio, site story, soft community mention | Main implementer |

## SEO / Meta Strategy

### Default Meta
- Title template: `{pageTitle} — AI Agents First`
- Default title: `AI Agents First — Practical AI tutorials, tools, and news`
- Description: `Free, practical AI tutorials, tool breakdowns, and news for people who want to make money or create things with AI. No hype. Just what works.`
- Keywords: `AI tutorials, AI tools, make money with AI, AI news, AI agents, practical AI`
- Canonical: `https://aiagentsfirst.com{pathname}`

### OpenGraph / Twitter
- `og:type`: `website` (default), `article` (article pages)
- `og:image`: `/og-default.png` (default) or article-specific cover image
- `og:site_name`: `AI Agents First`
- `twitter:card`: `summary_large_image`
- `twitter:creator`: `@aiagentsfirst` (placeholder)

### Article Pages (JSON-LD)
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Article Title",
  "description": "Article excerpt",
  "author": {
    "@type": "Person",
    "name": "Author Name"
  },
  "datePublished": "2024-01-15",
  "dateModified": "2024-01-15",
  "publisher": {
    "@type": "Organization",
    "name": "AI Agents First",
    "logo": {
      "@type": "ImageObject",
      "url": "https://aiagentsfirst.com/og-default.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://aiagentsfirst.com/articles/slug"
  }
}
```

### FAQ JSON-LD (if article has FAQ section)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Question text",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Answer text"
      }
    }
  ]
}
```

### Robots / Indexing
- All pages: `index, follow`
- Sitemap: `/sitemap.xml` (generated)
- RSS: `/feed.xml`
- No `noindex` on any public page.

### Performance
- Images: Next.js `<Image>` with `priority` on hero/featured, `loading="lazy"` on all others.
- Cover images: `sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"`.
- Fonts: `display: swap` via `next/font`.
- Preconnect to Google Fonts and image CDN domains.

## Accessibility

- Semantic HTML: `<main>`, `<article>`, `<header>`, `<nav>`, `<footer>`, `<section>`, `<time>`, `<figure>`, `<figcaption>`.
- All images have descriptive `alt` text. Decorative images have `alt=""`.
- Color contrast: `--text-primary` on `--canvas` is `~16:1`. `--accent` on `--canvas` is `~7:1`. All pass WCAG AA.
- Focus indicators: `2px solid --accent` on all interactive elements.
- Skip link: visible on focus, jumps to `<main>`.
- Screen reader: article cards read as "Link, Article Title, Category, Date" via `aria-label`.
- Code blocks: `tabindex="0"` so keyboard users can scroll horizontally.
- No auto-playing media. No animations that cannot be paused.

## Voice and Tone Checklist (for all content workers)

- [ ] First person: "I", "my", "me" — not "we", "our", "the team"
- [ ] Contractions: "it's", "don't", "can't", "you're" — not "it is", "do not", "cannot", "you are"
- [ ] Plain and direct: no jargon, no buzzwords, no "leverage", "synergize", "optimize"
- [ ] Generous: share the full method, not a teaser
- [ ] No corporate speak: no "solutions", "platforms", "ecosystems" unless referring to an actual product name
- [ ] No guru hype: no "unlock your potential", "transform your life", "10x your results"
- [ ] No hard sell: community is mentioned softly, never pushed
- [ ] No em dashes: use commas, periods, or parentheses instead
- [ ] No emoji: Lucide icons only
- [ ] Like a real person teaching a friend: warm, honest, slightly informal
