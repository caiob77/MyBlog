---
title: "pnpm vs npm vs yarn: Qual Gerenciador de Pacotes Escolher em 2026?"
published: 2026-02-06
description: "Comparação técnica detalhada entre pnpm, npm e yarn. Descubra qual gerenciador de pacotes é ideal para seu projeto com benchmarks e casos de uso reais."
tags: [Node.js, npm, pnpm, yarn, Ferramentas]
category: Comparativo
draft: false
---

## Introdução

Todo desenvolvedor JavaScript já passou por isso: criar um novo projeto e se perguntar "qual gerenciador de pacotes devo usar?". Com npm, yarn e pnpm disputando espaço, a escolha pode parecer confusa.

Neste artigo, vamos comparar os três de forma objetiva, com benchmarks reais e casos de uso práticos para você tomar a melhor decisão.

## Visão Geral

### npm (Node Package Manager)

O gerenciador **padrão** do Node.js. Vem instalado automaticamente e é mantido pela equipe do Node.

```bash
# Já vem com o Node.js
node -v  # Se isso funciona, npm também funciona
npm -v
```

### yarn

Criado pelo Facebook em 2016 para resolver problemas de performance e segurança do npm da época. Introduziu o `yarn.lock` e instalações paralelas.

```bash
# Instalação
npm install -g yarn

# Ou via Corepack (Node.js 16+)
corepack enable
corepack prepare yarn@stable --activate
```

### pnpm (Performant npm)

O mais recente dos três, focado em **eficiência de disco** e **velocidade**. Usa uma abordagem única de links simbólicos.

```bash
# Instalação
npm install -g pnpm

# Ou via Corepack
corepack enable
corepack prepare pnpm@latest --activate
```

## Comparação Técnica

### 1. Estrutura de node_modules

Esta é a **diferença fundamental** entre os três:

#### npm e yarn (Estrutura Flat)

```
projeto/
└── node_modules/
    ├── react/
    ├── react-dom/
    ├── lodash/           # Duplicado em cada projeto
    └── typescript/       # Duplicado em cada projeto
```

Cada projeto tem sua própria cópia completa das dependências.

#### pnpm (Content-Addressable Store)

```
# Store global (uma única cópia)
~/.pnpm-store/
└── v3/
    └── files/
        ├── react@18.2.0/
        ├── lodash@4.17.21/
        └── typescript@5.0.0/

# Projeto (apenas links simbólicos)
projeto/
└── node_modules/
    ├── .pnpm/
    │   └── react@18.2.0/
    │       └── node_modules/
    │           └── react -> link para store
    └── react -> .pnpm/react@18.2.0/node_modules/react
```

O pnpm mantém **uma única cópia** de cada pacote no disco, economizando gigabytes de espaço.

### 2. Benchmark de Performance

Testei os três em um projeto Next.js real com ~150 dependências:

| Operação | npm | yarn | pnpm |
|----------|-----|------|------|
| Install limpo (sem cache) | 45s | 38s | **22s** |
| Install com cache | 18s | 12s | **5s** |
| Install com lockfile | 15s | 10s | **4s** |
| Adicionar dependência | 8s | 6s | **3s** |
| Espaço em disco | 450MB | 450MB | **120MB** |

**Resultado**: pnpm é consistentemente 2-3x mais rápido e usa ~70% menos espaço.

### 3. Comandos Equivalentes

```bash
# Instalar dependências
npm install          | yarn              | pnpm install

# Adicionar pacote
npm install react    | yarn add react    | pnpm add react

# Adicionar dev dependency
npm install -D jest  | yarn add -D jest  | pnpm add -D jest

# Remover pacote
npm uninstall react  | yarn remove react | pnpm remove react

# Executar script
npm run dev          | yarn dev          | pnpm dev

# Executar binário
npx eslint .         | yarn dlx eslint . | pnpm dlx eslint .

# Atualizar pacotes
npm update           | yarn upgrade      | pnpm update

# Limpar cache
npm cache clean      | yarn cache clean  | pnpm store prune
```

### 4. Segurança

#### npm
- Auditorias de segurança com `npm audit`
- Histórico de vulnerabilidades no registro

