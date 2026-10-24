import { Icon } from "@iconify/react";
import { clsx } from "clsx";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useState, type PointerEvent } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;

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

const mediaStates: Record<ModelPosition, { filter: string; objectPosition: string }> = {
  near: {
    filter: "saturate(.74) contrast(1.08) brightness(.76)",
    objectPosition: "51% center",
  },
  middle: {
    filter: "saturate(.82) contrast(1.1) brightness(.8)",
    objectPosition: "55% center",
  },
  far: {
    filter: "saturate(.9) contrast(1.06) brightness(.84)",
    objectPosition: "59% center",
  },
};

const orbitStates: Record<ModelPosition, { left: string; top: string }> = {
  near: { left: "80%", top: "51%" },
  middle: { left: "66%", top: "57%" },
  far: { left: "47%", top: "64%" },
};

const focusStates: Record<ModelPosition, { left: string; top: string }> = {
  near: { left: "81%", top: "50%" },
  middle: { left: "61%", top: "61%" },
  far: { left: "35%", top: "72%" },
};

export function HeroSection() {
  const [active, setActive] = useState<ModelId>("jev");
  const current = models.find((model) => model.id === active) ?? models[0];
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const imageX = useSpring(pointerX, { damping: 24, stiffness: 90 });
  const imageY = useSpring(pointerY, { damping: 24, stiffness: 90 });

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (reduceMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    pointerX.set(x * -18);
    pointerY.set(y * -12);
  }

  return (
    <section
      className="relative isolate min-h-svh overflow-hidden bg-background"
      id="top"
      aria-labelledby="hero-title"
      onPointerMove={handlePointerMove}
    >
      <motion.div
        className="absolute -inset-6 z-[-4] overflow-hidden"
        initial={reduceMotion ? false : { clipPath: "inset(0 0 100% 0)", opacity: 0.2 }}
        animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
        transition={{ duration: reduceMotion ? 0 : 1.2, ease: easeOut }}
        aria-hidden="true"
      >
        <motion.img
          className="size-full object-cover max-md:!object-[62%_center] max-sm:!object-[65%_center] max-sm:![filter:saturate(.7)_contrast(1.08)_brightness(.65)]"
          style={{ x: imageX, y: imageY, scale: 1.025 }}
          animate={mediaStates[current.position]}
          transition={{
            filter: { duration: reduceMotion ? 0 : 0.8, ease: "easeInOut" },
            objectPosition: { duration: reduceMotion ? 0 : 1.2, ease: easeOut },
          }}
          src="/images/telescope-hero.png"
          alt=""
        />
      </motion.div>
      <div
        className="pointer-events-none absolute inset-0 z-[-3] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-background)_50%,transparent)_0%,transparent_25%,transparent_66%,color-mix(in_srgb,var(--color-background)_58%,transparent)_100%),linear-gradient(90deg,color-mix(in_srgb,var(--color-background)_37%,transparent)_0%,transparent_35%,transparent_78%,color-mix(in_srgb,var(--color-background)_25%,transparent)_100%)]"
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute z-[-1] aspect-square w-[54vw] max-w-205 rounded-full border border-primary/20 max-md:!left-[73%] max-md:!top-[55%] max-md:w-screen"
        style={{ x: "-50%", y: "-50%", rotate: -16 }}
        animate={{
          ...orbitStates[current.position],
          opacity: reduceMotion ? 0.72 : [0.45, 1, 0.45],
          scale: reduceMotion ? 1 : [0.98, 1.02, 0.98],
        }}
        transition={{
          left: { duration: reduceMotion ? 0 : 1, ease: easeOut },
          top: { duration: reduceMotion ? 0 : 1, ease: easeOut },
          opacity: { duration: reduceMotion ? 0 : 8, ease: "easeInOut", repeat: reduceMotion ? 0 : Infinity },
          scale: { duration: reduceMotion ? 0 : 8, ease: "easeInOut", repeat: reduceMotion ? 0 : Infinity },
        }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute z-[-1] aspect-square w-[40vw] max-w-152 rounded-full border border-foreground/10 max-md:!left-[73%] max-md:!top-[55%] max-md:w-[74vw]"
        style={{ x: "-50%", y: "-50%", rotate: -16 }}
        animate={orbitStates[current.position]}
        transition={{ duration: reduceMotion ? 0 : 1, ease: easeOut }}
        aria-hidden="true"
      />

      <h1
        className="pointer-events-none absolute left-8 right-8 top-1/2 z-[3] m-0 flex -translate-y-1/2 justify-between whitespace-nowrap text-9xl font-normal uppercase leading-none tracking-[-.04em] text-foreground/95 max-md:left-5 max-md:right-5 max-md:top-1/3 max-md:flex-col max-md:whitespace-normal max-md:text-8xl max-sm:text-7xl"
        id="hero-title"
      >
        <span className="max-md:block max-md:w-max max-md:max-w-full">SYSTEM</span>
        <span className="text-foreground/90 max-md:block max-md:w-max max-md:max-w-full max-md:self-end max-md:text-left">ONE</span>
      </h1>

      <motion.div
        className="absolute z-[7] flex items-center gap-3 text-foreground max-md:!left-[69%] max-md:!top-[56%] max-sm:!left-[68%] max-sm:!top-[53%]"
        animate={focusStates[current.position]}
        transition={{ duration: reduceMotion ? 0 : 1, ease: easeOut }}
        aria-hidden="true"
      >
        <span className="relative block size-7 rounded-full border border-foreground/55 before:absolute before:left-1/2 before:top-1/2 before:h-px before:w-2 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-foreground before:content-[''] after:absolute after:left-1/2 after:top-1/2 after:h-2 after:w-px after:-translate-x-1/2 after:-translate-y-1/2 after:bg-foreground after:content-['']" />
        <span className="text-sm font-semibold tracking-[.08em]">{current.name}</span>
      </motion.div>

      <div className="absolute bottom-15 left-8 z-[8] w-88 max-md:bottom-36 max-md:left-5 max-md:right-5 max-md:w-auto">
        <p className="m-0 text-lg font-medium leading-relaxed tracking-[-.01em] max-md:max-w-[34ch]">
          A home for a new class of AI. Discover System One models, then run
          them yourself or through House Zero.
        </p>
        <motion.a
          className="mt-7 inline-flex w-62 items-center justify-between rounded-sm bg-foreground px-4 py-4 text-xs font-semibold uppercase tracking-[.04em] text-background no-underline max-md:mt-5 max-md:w-55"
          whileHover={{ backgroundColor: "var(--color-primary)", color: "var(--color-primary-foreground)" }}
          transition={{ duration: 0.2 }}
          href="#models"
        >
          Enter the observatory
          <Icon aria-hidden="true" icon="solar:arrow-left-down-linear" width={15} />
        </motion.a>
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
              <motion.button
                key={model.id}
                type="button"
                className={clsx(
                  "inline-flex min-h-9 cursor-pointer items-center gap-2.5 rounded-sm border border-border bg-background/60 px-3 text-xs tracking-[.08em] text-foreground/60 backdrop-blur-sm max-sm:flex-1 max-sm:justify-center max-sm:px-2",
                )}
                animate={{
                  backgroundColor: isActive ? "var(--color-foreground)" : "rgb(2 3 5 / 0.6)",
                  color: isActive ? "var(--color-background)" : "rgb(240 241 242 / 0.6)",
                }}
                whileHover={{ backgroundColor: "var(--color-foreground)", color: "var(--color-background)" }}
                transition={{ duration: reduceMotion ? 0 : 0.2 }}
                aria-pressed={isActive}
                onClick={() => setActive(model.id)}
                onPointerEnter={() => setActive(model.id)}
              >
                {model.name}
                <motion.span
                  className="block size-1 rounded-full"
                  animate={{
                    backgroundColor: isActive ? "var(--color-primary)" : "currentColor",
                    opacity: isActive ? 1 : 0.5,
                  }}
                  transition={{ duration: reduceMotion ? 0 : 0.2 }}
                  aria-hidden="true"
                />
              </motion.button>
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
