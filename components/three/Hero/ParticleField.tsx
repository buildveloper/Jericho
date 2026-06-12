"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ANIMATION } from "@/lib/constants";

interface ParticleFieldProps {
  assemblyProgress?: number;
  reducedMotion?: boolean;
  isMobile?: boolean;
  particleCount?: number;
}

export function ParticleField({
  assemblyProgress = 0,
  reducedMotion = false,
  isMobile = false,
  particleCount: countOverride,
}: ParticleFieldProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const count = countOverride ?? (isMobile ? ANIMATION.particleCountMobile : ANIMATION.particleCount);

  const scatterPositions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 4 + Math.random() * 6;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, [count]);

  const walletPositions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const { width, height, depth } = { width: 2, height: 3, depth: 0.3 };
    for (let i = 0; i < count; i++) {
      const face = Math.floor(Math.random() * 6);
      let x: number, y: number, z: number;
      const jx = (Math.random() - 0.5) * width * 0.9;
      const jy = (Math.random() - 0.5) * height * 0.65;
      const jz = (Math.random() - 0.5) * depth * 0.9;

      switch (face) {
        case 0: x = jx; y = jy; z = depth * 0.5 + Math.random() * 0.05; break;
        case 1: x = jx; y = jy; z = -depth * 0.5 - Math.random() * 0.05; break;
        case 2: x = -width * 0.5 - Math.random() * 0.05; y = jy; z = jz; break;
        case 3: x = width * 0.5 + Math.random() * 0.05; y = jy; z = jz; break;
        case 4: x = jx; y = height * 0.35 + Math.random() * 0.05; z = jz; break;
        default: x = jx; y = -height * 0.35 - Math.random() * 0.05; z = jz; break;
      }

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return positions;
  }, [count]);

  const colors = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const c1 = new THREE.Color("#3B82F6");
    const c2 = new THREE.Color("#8B5CF6");
    for (let i = 0; i < count; i++) {
      const c = c1.clone().lerp(c2, Math.random());
      arr[i * 3] = c.r; arr[i * 3 + 1] = c.g; arr[i * 3 + 2] = c.b;
    }
    return arr;
  }, [count]);

  const geometry = useMemo(() => new THREE.SphereGeometry(0.03, 6, 6), []);

  useEffect(() => {
    if (!meshRef.current) return;
    meshRef.current.instanceColor = new THREE.InstancedBufferAttribute(colors, 3);
    meshRef.current.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    return () => {
      meshRef.current?.geometry.dispose();
      if (meshRef.current?.material instanceof THREE.Material) {
        meshRef.current.material.dispose();
      }
    };
  }, [colors]);

  useFrame((_, _delta) => {
    if (!meshRef.current) return;
    if (reducedMotion && assemblyProgress >= 0.99) return;

    const mesh = meshRef.current;
    const time = Date.now() * 0.001;
    const dummy = new THREE.Object3D();
    const p = easeInOutCubic(assemblyProgress);
    const wobble = (1 - p) * 0.3;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const tx = scatterPositions[i3] + (walletPositions[i3] - scatterPositions[i3]) * p + Math.sin(time * 3 + i * 0.5) * wobble;
      const ty = scatterPositions[i3 + 1] + (walletPositions[i3 + 1] - scatterPositions[i3 + 1]) * p + Math.cos(time * 2.5 + i * 0.7) * wobble;
      const tz = scatterPositions[i3 + 2] + (walletPositions[i3 + 2] - scatterPositions[i3 + 2]) * p + Math.sin(time * 2 + i * 0.3) * wobble;

      dummy.position.set(tx, ty, tz);
      dummy.scale.setScalar(0.5 + p * 0.5);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, count]} frustumCulled>
      <meshStandardMaterial emissive="#3B82F6" emissiveIntensity={0.5} transparent opacity={0.8} depthWrite={false} />
    </instancedMesh>
  );
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
