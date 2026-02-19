# Meu Blog

![Node.js >= 20](https://img.shields.io/badge/node.js-%3E%3D20-brightgreen)
![pnpm >= 9](https://img.shields.io/badge/pnpm-%3E%3D9-blue)

Blog estático construído com [Astro](https://astro.build).

## ✨ Funcionalidades

- [x] Construído com [Astro](https://astro.build) e [Tailwind CSS](https://tailwindcss.com)
- [x] Animações suaves e transições de página
- [x] Modo claro / escuro
- [x] Cores do tema e banner personalizáveis
- [x] Design responsivo
- [x] Busca com [Pagefind](https://pagefind.app/)
- [x] Sintaxe estendida em Markdown
- [x] Índice de conteúdos
- [x] Feed RSS

## 🚀 Começando

1. Para editar o blog localmente, clone o repositório e execute `pnpm install` para instalar as dependências.
   - Instale o [pnpm](https://pnpm.io) com `npm install -g pnpm` se ainda não tiver.
2. Edite o arquivo de configuração `src/config.ts` para personalizar o blog.
3. Execute `pnpm new-post <nome-do-arquivo>` para criar um novo post e editá-lo em `src/content/posts/`.
4. Faça o deploy do blog na Vercel, Netlify, GitHub Pages, etc. seguindo [os guias do Astro](https://docs.astro.build/en/guides/deploy/). É necessário editar a configuração do site em `astro.config.mjs` antes do deploy.

## 📝 Frontmatter dos posts

```yaml
---
title: Meu primeiro post
published: 2023-09-09
description: Esta é a primeira publicação do meu blog Astro.
image: ./cover.jpg
tags: [Foo, Bar]
category: Front-end
draft: false
lang: pt      # Defina apenas se o idioma do post for diferente do idioma do site em config.ts
---
```

## 🧩 Sintaxe Markdown estendida

Além do suporte padrão do Astro ao [GitHub Flavored Markdown](https://github.github.com/gfm/), o blog inclui recursos extras:

- Admonitions (avisos/destaques)
- Cards de repositórios do GitHub
- Blocos de código aprimorados com [Expressive Code](https://expressive-code.com/)

## ⚡ Comandos

Todos os comandos são executados na raiz do projeto, no terminal:

| Comando                    | Ação                                                |
|:---------------------------|:----------------------------------------------------|
| `pnpm install`             | Instala as dependências                             |
| `pnpm dev`                 | Inicia o servidor de desenvolvimento em `localhost:4321` |
| `pnpm build`               | Gera o site de produção em `./dist/`                |
| `pnpm preview`             | Visualiza o build localmente antes do deploy        |
| `pnpm check`               | Verifica erros no código                            |
| `pnpm format`              | Formata o código com Biome                          |
| `pnpm new-post <nome>`     | Cria um novo post                                   |
| `pnpm astro ...`           | Executa comandos do CLI (ex.: `astro add`, `astro check`) |
| `pnpm astro --help`        | Ajuda do CLI do Astro                               |

## 📄 Licença

Este projeto está sob a licença MIT.
