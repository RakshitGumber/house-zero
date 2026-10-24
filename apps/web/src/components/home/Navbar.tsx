export function Navbar() {
  return (
    <header className="border-b-2 border-dashed border-border bg-card text-card-foreground">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8"
      >
        <a href="/" className="text-xl font-bold tracking-[-0.03em]">
          House Zero
        </a>

        <div className="hidden items-center gap-8 text-sm font-bold md:flex">
          <a className="transition-colors hover:text-primary" href="#models">
            Models
          </a>
          <a className="transition-colors hover:text-primary" href="#paths">
            Ways to run
          </a>
          <a className="transition-colors hover:text-primary" href="#resources">
            Resources
          </a>
        </div>

        <a
          href="#models"
          className="bg-foreground px-5 py-3 text-sm font-bold text-background transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Explore models
        </a>
      </nav>
    </header>
  );
}
