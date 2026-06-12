"use client";

import { useDetectGPU } from "@react-three/drei";
import { GPU_TIER, type GpuTier } from "@/lib/gpu";
import { useIsMobile } from "./useMediaQuery";

export function useGPUDetect(): { gpuTier: GpuTier; isMobile: boolean } {
  const isMobile = useIsMobile();
  const gpuResult = useDetectGPU();

  let tier: GpuTier = GPU_TIER.HIGH;

  const tierNum = gpuResult.tier;
  const gpuIsMobile = gpuResult.isMobile || isMobile;

  if (tierNum <= 1 || gpuIsMobile) {
    tier = GPU_TIER.LOW;
  } else if (tierNum <= 2) {
    tier = GPU_TIER.MEDIUM;
  }

  return { gpuTier: tier, isMobile: gpuIsMobile };
}
