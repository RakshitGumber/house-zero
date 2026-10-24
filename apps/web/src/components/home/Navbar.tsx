export function Navbar() {
  return (
    <header className="bg-white text-slate-950">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8"
      >
        <a href="/" className="text-xl font-bold tracking-[-0.03em]">
          House Zero
        </a>

        <div className="hidden items-center gap-8 text-sm font-bold md:flex">
          <a className="transition-colors hover:text-sky-600" href="#models">
            Models
          </a>
          <a className="transition-colors hover:text-sky-600" href="#paths">
            Ways to run
          </a>
          <a className="transition-colors hover:text-sky-600" href="#resources">
            Resources
          </a>
        </div>

        <a
          href="#models"
          className="bg-slate-950 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-sky-600"
        >
          Explore models
        </a>
      </nav>
    </header>
  );
}
