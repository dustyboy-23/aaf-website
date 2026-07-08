"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!heroRef.current) return;
    let cleanup: (() => void) | undefined;
    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        const trigger = ScrollTrigger.create({
          trigger: heroRef.current!,
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => setScrollProgress(self.progress),
        });
        cleanup = () => trigger.kill();
      });
    });
    return () => cleanup?.();
  }, []);

  const fadeOpacity = Math.max(0, 1 - scrollProgress * 1.5);

  return (
    <section ref={heroRef} className="relative h-[65vh] min-h-[480px] overflow-hidden">
      <div className="absolute inset-0 z-0" style={{ opacity: fadeOpacity }}>
        <Image
          src="/hero/hero-bg.webp"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={85}
        />
        <div className="absolute inset-0 bg-surface/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/70 to-transparent" />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-accent mb-4">
          Intelligence Hub
        </p>
        <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-black tracking-[-0.04em] leading-[0.95] text-white">
          AI Agents First
        </h1>
        <p className="mt-4 text-base sm:text-lg text-text-secondary max-w-lg leading-relaxed">
          News, tutorials, tools, and deep analysis from the AI agent frontier.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <Link
            href="#featured"
            className="px-7 py-3 rounded-lg bg-accent text-surface font-semibold text-sm hover:bg-accent/90 transition-colors"
          >
            Explore articles
          </Link>
          <Link
            href="/signal"
            className="px-7 py-3 rounded-lg border border-border text-text-primary text-sm font-medium hover:border-border-hover hover:bg-surface-overlay transition-colors"
          >
            Daily signal
          </Link>
        </div>
      </div>
    </section>
  );
}
