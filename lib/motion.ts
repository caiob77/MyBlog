import type { Variants, Transition } from "motion/react";

// Easing assinatura do Obsidianite (cubic-bezier extraído do site Framer)
export const EASE_OBSIDIAN = [0.44, 0, 0.56, 1] as const;

// Mola do Obsidianite (mesma do hero scale-reveal).
const spring: Transition = {
  type: "spring",
  stiffness: 80,
  damping: 30,
  mass: 1,
};

const springSnappy: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 20,
};

// Tween com a curva assinatura do Obsidianite (entrada de conteúdo).
const tween: Transition = {
  type: "tween",
  duration: 0.5,
  ease: EASE_OBSIDIAN,
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: tween,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: spring },
};

// Hero "scale-reveal" do Obsidianite: a seção dá zoom-out ao carregar.
export const heroReveal: Variants = {
  hidden: { opacity: 0.001, scale: 1.3 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 80, damping: 30, mass: 1 },
  },
};

// Fade-up dos CTAs do Obsidianite (tween com delay e easing assinatura).
export const fadeInUpTween: Variants = {
  hidden: { opacity: 0.001, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "tween", duration: 0.4, delay: 0.3, ease: EASE_OBSIDIAN },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.08,
    },
  },
};

export const cardHover = {
  whileHover: { scale: 1.02, y: -4 },
  transition: springSnappy,
};

export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "tween", duration: 0.4, ease: EASE_OBSIDIAN },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { type: "tween", duration: 0.3, ease: EASE_OBSIDIAN },
  },
};
