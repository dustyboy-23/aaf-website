/**
 * Cosmic Nexus design tokens.
 * Source: docs/plans/aaf-cosmic-nexus-execution-2026-04-17.md + external research brief.
 * Every color + timing constant is load-bearing — don't adjust without updating the plan.
 */
export const colors = {
  // Void / atmosphere
  void: "#04050A",
  midnight: "#09101B",
  darkViolet: "#140B21",

  // Signal / intelligence
  electricBlue: "#2C6DFF",
  neonCyan: "#45F0FF",
  ultraviolet: "#8A63FF",

  // Emotional accents (rare, only for hot spots)
  hotMagenta: "#FF4FD1",
  acidTeal: "#00F5C8",
  signalOrange: "#FF8C37",
  signalLime: "#B7FF3C",

  // Text
  text: { white: "#ffffff", silver: "#e0e0e8" },
} as const;

/**
 * Motion grammar — brief's rule: slow and elegant.
 * Breathing on 6–10s cycles, pulses 1–2s, UI motion under 400ms.
 * If everything wiggles continuously, it feels like a demo reel, not a conscious system.
 */
export const motion = {
  /** Central core breathing cycle (seconds). 6–10s range. */
  BREATH_CYCLE: 8,
  /** Single pulse traversal time along a branch (seconds). 1–2s range. */
  PULSE_DURATION: 1.5,
  /** Average gap between pulses per branch (seconds). */
  PULSE_GAP: 6,
  /** Irregular node flicker min/max (seconds). */
  NODE_FLICKER_MIN: 0.8,
  NODE_FLICKER_MAX: 3.2,
  /** UI motion cap — buttons, hovers, fades (seconds). */
  UI_MOTION_MAX: 0.4,
} as const;

/**
 * Category colors for tags, feed entries, branch endpoints.
 * Maps post pillars to the brief's palette.
 */
export const categoryColors: Record<string, string> = {
  // Singulars and plurals both map — frontmatter is inconsistent across
  // the 40+ imported posts, so alias every common variant back to the
  // six-pillar palette.
  news: colors.ultraviolet,
  dispatch: colors.ultraviolet,
  update: colors.ultraviolet,
  learn: colors.neonCyan,
  tutorial: colors.neonCyan,
  tutorials: colors.neonCyan,
  guide: colors.neonCyan,
  guides: colors.neonCyan,
  analysis: colors.electricBlue,
  "deep-dive": colors.electricBlue,
  "deep-dives": colors.electricBlue,
  essay: colors.electricBlue,
  tool: colors.signalOrange,
  tools: colors.signalOrange,
  stack: colors.signalOrange,
  reviews: colors.signalOrange,
  review: colors.signalOrange,
  signal: colors.signalLime,
  signals: colors.signalLime,
  daily: colors.signalLime,
  money: colors.signalLime,
  network: colors.hotMagenta,
  community: colors.hotMagenta,
  interview: colors.hotMagenta,
  opinion: colors.hotMagenta,
  opinions: colors.hotMagenta,
  takes: colors.hotMagenta,
  comparisons: colors.ultraviolet,
  comparison: colors.ultraviolet,
  vs: colors.ultraviolet,
};

/**
 * Editorial metadata per tag — eyebrow + description for the tag page hero.
 * Keys are tag slugs. Used by TagPageLayout to give each tag its own voice.
 */
export const tagMeta: Record<
  string,
  { title: string; eyebrow: string; description: string }
> = {
  tutorials: {
    title: "Tutorials",
    eyebrow: "Build it. Ship it.",
    description:
      "Step-by-step build guides for AI agents. From first commit to deployed production.",
  },
  comparisons: {
    title: "Comparisons",
    eyebrow: "Head to head",
    description:
      "Tool vs tool. Model vs model. Stack vs stack. Real benchmarks, real tradeoffs.",
  },
  money: {
    title: "Money",
    eyebrow: "Revenue. Pricing. Monetization.",
    description:
      "How people are actually making money building with AI agents. Numbers, not hype.",
  },
  opinion: {
    title: "Takes",
    eyebrow: "Unfiltered",
    description:
      "Field notes, hot takes, and the honest read on where AI agents are actually headed.",
  },
  news: {
    title: "News",
    eyebrow: "Frontier dispatches",
    description:
      "What just dropped, what it means, and whether you should care.",
  },
  reviews: {
    title: "Reviews",
    eyebrow: "Tested in production",
    description:
      "What we ran, what broke, what we'd actually keep in the stack.",
  },
};

/**
 * Hero branch endpoints — 6 navigation destinations radiating from the neural core.
 * 3 left + 3 right. Each maps to a color, slug, and description.
 */
export const branchEndpoints = [
  { label: "Live Intelligence", slug: "/news", color: colors.ultraviolet, desc: "real-time drops from the AI frontier" },
  { label: "Agent Academy", slug: "/learn", color: colors.neonCyan, desc: "zero to deployed build guides" },
  { label: "The Network", slug: "/network", color: colors.hotMagenta, desc: "questions, answers, builder community" },
  { label: "Deep Analysis", slug: "/deep-dives", color: colors.electricBlue, desc: "architecture breakdowns, strategic intelligence" },
  { label: "Tool Vault", slug: "/tools", color: colors.signalOrange, desc: "frameworks, stacks, tested resources" },
  { label: "Signal Feed", slug: "/signal", color: colors.signalLime, desc: "daily curated picks, zero noise" },
] as const;

export const GPU_TIER = { HIGH: 2, MEDIUM: 1, LOW: 0 } as const;
export type GpuTier = (typeof GPU_TIER)[keyof typeof GPU_TIER];
