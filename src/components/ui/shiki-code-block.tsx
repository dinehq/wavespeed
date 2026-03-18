"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import { createHighlighter, type BundledLanguage } from "shiki/bundle/web";

import { cn } from "@/lib/utils";

type ShikiCodeBlockProps = {
  code: string;
  language: string;
  className?: string;
};

const supportedLanguages: BundledLanguage[] = [
  "json",
  "bash",
  "http",
  "javascript",
  "python",
];

const languageAliasMap: Record<string, BundledLanguage | "plaintext"> = {
  js: "javascript",
  node: "javascript",
  shell: "bash",
  sh: "bash",
  text: "plaintext",
};

let highlighterPromise: ReturnType<typeof createHighlighter> | null = null;

function getLanguage(language: string): BundledLanguage | "plaintext" {
  const normalized = language.toLowerCase();
  if (normalized === "plaintext") return "plaintext";
  if (normalized in languageAliasMap) {
    return languageAliasMap[normalized];
  }
  if (supportedLanguages.includes(normalized as BundledLanguage)) {
    return normalized as BundledLanguage;
  }
  return "plaintext";
}

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-light", "github-dark"],
      langs: supportedLanguages,
    });
  }
  return highlighterPromise;
}

export function ShikiCodeBlock({
  code,
  language,
  className,
}: ShikiCodeBlockProps) {
  const { resolvedTheme } = useTheme();
  const [html, setHtml] = useState<string | null>(null);
  const shikiLanguage = useMemo(() => getLanguage(language), [language]);
  const shikiTheme = resolvedTheme === "dark" ? "github-dark" : "github-light";

  useEffect(() => {
    let isMounted = true;

    const highlight = async () => {
      try {
        const highlighter = await getHighlighter();
        const highlighted = highlighter.codeToHtml(code, {
          lang: shikiLanguage,
          theme: shikiTheme,
        });

        if (isMounted) {
          setHtml(highlighted);
        }
      } catch {
        if (isMounted) {
          setHtml(null);
        }
      }
    };

    highlight();

    return () => {
      isMounted = false;
    };
  }, [code, shikiLanguage, shikiTheme]);

  const blockClassName = cn(
    "overflow-auto rounded-xs",
    "[&_pre]:m-0 [&_pre]:!bg-transparent [&_pre]:p-0",
    "[&_pre]:font-mono [&_pre]:text-xs [&_pre]:leading-6",
    "[&_pre]:break-all [&_pre]:whitespace-pre-wrap",
    className,
  );

  if (!html) {
    return (
      <pre className={blockClassName}>
        <code>{code}</code>
      </pre>
    );
  }

  return (
    <div
      className={blockClassName}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
