import { clsx } from "clsx";
import { ArrowDownLeft } from "lucide-react";
import { useState, type PointerEvent } from "react";

const models = [
  {
    id: "jev",
    name: "JEV",
    position: "near",
    copy: "A System One model available to inspect through House Zero.",
  },
  {
    id: "clef",
    name: "CLEF",
    position: "middle",
    copy: "Pull it into your own stack, or choose a hosted path.",
  },
  {
    id: "clairic",
    name: "CLAIRIC",
    position: "far",
    copy: "Pair models with portable harnesses and memory modules.",
  },
] as const;

type ModelId = (typeof models)[number]["id"];
type ModelPosition = (typeof models)[number]["position"];

const mediaStateClasses: Record<ModelPosition, string> = {
  near: "object-[51%_center] [filter:saturate(.74)_contrast(1.08)_brightness(.76)]",
  middle:
    "object-[55%_center] [filter:saturate(.82)_contrast(1.1)_brightness(.8)]",
  far: "object-[59%_center] [filter:saturate(.9)_contrast(1.06)_brightness(.84)]",
};

const orbitStateClasses: Record<ModelPosition, string> = {
  near: "left-[80%] top-[51%]",
  middle: "left-[66%] top-[57%]",
  far: "left-[47%] top-[64%]",
};

const focusStateClasses: Record<ModelPosition, string> = {
  near: "left-[81%] top-1/2",
  middle: "left-[61%] top-[61%]",
  far: "left-[35%] top-[72%]",
};

