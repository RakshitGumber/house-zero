import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

const researchAreas = [
  { label: "Models", left: "13%", top: "57%" },
  { label: "Memory + context", left: "67%", top: "22%" },
  { label: "Harnesses", left: "76%", top: "61%" },
  { label: "Evaluation", left: "18%", top: "77%" },
  { label: "Safety", left: "62%", top: "81%" },
  { label: "Tools", left: "45%", top: "15%" },
  { label: "Products", left: "42%", top: "88%" },
] as const;

function DiveIn({ href = "#planet" }: { href?: string }) {
  return (
    <a
      className="group inline-flex min-h-12 items-center gap-5 bg-primary px-6 text-sm font-bold text-primary-foreground no-underline transition-colors duration-200 hover:bg-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      href={href}
    >
      Dive in
      <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
    </a>
  );
}

function TelescopeChapter() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const rotateTarget = useTransform(scrollYProgress, [0.52, 0.9], [0, 180]);
  const rotateY = useSpring(rotateTarget, { stiffness: 52, damping: 25, mass: 0.75 });
  const telescopeScale = useTransform(scrollYProgress, [0, 0.5, 0.9], [1, 1.025, 1.12]);
  const telescopeY = useTransform(scrollYProgress, [0, 0.52, 0.9], ["0vh", "0vh", "16vh"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.42, 0.54], [1, 1, 0]);
  const passageOpacity = useTransform(scrollYProgress, [0.48, 0.62, 0.82, 0.94], [0, 1, 1, 0]);
  const passageScale = useTransform(scrollYProgress, [0.48, 0.94], [0.72, 1.42]);

  return (
    <section ref={sectionRef} className={reduceMotion ? "relative min-h-svh" : "relative h-[240svh]"} id="universe">
      <div className="sticky top-0 h-svh overflow-hidden bg-[#010208]">
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,transparent_0_10%,rgb(136_106_255/.3)_23%,rgb(45_24_99/.18)_44%,transparent_70%)]"
          style={{ opacity: reduceMotion ? 0 : passageOpacity }}
        >
          <motion.div
            className="absolute left-1/2 top-1/2 aspect-square w-[66vmin] -translate-x-1/2 -translate-y-1/2 border border-primary/30"
            style={{ scale: passageScale, borderRadius: "47% 53% 45% 55% / 56% 43% 57% 44%" }}
          />
        </motion.div>

        <div className="absolute inset-0" style={{ perspective: "1500px", perspectiveOrigin: "50% 48%" }}>
          <motion.div
            className="absolute inset-0"
            style={{
              rotateY: reduceMotion ? 0 : rotateY,
              transformStyle: "preserve-3d",
              transformOrigin: "50% 50% 760px",
            }}
          >
            <div
              className="absolute inset-y-0 left-[-20vw] w-[140vw] overflow-hidden"
              style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "translateZ(0)" }}
            >
              <div className="absolute inset-y-0 left-[20vw] w-screen overflow-hidden bg-[radial-gradient(circle_at_80%_40%,rgb(99_64_218/.2),transparent_31%),#010208]">
                <motion.img
                  className="absolute left-[-4vw] top-1/2 w-[165vw] max-w-none -translate-y-[35%] object-contain max-md:left-[-74vw] max-md:w-[288vw] max-md:-translate-y-[39%]"
                  style={{
                    scale: reduceMotion ? 1 : telescopeScale,
                    y: reduceMotion ? 0 : telescopeY,
                    filter: "saturate(.78) contrast(1.08) brightness(.77) drop-shadow(0 18px 42px rgb(0 0 0 / .5)) drop-shadow(0 0 30px rgb(111 74 229 / .28))",
                  }}
                  src="/images/telescope-cutout.png"
                  alt=""
                  fetchPriority="high"
                />

                <motion.div className="absolute inset-0 z-10" style={{ opacity: reduceMotion ? 1 : copyOpacity }}>
                  <h1 className="absolute left-8 top-24 m-0 max-w-[min(60rem,68vw)] text-balance text-[clamp(3rem,7vw,6rem)] font-normal leading-[.93] tracking-[-.035em] text-foreground max-md:left-5 max-md:right-5 max-md:top-20 max-md:max-w-none" id="hero-title">
                    Develop. Learn. <span className="text-primary">Expand</span> the AI universe.
                  </h1>
                  <div className="absolute bottom-12 left-8 max-w-xl max-md:bottom-20 max-md:left-5 max-md:right-5">
                    <p className="mb-7 mt-0 max-w-[58ch] text-lg leading-relaxed text-foreground/76 max-md:text-base">
                      House Zero is a public research lab for the models, tools, harnesses, memories, evaluations, and products that move AI forward.
                    </p>
                    <DiveIn />
                  </div>
                </motion.div>
              </div>
            </div>

            <div
              className="absolute inset-y-0 left-[-20vw] w-[140vw] overflow-hidden"
              style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg) translateZ(-1520px)" }}
            >
              <div className="absolute inset-y-0 left-[20vw] w-screen overflow-hidden bg-[#010208]">
                <img className="absolute left-1/2 top-1/2 w-[min(76vmin,56rem)] -translate-x-1/2 -translate-y-1/2" src="/images/intelligence-planet.png" alt="" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PlanetChapter() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const planetScale = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [0.92, 1, 1.04, 1.14]);
  const planetY = useTransform(scrollYProgress, [0, 1], ["3vh", "-4vh"]);
  const introOpacity = useTransform(scrollYProgress, [0.03, 0.12, 0.42, 0.52], [0, 1, 1, 0]);
  const mapOpacity = useTransform(scrollYProgress, [0.48, 0.58, 0.88, 0.97], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} className={reduceMotion ? "relative min-h-svh" : "relative h-[260svh]"} id="planet">
      <div className="sticky top-0 h-svh overflow-hidden bg-[radial-gradient(circle_at_center,rgb(42_20_93/.3),transparent_48%),#010208]">
        <motion.img
          className="absolute left-1/2 top-1/2 w-[min(78vmin,58rem)] -translate-x-1/2 -translate-y-1/2 max-md:w-[112vw]"
          style={{ scale: reduceMotion ? 1 : planetScale, y: reduceMotion ? 0 : planetY }}
                src="/images/intelligence-planet.webp"
                decoding="async"
          alt="A layered violet intelligence planet representing interconnected AI research"
        />

        <motion.div className="absolute left-8 top-24 z-10 max-w-2xl max-md:left-5 max-md:right-5 max-md:top-20" style={{ opacity: reduceMotion ? 1 : introOpacity }}>
          <h2 className="m-0 text-balance text-[clamp(3rem,6vw,5.8rem)] font-normal leading-[.94] tracking-[-.035em]">AI is not one layer.</h2>
          <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-foreground/74 max-md:text-base">
            Intelligence grows through connected research—models, context, harnesses, evaluation, safety, tools, and the products that make the work useful.
          </p>
        </motion.div>

        <motion.div className="absolute inset-0 z-10" style={{ opacity: reduceMotion ? 1 : mapOpacity }}>
          <div className="absolute left-8 top-24 max-w-lg max-md:left-5 max-md:right-5 max-md:top-20">
            <h2 className="m-0 text-[clamp(2.6rem,5vw,5rem)] font-normal leading-[.96] tracking-[-.035em]">An open research map.</h2>
            <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-foreground/72 max-md:text-base">No fixed hierarchy. Every advance changes what the surrounding system can become.</p>
          </div>
          {researchAreas.map((area) => (
            <div key={area.label} className="absolute flex items-center gap-3 text-sm font-medium text-foreground/88 max-md:text-xs" style={{ left: area.left, top: area.top }}>
              <span className="size-1.5 bg-primary" />
              {area.label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function NebulaChapter() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.16]);
  const imageX = useTransform(scrollYProgress, [0, 1], ["0%", "-3%"]);
  const copyOpacity = useTransform(scrollYProgress, [0.08, 0.18, 0.82, 0.94], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} className={reduceMotion ? "relative min-h-svh" : "relative h-[220svh]"} id="open-research">
      <div className="sticky top-0 h-svh overflow-hidden bg-[#010208]">
        <motion.img className="absolute inset-0 size-full object-cover" style={{ scale: reduceMotion ? 1.04 : imageScale, x: reduceMotion ? 0 : imageX }} src="/images/living-nebula.png" alt="" loading="lazy" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(1_2_8/.84)_0%,rgb(1_2_8/.35)_52%,transparent_78%),linear-gradient(0deg,rgb(1_2_8/.52),transparent_42%)]" />
        <motion.div className="absolute bottom-14 left-8 z-10 max-w-3xl max-md:bottom-20 max-md:left-5 max-md:right-5" style={{ opacity: reduceMotion ? 1 : copyOpacity }}>
          <h2 className="m-0 text-balance text-[clamp(3rem,6vw,5.8rem)] font-normal leading-[.94] tracking-[-.035em]">Research in the open.</h2>
          <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-foreground/78 max-md:text-base">
            We begin with System One research, then follow every promising path toward better AI systems, better tools, and better ways to learn from the work.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function GalaxyChapter() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const imageScale = useTransform(scrollYProgress, [0, 0.75, 1], [1, 1.09, 1.22]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-4%"]);
  const copyOpacity = useTransform(scrollYProgress, [0.08, 0.18, 0.76, 0.9], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} className={reduceMotion ? "relative min-h-svh" : "relative h-[230svh]"} id="galaxy">
      <div className="sticky top-0 h-svh overflow-hidden bg-[#010208]">
        <motion.img className="absolute inset-0 size-full object-cover" style={{ scale: reduceMotion ? 1 : imageScale, y: reduceMotion ? 0 : imageY }} src="/images/spiral-galaxy.png" alt="A violet spiral galaxy dense with stars" loading="lazy" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(1_2_8/.88)_0%,rgb(1_2_8/.45)_34%,transparent_62%),linear-gradient(0deg,rgb(1_2_8/.34),transparent_45%)]" />
        <motion.div className="absolute left-8 top-24 z-10 max-w-2xl max-md:left-5 max-md:right-5 max-md:top-20" style={{ opacity: reduceMotion ? 1 : copyOpacity }}>
          <h2 className="m-0 text-balance text-[clamp(3rem,6vw,5.8rem)] font-normal leading-[.94] tracking-[-.035em]">Learn from the field.</h2>
          <p className="mt-6 max-w-[54ch] text-xl leading-relaxed text-foreground/82 max-md:text-base">Build what is missing. Share what works. Let each discovery open the next direction.</p>
        </motion.div>
      </div>
    </section>
  );
}

