import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

import naturalEarthLand from "./natural-earth-land.json";

type Coordinate = readonly [longitude: number, latitude: number];

type LandPolygon = {
  outer: readonly Coordinate[];
  holes: readonly (readonly Coordinate[])[];
  minLongitude: number;
  maxLongitude: number;
  minLatitude: number;
  maxLatitude: number;
};

type GeoJsonGeometry = {
  type: "Polygon" | "MultiPolygon";
  coordinates: number[][][] | number[][][][];
};

type LandDot = {
  x: number;
  y: number;
  z: number;
  size: number;
};

const LATITUDE_ROWS = 170;
const LAND_EXPANSION_DEGREES = 1.6;
const FRAME_INTERVAL = 1000 / 30;

function hash(value: number, salt: number) {
  const random = Math.sin(value * 91.345 + salt * 17.13) * 43_758.5453;
  return random - Math.floor(random);
}

function pointInPolygon(longitude: number, latitude: number, polygon: readonly Coordinate[]) {
  let inside = false;

  for (let index = 0, previous = polygon.length - 1; index < polygon.length; previous = index, index += 1) {
    const [currentLongitude, currentLatitude] = polygon[index]!;
    const [previousLongitude, previousLatitude] = polygon[previous]!;
    const intersects =
      currentLatitude > latitude !== previousLatitude > latitude &&
      longitude <
        ((previousLongitude - currentLongitude) * (latitude - currentLatitude)) /
          (previousLatitude - currentLatitude) +
          currentLongitude;

    if (intersects) inside = !inside;
  }

  return inside;
}

function preparePolygon(rings: number[][][]): LandPolygon {
  const [outerCoordinates = [], ...holeCoordinates] = rings;
  const outer = outerCoordinates.map(
    ([longitude = 0, latitude = 0]) => [longitude, latitude] as const,
  );
  const holes = holeCoordinates.map((hole) =>
    hole.map(([longitude = 0, latitude = 0]) => [longitude, latitude] as const),
  );
  let minLongitude = 180;
  let maxLongitude = -180;
  let minLatitude = 90;
  let maxLatitude = -90;

  for (const [longitude, latitude] of outer) {
    minLongitude = Math.min(minLongitude, longitude);
    maxLongitude = Math.max(maxLongitude, longitude);
    minLatitude = Math.min(minLatitude, latitude);
    maxLatitude = Math.max(maxLatitude, latitude);
  }

  return { outer, holes, minLongitude, maxLongitude, minLatitude, maxLatitude };
}

const landPolygons: LandPolygon[] = (
  naturalEarthLand.features as Array<{ geometry: GeoJsonGeometry }>
).flatMap(({ geometry }) => {
  if (geometry.type === "Polygon") {
    return [preparePolygon(geometry.coordinates as number[][][])];
  }

  return (geometry.coordinates as number[][][][]).map(preparePolygon);
});

function isLand(longitude: number, latitude: number) {
  return landPolygons.some((polygon) => {
    if (
      longitude < polygon.minLongitude ||
      longitude > polygon.maxLongitude ||
      latitude < polygon.minLatitude ||
      latitude > polygon.maxLatitude ||
      !pointInPolygon(longitude, latitude, polygon.outer)
    ) {
      return false;
    }

    return !polygon.holes.some((hole) => pointInPolygon(longitude, latitude, hole));
  });
}

function wrapLongitude(longitude: number) {
  return ((longitude + 180) % 360 + 360) % 360 - 180;
}

function isExpandedLand(longitude: number, latitude: number) {
  if (isLand(longitude, latitude)) return true;

  const longitudeExpansion =
    LAND_EXPANSION_DEGREES /
    Math.max(0.35, Math.cos((latitude * Math.PI) / 180));
  const north = Math.min(89.9, latitude + LAND_EXPANSION_DEGREES);
  const south = Math.max(-89.9, latitude - LAND_EXPANSION_DEGREES);

  return (
    isLand(wrapLongitude(longitude + longitudeExpansion), latitude) ||
    isLand(wrapLongitude(longitude - longitudeExpansion), latitude) ||
    isLand(longitude, north) ||
    isLand(longitude, south)
  );
}

