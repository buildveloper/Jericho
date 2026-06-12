"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ANIMATION } from "@/lib/constants";

interface ParticleFieldProps {
  assemblyProgress?: number; // 0 = scattered, 1 = wallet shape
  reducedMotion?: boolean;
  isMobile?: boolean;
}

/**
 * InstancedMesh particle field.
 * Particles start scattered in a sphere, then morph into wallet surface positions.
 * This is the core "particles assembling into wallet" effect.
 */
export function ParticleField({
  assemblyProgress = 0,
  reducedMotion = false,
  isMobile = false,
}: ParticleFieldProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const count = isMobile
    ? ANIMATION.particleCountMobile
    : ANIMATION.particleCount;

  // Precompute scatter positions (sphere)
  const scatterPositions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Fibonacci sphere distribution for even scattering
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 4 + Math.random() * 6;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, [count]);

  // Precompute wallet-surface target positions
  const walletPositions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const { width, height, depth } = { width: 2, height: 3, depth: 0.3 };

    for (let i = 0; i < count; i++) {
      // Distribute points on surfaces of a rounded rectangle
      const face = Math.floor(Math.random() * 6);
      let x: number, y: number, z: number;

      switch (face) {
        case 0: // front
          x = (Math.random() - 0.5) * width * 0.9;
          y = (Math.random() - 0.5) * height * 0.65;
          z = depth * 0.5 + Math.random() * 0.05;
          break;
        case 1: // back
          x = (Math.random() - 0.5) * width * 0.9;
          y = (Math.random() - 0.5) * height * 0.65;
          z = -depth * 0.5 - Math.random() * 0.05;
          break;
        case 2: // left
          x = -width * 0.5 - Math.random() * 0.05;
          y = (Math.random() - 0.5) * height * 0.65;
          z = (Math.random() - 0.5) * depth * 0.9;
          break;
        case 3: // right
          x = width * 0.5 + Math.random() * 0.05;
          y = (Math.random() - 0.5) * height * 0.65;
          z = (Math.random() - 0.5) * depth * 0.9;
          break;
        case 4: // top
          x = (Math.random() - 0.5) * width * 0.9;
          y = height * 0.35 + Math.random() * 0.05;
          z = (Math.random() - 0.5) * depth * 0.9;
          break;
        default: // bottom
          x = (Math.random() - 0.5) * width * 0.9;
          y = -height * 0.35 - Math.random() * 0.05;
          z = (Math.random() - 0.5) * depth * 0.9;
          break;
      }

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return positions;
  }, [count]);

  // Colors: aurora gradient (blue → purple)
  const colors = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const color1 = new THREE.Color("#3B82F6");
    const color2 = new THREE.Color("#8B5CF6");
    for (let i = 0; i < count; i++) {
      const t = Math.random();
      const c = color1.clone().lerp(color2, t);
      arr[i * 3] = c.r;
      arr[i * 3 + 1] = c.g;
      arr[i * 3 + 2] = c.b;
    }
    return arr;
  }, [count]);

  // Particle geometry
  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(0.03, 6, 6);
    return geo;
  }, []);

  // Set colors on mount
  useEffect(() => {
    if (!meshRef.current) return;
    meshRef.current.instanceColor = new THREE.InstancedBufferAttribute(colors, 3);
    meshRef.current.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  }, [colors]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    if (reducedMotion && assemblyProgress >= 0.99) return;

    // Smooth floating offset
    const time = Date.now() * 0.001;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Lerp between scatter and wallet positions
      const p = easeInOutCubic(assemblyProgress);

      let tx = scatterPositions[i3] + (walletPositions[i3] - scatterPositions[i3]) * p;
      let ty =
        scatterPositions[i3 + 1] +
        (walletPositions[i3 + 1] - scatterPositions[i3 + 1]) * p;
      let tz =
        scatterPositions[i3 + 2] +
        (walletPositions[i3 + 2] - scatterPositions[i3 + 2]) * p;

      // Add subtle wobble during assembly
      const wobble = (1 - p) * 0.3;
      tx += Math.sin(time * 3 + i * 0.5) * wobble;
      ty += Math.cos(time * 2.5 + i * 0.7) * wobble;
      tz += Math.sin(time * 2 + i * 0.3) * wobble;

      dummy.position.set(tx, ty, tz);

      // Scale particles: small when scattered, larger on surface
      const s = 0.5 + p * 0.5;
      dummy.scale.setScalar(s);

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, undefined, count]}
      frustumCulled
    >
      <meshStandardMaterial
        emissive="#3B82F6"
        emissiveIntensity={0.5}
        transparent
        opacity={0.8}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
