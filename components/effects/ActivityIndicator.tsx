"use client";

import { useEffect, useState } from "react";

/**
 * Subtle real-time activity indicator that pulses in the Navbar.
 * Cycles through fake transaction counts to show the wallet is "alive."
 */
export function ActivityIndicator() {
  const [txCount, setTxCount] = useState("1.2M");

  useEffect(() => {
    const tick = () => {
      const base = 1234567;
      const delta = Math.floor(Math.random() * 50);
      const count = base + delta;
      if (count > 1000000) {
        setTxCount(`${(count / 1000000).toFixed(1)}M`);
      } else {
        setTxCount(`${Math.floor(count / 1000)}K`);
      }
    };
    const id = setInterval(tick, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="hidden lg:flex items-center gap-2 text-[10px] text-white/25 font-medium">
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-aurora-teal opacity-60" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-aurora-teal" />
      </span>
      <span className="uppercase tracking-wider">{txCount} tx / 24h</span>
    </div>
  );
}
