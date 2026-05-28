"use client";

import { motion, useReducedMotion, type MotionProps } from "motion/react";
import { fadeInUp, staggerContainer } from "@/lib/motion";

type Preset = "fadeInUp" | "stagger" | "none";

type MotionDivProps = MotionProps & {
  as?: keyof React.JSX.IntrinsicElements;
  preset?: Preset;
  inView?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export function MotionDiv({
  as = "div",
  preset = "fadeInUp",
  inView = true,
  variants,
  initial,
  animate,
  whileInView,
  viewport,
  ...rest
}: MotionDivProps) {
  const reduced = useReducedMotion();
  const Comp = motion[as as "div"];

  const chosen =
    variants ??
    (preset === "fadeInUp"
      ? fadeInUp
      : preset === "stagger"
        ? staggerContainer
        : undefined);

  if (reduced) {
    return <Comp {...rest} />;
  }

  if (inView) {
    return (
      <Comp
        initial={initial ?? "hidden"}
        whileInView={whileInView ?? "visible"}
        viewport={viewport ?? { once: true, margin: "-80px" }}
        variants={chosen}
        {...rest}
      />
    );
  }

  return (
    <Comp
      initial={initial ?? "hidden"}
      animate={animate ?? "visible"}
      variants={chosen}
      {...rest}
    />
  );
}
