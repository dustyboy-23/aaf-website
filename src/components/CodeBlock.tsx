"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <div className="bg-[var(--code-bg)] border border-[var(--border)] rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--border)] bg-[var(--surface)]">
          {language && (
            <span className="font-mono text-xs text-[var(--text-muted)]">
              {language}
            </span>
          )}
          <button
            onClick={handleCopy}
            className="ml-auto text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-150 p-1"
            aria-label="Copy code"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
        <pre className="code-block overflow-x-auto p-5">
          <code className="font-mono text-sm text-[var(--code-text)] leading-relaxed">
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
}
