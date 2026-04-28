import { cn } from "@/lib/cn";

/**
 * Renders a pre-built HTML string from the markdown pipeline inside a Tailwind Typography
 * `prose` container.
 */
export function Markdown({
  html,
  className,
}: {
  html: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "prose prose-zinc max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-h2:mb-3 prose-h3:mb-2 prose-p:leading-relaxed prose-li:leading-relaxed prose-a:text-[var(--color-info)] prose-a:no-underline hover:prose-a:underline",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
