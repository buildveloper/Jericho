"use client";

import { useState, useCallback, useRef } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

/**
 * Button that subtly follows the cursor within its bounds,
 * creating a magnetic hover effect. Springs back on leave.
 */
export function MagneticButton({ children, className = "", onClick, ariaLabel }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.3, y: y * 0.3 });
  }, []);

  const handleLeave = useCallback(() => {
    setPos({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleLeave}
      aria-label={ariaLabel}
      className={`relative transition-transform duration-200 cursor-pointer ${className}`}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
    >
      {/* Glow on hover */}
      <span
        className={`absolute inset-0 rounded-xl bg-gradient-to-r from-aurora-blue/20 via-aurora-purple/20 to-aurora-teal/20 blur-xl transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
}
