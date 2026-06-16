"use client";

import { Suspense, lazy } from "react";
import Image from "next/image";
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

      <div
        className="absolute bottom-0 inset-x-0 h-64 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to top, #050505 0%, transparent 100%)" }}
        aria-hidden="true"
      />

      <div className="relative z-20 flex flex-col items-center min-h-screen pt-24 pb-16 md:pt-28 md:pb-20 px-4">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.15, delayChildren: 0.1 }}
        >
          <motion.h1
            className="text-[clamp(3.5rem,10vw,8rem)] font-display font-bold text-white leading-none mb-4 tracking-tight"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
            }}
          >
            JERICHO
          </motion.h1>

          <motion.p
            className="text-sm sm:text-base md:text-lg lg:text-xl text-white/60 max-w-2xl mx-auto font-light mb-3"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
            }}
          >
            crafted with precision, designed for simplicity
          </motion.p>

          <motion.p
            className="text-sm sm:text-base md:text-lg text-white/40 max-w-xl mx-auto font-light leading-relaxed"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
            }}
          >
            Jericho Wallet is Nigeria&rsquo;s gateway to a multi-chain crypto experience.
          </motion.p>
        </motion.div>

        <motion.div
          className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[420px] lg:max-w-[480px] mt-12 md:mt-16"
          initial={{ opacity: 0, y: 60, rotateX: 12 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="relative"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d", perspective: "1200px" }}
          >
            <div
              className="relative rounded-[2.2rem] p-[2px]"
              style={{
                background:
                  "linear-gradient(140deg, rgba(96,165,250,0.55), rgba(167,139,250,0.35) 45%, rgba(45,212,191,0.45))",
                boxShadow:
                  "0 30px 80px -20px rgba(59,130,246,0.45), 0 18px 40px -25px rgba(139,92,246,0.55), 0 0 0 1px rgba(255,255,255,0.05)",
              }}
            >
              <div
                className="relative overflow-hidden rounded-[2.1rem] bg-black/40 backdrop-blur-xl"
                style={{
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.5)",
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0 z-10 rounded-[2.1rem]"
                  style={{
                    background:
                      "linear-gradient(160deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.06) 100%)",
                  }}
                  aria-hidden="true"
                />
                <Image
                  src="/images/jericho-app-homepage.jpeg"
                  alt="Jericho Wallet mobile app homepage"
                  width={1080}
                  height={2400}
                  priority
                  className="relative z-0 block h-auto w-full select-none"
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 340px, (max-width: 1024px) 420px, 480px"
                />
              </div>
            </div>

            <div
              className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] opacity-70 blur-3xl"
              style={{
                background:
                  "radial-gradient(60% 50% at 50% 60%, rgba(59,130,246,0.35), transparent 70%), radial-gradient(40% 40% at 50% 40%, rgba(139,92,246,0.3), transparent 70%)",
              }}
              aria-hidden="true"
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 md:mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
        >
          <MagneticButton
            className="glass-panel px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 rounded-xl"
            ariaLabel="Create your Jericho Wallet"
          >
            Create Wallet
          </MagneticButton>
          <MagneticButton
            className="px-8 py-3.5 text-sm font-medium text-white/60 hover:text-white rounded-xl"
            ariaLabel="Watch a demo of Jericho Wallet"
          >
            Watch Demo
          </MagneticButton>
        </motion.div>

        <motion.div
          className="flex items-center justify-center gap-6 mt-10 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          {["NGN Support", "Multi-Chain", "Bank-Grade Security"].map((signal) => (
            <span
              key={signal}
              className="text-[10px] sm:text-xs text-white/25 font-medium uppercase tracking-widest flex items-center gap-1.5"
            >
              <span className="w-1 h-1 rounded-full bg-aurora-blue/50 inline-block" />
              {signal}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
