import type { MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/cn";

export const mdxComponents: MDXComponents = {
  h1: ({ className, ...rest }) => (
    <h1
      className={cn(
        "font-display text-4xl font-bold text-text mt-12 mb-6",
        className,
      )}
      {...rest}
    />
  ),
  h2: ({ className, ...rest }) => (
    <h2
      className={cn(
        "font-display text-3xl font-semibold text-text mt-12 mb-4 scroll-mt-24",
        className,
      )}
      {...rest}
    />
  ),
  h3: ({ className, ...rest }) => (
    <h3
      className={cn(
        "font-display text-2xl font-semibold text-text mt-10 mb-3 scroll-mt-24",
        className,
      )}
      {...rest}
    />
  ),
  h4: ({ className, ...rest }) => (
    <h4
      className={cn(
        "font-display text-xl font-semibold text-text mt-8 mb-2 scroll-mt-24",
        className,
      )}
      {...rest}
    />
  ),
  p: ({ className, ...rest }) => (
    <p
      className={cn("text-text leading-7 my-5", className)}
      {...rest}
    />
  ),
  a: ({ className, ...rest }) => (
    <a
      className={cn(
        "text-accent underline underline-offset-4 decoration-accent/40 transition-colors hover:text-accent-hover hover:decoration-accent",
        className,
      )}
      {...rest}
    />
  ),
  ul: ({ className, ...rest }) => (
    <ul
      className={cn("list-disc list-outside pl-6 my-5 space-y-2", className)}
      {...rest}
    />
  ),
  ol: ({ className, ...rest }) => (
    <ol
      className={cn(
        "list-decimal list-outside pl-6 my-5 space-y-2",
        className,
      )}
      {...rest}
    />
  ),
  li: ({ className, ...rest }) => (
    <li className={cn("text-text leading-7", className)} {...rest} />
  ),
  blockquote: ({ className, ...rest }) => (
    <blockquote
      className={cn(
        "border-l-2 border-accent pl-5 my-6 text-text-muted italic",
        className,
      )}
      {...rest}
    />
  ),
  hr: ({ className, ...rest }) => (
    <hr className={cn("my-10 border-border", className)} {...rest} />
  ),
  code: ({ className, ...rest }) => (
    <code
      className={cn(
        "font-mono text-[0.9em] rounded bg-elevated/60 px-1.5 py-0.5 text-text",
        className,
      )}
      {...rest}
    />
  ),
  pre: ({ className, ...rest }) => (
    <pre
      className={cn(
        "font-mono text-sm rounded-xl border border-border bg-card overflow-x-auto p-4 my-6",
        "[&_code]:bg-transparent [&_code]:p-0 [&_code]:text-[0.95em]",
        className,
      )}
      {...rest}
    />
  ),
  table: ({ className, ...rest }) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-border">
      <table
        className={cn(
          "w-full border-collapse text-sm",
          className,
        )}
        {...rest}
      />
    </div>
  ),
  th: ({ className, ...rest }) => (
    <th
      className={cn(
        "border-b border-border bg-elevated/40 px-4 py-2 text-left font-semibold text-text",
        className,
      )}
      {...rest}
    />
  ),
  td: ({ className, ...rest }) => (
    <td
      className={cn("border-b border-border px-4 py-2 text-text-muted", className)}
      {...rest}
    />
  ),
  img: ({ alt = "", src, width, height, className, ...rest }) => {
    if (typeof src !== "string") return null;
    return (
      <Image
        src={src}
        alt={alt}
        width={Number(width) || 1200}
        height={Number(height) || 630}
        className={cn("rounded-xl border border-border my-6", className)}
        {...(rest as Omit<ImageProps, "src" | "alt" | "width" | "height">)}
      />
    );
  },
};
