import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { lazy, Suspense, useRef, type PointerEvent } from "react";

const ResearchUniverse = lazy(() =>
  import("@/components/effect/ResearchUniverse").then((module) => ({
    default: module.ResearchUniverse,
  })),
);

const researchAreas = [
  { label: "Models", left: "12%", top: "30%" },
  { label: "Context + memory", left: "70%", top: "23%" },
  { label: "Harnesses", left: "78%", top: "53%" },
  { label: "Evaluation", left: "17%", top: "63%" },
  { label: "Safety", left: "64%", top: "75%" },
  { label: "Tools", left: "38%", top: "18%" },
  { label: "Products", left: "34%", top: "79%" },
] as const;

function DiveInButton({ href = "#research" }: { href?: string }) {
  return (
    <a
      className="group inline-flex min-h-12 items-center gap-4 bg-primary px-5 text-sm font-semibold text-primary-foreground no-underline transition-colors duration-300 hover:bg-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      href={href}
    >
      Dive in
      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
        →
      </span>
    </a>
  );
}

function ReducedMotionJourney() {
  return (
    <div className="overflow-hidden bg-background text-foreground">
      <section className="relative flex min-h-svh items-end overflow-hidden px-8 pb-14 pt-28 max-md:px-5" id="universe">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_35%,rgb(101_72_220/.24),transparent_34%),linear-gradient(145deg,#020305_30%,#090519_100%)]" />
        <img
          className="absolute left-[18%] top-1/2 w-[116vw] max-w-none -translate-y-1/2 opacity-65 max-md:left-[-58%] max-md:w-[230vw]"
          src="/images/telescope-cutout.png"
          alt=""
        />
        <div className="relative z-10 max-w-3xl">
          <h1 className="m-0 text-balance text-[clamp(3rem,7vw,6rem)] font-normal leading-[.94] tracking-[-.035em]">
            Develop. Learn. <span className="text-primary">Expand</span> the AI universe.
          </h1>
          <p className="mb-8 mt-8 max-w-[58ch] text-lg leading-relaxed text-foreground/72">
            House Zero is a public research lab for the models, tools, harnesses, memories, evaluations, and products that move AI forward.
          </p>
          <DiveInButton />
        </div>
      </section>

      <section className="relative min-h-[90svh] px-8 py-32 max-md:px-5" id="research">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_52%,rgb(111_94_255/.34),transparent_25%),radial-gradient(circle_at_50%_52%,#050814_0_31%,transparent_32%),linear-gradient(#020305,#060315)]" />
        <div className="relative z-10 max-w-2xl">
          <h2 className="m-0 text-[clamp(2.8rem,6vw,5.5rem)] font-normal leading-[.94] tracking-[-.035em]">AI is not one layer.</h2>
          <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-foreground/68">
            Intelligence grows through connected research: models, context, harnesses, evaluation, safety, tools, and the products that make the work useful.
          </p>
        </div>
      </section>

      <section className="relative min-h-[85svh] px-8 py-32 max-md:px-5" id="open-research">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_65%_40%,rgb(85_54_190/.36),transparent_45%),linear-gradient(160deg,#020305,#0c0520_58%,#020305)]" />
        <div className="relative z-10 ml-auto max-w-2xl">
          <h2 className="m-0 text-[clamp(2.8rem,6vw,5.5rem)] font-normal leading-[.94] tracking-[-.035em]">Research in the open.</h2>
          <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-foreground/68">
            We begin with System One research, then follow every promising path toward better AI systems, better tools, and better ways to learn from the work.
          </p>
        </div>
      </section>

      <section className="relative flex min-h-svh items-end overflow-hidden px-8 pb-20 pt-32 max-md:px-5" id="mission">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_115%,#76717c_0_18%,#16131d_40%,transparent_41%),linear-gradient(#05030d,#010205)]" />
        <div className="relative z-10 max-w-3xl">
          <h2 className="m-0 text-[clamp(2.8rem,6vw,5.5rem)] font-normal leading-[.94] tracking-[-.035em]">
            Learn from the field. Build what is missing. Share what works.
          </h2>
          <p className="mb-8 mt-6 max-w-[60ch] text-lg leading-relaxed text-foreground/68">
            House Zero exists to make AI research understandable, executable, and open to the people expanding it.
          </p>
          <DiveInButton />
        </div>
      </section>
    </div>
  );
}

