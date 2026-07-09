import { CategoryPageTemplate } from "@/components/CategoryPageTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Make Money With AI",
  description:
    "Actual income strategies I have tried. Some worked. Some did not. I will tell you both.",
};

export default function MakeMoneyPage() {
  return (
    <CategoryPageTemplate
      category="Make Money"
      title="Make Money With AI"
      description="Actual income strategies I have tried. Some worked. Some did not. I will tell you both. No get-rich-quick promises. Just real numbers and honest breakdowns."
    />
  );
}
