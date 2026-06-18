"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="Jericho Wallet home">
            <div className="relative h-9 w-9 sm:h-10 sm:w-10 overflow-hidden rounded-lg">
              <Image
                src="/images/jericho-logo.jpg"
                alt="Jericho Wallet logo"
                width={40}
                height={40}
                priority
                className="h-full w-full object-cover"
              />
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
        </div>
      </div>
    </nav>
  );
}
