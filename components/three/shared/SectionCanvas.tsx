"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface SectionCanvasProps {
  children: React.ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
  cameraFov?: number;
  sectionId?: string;
}

function CanvasFallback() {
  return (
    <div className="absolute inset-0 bg-[#050505] flex items-center justify-center">
      <div className="w-6 h-6 border border-white/10 border-t-aurora-blue rounded-full animate-spin" />
    </div>
  );
}

export function SectionCanvas({
  children,
  className = "",
  cameraPosition = [0, 0, 6],
  cameraFov = 50,
  sectionId,
}: SectionCanvasProps) {
  const reducedMotion = useReducedMotion();
  const { ref, isInView } = useIntersectionObserver({ threshold: 0, rootMargin: "200px" });
  const [shouldRender, setShouldRender] = useState(false);

  // Mount once when visible, never unmount (avoids remount flicker)
  useEffect(() => {
    if (isInView) setShouldRender(true);
  }, [isInView]);

  return (
    <div
      ref={ref}
      className={`relative w-full h-full ${className}`}
      data-section-canvas={sectionId}
    >
      {shouldRender ? (
        <Suspense fallback={<CanvasFallback />}>
          <Canvas
            camera={{ position: cameraPosition, fov: cameraFov }}
            dpr={[1, 1.5]}
            gl={{
              powerPreference: "high-performance",
              antialias: true,
              alpha: false,
            }}
            performance={{ min: 0.5 }}
            frameloop={reducedMotion ? "never" : "always"}
            style={{ position: "absolute", inset: 0 }}
          >
            {children}
          </Canvas>
        </Suspense>
      ) : (
        <div className="absolute inset-0 bg-[#050505]" />
      )}
    </div>
  );
}
