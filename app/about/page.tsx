import type { Metadata } from "next";
import { CommunityCTA } from "@/components/ui/CommunityCTA";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://aiagentsfirst.com").trim();

export const metadata: Metadata = {
  title: "About",
  description:
    "Who's behind the hub, and why it exists. Plain-language AI writing for people who want a real result, from someone figuring it out in the open too.",
  alternates: { canonical: `${siteUrl}/about` },
  openGraph: {
    title: "About",
    description: "Plain-language AI writing for people who want a real result.",
    url: `${siteUrl}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[720px] px-5 sm:px-8 pt-16 pb-12">
      <p className="eyebrow">About</p>
      <h1 className="mt-4 font-display text-[2.4rem] sm:text-[3.2rem] leading-[1.06] tracking-[-0.025em] text-ink font-medium">
        Hi, I'm Dusty.
      </h1>

      <div className="mt-8 article-body">
        <p>
          I started this because most AI content made me feel worse, not better. It was either
          hype from people selling a course, or so technical it may as well have been in another
          language. Neither one helped me actually make anything.
        </p>
        <p>
          So this is the version I wish I'd had. Plain-language walkthroughs for using AI to make
          a bit of money and make things you're proud of. No jargon, no gatekeeping, and no big
          pitch at the end of every paragraph.
        </p>
        <p>
          I'm not writing from a mountaintop. I'm figuring plenty of this out as I go, and I'll
          tell you when something is fiddly or when I'm not sure yet. That honesty is the whole
          point. If a tutorial ends before it earns you anything or makes anything real, it
          wasn't finished.
        </p>
        <p>
          This is for the curious and slightly overwhelmed. The side-hustlers, the nine-to-fivers
          who want a second income or a creative outlet, the people who have poked at a chat tool
          and suspected there was more there. It is not for hardcore engineers who want to read
          about model internals. There are better places for that.
        </p>
        <p>
          Everything here stays free to read. That's not a trick. The writing is the point, and it
          is the best way I know to be useful to a lot of people at once.
        </p>
      </div>

      <div className="mt-14">
        <CommunityCTA variant="about" source="site" />
      </div>
    </div>
  );
}
