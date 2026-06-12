"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Jericho] Global error:", error);
  }, [error]);

  return (
    <html lang="en" className="h-full antialiased dark">
      <head>
        <meta charSet="utf-8" />
        <title>Jericho Wallet</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-full bg-[#050505] text-white flex items-center justify-center font-sans">
        <div className="text-center px-4 max-w-md">
          <div className="w-12 h-12 mx-auto mb-5 rounded-xl bg-gradient-to-br from-aurora-blue to-aurora-purple flex items-center justify-center">
            <span className="text-white font-display font-bold text-xl">J</span>
          </div>
          <h1 className="text-xl font-display font-bold text-gradient mb-3">
            Jericho Wallet
          </h1>
          <p className="text-sm text-white/40 mb-6 leading-relaxed">
            We&apos;re optimizing the experience. Please refresh to continue.
          </p>
          <button
            onClick={reset}
            className="glass-panel px-6 py-2.5 text-sm font-medium text-white/70 hover:text-white transition-colors rounded-xl cursor-pointer"
          >
            Reload Page
          </button>
        </div>
      </body>
    </html>
  );
}
