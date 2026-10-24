import { Line } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";

type ResearchUniverseProps = {
  progress: MutableRefObject<number>;
};

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const backdropFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.52;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p = mat2(1.62, 1.18, -1.18, 1.62) * p + 0.17;
      amplitude *= 0.48;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv - 0.5;
    uv.x *= 1.65;
    float time = uTime * 0.035;
    float warp = fbm(uv * 2.1 + vec2(time, -time * 0.7));
    float field = fbm(uv * 3.4 + warp * 1.6 + vec2(-time * 0.6, time));
    float vein = smoothstep(0.48, 0.82, field) * (1.0 - smoothstep(0.82, 0.98, field));
    float nebula = smoothstep(0.28, 0.86, field + warp * 0.34);
    float deepSpace = smoothstep(0.48, 0.78, uProgress);
    vec3 black = vec3(0.004, 0.006, 0.014);
    vec3 violet = vec3(0.22, 0.08, 0.52);
    vec3 electric = vec3(0.42, 0.36, 1.0);
    vec3 color = black + violet * nebula * (0.12 + deepSpace * 0.34);
    color += electric * vein * (0.08 + deepSpace * 0.24);
    float vignette = 1.0 - smoothstep(0.36, 0.92, length(uv));
    color *= 0.42 + vignette * 0.78;
    gl_FragColor = vec4(color, 1.0);
  }
`;

const planetFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uReveal;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vec3 viewDirection = normalize(vec3(0.0, 0.0, 1.0));
    float fresnel = pow(1.0 - max(dot(normalize(vNormal), viewDirection), 0.0), 2.4);
    float broadFlow = 0.5 + 0.5 * sin(vUv.y * 23.0 + sin(vUv.x * 10.0 + uTime * 0.12) * 2.4);
    float diagonalFlow = 0.5 + 0.5 * sin((vUv.x * 1.25 + vUv.y) * 19.0 - uTime * 0.16);
    float topology = pow(broadFlow, 13.0);
    float current = pow(diagonalFlow, 18.0);
    float latitudeGlow = pow(0.5 + 0.5 * sin(vUv.y * 9.4), 22.0);
    vec3 base = vec3(0.018, 0.016, 0.052);
    vec3 violet = vec3(0.34, 0.28, 1.0);
    vec3 white = vec3(0.92, 0.95, 1.0);
    vec3 color = base + violet * topology * 0.68 + violet * current * 0.13;
    color += violet * latitudeGlow * 0.16;
    color += mix(violet, white, fresnel) * fresnel * 0.95;
    gl_FragColor = vec4(color, uReveal);
  }
`;

const moonFragmentShader = /* glsl */ `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vPosition;

  float rock(vec3 p) {
    float a = sin(dot(p, vec3(7.1, 11.7, 5.3)));
    float b = sin(dot(p, vec3(-13.1, 4.2, 9.7)) + a * 1.7);
    float c = sin(dot(p, vec3(3.8, -8.6, 15.2)) + b * 1.2);
    return (a + b + c) / 3.0;
  }

  void main() {
    vec3 lightDirection = normalize(vec3(-0.45, 0.8, 0.55));
    float light = max(dot(normalize(vNormal), lightDirection), 0.0);
    float texture = rock(vPosition) * 0.5 + 0.5;
    float craterA = 1.0 - smoothstep(0.03, 0.11, abs(length(vPosition.xz - vec2(1.1, 1.8)) - 0.72));
    float craterB = 1.0 - smoothstep(0.02, 0.08, abs(length(vPosition.xz - vec2(-1.7, 0.4)) - 0.48));
    float rim = pow(1.0 - abs(vNormal.z), 3.0);
    vec3 dark = vec3(0.018, 0.02, 0.028);
    vec3 stone = vec3(0.32, 0.33, 0.37);
    vec3 color = mix(dark, stone, light * (0.36 + texture * 0.52));
    color -= vec3(0.1) * (craterA + craterB) * 0.45;
    color += vec3(0.26, 0.22, 0.72) * rim * 0.22;
    gl_FragColor = vec4(color, 1.0);
  }
`;

