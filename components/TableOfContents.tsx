"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { Heading } from "@/lib/posts";

type TableOfContentsProps = {
  headings: Heading[];
  articleSelector?: string;
};

export function TableOfContents({
  headings,
  articleSelector = "article",
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const article = document.querySelector(articleSelector);
    if (!article) return;

    const nodes = headings
      .map((h) => document.getElementById(h.id))
      .filter(
        (node): node is HTMLElement => Boolean(node) && article.contains(node),
      );
    if (nodes.length === 0) return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e.intersectionRatio);
          else visible.delete(e.target.id);
        }
        if (visible.size > 0) {
          const topId = [...visible.entries()].sort(
            (a, b) =>
              nodes.findIndex((n) => n.id === a[0]) -
              nodes.findIndex((n) => n.id === b[0]),
          )[0][0];
          setActiveId(topId);
        } else {
          const scrollY = window.scrollY;
          let current: string | null = null;
          for (const n of nodes) {
            if (n.offsetTop - 120 <= scrollY) current = n.id;
            else break;
          }
          if (current) setActiveId(current);
        }
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    nodes.forEach((n) => observer.observe(n));
    observerRef.current = observer;

    return () => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, [articleSelector, headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Tabela de conteúdos" className="text-sm">
      <p className="mb-4 text-xs font-medium uppercase text-text-sub">
        Nesta página
      </p>
      <ul className="space-y-2 border-l border-border">
        {headings.map((h) => {
          const active = h.id === activeId;
          return (
            <li key={h.id} className={cn(h.level === 3 && "pl-3")}>
              <a
                href={`#${h.id}`}
                className={cn(
                  "block border-l-2 -ml-px py-1 pl-4 text-xs leading-snug transition-colors",
                  active
                    ? "border-accent text-accent"
                    : "border-transparent text-text-muted hover:text-text",
                )}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
