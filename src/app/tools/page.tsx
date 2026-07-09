import { CategoryPageTemplate } from "@/components/CategoryPageTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Tools",
  description:
    "I test the tools so you do not have to. Honest reviews, real workflows, and what is worth paying for.",
};

export default function ToolsPage() {
  return (
    <CategoryPageTemplate
      category="AI Tools"
      title="AI Tools"
      description="I test the tools so you do not have to. Honest reviews, real workflows, and what is worth paying for. Updated when I find something that actually works."
    />
  );
}
