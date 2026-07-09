"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { CodeBlock } from "./CodeBlock";
import { PromptBlock } from "./PromptBlock";
import { Figure } from "./Figure";
import { SoftCommunityInvite } from "./SoftCommunityInvite";

interface MdxContentProps {
  source: MDXRemoteSerializeResult;
}

const components = {
  CodeBlock,
  PromptBlock,
  Figure,
  SoftCommunityInvite,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] leading-tight tracking-tight text-[var(--text-primary)] mt-10 mb-4" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="font-body text-xl font-medium leading-snug text-[var(--text-primary)] mt-8 mb-3" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="font-body text-base leading-relaxed text-[var(--text-primary)] mb-6" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc pl-6 mb-6 space-y-2" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal pl-6 mb-6 space-y-2" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="font-body text-base leading-relaxed text-[var(--text-primary)]" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-medium text-[var(--text-primary)]" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-[var(--accent)] underline underline-offset-2 hover:text-[var(--accent-hover)] transition-colors duration-150" {...props} />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-8">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-[var(--border-light)]" {...props} />
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="font-body font-medium text-[var(--text-primary)] text-left px-4 py-3 border border-[var(--border)]" {...props} />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="font-body text-[var(--text-primary)] px-4 py-3 border border-[var(--border)]" {...props} />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="border-b border-[var(--border)] hover:bg-[var(--border-light)] transition-colors" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-[var(--accent)] bg-[var(--accent-light)] pl-5 py-4 pr-4 my-8 rounded-r-lg" {...props} />
  ),
};

export function MdxContent({ source }: MdxContentProps) {
  return <MDXRemote {...source} components={components} />;
}
