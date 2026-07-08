@AGENTS.md

# The Hub — project context

This repo is a **value-first editorial AI content hub**: a library, not a
storefront. Content is the hero; a free community is a quiet backend the reader
discovers after getting value. See `positioning.md` (what/who) and `voice.md`
(how it reads). The name is a placeholder in `lib/site.ts` — renaming is a
one-line edit there plus the `Wordmark` component.

## Ground rules for any change here

- **Design system:** Editorial Operator archetype. Warm paper canvas, ink text,
  a single archival-green accent used sparingly. Fonts: Fraunces (display),
  Newsreader (reading body), IBM Plex Sans (nav/labels/meta), JetBrains Mono
  (numbers/code). Tokens live in `app/globals.css` `@theme`.
- **Voice guardrails are hard rules:** no em dashes; no internal-data leaks (no
  real brand/community names, no raw slug, no paths, no pricing); no fabricated
  numbers. The only verifiable claim is "it's free to join." Run the
  `voice-guard` skill on public copy before shipping.
- **Community links** route through `/go/[source]` (302 + UTMs). The raw
  destination URL lives ONLY in `lib/links.ts` and is never rendered.
- **Soft-CTA discipline:** no page except `/community` renders more than one
  dedicated community block. A second block anywhere is a drift signal.

## Content model

- New consumer hub articles: `content/articles/*.mdx` (HTML body + frontmatter,
  one `pillar` each), loaded by `lib/hub.ts`, served at `/articles/[slug]`.
- Legacy builder-brand posts: `content/posts/*.mdx`, loaded by `lib/content.ts`,
  still served at `/[slug]` and `/tag/[tag]` for SEO. Do not confuse the two.
- Pillars + placeholder name + shared copy: `lib/site.ts`.

## Archived

Builder-brand home components live in `_archive-builder-brand/` (not deleted,
not routed). The old "AI Agents First" builder positioning is retired.
