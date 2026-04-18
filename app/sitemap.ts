import type { MetadataRoute } from "next";
import { getPosts, getTags } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://aiagentsfirst.com";

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/news`, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/playbook`, changeFrequency: "monthly", priority: 0.8 },
  ];

  const { posts } = await getPosts({ limit: 1000 });
  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const tags = await getTags();
  const tagPages: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${baseUrl}/tag/${tag.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...postPages, ...tagPages];
}
