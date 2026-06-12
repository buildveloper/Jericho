export function AuroraBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      <div className="absolute inset-0 bg-[#050505]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(59, 130, 246, 0.12), transparent 50%), " +
            "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(139, 92, 246, 0.08), transparent 50%), " +
            "radial-gradient(ellipse 60% 50% at 20% 80%, rgba(20, 184, 166, 0.06), transparent 50%)",
        }}
      />
      <div
        className="absolute inset-0 animate-aurora-pulse"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 30% 50%, rgba(59, 130, 246, 0.08), transparent 60%), " +
            "radial-gradient(ellipse 50% 40% at 70% 40%, rgba(139, 92, 246, 0.06), transparent 60%)",
        }}
      />
    </div>
  );
}
