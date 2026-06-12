"use client";

import { useState, useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useGPUDetect } from "@/hooks/useGPUDetect";
import { ADAPTIVE_COUNTS, GPU_TIER } from "@/lib/gpu";
import { ConstellationIntro } from "./ConstellationIntro";
import { ParticleField } from "./ParticleField";
import { WalletModel } from "./WalletModel";
import { BlockchainRings } from "./BlockchainRings";
import { MouseParallax } from "./MouseParallax";

enum HeroPhase {
  DARK = 0,
  CONSTELLATION = 1,
  ASSEMBLY = 2,
  COMPLETE = 3,
}

const PHASE_DURATIONS = [0, 1.5, 2.0, 1.5];
const TOTAL_DURATION = PHASE_DURATIONS.reduce((a, b) => a + b, 0);

export function HeroScene() {
  const reducedMotion = useReducedMotion();
  const { gpuTier, isMobile } = useGPUDetect();
  const [phase, setPhase] = useState<HeroPhase>(HeroPhase.DARK);
  const [assemblyProgress, setAssemblyProgress] = useState(0);
  const [constellationVisible, setConstellationVisible] = useState(false);
  const [chainsVisible, setChainsVisible] = useState(false);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (reducedMotion) {
      setPhase(HeroPhase.COMPLETE);
      setAssemblyProgress(1);
      setChainsVisible(true);
      return;
    }

    startTimeRef.current = null;
    let rafId: number;
    const tick = (time: number) => {
      if (!startTimeRef.current) startTimeRef.current = time;
      const elapsed = (time - startTimeRef.current) / 1000;

      if (elapsed < PHASE_DURATIONS[1]) {
        setPhase(HeroPhase.CONSTELLATION);
        setConstellationVisible(true);
        setAssemblyProgress(0);
      } else if (elapsed < PHASE_DURATIONS[1] + PHASE_DURATIONS[2]) {
        setPhase(HeroPhase.ASSEMBLY);
        const t = (elapsed - PHASE_DURATIONS[1]) / PHASE_DURATIONS[2];
        setAssemblyProgress(t);
        setConstellationVisible(1 - t > 0.1);
      } else if (elapsed < TOTAL_DURATION) {
        setPhase(HeroPhase.COMPLETE);
        setAssemblyProgress(1);
        setConstellationVisible(false);
        const t = (elapsed - PHASE_DURATIONS[1] - PHASE_DURATIONS[2]) / PHASE_DURATIONS[3];
        setChainsVisible(t > 0.3);
      } else {
        setPhase(HeroPhase.COMPLETE);
        setAssemblyProgress(1);
        setConstellationVisible(false);
        setChainsVisible(true);
      }

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [reducedMotion]);

  // Adaptive particle counts
  const counts = ADAPTIVE_COUNTS[gpuTier];
  const effectiveCount = isMobile
    ? Math.min(counts.particles, ADAPTIVE_COUNTS[GPU_TIER.LOW].particles)
    : counts.particles;

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 3, 5]} intensity={1.5} color="#3B82F6" decay={2} />
      <pointLight position={[-3, -1, 3]} intensity={0.8} color="#8B5CF6" decay={2} />
      <pointLight position={[0, -2, -2]} intensity={0.5} color="#14B8A6" decay={2} />

      <ConstellationIntro
        visible={constellationVisible}
        nodeCount={isMobile ? 12 : gpuTier <= GPU_TIER.MEDIUM ? 25 : 40}
        reducedMotion={reducedMotion}
      />

      <ParticleField
        assemblyProgress={assemblyProgress}
        reducedMotion={reducedMotion}
        isMobile={isMobile}
        particleCount={effectiveCount}
      />

      {phase >= HeroPhase.ASSEMBLY && (
        <WalletModel assemblyProgress={assemblyProgress} reducedMotion={reducedMotion} />
      )}

      <BlockchainRings
        visible={chainsVisible}
        radius={isMobile ? 2.8 : 3.5}
        reducedMotion={reducedMotion}
      />

      <MouseParallax enabled={!reducedMotion} />
    </>
  );
}
