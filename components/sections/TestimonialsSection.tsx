"use client";

import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui/glass-panel";
import { TESTIMONIALS, SECURITY_BADGES } from "@/data/testimonials";

export function TestimonialsSection() {
  return (
    <section className="relative py-24 md:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs text-aurora-blue/60 uppercase tracking-[0.2em] mb-3 font-medium">Trusted by teams</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-gradient mb-4">
            Built for the Most Demanding Teams
          </h2>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-20">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <GlassPanel className="p-5 scanlines" hover>
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed mb-4 italic relative z-10">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-aurora-blue to-aurora-purple flex items-center justify-center text-[10px] font-bold text-white">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white/70">{t.name}</p>
                    <p className="text-[10px] text-white/30">
                      {t.role}, {t.company}
                    </p>
                  </div>
                </div>
              </GlassPanel>
            </motion.div>
          ))}
        </div>

        {/* Security badges */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-xs text-white/30 uppercase tracking-[0.15em] mb-6 font-medium">Enterprise-Grade Security</p>
          <div className="flex flex-wrap justify-center gap-3">
            {SECURITY_BADGES.map((badge) => (
              <span
                key={badge}
                className="text-[10px] sm:text-xs text-white/25 font-medium px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02] flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-aurora-blue/50 inline-block" />
                {badge}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
