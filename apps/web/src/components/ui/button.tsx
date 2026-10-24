import * as React from "react";
import { clsx } from "clsx";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

type ButtonVariant = "default" | "outline" | "ghost";
type ButtonSize = "default" | "sm" | "lg" | "icon";

const variants: Record<ButtonVariant, string> = {
  default: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
  outline: "border border-border bg-background/70 text-foreground shadow-sm backdrop-blur hover:bg-accent hover:text-accent-foreground",
  ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
};

const sizes: Record<ButtonSize, string> = {
  default: "h-10 px-5 py-2",
  sm: "h-9 px-4",
  lg: "h-12 px-7 text-base",
  icon: "size-10",
};

type ButtonVariantProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

function buttonVariants({ variant = "default", size = "default", className }: ButtonVariantProps = {}) {
  return clsx(
    "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    variants[variant],
    sizes[size],
    className,
  );
}

function Button({ className, variant, size, asChild = false, children, ...props }: HTMLMotionProps<"button"> & ButtonVariantProps & { asChild?: boolean }) {
  const styles = buttonVariants({ variant, size, className });
  const reduceMotion = useReducedMotion();

  if (asChild && React.isValidElement(children)) {
    const child = React.Children.only(children) as React.ReactElement<{ className?: string }>;
    return React.cloneElement(child, {
      className: clsx(styles, child.props.className),
    });
  }

  return (
    <motion.button
      data-slot="button"
      className={styles}
      whileHover={variant === "ghost" ? undefined : { y: reduceMotion ? 0 : -2, boxShadow: "0 6px 14px rgb(0 0 0 / 0.22)" }}
      transition={{ duration: 0.18 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export { Button, buttonVariants };
