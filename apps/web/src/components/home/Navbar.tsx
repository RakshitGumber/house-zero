import { Icon } from "@iconify/react";

export function Navbar() {
  return (
    <header
      className="absolute inset-x-0 top-0 z-20 flex min-h-17 items-center justify-between px-8 py-3.5 max-md:min-h-16 max-md:px-5"
      data-ui
    >
      <a
        className="text-sm font-semibold tracking-[.34em] text-foreground no-underline max-sm:text-xs"
        href="#universe"
        aria-label="House Zero home"
      >
        HOUSE <span className="text-primary">ZERO</span>
      </a>

      <nav
        aria-label="House Zero sections"
        className="flex gap-1.5 max-md:hidden"
      >
        <a
          className="inline-flex items-center justify-center px-3 py-2 text-sm text-foreground/70 transition-colors duration-150 hover:text-foreground"
          href="#planet"
        >
          Research map
        </a>
        <a
          className="inline-flex items-center justify-center px-3 py-2 text-sm text-foreground/70 transition-colors duration-150 hover:text-foreground"
          href="#open-research"
        >
          Open research
        </a>
        <a
          className="inline-flex items-center justify-center px-3 py-2 text-sm text-foreground/70 transition-colors duration-150 hover:text-foreground"
          href="#galaxy"
        >
          Universe
        </a>
      </nav>

      <a
        className="inline-flex items-center justify-center gap-2 px-3 py-2 text-sm text-foreground/70 transition-colors duration-150 hover:text-foreground max-sm:text-xs"
        href="#planet"
      >
        Dive in
        <Icon aria-hidden="true" icon="solar:arrow-right-up-linear" width={16} />
      </a>
    </header>
  );
}
