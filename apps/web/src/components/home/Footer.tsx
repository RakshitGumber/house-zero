import { useState } from "react";

export function Footer() {
  const [name, setName] = useState("Research system, first run");
  const [visibility, setVisibility] = useState<"Private" | "Public">("Private");
  const [notice, setNotice] = useState("");

  return (
    <>
      <section id="create" className="stage-cut bg-primary px-4 py-24 text-primary-foreground sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <h2 className="max-w-[9ch] text-[clamp(3.3rem,7vw,7.5rem)] font-medium leading-[0.88] tracking-[-0.055em]">Start with a question</h2>
            <p className="mt-8 max-w-md text-lg leading-8 text-primary-foreground/80">Name the experiment and open a new bench with the first run ready to configure.</p>
          </div>
          <form
            data-ui
            className="bg-ui p-6 text-ui-foreground sm:p-8 lg:col-span-5 lg:col-start-8"
            onSubmit={(event) => { event.preventDefault(); setNotice("Demo only — account creation is not connected yet."); }}
          >
            <h3 className="text-2xl font-medium">Create an experiment</h3>
            <label className="mt-8 block text-sm font-medium">Experiment name
              <input className="mt-2 min-h-12 w-full border border-ui-line bg-ui px-3 outline-none focus:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" value={name} onChange={(event) => setName(event.target.value)} />
            </label>
            <fieldset className="mt-6">
              <legend className="text-sm font-medium">Visibility</legend>
              <div className="mt-2 grid grid-cols-2 bg-ui-soft p-1">
                {(["Private", "Public"] as const).map((option) => (
                  <button key={option} type="button" onClick={() => setVisibility(option)} className={`min-h-11 px-3 ${visibility === option ? "bg-ui-strong text-ui-inverse" : "text-ui-muted"}`}>{option}</button>
                ))}
              </div>
            </fieldset>
            <button type="submit" className="mt-7 min-h-13 w-full bg-primary px-5 font-medium text-primary-foreground transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground">Create experiment</button>
            <p className="mt-4 min-h-6 text-sm text-ui-muted" aria-live="polite">{notice || "No account will be created from this demo."}</p>
          </form>
        </div>
      </section>

      <footer className="bg-background px-4 pb-8 pt-24 text-sm sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-[1fr_auto_1fr] md:items-center">
          <p className="text-muted-foreground">House Zero is an online AI research lab.</p>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-5">
            <a className="hover:text-primary" href="#product">Product</a><a className="hover:text-primary" href="#experiments">Experiments</a><a className="hover:text-primary" href="#questions">Questions</a>
          </nav>
          <p className="text-muted-foreground md:text-right">© {new Date().getFullYear()} House Zero</p>
        </div>
      </footer>
    </>
  );
}
