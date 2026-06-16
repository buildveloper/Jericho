"use client";

import { Suspense, lazy, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { SectionCanvas } from "@/components/three/shared/SectionCanvas";
import { ErrorBoundary } from "@/components/ui/error-boundary";

const CryptoCardScene = lazy(() =>
  import("@/components/three/CryptoCard/CryptoCardScene").then((mod) => ({
    default: mod.CryptoCardScene,
  }))
);

export function CryptoCardSection() {
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
          <SectionCanvas cameraPosition={[0, 0, 4]} cameraFov={45} sectionId="crypto-card">
            <Suspense fallback={null}>
              <CryptoCardScene scrollProgress={sceneProgress} />
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
              className="inline-block text-[10px] sm:text-xs uppercase tracking-[0.3em] text-aurora-teal/70 font-medium mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              03 — Spend
            </motion.span>

            <motion.h2
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold text-white leading-[0.95] tracking-tight mb-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              CRYPTO<br />CARD
            </motion.h2>

            <motion.p
              className="text-base sm:text-lg md:text-xl text-white/50 max-w-xl font-light leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Access a card that connects your digital and everyday life. Jericho lets you spend your crypto as easily as cash&mdash;anywhere, anytime.
            </motion.p>
          </motion.div>

          <motion.div
            className="order-1 lg:order-2 relative w-full flex justify-center"
            initial={{ opacity: 0, y: 50, rotateY: -8 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ perspective: "1200px" }}
          >
            <motion.div
              className="relative w-full max-w-sm aspect-[1.6/1]"
              animate={{ rotateX: [0, -4, 0], y: [0, -8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className="relative w-full h-full rounded-2xl overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #0a0a1a 0%, #1a1a3a 35%, #2d1b6b 65%, #0a0a1a 100%)",
                  boxShadow:
                    "0 30px 60px -15px rgba(59,130,246,0.45), 0 15px 30px -10px rgba(139,92,246,0.55), inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-50"
                  style={{
                    background:
                      "radial-gradient(circle at 20% 20%, rgba(96,165,250,0.4), transparent 50%), radial-gradient(circle at 80% 80%, rgba(167,139,250,0.4), transparent 50%)",
                  }}
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(140deg, rgba(255,255,255,0.18) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.08) 100%)",
                  }}
                  aria-hidden="true"
                />

                <div className="relative h-full p-6 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-white font-display font-bold text-lg tracking-widest">JERICHO</div>
                      <div className="text-[9px] uppercase tracking-[0.3em] text-white/50 mt-0.5">Crypto Card</div>
                    </div>
                    <div className="w-9 h-7 rounded-md bg-gradient-to-br from-yellow-300/80 to-yellow-500/80" />
                  </div>

                  <div>
                    <div className="text-white/90 font-mono text-sm tracking-[0.2em] mb-3">
                      •••• •••• •••• 4829
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="text-[8px] uppercase tracking-[0.3em] text-white/50">Card Holder</div>
                        <div className="text-sm text-white font-medium tracking-wider mt-0.5">A. OKONKWO</div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="text-[8px] uppercase tracking-[0.3em] text-white/50">Valid Thru</div>
                        <div className="text-sm text-white font-medium tracking-wider mt-0.5">12/29</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="pointer-events-none absolute -inset-10 -z-10 rounded-3xl blur-3xl opacity-70"
                style={{
                  background:
                    "radial-gradient(60% 50% at 50% 50%, rgba(20,184,166,0.4), transparent 70%)",
                }}
                aria-hidden="true"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
