import type { EcosystemModule } from "@/types";

export const ECOSYSTEM_MODULES: EcosystemModule[] = [
  {
    id: "wallet",
    title: "Wallet",
    description:
      "Secure multi-chain custodial wallet with institutional-grade protection. Manage Bitcoin, Ethereum, Solana, and more from one unified interface.",
    features: [
      "Multi-chain asset management",
      "Biometric authentication",
      "Real-time portfolio tracking",
      "Transaction history & reporting",
    ],
    orbitRadius: 4.5,
    orbitSpeed: 0.3,
    color: "#3B82F6",
  },
  {
    id: "card",
    title: "Card Services",
    description:
      "Physical and virtual cards that bridge crypto and traditional finance. Spend your assets anywhere, with real-time conversion at point of sale.",
    features: [
      "Virtual & physical cards",
      "Instant crypto-to-fiat conversion",
      "Global merchant acceptance",
      "Spending analytics",
    ],
    orbitRadius: 4.5,
    orbitSpeed: 0.4,
    color: "#8B5CF6",
  },
  {
    id: "swaps",
    title: "Cross-Chain Swaps",
    description:
      "Swap assets across blockchains instantly with optimal routing and minimal slippage. Powered by aggregated liquidity across major DEXs.",
    features: [
      "Cross-chain atomic swaps",
      "Optimal route discovery",
      "MEV protection",
      "Real-time price feeds",
    ],
    orbitRadius: 4.5,
    orbitSpeed: 0.35,
    color: "#14B8A6",
  },
  {
    id: "fiat",
    title: "Fiat Conversion",
    description:
      "Seamless on and off-ramps to traditional currencies. Deposit and withdraw in USD, EUR, GBP, and 30+ local currencies with competitive rates.",
    features: [
      "30+ fiat currencies supported",
      "Bank transfer & wire support",
      "Competitive FX rates",
      "Automated KYC/AML compliance",
    ],
    orbitRadius: 4.5,
    orbitSpeed: 0.25,
    color: "#06B6D4",
  },
  {
    id: "merchant",
    title: "Merchant Payments",
    description:
      "Accept crypto payments for your business with instant settlement. Plug-and-play integration with major e-commerce platforms.",
    features: [
      "E-commerce integrations",
      "Instant fiat settlement",
      "Invoicing & billing",
      "Payment link generation",
    ],
    orbitRadius: 4.5,
    orbitSpeed: 0.45,
    color: "#6366F1",
  },
];
