"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { GalaxyParticles } from "@/components/three/Universe/GalaxyParticles";
import { ChainNodes } from "@/components/three/Universe/ChainNodes";
import { TokenTrails } from "@/components/three/Universe/TokenTrails";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useMediaQuery";

interface StoreSceneProps {
  scrollProgress?: number;
}

/**
 * Store scene — multi-chain constellation.
 * Six chain nodes orbit in a structured ring, connected by token trails.
 * Scroll gently pans the camera to reveal the full chain ecosystem.
 */
export function StoreScene({ scrollProgress = 0 }: StoreSceneProps) {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const { camera } = useThree();

  const initialCam = useRef(new THREE.Vector3(0, 0.5, 8));

  useFrame(() => {
    if (reducedMotion) return;

    const progress = scrollProgress;
    const angle = Math.sin(progress * Math.PI * 0.5) * 1.2;
    const targetX = Math.sin(angle) * 2;
    const targetY = 0.5 + progress * 0.5;
    const targetZ = 8 - progress * 3;

    const target = new THREE.Vector3(targetX, targetY, targetZ);
    camera.position.lerp(target, 0.03);
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.15} color="#050520" />

      <pointLight position={[8, 4, 0]} intensity={2.5} color="#3B82F6" decay={2} />
      <pointLight position={[-5, -2, 3]} intensity={1.5} color="#8B5CF6" decay={2} />
      <pointLight position={[0, 1, -5]} intensity={1} color="#14B8A6" decay={2} />

      <GalaxyParticles
        scrollProgress={scrollProgress}
        reducedMotion={reducedMotion}
        isMobile={isMobile}
      />

      <ChainNodes
        scrollProgress={scrollProgress}
        reducedMotion={reducedMotion}
      />

      <TokenTrails
        scrollProgress={scrollProgress}
        reducedMotion={reducedMotion}
        isMobile={isMobile}
      />

      <fog attach="fog" args={["#050510", 10, 30]} />
    </>
  );
}
