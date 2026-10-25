export function Navbar() {
  return (
    <header className="relative z-50 bg-background" id="top">
      <nav
        aria-label="Primary navigation"
        className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <a href="#top" className="group flex items-center gap-3 text-lg font-medium tracking-[-0.025em]">
          <span className="grid size-9 place-items-center bg-foreground text-sm font-medium text-background transition-colors group-hover:bg-primary">
            H0
          </span>
          <span>House Zero</span>
        </a>

        <div className="hidden items-center gap-7 text-sm md:flex">
          <a className="transition-colors hover:text-primary" href="#product">Product</a>
          <a className="transition-colors hover:text-primary" href="#experiments">Experiments</a>
          <a className="transition-colors hover:text-primary" href="#scale">Scale</a>
          <a className="transition-colors hover:text-primary" href="#questions">Questions</a>
        </div>

        <a
          className="bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          href="#create"
        >
          Enter the lab
        </a>
      </nav>
    </header>
  );
}
