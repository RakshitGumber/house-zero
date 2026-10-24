import { ArrowUpRight } from "lucide-react";

const navItemClass =
  "inline-flex items-center justify-center px-3 py-2 text-sm text-foreground/70 transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground";

export function Navbar() {
  return (
    <header
      className="absolute inset-x-0 top-0 z-20 flex min-h-17 items-center justify-between px-8 py-3.5 max-md:min-h-16 max-md:px-5"
      data-ui
    >
      <a
        className="text-sm font-semibold tracking-[.34em] text-foreground no-underline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground max-sm:text-xs"
        href="#top"
        aria-label="House Zero home"
      >
        HOUSE <span className="text-primary">ZERO</span>
      </a>

      <nav
        aria-label="House Zero sections"
        className="flex gap-1.5 max-md:hidden"
      >
        <a className={navItemClass} href="#models">
          Models
        </a>
        <a className={navItemClass} href="#models">
          Harnesses
        </a>
        <a className={navItemClass} href="#models">
          Memory
        </a>
      </nav>

      <a
        className={`${navItemClass} gap-2 max-sm:text-xs`}
        href="#models"
      >
        Explore <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.5} />
      </a>
    </header>
  );
}
