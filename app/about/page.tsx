import type { Metadata } from "next";
import Image from "next/image";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://aiagentsfirst.com").trim();

export const metadata: Metadata = {
  title: "About",
  description:
    "AI Agents First is built by Dustin Gilmour -- someone who actually runs AI agents in production every day, not someone writing about them from the sidelines.",
  alternates: { canonical: `${siteUrl}/about` },
  openGraph: {
    title: "About — AI Agents First",
    description: "Built by someone who actually runs AI agents in production every day.",
    url: `${siteUrl}/about`,
  },
};

export default function AboutPage() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="mx-auto max-w-2xl px-4">
        {/* Photo */}
        <div className="mb-10 flex justify-center">
          <div className="relative h-28 w-28 overflow-hidden rounded-full ring-2 ring-[#45F0FF]/30">
            <Image
              src="/dusty.jpg"
              alt="Dustin Gilmour"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <h1 className="text-center text-3xl font-bold text-text-primary sm:text-4xl">
          Built by someone who actually uses this stuff
        </h1>

        <div className="mt-10 space-y-6 text-base leading-relaxed text-text-secondary">
          <p>
            I'm Dustin Gilmour. I run a multi-brand digital media operation where AI agents
            handle the bulk of the daily work -- content creation, social media, client
            reporting, research, product builds. Not as experiments. As the actual workforce.
          </p>

          <p>
            AI Agents First exists because most AI content falls into two camps: hype pieces
            from people who have never shipped an agent, or documentation so dry it puts you
            to sleep. Neither helps you actually build something that works.
          </p>

          <p>
            Every article here comes from real experience. When I write about deploying a
            multi-agent architecture, it is because I run one. When I cover a tool, it is
            because I have used it in production and have an opinion on whether it is worth
            your time.
          </p>

          <p>
            The goal is simple: give you the clearest, most honest signal on what is actually
            happening in the AI agent space, and show you how to build with it. No filler.
            No recycled press releases. Just the stuff that matters.
          </p>
        </div>

        {/* Links */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm">
          <a
            href="https://www.skool.com/e-com-freedom-amazon-tiktok-4556"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-[#45F0FF]/20 px-5 py-2.5 text-[#45F0FF] transition-colors hover:border-[#45F0FF]/50 hover:bg-[#45F0FF]/5"
          >
            Join the community
          </a>
          <a
            href="https://x.com/aiagentsfirst"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/10 px-5 py-2.5 text-text-secondary transition-colors hover:border-white/25 hover:text-text-primary"
          >
            Follow on X
          </a>
        </div>
      </div>
    </section>
  );
}
