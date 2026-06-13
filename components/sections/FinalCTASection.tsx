"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function FinalCTASection() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Aurora accent gradient background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(59,130,246,0.08) 0%, rgba(139,92,246,0.04) 40%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute top-0 inset-x-0 h-64 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, #050505, transparent)" }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 inset-x-0 h-64 pointer-events-none"
          style={{ background: "linear-gradient(to top, #050505, transparent)" }}
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-gradient mb-6 leading-tight"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Jericho Wallet….
            <br />
            beyond borders.
          </motion.h2>

          <motion.p
            className="text-sm sm:text-base md:text-lg text-white/40 max-w-lg mx-auto font-light leading-relaxed mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Built for Nigeria, ready for the world.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
          >
            <MagneticButton
              className="glass-panel px-10 py-4 text-base font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-xl"
              ariaLabel="Get started for free with Jericho Wallet"
            >
              Get Started for Free
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
