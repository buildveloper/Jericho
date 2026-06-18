"use client";

import { Suspense, lazy, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { SectionCanvas } from "@/components/three/shared/SectionCanvas";
import { ErrorBoundary } from "@/components/ui/error-boundary";

const StoreScene = lazy(() =>
  import("@/components/three/Store/StoreScene").then((mod) => ({
    default: mod.StoreScene,
  }))
);

export function StoreSection() {
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
          <SectionCanvas cameraPosition={[0, 0.5, 8]} cameraFov={55} sectionId="store">
            <Suspense fallback={null}>
              <StoreScene scrollProgress={sceneProgress} />
            </Suspense>
          </SectionCanvas>
        </ErrorBoundary>
      </div>

      <div className="absolute top-0 inset-x-0 h-48 pointer-events-none z-10" style={{ background: "linear-gradient(to bottom, #050505, transparent)" }} aria-hidden="true" />
      <div className="absolute bottom-0 inset-x-0 h-48 pointer-events-none z-10" style={{ background: "linear-gradient(to top, #050505, transparent)" }} aria-hidden="true" />

      <div className="relative z-20 flex items-center min-h-screen px-4 py-24">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            className="order-2 lg:order-1 max-w-2xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              className="inline-block text-[10px] sm:text-xs uppercase tracking-[0.3em] text-aurora-blue/70 font-medium mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              01 — Multi-Chain
            </motion.span>

            <motion.h2
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold text-white leading-[0.95] tracking-tight mb-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              STORE
            </motion.h2>

            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-white font-light leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Store your assets effortlessly. Jericho Wallet empowers you to hold, manage, and grow your wealth across multiple chains&mdash;Ethereum, BNB, Polygon, and more&mdash;so you never miss out.
            </motion.p>
          </motion.div>

          <motion.div
            className="order-1 lg:order-2 relative w-full flex justify-center"
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
                    "linear-gradient(160deg, rgba(96,165,250,0.18), rgba(167,139,250,0.12) 50%, rgba(45,212,191,0.18))",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow:
                    "0 30px 60px -20px rgba(59,130,246,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
              >
                <div className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/40 mb-3">Receive</div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-white mb-1">Multi-Chain</div>
                <div className="text-sm text-white/50 mb-6">Select a network to receive assets</div>

                <div className="space-y-2">
                  {[
                    { name: "Ethereum", symbol: "ETH", color: "#627EEA" },
                    { name: "BNB Chain", symbol: "BNB", color: "#F0B90B" },
                    { name: "Polygon", symbol: "MATIC", color: "#8247E5" },
                    { name: "Solana", symbol: "SOL", color: "#14F195" },
                  ].map((chain) => (
                    <div
                      key={chain.symbol}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                    >
                      <span
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-black"
                        style={{ background: chain.color }}
                      >
                        {chain.symbol.slice(0, 3)}
                      </span>
                      <div className="flex-1">
                        <div className="text-sm text-white font-medium">{chain.name}</div>
                        <div className="text-[10px] text-white/40 uppercase tracking-wider">{chain.symbol}</div>
                      </div>
                      <span className="text-aurora-blue/70 text-xs font-medium">Receive →</span>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl blur-3xl opacity-60"
                style={{
                  background:
                    "radial-gradient(60% 50% at 50% 50%, rgba(59,130,246,0.35), transparent 70%)",
                }}
                aria-hidden="true"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
