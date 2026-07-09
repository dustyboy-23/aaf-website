# Homepage Design

## Route: `/`

## Purpose
The homepage is the front door. It answers "what is this?" in one honest line, then immediately shows the best and latest content. The page is a rich visual feed — a modern AI publication crossed with a tutorial site. The community is mentioned exactly twice: once in a soft strip near the bottom, and once as a footer link. Content dominates the page.

---

## Section 1: Navbar

- Component: `Navbar` (see `design.md`).
- Fixed top. Transparent-to-opaque on scroll.
- Links: Home (active), Tools, Make Money, Create, News, About.
- Community link in top-right: "Community" — plain text, accent color, underline on hover. No button styling. No arrow icon.

---

## Section 2: Hero

### Layout
- Full width. Background: `--canvas` (`#FDFCF8`).
- Padding: `8rem` top (clears navbar), `4rem` bottom.
- Content: centered, max-width `800px`.

### Copy
- **Eyebrow** (optional, Mono font, `caption`, `--accent`): "Free AI resource"
- **Headline** (Display font, `hero`, `--text-primary`): "I test AI tools and write down what actually works."
- **Subheadline** (Body font, `body`, `--text-secondary`): "No courses to sell. No guru nonsense. Just tutorials, tool breakdowns, and news you can use."
- **No CTA button.** No "Learn more." No arrow. The headline is the invitation. The content below is the proof.

### Responsive
- Mobile: eyebrow and headline left-aligned. Padding-top reduced to `6rem`.

### Animation
- Headline: `opacity: 0 → 1`, `translateY: 16px → 0`, `600ms`, `ease-out`, delay `100ms`.
- Subheadline: same, delay `200ms`.
- Eyebrow (if present): same, delay `0ms`.

---

## Section 3: Featured Article

### Layout
- Full width. Background: `--canvas`.
- Content: max-width `1200px`, centered.
- Two-column grid on desktop: image left (60%), text right (40%). Image aspect ratio `16:9`.
- Stacked on mobile: image full-width, text below.
- Gap: `2rem`.

### Copy
- **Eyebrow** (Mono font, `caption`, `--accent`): "Featured"
- **Title** (Display font, `h2`, `--text-primary`): "How I Built a $3,000/Month Side Income Using AI Agents and No Code"
- **Excerpt** (Body font, `body`, `--text-secondary`): "I spent six months trying every AI workflow tool I could find. Most were overhyped. Two actually made me money. Here is the exact setup I use, step by step, with screenshots."
- **Meta** (Mono font, `caption`, `--text-muted`): "January 12, 2024 · 18 min read"
- **Link**: entire card is a link to `/articles/how-i-built-a-3000-month-side-income`.
- **No "Read more" button.** The card itself is the link. Underline the title on hover.

### Image
- `hero-featured.png` (see asset manifest in `design.md`).
- Border-radius: `12px`.
- On hover: `scale: 1.02`, duration `300ms`.

### Responsive
- Mobile: image stacks above text. Image is full-width, aspect ratio `16:9`.
- Tablet: same two-column layout, image 55% / text 45%.

### Animation
- Image: `opacity: 0 → 1`, `translateY: 24px → 0`, `700ms`, delay `300ms`.
- Text block: `opacity: 0 → 1`, `translateY: 20px → 0`, `600ms`, delay `400ms`.

---

## Section 4: Latest Content Feed

### Layout
- Full width. Background: `--surface` (`#FFFFFF`). Subtle top border: `1px solid --border`.
- Padding: `5rem` top, `5rem` bottom.
- Section header: `SectionHeader` component (see `design.md`).
  - Eyebrow: "Latest"
  - Title: "What I am working on"
  - Subtitle: "Tutorials, breakdowns, and news. Updated when I find something worth sharing."
- Grid: 3 columns on desktop, 2 on tablet, 1 on mobile. Gap: `1.5rem`.
- Max-width: `1200px`.

### Cards (ArticleCard component)
Six cards shown initially. Each is an `ArticleCard` (see `design.md`).

#### Card 1
- Image: `article-ai-tools.png`
- Category: "AI Tools"
- Title: "Claude vs. ChatGPT for Coding: I Tested Both for a Week"
- Excerpt: "I built the same feature in both. One saved me four hours. The other gave me better architecture. Here is the honest breakdown."
- Meta: "January 10, 2024 · 12 min read"
- Link: `/articles/claude-vs-chatgpt-coding`

#### Card 2
- Image: `article-make-money.png`
- Category: "Make Money"
- Title: "The AI Workflow That Cut My Content Creation Time by 80%"
- Excerpt: "I used to spend six hours on a blog post. Now it is ninety minutes. Here is the exact prompt chain and tool stack."
- Meta: "January 8, 2024 · 10 min read"
- Link: `/articles/ai-workflow-content-creation`

#### Card 3
- Image: `article-create.png`
- Category: "Create"
- Title: "How I Use Midjourney to Generate Product Photos for My E-commerce Store"
- Excerpt: "Professional product photography used to cost $200 per shot. I get comparable results for $0.03. Here is my prompt template and post-processing flow."
- Meta: "January 5, 2024 · 15 min read"
- Link: `/articles/midjourney-product-photos`

#### Card 4
- Image: `article-news.png`
- Category: "AI News"
- Title: "OpenAI's New Model: What It Actually Means for Your Business"
- Excerpt: "I read the full paper so you do not have to. Three things matter for small operators. Two are overhyped."
- Meta: "January 3, 2024 · 8 min read"
- Link: `/articles/openai-new-model-business`

