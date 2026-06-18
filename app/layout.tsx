import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const satoshi = localFont({
  src: [
    { path: "../public/fonts/Satoshi-Variable.woff2", style: "normal" },
    { path: "../public/fonts/Satoshi-VariableItalic.woff2", style: "italic" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jericho.sh"),
  title: {
    default: "Jericho Wallet — The Intelligent Wallet for Web3 Finance",
    template: "%s | Jericho Wallet",
  },
  description:
    "Store, swap and protect digital assets across Bitcoin, Ethereum, Solana, Base, Polygon, and BNB Chain. Jericho is the premium custodial wallet for the next generation of finance.",
  keywords: [
    "crypto wallet",
    "web3 wallet",
    "custodial wallet",
    "bitcoin",
    "ethereum",
    "solana",
    "cross-chain swaps",
    "defi",
    "blockchain wallet",
    "jericho wallet",
  ],
  authors: [{ name: "Jericho", url: "https://jericho.sh" }],
  creator: "Jericho",
  publisher: "Jericho",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jericho.sh",
    siteName: "Jericho Wallet",
    title: "Jericho Wallet — The Intelligent Wallet for Web3 Finance",
    description: "Store, swap and protect digital assets across multiple chains.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Jericho Wallet" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jericho Wallet — The Intelligent Wallet for Web3 Finance",
    description: "Store, swap and protect digital assets across multiple chains.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { canonical: "https://jericho.sh" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Jericho Wallet",
  applicationCategory: "FinanceApplication",
  operatingSystem: "iOS, Android, Web",
  description:
    "Premium custodial multi-chain crypto wallet for storing, swapping, and protecting digital assets across Bitcoin, Ethereum, Solana, Base, Polygon, and BNB Chain.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${satoshi.variable} h-full antialiased dark`} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#050505" />
        <meta name="color-scheme" content="dark" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full bg-[#050505] text-foreground font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-aurora-blue focus:text-white focus:rounded-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <div id="main-content">{children}</div>
      </body>
    </html>
  );
}
