import { FC, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { copy } from "../utilities/copy";
import { rules } from "../rules";

type MarkdownProps = {
  content: string;
};

const Markdown: FC<MarkdownProps> = ({ content }) => {
  const ref = useRef<HTMLDivElement>(null);

  /** Builds the markdown based on the content */
  const markdown = useMemo(() => {
    let markdown = (content || "").trim();
    {
      rules.forEach(([rule, template]) => {
        markdown = markdown.replace(rule, template);
      });
    }
    return markdown;
  }, [content]);

  useEffect(() => {
    /** Adds copy callback to code copy markdown sections */
    let buttons: NodeListOf<HTMLButtonElement>;
    if (ref.current) {
      buttons = ref.current.querySelectorAll<HTMLButtonElement>(".code button");
      Array.from(buttons).forEach((btn) => {
        btn.addEventListener("click", copy);
      });
    }
    return function copyCodeButtonCleanup(): void {
      Array.from(buttons).forEach((btn) =>
        btn.removeEventListener("click", copy)
      );
    };
  }, [content]);

  /**
   * Removes empty nodes
   * This could probably be improved so the nodes are not there when
   * converting content to markdown
   */
  useLayoutEffect(() => {
    if (ref.current) {
      const walker = document.createTreeWalker(
        ref.current,
        NodeFilter.SHOW_ELEMENT
      );
      const invalidNodes: HTMLElement[] = [];
      while (walker.nextNode()) {
        if (walker.currentNode instanceof HTMLElement) {
          if (!walker.currentNode.textContent?.length) {
            invalidNodes.push(walker.currentNode);
          }
        }
      }
      invalidNodes.forEach((node) => node.remove());
    }
  }, [content]);

  return (
    <div
      ref={ref}
      className="markdown h-full"
      dangerouslySetInnerHTML={{ __html: markdown }}
    ></div>
  );
};

export { Markdown };
