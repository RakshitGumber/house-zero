const models = ["JEV", "Clef", "Clairic"];

export function Hero() {
  return (
    <main
      id="models"
      className="min-h-[calc(100svh-8.25rem)] bg-slate-100 text-slate-950"
    >
      <div className="mx-auto grid max-w-7xl gap-16 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[minmax(0,1.35fr)_minmax(19rem,0.65fr)] lg:items-end lg:py-32">
        <div className="max-w-4xl">
          <h1 className="max-w-3xl text-5xl font-bold leading-[0.96] tracking-[-0.05em] sm:text-7xl lg:text-8xl">
            Intelligence for your work.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-700 sm:text-xl">
            Discover System One models, run them on your own infrastructure, or
            use them through House Zero. Add portable harnesses and memory as
            your work grows.
          </p>

          <div id="paths" className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#resources"
              className="bg-sky-400 px-6 py-4 text-center font-bold text-slate-950 transition-colors hover:bg-sky-300"
            >
              Browse the ecosystem
            </a>
            <a
              href="#resources"
              className="bg-white px-6 py-4 text-center font-bold text-slate-950 transition-colors hover:bg-slate-200"
            >
              See how it works
            </a>
          </div>
        </div>

        <section id="resources" aria-labelledby="model-list-title" className="bg-sky-200 p-7 sm:p-9">
          <h2 id="model-list-title" className="text-lg font-bold">
            Start with a model
          </h2>
          <ul className="mt-8 space-y-5">
            {models.map((model) => (
              <li key={model} className="flex items-center justify-between text-2xl font-bold">
                <span>{model}</span>
                <span aria-hidden="true" className="text-sky-700">
                  →
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-sm leading-6 text-slate-700">
            Pair any model with shareable harnesses and portable memory modules.
          </p>
        </section>
      </div>
    </main>
  );
}
