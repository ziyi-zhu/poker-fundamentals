"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export function CopyMarkdownButton({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  async function handleCopy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(content);
      } else {
        // Fallback for non-secure contexts where the async clipboard API is unavailable.
        const textarea = document.createElement("textarea");
        textarea.value = content;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      console.error("Copy failed", err);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Lesson markdown copied" : "Copy lesson markdown"}
      title={copied ? "Copied" : "Copy markdown"}
      className={cn(
        "inline-flex h-8 flex-none items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 text-xs font-medium text-[var(--color-muted)] transition-colors hover:border-[var(--color-border-strong)] hover:text-[var(--color-foreground)]",
        className,
      )}
    >
      {copied ? (
        <>
          <svg
            viewBox="0 0 16 16"
            width="13"
            height="13"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            aria-hidden="true"
            className="text-[var(--color-accent)]"
          >
            <path d="M2.5 8.5l3.5 3.5L13.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Copied</span>
        </>
      ) : (
        <>
          <svg
            viewBox="0 0 16 16"
            width="13"
            height="13"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <rect x="5.25" y="2.25" width="8.5" height="10.5" rx="1.5" />
            <path d="M10.75 13.75H3.5a1.25 1.25 0 0 1-1.25-1.25V4.25" strokeLinecap="round" />
          </svg>
          <span>Copy</span>
        </>
      )}
    </button>
  );
}
