export function Deployment() {
  return (
    <section id="deployment" className="scroll-mt-16 bg-background px-4 py-24 text-foreground sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-[110rem]">
        <div className="grid gap-16 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <h2 className="text-5xl font-bold leading-[0.95] tracking-[-0.05em] sm:text-7xl">
              Run it your way.
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">
              Keep control on your own infrastructure or use the managed House
              Zero path. The model stays central; deployment stays your choice.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <article className="bg-card p-7 sm:p-9">
              <h3 className="text-3xl font-bold">Self-hosted</h3>
              <p className="mt-8 leading-7 text-muted-foreground">
                Pull a model into infrastructure you control and operate it on
                your terms.
              </p>
              <a className="mt-12 inline-block font-bold text-primary" href="#directory">
                Find a model →
              </a>
            </article>
            <article className="bg-primary p-7 text-primary-foreground sm:p-9">
              <h3 className="text-3xl font-bold">Managed</h3>
              <p className="mt-8 leading-7 text-primary-foreground/80">
                Use a model through House Zero when you want a managed access
                path.
              </p>
              <a className="mt-12 inline-block font-bold" href="#directory">
                Explore the directory →
              </a>
            </article>
          </div>
        </div>

        <div id="resources" className="mt-28 grid scroll-mt-16 gap-8 border-t-2 border-dashed border-border pt-12 lg:grid-cols-3">
          <h2 className="text-4xl font-bold leading-tight tracking-[-0.04em]">
            More than models.
          </h2>
          <div>
            <h3 className="text-2xl font-bold">Harnesses</h3>
            <p className="mt-4 leading-7 text-muted-foreground">
              Shareable evaluation and workflow modules that move with the model.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold">Memory</h3>
            <p className="mt-4 leading-7 text-muted-foreground">
              Portable context modules designed to travel across model workflows.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
