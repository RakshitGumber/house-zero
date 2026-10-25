import { useState } from "react";

const measures = {
  Quality: { value: "87%", note: "Task completion across 24 demo runs", bars: [76, 87, 82, 91, 87] },
  Reliability: { value: "21/24", note: "Runs completed without intervention", bars: [92, 88, 71, 96, 88] },
  Economics: { value: "$0.019", note: "Median cost per completed demo task", bars: [64, 78, 58, 86, 69] },
  Performance: { value: "2.4 s", note: "Median end-to-end demo latency", bars: [83, 68, 91, 62, 77] },
  Control: { value: "18", note: "Inspectable events in the selected trace", bars: [55, 72, 81, 90, 100] },
};

export function Deployment() {
  const [active, setActive] = useState<keyof typeof measures>("Quality");
  const selected = measures[active];

  return (
    <>
      <section id="scale" className="reveal bg-primary px-4 py-28 text-primary-foreground sm:px-6 lg:px-8 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-4">
            <h2 className="max-w-[11ch] text-[clamp(2.8rem,5.4vw,5.5rem)] font-medium leading-[0.92] tracking-[-0.05em]">
              Find the limit first
            </h2>
            <p className="mt-8 max-w-[34rem] text-lg leading-8 text-primary-foreground/80">
              Study the whole system under pressure: quality, throughput, latency, cost, tool reliability, and recovery behavior.
            </p>
            <div className="mt-10 flex flex-wrap gap-2" aria-label="Select scale measure">
              {(Object.keys(measures) as Array<keyof typeof measures>).map((measure) => (
                <button
                  key={measure}
                  type="button"
                  onClick={() => setActive(measure)}
                  className={`min-h-11 px-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${active === measure ? "bg-foreground text-background" : "bg-primary-dark text-white hover:bg-foreground hover:text-background"}`}
                >
                  {measure}
                </button>
              ))}
            </div>
          </div>

          <div data-ui className="bg-surface p-5 text-foreground sm:p-8 lg:col-span-7 lg:col-start-6" aria-live="polite">
            <div className="flex items-center justify-between gap-3"><span className="text-muted-foreground">Scale comparison</span><span className="text-sm">Demo data</span></div>
            <div className="mt-9 flex items-end justify-between gap-8">
              <div><span className="text-muted-foreground">{active}</span><strong className="mt-1 block text-5xl font-medium tracking-[-0.04em] tabular-nums">{selected.value}</strong></div>
              <p className="max-w-56 text-right text-sm leading-6 text-muted-foreground">{selected.note}</p>
            </div>
            <div className="mt-10 grid h-52 grid-cols-5 items-end gap-3 bg-background p-5">
              {selected.bars.map((height, index) => (
                <div key={`${active}-${index}`} className="metric-bar bg-primary" style={{ height: `${height}%` }} />
              ))}
            </div>
            <div className="mt-4 flex justify-between text-sm text-muted-foreground"><span>Version A</span><span>Version E</span></div>
          </div>
        </div>
      </section>

      <section className="reveal px-4 py-28 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4 lg:col-start-2">
            <h2 className="text-[clamp(2.6rem,5vw,5rem)] font-medium leading-[0.94] tracking-[-0.045em]">Shared research</h2>
            <p className="mt-8 text-lg leading-8">Keep the system, configuration, dataset, run history, and evaluation result together.</p>
          </div>
          <div data-ui className="bg-surface text-foreground lg:col-span-6 lg:col-start-7">
            {[
              ["Version the experiment", "Harness, model, and evaluator move together."],
              ["Review the exact step", "Comments attach to a decision in the trace."],
              ["Compare before release", "Branches run against the same task set."],
              ["Publish the limitations", "Evidence and constraints travel with the artifact."],
            ].map(([title, text], index) => (
              <div key={title} className={`grid gap-2 px-6 py-6 sm:grid-cols-[1fr_1.2fr] ${index % 2 ? "bg-background" : "bg-surface"}`}>
                <strong className="font-medium">{title}</strong><span className="text-muted-foreground">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-foreground px-4 py-28 text-background sm:px-6 lg:px-8 lg:py-32">
        <p className="mx-auto max-w-[54rem] text-[clamp(1.5rem,2.5vw,2.25rem)] leading-[1.2] tracking-[-0.025em]">
          The next leap will not come from the model alone. It will come from better context, better tools, better feedback, and better proof.
        </p>
      </section>

      <section id="questions" className="reveal px-4 py-28 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <h2 className="text-[clamp(2.8rem,5vw,5rem)] font-medium leading-[0.94] tracking-[-0.045em] lg:col-span-4">Questions</h2>
          <div className="space-y-3 lg:col-span-7 lg:col-start-6">
            <Question question="What is House Zero?">House Zero is an online AI research lab for building, training, evaluating, and sharing models and the harnesses around them.</Question>
            <Question question="What is an AI harness?">It is the runtime around a model: context, tools, memory, permissions, state, and verification for multi-step work.</Question>
            <Question question="Do I need to train a model?">No. Start with an existing model and focus on the harness, then add training when the task requires it.</Question>
            <Question question="Can I test public work?">Yes. Public artifacts are designed to be inspected, run, evaluated, and forked with their setup and limitations attached.</Question>
          </div>
        </div>
      </section>
    </>
  );
}

function Question({ question, children }: { question: string; children: string }) {
  return (
    <details name="house-zero-faq" className="group bg-surface open:bg-primary open:text-primary-foreground">
      <summary className="flex min-h-18 cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 text-xl font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
        {question}<span className="text-2xl font-normal group-open:rotate-45" aria-hidden="true">+</span>
      </summary>
      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-open:grid-rows-[1fr]"><div className="overflow-hidden"><p className="max-w-[52ch] px-5 pb-6 text-lg leading-8">{children}</p></div></div>
    </details>
  );
}
