import { cn } from "@/lib/utils";

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassPanel({ children, className, hover = false }: GlassPanelProps) {
  return (
    <div
      className={cn(
        "bg-white/[0.03] backdrop-blur-2xl border border-white/[0.06] rounded-2xl",
        hover && "hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-300",
        className
      )}
    >
      {children}
    </div>
  );
}
