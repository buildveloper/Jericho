"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CHAINS } from "@/data/chains";

interface TokenRaysProps {
  scrollProgress?: number;
  reducedMotion?: boolean;
  isMobile?: boolean;
}

/**
 * Bright light ray tokens traveling through the bridge tunnel.
 * Elongated particles shoot along the Z-axis with aurora colors.
 */
export function TokenRays({
  scrollProgress = 0,
  reducedMotion = false,
  isMobile = false,
}: TokenRaysProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const rayCount = isMobile ? 60 : 150;

  const colorArr = useMemo(() => {
    const arr = new Float32Array(rayCount * 3);
    const colors = CHAINS.map((c) => new THREE.Color(c.color));
    for (let i = 0; i < rayCount; i++) {
      const c = colors[i % colors.length];
      arr[i * 3] = c.r;
      arr[i * 3 + 1] = c.g;
      arr[i * 3 + 2] = c.b;
    }
    return arr;
  }, [rayCount]);

  // Elongated stretched sphere for ray effect
  const rayGeo = useMemo(() => {
    const geo = new THREE.SphereGeometry(0.06, 6, 4);
    // Stretch along Z later via scale
    return geo;
  }, []);

  // Store each ray's base data
  const rayData = useMemo(() => {
    return Array.from({ length: rayCount }, () => ({
      z: (Math.random() - 0.5) * 28,
      radius: 1.8 + Math.random() * 1.2,
      angle: Math.random() * Math.PI * 2,
      speed: 2 + Math.random() * 4,
      length: 3 + Math.random() * 8,
    }));
  }, [rayCount]);

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

    const dummy = new THREE.Object3D();
    const speedMult = 1 + scrollProgress * 2;

    for (let i = 0; i < rayCount; i++) {
      let { z, radius, angle, speed, length } = rayData[i];

      // Move along Z
      z += delta * speed * speedMult;
      if (z > 15) z = -15;

      rayData[i].z = z;

      // Wrap around the tunnel radius
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      dummy.position.set(x, y, z);

      // Elongate along Z for the "ray" look
      dummy.scale.set(0.3 + scrollProgress * 0.7, 0.3 + scrollProgress * 0.7, length * 0.5);
      dummy.lookAt(x * 0.1, y * 0.1, z + 1);

      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={setRef} args={[rayGeo, undefined, rayCount]} frustumCulled>
      <meshBasicMaterial transparent opacity={0.7} depthWrite={false} blending={THREE.AdditiveBlending} />
    </instancedMesh>
  );
}
