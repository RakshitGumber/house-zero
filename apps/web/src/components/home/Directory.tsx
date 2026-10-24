const models = [
  {
    name: "JEV",
    description: "A System One model available through the House Zero ecosystem.",
  },
  {
    name: "Clef",
    description: "A System One model ready to evaluate for your own workflow.",
  },
  {
    name: "Clairic",
    description: "A System One model with self-hosted and managed paths.",
  },
];

export function Directory() {
  return (
    <section id="directory" className="scroll-mt-16 bg-foreground px-4 py-24 text-background sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-[110rem]">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <h2 className="max-w-3xl text-5xl font-bold leading-[0.95] tracking-[-0.05em] sm:text-7xl">
            Research, not hype.
          </h2>
          <p className="max-w-2xl text-lg leading-8 text-background/80 lg:justify-self-end">
            House Zero keeps the System One ecosystem legible: what the models
            are, how they can run, and which portable resources belong with them.
          </p>
        </div>

        <div data-ui className="mt-16 bg-background text-foreground">
          <div className="hidden grid-cols-[1fr_1.5fr_auto] gap-8 px-7 py-4 text-sm font-bold text-muted-foreground sm:grid">
            <span>Model</span>
            <span>Research note</span>
            <span>Access paths</span>
          </div>
          {models.map((model) => (
            <article
              key={model.name}
              className="grid gap-4 border-t border-dashed border-border px-7 py-7 sm:grid-cols-[1fr_1.5fr_auto] sm:items-center sm:gap-8"
            >
              <h3 className="text-3xl font-bold">{model.name}</h3>
              <p className="max-w-xl leading-7 text-muted-foreground">{model.description}</p>
              <div className="flex gap-2 text-sm font-bold">
                <span className="bg-card px-3 py-2">Self-host</span>
                <span className="bg-accent px-3 py-2 text-accent-foreground">House Zero</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
