---
title: "Como Configurar um Projeto Next.js do Zero: Guia Completo 2026"
published: 2026-02-06
description: "Aprenda a configurar um projeto Next.js 14+ com TypeScript, Tailwind CSS, ESLint e estrutura de pastas profissional. Passo a passo completo."
tags: [Next.js, React, TypeScript, Tailwind CSS, Tutorial]
category: Guias Práticos
draft: false
---

## Introdução

Configurar um projeto Next.js pode parecer simples com `create-next-app`, mas um setup profissional vai além do básico. Neste guia, vamos criar um projeto do zero com todas as ferramentas e configurações que você precisa para produção.

**O que vamos configurar:**
- Next.js 14+ com App Router
- TypeScript com configuração estrita
- Tailwind CSS
- ESLint + Prettier
- Estrutura de pastas escalável
- Variáveis de ambiente
- Aliases de importação

## Pré-requisitos

- Node.js 18+ instalado
- pnpm (recomendado) ou npm
- Editor de código (VS Code recomendado)

```bash
# Verifique suas versões
node -v  # v18.0.0 ou superior
pnpm -v  # 8.0.0 ou superior
```

## Passo 1: Criar o Projeto

### Opção A: Com create-next-app (Recomendado)

```bash
pnpm create next-app@latest meu-projeto
```

Responda as perguntas assim:

```
✔ Would you like to use TypeScript? → Yes
✔ Would you like to use ESLint? → Yes
✔ Would you like to use Tailwind CSS? → Yes
✔ Would you like to use `src/` directory? → Yes
✔ Would you like to use App Router? → Yes
✔ Would you like to customize the default import alias? → Yes
✔ What import alias would you like configured? → @/*
```

```bash
cd meu-projeto
```

### Opção B: Manualmente (Para entender cada passo)

```bash
# Criar pasta e inicializar
mkdir meu-projeto && cd meu-projeto
pnpm init

# Instalar Next.js, React e TypeScript
pnpm add next@latest react@latest react-dom@latest
pnpm add -D typescript @types/react @types/node @types/react-dom
```

## Passo 2: Configurar TypeScript

Se usou create-next-app, o `tsconfig.json` já existe. Vamos melhorá-lo:

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/types/*": ["./src/types/*"],
      "@/styles/*": ["./src/styles/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

Os `paths` permitem imports limpos:

```tsx
// Ao invés de:
import Button from '../../../components/ui/Button';

// Você usa:
import Button from '@/components/ui/Button';
```

## Passo 3: Configurar Tailwind CSS

Se usou create-next-app, já está configurado. Caso contrário:

```bash
pnpm add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Configure o `tailwind.config.ts`:

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Suas cores customizadas
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
```

Atualize o `src/app/globals.css`:

```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Estilos globais customizados */
@layer base {
  body {
    @apply bg-white text-gray-900 antialiased;
  }
}

@layer components {
  .btn-primary {
    @apply bg-primary-600 text-white px-4 py-2 rounded-lg 
           hover:bg-primary-700 transition-colors;
  }
}
```

## Passo 4: Configurar ESLint + Prettier

### ESLint

Atualize o `.eslintrc.json`:

```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "prefer-const": "error",
    "no-console": "warn"
  }
}
```

### Prettier

```bash
pnpm add -D prettier eslint-config-prettier
```

Crie o arquivo `.prettierrc`:

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

Instale o plugin do Tailwind para ordenar classes:

```bash
pnpm add -D prettier-plugin-tailwindcss
```

Adicione ao `.eslintrc.json` para evitar conflitos:

```json
{
  "extends": [
    "next/core-web-vitals",
    "prettier"  // Adicione por último
  ]
}
```

## Passo 5: Estrutura de Pastas

Organize seu projeto de forma escalável:

```
src/
├── app/                    # App Router (páginas e layouts)
│   ├── (auth)/            # Grupo de rotas (não afeta URL)
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/
│   ├── api/               # API Routes
│   ├── layout.tsx         # Layout raiz
│   ├── page.tsx           # Página inicial
│   └── globals.css
│
├── components/            # Componentes reutilizáveis
│   ├── ui/               # Componentes base (Button, Input, Card)
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── index.ts      # Re-exporta tudo
│   ├── layout/           # Header, Footer, Sidebar
│   └── features/         # Componentes específicos de features
│
├── lib/                  # Utilitários e configurações
│   ├── utils.ts         # Funções helper
│   ├── constants.ts     # Constantes da aplicação
│   └── api.ts           # Cliente de API
│
├── hooks/               # Custom hooks
│   ├── useAuth.ts
│   └── useLocalStorage.ts
│
├── types/               # TypeScript types/interfaces
│   ├── index.ts
│   └── api.ts
│
└── styles/              # Estilos adicionais (se necessário)
```

Crie o arquivo de re-exportação para componentes UI:

```typescript
// src/components/ui/index.ts
export { Button } from './Button';
export { Input } from './Input';
export { Card } from './Card';

