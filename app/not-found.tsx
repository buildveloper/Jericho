import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-7xl font-display font-bold text-gradient mb-4">404</h1>
      <p className="text-lg text-white/60 mb-8 max-w-md">
        This page seems to have drifted off-chain. Let&apos;s get you back to
        solid ground.
      </p>
      <Link
        href="/"
        className="glass-panel px-6 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 transition-colors rounded-xl"
      >
        Return Home
      </Link>
    </div>
  );
}
