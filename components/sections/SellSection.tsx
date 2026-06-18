"use client";

import { motion } from "framer-motion";

export function SellSection() {
  return (
    <section
      id="sell"
      className="relative min-h-screen w-full overflow-hidden flex items-center"
    >
      <div
        className="absolute inset-0 z-0 opacity-70"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(50% 50% at 30% 30%, rgba(167,139,250,0.18), transparent 70%), radial-gradient(60% 50% at 75% 75%, rgba(20,184,166,0.12), transparent 70%)",
        }}
      />
      <div className="absolute top-0 inset-x-0 h-32 pointer-events-none z-10" style={{ background: "linear-gradient(to bottom, #050505, transparent)" }} aria-hidden="true" />
      <div className="absolute bottom-0 inset-x-0 h-32 pointer-events-none z-10" style={{ background: "linear-gradient(to top, #050505, transparent)" }} aria-hidden="true" />

      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
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
                  "linear-gradient(160deg, rgba(167,139,250,0.2), rgba(59,130,246,0.12) 50%, rgba(45,212,191,0.18))",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow:
                  "0 30px 60px -20px rgba(139,92,246,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              <div className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/40 mb-3">Sell</div>
              <div className="text-2xl sm:text-3xl font-display font-bold text-white mb-6">Cash Out Instantly</div>

              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] mb-4">
                <div className="text-[10px] text-white/40 uppercase tracking-wider mb-2">You sell</div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-display font-bold text-white">0.015</span>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.08]">
                    <span className="w-5 h-5 rounded-full bg-[#627EEA] inline-block" />
                    <span className="text-sm text-white font-medium">ETH</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center -my-2 relative z-10">
                <div className="w-9 h-9 rounded-full bg-white/[0.1] border border-white/[0.15] flex items-center justify-center text-white">↓</div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] mt-4">
                <div className="text-[10px] text-white/40 uppercase tracking-wider mb-2">You receive</div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-display font-bold text-gradient">₦36,720</span>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.08]">
                    <span className="w-5 h-5 rounded-full bg-[#00A040] inline-block" />
                    <span className="text-sm text-white font-medium">NGN</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/[0.06] grid grid-cols-2 gap-3 text-[11px]">
                <div>
                  <div className="text-white/40">Withdraw to</div>
                  <div className="text-white mt-0.5 font-medium">GTBank •• 4829</div>
                </div>
                <div>
                  <div className="text-white/40">Settlement</div>
                  <div className="text-white mt-0.5 font-medium">Same day</div>
                </div>
              </div>
            </div>
            <div
              className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl blur-3xl opacity-70"
              style={{
                background:
                  "radial-gradient(60% 50% at 50% 50%, rgba(139,92,246,0.4), transparent 70%)",
              }}
              aria-hidden="true"
            />
          </div>
        </motion.div>

        <motion.div
          className="order-2 max-w-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block text-[10px] sm:text-xs uppercase tracking-[0.3em] text-aurora-purple/80 font-semibold mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            02 — Cash Out
          </motion.span>

          <motion.h2
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold leading-[0.95] tracking-tight mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <span className="text-gradient">SELL</span>
          </motion.h2>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-white font-light leading-relaxed max-w-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Convert your digital assets into spendable value whenever you choose. Fast, reliable, and designed for everyday life, Jericho makes it effortless to move from crypto to cash without disrupting your momentum.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
