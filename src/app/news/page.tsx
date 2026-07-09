import { CategoryPageTemplate } from "@/components/CategoryPageTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI News",
  description:
    "What matters, what does not, and what you should actually do about it.",
};

export default function NewsPage() {
  return (
    <CategoryPageTemplate
      category="AI News"
      title="AI News"
      description="What matters, what does not, and what you should actually do about it. I read the papers and the press releases so you can focus on building."
    />
  );
}
