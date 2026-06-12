"use client";

import { useState, useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useMediaQuery";
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

const PHASE_DURATIONS = [0, 1.5, 2.0, 1.5]; // seconds per phase
const TOTAL_DURATION = PHASE_DURATIONS.reduce((a, b) => a + b, 0);

/**
 * Orchestrates the entire Hero 3D scene timing:
 * 1. Dark start (0s)
 * 2. Constellation forms (0-1.5s)
 * 3. Particles → wallet assembly (1.5-3.5s)
 * 4. Chains appear, wallet rotates (3.5s+)
 */
export function HeroScene() {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
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

    // Start the intro sequence
    startTimeRef.current = null;

    let rafId: number;
    const tick = (time: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = time;
      }
      const elapsed = (time - startTimeRef.current) / 1000;

      if (elapsed < PHASE_DURATIONS[1]) {
        // Phase 1: Constellation
        setPhase(HeroPhase.CONSTELLATION);
        setConstellationVisible(true);
        setAssemblyProgress(0);
      } else if (elapsed < PHASE_DURATIONS[1] + PHASE_DURATIONS[2]) {
        // Phase 2: Assembly
        setPhase(HeroPhase.ASSEMBLY);
        const t =
          (elapsed - PHASE_DURATIONS[1]) / PHASE_DURATIONS[2];
        setAssemblyProgress(t);
        setConstellationVisible(1 - t > 0.1);
      } else if (elapsed < TOTAL_DURATION) {
        // Phase 3: Chains appear
        setPhase(HeroPhase.COMPLETE);
        setAssemblyProgress(1);
        setConstellationVisible(false);
        const t =
          (elapsed - PHASE_DURATIONS[1] - PHASE_DURATIONS[2]) /
          PHASE_DURATIONS[3];
        setChainsVisible(t > 0.3);
      } else {
        // Fully loaded
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

  return (
    <>
      {/* Ambient & key lights */}
      <ambientLight intensity={0.4} />
      <pointLight
        position={[5, 3, 5]}
        intensity={1.5}
        color="#3B82F6"
        decay={2}
      />
      <pointLight
        position={[-3, -1, 3]}
        intensity={0.8}
        color="#8B5CF6"
        decay={2}
      />
      <pointLight
        position={[0, -2, -2]}
        intensity={0.5}
        color="#14B8A6"
        decay={2}
      />

      {/* Constellation intro — visible during phase 1, fades out */}
      <ConstellationIntro
        visible={constellationVisible}
        nodeCount={isMobile ? 20 : 40}
        reducedMotion={reducedMotion}
      />

      {/* Particle field — scatters → assembles into wallet */}
      <ParticleField
        assemblyProgress={assemblyProgress}
        reducedMotion={reducedMotion}
        isMobile={isMobile}
      />

      {/* Wallet model — phase 2+ */}
      {phase >= HeroPhase.ASSEMBLY && (
        <WalletModel
          assemblyProgress={assemblyProgress}
          reducedMotion={reducedMotion}
        />
      )}

      {/* Blockchain rings — phase 3 */}
      <BlockchainRings
        visible={chainsVisible}
        radius={isMobile ? 2.8 : 3.5}
        reducedMotion={reducedMotion}
      />

      {/* Mouse-driven camera parallax */}
      <MouseParallax enabled={!reducedMotion} />
    </>
  );
}
