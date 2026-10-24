import * as React from "react";
import { clsx } from "clsx";

function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="badge"
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-xs font-semibold tracking-wide text-primary",
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
