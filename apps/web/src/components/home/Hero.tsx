import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useEffect, useState, type PointerEvent } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;
const rotatingWords = ["harness", "model", "memory"] as const;

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const imageX = useSpring(pointerX, { damping: 24, stiffness: 90 });
  const imageY = useSpring(pointerY, { damping: 24, stiffness: 90 });

  useEffect(() => {
    if (reduceMotion) return;

    const interval = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % rotatingWords.length);
    }, 3800);

    return () => window.clearInterval(interval);
  }, [reduceMotion]);

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
        initial={
          reduceMotion ? false : { clipPath: "inset(0 0 100% 0)", opacity: 0.2 }
        }
        animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
        transition={{ duration: reduceMotion ? 0 : 1.2, ease: easeOut }}
        aria-hidden="true"
      >
        <motion.img
          className="size-full object-cover max-md:object-[62%_center]! max-sm:object-[65%_center]! max-sm:filter-[saturate(.7)_contrast(1.08)_brightness(.65)]!"
          style={{
            x: imageX,
            y: imageY,
            scale: 1.025,
            filter: "saturate(.74) contrast(1.08) brightness(.76)",
            objectPosition: "51% center",
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
        style={{ x: "-50%", y: "-50%", rotate: -16, left: "80%", top: "51%" }}
        animate={{
          opacity: reduceMotion ? 0.72 : [0.45, 1, 0.45],
          scale: reduceMotion ? 1 : [0.98, 1.02, 0.98],
        }}
        transition={{
          opacity: {
            duration: reduceMotion ? 0 : 8,
            ease: "easeInOut",
            repeat: reduceMotion ? 0 : Infinity,
          },
          scale: {
            duration: reduceMotion ? 0 : 8,
            ease: "easeInOut",
            repeat: reduceMotion ? 0 : Infinity,
          },
        }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute z-[-1] aspect-square w-[40vw] max-w-152 rounded-full border border-foreground/10 max-md:!left-[73%] max-md:!top-[55%] max-md:w-[74vw]"
        style={{ x: "-50%", y: "-50%", rotate: -16, left: "80%", top: "51%" }}
        aria-hidden="true"
      />

      <h1
        className="pointer-events-none absolute left-8 top-20 z-[3] m-0 whitespace-nowrap text-[clamp(2rem,6.8vw,6.5rem)] font-normal leading-[1.08] tracking-[-.02em] text-foreground/95 max-md:left-5 max-md:top-16"
        id="hero-title"
      >
        <span className="sr-only">
          Learn, Research and Develop your own harness, model, or memory.
        </span>
        <span className="flex flex-col items-start" aria-hidden="true">
          <span>Learn,</span>
          <span>Research and</span>
          <span>Develop your</span>
          <span className="flex items-baseline">
            <span>own&nbsp;</span>
            <span className="inline-grid h-[1.2em] min-w-[7ch] overflow-hidden align-bottom leading-[1.08]">
              <AnimatePresence initial={false}>
                <motion.span
                  key={rotatingWords[wordIndex]}
                  className="col-start-1 row-start-1 text-primary"
                  initial={reduceMotion ? false : { y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={reduceMotion ? undefined : { y: "-100%", opacity: 0 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.8,
                    ease: easeOut,
                  }}
                >
                  {rotatingWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </span>
        </span>
      </h1>

      <div className="absolute bottom-15 left-8 z-[8] w-88 max-md:bottom-36 max-md:left-5 max-md:right-5 max-md:w-auto">
        <p className="m-0 text-lg font-medium leading-relaxed tracking-[-.01em] text-foreground/60 max-md:max-w-[34ch]">
          A home for a new class of AI. Discover System One models, then run
          them yourself or through House Zero.
        </p>
      </div>
    </section>
  );
}
