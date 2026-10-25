const workflow = [
  {
    title: "Compose the harness",
    text: "Choose a model. Add context, tools, memory, permissions, and evaluators.",
    response: "Model + retrieval + memory + citation check",
  },
  {
    title: "Run the experiment",
    text: "Test one task or a full dataset and watch every decision as it happens.",
    response: "18 trace events · 3 tool calls · 1 completed task",
  },
  {
    title: "Measure the change",
    text: "Compare versions against the same tasks and see which failures remain.",
    response: "24 runs compared · 4 regressions isolated",
  },
  {
    title: "Publish the evidence",
    text: "Keep it private or share a reproducible artifact others can inspect and fork.",
    response: "Setup + dependencies + results + limitations",
  },
];

const capabilities = [
  ["Harness builder", "Connect models, tools, context, memory, policies, and evaluators."],
  ["Model workshop", "Train, fine-tune, version, and compare specialist models."],
  ["Evaluation suites", "Turn successful behavior into repeatable tests and graders."],
  ["Trace observatory", "Inspect prompts, retrieval, tool calls, latency, and cost."],
  ["Scale chamber", "Repeat complete workflows and find limits before users do."],
];

const comparison = [
  ["Model configuration", "Often separate", "Saved with the run"],
  ["Harness and tools", "Often implicit", "Visible and versioned"],
  ["Inputs and dataset", "Manually tracked", "Attached to the experiment"],
  ["Execution trace", "Provider dependent", "Readable step by step"],
  ["Evaluation method", "Added later", "Defined beside the task"],
  ["Reproduction", "Rebuild the setup", "Fork and rerun"],
];

