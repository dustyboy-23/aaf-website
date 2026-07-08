/**
 * Link registry — the ONLY place the raw community destination URL appears.
 *
 * Every public "join" link routes through the site's own /go/[source] redirect
 * so the ugly destination slug is never surfaced in rendered markup, and so we
 * get per-lane click tracking the destination platform does not expose natively.
 *
 * Rendered copy links to `/go/<source>` (see goHref). Never import COMMUNITY_URL
 * into a component that renders it.
 */

// Internal build config. Never render this string. Fix it here if it ever changes.
const COMMUNITY_URL =
  "https://www.skool.com/e-com-freedom-amazon-tiktok-4556/about";

export type Side = "human" | "ai" | "site";

type LaneMeta = {
  /** utm_medium value */
  medium: Side;
  /** A/B lane label kept private to this file */
  side: "HUMAN" | "AI" | "SITE";
};

/**
 * Fixed source lanes. The slugs appear in public redirect URLs; they carry no
 * brand name, path, price, or PII, so they are clean. They lightly signal the
 * human-vs-AI sourcing split — acceptable per the build brief.
 */
const LANES: Record<string, LaneMeta> = {
  "tt-human": { medium: "human", side: "HUMAN" },
  "ig-human": { medium: "human", side: "HUMAN" },
  "yt-human": { medium: "human", side: "HUMAN" },
  "fb-human": { medium: "human", side: "HUMAN" },
  "tt-ai": { medium: "ai", side: "AI" },
  "ig-ai": { medium: "ai", side: "AI" },
  "yt-ai": { medium: "ai", side: "AI" },
  "fb-ai": { medium: "ai", side: "AI" },
  reddit: { medium: "ai", side: "AI" },
  pinterest: { medium: "ai", side: "AI" },
  site: { medium: "site", side: "SITE" },
};

export type ResolvedLink = {
  source: string;
  medium: Side;
  side: LaneMeta["side"];
  /** Fully built destination URL with UTMs appended. Server-only. */
  destination: string;
};

/**
 * Resolve a /go/[source] slug to its destination + UTMs.
 *
 * Per-article blog links use the `blog-<slug>` convention and are all treated
 * as the AI lane. Unknown sources fall back to the site lane so a bad link
 * still lands the reader in the right place.
 */
export function resolveLink(rawSource: string): ResolvedLink {
  const source = rawSource.toLowerCase();

  let meta: LaneMeta;
  if (LANES[source]) {
    meta = LANES[source];
  } else if (source.startsWith("blog-")) {
    meta = { medium: "ai", side: "AI" };
  } else {
    meta = LANES.site;
  }

  const url = new URL(COMMUNITY_URL);
  url.searchParams.set("utm_source", source);
  url.searchParams.set("utm_medium", meta.medium);
  url.searchParams.set("utm_campaign", "hub");

  return {
    source,
    medium: meta.medium,
    side: meta.side,
    destination: url.toString(),
  };
}

/** Clean public href for a community lane. Use this in components. */
export function goHref(source: string): string {
  return `/go/${source}`;
}
