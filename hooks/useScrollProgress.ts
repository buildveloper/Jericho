"use client";

import { useEffect, useRef, useState } from "react";

export function useScrollProgress(
  threshold: [number, number] = [0, 1]
): { progress: number; ref: React.RefObject<HTMLElement | null> } {
  const ref = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const start = windowHeight * threshold[0];
      const end = windowHeight * threshold[1];
      const raw = (rect.top - start) / (end - start);
      setProgress(Math.max(0, Math.min(1, 1 - raw)));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return { progress, ref };
}
