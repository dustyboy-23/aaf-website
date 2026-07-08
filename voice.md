# Voice — The Hub

Value-first, not sales. A builder learning in public: confident but not a guru.
Plain-spoken, human, warm. The differentiator is honesty ("here's what I'm
figuring out too"), not certainty-selling. The community is framed as *access to
more of this*, never as a transaction ("come talk about this", not "unlock" or
"don't miss out").

## Hard guardrails (non-negotiable)

- **No em dashes** anywhere in public copy. Use periods, commas, parentheses.
- **No internal-data leaks.** Public copy contains ZERO references to real
  brand/community names, the raw community slug, internal paths, platform IDs,
  pricing/tiers, or team names. The raw destination URL lives only in
  `lib/links.ts` and is never rendered. Community links route through `/go/*`.
- **No fabricated numbers.** No member counts, subscriber counts, borrowed logos
  ("as seen in"), or results stats. The only verifiable claim: "it's free to
  join." Every proof element (count, testimonial, result) is an optional,
  swappable slot that ships empty and reads complete without it.
- **Anti-AI-slop.** No gradient-on-background, no emoji-as-icon, no stock/AI hero
  imagery, no generic Inter-only default, no feature-dump spec sheets.

## Anti-patterns to avoid (auditable)

Hero-as-sales-slab, fabricated/borrowed social proof, FOMO/urgency/scarcity/
countdowns, interruptive modals/exit-pops, community feature-dumps, a CTA every
200px, sticky floating "Join" bars.

## Practical writing rules

- Sentence case. Active voice. Plain verbs. No "leverage / empower / optimize /
  unlock / dive in / in today's fast-paced world."
- Name things by what the reader controls, not how the system is built.
- Every article ends at a real result the reader can achieve.
- Run the `voice-guard` skill on all public copy before it ships.
