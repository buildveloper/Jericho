"use client";

import { useEffect, useState } from "react";

/**
 * Thin glowing progress bar that fills as the user scrolls.
 * Positioned at the very top of the page.
 */
export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(1, scrollTop / docHeight) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 inset-x-0 z-[150] h-[1.5px] pointer-events-none"
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    >
      <div
        className="h-full bg-gradient-to-r from-aurora-blue via-aurora-purple to-aurora-teal transition-[width] duration-100 ease-linear"
        style={{ width: `${progress * 100}%` }}
      />
      {/* Glow at leading edge */}
      <div
        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-aurora-blue blur-sm"
        style={{ left: `calc(${progress * 100}% - 6px)` }}
        aria-hidden="true"
      />
    </div>
  );
}
