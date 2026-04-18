import type { Metadata } from "next";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://aiagentsfirst.com").trim();

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for AI Agents First.",
  alternates: { canonical: `${siteUrl}/terms` },
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-16 text-text-secondary">
      <h1 className="mb-8 text-3xl font-bold text-text-primary">Terms of Use</h1>
      <p className="mb-2 text-sm text-text-tertiary">Last updated: April 18, 2026</p>

      <section className="mt-8 space-y-6 text-sm leading-relaxed">
        <div>
          <h2 className="mb-2 text-lg font-semibold text-text-primary">Content</h2>
          <p>
            All articles, guides, and resources on AI Agents First are published for informational
            and educational purposes. We do our best to keep things accurate, but technology moves
            fast. Nothing here constitutes professional, legal, or financial advice.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold text-text-primary">Use of this site</h2>
          <p>
            You are welcome to read, share, and link to our content. You may not scrape the site
            in bulk, republish full articles without permission, or use our content to train
            commercial AI models without explicit consent.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold text-text-primary">Newsletter</h2>
          <p>
            By subscribing to our newsletter, you agree to receive periodic emails from us. You
            can unsubscribe at any time by replying to any email or contacting us directly.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold text-text-primary">External links</h2>
          <p>
            We link to third-party tools, products, and resources. Some may be affiliate links. We
            only recommend things we actually use or believe in. We are not responsible for the
            content or practices of external sites.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold text-text-primary">Changes</h2>
          <p>
            We may update these terms as needed. Continued use of the site means you accept the
            current version.
          </p>
        </div>
      </section>
    </article>
  );
}
