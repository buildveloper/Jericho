"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { TunnelGeometry } from "./TunnelGeometry";
import { TokenRays } from "./TokenRays";
import { TunnelGlow } from "./TunnelGlow";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useMediaQuery";

interface BridgeSceneProps {
  scrollProgress?: number;
}

/**
 * Hyperspace bridge tunnel scene.
 * Camera enters the tunnel and pushes through as scroll progresses.
 * Token rays, volumetric glow, and procedural tunnel distortion.
 */
export function BridgeScene({ scrollProgress = 0 }: BridgeSceneProps) {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const { camera } = useThree();
  const perspectiveCamera = camera as THREE.PerspectiveCamera;

  useFrame(() => {
    if (reducedMotion) return;

    // Camera pushes deeper into the tunnel with scroll
    const targetZ = -scrollProgress * 10;
    const targetPos = new THREE.Vector3(0, 0, targetZ);
    camera.position.lerp(targetPos, 0.04);
    camera.lookAt(0, 0, targetZ + 10);

    // Increase FOV slightly for speed feel
    const baseFov = 55;
    const targetFov = baseFov + scrollProgress * 15;
    perspectiveCamera.fov += (targetFov - perspectiveCamera.fov) * 0.05;
    perspectiveCamera.updateProjectionMatrix();
  });

  return (
    <>
      <ambientLight intensity={0.1} color="#050520" />

      {/* Tunnel structure */}
      <TunnelGeometry scrollProgress={scrollProgress} reducedMotion={reducedMotion} />

      {/* Traveling light token rays */}
      <TokenRays scrollProgress={scrollProgress} reducedMotion={reducedMotion} isMobile={isMobile} />

      {/* Volumetric glow and lighting */}
      <TunnelGlow scrollProgress={scrollProgress} reducedMotion={reducedMotion} />
    </>
  );
}
