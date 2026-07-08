import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { goHref } from "@/lib/links";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://aiagentsfirst.com").trim();

export const metadata: Metadata = {
  title: "Community",
  description:
    "A free, calm place to learn the practical side of AI alongside other people building the same thing. No hype, no hard sell.",
  alternates: { canonical: `${siteUrl}/community` },
};

// Optional, swappable proof slot. Ships null. Only render real, verified content.
const proof: React.ReactNode = null;

const outcomes = [
  "Pick a direction instead of drowning in a hundred tool lists",
  "Get unstuck when a walkthrough doesn't go the way the article said",
  "See what other people are actually making, and how",
  "Ask the dumb question without anyone making you feel dumb",
];

export default function CommunityPage() {
  return (
    <div className="mx-auto max-w-[760px] px-5 sm:px-8 pt-16 pb-8">
      <p className="eyebrow">The community</p>
      <h1 className="mt-4 font-display text-[2.7rem] sm:text-[3.6rem] leading-[1.04] tracking-[-0.025em] text-ink font-medium">
        Learn this alongside other people.
      </h1>
      <p className="mt-6 font-serif text-[1.3rem] leading-relaxed text-ink-soft">
        The articles here are free and always will be. The community is just the next room over,
        for when you'd rather learn something with a group than on your own. It's free to join.
      </p>

      <div className="mt-9">
        <a
          href={goHref("site")}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-[1rem] font-medium text-paper transition-transform hover:-translate-y-0.5"
        >
          Join the community, it's free
          <ArrowRight size={18} strokeWidth={2} />
        </a>
      </div>

      {proof ? <div className="mt-10">{proof}</div> : null}

      <section className="mt-16 border-t border-hairline pt-12">
        <h2 className="font-display text-[1.9rem] tracking-[-0.02em] text-ink font-medium">
          What you'll actually get out of it
        </h2>
        <ul className="mt-6 flex flex-col gap-4">
          {outcomes.map((o) => (
            <li key={o} className="flex items-start gap-3">
              <Check size={20} strokeWidth={2} className="mt-1 shrink-0 text-accent" />
              <span className="font-serif text-[1.12rem] leading-relaxed text-ink-soft">{o}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 border-t border-hairline pt-12">
        <h2 className="font-display text-[1.9rem] tracking-[-0.02em] text-ink font-medium">
          Who it's for
        </h2>
        <p className="mt-5 font-serif text-[1.15rem] leading-relaxed text-ink-soft">
          Beginners and the curious-but-overwhelmed. People who want a second income or a creative
          outlet and want to actually start. It is not built for hardcore engineers who want to go
          deep on model internals, and that's on purpose. This is the plain-language room.
        </p>
      </section>

      <section className="mt-14 border-t border-hairline pt-12">
        <h2 className="font-display text-[1.9rem] tracking-[-0.02em] text-ink font-medium">
          The honest version of the "free" part
        </h2>
        <p className="mt-5 font-serif text-[1.15rem] leading-relaxed text-ink-soft">
          Joining is free, and the free door is the real thing, not a teaser. There's an optional
          paid tier for people who want more, but you never have to touch it to get value here.
          Start free, stay free as long as you like.
        </p>
        <div className="mt-8">
          <a
            href={goHref("site")}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-[1rem] font-medium text-paper transition-transform hover:-translate-y-0.5"
          >
            Come on in
            <ArrowRight size={18} strokeWidth={2} />
          </a>
        </div>
      </section>
    </div>
  );
}
