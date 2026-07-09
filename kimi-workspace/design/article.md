# Article Template Design

## Route: `/articles/[slug]`

## Purpose
The article page is where the value lives. Every article has a cover image, a rich body with images, diagrams, screenshots, callouts, prompt blocks, and code blocks. At the bottom, a soft community invite. No sidebar ads, no floating CTA bars, no newsletter popups. The content is the product.

---

## Section 1: Navbar

- Component: `Navbar` (see `design.md`).
- Home link is no longer active. The active link is the article's category (e.g., "Tools" if the article is in the AI Tools category).
- If the article category does not match a nav link, no nav link is active.

---

## Section 2: Cover Image

### Layout
- Full width. Background: `--canvas`.
- Padding: `8rem` top (clears navbar), `2rem` bottom.
- Image: max-width `1200px`, centered. Aspect ratio `16:9`. Border-radius: `12px`.
- If no cover image is provided, show a fallback: background `--accent-light`, article title centered in Display font, `--accent` color.

### Responsive
- Mobile: image is full-width with side padding `1rem`. Border-radius: `8px`.
- Tablet+: centered with max-width `1200px`.

### Animation
- Image: `opacity: 0 → 1`, `scale: 1.02 → 1`, `700ms`, delay `0ms`.

---

## Section 3: Article Header

### Layout
- Max-width: `720px`, centered. This is the reading column.
- Padding: `2rem` top, `2rem` bottom.
- Below the cover image.

### Copy (Example: "How I Built a $3,000/Month Side Income Using AI Agents and No Code")
- **Category badge** (Mono font, `caption`, `CategoryBadge` component): "Make Money"
- **Title** (Display font, `h1`, `--text-primary`): "How I Built a $3,000/Month Side Income Using AI Agents and No Code"
- **Meta row** (Mono font, `caption`, `--text-muted`): "By [Author Name] · January 12, 2024 · 18 min read"
- **Excerpt / lede** (Body font, `body`, `--text-secondary`, slightly larger at `1.125rem`): "I spent six months trying every AI workflow tool I could find. Most were overhyped. Two actually made me money. Here is the exact setup I use, step by step, with screenshots."

### Responsive
- Mobile: max-width `100%` with `1rem` side padding. Title size reduces via `clamp()`.
- Tablet+: max-width `720px`, centered.

### Animation
- Title: `opacity: 0 → 1`, `translateY: 16px → 0`, `600ms`, delay `150ms`.
- Meta row: `opacity: 0 → 1`, delay `250ms`.
- Excerpt: `opacity: 0 → 1`, `translateY: 12px → 0`, `500ms`, delay `350ms`.

---

## Section 4: Article Body

### Layout
- Max-width: `720px`, centered. This is the reading column.
- Padding: `0` top, `4rem` bottom.
- Side padding: `1rem` on mobile, `0` on desktop (centered column).
- All body elements have `margin-bottom: 1.5rem` (24px) by default. Paragraphs have `margin-bottom: 1.5rem`.

### Typography
- Headings: Display font, `h2` and `h3` sizes. `h2` for major sections, `h3` for subsections.
- Paragraphs: Body font, `body` size, `--text-primary`. Line-height `1.7`.
- Lists: same as paragraphs, with `padding-left: 1.5rem`.
- Links: `--accent`, underline on hover. No bold.
- Strong text: weight 500 (not 700), `--text-primary`.

### Body Components

#### Paragraphs
- Standard `<p>` tags. `margin-bottom: 1.5rem`.
- Example: "The first thing I tried was connecting a Zapier webhook to a GPT-4 prompt. It worked, but it cost me $47 in API calls to make $12. That was not a win."

#### Images (Figure component)
- Full-width within the reading column. Border-radius: `8px`.
- `box-shadow: 0 2px 8px rgba(0,0,0,0.04)`.
- Caption below: Body font, `body-sm`, `--text-secondary`, `padding-top: 0.75rem`.
- Example: an image showing a workflow diagram. Caption: "My final workflow. Zapier handles the trigger, Make.com processes the data, and a Notion database stores the results."

#### Screenshots (Screenshot component)
- Same as Figure but with heavier shadow: `box-shadow: 0 4px 16px rgba(0,0,0,0.08)`.
- Border: `1px solid --border`.
- Example: a screenshot of a Make.com scenario. Caption: "The Make.com scenario that runs my daily report. Notice the filter on the second branch."

#### Diagrams (Diagram component)
- For flowcharts, decision trees, architecture diagrams.
- Rendered as SVG or image. Border: `1px solid --border`. Border-radius: `12px`. Padding: `1.5rem`.
- Background: `--surface` or `--accent-light`.
- Example: a simple SVG flowchart showing: "Form submission → AI agent (GPT-4) → Review output → Send to client".

#### Callouts
- A highlighted block for key takeaways, warnings, or tips.
- Three variants:
  - **Info**: left border `4px solid --accent`, background `--accent-light`, padding `1.25rem`. Text: Body font, `body`, `--text-primary`.
  - **Warning**: left border `4px solid --warning`, background `#FFFBEB`, padding `1.25rem`. Text: Body font, `body`, `--text-primary`.
  - **Success**: left border `4px solid --success`, background `#F0FDF4`, padding `1.25rem`. Text: Body font, `body`, `--text-primary`.
- No icon inside the callout. The border color is enough.
- Example (Info): "This workflow only works if your Notion database has a specific property called 'Status'. If it does not, the scenario will fail silently."

#### Code Blocks (CodeBlock component)
- See `design.md` for full spec.
- Used for terminal commands, JSON snippets, configuration examples.
- Example:
  ```json
  {
    "trigger": "webhook",
    "model": "gpt-4-turbo",
    "temperature": 0.7
  }
  ```

