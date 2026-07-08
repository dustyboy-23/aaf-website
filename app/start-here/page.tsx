import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllArticles } from "@/lib/hub";
import { CommunityCTA } from "@/components/ui/CommunityCTA";
import { PILLARS } from "@/lib/site";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://aiagentsfirst.com").trim();

export const metadata: Metadata = {
  title: "Start Here",
  description:
    "New to using AI? Start here. A simple four-step path from picking your first tool to making something real, in plain language.",
  alternates: { canonical: `${siteUrl}/start-here` },
};

export default function StartHerePage() {
  const all = getAllArticles();
  // First published article per pillar, used as the recommended starting read.
  const firstByPillar = (slug: string) =>
    [...all].reverse().find((a) => a.pillar.slug === slug) ?? null;

  return (
    <div className="mx-auto max-w-[760px] px-5 sm:px-8 pt-16 pb-12">
      <p className="eyebrow">Start here</p>
      <h1 className="mt-4 font-display text-[2.6rem] sm:text-[3.4rem] leading-[1.05] tracking-[-0.025em] text-ink font-medium">
        New to this? Here's the path.
      </h1>
      <p className="mt-6 font-serif text-[1.25rem] leading-relaxed text-ink-soft">
        You don't need to know anything going in. These four steps go in order, from getting your
        footing to making something you'd actually share. Read them straight through, or jump to
        whichever one you need.
      </p>

      <ol className="mt-14 divide-y divide-hairline border-y border-hairline">
        {PILLARS.map((p) => {
          const first = firstByPillar(p.slug);
          return (
            <li key={p.slug} className="grid grid-cols-[auto_1fr] gap-5 sm:gap-8 py-8">
              <span className="index-num text-[0.85rem] text-ink-mute pt-2">
                {String(p.order).padStart(2, "0")}
              </span>
              <div>
                <h2 className="font-display text-[1.6rem] sm:text-[1.9rem] leading-tight tracking-[-0.02em] text-ink font-medium">
                  {p.label}
                </h2>
                <p className="mt-2 font-serif text-[1.08rem] leading-relaxed text-ink-soft">
                  {p.blurb}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.9rem]">
                  {first && (
                    <Link
                      href={`/articles/${first.slug}`}
                      className="inline-flex items-center gap-1.5 text-accent-ink hover:text-ink transition-colors"
                    >
                      Start with: {first.title}
                      <ArrowRight size={15} strokeWidth={2} />
                    </Link>
                  )}
                  <Link
                    href={`/articles/topic/${p.slug}`}
                    className="text-ink-mute hover:text-ink transition-colors"
                  >
                    See all {p.label}
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-14">
        <CommunityCTA source="site" />
      </div>
    </div>
  );
}
