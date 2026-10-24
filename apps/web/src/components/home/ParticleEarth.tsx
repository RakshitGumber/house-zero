import { useReducedMotion, type MotionValue } from "framer-motion";
import { useEffect, useRef, type PointerEvent } from "react";

type Particle = {
  x: number;
  y: number;
  z: number;
  land: boolean;
};

type Star = {
  x: number;
  y: number;
  size: number;
  alpha: number;
};

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const PARTICLE_COUNT = 1900;

function fractional(value: number) {
  return value - Math.floor(value);
}

const stars: Star[] = Array.from({ length: 170 }, (_, index) => ({
  x: fractional(Math.sin(index * 91.371 + 0.17) * 43_758.5453),
  y: fractional(Math.sin(index * 47.853 + 1.31) * 24_634.6345),
  size: 0.35 + fractional(Math.sin(index * 17.147) * 9_731.123) * 1.05,
  alpha: 0.08 + fractional(Math.sin(index * 63.731) * 5_123.341) * 0.3,
}));

function longitudeDistance(a: number, b: number) {
  const distance = Math.abs(a - b) % 360;
  return Math.min(distance, 360 - distance);
}

function insideLandMass(
  longitude: number,
  latitude: number,
  centerLongitude: number,
  centerLatitude: number,
  width: number,
  height: number,
) {
  const x = longitudeDistance(longitude, centerLongitude) / width;
  const y = (latitude - centerLatitude) / height;
  return x * x + y * y < 1;
}

function isLand(longitude: number, latitude: number) {
  return (
    insideLandMass(longitude, latitude, -105, 43, 32, 23) ||
    insideLandMass(longitude, latitude, -92, 18, 18, 25) ||
    insideLandMass(longitude, latitude, -60, -17, 22, 33) ||
    insideLandMass(longitude, latitude, 18, 7, 23, 35) ||
    insideLandMass(longitude, latitude, 55, 43, 60, 24) ||
    insideLandMass(longitude, latitude, 112, 17, 28, 27) ||
    insideLandMass(longitude, latitude, 135, -25, 18, 12) ||
    insideLandMass(longitude, latitude, -42, 72, 15, 9)
  );
}

function createParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, index) => {
    const y = 1 - (index / (PARTICLE_COUNT - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = GOLDEN_ANGLE * index;
    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;
    const longitude = (Math.atan2(z, x) * 180) / Math.PI;
    const latitude = (Math.asin(y) * 180) / Math.PI;

    return {
      x,
      y,
      z,
      land: isLand(longitude, latitude),
    };
  });
}

const particles = createParticles();

type ParticleEarthProps = {
  scrollProgress: MotionValue<number>;
};

export function ParticleEarth({ scrollProgress }: ParticleEarthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawRef = useRef<() => void>(() => undefined);
  const pointer = useRef({ x: -10_000, y: -10_000, active: false });
  const pointerTarget = useRef({ x: 0, y: 0 });
  const pointerTilt = useRef({ x: 0, y: 0 });
  const scrollValue = useRef(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    scrollValue.current = scrollProgress.get();
    return scrollProgress.on("change", (value) => {
      scrollValue.current = value;
      drawRef.current();
    });
  }, [scrollProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const density = Math.min(window.devicePixelRatio || 1, 1.75);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * density);
      canvas.height = Math.round(height * density);
      context.setTransform(density, 0, 0, density, 0, 0);
      drawRef.current();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const draw = () => {
      context.clearRect(0, 0, width, height);

      for (const star of stars) {
        context.beginPath();
        context.arc(star.x * width, star.y * height, star.size, 0, Math.PI * 2);
        context.fillStyle = `rgb(240 241 242 / ${star.alpha})`;
        context.fill();
      }

      const compact = width < 720;
      const particleLimit = compact ? 1100 : PARTICLE_COUNT;
      const centerX = width * 0.5;
      const centerY = height * (compact ? 0.42 : 0.5);
      const globeRadius = Math.min(width * (compact ? 0.43 : 0.31), height * 0.38);
      const rotationY =
        scrollValue.current * (reduceMotion ? 0.35 : 1.15) +
        pointerTilt.current.x * 0.38 -
        0.48;
      const rotationX = pointerTilt.current.y * 0.24 - 0.08;
      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);
      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);
      const interactionRadius = compact ? 52 : 78;

      for (let index = 0; index < particleLimit; index += 1) {
        const particle = particles[index]!;
        const rotatedX = particle.x * cosY - particle.z * sinY;
        const rotatedZ = particle.x * sinY + particle.z * cosY;
        const rotatedY = particle.y * cosX - rotatedZ * sinX;
        const depth = particle.y * sinX + rotatedZ * cosX;
        const perspective = 0.78 + (depth + 1) * 0.12;
        let screenX = centerX + rotatedX * globeRadius * perspective;
        let screenY = centerY + rotatedY * globeRadius * perspective;

        if (pointer.current.active) {
          const dx = screenX - pointer.current.x;
          const dy = screenY - pointer.current.y;
          const distance = Math.hypot(dx, dy);

          if (distance > 0 && distance < interactionRadius) {
            const force = Math.pow(1 - distance / interactionRadius, 2) * (compact ? 20 : 34);
            screenX += (dx / distance) * force;
            screenY += (dy / distance) * force;

            context.beginPath();
            context.moveTo(pointer.current.x, pointer.current.y);
            context.lineTo(screenX, screenY);
            context.strokeStyle = `rgb(136 146 255 / ${0.1 * (1 - distance / interactionRadius)})`;
            context.lineWidth = 0.65;
            context.stroke();
          }
        }

        const front = Math.max(0.08, (depth + 1) / 2);
        const size = (particle.land ? 1.65 : 0.78) * (0.65 + front * 0.7);
        const alpha = particle.land ? 0.34 + front * 0.64 : 0.08 + front * 0.34;

        context.beginPath();
        context.arc(screenX, screenY, size, 0, Math.PI * 2);
        context.fillStyle = particle.land
          ? `rgb(160 119 255 / ${alpha})`
          : `rgb(136 146 255 / ${alpha})`;
        context.fill();
      }

      context.beginPath();
      context.arc(centerX, centerY, globeRadius * 1.025, 0, Math.PI * 2);
      context.strokeStyle = "rgb(136 146 255 / 0.16)";
      context.lineWidth = 1;
      context.stroke();

    };

    drawRef.current = draw;
    draw();

    return () => {
      observer.disconnect();
      drawRef.current = () => undefined;
    };
  }, [reduceMotion]);

  function handlePointerMove(event: PointerEvent<HTMLCanvasElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    pointer.current = { x, y, active: true };
    pointerTarget.current = {
      x: (x / bounds.width - 0.5) * 2,
      y: (y / bounds.height - 0.5) * 2,
    };
    pointerTilt.current = pointerTarget.current;
    drawRef.current();
  }

  function handlePointerLeave() {
    pointer.current.active = false;
    pointerTarget.current = { x: 0, y: 0 };
    pointerTilt.current = { x: 0, y: 0 };
    drawRef.current();
  }

  return (
    <canvas
      ref={canvasRef}
      className="size-full touch-pan-y text-primary"
      aria-label="Interactive particle globe. Move your pointer across it to disturb the particles."
      role="img"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    />
  );
}
