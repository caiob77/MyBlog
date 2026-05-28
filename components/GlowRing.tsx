"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties } from "react";

// Anel luminoso "Light Circle" do Obsidianite (360px, borda branca + glow).
// O posicionamento vem por className no wrapper (que não é animado), enquanto
// o motion.div interno cuida só de scale/rotate — assim translate/anchor não
// conflitam com a transform da animação.
export function GlowRing({
  className = "",
  size = 360,
  style,
}: {
  className?: string;
  size?: number;
  style?: CSSProperties;
}) {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute hidden md:block ${className}`}
      style={{ width: size, height: size, ...style }}
    >
      <motion.div
        className="h-full w-full"
        style={{
          borderRadius: 999,
          border: "12px solid rgba(255,255,255,0.85)",
          backgroundColor: "transparent",
          boxShadow:
            "0 0 16px rgba(255,255,255,0.5), inset 0 0 32px 16px rgba(255,255,255,0.5)",
        }}
        {...(reduced
          ? {}
          : {
              animate: { scale: [1, 1.05, 1], rotate: [0, 10, 0] },
              transition: {
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut" as const,
              },
            })}
      />
    </div>
  );
}
