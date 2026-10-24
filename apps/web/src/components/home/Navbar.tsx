export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-dashed border-border bg-background text-foreground">
      <nav
        aria-label="Primary navigation"
        className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <a href="/" className="flex items-center gap-3 text-lg font-bold tracking-[-0.03em]">
          <span className="grid size-8 rotate-45 place-items-center bg-foreground text-sm text-background">
            <span className="-rotate-45">0</span>
          </span>
          <span>House Zero</span>
        </a>

        <div className="hidden items-center gap-8 text-sm font-bold md:flex">
          <a className="transition-colors hover:text-primary" href="#directory">
            Directory
          </a>
          <a className="transition-colors hover:text-primary" href="#deployment">
            Deployment
          </a>
          <a className="transition-colors hover:text-primary" href="#resources">
            Resources
          </a>
        </div>

        <a
          href="#directory"
          className="clip-button bg-foreground px-6 py-3 text-sm font-bold text-background transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Browse models
        </a>
      </nav>
    </header>
  );
}
