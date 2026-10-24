import { useEffect, useRef } from "react";

type EnvironmentParticle = {
  angle: number;
  offset: number;
  radius: number;
  speed: number;
  size: number;
  alpha: number;
  depth: number;
  phase: number;
};

const PARTICLE_COUNT = 230;
const FRAME_INTERVAL = 1000 / 30;

function hash(value: number, salt: number) {
  const random = Math.sin(value * 91.345 + salt * 17.13) * 43_758.5453;
  return random - Math.floor(random);
}

const particles: EnvironmentParticle[] = Array.from(
  { length: PARTICLE_COUNT },
  (_, index) => ({
    angle: hash(index, 11) * Math.PI * 2,
    offset: hash(index, 12),
    radius: 0.2 + Math.pow(hash(index, 13), 1.35) * 0.8,
    speed: 0.12 + hash(index, 14) * 0.2,
    size: 0.55 + hash(index, 15) * 1.25,
    alpha: 0.08 + hash(index, 16) * 0.28,
    depth: 0.25 + hash(index, 17) * 0.75,
    phase: hash(index, 18) * Math.PI * 2,
  }),
);

export function PlanetEnvironment() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let visible = true;
    let width = 0;
    let height = 0;
    let compact = false;
    let lastDraw = 0;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      compact = width < 720;
      const density = Math.min(window.devicePixelRatio || 1, compact ? 1 : 1.25);

      canvas.width = Math.max(1, Math.floor(width * density));
      canvas.height = Math.max(1, Math.floor(height * density));
      context.setTransform(density, 0, 0, density, 0, 0);
    };

    const project = (particle: EnvironmentParticle, time: number) => {
      const travel = (particle.offset + time * particle.speed) % 1;
      const vertical = travel - 0.5;
      const funnel = 0.34 + Math.abs(vertical) * 1.08;
      const angle =
        particle.angle +
        time * (1.45 + particle.speed * 2.8) +
        travel * 5.2;
      const radius =
        Math.min(width, height * 1.3) *
        (0.09 + particle.radius * 0.39) *
        funnel;

      return {
        x:
          width * 0.5 +
          Math.cos(angle) * radius * (0.72 + particle.depth * 0.42),
        y:
          height * 0.5 +
          vertical * height * 1.38 +
          Math.sin(angle) * radius * 0.3 +
          Math.sin(time * 2.2 + particle.phase) * 5,
      };
    };

    const draw = (timestamp = 0) => {
      frame = 0;
      if (!visible || document.hidden) return;

      if (!reduceMotion && timestamp - lastDraw < FRAME_INTERVAL) {
        frame = window.requestAnimationFrame(draw);
        return;
      }
      lastDraw = timestamp;

      const time = reduceMotion ? 0 : timestamp * 0.001;
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "lighter";

      const step = compact ? 2 : 1;
      for (let index = 0; index < particles.length; index += step) {
        const particle = particles[index]!;
        const current = project(particle, time);
        const previous = project(particle, time - 0.028);
        const distanceFromCenter = Math.hypot(
          (current.x - width * 0.5) / Math.max(1, width * 0.42),
          (current.y - height * 0.5) / Math.max(1, height * 0.46),
        );
        const behindEarth = distanceFromCenter < 0.94;
        const alpha = particle.alpha * (behindEarth ? 0.2 : 1);
        const size = particle.size * (0.64 + particle.depth * 0.62);
        const trailLength = Math.hypot(
          current.x - previous.x,
          current.y - previous.y,
        );

        if (trailLength < 72) {
          context.globalAlpha = alpha * 0.58;
          context.strokeStyle = "rgb(134 78 229)";
          context.lineWidth = Math.max(0.35, size * 0.48);
          context.beginPath();
          context.moveTo(previous.x, previous.y);
          context.lineTo(current.x, current.y);
          context.stroke();
        }

        context.globalAlpha = alpha;
        context.fillStyle = index % 11 === 0 ? "rgb(232 218 255)" : "rgb(177 116 255)";
        context.fillRect(
          current.x - size * 0.5,
          current.y - size * 0.5,
          size,
          size,
        );
      }

      context.globalAlpha = 1;
      context.globalCompositeOperation = "source-over";

      if (!reduceMotion) frame = window.requestAnimationFrame(draw);
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw();
    });
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      if (visible && !frame && !reduceMotion && !document.hidden) {
        frame = window.requestAnimationFrame(draw);
      } else if (!visible && frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    const handleVisibility = () => {
      if (document.hidden && frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      } else if (!document.hidden && visible && !frame && !reduceMotion) {
        frame = window.requestAnimationFrame(draw);
      }
    };

    resizeObserver.observe(canvas);
    visibilityObserver.observe(canvas);
    document.addEventListener("visibilitychange", handleVisibility);
    resize();
    draw();

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 size-full"
      aria-hidden="true"
    />
  );
}
