import Link from "next/link";
import { FOOTER_LINKS } from "@/data/navigation";

export function Footer() {
  return (
    <footer
      className="relative border-t border-white/[0.06] bg-[#050505]"
      role="contentinfo"
    >
      {/* Trust Signals */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-white/[0.06]">
        <TrustBadge
          label="SOC 2 Compliant"
          description="Audited annually by independent third parties"
        />
        <TrustBadge
          label="$100M+ Secured"
          description="Total value secured across all chains"
        />
        <TrustBadge
          label="Multi-Party Computation"
          description="Private keys never exist in a single place"
        />
        <TrustBadge
          label="24/7 Monitoring"
          description="Real-time threat detection and response"
        />
      </div>

      {/* Links */}
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-aurora-blue to-aurora-purple flex items-center justify-center">
            <span className="text-white font-display font-bold text-[10px]">J</span>
          </div>
          <span className="text-xs text-white/30 font-medium">
            &copy; {new Date().getFullYear()} Jericho. All rights reserved.
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

function TrustBadge({
  label,
  description,
}: {
  label: string;
  description: string;
}) {
  return (
    <div className="glass-panel-sm p-4 rounded-xl text-center">
      <div className="w-8 h-8 mx-auto mb-3 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
        <svg
          className="w-4 h-4 text-aurora-purple"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
          />
        </svg>
      </div>
      <h4 className="text-xs font-semibold text-white/80 mb-1">{label}</h4>
      <p className="text-[10px] text-white/40 leading-relaxed">{description}</p>
    </div>
  );
}
