"use client";

import { motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";
import { GlowRing } from "@/components/GlowRing";

// Glow dinâmico do Obsidianite: anel "Light Circle" + halo azul-claro + blur coral.
// Valores extraídos do export Framer (Light Circle 360px, Glow #cfdaff blur 80px, Circle Blur #ff4625 blur 100px).
// O cluster é ancorado em um canto diferente por rota, e o anel luminoso só aparece
// em "/" e "/projects" (nas demais páginas fica só o halo + o blob coral).

type Anchor = "tr" | "tl" | "br" | "bl";

const PLACEMENTS: Record<string, { anchor: Anchor; ring: boolean }> = {
  // Home: o anel fica na seção "Sobre" (ver app/page.tsx), não no backdrop global.
  "/": { anchor: "tr", ring: false },
  "/projects": { anchor: "tr", ring: true },
  "/about": { anchor: "bl", ring: false },
  "/archive": { anchor: "tl", ring: false },
  "/sandbox": { anchor: "br", ring: false },
};

const DEFAULT_PLACEMENT = { anchor: "br" as Anchor, ring: false };

// Resolve a posição absoluta a partir do canto escolhido, reaproveitando
// os offsets originais (extraídos do Framer) de cada elemento.
function place(anchor: Anchor, h: number, v: number): CSSProperties {
  return {
    ...(anchor.includes("l") ? { left: h } : { right: h }),
    ...(anchor.includes("t") ? { top: v } : { bottom: v }),
  };
}

export function GlowBackdrop({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const { anchor, ring } = PLACEMENTS[pathname ?? "/"] ?? DEFAULT_PLACEMENT;

  const loop = (keyframes: Record<string, number[]>, duration: number) =>
    reduced
      ? {}
      : {
          animate: keyframes,
          transition: {
            duration,
            repeat: Infinity,
            ease: "easeInOut" as const,
          },
        };

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Halo azul-claro suave (Glow) */}
      <motion.div
        className="absolute"
        style={{
          ...place(anchor, 48, 60),
          width: 500,
          height: 500,
          borderRadius: 999,
          backgroundColor: "#cfdaff",
          filter: "blur(80px)",
          opacity: 0.2,
        }}
        {...loop({ opacity: [0.13, 0.26, 0.13], scale: [1, 1.08, 1] }, 7)}
      />

      {/* Blob coral (Circle Blur) */}
      <motion.div
        className="absolute"
        style={{
          ...place(anchor, -40, -16),
          width: 520,
          height: 120,
          borderRadius: 999,
          backgroundColor: "#ff4625",
          filter: "blur(100px)",
          opacity: 0.4,
        }}
        {...loop({ x: [0, 28, 0], y: [0, -10, 0], opacity: [0.32, 0.5, 0.32] }, 11)}
      />

      {/* Anel luminoso (Light Circle) — em /projects ancorado no canto */}
      {ring && (
        <GlowRing
          style={place(anchor, -120, 120)}
        />
      )}
    </div>
  );
}
