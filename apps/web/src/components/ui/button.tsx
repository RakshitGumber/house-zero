import * as React from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "outline" | "ghost";
type ButtonSize = "default" | "sm" | "lg" | "icon";

const variants: Record<ButtonVariant, string> = {
  default: "bg-primary text-primary-foreground shadow-sm hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md",
  outline: "border border-border bg-background/70 text-foreground shadow-sm backdrop-blur hover:-translate-y-0.5 hover:bg-accent hover:text-accent-foreground",
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
  return cn(
    "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    variants[variant],
    sizes[size],
    className,
  );
}

function Button({ className, variant, size, asChild = false, children, ...props }: React.ComponentProps<"button"> & ButtonVariantProps & { asChild?: boolean }) {
  const styles = buttonVariants({ variant, size, className });

  if (asChild && React.isValidElement(children)) {
    const child = React.Children.only(children) as React.ReactElement<{ className?: string }>;
    return React.cloneElement(child, {
      className: cn(styles, child.props.className),
    });
  }

  return <button data-slot="button" className={styles} {...props}>{children}</button>;
}

export { Button, buttonVariants };
