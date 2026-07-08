/**
 * Single source of truth for the hub's public identity + content taxonomy.
 *
 * The name is a deliberate placeholder. Renaming the hub is a one-line edit
 * here plus the Wordmark component — nothing else references the literal name.
 */

export const SITE_NAME = "The Hub";
export const SITE_TAGLINE = "The practical side of AI";

/**
 * The core promise everything ladders to. Voice pass may refine wording; the
 * idea (use it · earn with it · create with it, without the hype) is locked.
 */
export const CORE_PROMISE =
  "Learn to actually use AI to make money and make things, without the hype.";

/** The single soft CTA line — the only pitch on the whole site. */
export const SOFT_CTA =
  "It's all free to read here. When you want to go deeper with people building the same thing, the community's open.";

/**
 * Public byline. First name only, no surname/handle/photo (hard-rule-#4 safe).
 * Swap here if you want a different public byline. Bio stays value-framed.
 */
export const AUTHOR_NAME = "Dusty";
export const AUTHOR_BIO =
  "Writing about the practical side of AI, and figuring plenty of it out in the open.";

export type PillarSlug = "use-ai" | "make-money" | "create" | "tools";

export type Pillar = {
  slug: PillarSlug;
  /** Sequence index — the four pillars read as a learning path (01 → 04). */
  order: number;
  label: string;
  tagline: string;
  blurb: string;
};

export const PILLARS: Pillar[] = [
  {
    slug: "use-ai",
    order: 1,
    label: "Use AI",
    tagline: "Start here. The tools that matter and how to get a real result.",
    blurb:
      "Practical foundations. How AI works for a normal person, which tools are worth opening, and how to get a good result on the first try.",
  },
  {
    slug: "make-money",
    order: 2,
    label: "Make Money with AI",
    tagline: "The income paths, walked through end to end.",
    blurb:
      "Faceless channels, AI voices, content services, digital products, automations. Walk-throughs that end at a real outcome, not a pitch.",
  },
  {
    slug: "create",
    order: 3,
    label: "Create with AI",
    tagline: "Turn a prompt into something worth sharing.",
    blurb:
      "The maker side. Video, art, characters, music, writing, small tools. For the creative outlet, not just the paycheck.",
  },
  {
    slug: "tools",
    order: 4,
    label: "Tools & Workflows",
    tagline: "Which tool, honest take, and how to wire it up.",
    blurb:
      "The stack, reviewed honestly, and how the pieces fit together. The evergreen answer to \"which tool\" and \"is it worth it.\"",
  },
];

export const PILLAR_BY_SLUG: Record<PillarSlug, Pillar> = Object.fromEntries(
  PILLARS.map((p) => [p.slug, p]),
) as Record<PillarSlug, Pillar>;

export function pillarOf(slug: string | undefined | null): Pillar | null {
  if (!slug) return null;
  return PILLAR_BY_SLUG[slug as PillarSlug] ?? null;
}
