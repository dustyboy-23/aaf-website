"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { PILLARS } from "@/lib/site";

/**
 * The site's signature element: the four content pillars set as a numbered
 * curriculum index (01 -> 04 is a real learning order, not decoration). This
 * is the ONE place motion lives on the page — a quiet staggered reveal on
 * scroll, disabled under prefers-reduced-motion.
 */
export function PillarIndex() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="divide-y divide-hairline border-y border-hairline">
      {PILLARS.map((p, i) => (
        <Link
          key={p.slug}
          href={`/articles/topic/${p.slug}`}
          className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-5 sm:gap-8 py-7 sm:py-9 transition-[opacity,transform] duration-700 ease-out"
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? "translateY(0)" : "translateY(14px)",
            transitionDelay: `${i * 90}ms`,
          }}
        >
          <span className="index-num text-[0.8rem] text-ink-mute pt-2">
            {String(p.order).padStart(2, "0")}
          </span>
          <span>
            <span className="block font-display text-[1.9rem] sm:text-[2.5rem] leading-[1.05] tracking-[-0.02em] text-ink font-medium transition-colors group-hover:text-accent-ink">
              {p.label}
            </span>
            <span className="mt-2 block font-serif text-[1.05rem] leading-relaxed text-ink-soft max-w-xl">
              {p.tagline}
            </span>
          </span>
          <ArrowUpRight
            size={22}
            strokeWidth={1.75}
            className="text-ink-mute transition-[color,transform] group-hover:text-accent-ink group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      ))}
    </div>
  );
}