export function Directory() {
  return (
    <>
      <section id="product" className="reveal px-4 py-28 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-4 lg:col-start-2">
            <h2 className="text-[clamp(2.6rem,5vw,5rem)] font-medium leading-[0.94] tracking-[-0.045em]">
              The whole system
            </h2>
            <p className="mt-8 max-w-[34rem] text-lg leading-8">
              The harness decides what the model can see, which tools it can use, what it remembers, when it stops, and how its work is verified.
            </p>
          </div>
          <SystemMap />
        </div>
      </section>

      <section className="reveal bg-surface px-4 py-28 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-[76rem]">
          <h2 className="text-[clamp(2.6rem,5vw,5rem)] font-medium leading-[0.94] tracking-[-0.045em]">
            From question to proof
          </h2>
          <div className="mt-16 space-y-16 sm:mt-24 sm:space-y-24">
            {workflow.map((item, index) => (
              <article key={item.title} className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                <div className={index % 2 ? "lg:col-start-2" : ""}>
                  <h3 className="text-2xl font-medium tracking-[-0.025em]">{item.title}</h3>
                  <p className="mt-3 max-w-[33rem] text-lg leading-7">{item.text}</p>
                </div>
                <div
                  data-ui
                  className={`bg-surface p-5 text-foreground ${index % 2 ? "lg:col-start-1 lg:row-start-1" : ""}`}
                >
                  <div className="flex items-center justify-between gap-4 text-sm text-muted-foreground">
                    <span>House Zero response</span>
                    <span>Demo</span>
                  </div>
                  <p className="mt-8 text-xl font-medium">{item.response}</p>
                  <div className="mt-5 h-2 bg-background">
                    <div className="h-full bg-primary" style={{ width: `${62 + index * 9}%` }} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="experiments" className="reveal overflow-hidden bg-foreground py-28 text-background lg:py-32">
        <div className="px-4 sm:px-6 lg:px-8">
          <h2 className="max-w-[12ch] text-[clamp(2.8rem,5.5vw,5.5rem)] font-medium leading-[0.92] tracking-[-0.045em]">
            Inside the lab
          </h2>
          <p className="mt-7 max-w-[38rem] text-lg leading-8 text-background/75">
            Build, train, inspect, compare, and publish without breaking the chain of evidence.
          </p>
        </div>
        <div className="hide-scrollbar mt-16 flex snap-x gap-5 overflow-x-auto px-4 pb-4 sm:px-6 lg:px-8">
          {capabilities.map(([title, text], index) => (
            <article
              data-ui
              key={title}
              className={`min-h-[24rem] w-[82vw] shrink-0 snap-center p-6 text-foreground sm:w-[28rem] ${index === 0 ? "bg-surface" : "bg-background"}`}
            >
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{title}</span>
                <span>{index === 0 ? "Active" : "Ready"}</span>
              </div>
              <div className="mt-12 bg-foreground p-5 text-background">
                <div className="flex gap-2">
                  <span className="h-10 flex-1 bg-primary" />
                  <span className="h-10 flex-1 bg-muted-foreground" />
                  <span className="h-10 flex-1 bg-muted-foreground" />
                </div>
                <div className="mt-3 h-28 bg-foreground p-4 text-sm text-background/70">
                  {index === 0 ? "Model → Tool → Evaluator" : "Experiment state available"}
                </div>
              </div>
              <h3 className="mt-8 text-2xl font-medium">{title}</h3>
              <p className="mt-3 leading-7 text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="reveal px-4 py-28 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <h2 className="max-w-[10ch] text-[clamp(2.6rem,5vw,5rem)] font-medium leading-[0.94] tracking-[-0.045em] lg:col-span-4">
            What travels with the result
          </h2>
          <div data-ui className="overflow-x-auto lg:col-span-8">
            <div className="min-w-[42rem] text-base">
              <div className="grid grid-cols-[1.2fr_1fr_1fr] bg-foreground px-5 py-4 font-medium text-background">
                <span>Capability</span><span>Single output</span><span>House Zero</span>
              </div>
              {comparison.map((row, index) => (
                <div key={row[0]} className={`grid grid-cols-[1.2fr_1fr_1fr] px-5 py-5 ${index % 2 ? "bg-background" : "bg-surface"}`}>
                  <strong className="font-medium">{row[0]}</strong><span className="text-muted-foreground">{row[1]}</span><span>{row[2]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="reveal bg-surface px-4 py-28 sm:px-6 lg:px-8 lg:py-32">
        <div className="artifact-board grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <div className="stage-cut min-h-64 bg-primary p-7 text-primary-foreground md:col-span-2">
            <h2 className="max-w-[10ch] text-[clamp(2.8rem,5vw,5rem)] font-medium leading-[0.92] tracking-[-0.045em]">
              The open floor
            </h2>
          </div>
          <Artifact title="Deep-source research loop" type="Concept harness" text="Gather, challenge, and synthesize evidence with source-level traceability." />
          <Artifact title="Citation integrity suite" type="Concept evaluation" text="Check whether an answer is supported, complete, and correctly attributed." />
          <Artifact title="Compact workflow router" type="Concept model" text="Route work across tools and agents under a defined latency budget." />
          <div className="min-h-64 bg-foreground p-7 text-background md:col-span-2 lg:col-span-1">
            <p className="text-xl leading-8">Test the work, not the claim.</p>
            <a className="mt-16 inline-block underline underline-offset-4" href="#create">Publish an experiment</a>
          </div>
        </div>
      </section>
    </>
  );
}

function SystemMap() {
  return (
    <div data-ui className="bg-surface p-5 text-foreground lg:col-span-7 lg:col-start-6 sm:p-8">
      <div className="flex items-center justify-between text-sm text-muted-foreground"><span>Research harness</span><span>Demo system</span></div>
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {[
          ["Task", "Research brief"], ["Context", "12 sources"], ["Model", "Clairic 7B"],
          ["Tools", "Search + index"], ["Memory", "Project scope"], ["Evaluator", "Citation check"],
        ].map(([label, value], index) => (
          <div key={label} className={`min-h-28 p-4 ${index === 2 || index === 5 ? "bg-primary text-primary-foreground" : "bg-background"}`}>
            <span className="block text-sm opacity-70">{label}</span>
            <strong className="mt-5 block font-medium">{value}</strong>
          </div>
        ))}
      </div>
      <p className="mt-5 bg-foreground p-4 text-background">The evaluation returns evidence to the next version of the system.</p>
    </div>
  );
}

function Artifact({ title, type, text }: { title: string; type: string; text: string }) {
  return (
    <article className="flex min-h-64 flex-col justify-between bg-background p-7">
      <p className="text-sm text-muted-foreground">{type}</p>
      <div>
        <h3 className="text-2xl font-medium tracking-[-0.025em]">{title}</h3>
        <p className="mt-4 leading-7 text-muted-foreground">{text}</p>
      </div>
    </article>
  );
}
