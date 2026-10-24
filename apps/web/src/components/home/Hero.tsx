const models = ["JEV", "Clef", "Clairic"];

export function Hero() {
  return (
    <main
      id="models"
      className="min-h-[calc(100svh-8.25rem)] bg-background text-foreground"
    >
      <div className="mx-auto grid max-w-7xl gap-16 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[minmax(0,1.35fr)_minmax(19rem,0.65fr)] lg:items-end lg:py-32">
        <div className="max-w-4xl">
          <h1 className="max-w-3xl text-5xl font-bold leading-[0.96] tracking-[-0.05em] sm:text-7xl lg:text-8xl">
            Intelligence for your work.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            Discover System One models, run them on your own infrastructure, or
            use them through House Zero. Add portable harnesses and memory as
            your work grows.
          </p>

          <div id="paths" className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#resources"
              className="bg-primary px-6 py-4 text-center font-bold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Browse the ecosystem
            </a>
            <a
              href="#resources"
              className="bg-card px-6 py-4 text-center font-bold text-card-foreground transition-colors hover:bg-muted"
            >
              See how it works
            </a>
          </div>
        </div>

        <section id="resources" aria-labelledby="model-list-title" className="bg-card p-7 sm:p-9">
          <h2 id="model-list-title" className="text-lg font-bold">
            Start with a model
          </h2>
          <ul className="mt-8 space-y-5">
            {models.map((model) => (
              <li key={model} className="flex items-center justify-between text-2xl font-bold">
                <span>{model}</span>
                <span aria-hidden="true" className="text-primary">
                  →
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-sm leading-6 text-muted-foreground">
            Pair any model with shareable harnesses and portable memory modules.
          </p>
        </section>
      </div>
    </main>
  );
}
