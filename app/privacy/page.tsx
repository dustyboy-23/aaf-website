import type { Metadata } from "next";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://aiagentsfirst.com").trim();

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How AI Agents First handles your data.",
  alternates: { canonical: `${siteUrl}/privacy` },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-16 text-text-secondary">
      <h1 className="mb-8 text-3xl font-bold text-text-primary">Privacy Policy</h1>
      <p className="mb-2 text-sm text-text-tertiary">Last updated: April 18, 2026</p>

      <section className="mt-8 space-y-6 text-sm leading-relaxed">
        <div>
          <h2 className="mb-2 text-lg font-semibold text-text-primary">What we collect</h2>
          <p>
            If you subscribe to our newsletter, we store your email address for the sole purpose of
            sending you updates. We use Vercel Analytics for anonymous, cookie-free page view
            tracking. No personal data is collected through analytics.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold text-text-primary">Cookies</h2>
          <p>
            We do not use tracking cookies. Vercel Analytics is privacy-focused and does not set
            any cookies or collect personally identifiable information.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold text-text-primary">Third-party services</h2>
          <p>
            Our site is hosted on Vercel. Content is delivered via their global CDN. We use Google
            Fonts for typography. No other third-party services have access to your data.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold text-text-primary">Your data</h2>
          <p>
            Want your email removed from our newsletter list? Reply to any email we send or
            contact us directly. We will remove it within 48 hours.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold text-text-primary">Changes</h2>
          <p>
            If we make meaningful changes to this policy, we will update the date at the top of
            this page.
          </p>
        </div>
      </section>
    </article>
  );
}
