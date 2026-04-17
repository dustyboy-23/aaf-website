/**
 * Server-side transforms applied to the raw article HTML before it gets
 * handed to dangerouslySetInnerHTML.
 *
 * We don't run a full HTML parser here — the posts are authored HTML in
 * MDX with a known tag vocabulary, so regex-level transforms are both
 * sufficient and predictable.
 */

/**
 * Split the article HTML at the opening tag of the 2nd <h2>. Used to inject
 * a mid-article inline promo between the first and second main sections.
 * If there are fewer than 2 h2s, returns the full html as `before` and an
 * empty string as `after` (caller can decide whether to render a promo).
 */
export function splitAtSecondH2(html: string): [string, string] {
  const h2Matches: number[] = [];
  const re = /<h2\b/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    h2Matches.push(m.index);
    if (h2Matches.length >= 2) break;
  }
  if (h2Matches.length < 2) return [html, ""];
  const splitPoint = h2Matches[1];
  return [html.slice(0, splitPoint), html.slice(splitPoint)];
}

/**
 * Transform a FAQ section into a native <details>/<summary> accordion.
 *
 * Detects an <h2> whose text contains "FAQ", "Frequently Asked", or
 * "Common Questions" (case-insensitive), and wraps every following h3
 * (until the next h2 or end of doc) together with its following siblings
 * in a <details> block with the h3 promoted to <summary>.
 *
 * Native <details> gives us zero-JS accordion behavior that works with
 * SSR, hydration, reduced-motion, and keyboard navigation for free.
 */
export function transformFaq(html: string): string {
  // Find FAQ h2
  const faqH2Re =
    /<h2\b[^>]*>\s*(?:[^<]*?\b(?:FAQ|Frequently\s+Asked|Common\s+Questions)\b[^<]*?)<\/h2>/i;
  const faqMatch = faqH2Re.exec(html);
  if (!faqMatch) return html;

  const faqStart = faqMatch.index + faqMatch[0].length;

  // FAQ section ends at the next <h2 or end of html
  const rest = html.slice(faqStart);
  const nextH2 = /<h2\b/i.exec(rest);
  const faqEnd = nextH2 ? faqStart + nextH2.index : html.length;

  const faqSection = html.slice(faqStart, faqEnd);
  const before = html.slice(0, faqStart);
  const after = html.slice(faqEnd);

  // Split FAQ section into (h3 + following content) pairs.
  // Each h3 opens a new question, and everything up to the next h3 is its answer.
  const h3Re = /<h3\b[^>]*>([\s\S]*?)<\/h3>/gi;
  const h3Positions: Array<{ start: number; end: number; inner: string }> = [];
  let h3m: RegExpExecArray | null;
  while ((h3m = h3Re.exec(faqSection)) !== null) {
    h3Positions.push({
      start: h3m.index,
      end: h3m.index + h3m[0].length,
      inner: h3m[1],
    });
  }
  if (h3Positions.length === 0) return html;

  // Content that sits BEFORE the first h3 inside the FAQ section — leave alone
  const leadIn = faqSection.slice(0, h3Positions[0].start);

  let rebuilt = leadIn;
  for (let i = 0; i < h3Positions.length; i++) {
    const cur = h3Positions[i];
    const next = h3Positions[i + 1];
    const answerEnd = next ? next.start : faqSection.length;
    const answerHtml = faqSection.slice(cur.end, answerEnd).trim();
    rebuilt +=
      `<details class="faq-item">` +
      `<summary>${cur.inner}</summary>` +
      `<div class="faq-answer">${answerHtml}</div>` +
      `</details>`;
  }

  return before + rebuilt + after;
}

/**
 * Strip the leading <h1> from article body HTML.
 *
 * Ghost exports (and most CMS imports) embed the post title as an <h1> at the
 * top of the body. We already render the title in the article hero, so showing
 * it again inside the body is pure duplication. Remove it.
 *
 * Only strips an <h1> that appears before any other content — trailing
 * whitespace is tolerated. An <h1> that sits mid-article (very rare) is left
 * alone.
 */
export function stripLeadingH1(html: string): string {
  return html.replace(/^\s*<h1\b[^>]*>[\s\S]*?<\/h1>\s*/i, "");
}

/**
 * Convenience composition — run every transform we apply site-wide.
 */
export function processArticleHtml(html: string): string {
  return transformFaq(stripLeadingH1(html));
}
