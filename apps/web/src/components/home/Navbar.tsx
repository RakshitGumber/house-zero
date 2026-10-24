import { Icon } from "@iconify/react";

export function Navbar() {
  return (
    <header
      className="absolute inset-x-0 top-0 z-20 flex min-h-17 items-center justify-between px-8 py-3.5 max-md:min-h-16 max-md:px-5"
      data-ui
    >
      <a
        className="text-sm font-semibold tracking-[.34em] text-foreground no-underline max-sm:text-xs"
        href="#top"
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
          href="#models"
        >
          Models
        </a>
        <a
          className="inline-flex items-center justify-center px-3 py-2 text-sm text-foreground/70 transition-colors duration-150 hover:text-foreground"
          href="#models"
        >
          Harnesses
        </a>
        <a
          className="inline-flex items-center justify-center px-3 py-2 text-sm text-foreground/70 transition-colors duration-150 hover:text-foreground"
          href="#models"
        >
          Memory
        </a>
      </nav>

      <a
        className="inline-flex items-center justify-center gap-2 px-3 py-2 text-sm text-foreground/70 transition-colors duration-150 hover:text-foreground max-sm:text-xs"
        href="#models"
      >
        Explore
        <Icon aria-hidden="true" icon="solar:arrow-right-up-linear" width={16} />
      </a>
    </header>
  );
}
