"use client";

import { GPU_TIER, type GpuTier } from "@/lib/gpu";
import { useIsMobile } from "./useMediaQuery";
import { useEffect, useState } from "react";

/**
 * GPU detection without relying on useDetectGPU's async network calls.
 * Uses WebGL renderer string + extensions as a fast sync heuristic.
 * Falls back to MEDIUM tier on error.
 */
async function detectGPUHeuristic(): Promise<GpuTier> {
  try {
    const offscreen = new OffscreenCanvas(1, 1);
    const gl = offscreen.getContext("webgl2") as WebGL2RenderingContext | null
      || offscreen.getContext("webgl") as WebGLRenderingContext | null;

    if (!gl) return GPU_TIER.LOW;

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = debugInfo
      ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) as string
      : "";

    const low = /(intel.*hd graphics [0-4]|[am]d.*radeon [rh][0-4])/i;
    const med = /(intel|radeon|adreno [5-6]|mali-[gt]7)/i;

    if (low.test(renderer)) return GPU_TIER.LOW;
    if (med.test(renderer)) return GPU_TIER.MEDIUM;

    return GPU_TIER.HIGH;
  } catch {
    return GPU_TIER.MEDIUM;
  }
}

export function useGPUDetect(): { gpuTier: GpuTier; isMobile: boolean } {
  const isMobile = useIsMobile();
  const [gpuTier, setGpuTier] = useState<GpuTier>(GPU_TIER.MEDIUM);

  useEffect(() => {
    let cancelled = false;
    detectGPUHeuristic().then((tier) => {
      if (!cancelled) setGpuTier(tier);
    });
    return () => { cancelled = true; };
  }, []);

  // Mobile gets LOW regardless
  const effectiveTier = isMobile ? GPU_TIER.LOW : gpuTier;

  return { gpuTier: effectiveTier, isMobile };
}
