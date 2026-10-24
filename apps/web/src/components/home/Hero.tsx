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
      className="relative isolate min-h-svh overflow-hidden bg-background [--ease:cubic-bezier(0.16,1,0.3,1)] [--mx:0px] [--my:0px]"
      id="top"
      aria-labelledby="hero-title"
      onPointerMove={handlePointerMove}
    >
      <div
        className="absolute inset-0 z-[-4] overflow-hidden motion-safe:animate-reveal-image"
        aria-hidden="true"
      >
        <img
          className={clsx(
            "-mx-[22px] -my-4 h-[calc(100%+32px)] w-[calc(100%+44px)] object-cover [transform:translate(var(--mx),var(--my))_scale(1.025)] [transition:transform_1.1s_var(--ease),object-position_1.2s_var(--ease),filter_.8s_ease] motion-reduce:transition-none max-[800px]:object-[62%_center] max-[430px]:object-[65%_center] max-[430px]:[filter:saturate(.7)_contrast(1.08)_brightness(.65)]",
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
          "pointer-events-none absolute z-[-1] aspect-square w-[min(54vw,820px)] -translate-x-1/2 -translate-y-1/2 rotate-[-16deg] rounded-full border border-primary/20 [transition:left_1s_var(--ease),top_1s_var(--ease),opacity_.6s_ease] motion-safe:animate-orbit-pulse motion-reduce:transition-none max-[800px]:left-[73%] max-[800px]:top-[55%] max-[800px]:w-screen",
          orbitStateClasses[current.position],
        )}
        aria-hidden="true"
      />
      <div
        className={clsx(
          "pointer-events-none absolute z-[-1] aspect-square w-[min(40vw,610px)] -translate-x-1/2 -translate-y-1/2 rotate-[-16deg] rounded-full border border-foreground/10 [transition:left_1s_var(--ease),top_1s_var(--ease),opacity_.6s_ease] motion-reduce:transition-none max-[800px]:left-[73%] max-[800px]:top-[55%] max-[800px]:w-[74vw]",
          orbitStateClasses[current.position],
        )}
        aria-hidden="true"
      />

      <h1
        className="pointer-events-none absolute left-1/2 top-[49%] z-[3] m-0 flex w-[calc(100%-clamp(40px,6vw,108px))] -translate-x-1/2 -translate-y-1/2 justify-between whitespace-nowrap text-[clamp(68px,12.4vw,178px)] font-normal uppercase leading-[.8] tracking-[-.04em] text-foreground/95 max-[800px]:top-[34%] max-[800px]:w-[calc(100%-36px)] max-[800px]:flex-col max-[800px]:whitespace-normal max-[800px]:text-[clamp(64px,18vw,118px)] max-[800px]:leading-[.78] max-[430px]:top-[31%] max-[430px]:text-[20vw]"
        id="hero-title"
      >
        <span className="max-[800px]:block max-[800px]:w-max max-[800px]:max-w-full">SYSTEM</span>
        <span className="text-foreground/90 max-[800px]:block max-[800px]:w-max max-[800px]:max-w-full max-[800px]:self-end max-[800px]:text-left">ONE</span>
      </h1>

      <div
        className={clsx(
          "absolute z-[7] flex items-center gap-[11px] text-foreground [transition:top_1s_var(--ease),left_1s_var(--ease)] motion-reduce:transition-none max-[800px]:left-[69%] max-[800px]:top-[56%] max-[430px]:left-[68%] max-[430px]:top-[53%]",
          focusStateClasses[current.position],
        )}
        aria-hidden="true"
      >
        <span className="relative block size-[26px] rounded-full border border-foreground/55 before:absolute before:left-1/2 before:top-1/2 before:h-px before:w-2 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-foreground before:content-[''] after:absolute after:left-1/2 after:top-1/2 after:h-2 after:w-px after:-translate-x-1/2 after:-translate-y-1/2 after:bg-foreground after:content-['']" />
        <span className="text-[13px] font-[650] tracking-[.08em]">{current.name}</span>
      </div>

      <div className="absolute bottom-[60px] left-[clamp(18px,2vw,30px)] z-[8] w-[min(350px,32vw)] max-[800px]:bottom-[145px] max-[800px]:left-[18px] max-[800px]:right-[18px] max-[800px]:w-auto">
        <p className="m-0 text-lg font-[450] leading-[1.42] tracking-[-.01em] max-[800px]:max-w-[34ch]">
          A home for a new class of AI. Discover System One models, then run
          them yourself or through House Zero.
        </p>
        <a
          className="mt-7 inline-flex w-[248px] items-center justify-between rounded-[3px] bg-foreground px-[17px] py-[15px] text-[10px] font-[650] uppercase tracking-[.04em] text-background no-underline transition-colors duration-200 hover:bg-primary hover:text-primary-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground max-[800px]:mt-5 max-[800px]:w-[220px]"
          href="#models"
        >
          Enter the observatory
          <ArrowDownLeft aria-hidden="true" size={15} strokeWidth={1.5} />
        </a>
      </div>

      <div
        className="absolute bottom-[60px] right-[clamp(18px,2vw,30px)] z-[9] grid w-[min(320px,32vw)] gap-[22px] max-[800px]:bottom-[54px] max-[800px]:left-[18px] max-[800px]:right-[18px] max-[800px]:w-auto max-[800px]:gap-3"
        id="models"
        data-ui
      >
        <p
          className="m-0 w-[27ch] justify-self-end text-right text-[10px] uppercase leading-[1.7] tracking-[.12em] text-foreground/65 max-[800px]:hidden"
          aria-live="polite"
        >
          {current.copy}
        </p>
        <div
          className="flex justify-end gap-1.5 max-[800px]:justify-start max-[430px]:gap-1"
          aria-label="Focus a model"
        >
          {models.map((model) => {
            const isActive = model.id === active;

            return (
              <button
                key={model.id}
                type="button"
                className={clsx(
                  "inline-flex min-h-[34px] cursor-pointer items-center gap-2.5 rounded-[3px] border border-border bg-background/60 px-[13px] text-[10px] tracking-[.08em] text-foreground/60 backdrop-blur-[8px] transition-colors duration-200 hover:bg-foreground hover:text-background focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground max-[430px]:flex-1 max-[430px]:justify-center max-[430px]:px-2",
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
        className="absolute bottom-[18px] left-[clamp(18px,2vw,30px)] right-[clamp(18px,2vw,30px)] z-[6] flex justify-between text-[8px] tracking-[.16em] text-foreground/30 max-[800px]:bottom-4 max-[800px]:left-[18px] max-[800px]:right-[18px]"
        aria-hidden="true"
        data-ui
      >
        <span>OBSERVATION 01</span>
        <span className="max-[800px]:hidden">SELF-HOSTED / HOUSE ZERO HOSTED</span>
        <span>FIELD: SYSTEM ONE</span>
      </div>
    </section>
  );
}
