import { clsx } from "clsx";
import { ArrowUpRight } from "lucide-react";

const navItemClass =
  "inline-flex min-h-[34px] items-center justify-center rounded-[4px] border border-border/30 bg-background/65 px-3.5 text-[11px] tracking-[-.01em] text-foreground/80 no-underline backdrop-blur-[9px] transition-colors duration-200 hover:bg-foreground hover:text-background focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground";

export function SiteHeader() {
  return (
    <header
      className="absolute inset-x-0 top-0 z-20 grid min-h-[68px] grid-cols-[1fr_auto_1fr] items-center px-[clamp(18px,2vw,30px)] py-3.5 max-[800px]:min-h-[62px] max-[800px]:grid-cols-[1fr_auto]"
      data-ui
    >
      <nav
        aria-label="House Zero sections"
        className="flex gap-1.5 max-[800px]:hidden"
      >
        <a className={navItemClass} href="#models">Models</a>
        <a className={navItemClass} href="#models">Harnesses</a>
        <a className={navItemClass} href="#models">Memory</a>
      </nav>

      <a
        className="text-sm font-semibold tracking-[.34em] text-foreground no-underline focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground max-[800px]:justify-self-start max-[430px]:text-xs"
        href="#top"
        aria-label="House Zero home"
      >
        HOUSE <span className="text-primary">ZERO</span>
      </a>

      <a
        className={clsx(
          navItemClass,
          "justify-self-end gap-3 max-[800px]:absolute max-[800px]:right-[18px] max-[800px]:top-3.5 max-[430px]:min-h-8 max-[430px]:px-[11px]",
        )}
        href="#models"
      >
        Explore <ArrowUpRight aria-hidden="true" size={14} strokeWidth={1.5} />
      </a>
    </header>
  );
}
