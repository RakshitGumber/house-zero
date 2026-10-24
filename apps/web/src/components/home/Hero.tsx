import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState, type PointerEvent } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;
const rotatingWords = ["harness", "model", "memory"] as const;

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const imageX = useSpring(pointerX, { damping: 24, stiffness: 90 });
  const imageY = useSpring(pointerY, { damping: 24, stiffness: 90 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const telescopeX = useTransform(scrollYProgress, [0, 0.72], ["0%", "-12%"]);
  const telescopeScale = useTransform(scrollYProgress, [0, 0.72], [1, 1.035]);
  const telescopeOpacity = useTransform(
    scrollYProgress,
    [0, 0.48, 1],
    [1, 0.92, 0],
  );
  const heroOpacity = useTransform(scrollYProgress, [0, 0.28, 0.6], [1, 0.86, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.6], [0, -72]);
  const sightLeft = useTransform(scrollYProgress, [0, 0.82], ["78%", "68%"]);
  const sightTop = useTransform(scrollYProgress, [0, 0.82], ["48%", "48%"]);
  const sightScale = useTransform(scrollYProgress, [0, 0.82], [1, 0.38]);
  const sightOpacity = useTransform(
    scrollYProgress,
    [0, 0.55, 1],
    [0.8, 0.52, 0],
  );

  useEffect(() => {
    if (reduceMotion) return;

    const interval = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % rotatingWords.length);
    }, 3800);

    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    pointerX.set(x * -18);
    pointerY.set(y * -12);
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[165svh] bg-background"
      id="top"
      aria-labelledby="hero-title"
    >
      <div
        className="sticky top-0 isolate h-svh overflow-hidden bg-background"
        onPointerMove={handlePointerMove}
      >
        <motion.div
          className="absolute inset-0 z-0 overflow-hidden bg-black"
          style={{
            x: reduceMotion ? "0%" : telescopeX,
            scale: reduceMotion ? 1 : telescopeScale,
            opacity: telescopeOpacity,
          }}
          aria-hidden="true"
        >
          <motion.img
            className="size-full object-contain object-left-center max-sm:filter-[saturate(.7)_contrast(1.08)_brightness(.65)]!"
            style={{
              x: imageX,
              y: imageY,
              filter: "saturate(.74) contrast(1.08) brightness(.76)",
            }}
            src="/images/telescope-hero-wide.png"
            alt=""
          />
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-background)_50%,transparent)_0%,transparent_25%,transparent_66%,color-mix(in_srgb,var(--color-background)_58%,transparent)_100%),linear-gradient(90deg,color-mix(in_srgb,var(--color-background)_37%,transparent)_0%,transparent_35%,transparent_78%,color-mix(in_srgb,var(--color-background)_25%,transparent)_100%)]"
          style={{ opacity: telescopeOpacity }}
          aria-hidden="true"
        />

        <motion.div
          className="pointer-events-none absolute z-[3] aspect-square w-[54vw] max-w-205 rounded-full border border-primary/20 max-md:w-screen"
          style={{
            x: "-50%",
            y: "-50%",
            rotate: -16,
            left: sightLeft,
            top: sightTop,
            scale: reduceMotion ? 0.46 : sightScale,
            opacity: sightOpacity,
          }}
          aria-hidden="true"
        />
        <motion.div
          className="pointer-events-none absolute z-[3] aspect-square w-[40vw] max-w-152 rounded-full border border-foreground/10 max-md:w-[74vw]"
          style={{
            x: "-50%",
            y: "-50%",
            rotate: -16,
            left: sightLeft,
            top: sightTop,
            scale: reduceMotion ? 0.46 : sightScale,
            opacity: sightOpacity,
          }}
          aria-hidden="true"
        />

        <motion.div
          className="pointer-events-none absolute inset-0 z-[4]"
          style={{ opacity: heroOpacity, y: reduceMotion ? 0 : heroY }}
        >
          <h1
            className="absolute left-8 top-20 m-0 whitespace-nowrap text-[clamp(2rem,6.8vw,6.5rem)] font-normal leading-[1.08] tracking-[-.02em] text-foreground/95 max-md:left-5 max-md:top-16"
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
                      initial={
                        reduceMotion ? false : { y: "100%", opacity: 0 }
                      }
                      animate={{ y: 0, opacity: 1 }}
                      exit={
                        reduceMotion ? undefined : { y: "-100%", opacity: 0 }
                      }
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

          <div className="absolute bottom-15 left-8 w-88 max-md:bottom-36 max-md:left-5 max-md:right-5 max-md:w-auto">
            <p className="m-0 text-lg font-medium leading-relaxed tracking-[-.01em] text-foreground/60 max-md:max-w-[34ch]">
              A home for a new class of AI. Discover System One models, then run
              them yourself or through House Zero.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
