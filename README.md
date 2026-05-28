# BENIEL - Blog Pessoal

Blog pessoal de Caio Beniel sobre desenvolvimento de software, arquitetura,
performance e fundamentos de tecnologia. O projeto usa Next.js App Router,
conteudo em MDX, animacoes com Motion e uma camada propria para posts, SEO,
RSS, sitemap e imagens Open Graph dinamicas.

Visual inspirado em [Obsidianite](https://obsidianite.framer.website/).

## Sumario

- [Stack](#stack)
- [Funcionalidades](#funcionalidades)
- [Como rodar](#como-rodar)
- [Scripts](#scripts)
- [Estrutura](#estrutura)
- [Conteudo](#conteudo)
- [SEO e feeds](#seo-e-feeds)
- [Design](#design)
- [Deploy](#deploy)

## Stack

| Camada | Tecnologia |
| --- | --- |
| Framework | Next.js 16 com App Router |
| UI | React 19 + TypeScript |
| Estilo | Tailwind CSS v4 + `@tailwindcss/typography` |
| Animacao | Motion |
| Conteudo | MDX com `next-mdx-remote` em Server Components |
| Markdown | `remark-gfm`, `rehype-slug`, `rehype-autolink-headings`, `rehype-pretty-code` |
| Highlight | Shiki |
| Frontmatter | `gray-matter` + `reading-time` |
| Icones | `lucide-react` |
| Package manager | pnpm |

## Funcionalidades

- Home com apresentacao, links sociais, ultimos posts e projetos em destaque.
- Posts em MDX com frontmatter, tempo de leitura e syntax highlighting.
- Pagina individual de post com sumario lateral, navegacao anterior/proximo e metadata propria.
- Arquivo de posts com filtros por categoria, tag e busca.
- Pagina de projetos baseada em `content/projects.ts`.
- Feed RSS em `/rss.xml`.
- Sitemap em `/sitemap.xml` e robots em `/robots.txt`.
- Imagem Open Graph dinamica por post em `/posts/<slug>/opengraph-image`.
- Respeito a `prefers-reduced-motion` nos componentes animados.

## Como Rodar

Requisitos:

- Node.js 20 ou superior.
- pnpm instalado.

Instale as dependencias:

```bash
pnpm install
```

Rode o servidor de desenvolvimento:

```bash
pnpm dev
```

Abra `http://localhost:3000`.

## Scripts

```bash
pnpm dev      # inicia o Next.js em desenvolvimento
pnpm build    # gera o build de producao
pnpm start    # serve o build de producao
pnpm lint     # executa o ESLint
```

## Estrutura

```text
Blog2/
├── app/
│   ├── layout.tsx              # layout raiz, fontes e metadata global
│   ├── page.tsx                # home
│   ├── template.tsx            # transicao entre paginas
│   ├── globals.css             # tokens, base visual e utilitarios globais
│   ├── about/page.tsx          # pagina sobre
│   ├── archive/page.tsx        # arquivo de posts
│   ├── projects/page.tsx       # lista de projetos
│   ├── posts/[slug]/
│   │   ├── page.tsx            # post individual
│   │   └── opengraph-image.tsx # imagem OG dinamica
│   ├── rss.xml/route.ts        # feed RSS
│   ├── sitemap.ts              # sitemap
│   └── robots.ts               # robots.txt
├── components/
│   ├── mdx/                    # renderizacao e overrides MDX
│   ├── ui/                     # primitivos de interface
│   ├── ArchiveClient.tsx       # filtros client-side do arquivo
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── PostCard.tsx
│   ├── ProjectCard.tsx
│   ├── PostNav.tsx
│   └── TableOfContents.tsx
├── content/
│   ├── posts/                  # posts em .mdx
│   └── projects.ts             # dados dos projetos
├── lib/
│   ├── posts.ts                # leitura, ordenacao e metadados dos posts
│   ├── mdx-options.ts          # plugins remark/rehype
│   ├── motion.ts               # variants reutilizaveis
│   └── cn.ts                   # helper de classes
└── public/
    └── favicon/                # favicons dark/light
```

## Conteudo

### Criar um post

Crie um arquivo em `content/posts/meu-slug.mdx`:

~~~mdx
---
title: "Titulo do post"
date: "2026-05-27"
description: "Resumo curto exibido nos cards, RSS e metadados."
category: "Guias Praticos"
tags: ["Next.js", "React", "TypeScript"]
draft: false
---

## Introducao

Conteudo em MDX.

```ts
const exemplo = "syntax highlighting automatico";
```
~~~

O nome do arquivo define a rota: `content/posts/meu-slug.mdx` vira
`/posts/meu-slug`.

Campos esperados no frontmatter:

| Campo | Tipo | Obrigatorio | Uso |
| --- | --- | --- | --- |
| `title` | `string` | Sim | titulo do post e metadata |
| `date` | `YYYY-MM-DD` | Sim | ordenacao, RSS e sitemap |
| `description` | `string` | Sim | cards, SEO e RSS |
| `category` | `string` | Sim | filtros e exibicao |
| `tags` | `string[]` | Sim | filtros, SEO e RSS |
| `draft` | `boolean` | Nao | quando `true`, remove das listagens publicas |

### Editar projetos

Os projetos exibidos em `/projects` e na home ficam em `content/projects.ts`.

Cada item aceita:

```ts
{
  slug: "meu-projeto",
  title: "Meu Projeto",
  description: "Descricao curta do projeto.",
  stack: ["Next.js", "TypeScript"],
  href: "https://exemplo.com",
  repo: "https://github.com/usuario/repositorio",
}
```

## SEO e Feeds

O projeto ja inclui:

- Metadata global em `app/layout.tsx`.
- Metadata por post em `app/posts/[slug]/page.tsx`.
- Feed RSS estatico em `/rss.xml`.
- Sitemap com rotas estaticas e posts publicados.
- Robots com permissao global e referencia ao sitemap.
- Open Graph image dinamica por post usando `next/og`.

Antes de publicar em outro dominio, atualize:

- `metadataBase` em `app/layout.tsx`.
- `SITE` em `app/sitemap.ts`.
- `SITE` em `app/robots.ts`.
- `SITE` em `app/rss.xml/route.ts`.

## Design

Os principais tokens ficam em `app/globals.css`.

| Token | Uso |
| --- | --- |
| `--color-bg` | fundo principal |
| `--color-card` | cards e superficies |
| `--color-elevated` | superficies secundarias |
| `--color-accent` | links, foco e destaques |
| `--color-text-muted` | texto secundario |
| `--radius-card` | raio dos cards |
| `--shadow-card` | sombra padrao |

Componentes animados usam `MotionDiv` e `StaggerGrid`. Os dois preservam a
experiencia de usuarios com reducao de movimento ativada.

## Decisoes Tecnicas

- `next-mdx-remote` deixa o conteudo em `content/posts` fora do roteamento de paginas e centraliza o pipeline MDX.
- `rehype-slug` gera os ids dos headings usados no sumario e nos links ancorados.
- `ArchiveClient` concentra os filtros de busca, categoria e tag sem duplicar a leitura de posts.
- A imagem Open Graph roda em runtime Node.js porque a leitura dos posts depende de `fs`.
- RSS, sitemap e robots usam o mesmo dominio base para manter canonical, feed e indexacao consistentes.

## Deploy

O projeto esta pronto para deploy na Vercel ou em qualquer ambiente compatível
com Next.js.

Fluxo recomendado:

```bash
pnpm lint
pnpm build
```

Depois do deploy, valide:

- `/`
- `/archive`
- `/projects`
- `/rss.xml`
- `/sitemap.xml`
- `/robots.txt`
- `/posts/<slug>/opengraph-image`
