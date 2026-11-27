import type { ReactNode } from "react";

function renderInline(text: string): ReactNode[] {
  const parts = text.split(
    /(\[[^\]]+\]\((?:https?:\/\/|\/(?!\/))[^)]+\)|\*\*[^*]+\*\*|`[^`]+`)/g
  );

  return parts.map((part, index) => {
    const linkMatch = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+|\/(?!\/)[^)]+)\)$/);
    if (linkMatch) {
      return (
        <a
          key={index}
          href={linkMatch[2]}
          className="text-brand-light underline decoration-brand/40 underline-offset-4 transition hover:text-brand"
        >
          {linkMatch[1]}
        </a>
      );
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={index}
          className="rounded bg-white/10 px-1.5 py-0.5 text-sm text-brand-light"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

export function BlogMarkdown({ content }: { content: string }) {
  const blocks = content.trim().split(/\n\s*\n/);

  return (
    <div className="space-y-5 text-base leading-relaxed text-muted">
      {blocks.map((block, index) => {
        const lines = block.split("\n").map((line) => line.trim());
        const firstLine = lines[0] ?? "";
        const headingMatch = firstLine.match(/^(#{2,3})\s+(.+)$/);

        if (headingMatch) {
          return (
            <section key={index} className="space-y-4">
              {headingMatch[1].length === 2 ? (
                <h2 className="text-2xl font-bold text-white">
                  {renderInline(headingMatch[2])}
                </h2>
              ) : (
                <h3 className="text-xl font-semibold text-white">
                  {renderInline(headingMatch[2])}
                </h3>
              )}
              {lines.slice(1).length > 0 && (
                <p>{renderInline(lines.slice(1).join(" "))}</p>
              )}
            </section>
          );
        }

        if (lines.every((line) => /^[-*]\s+/.test(line))) {
          return (
            <ul
              key={index}
              className="list-disc space-y-2 pl-6 marker:text-brand-light"
            >
              {lines.map((line) => (
                <li key={line}>{renderInline(line.replace(/^[-*]\s+/, ""))}</li>
              ))}
            </ul>
          );
        }

        return <p key={index}>{renderInline(lines.join(" "))}</p>;
      })}
    </div>
  );
}
