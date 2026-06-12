"use client";

import { Suspense, lazy, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionCanvas } from "@/components/three/shared/SectionCanvas";
import { ECOSYSTEM_MODULES } from "@/data/modules";
import { GlassPanel } from "@/components/ui/glass-panel";

const EcosystemScene = lazy(() =>
  import("@/components/three/Ecosystem/EcosystemScene").then((mod) => ({
    default: mod.EcosystemScene,
  }))
);

export function EcosystemSection() {
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const selectedModule = ECOSYSTEM_MODULES.find((m) => m.id === selectedModuleId);

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <SectionCanvas cameraPosition={[0, 1.5, 9]} cameraFov={45} sectionId="ecosystem">
          <Suspense fallback={null}>
            <EcosystemScene
              selectedModule={selectedModuleId}
              onSelectModule={setSelectedModuleId}
            />
          </Suspense>
        </SectionCanvas>
      </div>

      <div className="absolute top-0 inset-x-0 h-48 pointer-events-none z-10" style={{ background: "linear-gradient(to bottom, #050505, transparent)" }} aria-hidden="true" />
      <div className="absolute bottom-0 inset-x-0 h-48 pointer-events-none z-10" style={{ background: "linear-gradient(to top, #050505, transparent)" }} aria-hidden="true" />

      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs text-aurora-blue/60 uppercase tracking-[0.2em] mb-3 font-medium">Ecosystem</p>
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gradient mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            The Jericho Ecosystem
          </motion.h2>
          <motion.p
            className="text-sm sm:text-base text-white/40 max-w-lg mx-auto font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            Click on any module to explore its capabilities.
          </motion.p>
        </motion.div>

        {/* Detail panel — slides in when a module is selected */}
        <div className="relative w-full max-w-2xl min-h-[240px]">
          <AnimatePresence mode="wait">
            {selectedModule ? (
              <motion.div
                key={selectedModule.id}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <GlassPanel className="p-6 md:p-8" hover>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedModule.color }} />
                    <h3 className="text-lg font-display font-semibold text-white/90">
                      {selectedModule.title}
                    </h3>
                    <button
                      onClick={() => setSelectedModuleId(null)}
                      className="ml-auto text-white/30 hover:text-white/60 transition-colors text-xs"
                      aria-label="Close detail panel"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed mb-5">
                    {selectedModule.description}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedModule.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-xs text-white/40">
                        <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: selectedModule.color }} />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </GlassPanel>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center min-h-[160px]"
              >
                <span className="text-xs text-white/20 italic">
                  Select a module above to learn more
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
