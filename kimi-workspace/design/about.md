# About Page Design

## Route: `/about`

## Purpose
The About page is where the operator introduces themselves. First person, real, honest. No origin story stretched to sound epic. Just: who I am, what I do, why I built this, and a soft mention of the community. It should feel like a good email from a friend.

---

## Section 1: Navbar

- Component: `Navbar` (see `design.md`).
- "About" is the active nav link.
- Home and category links are inactive.

---

## Section 2: About Header

### Layout
- Full width. Background: `--canvas` (`#FDFCF8`).
- Padding: `8rem` top (clears navbar), `3rem` bottom.
- Content: max-width `720px`, centered. Left-aligned text.

### Copy
- **Eyebrow** (Mono font, `caption`, `--accent`): "About"
- **Title** (Display font, `h1`, `--text-primary`): "I run my business on AI. Here is what I am learning."
- **Subtitle** (Body font, `body`, `--text-secondary`): "I started this site because I was tired of AI content that felt like a sales pitch. I wanted a place with real tutorials, real numbers, and real failures. So I built it."

### Responsive
- Mobile: `6rem` padding-top, `1rem` side padding.
- Tablet+: `8rem` padding-top.

### Animation
- Eyebrow: `opacity: 0 → 1`, `translateY: 12px → 0`, `500ms`, delay `0ms`.
- Title: `opacity: 0 → 1`, `translateY: 16px → 0`, `600ms`, delay `100ms`.
- Subtitle: `opacity: 0 → 1`, `translateY: 12px → 0`, `500ms`, delay `200ms`.

---

## Section 3: Bio / Portrait

### Layout
- Full width. Background: `--surface` (`#FFFFFF`). Top border: `1px solid --border`.
- Padding: `4rem` top, `4rem` bottom.
- Content: max-width `720px`, centered.
- Two-column layout on desktop: portrait left (35%), text right (65%).
- Stacked on mobile: portrait centered above text.
- Gap: `2rem`.

### Portrait
- Image: `about-portrait.png` (see asset manifest in `design.md`).
- Aspect ratio: `1:1` (square). Border-radius: `12px`.
- `box-shadow: 0 4px 16px rgba(0,0,0,0.06)`.
- Max-width: `280px` on desktop, `200px` on mobile.
- Fallback: if image fails, show a `280px` square with background `--accent-light` and initials "AAF" in Display font, `--accent`.

### Bio Text
- Font: Body font, `body`, `--text-primary`. Line-height `1.7`.
- Paragraphs separated by `1.5rem` margin.

#### Paragraph 1
"My name is [Name]. I have been running online businesses for about eight years. For the first six, I did everything the hard way: writing every blog post, editing every video, answering every email myself."

#### Paragraph 2
"Two years ago I started using AI tools to automate the boring parts. At first I wasted a lot of money on tools that did not work. Then I found the ones that actually saved time, and I built workflows around them."

#### Paragraph 3
"Today I run a small e-commerce business and a content site. AI handles about 60% of the repetitive work. I handle the strategy, the creative decisions, and the parts that still need a human eye."

#### Paragraph 4
"I am not an AI researcher. I am not a developer. I am a person who uses AI to run a business, and I write about what I learn. Sometimes I get things wrong. When I do, I come back and update the post."

### Responsive
- Mobile: portrait is centered, `200px` wide, `margin-bottom: 2rem`. Text is full-width.
- Tablet: portrait `240px`, text beside it.
- Desktop: portrait `280px`, two-column layout.

### Animation
- Portrait: `opacity: 0 → 1`, `translateY: 20px → 0`, `600ms`, delay `200ms`.
- Bio text: `opacity: 0 → 1`, `translateY: 16px → 0`, `500ms`, delay `300ms`.
- Reduced motion: instant appearance.

---

## Section 4: What This Site Is About

### Layout
- Full width. Background: `--canvas` (`#FDFCF8`).
- Padding: `4rem` top, `4rem` bottom.
- Content: max-width `720px`, centered. Left-aligned text.

### Copy
- **Section title** (Display font, `h2`, `--text-primary`): "What this site is"
- **Body text** (Body font, `body`, `--text-primary`): "A free resource for people who want to use AI to make money or create things. I publish tutorials, tool reviews, and news. Everything is free. There are no ads. There are no affiliate links hidden in every paragraph."

- **Second paragraph** (Body font, `body`, `--text-primary`): "I update articles when tools change. If a tutorial is outdated, I will edit it or remove it. I do not leave broken advice up just to keep the traffic."

- **Third paragraph** (Body font, `body`, `--text-primary`): "The community is free. It is on Skool. People share what they are building, ask questions, and help each other. I am in there most days. If you want to join, you are welcome. If you do not, that is fine too. The site is the main thing."

### Responsive
- Mobile: `1rem` side padding. Title size reduces via `clamp()`.
- Tablet+: max-width `720px`, centered.

### Animation
- Section title: `opacity: 0 → 1`, `translateY: 16px → 0`, `600ms`.
- Paragraphs: `opacity: 0 → 1`, `translateY: 12px → 0`, `500ms`, stagger `100ms`.

---

## Section 5: Soft Community Invite

### Layout
- Full width. Background: `--border-light` (`#F0EFEA`). Top border: `1px solid --border`.
- Padding: `3rem` top, `3rem` bottom.
- Content: centered, max-width `600px`, text-align center.
- Component: `SoftCommunityInvite` (see `design.md`).

### Copy
- **Text** (Body font, `body`, `--text-primary`): "If you want to talk about what you are building, or if you just want to see what other people are doing with AI, the community is free. I am in there most days. You are welcome to join."
- **Link** (Body font, `body`, `--accent`, underline on hover): "Join the community on Skool" — same external link as everywhere else.

### Responsive
- Mobile: same centered layout, `2rem` padding.

### Animation
- `opacity: 0 → 1`, `translateY: 12px → 0`, `500ms`.

---

## Section 6: Footer

- Component: `Footer` (see `design.md`).
- Same as homepage footer.

---

## Responsive Summary (About)

| Element | Mobile (<768px) | Tablet (768–1023px) | Desktop (≥1024px) |
|---------|-----------------|---------------------|-------------------|
| About header | Left-aligned, `6rem` padding-top | Left-aligned, `8rem` padding-top | Left-aligned, `8rem` padding-top |
| Bio + portrait | Stacked, portrait centered `200px` | Two-column, portrait `240px` | Two-column, portrait `280px` |
| What this site is | Full-width, `1rem` padding | Max `720px` centered | Max `720px` centered |
| Community invite | Centered, `2rem` padding | Centered, `3rem` padding | Centered, `3rem` padding |
| Navbar | Hamburger | Full nav | Full nav |