function range(value: number, start: number, end: number) {
  return THREE.MathUtils.smoothstep(value, start, end);
}

function PulseRing({
  rotation,
  phase,
}: {
  rotation: [number, number, number];
  phase: number;
}) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ringRef.current) return;
    const pulse = (clock.elapsedTime * 0.24 + phase) % 1;
    ringRef.current.scale.setScalar(0.7 + pulse * 2.5);
    const material = ringRef.current.material as THREE.MeshBasicMaterial;
    material.opacity = Math.sin(pulse * Math.PI) * 0.42;
  });

  return (
    <group rotation={rotation}>
      <mesh ref={ringRef} position={[0, 0, 2.15]}>
        <ringGeometry args={[0.1, 0.125, 64]} />
        <meshBasicMaterial
          color="#a49bff"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function Backdrop({ progress }: ResearchUniverseProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame(({ clock }) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime!.value = clock.elapsedTime;
    materialRef.current.uniforms.uProgress!.value = progress.current;
  });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
    }),
    [],
  );

  return (
    <mesh position={[0, 0, -8]} scale={[28, 18, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={backdropFragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
}

function IntelligencePlanet({ progress }: ResearchUniverseProps) {
  const groupRef = useRef<THREE.Group>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const arcs = useMemo(
    () => [
      [new THREE.Vector3(-1.75, 0.42, 0.88), new THREE.Vector3(0, 2.7, 0.35), new THREE.Vector3(1.62, -0.3, 1.12)],
      [new THREE.Vector3(-1.15, -1.22, 1.18), new THREE.Vector3(0.6, 2.45, 0.62), new THREE.Vector3(1.76, 0.66, 0.92)],
      [new THREE.Vector3(-1.82, 0.9, 0.45), new THREE.Vector3(-0.35, -2.65, 0.72), new THREE.Vector3(1.4, -1.22, 1.1)],
    ].map(([a, b, c]) => new THREE.QuadraticBezierCurve3(a, b, c).getPoints(72)),
    [],
  );

  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uReveal: { value: 0 } }),
    [],
  );

  useFrame(({ clock }) => {
    const p = progress.current;
    const reveal = range(p, 0.3, 0.42) * (1 - range(p, 0.69, 0.78));
    if (groupRef.current) {
      groupRef.current.visible = reveal > 0.005;
      groupRef.current.rotation.y = clock.elapsedTime * 0.055 + p * 0.7;
      groupRef.current.rotation.x = -0.12 + Math.sin(clock.elapsedTime * 0.18) * 0.025;
      groupRef.current.scale.setScalar(0.68 + reveal * 0.32);
      groupRef.current.position.y = THREE.MathUtils.lerp(-1.2, 0, reveal);
    }
    if (shellRef.current) {
      shellRef.current.rotation.y = -clock.elapsedTime * 0.035;
      const shellMaterial = shellRef.current.material as THREE.MeshBasicMaterial;
      shellMaterial.opacity = reveal * 0.13;
    }
    if (materialRef.current) {
      materialRef.current.uniforms.uTime!.value = clock.elapsedTime;
      materialRef.current.uniforms.uReveal!.value = reveal;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[2, 128, 128]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={planetFragmentShader}
          uniforms={uniforms}
          transparent
        />
      </mesh>
      <mesh ref={shellRef} scale={1.055}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial
          color="#9288ff"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
      {arcs.map((points, index) => (
        <Line
          key={index}
          points={points}
          color={index === 1 ? "#f4f2ff" : "#8f86ff"}
          lineWidth={0.75}
          transparent
          opacity={0.5}
        />
      ))}
      <PulseRing rotation={[-0.3, -0.7, 0.1]} phase={0} />
      <PulseRing rotation={[0.7, 1.1, -0.4]} phase={0.32} />
      <PulseRing rotation={[-0.9, 2.2, 0.2]} phase={0.68} />
    </group>
  );
}

function Galaxy({ progress }: ResearchUniverseProps) {
  const groupRef = useRef<THREE.Group>(null);
  const armsRef = useRef<Array<THREE.Group | null>>([]);
  const arms = useMemo(
    () =>
      Array.from({ length: 4 }, (_, arm) =>
        Array.from({ length: 180 }, (_, index) => {
          const t = index / 179;
          const angle = t * Math.PI * 3.35 + arm * (Math.PI / 2);
          const radius = 0.18 + t * 3.5;
          return new THREE.Vector3(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius * 0.44,
            Math.sin(t * Math.PI) * 0.22,
          );
        }),
      ),
    [],
  );

  useFrame(({ clock }) => {
    const p = progress.current;
    const reveal = range(p, 0.62, 0.73) * (1 - range(p, 0.88, 0.96));
    const fracture = range(p, 0.79, 0.9);
    if (!groupRef.current) return;
    groupRef.current.visible = reveal > 0.005;
    groupRef.current.rotation.z = clock.elapsedTime * 0.018 + p * 0.35;
    groupRef.current.rotation.x = 1.02 - fracture * 0.3;
    groupRef.current.scale.setScalar(0.66 + reveal * 0.34);
    armsRef.current.forEach((arm, index) => {
      if (!arm) return;
      arm.position.x = fracture * (index - 1.5) * 1.5;
      arm.position.y = fracture * Math.sin(index * 1.7) * 1.05;
      arm.rotation.z = fracture * (index - 1.5) * 0.24;
    });
  });

  return (
    <group ref={groupRef} position={[0.2, -0.1, 0]}>
      {arms.map((points, index) => (
        <group
          key={index}
          ref={(node) => {
            armsRef.current[index] = node;
          }}
        >
          <Line
            points={points}
            color={index % 2 ? "#f4f2ff" : "#766cff"}
            lineWidth={index % 2 ? 2.4 : 3.2}
            transparent
            opacity={0.48}
          />
        </group>
      ))}
    </group>
  );
}

function Moon({ progress }: ResearchUniverseProps) {
  const moonRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useFrame(({ clock }) => {
    if (!moonRef.current || !materialRef.current) return;
    const reveal = range(progress.current, 0.84, 0.97);
    moonRef.current.visible = reveal > 0.005;
    moonRef.current.position.y = THREE.MathUtils.lerp(-9.5, -5.7, reveal);
    moonRef.current.rotation.y = clock.elapsedTime * 0.018;
    materialRef.current.uniforms.uTime!.value = clock.elapsedTime;
  });

  return (
    <mesh ref={moonRef} position={[0, -9.5, -0.6]} scale={[1.4, 0.72, 1.4]}>
      <sphereGeometry args={[5.6, 160, 160]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={moonFragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

function UniverseScene({ progress }: ResearchUniverseProps) {
  useFrame(({ camera }) => {
    const p = progress.current;
    const planetFocus = range(p, 0.3, 0.45) * (1 - range(p, 0.64, 0.76));
    const moonDescent = range(p, 0.84, 1);
    camera.position.x = THREE.MathUtils.lerp(0.55, 0, planetFocus);
    camera.position.y = THREE.MathUtils.lerp(0.35, -0.8, moonDescent);
    camera.position.z = THREE.MathUtils.lerp(8, 6.4, planetFocus);
    camera.lookAt(0, moonDescent * -1.1, 0);
  });

  return (
    <>
      <Backdrop progress={progress} />
      <ambientLight intensity={0.25} />
      <pointLight position={[-4, 5, 6]} intensity={14} color="#8f86ff" />
      <IntelligencePlanet progress={progress} />
      <Galaxy progress={progress} />
      <Moon progress={progress} />
    </>
  );
}

export function ResearchUniverse({ progress }: ResearchUniverseProps) {
  return (
    <Canvas
      camera={{ position: [0.55, 0.35, 8], fov: 44, near: 0.1, far: 100 }}
      dpr={[1, 1.65]}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.setClearColor("#010209");
      }}
    >
      <UniverseScene progress={progress} />
    </Canvas>
  );
}
