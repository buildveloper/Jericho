"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface TunnelGeometryProps {
  scrollProgress?: number;
  reducedMotion?: boolean;
}

/**
 * Procedural cylindrical tunnel with wave displacement.
 * Scroll tightens the tunnel and intensifies the distortion.
 */
export function TunnelGeometry({
  scrollProgress = 0,
  reducedMotion = false,
}: TunnelGeometryProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const { geometry, material } = useMemo(() => {
    // Cylinder tunnel: many segments for smooth distortion
    const geo = new THREE.CylinderGeometry(2.5, 3.5, 30, 64, 200, true);
    // Invert normals so camera sees the inside
    return {
      geometry: geo,
      material: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#0a0a20"),
        emissive: new THREE.Color("#0a0a30"),
        emissiveIntensity: 0.3,
        roughness: 0.85,
        side: THREE.BackSide,
        depthWrite: true,
      }),
    };
  }, []);

  // Ring segments inside the tunnel
  const rings = useMemo(() => {
    const ringArr: { position: [number, number, number]; color: string }[] = [];
    for (let i = 0; i < 24; i++) {
      const z = (i - 12) * 1.2;
      ringArr.push({ position: [0, 0, z], color: i % 3 === 0 ? "#3B82F6" : i % 3 === 1 ? "#8B5CF6" : "#14B8A6" });
    }
    return ringArr;
  }, []);

  const ringGeo = useMemo(() => new THREE.TorusGeometry(2.6 + 0.05, 0.03, 8, 48), []);

  useFrame((_, delta) => {
    if (!meshRef.current || reducedMotion) return;

    const time = Date.now() * 0.001;
    const intensity = 0.5 + scrollProgress * 0.5;

    // Wave displacement on cylinder vertices
    const posAttr = geometry.attributes.position;
    const origPos = posAttr.array.slice(); // We'd ideally store originals, but for now regenerate per frame
    for (let i = 1; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      const z = posAttr.getZ(i);

      // Wave distortion based on scroll
      const waveFactor = Math.sin(z * 0.8 + time * 2) * 0.3 * intensity;
      const twistFactor = Math.cos(z * 0.4 + time) * 0.2 * intensity;

      const angle = Math.atan2(y, x);
      const radius = Math.sqrt(x * x + y * y);

      const newAngle = angle + twistFactor;
      const newRadius = radius + waveFactor;

      posAttr.setXYZ(i, Math.cos(newAngle) * newRadius, Math.sin(newAngle) * newRadius, z);
    }
    posAttr.needsUpdate = true;

    // Slow rotation of the entire tunnel
    meshRef.current.rotation.z += delta * 0.05 * intensity;
  });

  return (
    <group>
      {/* Main tunnel */}
      <mesh ref={meshRef} geometry={geometry} material={material} />

      {/* Ring highlights */}
      {rings.map((ring, i) => (
        <mesh key={i} position={ring.position} geometry={ringGeo} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color={ring.color} transparent opacity={0.15} depthWrite={false} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}

      {/* Grid lines along the tunnel for wireframe feel */}
      <lineSegments>
        <edgesGeometry args={[new THREE.CylinderGeometry(2.55, 3.55, 30, 24, 24, true)]} />
        <lineBasicMaterial color="#3B82F6" transparent opacity={0.06} />
      </lineSegments>
    </group>
  );
}
