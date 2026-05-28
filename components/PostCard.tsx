import Link from "next/link";
import Image from "next/image";
import { Chip } from "@/components/ui/Chip";
import { cn } from "@/lib/cn";
import type { PostMeta } from "@/lib/posts";

function formatDate(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

type PostCardProps = {
  post: PostMeta;
  className?: string;
};

export function PostCard({ post, className }: PostCardProps) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className={cn(
        "lumi-card group relative flex h-full flex-col overflow-hidden rounded-[14px] border border-border bg-card transition-all duration-200 [transition-timing-function:cubic-bezier(0.42,0,0.58,1)]",
        "hover:-translate-y-1 hover:scale-[1.02] hover:border-accent/40",
        className,
      )}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-elevated to-surface">
        <Image
          src={post.coverImage}
          alt=""
          fill
          className="object-cover transition duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
        <div aria-hidden className="absolute inset-0 bg-black/20" />
        {post.category && (
          <div className="absolute left-4 top-4">
            <Chip variant="accent">{post.category}</Chip>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-lg font-semibold leading-snug text-text transition-colors group-hover:text-accent md:text-xl">
          {post.title}
        </h3>

        {post.description && (
          <p className="line-clamp-3 text-sm text-text-muted">
            {post.description}
          </p>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-2 text-xs text-text-sub">
          <span>{formatDate(post.date)}</span>
          <span aria-hidden>·</span>
          <span>{post.readingTime}</span>
        </div>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <Chip key={tag} className="text-[10px]">
                {tag}
              </Chip>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