#### Prompt Blocks (PromptBlock component)
- See `design.md` for full spec.
- Used for AI prompts that readers should copy and try.
- Example:
  - Label: "Prompt"
  - Content: "You are a helpful assistant that summarizes long articles into three bullet points. Each bullet should be one sentence. Focus on the main argument, not the examples."

#### Inline Code
- For short code references inside paragraphs.
- Background: `--code-bg`. Border-radius: `4px`. Padding: `0.125rem 0.375rem`.
- Font: Mono, `0.875rem`, `--code-text`.
- Example: "I used `make.com` to connect the two services."

#### Horizontal Rule
- Used sparingly between major sections.
- `border: none`, `border-top: 1px solid --border`, `margin: 2.5rem 0`.

### Responsive
- Reading column stays `720px` max-width on all desktop sizes.
- Mobile: reading column is `100%` width with `1rem` side padding.
- Code blocks and prompt blocks: horizontal scroll on mobile. No text wrapping.
- Images and screenshots: full-width with `8px` border-radius on mobile.

### Animation
- Body content: `opacity: 0 → 1`, `translateY: 12px → 0`, `500ms`, delay `350ms` (after header).
- No per-paragraph animations. The entire body fades in as one block to avoid distraction while reading.

---

## Section 5: Soft Community Invite

### Layout
- Max-width: `720px`, centered. Same reading column.
- Padding: `2rem` top, `3rem` bottom.
- Component: `SoftCommunityInvite` (see `design.md`).

### Copy
- **Content**: "If you try this workflow and get stuck, or if you want to share what you are building, there is a free community where people help each other. No sales pitch. Just people who are actually using AI to make things. You are welcome to join."
- **Link**: "Join the community on Skool" — same as homepage. External link.

### Responsive
- Mobile: same as body column, full width with `1rem` padding.

### Animation
- `opacity: 0 → 1`, `translateY: 12px → 0`, `500ms`, triggered by IntersectionObserver.

---

## Section 6: Related Articles

### Layout
- Full width. Background: `--surface` (`#FFFFFF`). Top border: `1px solid --border`.
- Padding: `4rem` top, `4rem` bottom.
- Section header: `SectionHeader`.
  - Eyebrow: "Related"
  - Title: "You might also like"
- Grid: 3 columns on desktop, 2 on tablet, 1 on mobile. Gap: `1.5rem`.
- Max-width: `1200px`.
- Shows 3 related articles based on shared category.

### Cards
Three `ArticleCard` components (see `design.md`).

#### Card 1 (Example)
- Image: `article-ai-tools.png`
- Category: "AI Tools"
- Title: "I Tried 7 AI Note-Taking Apps. One Is Actually Good."
- Excerpt: "The rest are either too slow, too expensive, or too opinionated."
- Meta: "December 28, 2023 · 7 min read"
- Link: `/articles/ai-note-taking-apps`

#### Card 2 (Example)
- Image: `article-make-money.png`
- Category: "Make Money"
- Title: "The AI Workflow That Cut My Content Creation Time by 80%"
- Excerpt: "I used to spend six hours on a blog post. Now it is ninety minutes."
- Meta: "January 8, 2024 · 10 min read"
- Link: `/articles/ai-workflow-content-creation`

#### Card 3 (Example)
- Image: `article-create.png`
- Category: "Create"
- Title: "Building a Simple AI Video Generator for TikTok: A Complete Walkthrough"
- Excerpt: "You do not need to know how to code. You need a $20/month tool and a repeatable prompt."
- Meta: "December 22, 2023 · 20 min read"
- Link: `/articles/ai-video-generator-tiktok`

### Responsive
- Same as homepage Latest Content Feed grid.

### Animation
- Cards: staggered entrance. `opacity: 0 → 1`, `translateY: 20px → 0`, `500ms`, stagger `80ms`.

---

## Section 7: Footer

- Component: `Footer` (see `design.md`).
- Same as homepage footer.

---

## JSON-LD Schema

### Article Schema
Place inside `<head>` as a `<script type="application/ld+json">`:
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "How I Built a $3,000/Month Side Income Using AI Agents and No Code",
  "description": "I spent six months trying every AI workflow tool I could find. Most were overhyped. Two actually made me money. Here is the exact setup I use.",
  "author": {
    "@type": "Person",
    "name": "Author Name"
  },
  "datePublished": "2024-01-12",
  "dateModified": "2024-01-12",
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
    "@id": "https://aiagentsfirst.com/articles/how-i-built-a-3000-month-side-income"
  },
  "image": "https://aiagentsfirst.com/hero-featured.png"
}
```

### FAQ Schema (if article includes an FAQ section)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do I need to know how to code?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. This workflow uses no-code tools like Make.com and Zapier. If you can drag and drop, you can build this."
      }
    },
    {
      "@type": "Question",
      "name": "How much does this cost to run?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "About $47 per month in tool subscriptions. The AI API calls add another $12 to $20 depending on volume."
      }
    }
  ]
}
```

---

## Responsive Summary (Article)

| Element | Mobile (<768px) | Tablet (768–1023px) | Desktop (≥1024px) |
|---------|-----------------|---------------------|-------------------|
| Cover image | Full-width, `1rem` padding, `8px` radius | Centered, max `1200px` | Centered, max `1200px` |
| Reading column | Full-width, `1rem` padding | Max `720px`, centered | Max `720px`, centered |
| Body components | Full-width, horizontal scroll for code | Within `720px` column | Within `720px` column |
| Related articles | 1 column | 2 columns | 3 columns |
| Community invite | Within reading column | Within reading column | Within reading column |
| Navbar | Hamburger | Full nav | Full nav |
