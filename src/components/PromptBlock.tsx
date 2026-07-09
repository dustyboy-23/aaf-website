"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface PromptBlockProps {
  prompt: string;
  label?: string;
}

export function PromptBlock({ prompt, label = "Prompt" }: PromptBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <div className="bg-[var(--accent-light)] border border-[var(--accent)] border-l-4 border-l-[var(--accent)] rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2">
          <span className="font-mono text-xs font-medium text-[var(--accent)]">
            {label}
          </span>
          <button
            onClick={handleCopy}
            className="text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors duration-150 p-1"
            aria-label="Copy prompt"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
        <pre className="code-block overflow-x-auto p-5 pt-0">
          <code className="font-mono text-sm text-[var(--text-primary)] leading-relaxed whitespace-pre-wrap">
            {prompt}
          </code>
        </pre>
      </div>
    </div>
  );
}
