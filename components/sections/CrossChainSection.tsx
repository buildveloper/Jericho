"use client";

import { Suspense, lazy, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { SectionCanvas } from "@/components/three/shared/SectionCanvas";

const BridgeScene = lazy(() =>
  import("@/components/three/Bridge/BridgeScene").then((mod) => ({
    default: mod.BridgeScene,
  }))
);

export function CrossChainSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [sceneProgress, setSceneProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.1) setSceneProgress(0);
    else if (latest < 0.6) setSceneProgress((latest - 0.1) / 0.5);
    else setSceneProgress(1);
  });

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <SectionCanvas cameraPosition={[0, 0, 5]} cameraFov={55} sectionId="bridge">
          <Suspense fallback={null}>
            <BridgeScene scrollProgress={sceneProgress} />
          </Suspense>
        </SectionCanvas>
      </div>

      <div className="absolute top-0 inset-x-0 h-48 pointer-events-none z-10" style={{ background: "linear-gradient(to bottom, #050505, transparent)" }} aria-hidden="true" />
      <div className="absolute bottom-0 inset-x-0 h-48 pointer-events-none z-10" style={{ background: "linear-gradient(to top, #050505, transparent)" }} aria-hidden="true" />

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
            Cross-Chain Transfers at Light Speed
          </motion.h2>

          <motion.p
            className="text-sm sm:text-base md:text-lg text-white/40 max-w-xl mx-auto font-light leading-relaxed mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          >
            Move assets between chains in seconds. Our intelligent routing engine finds the optimal path across aggregated liquidity, with zero slippage guarantees and MEV protection built in.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {[
              { label: "Avg. Transfer Time", value: "2.3s" },
              { label: "Chains Supported", value: "6" },
              { label: "Routes Available", value: "30+" },
            ].map((stat) => (
              <div key={stat.label} className="glass-panel-sm px-5 py-3 rounded-xl text-center">
                <p className="text-sm font-semibold text-white/80 font-display">{stat.value}</p>
                <p className="text-[10px] text-white/30 uppercase tracking-wider mt-0.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
