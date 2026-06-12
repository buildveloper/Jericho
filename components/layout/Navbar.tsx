"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/data/navigation";
import { ActivityIndicator } from "@/components/effects/ActivityIndicator";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 flex justify-center transition-all duration-500"
      role="navigation"
      aria-label="Main navigation"
    >
      <div
        className={`mt-4 mx-4 w-full max-w-3xl transition-all duration-500 rounded-2xl ${
          scrolled
            ? "bg-white/[0.04] backdrop-blur-2xl border border-white/[0.06] shadow-lg shadow-black/20"
            : "bg-transparent border border-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-3">
          <Link href="/" className="flex items-center gap-2 group" aria-label="Jericho Wallet home">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-aurora-blue to-aurora-purple flex items-center justify-center">
              <span className="text-white font-display font-bold text-sm">J</span>
            </div>
            <span className="font-display font-semibold text-sm text-white/80 group-hover:text-white transition-colors hidden sm:inline">
              Jericho
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs font-medium text-white/50 hover:text-white/90 transition-colors tracking-wide uppercase"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <ActivityIndicator />

          <Button
            variant="outline"
            size="sm"
            className="rounded-xl border-white/10 text-white/70 hover:text-white hover:bg-white/5 text-xs font-medium h-8 px-4"
          >
            Launch App
          </Button>
        </div>
      </div>
    </nav>
  );
}