// Uso:
import { Button, Input, Card } from '@/components/ui';
```

## Passo 6: Variáveis de Ambiente

Crie os arquivos de ambiente:

```bash
# .env.local (não vai pro Git - dados sensíveis)
DATABASE_URL="postgresql://..."
API_SECRET="seu-secret-aqui"
NEXT_PUBLIC_API_URL="http://localhost:3000/api"

# .env.example (vai pro Git - template)
DATABASE_URL="postgresql://user:password@localhost:5432/db"
API_SECRET="your-secret-here"
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
```

**Importante**: Variáveis com prefixo `NEXT_PUBLIC_` são expostas no client-side.

Adicione ao `.gitignore`:

```gitignore
# .gitignore
.env*.local
```

Crie tipagem para as variáveis:

```typescript
// src/types/env.d.ts
namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    API_SECRET: string;
    NEXT_PUBLIC_API_URL: string;
  }
}
```

## Passo 7: Scripts do package.json

```json
// package.json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,css,json}\"",
    "type-check": "tsc --noEmit",
    "clean": "rm -rf .next node_modules",
    "prepare": "husky install"
  }
}
```

## Passo 8: Configurar Git Hooks (Opcional mas Recomendado)

```bash
pnpm add -D husky lint-staged
npx husky install
npx husky add .husky/pre-commit "pnpm lint-staged"
```

Adicione ao `package.json`:

```json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{css,json,md}": ["prettier --write"]
  }
}
```

Agora, antes de cada commit, ESLint e Prettier rodam automaticamente.

## Passo 9: Componente de Exemplo

Vamos criar um componente Button bem estruturado:

```tsx
// src/components/ui/Button.tsx
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { 
      className, 
      variant = 'primary', 
      size = 'md', 
      isLoading, 
      children, 
      disabled,
      ...props 
    },
    ref
  ) => {
    const variants = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
      outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium',
          'transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
```

E a função utilitária `cn`:

```typescript
// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

```bash
pnpm add clsx tailwind-merge
```

## Passo 10: Testar Tudo

```bash
# Rodar em desenvolvimento
pnpm dev

# Verificar tipos
pnpm type-check

# Verificar lint
pnpm lint

# Build de produção
pnpm build
```

Se tudo passar sem erros, seu projeto está configurado corretamente!

## Estrutura Final

```
meu-projeto/
├── .husky/
├── src/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── styles/
│   └── types/
├── .env.example
├── .env.local
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## Conclusão

Com essa configuração você tem:

- **TypeScript** com configuração estrita e aliases de importação
- **Tailwind CSS** configurado e otimizado
- **ESLint + Prettier** trabalhando juntos sem conflitos
- **Estrutura de pastas** escalável e organizada
- **Git hooks** para manter qualidade do código
- **Variáveis de ambiente** tipadas e seguras

Este é o setup que uso em projetos de produção. Ele escala bem de projetos pequenos a grandes aplicações.

**Próximos passos sugeridos:**
- Adicionar testes com Jest ou Vitest
- Configurar autenticação (NextAuth.js)
- Adicionar um ORM (Prisma)
- Configurar CI/CD (GitHub Actions)

---

*Tem dúvidas sobre algum passo? Deixe nos comentários!*
