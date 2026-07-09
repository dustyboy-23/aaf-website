# Category Page Template Design

## Route: `/tools`, `/make-money`, `/create`, `/news`

## Purpose
Each category page is a focused archive of articles within one topic. The header explains what the category is about. The rest is a visual grid of articles. No promotional content, no cross-selling. Just a clean list of the best articles in this category.

---

## Section 1: Navbar

- Component: `Navbar` (see `design.md`).
- The active nav link is the current category (e.g., "Tools" on `/tools`).
- Home is inactive. Other category links are inactive.

---

## Section 2: Category Header

### Layout
- Full width. Background: `--canvas` (`#FDFCF8`).
- Padding: `8rem` top (clears navbar), `3rem` bottom.
- Content: max-width `1200px`, centered. Left-aligned on all breakpoints.

### Copy (Example: `/tools` — AI Tools)
- **Eyebrow** (Mono font, `caption`, `--accent`): "Category"
- **Title** (Display font, `h1`, `--text-primary`): "AI Tools"
- **Description** (Body font, `body`, `--text-secondary`): "I test the tools so you do not have to. Honest reviews, real workflows, and what is worth paying for. Updated when I find something that actually works."
- **Article count** (Mono font, `caption`, `--text-muted`): "12 articles" — dynamic, based on actual count.

### Copy (Example: `/make-money` — Make Money With AI)
- **Eyebrow**: "Category"
- **Title**: "Make Money With AI"
- **Description**: "Actual income strategies I have tried. Some worked. Some did not. I will tell you both. No get-rich-quick promises. Just real numbers and honest breakdowns."
- **Article count**: "8 articles"

### Copy (Example: `/create` — Create With AI)
- **Eyebrow**: "Category"
- **Title**: "Create With AI"
- **Description**: "Images, video, writing, design. Prompts, workflows, and how to make it look like you made it. The tools change fast. These tutorials stay current."
- **Article count**: "10 articles"

### Copy (Example: `/news` — AI News)
- **Eyebrow**: "Category"
- **Title**: "AI News"
- **Description**: "What matters, what does not, and what you should actually do about it. I read the papers and the press releases so you can focus on building."
- **Article count**: "15 articles"

### Responsive
- Mobile: `6rem` padding-top. Title size reduces via `clamp()`.
- Tablet+: `8rem` padding-top.

### Animation
- Eyebrow: `opacity: 0 → 1`, `translateY: 12px → 0`, `500ms`, delay `0ms`.
- Title: `opacity: 0 → 1`, `translateY: 16px → 0`, `600ms`, delay `100ms`.
- Description: `opacity: 0 → 1`, `translateY: 12px → 0`, `500ms`, delay `200ms`.
- Article count: `opacity: 0 → 1`, delay `300ms`.

---

## Section 3: Article Grid

### Layout
- Full width. Background: `--surface` (`#FFFFFF`). Top border: `1px solid --border`.
- Padding: `4rem` top, `4rem` bottom.
- Grid: 3 columns on desktop, 2 on tablet, 1 on mobile. Gap: `1.5rem`.
- Max-width: `1200px`.
- Uses `ArticleCard` components (see `design.md`).

### Example Cards (for `/tools`)

#### Card 1
- Image: `article-ai-tools.png`
- Category: "AI Tools"
- Title: "Claude vs. ChatGPT for Coding: I Tested Both for a Week"
- Excerpt: "I built the same feature in both. One saved me four hours. The other gave me better architecture."
- Meta: "January 10, 2024 · 12 min read"
- Link: `/articles/claude-vs-chatgpt-coding`

#### Card 2
- Image: `article-ai-tools.png`
- Category: "AI Tools"
- Title: "I Tried 7 AI Note-Taking Apps. One Is Actually Good."
- Excerpt: "The rest are either too slow, too expensive, or too opinionated. Here is the winner and why it stuck."
- Meta: "December 28, 2023 · 7 min read"
- Link: `/articles/ai-note-taking-apps`

#### Card 3
- Image: `article-ai-tools.png`
- Category: "AI Tools"
- Title: "The Best AI Tool for Transcribing Podcasts in 2024"
- Excerpt: "I tested five transcription services on the same 45-minute interview. One was perfect. Two were unusable."
- Meta: "December 15, 2023 · 9 min read"
- Link: `/articles/best-ai-transcription-podcasts-2024`

### (Articles continue for the full category.)

### Empty State
- If a category has no articles:
  - Background: `--canvas`.
  - Centered text: "No articles yet. I am working on it." in Body font, `body`, `--text-secondary`.
  - No icon. No illustration. Just the sentence.

### Responsive
- Mobile: 1 column, full-width cards.
- Tablet: 2 columns.
- Desktop: 3 columns.

### Animation
- Cards: staggered entrance. `opacity: 0 → 1`, `translateY: 20px → 0`, `500ms`, stagger `80ms` per card. Triggered by IntersectionObserver at `threshold: 0.05`.
- Reduced motion: instant appearance.

---

## Section 4: Pagination / Load More

### Layout
- Centered below the article grid.
- Padding: `3rem` top, `4rem` bottom.
- Background: `--surface` (continues from grid section).

### "Load More" Pattern (Preferred)
- A single text button: "Load more articles" in Body font, `body`, `--accent`, underline on hover.
- No button styling. No background. Just a link.
- On click: loads the next 6 articles via client-side fetch or reveals hidden DOM.
- Loading state: text changes to "Loading..." in `--text-muted`.
- End state: when no more articles, text changes to "That is everything." in `--text-muted`. No link styling.

### Pagination (Alternative)
- If implementing traditional pagination:
- Page numbers in Mono font, `caption`.
- Current page: `--text-primary`, no underline.
- Other pages: `--accent`, underline on hover.
- Previous / Next: Lucide `ChevronLeft` / `ChevronRight` icons, `--accent`.
- Disabled state: `--text-muted`, no hover effect.

### Responsive
- Mobile: same centered layout. Touch-friendly tap targets (min `44px`).

### Animation
- Newly loaded articles: same staggered entrance as initial grid.
- "Load more" text: `opacity` transition on state change, `150ms`.

---

## Section 5: Soft Community Strip (Optional)

- Same component as homepage (`SoftCommunityInvite`).
- Included if the category page is long (more than 12 articles). Skip if the page is short.
- Background: `--border-light`. Top border: `1px solid --border`.
- Padding: `3rem` top, `3rem` bottom.
- Same copy as homepage, or slightly adapted: "If you want to talk about [category] with other people who are building things, the community is free and you are welcome."

---

## Section 6: Footer

- Component: `Footer` (see `design.md`).
- Same as homepage footer.

---

## Responsive Summary (Category)

| Element | Mobile (<768px) | Tablet (768–1023px) | Desktop (≥1024px) |
|---------|-----------------|---------------------|-------------------|
| Category header | Left-aligned, `6rem` padding-top | Left-aligned, `8rem` padding-top | Left-aligned, `8rem` padding-top |
| Article grid | 1 column | 2 columns | 3 columns |
| Load more / pagination | Centered, full-width | Centered | Centered |
| Navbar | Hamburger | Full nav | Full nav |
