"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Button } from "@/components/ui/button";

interface ConnectWalletModalProps {
  open: boolean;
  onClose: () => void;
}

const walletOptions = [
  { id: "metamask", label: "MetaMask", icon: "🦊" },
  { id: "walletconnect", label: "WalletConnect", icon: "🔗" },
  { id: "coinbase", label: "Coinbase Wallet", icon: "🔵" },
  { id: "jericho", label: "Jericho Wallet", icon: "𝕁", isPrimary: true },
];

export function ConnectWalletModal({ open, onClose }: ConnectWalletModalProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);

  const handleConnect = (id: string) => {
    setSelected(id);
    setConnecting(true);
    // Fake connection delay
    setTimeout(() => {
      setConnecting(false);
      setSelected(null);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-sm mx-4"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            role="dialog"
            aria-modal="true"
            aria-label="Connect wallet"
          >
            <GlassPanel className="p-6" hover>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-display font-semibold text-white/80">Connect Wallet</h3>
                <button onClick={onClose} className="text-white/30 hover:text-white/60 transition-colors text-xs" aria-label="Close wallet modal">
                  ✕
                </button>
              </div>

              <div className="space-y-2">
                {walletOptions.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => handleConnect(w.id)}
                    disabled={connecting}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 text-left ${
                      selected === w.id
                        ? "border-aurora-blue/30 bg-aurora-blue/5"
                        : w.isPrimary
                        ? "border-aurora-purple/15 bg-aurora-purple/5 hover:border-aurora-purple/30"
                        : "border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.03]"
                    } disabled:opacity-50 disabled:cursor-wait`}
                  >
                    <span className="text-lg w-8 h-8 flex items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06] shrink-0">
                      {w.icon}
                    </span>
                    <span className="text-xs font-medium text-white/70 flex-1">
                      {w.label}
                      {w.isPrimary && (
                        <span className="ml-2 text-[10px] text-aurora-purple font-normal">Recommended</span>
                      )}
                    </span>
                    {connecting && selected === w.id && (
                      <span className="w-4 h-4 border border-white/10 border-t-aurora-blue rounded-full animate-spin" />
                    )}
                  </button>
                ))}
              </div>

              <p className="text-[10px] text-white/20 mt-4 text-center leading-relaxed">
                By connecting, you agree to Jericho&apos;s Terms of Service and Privacy Policy.
              </p>
            </GlassPanel>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
