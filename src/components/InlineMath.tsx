import katex from "katex";

/**
 * Lightweight inline-math renderer for short strings inside quizzes.
 *
 * The text may contain inline math wrapped in single dollars, e.g.
 *   "Required equity is $C / (P + C)$ on the call."
 *
 * Block math (`$$ ... $$`) is intentionally not supported here — keep quizzes terse.
 */
export function InlineMath({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  const regex = /\$([^$\n]+?)\$/g;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<span key={`t-${key++}`}>{text.slice(lastIndex, match.index)}</span>);
    }
    const html = katex.renderToString(match[1], {
      throwOnError: false,
      strict: "ignore",
      output: "html",
    });
    parts.push(
      <span
        key={`m-${key++}`}
        className="katex-inline"
        dangerouslySetInnerHTML={{ __html: html }}
      />,
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(<span key={`t-${key++}`}>{text.slice(lastIndex)}</span>);
  }
  return <>{parts}</>;
}
