"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useMediaQuery";

interface AirtimeSceneProps {
  scrollProgress?: number;
}

const PARTICLE_COUNT = 1800;
const MOBILE_COUNT = 600;
const WAVE_AMPLITUDE = 2.5;
const WAVE_FREQUENCY = 0.6;

/**
 * Airtime scene — abstract particle flow evoking data/airtime transmission.
 * Particles rise in sine-wave patterns, converging into signal-like streams.
 * Scroll intensifies the flow speed and particle density.
 */
export function AirtimeScene({ scrollProgress = 0 }: AirtimeSceneProps) {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { camera } = useThree();

  const count = isMobile ? MOBILE_COUNT : PARTICLE_COUNT;

  const particleData = useMemo(() => {
    return Array.from({ length: count }, () => ({
      baseX: (Math.random() - 0.5) * 8,
      baseY: (Math.random() - 0.5) * 12,
      baseZ: -4 + Math.random() * 8,
      speed: 0.4 + Math.random() * 1.6,
      phase: Math.random() * Math.PI * 2,
      waveOffset: (Math.random() - 0.5) * 3,
      streamIndex: Math.floor(Math.random() * 5),
    }));
  }, [count]);

  const colorArr = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const colors = [
      new THREE.Color("#3B82F6"),
      new THREE.Color("#8B5CF6"),
      new THREE.Color("#14B8A6"),
      new THREE.Color("#60A5FA"),
      new THREE.Color("#A78BFA"),
    ];
    for (let i = 0; i < count; i++) {
      const c = colors[i % 5];
      arr[i * 3] = c.r;
      arr[i * 3 + 1] = c.g;
      arr[i * 3 + 2] = c.b;
    }
    return arr;
  }, [count]);

  const geometry = useMemo(() => new THREE.SphereGeometry(0.03, 4, 4), []);

  const setRef = (mesh: THREE.InstancedMesh | null) => {
    (meshRef as React.MutableRefObject<THREE.InstancedMesh | null>).current = mesh;
    if (mesh) {
      mesh.instanceColor = new THREE.InstancedBufferAttribute(colorArr, 3);
      mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    }
  };

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh || reducedMotion) return;

    const time = Date.now() * 0.001;
    const speedMult = 1 + scrollProgress * 2.5;
    const dummy = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      const p = particleData[i];

      // Rise upward with scroll acceleration
      let y = p.baseY + time * p.speed * speedMult * 2;
      // Wrap around
      y = ((y + 6) % 12) - 6;

      // Sine wave horizontal displacement
      const streamX =
        Math.sin(time * WAVE_FREQUENCY + p.waveOffset) * WAVE_AMPLITUDE * (0.5 + scrollProgress * 0.5);
      const streamZ =
        Math.cos(time * WAVE_FREQUENCY * 1.3 + p.waveOffset) * WAVE_AMPLITUDE * 0.5 * (0.5 + scrollProgress * 0.5);

      // Particles in different "streams" cluster slightly
      const clusterX = (p.streamIndex - 2) * 0.8;

      const x = p.baseX + streamX + clusterX;
      const z = p.baseZ + streamZ;

      dummy.position.set(x, y, z);

      // Glow/pulse effect
      const pulse = 0.5 + Math.sin(time * 4 + p.phase) * 0.5;
      const scale = 0.4 + pulse * 1.2 + scrollProgress * 0.8;
      dummy.scale.setScalar(scale);

      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;

    // Gentle camera pan
    const camX = Math.sin(time * 0.2) * 0.5;
    const camY = Math.cos(time * 0.3) * 0.3;
    camera.position.x += (camX - camera.position.x) * 0.01;
    camera.position.y += (camY - camera.position.y) * 0.01;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.08} color="#050520" />

      {/* Central signal beam */}
      <pointLight position={[0, 4, 0]} intensity={2 + scrollProgress * 3} color="#3B82F6" decay={2} distance={12} />
      <pointLight position={[2, -2, 2]} intensity={1.2} color="#8B5CF6" decay={2} distance={8} />
      <pointLight position={[-2, -1, -2]} intensity={0.8} color="#14B8A6" decay={2} distance={8} />

      {/* Signal rings pulsing outward */}
      {[0, 1, 2, 3].map((i) => (
        <mesh key={`ring-${i}`} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.5 + i * 0.5, 0.015, 8, 64]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? "#3B82F6" : i % 3 === 1 ? "#8B5CF6" : "#14B8A6"}
            transparent
            opacity={0.08 + scrollProgress * 0.12}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}

      {/* Particle flow */}
      <instancedMesh ref={setRef} args={[geometry, undefined, count]} frustumCulled={false}>
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.8}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </instancedMesh>

      <fog attach="fog" args={["#050510", 6, 18]} />
    </>
  );
}
