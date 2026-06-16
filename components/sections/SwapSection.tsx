"use client";

import { Suspense, lazy, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { SectionCanvas } from "@/components/three/shared/SectionCanvas";
import { ErrorBoundary } from "@/components/ui/error-boundary";

const SwapScene = lazy(() =>
  import("@/components/three/Swap/SwapScene").then((mod) => ({
    default: mod.SwapScene,
  }))
);

export function SwapSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [sceneProgress, setSceneProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.1) {
      setSceneProgress(0);
    } else if (latest < 0.5) {
      setSceneProgress((latest - 0.1) / 0.4);
    } else {
      setSceneProgress(1);
    }
  });

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ErrorBoundary>
          <SectionCanvas cameraPosition={[0, 0, 5]} cameraFov={55} sectionId="swap">
            <Suspense fallback={null}>
              <SwapScene scrollProgress={sceneProgress} />
            </Suspense>
          </SectionCanvas>
        </ErrorBoundary>
      </div>

      <div className="absolute top-0 inset-x-0 h-48 pointer-events-none z-10" style={{ background: "linear-gradient(to bottom, #050505, transparent)" }} aria-hidden="true" />
      <div className="absolute bottom-0 inset-x-0 h-48 pointer-events-none z-10" style={{ background: "linear-gradient(to top, #050505, transparent)" }} aria-hidden="true" />

      <div className="relative z-20 flex items-center min-h-screen px-4 py-24">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            className="order-1 relative w-full flex justify-center"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <div className="relative w-full max-w-md">
              <div
                className="relative rounded-2xl p-6 sm:p-8"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(139,92,246,0.18), rgba(59,130,246,0.12) 50%, rgba(45,212,191,0.18))",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow:
                    "0 30px 60px -20px rgba(139,92,246,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
              >
                <div className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/40 mb-3">Swap</div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-white mb-6">Exchange Assets</div>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] text-white/40 uppercase tracking-wider">From</span>
                      <span className="text-[10px] text-white/30">Balance: 1.245</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-display font-bold text-white">1.00</span>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06]">
                        <span className="w-5 h-5 rounded-full bg-[#627EEA] inline-block" />
                        <span className="text-sm text-white font-medium">ETH</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center -my-1 relative z-10">
                    <div className="w-9 h-9 rounded-full bg-white/[0.08] border border-white/[0.1] flex items-center justify-center text-white/70">↓</div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] text-white/40 uppercase tracking-wider">To (estimated)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-display font-bold text-gradient">2,450.32</span>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06]">
                        <span className="w-5 h-5 rounded-full bg-[#14F195] inline-block" />
                        <span className="text-sm text-white font-medium">USDC</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px]">
                  <span className="text-white/40">Rate</span>
                  <span className="text-white/80 font-medium">1 ETH ≈ 2,450.32 USDC</span>
                </div>
              </div>
              <div
                className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl blur-3xl opacity-60"
                style={{
                  background:
                    "radial-gradient(60% 50% at 50% 50%, rgba(139,92,246,0.35), transparent 70%)",
                }}
                aria-hidden="true"
              />
            </div>
          </motion.div>

          <motion.div
            className="order-2 max-w-2xl lg:text-left"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              className="inline-block text-[10px] sm:text-xs uppercase tracking-[0.3em] text-aurora-purple/70 font-medium mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              02 — Swap
            </motion.span>

            <motion.h2
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold text-white leading-[0.95] tracking-tight mb-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              SWAP
            </motion.h2>

            <motion.p
              className="text-base sm:text-lg md:text-xl text-white/50 max-w-xl lg:max-w-xl font-light leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Swap with confidence. Effortlessly exchange your assets in seconds, backed by secure and transparent liquidity. No fuss, no barriers&mdash;just pure freedom.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
