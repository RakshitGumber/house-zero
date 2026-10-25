import { HouseZeroLogo } from "../brand/HouseZeroLogo";

export function Navbar() {
  return (
    <header className="relative z-50 border-b border-dashed  border-border bg-surface">
      <nav
        aria-label="Primary navigation"
        className="flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <a
          href="#top"
          className="group flex items-center gap-3 font-heading text-xl font-bold uppercase tracking-wide sm:text-2xl"
        >
          <HouseZeroLogo className="size-8 shrink-0" />
          <span className="whitespace-nowrap [word-spacing:0.3em]">
            House <span className="text-primary">Zero</span>
          </span>
        </a>

        <div className="hidden items-center gap-7 text-sm md:flex flex-1 px-8">
          <a href="#product">Product</a>
          <a href="">Experiments</a>
          <a href="">Scale</a>
          <a href="">Questions</a>
        </div>

        <a
          className="bg-foreground px-5 py-2 text-sm font-medium text-background transition-colors hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          href=""
        >
          Explore Work
        </a>
      </nav>
    </header>
  );
}
