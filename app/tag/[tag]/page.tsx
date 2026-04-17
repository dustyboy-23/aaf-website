import type { Metadata } from "next";
import { getPostsByTag, getTags } from "@/lib/content";
import { ContentList } from "@/components/ui/ContentList";

interface Props { params: Promise<{ tag: string }> }

export async function generateStaticParams() {
  const tags = await getTags();
  return tags.map((tag) => ({ tag: tag.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `${tag.charAt(0).toUpperCase() + tag.slice(1)} Articles`,
    description: `All articles tagged "${tag}" on AI Agents First.`,
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const { posts } = await getPostsByTag(tag, { limit: 30 });
  const displayName = tag.charAt(0).toUpperCase() + tag.slice(1);
  return <ContentList posts={posts} title={displayName} description={`all articles tagged "${tag}"`} />;
}