function MoonChapter() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const terrainY = useTransform(scrollYProgress, [0, 0.45, 1], ["18%", "0%", "-3%"]);
  const terrainScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.18]);
  const copyOpacity = useTransform(scrollYProgress, [0.08, 0.18], [0, 1]);

  return (
    <section ref={sectionRef} className={reduceMotion ? "relative min-h-svh" : "relative h-[190svh]"} id="mission">
      <div className="sticky top-0 h-svh overflow-hidden bg-[radial-gradient(ellipse_at_55%_12%,rgb(80_43_164/.22),transparent_42%),#010208]">
        <motion.img className="absolute inset-x-0 bottom-0 w-full max-w-none object-cover max-md:h-[58%] max-md:w-[180%] max-md:-translate-x-[22%]" style={{ y: reduceMotion ? 0 : terrainY, scale: reduceMotion ? 1.08 : terrainScale }} src="/images/moon-horizon.png" alt="A cratered lunar horizon" loading="lazy" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_0_32%,rgb(1_2_8/.12)_50%,rgb(1_2_8/.42)_100%)]" />
        <motion.div className="absolute left-8 top-24 z-10 max-w-3xl max-md:left-5 max-md:right-5 max-md:top-20" style={{ opacity: reduceMotion ? 1 : copyOpacity }}>
          <h2 className="m-0 text-balance text-[clamp(3rem,6vw,5.8rem)] font-normal leading-[.94] tracking-[-.035em]">Expand the universe with us.</h2>
          <p className="mb-8 mt-6 max-w-[58ch] text-lg leading-relaxed text-foreground/78 max-md:text-base">House Zero exists to make AI research understandable, executable, and open to the people expanding it.</p>
          <DiveIn />
        </motion.div>
      </div>
    </section>
  );
}

export function LeanJourney() {
  return (
    <div className="bg-background text-foreground">
      <TelescopeChapter />
      <PlanetChapter />
      <NebulaChapter />
      <GalaxyChapter />
      <MoonChapter />
    </div>
  );
}
