"use client";

import { motion } from "framer-motion";

export function FinalCTASection() {
  return (
    <section className="relative min-h-[80vh] w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(59,130,246,0.1) 0%, rgba(139,92,246,0.05) 40%, transparent 70%)",
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

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto py-32">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-extrabold text-white leading-[0.95] tracking-tight"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            Jericho Wallet&hellip;.
            <br />
            <span className="text-gradient">beyond borders.</span>
          </motion.h2>
        </motion.div>
      </div>
    </section>
  );
}