export function HeroSection() {
  const [active, setActive] = useState<ModelId>("jev");
  const current = models.find((model) => model.id === active) ?? models[0];

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.setProperty("--mx", `${x * -18}px`);
    event.currentTarget.style.setProperty("--my", `${y * -12}px`);
  }

  return (
    <section
      className="relative isolate min-h-svh overflow-hidden bg-background [--ease:cubic-bezier(0.16,1,0.3,1)] [--mx:0] [--my:0]"
      id="top"
      aria-labelledby="hero-title"
      onPointerMove={handlePointerMove}
    >
      <div
        className="absolute -inset-6 z-[-4] overflow-hidden motion-safe:animate-reveal-image"
        aria-hidden="true"
      >
        <img
          className={clsx(
            "size-full object-cover [transform:translate(var(--mx),var(--my))_scale(1.025)] [transition:transform_1.1s_var(--ease),object-position_1.2s_var(--ease),filter_.8s_ease] motion-reduce:transition-none max-md:object-[62%_center] max-sm:object-[65%_center] max-sm:[filter:saturate(.7)_contrast(1.08)_brightness(.65)]",
            mediaStateClasses[current.position],
          )}
          src="/images/telescope-hero.png"
          alt=""
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-[-3] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-background)_50%,transparent)_0%,transparent_25%,transparent_66%,color-mix(in_srgb,var(--color-background)_58%,transparent)_100%),linear-gradient(90deg,color-mix(in_srgb,var(--color-background)_37%,transparent)_0%,transparent_35%,transparent_78%,color-mix(in_srgb,var(--color-background)_25%,transparent)_100%)]"
        aria-hidden="true"
      />
      <div
        className={clsx(
          "pointer-events-none absolute z-[-1] aspect-square w-[54vw] max-w-205 -translate-x-1/2 -translate-y-1/2 rotate-[-16deg] rounded-full border border-primary/20 [transition:left_1s_var(--ease),top_1s_var(--ease),opacity_.6s_ease] motion-safe:animate-orbit-pulse motion-reduce:transition-none max-md:left-[73%] max-md:top-[55%] max-md:w-screen",
          orbitStateClasses[current.position],
        )}
        aria-hidden="true"
      />
      <div
        className={clsx(
          "pointer-events-none absolute z-[-1] aspect-square w-[40vw] max-w-152 -translate-x-1/2 -translate-y-1/2 rotate-[-16deg] rounded-full border border-foreground/10 [transition:left_1s_var(--ease),top_1s_var(--ease),opacity_.6s_ease] motion-reduce:transition-none max-md:left-[73%] max-md:top-[55%] max-md:w-[74vw]",
          orbitStateClasses[current.position],
        )}
        aria-hidden="true"
      />

      <h1
        className="pointer-events-none absolute left-8 right-8 top-1/2 z-[3] m-0 flex -translate-y-1/2 justify-between whitespace-nowrap text-9xl font-normal uppercase leading-none tracking-[-.04em] text-foreground/95 max-md:left-5 max-md:right-5 max-md:top-1/3 max-md:flex-col max-md:whitespace-normal max-md:text-8xl max-sm:text-7xl"
        id="hero-title"
      >
        <span className="max-md:block max-md:w-max max-md:max-w-full">SYSTEM</span>
        <span className="text-foreground/90 max-md:block max-md:w-max max-md:max-w-full max-md:self-end max-md:text-left">ONE</span>
      </h1>

      <div
        className={clsx(
          "absolute z-[7] flex items-center gap-3 text-foreground [transition:top_1s_var(--ease),left_1s_var(--ease)] motion-reduce:transition-none max-md:left-[69%] max-md:top-[56%] max-sm:left-[68%] max-sm:top-[53%]",
          focusStateClasses[current.position],
        )}
        aria-hidden="true"
      >
        <span className="relative block size-7 rounded-full border border-foreground/55 before:absolute before:left-1/2 before:top-1/2 before:h-px before:w-2 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-foreground before:content-[''] after:absolute after:left-1/2 after:top-1/2 after:h-2 after:w-px after:-translate-x-1/2 after:-translate-y-1/2 after:bg-foreground after:content-['']" />
        <span className="text-sm font-semibold tracking-[.08em]">{current.name}</span>
      </div>

      <div className="absolute bottom-15 left-8 z-[8] w-88 max-md:bottom-36 max-md:left-5 max-md:right-5 max-md:w-auto">
        <p className="m-0 text-lg font-medium leading-relaxed tracking-[-.01em] max-md:max-w-[34ch]">
          A home for a new class of AI. Discover System One models, then run
          them yourself or through House Zero.
        </p>
        <a
          className="mt-7 inline-flex w-62 items-center justify-between rounded-sm bg-foreground px-4 py-4 text-xs font-semibold uppercase tracking-[.04em] text-background no-underline transition-colors duration-200 hover:bg-primary hover:text-primary-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground max-md:mt-5 max-md:w-55"
          href="#models"
        >
          Enter the observatory
          <ArrowDownLeft aria-hidden="true" size={15} strokeWidth={1.5} />
        </a>
      </div>

      <div
        className="absolute bottom-15 right-8 z-[9] grid w-80 gap-6 max-md:bottom-14 max-md:left-5 max-md:right-5 max-md:w-auto max-md:gap-3"
        id="models"
        data-ui
      >
        <p
          className="m-0 w-[27ch] justify-self-end text-right text-xs uppercase leading-relaxed tracking-[.12em] text-foreground/65 max-md:hidden"
          aria-live="polite"
        >
          {current.copy}
        </p>
        <div
          className="flex justify-end gap-1.5 max-md:justify-start max-sm:gap-1"
          aria-label="Focus a model"
        >
          {models.map((model) => {
            const isActive = model.id === active;

            return (
              <button
                key={model.id}
                type="button"
                className={clsx(
                  "inline-flex min-h-9 cursor-pointer items-center gap-2.5 rounded-sm border border-border bg-background/60 px-3 text-xs tracking-[.08em] text-foreground/60 backdrop-blur-sm transition-colors duration-200 hover:bg-foreground hover:text-background focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground max-sm:flex-1 max-sm:justify-center max-sm:px-2",
                  isActive && "bg-foreground text-background",
                )}
                aria-pressed={isActive}
                onClick={() => setActive(model.id)}
                onPointerEnter={() => setActive(model.id)}
              >
                {model.name}
                <span
                  className={clsx(
                    "block size-1 rounded-full bg-current opacity-50",
                    isActive && "bg-primary opacity-100",
                  )}
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </div>
      </div>

      <div
        className="absolute bottom-5 left-8 right-8 z-[6] flex justify-between text-xs tracking-[.16em] text-foreground/30 max-md:bottom-4 max-md:left-5 max-md:right-5"
        aria-hidden="true"
        data-ui
      >
        <span>OBSERVATION 01</span>
        <span className="max-md:hidden">SELF-HOSTED / HOUSE ZERO HOSTED</span>
        <span>FIELD: SYSTEM ONE</span>
      </div>
    </section>
  );
}