#### Card 5
- Image: `article-ai-tools.png`
- Category: "AI Tools"
- Title: "I Tried 7 AI Note-Taking Apps. One Is Actually Good."
- Excerpt: "The rest are either too slow, too expensive, or too opinionated. Here is the winner and why it stuck."
- Meta: "December 28, 2023 · 7 min read"
- Link: `/articles/ai-note-taking-apps`

#### Card 6
- Image: `article-create.png`
- Category: "Create"
- Title: "Building a Simple AI Video Generator for TikTok: A Complete Walkthrough"
- Excerpt: "You do not need to know how to code. You need a $20/month tool and a repeatable prompt. I will show you both."
- Meta: "December 22, 2023 · 20 min read"
- Link: `/articles/ai-video-generator-tiktok`

### Responsive
- Mobile: 1 column, cards stack vertically.
- Tablet: 2 columns.
- Desktop: 3 columns.

### Animation
- Section header: `opacity: 0 → 1`, `translateY: 16px → 0`, `500ms`.
- Cards: staggered entrance. `opacity: 0 → 1`, `translateY: 20px → 0`, `500ms`, stagger `80ms` per card. Triggered by IntersectionObserver at `threshold: 0.1`.
- Reduced motion: instant appearance, no stagger.

---

## Section 5: Categories

### Layout
- Full width. Background: `--canvas` (`#FDFCF8`).
- Padding: `5rem` top, `5rem` bottom.
- Section header: `SectionHeader` component.
  - Eyebrow: "Browse"
  - Title: "Find what you need"
  - Subtitle: "Four categories. No fluff."
- Grid: 4 columns on desktop, 2 on tablet, 1 on mobile. Gap: `1.5rem`.
- Max-width: `1200px`.

### Cards
Each card is a clickable link to its category page. Not an `ArticleCard` — a simpler, larger category card.

#### Card Structure
- Background: `--surface` (`#FFFFFF`).
- Border: `1px solid --border`. Border-radius: `12px`.
- Padding: `2rem`.
- Icon: Lucide icon, `48px`, `--accent`, centered or top-left.
- Title: Body font, `h3`, weight 500, `--text-primary`, centered.
- Description: Body font, `body-sm`, `--text-secondary`, centered, max-width `280px`.
- Hover: `translateY: -4px`, shadow increases, border-color `--accent-light`. Same as ArticleCard.
- Focus: `2px solid --accent` outline.

#### Card 1: AI Tools
- Icon: `Wrench` (Lucide)
- Title: "AI Tools"
- Description: "I test the tools so you do not have to. Honest reviews, real workflows, and what is worth paying for."
- Link: `/tools`

#### Card 2: Make Money
- Icon: `Banknote` (Lucide)
- Title: "Make Money With AI"
- Description: "Actual income strategies I have tried. Some worked. Some did not. I will tell you both."
- Link: `/make-money`

#### Card 3: Create
- Icon: `Palette` (Lucide)
- Title: "Create With AI"
- Description: "Images, video, writing, design. Prompts, workflows, and how to make it look like you made it."
- Link: `/create`

#### Card 4: News
- Icon: `Newspaper` (Lucide)
- Title: "AI News"
- Description: "What matters, what does not, and what you should actually do about it."
- Link: `/news`

### Responsive
- Mobile: 1 column, full-width cards.
- Tablet: 2 columns.
- Desktop: 4 columns.

### Animation
- Section header: same as Latest Content Feed.
- Cards: staggered entrance, same as ArticleCard grid. Stagger `100ms`.

---

## Section 6: Soft Community Strip

### Layout
- Full width. Background: `--border-light` (`#F0EFEA`). Top border: `1px solid --border`.
- Padding: `3rem` top, `3rem` bottom.
- Content: centered, max-width `600px`, text-align center.

### Copy
- **Text** (Body font, `body`, `--text-primary`): "I run a free community where people share what they are building with AI. No sales pitch. Just a place to ask questions and show your work. If that sounds useful, you are welcome to join."
- **Link** (Body font, `body`, `--accent`, underline on hover): "Join the community on Skool" — links to `https://www.skool.com/e-com-freedom-amazon-tiktok-4556/about` with `rel="noopener noreferrer" target="_blank"`.
- **No button.** No arrow icon. No bold text. Just a quiet paragraph with a plain link.

### Responsive
- Mobile: same layout, padding reduced to `2rem` top/bottom.

### Animation
- `opacity: 0 → 1`, `translateY: 12px → 0`, `500ms`, triggered by IntersectionObserver.

---

## Section 7: Footer

- Component: `Footer` (see `design.md`).
- Full width. Background: `--canvas`. Top border: `1px solid --border`.
- Wordmark: "AI Agents First" in Display font.
- About snippet: "Practical AI tutorials and news. Built by one person. Updated when I find something worth sharing."
- Link groups:
  - Content: Home, Tools, Make Money, Create, News
  - Company: About, Community (external link), RSS
  - Social: Twitter/X, YouTube, GitHub (Lucide icons, no labels)
- Legal: "2024 AI Agents First. All rights reserved." and a Privacy link.
- Community link: plain text in footer links, not highlighted.

---

## Responsive Summary (Homepage)

| Element | Mobile (<768px) | Tablet (768–1023px) | Desktop (≥1024px) |
|---------|-----------------|---------------------|-------------------|
| Hero | Left-aligned, `6rem` padding-top | Centered, `7rem` padding-top | Centered, `8rem` padding-top |
| Featured | Stacked, image full-width | Two-column, 55/45 split | Two-column, 60/40 split |
| Latest grid | 1 column | 2 columns | 3 columns |
| Categories | 1 column | 2 columns | 4 columns |
| Community strip | Centered, `2rem` padding | Centered, `3rem` padding | Centered, `3rem` padding |
| Navbar | Hamburger menu | Full nav links | Full nav links |
