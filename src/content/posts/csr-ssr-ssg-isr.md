---
title: "Diferença entre CSR, SSR, SSG e ISR: Guia Completo com Exemplos Reais"
published: 2026-02-06
description: "Entenda as estratégias de renderização no React e Next.js: Client-Side Rendering, Server-Side Rendering, Static Site Generation e Incremental Static Regeneration."
tags: [Next.js, React, Renderização, Performance]
category: Educacional
draft: false
---

## Introdução

Você já se perguntou por que alguns sites carregam instantaneamente enquanto outros demoram segundos? A resposta está na **estratégia de renderização** escolhida.

Se você trabalha com React ou Next.js, entender CSR, SSR, SSG e ISR não é opcional — é fundamental para criar aplicações performáticas e com boa experiência de usuário.

Neste artigo, vamos explorar cada estratégia com exemplos práticos do mundo real.

## O Que é Renderização?

Renderização é o processo de transformar seu código React em HTML que o navegador pode exibir. A diferença entre as estratégias está em **onde** e **quando** essa transformação acontece.

## CSR - Client-Side Rendering

### Conceito

No CSR, o servidor envia um HTML praticamente vazio e um bundle JavaScript. O navegador do usuário é responsável por executar o JavaScript e construir a página.

```tsx
// Exemplo típico de CSR com React
function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dados são buscados APÓS a página carregar no navegador
    fetch('/api/dashboard')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <Skeleton />;
  return <DashboardContent data={data} />;
}
```

### Fluxo do CSR

1. Usuário acessa a página
2. Servidor envia HTML mínimo + JavaScript
3. Navegador baixa e executa o JS
4. React monta os componentes
5. Dados são buscados via API
6. Página é renderizada com os dados

### Quando Usar CSR

- Dashboards e painéis administrativos
- Aplicações que requerem autenticação
- Interfaces altamente interativas
- Quando SEO não é prioridade

### Quando NÃO Usar CSR

- Landing pages e páginas de marketing
- Blogs e sites de conteúdo
- E-commerce (páginas de produto)
- Qualquer página que precise de SEO

## SSR - Server-Side Rendering

### Conceito

No SSR, o servidor processa o React e envia HTML completo para o navegador. Os dados são buscados no servidor antes de enviar a resposta.

```tsx
// Next.js App Router - Server Component (SSR por padrão)
async function ProductPage({ params }: { params: { id: string } }) {
  // Dados buscados NO SERVIDOR antes de enviar o HTML
  const product = await fetch(`https://api.store.com/products/${params.id}`, {
    cache: 'no-store' // Força SSR - sempre busca dados frescos
  }).then(res => res.json());

  return (
    <main>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <span>R$ {product.price}</span>
    </main>
  );
}

export default ProductPage;
```

### Fluxo do SSR

1. Usuário acessa a página
2. Servidor busca os dados necessários
3. Servidor renderiza o React para HTML
4. HTML completo é enviado ao navegador
5. Página aparece imediatamente
6. JavaScript "hidrata" a página para interatividade

### Quando Usar SSR

- Páginas com dados que mudam frequentemente
- Conteúdo personalizado por usuário
- Dados em tempo real (preços, estoque)
- Quando você precisa de SEO + dados dinâmicos

### Quando NÃO Usar SSR

- Páginas que não mudam (sobre, contato)
- Conteúdo que pode ser cacheado
- Alto volume de tráfego (custa mais servidor)

## SSG - Static Site Generation

### Conceito

No SSG, as páginas são geradas em **tempo de build**. O HTML é criado uma vez e servido como arquivo estático, extremamente rápido.

```tsx
// Next.js App Router - Static Generation
async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await fetch(`https://api.blog.com/posts/${params.slug}`, {
    cache: 'force-cache' // Cacheia indefinidamente (SSG)
  }).then(res => res.json());

  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

// Gera páginas estáticas para todos os posts no build
export async function generateStaticParams() {
  const posts = await fetch('https://api.blog.com/posts').then(res => res.json());
  
  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

export default BlogPost;
```

### Fluxo do SSG

1. Durante o build, Next.js busca todos os dados
2. Páginas HTML são geradas e salvas
3. Usuário acessa a página
4. Servidor envia HTML estático (instantâneo)
5. CDN pode cachear globalmente

### Quando Usar SSG

- Blogs e documentação
- Landing pages
- Páginas institucionais
- Catálogos de produtos (que não mudam muito)

### Quando NÃO Usar SSG

- Dados que mudam frequentemente
- Conteúdo personalizado por usuário
- Milhares de páginas dinâmicas

## ISR - Incremental Static Regeneration

### Conceito

ISR combina o melhor de SSG e SSR. Páginas são geradas estaticamente, mas podem ser **revalidadas** em intervalos definidos, sem precisar de novo build.

```tsx
// Next.js App Router - ISR com revalidação
async function ProductsPage() {
  const products = await fetch('https://api.store.com/products', {
    next: { revalidate: 60 } // Revalida a cada 60 segundos
  }).then(res => res.json());

  return (
    <main>
      <h1>Nossos Produtos</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}

export default ProductsPage;
```

### Fluxo do ISR

1. Página é gerada estaticamente no build
2. Usuário acessa → recebe versão estática (rápido)
3. Após X segundos, próxima requisição dispara revalidação
4. Nova versão é gerada em background
5. Próximos usuários recebem versão atualizada

### Quando Usar ISR

- E-commerce (lista de produtos)
- Blogs com atualizações frequentes
- Páginas que precisam de performance + dados atualizados
- Sites com muito conteúdo dinâmico

### Quando NÃO Usar ISR

- Dados em tempo real (use SSR)
- Conteúdo 100% estático (use SSG puro)
- Dados altamente personalizados

## Comparativo Visual

| Estratégia | Onde Renderiza | Quando Renderiza | Performance | SEO | Dados |
|------------|----------------|------------------|-------------|-----|-------|
| **CSR** | Cliente | A cada acesso | Inicial lenta | Ruim | Sempre frescos |
| **SSR** | Servidor | A cada acesso | Boa | Ótimo | Sempre frescos |
| **SSG** | Build | Uma vez | Excelente | Ótimo | Estáticos |
| **ISR** | Build + Servidor | Intervalos | Excelente | Ótimo | Semi-frescos |

## Exemplo Real: E-commerce

Imagine um e-commerce. Como escolher a estratégia para cada página?

```
📁 Páginas do E-commerce
├── 🏠 Home → ISR (revalida a cada 5 min)
├── 📦 Lista de Produtos → ISR (revalida a cada 1 min)
├── 🛍️ Página do Produto → SSR (preço/estoque em tempo real)
├── 🛒 Carrinho → CSR (dados do usuário)
├── 👤 Minha Conta → CSR (autenticado)
├── 📄 Sobre Nós → SSG (nunca muda)
└── 📝 Blog → SSG (rebuild no novo post)
```

## Conclusão

Não existe estratégia "melhor" — existe a estratégia **certa para cada caso**:

- **CSR**: Áreas logadas e dashboards
- **SSR**: Dados em tempo real + SEO
- **SSG**: Conteúdo estático, máxima performance
- **ISR**: Melhor dos dois mundos para conteúdo semi-dinâmico

O Next.js 14+ facilita essa escolha com o App Router, onde você pode misturar estratégias na mesma aplicação.

**Dica final**: Comece com SSG/ISR sempre que possível. Só use SSR quando realmente precisar de dados em tempo real, e CSR apenas para funcionalidades client-side.

---

*Agora você tem o conhecimento para tomar decisões informadas sobre renderização. Aplique isso no seu próximo projeto!*
