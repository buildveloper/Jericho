"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class GlobalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("[Jericho] Caught error:", error.message);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <html lang="en" className="h-full antialiased dark">
            <head><meta charSet="utf-8" /><title>Jericho Wallet</title></head>
            <body className="min-h-full bg-[#050505] text-white flex items-center justify-center">
              <div className="text-center px-4">
                <h1 className="text-2xl font-display font-bold text-gradient mb-4">Jericho Wallet</h1>
                <p className="text-sm text-white/40 mb-6">Something went wrong. Please refresh.</p>
                <button
                  onClick={() => window.location.reload()}
                  className="glass-panel px-6 py-2.5 text-sm font-medium text-white/70 hover:text-white rounded-xl"
                >
                  Reload Page
                </button>
              </div>
            </body>
          </html>
        )
      );
    }
    return this.props.children;
  }
}
