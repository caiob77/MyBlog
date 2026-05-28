import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Chip } from "@/components/ui/Chip";
import { MdxContent } from "@/components/mdx/MdxContent";
import { TableOfContents } from "@/components/TableOfContents";
import { PostNav } from "@/components/PostNav";
import {
  getAdjacentPosts,
  getAllPosts,
  getPostBySlug,
  extractHeadings,
} from "@/lib/posts";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  const url = `/posts/${slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    authors: [{ name: "Caio Beniel" }],
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url,
      publishedTime: post.date,
      tags: post.tags,
      authors: ["Caio Beniel"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

function formatDate(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const { prev, next } = await getAdjacentPosts(slug);
  const headings = extractHeadings(post.content);

  return (
    <main className="pb-32 pt-12 md:pt-20">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-16">
          <article className="min-w-0 max-w-3xl">
            <header className="mb-12 space-y-4">
              {post.category && (
                <Eyebrow className="text-accent">{post.category}</Eyebrow>
              )}
              <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-text-sub">
                <span>{formatDate(post.date)}</span>
                <span aria-hidden>·</span>
                <span>{post.readingTime}</span>
              </div>
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {post.tags.map((tag) => (
                    <Chip key={tag}>{tag}</Chip>
                  ))}
                </div>
              )}
            </header>

            <div className="text-text">
              <MdxContent source={post.content} />
            </div>

            <PostNav prev={prev} next={next} />
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents headings={headings} />
            </div>
          </aside>
        </div>
      </Container>
    </main>
  );
}