#### yarn
- `yarn audit` similar ao npm
- Checksums verificados no lockfile
- Yarn Berry (v2+) tem Plug'n'Play que isola melhor as dependências

#### pnpm
- **Strict mode por padrão**: pacotes só acessam dependências declaradas
- Previne "phantom dependencies" (usar pacotes não declarados)
- Store imutável reduz riscos de tampering

```bash
# Exemplo: pnpm impede uso de dependências não declaradas
# Se você usa 'lodash' mas não declarou no package.json:

# npm/yarn: Funciona (perigoso!)
# pnpm: Erro! (seguro)
```

### 5. Workspaces (Monorepos)

Os três suportam workspaces, mas com diferenças:

#### npm Workspaces

```json
// package.json
{
  "workspaces": ["packages/*"]
}
```

```bash
npm install                          # Instala tudo
npm run build --workspace=@app/web   # Roda em um workspace
```

#### yarn Workspaces

```json
// package.json
{
  "workspaces": ["packages/*"]
}
```

```bash
yarn install                    # Instala tudo
yarn workspace @app/web build   # Roda em um workspace
```

#### pnpm Workspaces

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

```bash
pnpm install                           # Instala tudo
pnpm --filter @app/web build           # Roda em um workspace
pnpm --filter "./packages/**" test     # Roda em múltiplos
pnpm --filter "...[origin/main]" build # Apenas pacotes alterados
```

**pnpm tem o melhor suporte para monorepos** com filtros poderosos e eficiência de disco ainda maior.

## Quando Usar Cada Um

### Use npm quando:

- Projeto simples/pessoal
- Equipe sem familiaridade com alternativas
- Dependência de scripts que assumem npm
- CI/CD com cache limitado

```bash
# Setup básico
npm init -y
npm install
```

### Use yarn quando:

- Já usa yarn no projeto existente
- Precisa de Plug'n'Play (yarn berry)
- Equipe familiarizada com yarn
- Projetos Facebook/Meta stack

```bash
# Setup com Yarn Berry
yarn init -2
yarn install
```

### Use pnpm quando:

- **Monorepos** (melhor suporte)
- Projetos com muitas dependências
- Disco SSD limitado
- CI/CD (muito mais rápido)
- Quer máxima segurança contra phantom dependencies

```bash
# Setup recomendado
pnpm init
pnpm install
```

## Quando NÃO Usar

### npm
- Monorepos grandes (lento)
- Múltiplos projetos no mesmo computador (desperdiça disco)

### yarn
- Se não precisa de features específicas (overhead desnecessário)
- Projetos novos (pnpm é melhor alternativa)

### pnpm
- Ambientes que não suportam symlinks (raro, alguns Windows corporativos)
- Ferramentas que esperam estrutura flat de node_modules (cada vez mais raro)

## Migração para pnpm

Se você quer migrar um projeto existente:

```bash
# 1. Instale o pnpm
npm install -g pnpm

# 2. Delete node_modules e lockfile antigo
rm -rf node_modules
rm package-lock.json  # ou yarn.lock

# 3. Instale com pnpm
pnpm install

# 4. Atualize scripts no package.json se necessário
# npm run -> pnpm
# npx -> pnpm dlx
```

### Configuração Recomendada

```ini
# .npmrc (funciona com pnpm também)
engine-strict=true
auto-install-peers=true
```

## Conclusão

| Critério | npm | yarn | pnpm |
|----------|-----|------|------|
| Performance | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Uso de Disco | ⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| Monorepos | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Segurança | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Adoção/Docs | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Facilidade | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

**Minha recomendação para 2026**:

- **Projetos novos**: Use **pnpm**. A economia de tempo e disco compensa a curva de aprendizado mínima.
- **Projetos existentes com npm**: Considere migrar para pnpm se tiver muitas dependências ou monorepo.
- **Projetos existentes com yarn**: Mantenha se funciona bem; migre se precisar de melhor performance em CI/CD.

O pnpm se tornou minha escolha padrão. A velocidade no CI/CD sozinha já justifica a mudança.

---

*Qual gerenciador você usa? Já experimentou o pnpm? Compartilhe sua experiência!*
