import { useState } from "react";

const models = ["Clairic 7B", "JEV Reasoning", "Clef Compact"];
const tools = ["Web retrieval", "Document index", "Code runner"];
const evaluators = ["Citation integrity", "Task completion", "Tool reliability"];

export function Hero() {
  const [model, setModel] = useState(models[0]!);
  const [tool, setTool] = useState(tools[0]!);
  const [evaluator, setEvaluator] = useState(evaluators[0]!);
  const [hasRun, setHasRun] = useState(false);

  return (
    <main className="overflow-hidden bg-background">
      <section className="relative min-h-[calc(100svh-5rem)] px-4 pb-0 pt-12 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
        <div className="relative z-10 max-w-[46rem]">
          <h1 className="max-w-[12ch] text-[clamp(3.5rem,7.2vw,7rem)] font-medium leading-[0.88] tracking-[-0.055em] text-foreground">
            Build the whole AI system
          </h1>
          <p className="mt-8 max-w-[29rem] text-lg leading-7 sm:text-xl sm:leading-8">
            House Zero is an online lab for building harnesses, training models, testing workflows, and proving what works at scale.
          </p>
          <div className="mt-8 flex items-center gap-6">
            <a
              className="bg-foreground px-6 py-4 font-medium text-background transition-colors hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              href="#create"
            >
              Enter the lab
            </a>
            <a className="underline decoration-1 underline-offset-4 hover:text-primary" href="#experiments">
              Explore experiments
            </a>
          </div>
        </div>

        <div className="stage-cut hero-shutter relative -mx-4 mt-20 min-h-[35rem] bg-primary px-4 py-10 sm:-mx-6 sm:px-6 lg:absolute lg:bottom-0 lg:left-[38%] lg:right-0 lg:mt-0 lg:min-h-[58%] lg:px-14 lg:py-14">
          <div
            data-ui
            aria-label="Interactive demo experiment composer"
            className="mx-auto max-w-[70rem] bg-surface text-foreground lg:mx-0"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 bg-foreground px-4 py-3 text-background sm:px-5">
              <div className="flex items-center gap-3">
                <span className="size-2 bg-primary-light" aria-hidden="true" />
                <strong className="font-medium">Source-grounded research</strong>
              </div>
              <span className="text-xs text-background/70">Demo experiment</span>
            </div>

            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              <form className="space-y-5 bg-background p-4 sm:p-6">
                <label className="block text-sm font-medium">
                  Model
                  <select
                    className="mt-2 min-h-11 w-full border border-muted-foreground/30 bg-surface px-3 outline-none focus:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    value={model}
                    onChange={(event) => { setModel(event.target.value); setHasRun(false); }}
                  >
                    {models.map((item) => <option key={item}>{item}</option>)}
                  </select>
                </label>
                <label className="block text-sm font-medium">
                  Tool
                  <select
                    className="mt-2 min-h-11 w-full border border-muted-foreground/30 bg-surface px-3 outline-none focus:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    value={tool}
                    onChange={(event) => { setTool(event.target.value); setHasRun(false); }}
                  >
                    {tools.map((item) => <option key={item}>{item}</option>)}
                  </select>
                </label>
                <label className="block text-sm font-medium">
                  Evaluation
                  <select
                    className="mt-2 min-h-11 w-full border border-muted-foreground/30 bg-surface px-3 outline-none focus:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    value={evaluator}
                    onChange={(event) => { setEvaluator(event.target.value); setHasRun(false); }}
                  >
                    {evaluators.map((item) => <option key={item}>{item}</option>)}
                  </select>
                </label>
                <button
                  type="button"
                  onClick={() => setHasRun(true)}
                  className="min-h-11 w-full bg-primary px-4 font-medium text-primary-foreground transition-colors hover:bg-primary-dark hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                >
                  {hasRun ? "Run again" : "Run demo"}
                </button>
              </form>

              <div className="p-4 sm:p-6" aria-live="polite">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg font-medium">Execution trace</h2>
                  <span className={`text-sm ${hasRun ? "text-pass" : "text-muted-foreground"}`}>
                    {hasRun ? "Evaluation passed" : "Ready to run"}
                  </span>
                </div>
                <div className="mt-6 space-y-3">
                  <TraceRow label="Task" value="Compare two claims and return the supporting evidence." active />
                  <TraceRow label="Model" value={model} active={hasRun} />
                  <TraceRow label="Tool call" value={tool} active={hasRun} />
                  <TraceRow label="Evaluation" value={evaluator} active={hasRun} />
                </div>
                <div className="mt-6 grid grid-cols-3 bg-background p-4 text-sm tabular-nums">
                  <Metric label="Latency" value={hasRun ? "1.7 s" : "—"} />
                  <Metric label="Tokens" value={hasRun ? "2,184" : "—"} />
                  <Metric label="Cost" value={hasRun ? "$0.014" : "—"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function TraceRow({ label, value, active }: { label: string; value: string; active: boolean }) {
  return (
    <div className={`grid grid-cols-[5.5rem_1fr] gap-3 border-l-2 px-3 py-2 text-sm ${active ? "border-primary bg-background" : "border-muted-foreground/30 text-muted-foreground"}`}>
      <span>{label}</span>
      <strong className="font-medium text-foreground">{value}</strong>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="block text-muted-foreground">{label}</span>
      <strong className="mt-1 block font-medium">{value}</strong>
    </div>
  );
}
