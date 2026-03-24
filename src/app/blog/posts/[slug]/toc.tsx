"use client";

import { useEffect, useState } from "react";

export interface TOCItem {
  id: string;
  label: string;
}

export function TableOfContents({ items }: { items: TOCItem[] }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-96px 0px -80% 0px" },
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav>
      <p className="text-foreground/40 mb-4 font-mono text-xs font-bold tracking-widest uppercase">
        On this page
      </p>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(item.id)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`block text-sm leading-snug transition-colors duration-150 ${
                activeId === item.id
                  ? "text-foreground font-medium"
                  : "text-foreground/40 hover:text-foreground/60"
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
