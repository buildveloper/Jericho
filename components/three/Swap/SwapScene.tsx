"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { TunnelGeometry } from "@/components/three/Bridge/TunnelGeometry";
import { TokenRays } from "@/components/three/Bridge/TokenRays";
import { TunnelGlow } from "@/components/three/Bridge/TunnelGlow";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useMediaQuery";

interface SwapSceneProps {
  scrollProgress?: number;
}

/**
 * Swap scene — hyperspace exchange tunnel.
 * Camera enters the tunnel; scroll drives depth.
 * Token rays flow inward from both directions, meeting mid-tunnel
 * to represent asset exchange. Glow intensifies with scroll.
 */
export function SwapScene({ scrollProgress = 0 }: SwapSceneProps) {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const { camera } = useThree();
  const perspectiveCamera = camera as THREE.PerspectiveCamera;

  useFrame(() => {
    if (reducedMotion) return;

    const targetZ = -scrollProgress * 12;
    const targetPos = new THREE.Vector3(0, scrollProgress * 0.5, targetZ);
    camera.position.lerp(targetPos, 0.04);
    camera.lookAt(0, 0, targetZ + 12);

    const baseFov = 55;
    const targetFov = baseFov + scrollProgress * 12;
    perspectiveCamera.fov += (targetFov - perspectiveCamera.fov) * 0.05;
    perspectiveCamera.updateProjectionMatrix();
  });

  return (
    <>
      <ambientLight intensity={0.1} color="#050520" />

      <TunnelGeometry scrollProgress={scrollProgress} reducedMotion={reducedMotion} />
      <TokenRays scrollProgress={scrollProgress} reducedMotion={reducedMotion} isMobile={isMobile} />
      <TunnelGlow scrollProgress={scrollProgress} reducedMotion={reducedMotion} />
    </>
  );
}
