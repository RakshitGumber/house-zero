import { useReducedMotion, type MotionValue } from "framer-motion";
import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  speed: number;
  phase: number;
  drift: number;
  moving: boolean;
};

const STAR_COUNT = 180;

function fractional(value: number) {
  return value - Math.floor(value);
}

const stars: Star[] = Array.from({ length: STAR_COUNT }, (_, index) => {
  const moving = index % 5 === 0;

  return {
    x: fractional(Math.sin(index * 84.137 + 0.41) * 43_758.5453),
    y: fractional(Math.sin(index * 39.713 + 1.9) * 24_634.6345),
    radius: 0.45 + fractional(Math.sin(index * 17.31) * 9_731.123) * 1.35,
    alpha: 0.18 + fractional(Math.sin(index * 61.93) * 5_123.341) * 0.62,
    speed: 0.002 + fractional(Math.sin(index * 12.71) * 7_731.91) * 0.004,
    phase: fractional(Math.sin(index * 27.17) * 4_721.13) * Math.PI * 2,
    drift: 4 + fractional(Math.sin(index * 8.93) * 9_173.83) * 11,
    moving,
  };
});

type StarFieldProps = {
  scrollProgress: MotionValue<number>;
};

export function StarField({ scrollProgress }: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollValue = useRef(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    scrollValue.current = scrollProgress.get();
    return scrollProgress.on("change", (value) => {
      scrollValue.current = value;
    });
  }, [scrollProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;
    let frame = 0;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const density = Math.min(window.devicePixelRatio || 1, 1.75);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * density);
      canvas.height = Math.round(height * density);
      context.setTransform(density, 0, 0, density, 0, 0);
    };

    const draw = (timestamp = 0) => {
      context.clearRect(0, 0, width, height);

      for (const star of stars) {
        const time = reduceMotion || !star.moving ? 0 : timestamp;
        const travel = star.moving
          ? time * star.speed + scrollValue.current * width * 0.16
          : 0;
        const x = ((star.x * width + travel) % (width + 40)) - 20;
        const y =
          star.y * height +
          (star.moving ? Math.sin(time * 0.00035 + star.phase) * star.drift : 0);
        const pulse = star.moving
          ? 0.72 + Math.sin(time * 0.001 + star.phase) * 0.24
          : 1;

        context.beginPath();
        context.arc(x, y, star.radius, 0, Math.PI * 2);
        context.fillStyle = `rgb(201 220 255 / ${star.alpha * pulse})`;
        context.fill();
      }

      if (!reduceMotion) frame = window.requestAnimationFrame(draw);
    };

    const observer = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw();
    });
    observer.observe(canvas);
    resize();
    draw();

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 size-full"
      aria-hidden="true"
    />
  );
}
