import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

/**
 * The hub wordmark. Placeholder name lives in lib/site.ts — renaming the hub
 * is a one-line edit there. This component owns the visual treatment only.
 *
 * Treatment: serif display set tight, with a small monospace index tick that
 * ties the mark to the numbered pillar index (the site's signature device).
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-baseline gap-1.5 ${className}`}
      aria-label={`${SITE_NAME}, home`}
    >
      <span className="index-num text-[0.7rem] text-accent leading-none translate-y-[-0.15em]">
        /
      </span>
      <span className="font-display text-[1.35rem] leading-none tracking-[-0.02em] text-ink font-medium">
        {SITE_NAME}
      </span>
    </Link>
  );
}
