import Link from "next/link";
import { cn } from "@/lib/cn";
import type { PostMeta } from "@/lib/posts";

type PostNavProps = {
  prev: PostMeta | null;
  next: PostMeta | null;
};

function NavCard({
  post,
  side,
}: {
  post: PostMeta;
  side: "prev" | "next";
}) {
  const isPrev = side === "prev";
  return (
    <Link
      href={`/posts/${post.slug}`}
      className={cn(
        "group flex flex-col gap-2 rounded-[14px] border border-border bg-card p-5 transition-all duration-300",
        "hover:-translate-y-1 hover:border-border-strong hover:shadow-[var(--shadow-card-hover)]",
        isPrev ? "items-start text-left" : "items-end text-right",
      )}
    >
      <span className="text-xs font-medium uppercase text-text-sub">
        {isPrev ? "← Anterior" : "Próximo →"}
      </span>
      <span className="font-display text-base font-semibold leading-snug text-text transition-colors group-hover:text-accent md:text-lg">
        {post.title}
      </span>
    </Link>
  );
}

export function PostNav({ prev, next }: PostNavProps) {
  if (!prev && !next) return null;
  return (
    <nav
      aria-label="Navegação entre posts"
      className="mt-16 grid grid-cols-1 gap-4 border-t border-border pt-10 md:grid-cols-2"
    >
      {prev ? <NavCard post={prev} side="prev" /> : <div />}
      {next ? <NavCard post={next} side="next" /> : <div />}
    </nav>
  );
}
