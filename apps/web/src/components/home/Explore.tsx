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

import { ParticleEarth } from "@/components/home/ParticleEarth";
import { StarField } from "@/components/home/StarField";

const easeOut = [0.16, 1, 0.3, 1] as const;
const rotatingWords = ["harness", "model", "memory"] as const;

const leftBuilds = [
  {
    type: "Harness",
    title: "Evaluation loops",
    copy: "Repeatable ways to test, compare, and improve model behavior.",
  },
  {
    type: "Model",
    title: "Domain specialists",
    copy: "Focused intelligence shaped around a specific body of work.",
  },
];

const rightBuilds = [
  {
    type: "Memory",
    title: "Portable context",
    copy: "Knowledge that can move with an agent instead of staying in one app.",
  },
  {
    type: "Research",
    title: "Working agents",
    copy: "Systems that investigate, record evidence, and leave an inspectable trail.",
  },
];

export function ExploreSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const scenePointerX = useSpring(pointerX, { damping: 24, stiffness: 90 });
  const scenePointerY = useSpring(pointerY, { damping: 24, stiffness: 90 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // The telescope and Earth sit on opposite sides of a broad interior
  // cylinder. The oversized surfaces keep their rectangular edges outside the
  // viewport while the world turns around the viewer.
  const stageRotationTarget = useTransform(
    scrollYProgress,
    [0, 0.08, 0.82, 1],
    [0, 0, 180, 180],
  );
  const stageRotateY = useSpring(stageRotationTarget, {
    stiffness: 64,
    damping: 22,
    mass: 0.5,
  });
  const reducedFrontOpacity = useTransform(scrollYProgress, [0, 0.46, 0.54, 1], [1, 1, 0, 0]);
  const reducedBackOpacity = useTransform(scrollYProgress, [0, 0.46, 0.54, 1], [0, 0, 1, 1]);
  const focusOpacity = useTransform(scrollYProgress, [0.57, 0.7], [0, 1]);
  const buildsOpacity = useTransform(scrollYProgress, [0.66, 0.78], [0, 1]);
  const leftBuildX = useTransform(scrollYProgress, [0.66, 0.8], [-56, 0]);
  const rightBuildX = useTransform(scrollYProgress, [0.66, 0.8], [56, 0]);
  const instructionOpacity = useTransform(scrollYProgress, [0.72, 0.84], [0, 1]);

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
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 24);
    pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 16);
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[500svh] bg-black"
      id="top"
      aria-labelledby="hero-title"
    >
      <div id="models" className="pointer-events-none absolute top-[370svh]" />

      <div
        className="sticky top-0 h-svh overflow-hidden bg-[#01040b]"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <StarField scrollProgress={scrollYProgress} />

        <div
          className="absolute inset-0"
          style={{ perspective: "1400px", perspectiveOrigin: "50% 50%" }}
        >
          <motion.div
            className="absolute inset-0 will-change-transform"
            style={{
              rotateY: reduceMotion ? 0 : stageRotateY,
              transformStyle: "preserve-3d",
              // The pivot is behind the front plane and in front of the rear
              // plane, placing the viewer inside the cylindrical scene.
              transformOrigin: "50% 50% 1100px",
            }}
          >
            <motion.div
              className="absolute inset-y-0 left-[-60vw] w-[220vw] overflow-hidden bg-[#01040b]"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                opacity: reduceMotion ? reducedFrontOpacity : 1,
                transform: "translateZ(0)",
              }}
            >
              <div className="absolute inset-y-0 left-[60vw] w-screen">
              <motion.div
                className="absolute inset-0"
                style={{
                  x: reduceMotion ? 0 : scenePointerX,
                  y: reduceMotion ? 0 : scenePointerY,
                }}
              >
                <img
                  className="absolute left-[-4vw] top-1/2 w-[165vw] max-w-none -translate-y-[35%] object-contain max-md:left-[-72vw] max-md:w-[285vw] max-md:-translate-y-[40%]"
                  style={{
                    filter:
                      "saturate(.82) contrast(1.08) brightness(.78) drop-shadow(0 0 14px rgb(167 108 255 / .48)) drop-shadow(0 0 38px rgb(124 58 237 / .28))",
                  }}
                  src="/images/telescope-cutout.png"
                  alt=""
                />
              </motion.div>

              <h1
                className="absolute left-8 top-20 z-[2] m-0 whitespace-nowrap text-[clamp(2rem,6.8vw,6.5rem)] font-normal leading-[1.08] tracking-[-.02em] text-foreground/95 max-md:left-5 max-md:top-16"
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

              <p className="absolute bottom-15 left-8 z-[2] m-0 w-88 text-lg font-medium leading-relaxed tracking-[-.01em] text-foreground/60 max-md:bottom-24 max-md:left-5 max-md:w-[min(34ch,calc(100vw-2.5rem))]">
                A home for a new class of AI. Discover System One models, then run
                them yourself or through House Zero.
              </p>
              </div>
            </motion.div>

            <motion.div
              className="absolute inset-y-0 left-[-60vw] w-[220vw] overflow-hidden bg-[#01040b]"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                opacity: reduceMotion ? reducedBackOpacity : 1,
                transform: reduceMotion
                  ? "translateZ(0)"
                  : "rotateY(180deg) translateZ(-2200px)",
              }}
            >
              <div className="absolute inset-y-0 left-[60vw] w-screen overflow-hidden">
              <motion.div
                className="absolute inset-0"
                style={{
                  x: reduceMotion ? 0 : scenePointerX,
                  y: reduceMotion ? 0 : scenePointerY,
                }}
              >
                <ParticleEarth scrollProgress={scrollYProgress} />
              </motion.div>

            <motion.div
              className="pointer-events-none absolute left-1/2 top-1/2 z-[1] aspect-square w-[min(70vw,70vh)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20"
              style={{ opacity: focusOpacity }}
              aria-hidden="true"
            />

            <div className="pointer-events-none absolute left-8 top-20 z-[2] max-w-xl max-md:left-5 max-md:right-5 max-md:top-16">
              <h2 className="m-0 text-[clamp(2.25rem,4.8vw,4.75rem)] font-normal leading-[.98] tracking-[-.03em] text-foreground">
                Explore the field.
              </h2>
              <p className="mb-0 mt-4 max-w-[42ch] text-lg leading-relaxed text-foreground/60 max-md:text-base">
                See what builders are assembling around open models, harnesses,
                and memory.
              </p>
            </div>

            <motion.div
              className="pointer-events-none absolute left-8 top-[34%] z-[2] w-[22vw] max-w-78 space-y-12 max-md:bottom-9 max-md:left-5 max-md:top-auto max-md:w-[42%] max-md:space-y-6"
              style={{
                opacity: buildsOpacity,
                x: reduceMotion ? 0 : leftBuildX,
              }}
            >
              {leftBuilds.map((build) => (
                <article key={build.title}>
                  <p className="m-0 text-sm font-semibold text-primary">{build.type}</p>
                  <h3 className="mb-0 mt-2 text-xl font-normal leading-tight text-foreground max-md:text-base">
                    {build.title}
                  </h3>
                  <p className="mb-0 mt-2 text-base leading-relaxed text-foreground/55 max-md:hidden">
                    {build.copy}
                  </p>
                </article>
              ))}
            </motion.div>

            <motion.div
              className="pointer-events-none absolute right-8 top-[34%] z-[2] w-[22vw] max-w-78 space-y-12 text-right max-md:bottom-9 max-md:right-5 max-md:top-auto max-md:w-[42%] max-md:space-y-6"
              style={{
                opacity: buildsOpacity,
                x: reduceMotion ? 0 : rightBuildX,
              }}
            >
              {rightBuilds.map((build) => (
                <article key={build.title}>
                  <p className="m-0 text-sm font-semibold text-primary">{build.type}</p>
                  <h3 className="mb-0 mt-2 text-xl font-normal leading-tight text-foreground max-md:text-base">
                    {build.title}
                  </h3>
                  <p className="mb-0 mt-2 text-base leading-relaxed text-foreground/55 max-md:hidden">
                    {build.copy}
                  </p>
                </article>
              ))}
            </motion.div>

            <motion.p
              className="pointer-events-none absolute bottom-8 left-1/2 z-[2] m-0 -translate-x-1/2 text-center text-sm text-foreground/45 max-md:hidden"
              style={{ opacity: instructionOpacity }}
            >
              Move your pointer through the Earth.
            </motion.p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-[3]"
          style={{
            background:
              "radial-gradient(ellipse 82% 118% at 50% 50%, transparent 48%, rgb(0 2 9 / .28) 78%, rgb(0 1 6 / .72) 100%)",
            boxShadow: "inset 0 0 12vw rgb(0 0 0 / .32)",
          }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
