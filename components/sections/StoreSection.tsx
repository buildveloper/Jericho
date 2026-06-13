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

      <div className="relative z-20 flex items-center min-h-screen px-4">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gradient mb-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              STORE
            </motion.h2>

            <motion.p
              className="text-sm sm:text-base md:text-lg text-white/40 max-w-xl font-light leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            >
              Store your assets effortlessly. Jericho Wallet empowers you to hold, manage, and grow your wealth across multiple chains—Ethereum, BNB, Polygon, and more—so you never miss out. Naira deposits and withdrawals included.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
