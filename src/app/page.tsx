import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Wrench, DollarSign, Palette, Newspaper } from "lucide-react";
import { ArticleCard } from "@/components/ArticleCard";
import { SectionHeader } from "@/components/SectionHeader";
import { SoftCommunityInvite } from "@/components/SoftCommunityInvite";
import { getAllArticles, getFeaturedArticle } from "@/lib/content";

const categories = [
  {
    href: "/tools",
    label: "AI Tools",
    description: "Honest reviews, real workflows, and what is worth paying for.",
    icon: Wrench,
    iconBg: "#EFF6FF",
    iconColor: "#2563EB",
    count: "Reviews",
  },
  {
    href: "/make-money",
    label: "Make Money",
    description: "Actual income strategies I have tried. Real numbers, honest breakdowns.",
    icon: DollarSign,
    iconBg: "#ECFDF5",
    iconColor: "#059669",
    count: "Strategies",
  },
  {
    href: "/create",
    label: "Create",
    description: "Images, video, writing, design. Prompts and workflows that work.",
    icon: Palette,
    iconBg: "#FDF4FF",
    iconColor: "#9333EA",
    count: "Tutorials",
  },
  {
    href: "/news",
    label: "AI News",
    description: "What matters, what does not, and what you should actually do about it.",
    icon: Newspaper,
    iconBg: "#FFF7ED",
    iconColor: "#EA580C",
    count: "Updates",
  },
];

export default function HomePage() {
  const allArticles = getAllArticles();
  const featured = getFeaturedArticle();
  const latestArticles = allArticles.filter((a) => a.slug !== featured?.slug).slice(0, 6);

  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative min-h-[100dvh] flex items-center bg-[var(--canvas)] overflow-hidden">
        {/* Subtle warm gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F2] via-[var(--canvas)] to-[var(--canvas)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,223,139,0.08)_0%,_transparent_50%)]" />
        
        <div className="relative z-10 container-main w-full pt-32 pb-20 md:pt-28 md:pb-24">
          <div className="max-w-[720px]">
            <span className="hero-label inline-block font-mono text-[0.6875rem] font-medium text-[var(--accent)] uppercase tracking-[0.15em] mb-5">
              Free AI resource
            </span>
            <h1 className="hero-title font-display text-[clamp(2.75rem,6vw,4.25rem)] leading-[1.08] tracking-[-0.03em] text-[var(--text-primary)]">
              I test AI tools and write down what actually works.
            </h1>
            <p className="hero-subtitle mt-6 font-body text-[1.125rem] md:text-[1.25rem] text-[var(--text-secondary)] leading-relaxed max-w-xl">
              No courses to sell. No guru nonsense. Just tutorials, tool breakdowns, and news you can use.
            </p>
            <div className="hero-cta mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="#latest"
                className="inline-flex items-center gap-2 bg-[var(--accent)] text-white rounded-full px-8 py-3.5 text-[15px] font-semibold hover:bg-[var(--accent-hover)] transition-colors duration-300 shadow-[0_4px_14px_rgba(37,99,235,0.25)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.35)]"
              >
                Start reading
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 border border-[var(--accent)] text-[var(--accent)] rounded-full px-8 py-3.5 text-[15px] font-medium hover:bg-[var(--accent-light)] transition-colors duration-300"
              >
                Browse tools
              </Link>
            </div>
          </div>
          
          {/* Featured article preview below hero text */}
          {featured && (
            <div className="hero-image mt-16 md:mt-20">
              <Link href={`/articles/${featured.slug}`} className="group block">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Image */}
                  <div className="lg:col-span-7">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[var(--border-light)] shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                      <Image
                        src={featured.image}
                        alt={featured.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        priority
                        sizes="(max-width: 1024px) 100vw, 60vw"
                      />
                    </div>
                  </div>
                  {/* Text */}
                  <div className="lg:col-span-5">
                    <span className="font-mono text-[0.6875rem] font-medium text-[var(--accent)] uppercase tracking-[0.12em] mb-4 block">
                      Featured
                    </span>
                    <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-tight text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-200">
                      {featured.title}
                    </h2>
                    <p className="mt-4 font-body text-[1.0625rem] text-[var(--text-secondary)] leading-relaxed">
                      {featured.excerpt}
                    </p>
                    <div className="mt-5 flex items-center gap-3">
                      <span className="font-mono text-[0.6875rem] text-[var(--text-muted)]">
                        {featured.date}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]" />
                      <span className="font-mono text-[0.6875rem] text-[var(--text-muted)]">
                        {featured.readingTime}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ========== LATEST CONTENT ========== */}
      <section id="latest" className="py-20 md:py-28 bg-[var(--canvas)]">
        <div className="container-main">
          <div className="section-fade">
            <SectionHeader
              eyebrow="Latest"
              title="What I am working on"
              subtitle="Tutorials, breakdowns, and news. Updated when I find something worth sharing."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {latestArticles.map((article, i) => (
              <ArticleCard key={article.slug} {...article} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== DIVIDER ========== */}
      <div className="section-divider" />

      {/* ========== CATEGORIES ========== */}
      <section className="py-20 md:py-28 bg-[var(--canvas)]">
        <div className="container-main">
          <div className="section-fade">
            <SectionHeader
              eyebrow="Topics"
              title="Browse by topic"
              subtitle="Pick what you are interested in. Everything is free."
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((cat, i) => (
              <div
                key={cat.href}
                className="article-card-enter"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <Link
                  href={cat.href}
                  className="group block bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(0,0,0,0.1)] hover:border-[var(--accent-light)]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: cat.iconBg }}
                    >
                      <cat.icon className="w-5 h-5" style={{ color: cat.iconColor }} />
                    </div>
                    <span className="font-mono text-[0.6875rem] text-[var(--text-muted)]">
                      {cat.count}
                    </span>
                  </div>
                  <h3 className="font-body text-[1.125rem] font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-200 mb-2">
                    {cat.label}
                  </h3>
                  <p className="font-body text-[0.9375rem] text-[var(--text-secondary)] leading-relaxed mb-4">
                    {cat.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 font-body text-[0.875rem] font-medium text-[var(--accent)] group-hover:underline underline-offset-4">
                    Explore
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== COMMUNITY STRIP ========== */}
      <section className="py-16 md:py-20 bg-[var(--surface)] border-t border-[var(--border)]">
        <div className="container-main max-w-2xl">
          <SoftCommunityInvite context="homepage" />
        </div>
      </section>
    </>
  );
}
