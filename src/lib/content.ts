import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

export interface ArticleMeta {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  author: string;
  image: string;
  featured?: boolean;
}

const contentDir = path.join(process.cwd(), "src", "content", "articles");

export function getAllArticles(): ArticleMeta[] {
  if (!fs.existsSync(contentDir)) return [];

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));

  const articles = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(contentDir, file), "utf-8");
    const { data } = matter(raw);
    return {
      slug,
      title: data.title || "",
      excerpt: data.excerpt || "",
      category: data.category || "",
      date: data.date || "",
      readingTime: data.readingTime || "",
      author: data.author || "",
      image: data.image || "",
      featured: data.featured || false,
    } as ArticleMeta;
  });

  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getArticleBySlug(slug: string): {
  meta: ArticleMeta;
  content: string;
} | null {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    meta: {
      slug,
      title: data.title || "",
      excerpt: data.excerpt || "",
      category: data.category || "",
      date: data.date || "",
      readingTime: data.readingTime || "",
      author: data.author || "",
      image: data.image || "",
      featured: data.featured || false,
    },
    content,
  };
}

export function getArticlesByCategory(category: string): ArticleMeta[] {
  return getAllArticles().filter((a) => a.category === category);
}

export function getFeaturedArticle(): ArticleMeta | null {
  const featured = getAllArticles().find((a) => a.featured);
  return featured || getAllArticles()[0] || null;
}

export function getRelatedArticles(
  slug: string,
  category: string,
  limit: number = 3
): ArticleMeta[] {
  return getAllArticles()
    .filter((a) => a.slug !== slug && a.category === category)
    .slice(0, limit);
}
