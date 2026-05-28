import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArchiveClient } from "@/components/ArchiveClient";
import { getAllCategories, getAllPosts, getAllTags } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Archive",
  description: "Todos os artigos do blog, filtráveis por categoria e tag.",
  alternates: { canonical: "/archive" },
};

export default async function ArchivePage() {
  const [posts, categories, tags] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
    getAllTags(),
  ]);

  return (
    <main className="pb-32 pt-16 md:pt-24">
      <Container>
        <header className="mb-12 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,1fr)] lg:items-end">
          <div className="space-y-3">
            <Eyebrow>Archive</Eyebrow>
            <h1 className="font-display text-4xl font-bold md:text-5xl">
              Todos os artigos
            </h1>
            <p className="max-w-2xl text-text-muted">
              {posts.length} {posts.length === 1 ? "artigo publicado" : "artigos publicados"}.
              Filtre por categoria, tag ou busque por título.
            </p>
          </div>

          <div className="relative aspect-[21/9] overflow-hidden rounded-[18px] border border-border bg-card shadow-[var(--shadow-card)]">
            <Image
              src="/images/pages/archive-header.webp"
              alt=""
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div aria-hidden className="absolute inset-0 bg-black/10" />
          </div>
        </header>

        <Suspense fallback={null}>
          <ArchiveClient posts={posts} categories={categories} tags={tags} />
        </Suspense>
      </Container>
    </main>
  );
}
