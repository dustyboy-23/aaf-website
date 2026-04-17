"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Client-side sticky wrapper for the article side rail.
 *
 * Behavior: the rail scrolls with the article at first so each block passes
 * by as the reader scrolls. Once the rail's bottom reaches the viewport
 * bottom (minus a gutter), it pins — the bottom blocks stay in view while
 * the reader continues through the article.
 *
 * Implementation: computes the sticky `top` anchor as
 * (viewport_height − rail_height − bottom_gutter). Before the user scrolls
 * that far, the rail is in natural flow. When the scroll crosses the
 * anchor, CSS sticky takes over and pins it.
 *
 * On viewports tall enough to fit the whole rail under the nav, falls back
 * to a `top-24` style pin.
 */
export function StickyRail({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const [topOffset, setTopOffset] = useState<string>("96px");

  useEffect(() => {
    const BOTTOM_GUTTER = 32;
    const TOP_GUTTER = 96;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const railHeight = el.offsetHeight;
      const vh = window.innerHeight;
      if (railHeight + TOP_GUTTER + BOTTOM_GUTTER <= vh) {
        setTopOffset(`${TOP_GUTTER}px`);
      } else {
        setTopOffset(`${vh - railHeight - BOTTOM_GUTTER}px`);
      }
    };
    update();
    window.addEventListener("resize", update);
    // Also recompute after fonts/images load in case rail height shifted
    const t = window.setTimeout(update, 400);
    return () => {
      window.removeEventListener("resize", update);
      window.clearTimeout(t);
    };
  }, []);

  return (
    <aside
      ref={ref}
      className="lg:sticky self-start space-y-5"
      style={{ top: topOffset }}
    >
      {children}
    </aside>
  );
}
