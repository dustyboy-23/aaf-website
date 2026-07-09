import { Metadata } from "next";
import Image from "next/image";
import { SoftCommunityInvite } from "@/components/SoftCommunityInvite";

export const metadata: Metadata = {
  title: "About",
  description:
    "I run my business on AI. Here is what I am learning. Come learn with me.",
};

export default function AboutPage() {
  return (
    <>
      {/* About Header */}
      <section className="pt-32 pb-12 bg-[var(--canvas)]">
        <div className="container-main reading-column">
          <div className="hero-anim" style={{ animationDelay: "100ms" }}>
            <span className="font-mono text-xs font-medium text-[var(--accent)] uppercase tracking-widest block mb-3">
              About
            </span>
            <h1 className="font-display text-[clamp(2rem,4vw,2.75rem)] leading-tight tracking-tight text-[var(--text-primary)]">
              I run my business on AI. Here is what I am learning.
            </h1>
            <p className="mt-4 font-body text-base text-[var(--text-secondary)] leading-relaxed">
              I started this site because I was tired of AI content that felt like a sales pitch. I wanted a place with real tutorials, real numbers, and real failures. So I built it.
            </p>
          </div>
        </div>
      </section>

      {/* Bio / Portrait */}
      <section className="py-16 bg-[var(--surface)] border-t border-[var(--border)]">
        <div className="container-main">
          <div className="reading-column">
            <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 items-start">
              <div className="hero-anim" style={{ animationDelay: "200ms" }}>
                <div className="relative w-[200px] md:w-[280px] aspect-square rounded-xl overflow-hidden bg-[var(--accent-light)] shadow-[0_4px_16px_rgba(0,0,0,0.06)] mx-auto md:mx-0">
                  <Image
                    src="/about-portrait.png"
                    alt="Dustin"
                    fill
                    className="object-cover"
                    sizes="280px"
                  />
                </div>
              </div>
              <div className="hero-anim space-y-6" style={{ animationDelay: "300ms" }}>
                <p className="font-body text-base text-[var(--text-primary)] leading-relaxed">
                  My name is Dustin. I have been running online businesses for about eight years. For the first six, I did everything the hard way: writing every blog post, editing every video, answering every email myself.
                </p>
                <p className="font-body text-base text-[var(--text-primary)] leading-relaxed">
                  Two years ago I started using AI tools to automate the boring parts. At first I wasted a lot of money on tools that did not work. Then I found the ones that actually saved time, and I built workflows around them.
                </p>
                <p className="font-body text-base text-[var(--text-primary)] leading-relaxed">
                  Today I run a small e-commerce business and a content site. AI handles about 60% of the repetitive work. I handle the strategy, the creative decisions, and the parts that still need a human eye.
                </p>
                <p className="font-body text-base text-[var(--text-primary)] leading-relaxed">
                  I am not an AI researcher. I am not a developer. I am a person who uses AI to run a business, and I write about what I learn. Sometimes I get things wrong. When I do, I come back and update the post.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What This Site Is */}
      <section className="py-16 bg-[var(--canvas)] border-t border-[var(--border)]">
        <div className="container-main reading-column">
          <div className="hero-anim" style={{ animationDelay: "100ms" }}>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] leading-tight tracking-tight text-[var(--text-primary)] mb-6">
              What this site is
            </h2>
            <p className="font-body text-base text-[var(--text-primary)] leading-relaxed mb-4">
              A free resource for people who want to use AI to make money or create things. I publish tutorials, tool reviews, and news. Everything is free. There are no ads. There are no affiliate links hidden in every paragraph.
            </p>
            <p className="font-body text-base text-[var(--text-primary)] leading-relaxed mb-4">
              I update articles when tools change. If a tutorial is outdated, I will edit it or remove it. I do not leave broken advice up just to keep the traffic.
            </p>
            <p className="font-body text-base text-[var(--text-primary)] leading-relaxed mb-8">
              The community is free. It is on Skool. People share what they are building, ask questions, and help each other. I am in there most days. If you want to join, you are welcome. If you do not, that is fine too. The site is the main thing.
            </p>
            <SoftCommunityInvite context="homepage" />
          </div>
        </div>
      </section>
    </>
  );
}
