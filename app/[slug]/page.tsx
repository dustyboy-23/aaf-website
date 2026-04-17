import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs, getPosts } from "@/lib/content";
import { ArticleLayout } from "@/components/ui/ArticleLayout";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    openGraph: {
      title: post.og_title || post.title,
      description: post.og_description || post.excerpt,
      images: post.og_image || post.feature_image ? [{ url: (post.og_image || post.feature_image)! }] : [],
      type: "article",
      publishedTime: post.published_at,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  // Pull enough posts to fuel related + latest rails without a second request
  const { posts: allPosts } = await getPosts({ limit: 40 });
  const otherPosts = allPosts.filter((p) => p.slug !== slug);

  // "Related" = shares the primary tag, falls back to latest
  const primaryTag = post.primary_tag?.slug;
  const related = primaryTag
    ? otherPosts.filter((p) => p.primary_tag?.slug === primaryTag).slice(0, 4)
    : [];
  const latest = otherPosts.slice(0, 5);

  return <ArticleLayout post={post} related={related} latest={latest} />;
}
