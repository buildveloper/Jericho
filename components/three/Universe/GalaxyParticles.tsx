"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ANIMATION } from "@/lib/constants";

interface GalaxyParticlesProps {
  scrollProgress?: number;
  reducedMotion?: boolean;
  isMobile?: boolean;
}

export function GalaxyParticles({
  scrollProgress = 0,
  reducedMotion = false,
  isMobile = false,
}: GalaxyParticlesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const count = isMobile
    ? ANIMATION.galaxyStarCountMobile
    : ANIMATION.galaxyStarCount;

  const basePositions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const arms = 5;
    const maxRadius = 20;

    for (let i = 0; i < count; i++) {
      const arm = i % arms;
      const t = Math.random();
      const radius = 1 + t * (maxRadius - 1);
      const baseAngle = (arm / arms) * Math.PI * 2;
      const spread = (1 - t) * 0.8;
      const angle = baseAngle + t * 4 + (Math.random() - 0.5) * spread;
      const height = (Math.random() - 0.5) * 3 * (1 - t * 0.8);

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return positions;
  }, [count]);

  const geometry = useMemo(() => new THREE.SphereGeometry(0.02, 4, 4), []);

  // Set colors once on mount
  useEffect(() => {
    if (!meshRef.current) return;
    const m = meshRef.current;
    const colorArr = new Float32Array(count * 3);
    const warm = new THREE.Color("#ffffff");
    const cool = new THREE.Color("#8899ff");
    const purple = new THREE.Color("#aa88ff");

    for (let i = 0; i < count; i++) {
      const r = Math.random();
      const c =
        r < 0.6
          ? warm.clone().lerp(cool, Math.random())
          : r < 0.85
          ? cool.clone()
          : purple.clone();
      const brightness = 0.3 + Math.random() * 0.7;
      colorArr[i * 3] = c.r * brightness;
      colorArr[i * 3 + 1] = c.g * brightness;
      colorArr[i * 3 + 2] = c.b * brightness;
    }

    m.instanceColor = new THREE.InstancedBufferAttribute(colorArr, 3);
    m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  }, [count]);

  useFrame((_, delta) => {
    if (!meshRef.current || reducedMotion) return;

    const m = meshRef.current;
    const dummy = new THREE.Object3D();
    const time = Date.now() * 0.0001;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      let x = basePositions[i3];
      let y = basePositions[i3 + 1];
      let z = basePositions[i3 + 2];

      x += Math.sin(time * 5 + i * 0.01) * 0.2;
      y += Math.cos(time * 3 + i * 0.02) * 0.15;
      z += Math.sin(time * 4 + i * 0.015) * 0.2;

      const pushBack = scrollProgress * 8;
      z -= Math.sin((i / count) * Math.PI) * pushBack;

      dummy.position.set(x, y, z);

      const twinkle = 0.6 + Math.sin(time * 10 + i * 0.1) * 0.4;
      dummy.scale.setScalar(twinkle);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    }

    m.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, undefined, count]}
      frustumCulled={false}
    >
      <meshBasicMaterial
        color="#ffffff"
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
}
