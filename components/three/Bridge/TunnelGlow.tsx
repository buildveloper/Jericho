"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface TunnelGlowProps {
  scrollProgress?: number;
  reducedMotion?: boolean;
}

/**
 * Volumetric glow and atmospheric lighting inside the bridge tunnel.
 * Point lights placed along the tunnel, pulsing with aurora colors.
 */
export function TunnelGlow({ scrollProgress = 0, reducedMotion = false }: TunnelGlowProps) {
  const groupRef = useRef<THREE.Group>(null);

  const glowPoints = useMemo(() => {
    const points: { z: number; color: string; intensity: number; phase: number }[] = [];
    for (let i = 0; i < 8; i++) {
      points.push({
        z: (i - 4) * 3.5,
        color: i % 3 === 0 ? "#3B82F6" : i % 3 === 1 ? "#8B5CF6" : "#14B8A6",
        intensity: 1 + Math.random() * 2,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return points;
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current || reducedMotion) return;
    groupRef.current.rotation.z += delta * 0.15;
  });

  return (
    <group ref={groupRef}>
      {glowPoints.map((pt, i) => (
        <pointLight
          key={i}
          position={[0, 0, pt.z]}
          color={pt.color}
          intensity={pt.intensity * (0.5 + scrollProgress * 0.5)}
          decay={2}
          distance={8}
        />
      ))}

      {/* Central bright core */}
      <pointLight position={[0, 0, 0]} color="#ffffff" intensity={1.5 * scrollProgress} decay={1.5} distance={12} />

      {/* Ambient glow spheres along the tunnel */}
      {glowPoints.map((pt, i) => (
        <mesh key={`glow-${i}`} position={[0, 0, pt.z]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshBasicMaterial color={pt.color} transparent opacity={0.06 + scrollProgress * 0.08} depthWrite={false} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}
    </group>
  );
}
