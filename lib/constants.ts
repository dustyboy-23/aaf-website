export const colors = {
  void: "#020206",
  cyan: { base: "#06b6d4", light: "#22d3ee" },
  magenta: { base: "#ec4899", light: "#f472b6" },
  violet: { base: "#7c3aed", light: "#a78bfa" },
  orange: "#f97316",
  lime: "#84cc16",
  text: { white: "#ffffff", silver: "#e0e0e8" },
} as const;

export const categoryColors: Record<string, string> = {
  news: colors.violet.base,
  learn: colors.cyan.base,
  tutorial: colors.cyan.base,
  analysis: colors.cyan.light,
  tool: colors.orange,
  signal: colors.lime,
  network: colors.magenta.base,
};

export const branchEndpoints = [
  { label: "Live Intelligence", slug: "/news", color: colors.violet.base, desc: "real-time drops from the AI frontier" },
  { label: "Agent Academy", slug: "/learn", color: colors.cyan.base, desc: "zero to deployed build guides" },
  { label: "The Network", slug: "/network", color: colors.magenta.base, desc: "questions, answers, builder community" },
  { label: "Deep Analysis", slug: "/deep-dives", color: colors.cyan.light, desc: "architecture breakdowns, strategic intelligence" },
  { label: "Tool Vault", slug: "/tools", color: colors.orange, desc: "frameworks, stacks, tested resources" },
  { label: "Signal Feed", slug: "/signal", color: colors.lime, desc: "daily curated picks, zero noise" },
] as const;

export const GPU_TIER = { HIGH: 2, MEDIUM: 1, LOW: 0 } as const;
export type GpuTier = (typeof GPU_TIER)[keyof typeof GPU_TIER];
