"use client";

import Image from "next/image";
import Link from "next/link";

export function MobileHero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      <Image
        src="/hero/hero-bg.webp"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
        quality={85}
      />
      <div className="absolute inset-0 bg-surface/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent" />

      <div className="relative z-10">
        <h1 className="text-[clamp(3rem,8vw,6.5rem)] font-black tracking-[-0.04em] leading-[0.95] text-white">
          AI Agents First
        </h1>
        <p className="mt-5 text-base sm:text-lg text-text-secondary max-w-md mx-auto">
          The intelligence hub for the agent era.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <Link
            href="#feed"
            className="px-7 py-3 rounded-lg bg-accent text-surface font-semibold text-sm hover:bg-accent/90 transition-colors"
          >
            Read the feed
          </Link>
          <Link
            href="/#newsletter"
            className="px-7 py-3 rounded-lg border border-border text-text-primary text-sm font-medium hover:border-border-hover hover:bg-surface-overlay transition-colors"
          >
            Get the daily
          </Link>
        </div>
      </div>
    </section>
  );
}
