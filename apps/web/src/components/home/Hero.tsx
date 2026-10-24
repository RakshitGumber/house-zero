const indexedModels = ["JEV", "Clef", "Clairic"];

export function Hero() {
  return (
    <main className="dot-field mx-4 border-x border-dashed border-border bg-background text-foreground sm:mx-6 lg:mx-8">
      <section className="flex min-h-[calc(100svh-7rem)] flex-col justify-between px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <h1 className="max-w-5xl text-[clamp(3rem,8vw,8.5rem)] font-bold leading-[0.88] tracking-[-0.065em]">
          System One,
          <br />
          indexed.
        </h1>

        <div className="mt-20 grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(26rem,1.2fr)] lg:items-end">
          <div className="max-w-xl">
            <p className="text-xl leading-8 text-foreground sm:text-2xl sm:leading-9">
              Discover System One models and the portable harnesses and memory
              modules built around them.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <a
                href="#directory"
                className="clip-button bg-primary px-7 py-4 font-bold text-primary-foreground transition-colors hover:bg-foreground"
              >
                Explore the directory
              </a>
              <a
                href="#deployment"
                className="clip-button bg-foreground px-7 py-4 font-bold text-background transition-colors hover:bg-primary"
              >
                Choose how to run
              </a>
            </div>
          </div>

          <div data-ui className="bg-card p-5 sm:p-7">
            <div className="flex items-center justify-between gap-4 border-b border-dashed border-border pb-4">
              <p className="font-bold">Open research index</p>
              <span className="text-sm text-muted-foreground">System One</span>
            </div>
            <ul className="divide-y divide-dashed divide-border">
              {indexedModels.map((model, index) => (
                <li key={model} className="grid grid-cols-[2rem_1fr_auto] items-center gap-3 py-5">
                  <span className="text-sm text-muted-foreground">{index + 1}</span>
                  <span className="text-2xl font-bold">{model}</span>
                  <span className="text-primary" aria-hidden="true">
                    ↗
                  </span>
                </li>
              ))}
            </ul>
            <p className="pt-3 text-sm leading-6 text-muted-foreground">
              Compare a model, then choose self-hosted or managed access.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
