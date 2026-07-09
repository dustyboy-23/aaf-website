import { CategoryPageTemplate } from "@/components/CategoryPageTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create With AI",
  description:
    "Images, video, writing, design. Prompts, workflows, and how to make it look like you made it.",
};

export default function CreatePage() {
  return (
    <CategoryPageTemplate
      category="Create With AI"
      title="Create With AI"
      description="Images, video, writing, design. Prompts, workflows, and how to make it look like you made it. The tools change fast. These tutorials stay current."
    />
  );
}