export function SpaceJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const scenePointerX = useSpring(pointerX, { damping: 26, stiffness: 86 });
  const scenePointerY = useSpring(pointerY, { damping: 26, stiffness: 86 });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    progressRef.current = latest;
  });

  const stageRotationTarget = useTransform(scrollYProgress, [0, 0.075, 0.29, 0.39], [0, 0, 180, 180]);
  const stageRotateY = useSpring(stageRotationTarget, { stiffness: 48, damping: 24, mass: 0.72 });
  const telescopeDrop = useTransform(scrollYProgress, [0, 0.09, 0.28, 0.38], ["0vh", "0vh", "13vh", "27vh"]);
  const telescopeScale = useTransform(scrollYProgress, [0, 0.29], [1, 1.08]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.11, 0.23], [1, 0.92, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.23], [0, -54]);
  const chamberLight = useTransform(scrollYProgress, [0, 0.16, 0.31, 0.46], [0.2, 0.38, 0.72, 0.2]);
  const passageOpacity = useTransform(scrollYProgress, [0.16, 0.23, 0.35, 0.43], [0, 1, 1, 0]);
  const passageScale = useTransform(scrollYProgress, [0.16, 0.43], [0.72, 1.38]);
  const passageRotate = useTransform(scrollYProgress, [0.16, 0.43], [-12, 18]);
  const planetCopyOpacity = useTransform(scrollYProgress, [0.39, 0.44, 0.5, 0.55], [0, 1, 1, 0]);
  const planetCopyY = useTransform(scrollYProgress, [0.39, 0.45], [32, 0]);
  const mapOpacity = useTransform(scrollYProgress, [0.54, 0.59, 0.66, 0.71], [0, 1, 1, 0]);
  const mapScale = useTransform(scrollYProgress, [0.54, 0.61], [0.88, 1]);
  const openCopyOpacity = useTransform(scrollYProgress, [0.7, 0.74, 0.78, 0.82], [0, 1, 1, 0]);
  const galaxyCopyOpacity = useTransform(scrollYProgress, [0.75, 0.8, 0.86, 0.9], [0, 1, 1, 0]);
  const missionOpacity = useTransform(scrollYProgress, [0.89, 0.96], [0, 1]);
  const missionY = useTransform(scrollYProgress, [0.89, 0.97], [40, 0]);

  if (reduceMotion) return <ReducedMotionJourney />;

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 18);
    pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 12);
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <section ref={sectionRef} className="relative h-[820svh] bg-background" id="universe" aria-labelledby="hero-title">
      <div id="research" className="pointer-events-none absolute top-[330svh]" />
      <div id="open-research" className="pointer-events-none absolute top-[540svh]" />
      <div id="mission" className="pointer-events-none absolute top-[750svh]" />

      <div className="sticky top-0 h-svh overflow-hidden bg-[#010209]" onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,transparent_0_12%,rgb(124_92_255/.22)_24%,rgb(40_23_91/.18)_42%,transparent_68%),linear-gradient(90deg,#010209,rgb(17_7_39/.72)_48%,#010209)]"
          style={{ opacity: passageOpacity }}
          aria-hidden="true"
        >
          <motion.div
            className="absolute left-1/2 top-1/2 aspect-square w-[68vmin] -translate-x-1/2 -translate-y-1/2 border border-primary/22 shadow-[inset_18px_0_48px_rgb(126_91_255/.12),-22px_14px_80px_rgb(67_37_142/.18)]"
            style={{ scale: passageScale, rotate: passageRotate, borderRadius: "48% 52% 46% 54% / 55% 44% 56% 45%" }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 aspect-square w-[42vmin] -translate-x-1/2 -translate-y-1/2 border border-foreground/12"
            style={{ scale: passageScale, rotate: passageRotate, borderRadius: "54% 46% 53% 47% / 43% 57% 46% 54%" }}
          />
        </motion.div>

        <div className="absolute inset-0" style={{ perspective: "1550px", perspectiveOrigin: "50% 48%" }}>
          <motion.div
            className="absolute inset-0 will-change-transform"
            style={{ rotateY: stageRotateY, transformStyle: "preserve-3d", transformOrigin: "50% 50% 1150px" }}
          >
            <div
              className="absolute inset-y-0 left-[-62vw] w-[224vw] overflow-hidden bg-[#010209]"
              style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "translateZ(0)" }}
            >
              <div className="absolute inset-y-0 left-[62vw] w-screen overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_48%,rgb(105_70_225/.19),transparent_29%),radial-gradient(ellipse_at_50%_110%,rgb(67_42_135/.12),transparent_52%),#010209]" />
                <motion.div className="absolute inset-0" style={{ y: telescopeDrop, scale: telescopeScale }}>
                  <motion.img
                    className="absolute left-[-4vw] top-1/2 w-[165vw] max-w-none -translate-y-[35%] object-contain max-md:left-[-75vw] max-md:w-[292vw] max-md:-translate-y-[39%]"
                    style={{
                      x: scenePointerX,
                      y: scenePointerY,
                      filter: "saturate(.76) contrast(1.1) brightness(.76) drop-shadow(0 15px 35px rgb(0 0 0 / .54)) drop-shadow(0 0 28px rgb(118 82 235 / .3))",
                    }}
                    src="/images/telescope-cutout.png"
                    alt=""
                  />
                </motion.div>

                <motion.div className="absolute inset-0 z-10" style={{ opacity: heroOpacity, y: heroY }}>
                  <div className="absolute left-8 top-24 max-w-[min(60rem,66vw)] max-md:left-5 max-md:right-5 max-md:top-20 max-md:max-w-none">
                    <h1 className="m-0 text-balance text-[clamp(3rem,7vw,6rem)] font-normal leading-[.93] tracking-[-.035em] text-foreground" id="hero-title">
                      Develop. Learn. <span className="text-primary">Expand</span> the AI universe.
                    </h1>
                  </div>
                  <div className="absolute bottom-12 left-8 max-w-xl max-md:bottom-20 max-md:left-5 max-md:right-5">
                    <p className="mb-7 mt-0 max-w-[58ch] text-lg leading-relaxed text-foreground/72 max-md:text-base">
                      House Zero is a public research lab for the models, tools, harnesses, memories, evaluations, and products that move AI forward.
                    </p>
                    <DiveInButton />
                  </div>
                </motion.div>
              </div>
            </div>

            <div
              className="absolute inset-y-0 left-[-62vw] w-[224vw] overflow-hidden bg-[#010209]"
              style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg) translateZ(-2300px)" }}
            >
              <div className="absolute inset-y-0 left-[62vw] w-screen overflow-hidden">
                <Suspense fallback={<div className="absolute inset-0 bg-[#010209]" />}>
                  <ResearchUniverse progress={progressRef} />
                </Suspense>
                <motion.div
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_48%,transparent_35%,rgb(1_2_9/.34)_76%,rgb(0_0_4/.84)_100%)]"
                  style={{ opacity: chamberLight }}
                />

                <motion.div className="pointer-events-none absolute left-8 top-24 z-10 max-w-2xl max-md:left-5 max-md:right-5 max-md:top-20" style={{ opacity: planetCopyOpacity, y: planetCopyY }}>
                  <h2 className="m-0 text-balance text-[clamp(3rem,6vw,5.8rem)] font-normal leading-[.94] tracking-[-.035em] text-foreground">AI is not one layer.</h2>
                  <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-foreground/70 max-md:text-base">
                    Intelligence grows through connected research—models, context, harnesses, evaluation, safety, tools, and the products that make the work useful.
                  </p>
                </motion.div>

                <motion.div className="pointer-events-none absolute inset-0 z-10" style={{ opacity: mapOpacity, scale: mapScale }} aria-hidden="true">
                  {researchAreas.map((area) => (
                    <div
                      key={area.label}
                      className="absolute flex items-center gap-3 text-sm font-medium text-foreground/78 max-md:text-[13px]"
                      style={{ left: area.left, top: area.top }}
                    >
                      <span className="size-1.5 bg-primary" />
                      {area.label}
                    </div>
                  ))}
                </motion.div>

                <motion.div className="pointer-events-none absolute bottom-14 right-8 z-10 max-w-2xl text-right max-md:bottom-20 max-md:left-5 max-md:right-5" style={{ opacity: openCopyOpacity }}>
                  <h2 className="m-0 text-balance text-[clamp(2.8rem,5.8vw,5.5rem)] font-normal leading-[.94] tracking-[-.035em] text-foreground">Research in the open.</h2>
                  <p className="ml-auto mt-6 max-w-[58ch] text-lg leading-relaxed text-foreground/70 max-md:text-base">
                    We begin with System One research, then follow every promising path toward better AI systems, better tools, and better ways to learn from the work.
                  </p>
                </motion.div>

                <motion.div className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-[min(68rem,88vw)] -translate-x-1/2 -translate-y-1/2 text-center" style={{ opacity: galaxyCopyOpacity }}>
                  <h2 className="m-0 text-balance text-[clamp(2.8rem,6vw,5.8rem)] font-normal leading-[.94] tracking-[-.035em] text-foreground">
                    Learn from the field. Build what is missing. Share what works.
                  </h2>
                </motion.div>

                <motion.div className="absolute bottom-14 left-8 z-20 max-w-3xl max-md:bottom-20 max-md:left-5 max-md:right-5" style={{ opacity: missionOpacity, y: missionY }}>
                  <h2 className="m-0 text-balance text-[clamp(2.8rem,5.6vw,5.3rem)] font-normal leading-[.94] tracking-[-.035em] text-foreground">Expand the universe with us.</h2>
                  <p className="mb-7 mt-6 max-w-[58ch] text-lg leading-relaxed text-foreground/70 max-md:text-base">
                    House Zero exists to make AI research understandable, executable, and open to the people expanding it.
                  </p>
                  <DiveInButton />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-30 shadow-[inset_0_0_14vw_rgb(0_0_0/.52)]" aria-hidden="true" />
      </div>
    </section>
  );
}