function createLandDots() {
  const dots: LandDot[] = [];
  const latitudeStep = 180 / LATITUDE_ROWS;
  let candidateIndex = 0;

  for (let row = 0; row <= LATITUDE_ROWS; row += 1) {
    const baseLatitude = -90 + row * latitudeStep;
    const baseLatitudeRadians = (baseLatitude * Math.PI) / 180;
    const baseLatitudeRadius = Math.cos(baseLatitudeRadians);
    const dotsForLatitude = Math.max(
      1,
      Math.round((360 / latitudeStep) * Math.abs(baseLatitudeRadius)),
    );
    const longitudeStep = 360 / dotsForLatitude;

    for (let column = 0; column < dotsForLatitude; column += 1) {
      const latitude = Math.max(
        -89.9,
        Math.min(
          89.9,
          baseLatitude + (hash(candidateIndex, 3) - 0.5) * latitudeStep * 0.72,
        ),
      );
      const longitude = wrapLongitude(
        -180 +
          column * longitudeStep +
          (hash(candidateIndex, 4) - 0.5) * Math.min(longitudeStep * 0.72, 2.4),
      );
      const particleIndex = candidateIndex;
      candidateIndex += 1;
      if (!isExpandedLand(longitude, latitude)) continue;

      const latitudeRadians = (latitude * Math.PI) / 180;
      const latitudeRadius = Math.cos(latitudeRadians);
      const longitudeRadians = (longitude * Math.PI) / 180;
      dots.push({
        x: latitudeRadius * Math.cos(longitudeRadians),
        y: Math.sin(latitudeRadians),
        z: latitudeRadius * Math.sin(longitudeRadians),
        size: 0.88 + hash(particleIndex, 2) * 0.72,
      });
    }
  }

  return dots;
}

const landDots = createLandDots();

export function ParticleEarth() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    let lastTimestamp = 0;
    let lastDrawTimestamp = 0;
    let globeTime = 0;
    let compact = false;
    let centerX = 0;
    let centerY = 0;
    let globeRadius = 0;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      compact = bounds.width < 720;
      const density = Math.min(window.devicePixelRatio || 1, compact ? 1 : 1.25);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * density);
      canvas.height = Math.round(height * density);
      context.setTransform(density, 0, 0, density, 0, 0);
      centerX = width * 0.5;
      centerY = height * (compact ? 0.44 : 0.5);
      globeRadius = Math.min(
        width * (compact ? 0.47 : 0.43),
        height * (compact ? 0.43 : 0.46),
      );
    };

    const draw = (timestamp = 0) => {
      frame = 0;
      if (!visible || document.hidden) return;

      if (!reduceMotion && timestamp - lastDrawTimestamp < FRAME_INTERVAL) {
        frame = window.requestAnimationFrame(draw);
        return;
      }

      const delta = lastTimestamp === 0 ? 0 : Math.min(timestamp - lastTimestamp, 40);
      lastTimestamp = timestamp;
      lastDrawTimestamp = timestamp;
      if (!reduceMotion) globeTime += delta;

      context.clearRect(0, 0, width, height);

      const rotationY = 1.28 + globeTime * 0.00006;
      const rotationX = -0.16;
      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);
      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);
      const dotStep = compact ? 2 : 1;
      const glowStep = compact ? 8 : 4;
      context.globalCompositeOperation = "lighter";
      context.fillStyle = "rgb(205 157 255)";

      for (let index = 0; index < landDots.length; index += dotStep) {
        const dot = landDots[index]!;
        const rotatedX = dot.x * cosY - dot.z * sinY;
        const rotatedZ = dot.x * sinY + dot.z * cosY;
        const rotatedY = dot.y * cosX - rotatedZ * sinX;
        const depth = dot.y * sinX + rotatedZ * cosX;
        if (depth <= 0.015) continue;

        const screenX = centerX + rotatedX * globeRadius;
        const screenY = centerY - rotatedY * globeRadius;
        const horizonFade = Math.min(1, depth * 4.5);
        const alpha = (0.5 + depth * 0.48) * horizonFade;
        const size = dot.size * (compact ? 0.95 : 1.12) * (0.86 + depth * 0.2);

        // A sparse low-alpha bloom keeps the particles luminous without the
        // heavy per-particle shadow blur that previously hurt performance.
        if (index % glowStep === 0) {
          const glowSize = size * 3.4;
          context.globalAlpha = alpha * 0.14;
          context.fillRect(
            screenX - glowSize * 0.5,
            screenY - glowSize * 0.5,
            glowSize,
            glowSize,
          );
        }

        context.globalAlpha = Math.min(1, alpha * 1.28);
        context.fillRect(screenX - size * 0.5, screenY - size * 0.5, size, size);
      }
      context.globalAlpha = 1;
      context.globalCompositeOperation = "source-over";

      if (!reduceMotion) frame = window.requestAnimationFrame(draw);
    };

    const start = () => {
      if (!frame && !reduceMotion && visible && !document.hidden) {
        frame = window.requestAnimationFrame(draw);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw();
    });
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      if (visible) {
        lastTimestamp = 0;
        lastDrawTimestamp = 0;
        if (reduceMotion) draw();
        else start();
      } else if (frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    const handleVisibilityChange = () => {
      if (document.hidden && frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      } else {
        lastTimestamp = 0;
        lastDrawTimestamp = 0;
        if (reduceMotion) draw();
        else start();
      }
    };

    resizeObserver.observe(canvas);
    visibilityObserver.observe(canvas);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    resize();
    draw();

    return () => {
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.cancelAnimationFrame(frame);
    };
  }, [reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none size-full"
      aria-label="Rotating particle Earth with continents rendered from geographic data."
      role="img"
    />
  );
}
