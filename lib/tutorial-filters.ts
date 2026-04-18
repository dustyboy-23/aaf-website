import type { GhostPost } from "./ghost.types";
import type { FilterChip } from "@/components/ui/TagGrid";

/**
 * Filter buckets for /tag/tutorials.
 *
 * Matching happens server-side (via tagBuckets) because React Server
 * Components can't pass functions to client components. The chip array
 * is pure data; the matching is done once on the server, then each post
 * carries its matched bucket slugs as an array that the client filters
 * against.
 *
 * Matching is slug-based rather than secondary-tag-based because the MDX
 * frontmatter only stores a single primary tag. If we later add real
 * secondary tagging in Ghost we can swap this for post.tags lookups.
 *
 * Keep the match rules loose/additive — a post can match multiple buckets.
 */

const matchers: Record<string, RegExp> = {
  agents: /(ai-agent|ai-agents|multi-agent|one-agent|memory-systems|agent-team|architecture|agent-business-data|agent-content|agent-social|agent-security)/i,
  automation: /(automate|automation|dashboard|monitor-ai)/i,
  tools: /(claude-code|claude-opus|codex|cursor|ide)/i,
  models: /(run-ai-model|mac-mini|locally)/i,
  business: /(agency|free-ai-agents|pricing|business-ideas|start-ai|5k-month)/i,
};

/** Chip array rendered in UI. First chip ("all") is the fallback. */
export const tutorialFilters: FilterChip[] = [
  { slug: "all", label: "All" },
  { slug: "agents", label: "Agents" },
  { slug: "automation", label: "Automation" },
  { slug: "tools", label: "Tools" },
  { slug: "models", label: "Models & Setup" },
  { slug: "business", label: "Business" },
];

/** Compute which bucket slugs a tutorial post belongs to. */
export function tutorialBucketsFor(post: GhostPost): string[] {
  const hits: string[] = [];
  for (const [bucket, re] of Object.entries(matchers)) {
    if (re.test(post.slug)) hits.push(bucket);
  }
  return hits;
}
