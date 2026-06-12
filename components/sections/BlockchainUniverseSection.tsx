"use client";

import { Suspense, lazy, useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { SectionCanvas } from "@/components/three/shared/SectionCanvas";

const UniverseScene = lazy(() =>
  import("@/components/three/Universe/UniverseScene").then((mod) => ({
    default: mod.UniverseScene,
  }))
);

export function BlockchainUniverseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [sceneProgress, setSceneProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Bridge Framer Motion scroll → React state for R3F consumption
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Map: 0.1→0, 0.5→1, 0.9→1 (climb then plateau)
    if (latest < 0.1) {
      setSceneProgress(0);
    } else if (latest < 0.5) {
      setSceneProgress((latest - 0.1) / 0.4);
    } else {
      setSceneProgress(1);
    }
  });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <SectionCanvas
          cameraPosition={[0, 0, 8]}
          cameraFov={55}
          sectionId="universe"
        >
          <Suspense fallback={null}>
            <UniverseScene scrollProgress={sceneProgress} />
          </Suspense>
        </SectionCanvas>
      </div>

      {/* Gradient fade edges */}
      <div
        className="absolute top-0 inset-x-0 h-48 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, #050505, transparent)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 inset-x-0 h-48 pointer-events-none z-10"
        style={{ background: "linear-gradient(to top, #050505, transparent)" }}
        aria-hidden="true"
      />

      {/* Overlay text */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gradient mb-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            The Blockchain Universe
          </motion.h2>

          <motion.p
            className="text-sm sm:text-base md:text-lg text-white/40 max-w-xl mx-auto font-light leading-relaxed mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          >
            A living, breathing ecosystem connecting every major blockchain.
            Assets and data flow seamlessly between networks, creating a unified
            financial universe.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <ActivityPulse label="24h Volume" value="$12.4M" />
            <ActivityPulse label="Active Chains" value="6" />
            <ActivityPulse label="Transactions" value="847K" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ActivityPulse({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-panel-sm px-5 py-3 rounded-xl flex items-center gap-3">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-aurora-blue opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-aurora-blue" />
      </span>
      <div className="text-left">
        <p className="text-[10px] text-white/30 uppercase tracking-wider">{label}</p>
        <p className="text-sm font-semibold text-white/80 font-display">{value}</p>
      </div>
    </div>
  );
}
