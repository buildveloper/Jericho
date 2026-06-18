import Link from "next/link";
import Image from "next/image";
import { FOOTER_LINKS } from "@/data/navigation";

export function Footer() {
  return (
    <footer
      className="relative border-t border-white/[0.06] bg-[#050505]"
      role="contentinfo"
    >
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className="relative h-7 w-7 overflow-hidden rounded-md">
            <Image
              src="/images/jericho-logo.jpg"
              alt="Jericho Wallet logo"
              width={28}
              height={28}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-xs text-white/40 font-medium">
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
