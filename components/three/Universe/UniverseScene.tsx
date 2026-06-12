"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { GalaxyParticles } from "./GalaxyParticles";
import { ChainNodes } from "./ChainNodes";
import { TokenTrails } from "./TokenTrails";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useMediaQuery";

interface UniverseSceneProps {
  scrollProgress?: number;
}

/**
 * The Blockchain Universe scene.
 * Camera flies through a galaxy of connected chain networks.
 * Scroll drives the camera along a bezier path.
 * Wallet "explosion" effect is implicit in the particle field formation.
 */
export function UniverseScene({ scrollProgress = 0 }: UniverseSceneProps) {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const { camera } = useThree();
  const cameraPathRef = useRef({
    start: new THREE.Vector3(0, 0, 8),
    mid1: new THREE.Vector3(3, 2, 4),
    mid2: new THREE.Vector3(-2, -1, 2),
    end: new THREE.Vector3(0, 0.5, 1),
  });

  // Animate camera along bezier path based on scroll
  useFrame(() => {
    if (reducedMotion) return;

    const { start, mid1, mid2, end } = cameraPathRef.current;
    const t = Math.min(1, Math.max(0, scrollProgress));

    // Cubic bezier camera path
    const u = 1 - t;
    const pos = new THREE.Vector3()
      .addScaledVector(start, u * u * u)
      .addScaledVector(mid1, 3 * u * u * t)
      .addScaledVector(mid2, 3 * u * t * t)
      .addScaledVector(end, t * t * t);

    camera.position.lerp(pos, 0.04);

    // Look at the center with a gentle sway
    const lookTarget = new THREE.Vector3(
      Math.sin(t * Math.PI) * 1.5,
      (t - 0.5) * 2,
      0
    );
    camera.lookAt(lookTarget);
  });

  return (
    <>
      {/* Deep space ambient */}
      <ambientLight intensity={0.15} color="#050520" />

      {/* Cinematic key lights */}
      <pointLight
        position={[8, 4, 0]}
        intensity={2}
        color="#3B82F6"
        decay={2}
      />
      <pointLight
        position={[-5, -2, 3]}
        intensity={1.2}
        color="#8B5CF6"
        decay={2}
      />
      <pointLight
        position={[0, 1, -5]}
        intensity={0.8}
        color="#14B8A6"
        decay={2}
      />

      {/* Background galaxy star field */}
      <GalaxyParticles
        scrollProgress={scrollProgress}
        reducedMotion={reducedMotion}
        isMobile={isMobile}
      />

      {/* Floating chain nodes */}
      <ChainNodes
        scrollProgress={scrollProgress}
        reducedMotion={reducedMotion}
      />

      {/* Animated token trails between chains */}
      <TokenTrails
        scrollProgress={scrollProgress}
        reducedMotion={reducedMotion}
        isMobile={isMobile}
      />

      {/* Volumetric fog for depth */}
      <fog attach="fog" args={["#050510", 8, 25]} />
    </>
  );
}
