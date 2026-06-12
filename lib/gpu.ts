export const GPU_TIER = {
  HIGH: 3,
  MEDIUM: 2,
  LOW: 1,
} as const;

export type GpuTier = (typeof GPU_TIER)[keyof typeof GPU_TIER];

export const ADAPTIVE_COUNTS: Record<GpuTier, { particles: number; galaxy: number; trails: number }> = {
  [GPU_TIER.HIGH]: { particles: 5000, galaxy: 10000, trails: 200 },
  [GPU_TIER.MEDIUM]: { particles: 2500, galaxy: 5000, trails: 100 },
  [GPU_TIER.LOW]: { particles: 1000, galaxy: 1500, trails: 40 },
} as const;
