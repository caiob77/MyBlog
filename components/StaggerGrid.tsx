"use client";

import { motion, useReducedMotion } from "motion/react";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/cn";

type StaggerGridProps = {
  children: React.ReactNode;
  className?: string;
};

export function StaggerGrid({ children, className }: StaggerGridProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
      className={cn(className)}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={fadeInUp}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}
