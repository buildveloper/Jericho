"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useMotionValue } from "framer-motion";
import { useEffect } from "react";
import * as THREE from "three";
import { ANIMATION } from "@/lib/constants";

interface MouseParallaxProps {
  enabled?: boolean;
}

export function MouseParallax({ enabled = true }: MouseParallaxProps) {
  const { camera } = useThree();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const currentTarget = useRef(new THREE.Vector3(0, 0, 6));

  useEffect(() => {
    if (!enabled) return;
    const handler = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, [enabled, mouseX, mouseY]);

  useFrame(() => {
    if (!enabled) {
      camera.position.lerp(new THREE.Vector3(0, 0, 6), 0.05);
      camera.lookAt(0, -0.3, 0);
      return;
    }

    const strength = ANIMATION.mouseParallaxStrength;
    const tx = mouseX.get() * strength;
    const ty = mouseY.get() * strength * 0.5;

    currentTarget.current.set(tx, ty, 6);
    camera.position.lerp(currentTarget.current, 0.03);

    const lookTarget = new THREE.Vector3(tx * 0.5, ty * 0.5 - 0.3, 0);
    camera.lookAt(lookTarget);
  });

  return null;
}
