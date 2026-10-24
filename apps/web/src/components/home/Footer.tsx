export function Footer() {
  return (
    <footer className="bg-primary px-4 pb-8 pt-20 text-primary-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[110rem]">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-xl text-2xl font-bold leading-9">
            A focused home for System One models and the tools that travel with them.
          </p>
          <a className="clip-button bg-foreground px-7 py-4 font-bold text-background" href="#directory">
            Browse models
          </a>
        </div>
        <p className="mt-20 font-heading text-[clamp(4.5rem,14vw,13rem)] font-bold leading-[0.8] tracking-[-0.07em]">
          House Zero
        </p>
      </div>
    </footer>
  );
}
