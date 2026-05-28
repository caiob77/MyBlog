import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Chip } from "@/components/ui/Chip";
import { SocialLink } from "@/components/ui/SocialLink";

const SWATCHES = [
  { name: "bg", value: "#0B0B0D" },
  { name: "surface", value: "#16161A" },
  { name: "card", value: "#1A1A1C" },
  { name: "elevated", value: "#2B2B2E" },
  { name: "accent", value: "#FF4625" },
  { name: "accent-hover", value: "#E02F10" },
];

export default function Sandbox() {
  return (
    <Container as="main" className="py-16 space-y-16">
      <header className="space-y-3">
        <Eyebrow>Design System</Eyebrow>
        <h1 className="font-display text-5xl font-bold md:text-6xl">
          Sandbox
        </h1>
        <p className="text-text-muted max-w-prose">
          Página temporária pra validar tokens, fontes, componentes base e
          microinterações antes de montar as telas reais.
        </p>
      </header>

      <section className="space-y-4">
        <Eyebrow>Cores</Eyebrow>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {SWATCHES.map((s) => (
            <div
              key={s.name}
              className="rounded-xl border border-border p-4 text-xs"
            >
              <div
                className="h-16 w-full rounded-md mb-3 border border-border"
                style={{ background: s.value }}
              />
              <div className="font-mono text-text">{s.name}</div>
              <div className="font-mono text-text-sub">{s.value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <Eyebrow>Tipografia</Eyebrow>
        <div className="space-y-3">
          <p className="font-display text-7xl font-bold">
            BENIEL
          </p>
          <p className="font-display text-4xl font-semibold">
            Display heading
          </p>
          <p className="text-lg text-text">
            Body — Inter regular. The quick brown fox jumps over the lazy dog.
          </p>
          <p className="text-sm text-text-muted">
            Muted — used for metadata, captions and secondary information.
          </p>
          <p className="font-mono text-sm bg-card border border-border rounded-md p-3 inline-block">
            const fragment = &quot;Fragment Mono&quot;;
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <Eyebrow>Chips</Eyebrow>
        <div className="flex flex-wrap gap-2">
          <Chip>Default</Chip>
          <Chip>Next.js</Chip>
          <Chip>TypeScript</Chip>
          <Chip variant="accent">Educacional</Chip>
          <Chip variant="accent">Guias Práticos</Chip>
        </div>
      </section>

      <section className="space-y-4">
        <Eyebrow>Social</Eyebrow>
        <div className="flex gap-3">
          <SocialLink kind="github" href="https://github.com/caiob77" />
          <SocialLink
            kind="linkedin"
            href="https://www.linkedin.com/in/caio-beniel-82381b22b/"
          />
          <SocialLink
            kind="instagram"
            href="https://www.instagram.com/benielsena_bx/"
          />
        </div>
      </section>

      <section className="space-y-4">
        <Eyebrow>Cards</Eyebrow>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <Chip variant="accent" className="mb-3">
              Educacional
            </Chip>
            <h3 className="font-display text-xl font-semibold mb-2">
              Arquitetura Hexagonal
            </h3>
            <p className="text-sm text-text-muted mb-4">
              Como aplicar ports and adapters em projetos reais.
            </p>
            <div className="flex items-center justify-between text-xs text-text-sub">
              <span>17 Mar 2026</span>
              <span>6 min</span>
            </div>
          </Card>
          <Card>
            <Chip variant="accent" className="mb-3">
              Comparativo
            </Chip>
            <h3 className="font-display text-xl font-semibold mb-2">
              pnpm vs npm vs yarn
            </h3>
            <p className="text-sm text-text-muted mb-4">
              Performance, disk space, lockfiles e quando cada um faz sentido.
            </p>
            <div className="flex items-center justify-between text-xs text-text-sub">
              <span>06 Fev 2026</span>
              <span>4 min</span>
            </div>
          </Card>
          <Card>
            <Chip variant="accent" className="mb-3">
              Guias Práticos
            </Chip>
            <h3 className="font-display text-xl font-semibold mb-2">
              Configurar Next.js do Zero
            </h3>
            <p className="text-sm text-text-muted mb-4">
              Setup inicial sem create-next-app, passo a passo.
            </p>
            <div className="flex items-center justify-between text-xs text-text-sub">
              <span>06 Fev 2026</span>
              <span>8 min</span>
            </div>
          </Card>
        </div>
      </section>
    </Container>
  );
}
