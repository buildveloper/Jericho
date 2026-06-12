"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CHAINS } from "@/data/chains";
import { ANIMATION } from "@/lib/constants";

interface TokenTrailsProps {
  scrollProgress?: number;
  reducedMotion?: boolean;
  isMobile?: boolean;
}

export function TokenTrails({
  scrollProgress = 0,
  reducedMotion = false,
  isMobile = false,
}: TokenTrailsProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const trailCount = isMobile ? 80 : ANIMATION.tokenTrailCount;

  const chainPositions = useMemo(() => {
    return CHAINS.map((chain, i) => {
      const angle = (i / CHAINS.length) * Math.PI * 2;
      return new THREE.Vector3(
        Math.cos(angle) * 5,
        (i % 3) * 1.5 - 1.5,
        Math.sin(angle) * 5
      );
    });
  }, []);

  const trailData = useMemo(() => {
    const paths: {
      start: THREE.Vector3;
      end: THREE.Vector3;
      control1: THREE.Vector3;
      control2: THREE.Vector3;
      color: THREE.Color;
      phase: number;
      speed: number;
    }[] = [];

    const colorArr = new Float32Array(trailCount * 3);

    for (let i = 0; i < trailCount; i++) {
      const fromIdx = Math.floor(Math.random() * chainPositions.length);
      let toIdx = Math.floor(Math.random() * chainPositions.length);
      while (toIdx === fromIdx) {
        toIdx = Math.floor(Math.random() * chainPositions.length);
      }

      const start = chainPositions[fromIdx].clone();
      const end = chainPositions[toIdx].clone();
      const mid = start.clone().add(end).multiplyScalar(0.5);
      const outward = mid.clone().normalize().multiplyScalar(2 + Math.random() * 3);
      const control1 = start.clone().lerp(mid, 0.4).add(outward);
      const control2 = end.clone().lerp(mid, 0.4).add(outward);
      const c = new THREE.Color(CHAINS[fromIdx].color);

      paths.push({ start, end, control1, control2, color: c, phase: Math.random() * Math.PI * 2, speed: 0.3 + Math.random() * 0.7 });
      colorArr[i * 3] = c.r;
      colorArr[i * 3 + 1] = c.g;
      colorArr[i * 3 + 2] = c.b;
    }

    return { paths, colorArr };
  }, [chainPositions, trailCount]);

  const headGeo = useMemo(() => new THREE.SphereGeometry(0.04, 6, 6), []);

  // Set instance colors once on render (via ref callback)
  const setRef = (mesh: THREE.InstancedMesh | null) => {
    (meshRef as React.MutableRefObject<THREE.InstancedMesh | null>).current = mesh;
    if (mesh) {
      mesh.instanceColor = new THREE.InstancedBufferAttribute(trailData.colorArr, 3);
      mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    }
  };

  useFrame((_, _delta) => {
    const mesh = meshRef.current;
    if (!mesh || reducedMotion) return;

    const time = Date.now() * 0.001;
    const dummy = new THREE.Object3D();
    const { paths, colorArr } = trailData;

    for (let i = 0; i < trailCount; i++) {
      const path = paths[i];
      const rawT = ((time * path.speed + path.phase) % 2) / 2;
      const t = rawT < 1 ? rawT : 2 - rawT;
      const u = 1 - t;

      const pos = new THREE.Vector3()
        .addScaledVector(path.start, u * u * u)
        .addScaledVector(path.control1, 3 * u * u * t)
        .addScaledVector(path.control2, 3 * u * t * t)
        .addScaledVector(path.end, t * t * t);

      dummy.position.copy(pos);
      const visibility = (0.3 + scrollProgress * 0.7) * (0.4 + 0.6 * Math.sin(t * Math.PI));
      dummy.scale.setScalar(visibility);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      if (mesh.instanceColor) {
        const i3 = i * 3;
        const brightness = 0.5 + scrollProgress * 0.5;
        mesh.instanceColor.setXYZ(i, colorArr[i3] * brightness, colorArr[i3 + 1] * brightness, colorArr[i3 + 2] * brightness);
      }
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={setRef} args={[headGeo, undefined, trailCount]} frustumCulled>
      <meshBasicMaterial transparent opacity={0.8} depthWrite={false} blending={THREE.AdditiveBlending} />
    </instancedMesh>
  );
}
