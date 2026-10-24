import { createRoute } from "@tanstack/react-router";
import { clsx } from "clsx";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { useState, type PointerEvent } from "react";

import { rootRoute } from "@/routes/__root";

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

const navItemClass =
  "inline-flex min-h-[34px] items-center justify-center rounded-[4px] border border-white/[.04] bg-[rgba(13,16,22,.66)] px-3.5 text-[11px] tracking-[-.01em] text-white/80 no-underline backdrop-blur-[9px] transition-colors duration-200 hover:bg-[#f0f1f2] hover:text-[#020305] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#f0f1f2]";

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

function LandingPage() {
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
    <main
      className="min-h-svh bg-[#020305] [--ease:cubic-bezier(0.16,1,0.3,1)] [--mx:0px] [--my:0px]"
      onPointerMove={handlePointerMove}
    >
      <header
        className="absolute inset-x-0 top-0 z-20 grid min-h-[68px] grid-cols-[1fr_auto_1fr] items-center px-[clamp(18px,2vw,30px)] py-3.5 max-[800px]:min-h-[62px] max-[800px]:grid-cols-[1fr_auto]"
        data-ui
      >
        <nav
          aria-label="House Zero sections"
          className="flex gap-1.5 max-[800px]:hidden"
        >
          <a className={navItemClass} href="#models">Models</a>
          <a className={navItemClass} href="#models">Harnesses</a>
          <a className={navItemClass} href="#models">Memory</a>
        </nav>

        <a
          className="text-sm font-semibold tracking-[.34em] text-[#f0f1f2] no-underline focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#f0f1f2] max-[800px]:justify-self-start max-[430px]:text-xs"
          href="#top"
          aria-label="House Zero home"
        >
          HOUSE <span className="text-[#8892ff]">ZERO</span>
        </a>

        <a
          className={clsx(
            navItemClass,
            "justify-self-end gap-3 max-[800px]:absolute max-[800px]:right-[18px] max-[800px]:top-3.5 max-[430px]:min-h-8 max-[430px]:px-[11px]",
          )}
          href="#models"
        >
          Explore <ArrowUpRight aria-hidden="true" size={14} strokeWidth={1.5} />
        </a>
      </header>

      <section
        className="relative isolate min-h-svh overflow-hidden bg-[#020305]"
        id="top"
        aria-labelledby="hero-title"
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
          className="pointer-events-none absolute inset-0 z-[-3] bg-[linear-gradient(180deg,rgba(0,0,0,.5)_0%,transparent_25%,transparent_66%,rgba(0,0,0,.58)_100%),linear-gradient(90deg,rgba(0,0,0,.37)_0%,transparent_35%,transparent_78%,rgba(0,0,0,.25)_100%)]"
          aria-hidden="true"
        />
        <div
          className={clsx(
            "pointer-events-none absolute z-[-1] aspect-square w-[min(54vw,820px)] -translate-x-1/2 -translate-y-1/2 rotate-[-16deg] rounded-full border border-[rgba(145,157,255,.18)] [transition:left_1s_var(--ease),top_1s_var(--ease),opacity_.6s_ease] motion-safe:animate-orbit-pulse motion-reduce:transition-none max-[800px]:left-[73%] max-[800px]:top-[55%] max-[800px]:w-screen",
            orbitStateClasses[current.position],
          )}
          aria-hidden="true"
        />
        <div
          className={clsx(
            "pointer-events-none absolute z-[-1] aspect-square w-[min(40vw,610px)] -translate-x-1/2 -translate-y-1/2 rotate-[-16deg] rounded-full border border-white/10 [transition:left_1s_var(--ease),top_1s_var(--ease),opacity_.6s_ease] motion-reduce:transition-none max-[800px]:left-[73%] max-[800px]:top-[55%] max-[800px]:w-[74vw]",
            orbitStateClasses[current.position],
          )}
          aria-hidden="true"
        />

        <h1
          className="pointer-events-none absolute left-1/2 top-[49%] z-[3] m-0 flex w-[calc(100%-clamp(40px,6vw,108px))] -translate-x-1/2 -translate-y-1/2 justify-between whitespace-nowrap text-[clamp(68px,12.4vw,178px)] font-normal uppercase leading-[.8] tracking-[-.04em] text-[rgba(244,245,246,.96)] max-[800px]:top-[34%] max-[800px]:w-[calc(100%-36px)] max-[800px]:flex-col max-[800px]:whitespace-normal max-[800px]:text-[clamp(64px,18vw,118px)] max-[800px]:leading-[.78] max-[430px]:top-[31%] max-[430px]:text-[20vw]"
          id="hero-title"
        >
          <span className="max-[800px]:block max-[800px]:w-max max-[800px]:max-w-full">SYSTEM</span>
          <span className="text-[rgba(226,228,232,.9)] max-[800px]:block max-[800px]:w-max max-[800px]:max-w-full max-[800px]:self-end max-[800px]:text-left">ONE</span>
        </h1>

        <div
          className={clsx(
            "absolute z-[7] flex items-center gap-[11px] text-[#f0f1f2] [transition:top_1s_var(--ease),left_1s_var(--ease)] motion-reduce:transition-none max-[800px]:left-[69%] max-[800px]:top-[56%] max-[430px]:left-[68%] max-[430px]:top-[53%]",
            focusStateClasses[current.position],
          )}
          aria-hidden="true"
        >
          <span className="relative block size-[26px] rounded-full border border-white/55 before:absolute before:left-1/2 before:top-1/2 before:h-px before:w-2 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-[#f0f1f2] before:content-[''] after:absolute after:left-1/2 after:top-1/2 after:h-2 after:w-px after:-translate-x-1/2 after:-translate-y-1/2 after:bg-[#f0f1f2] after:content-['']" />
          <span className="text-[13px] font-[650] tracking-[.08em]">{current.name}</span>
        </div>

        <div className="absolute bottom-[60px] left-[clamp(18px,2vw,30px)] z-[8] w-[min(350px,32vw)] max-[800px]:bottom-[145px] max-[800px]:left-[18px] max-[800px]:right-[18px] max-[800px]:w-auto">
          <p className="m-0 text-lg font-[450] leading-[1.42] tracking-[-.01em] max-[800px]:max-w-[34ch]">
            A home for a new class of AI. Discover System One models, then run
            them yourself or through House Zero.
          </p>
          <a
            className="mt-7 inline-flex w-[248px] items-center justify-between rounded-[3px] bg-[#f0f1f2] px-[17px] py-[15px] text-[10px] font-[650] uppercase tracking-[.04em] text-[#020305] no-underline transition-colors duration-200 hover:bg-[#8892ff] hover:text-[#05050a] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#f0f1f2] max-[800px]:mt-5 max-[800px]:w-[220px]"
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
            className="m-0 w-[27ch] justify-self-end text-right text-[10px] uppercase leading-[1.7] tracking-[.12em] text-white/65 max-[800px]:hidden"
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
                    "inline-flex min-h-[34px] cursor-pointer items-center gap-2.5 rounded-[3px] border border-white/10 bg-[rgba(6,8,12,.58)] px-[13px] text-[10px] tracking-[.08em] text-white/60 backdrop-blur-[8px] transition-colors duration-200 hover:bg-[#f0f1f2] hover:text-[#020305] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#f0f1f2] max-[430px]:flex-1 max-[430px]:justify-center max-[430px]:px-2",
                    isActive && "bg-[#f0f1f2] text-[#020305]",
                  )}
                  aria-pressed={isActive}
                  onClick={() => setActive(model.id)}
                  onPointerEnter={() => setActive(model.id)}
                >
                  {model.name}
                  <span
                    className={clsx(
                      "block size-1 rounded-full bg-current opacity-50",
                      isActive && "bg-[#8892ff] opacity-100",
                    )}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div
          className="absolute bottom-[18px] left-[clamp(18px,2vw,30px)] right-[clamp(18px,2vw,30px)] z-[6] flex justify-between text-[8px] tracking-[.16em] text-white/30 max-[800px]:bottom-4 max-[800px]:left-[18px] max-[800px]:right-[18px]"
          aria-hidden="true"
          data-ui
        >
          <span>OBSERVATION 01</span>
          <span className="max-[800px]:hidden">SELF-HOSTED / HOUSE ZERO HOSTED</span>
          <span>FIELD: SYSTEM ONE</span>
        </div>
      </section>
    </main>
  );
}

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});
