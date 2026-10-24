import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
};

const STAR_COUNT = 240;

function fractional(value: number) {
  return value - Math.floor(value);
}

function random(index: number, salt: number) {
  return fractional(Math.sin(index * 84.137 + salt * 31.91) * 43_758.5453);
}

const stars: Star[] = Array.from({ length: STAR_COUNT }, (_, index) => ({
  x: random(index, 1),
  y: random(index, 2),
  radius: 0.3 + random(index, 3) * 0.72,
  alpha: 0.14 + random(index, 4) * 0.52,
}));

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const draw = () => {
      const bounds = canvas.getBoundingClientRect();
      const density = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = Math.round(bounds.width * density);
      canvas.height = Math.round(bounds.height * density);
      context.setTransform(density, 0, 0, density, 0, 0);
      context.clearRect(0, 0, bounds.width, bounds.height);

      for (const star of stars) {
        context.beginPath();
        context.arc(star.x * bounds.width, star.y * bounds.height, star.radius, 0, Math.PI * 2);
        context.fillStyle = `rgb(224 222 230 / ${star.alpha})`;
        context.fill();
      }
    };

    const resizeObserver = new ResizeObserver(draw);
    resizeObserver.observe(canvas);
    draw();

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 size-full"
      aria-hidden="true"
    />
  );
}
