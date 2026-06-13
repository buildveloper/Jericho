"use client";

import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { SectionCanvas } from "@/components/three/shared/SectionCanvas";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ErrorBoundary } from "@/components/ui/error-boundary";

const HeroScene = lazy(() =>
  import("@/components/three/Hero/HeroScene").then((mod) => ({
    default: mod.HeroScene,
  }))
);

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ErrorBoundary>
          <SectionCanvas cameraPosition={[0, -0.3, 6]} cameraFov={50} sectionId="hero">
            <Suspense fallback={null}>
              <HeroScene />
            </Suspense>
          </SectionCanvas>
        </ErrorBoundary>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-64 z-10 pointer-events-none" style={{ background: "linear-gradient(to top, #050505 0%, transparent 100%)" }} aria-hidden="true" />

      <div className="relative z-20 flex flex-col items-center justify-end min-h-screen pb-20 md:pb-32 px-4">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.15, delayChildren: 2.0 }}
        >
          <motion.h1
            className="text-[clamp(3.5rem,10vw,8rem)] font-display font-bold text-white leading-none mb-4 tracking-tight"
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
          >
            JERICHO
          </motion.h1>

          <motion.p
            className="text-sm sm:text-base md:text-lg lg:text-xl text-white/60 max-w-2xl mx-auto font-light mb-3"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
          >
            crafted with precision, designed for simplicity
          </motion.p>

          <motion.p
            className="text-sm sm:text-base md:text-lg text-white/40 max-w-xl mx-auto font-light leading-relaxed"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
          >
            Jericho Wallet is Nigeria's gateway to a multi-chain crypto experience.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
          >
            <MagneticButton className="glass-panel px-8 py-3.5 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-xl" ariaLabel="Create your Jericho Wallet">
              Create Wallet
            </MagneticButton>
            <MagneticButton className="px-8 py-3.5 text-sm font-medium text-white/50 hover:text-white/80 rounded-xl" ariaLabel="Watch a demo of Jericho Wallet">
              Watch Demo
            </MagneticButton>
          </motion.div>

          <motion.div
            className="flex items-center justify-center gap-6 mt-12 flex-wrap"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6 } } }}
          >
            {["NGN Support", "Multi-Chain", "Bank-Grade Security"].map((signal) => (
              <span key={signal} className="text-[10px] sm:text-xs text-white/25 font-medium uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-aurora-blue/50 inline-block" />
                {signal}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
