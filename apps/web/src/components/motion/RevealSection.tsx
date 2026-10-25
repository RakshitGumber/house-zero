import type { ComponentProps } from "react";
import { motion, useReducedMotion } from "framer-motion";

type RevealSectionProps = ComponentProps<typeof motion.section>;

export function RevealSection({ children, ...props }: RevealSectionProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.section
      initial={reducedMotion ? false : { opacity: 0.45, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.12, once: true }}
      transition={{
        duration: reducedMotion ? 0 : 0.78,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...props}
    >
      {children}
    </motion.section>
  );
}
