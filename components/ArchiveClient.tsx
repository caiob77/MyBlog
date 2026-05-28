"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { PostCard } from "@/components/PostCard";
import { cn } from "@/lib/cn";
import type { PostMeta } from "@/lib/posts";

type ArchiveClientProps = {
  posts: PostMeta[];
  categories: string[];
  tags: string[];
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 22 },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { type: "spring", stiffness: 180, damping: 24 },
  },
};

export function ArchiveClient({ posts, categories, tags }: ArchiveClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const reduced = useReducedMotion();

  const category = params.get("category");
  const selectedTags = useMemo(() => new Set(params.getAll("tag")), [params]);
  const query = params.get("q") ?? "";

  const syncUrl = useCallback(
    (next: {
      category?: string | null;
      tags?: Set<string>;
      q?: string;
    }) => {
      const sp = new URLSearchParams();
      const cat = next.category !== undefined ? next.category : category;
      const tgs = next.tags ?? selectedTags;
      const q = next.q !== undefined ? next.q : query;
      if (cat) sp.set("category", cat);
      for (const t of tgs) sp.append("tag", t);
      if (q.trim()) sp.set("q", q.trim());
      const qs = sp.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [category, selectedTags, query, pathname, router],
  );

  function toggleCategory(c: string) {
    const next = category === c ? null : c;
    syncUrl({ category: next });
  }

  function toggleTag(t: string) {
    const next = new Set(selectedTags);
    if (next.has(t)) next.delete(t);
    else next.add(t);
    syncUrl({ tags: next });
  }

  function clearAll() {
    router.replace(pathname, { scroll: false });
  }

  function onSearch(v: string) {
    syncUrl({ q: v });
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (category && p.category !== category) return false;
      if (selectedTags.size > 0) {
        const hasAny = p.tags.some((t) => selectedTags.has(t));
        if (!hasAny) return false;
      }
      if (q) {
        const hay = `${p.title} ${p.description}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [posts, category, selectedTags, query]);

  const hasFilters =
    Boolean(category) || selectedTags.size > 0 || query.trim().length > 0;

  return (
    <div className="space-y-10">
      <div className="space-y-6">
        <div>
          <label htmlFor="archive-search" className="sr-only">
            Buscar artigos
          </label>
          <input
            id="archive-search"
            type="search"
            value={query}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Buscar por título ou descrição…"
            className="w-full rounded-full border border-border bg-elevated/40 px-5 py-3 text-sm text-text placeholder:text-text-sub transition-colors focus:border-accent/60 focus:outline-none"
          />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium uppercase text-text-sub">
            Categorias
          </p>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => {
              const active = category === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => toggleCategory(c)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-medium leading-none transition-colors",
                    active
                      ? "border-accent bg-accent/15 text-accent"
                      : "border-border bg-elevated/40 text-text-muted hover:border-border-strong hover:text-text",
                  )}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium uppercase text-text-sub">
            Tags
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => {
              const active = selectedTags.has(t);
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggleTag(t)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-medium leading-none transition-colors",
                    active
                      ? "border-accent bg-accent/15 text-accent"
                      : "border-border bg-elevated/40 text-text-muted hover:border-border-strong hover:text-text",
                  )}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        {hasFilters && (
          <div className="flex items-center justify-between text-xs text-text-sub">
            <span>
              {filtered.length} {filtered.length === 1 ? "artigo" : "artigos"}
            </span>
            <button
              type="button"
              onClick={clearAll}
              className="text-text-muted transition-colors hover:text-accent"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-[14px] border border-dashed border-border bg-card/50 p-12 text-center">
          <p className="text-text-muted">
            Nenhum artigo encontrado com os filtros atuais.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((post) =>
              reduced ? (
                <PostCard key={post.slug} post={post} />
              ) : (
                <motion.div
                  key={post.slug}
                  layout
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <PostCard post={post} />
                </motion.div>
              ),
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
