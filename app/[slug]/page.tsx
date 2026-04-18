import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs, getPosts } from "@/lib/content";
import { ArticleLayout } from "@/components/ui/ArticleLayout";

interface Props { params: Promise<{ slug: string }> }

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://aiagentsfirst.com").trim();

function ogImage(title: string, tag?: string): string {
  const params = new URLSearchParams({ title });
  if (tag) params.set("tag", tag);
  return `${siteUrl}/og?${params.toString()}`;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const imageUrl = post.og_image || post.feature_image || ogImage(post.title, post.primary_tag?.name);

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    alternates: { canonical: `${siteUrl}/${slug}` },
    openGraph: {
      title: post.og_title || post.title,
      description: post.og_description || post.excerpt,
      images: [{
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: post.title,
      }],
      type: "article",
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      url: `${siteUrl}/${slug}`,
      authors: ["Dustin Gilmour"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.og_title || post.title,
      description: post.og_description || post.excerpt,
      images: [{
        url: imageUrl,
        alt: post.title,
      }],
      creator: "@aiagentsfirst",
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.og_image || post.feature_image || ogImage(post.title, post.primary_tag?.name),
    datePublished: post.published_at,
    dateModified: post.updated_at,
    url: `${siteUrl}/${slug}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/${slug}` },
    author: {
      "@type": "Person",
      name: "Dustin Gilmour",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "AI Agents First",
      url: siteUrl,
      logo: { "@type": "ImageObject", url: `${siteUrl}/og?title=AI+Agents+First` },
    },
  };

  // Pull enough posts to fuel related + latest rails without a second request
  const { posts: allPosts } = await getPosts({ limit: 40 });
  const otherPosts = allPosts.filter((p) => p.slug !== slug);

  // "Related" = shares the primary tag, falls back to latest
  const primaryTag = post.primary_tag?.slug;
  const related = primaryTag
    ? otherPosts.filter((p) => p.primary_tag?.slug === primaryTag).slice(0, 4)
    : [];
  const latest = otherPosts.slice(0, 5);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <ArticleLayout post={post} related={related} latest={latest} />
    </>
  );
}
