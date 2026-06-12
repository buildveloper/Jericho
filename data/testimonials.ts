export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Alex Chen",
    role: "CTO",
    company: "NovaFi",
    quote: "Jericho's cross-chain infrastructure is genuinely years ahead. We moved our entire treasury to Jericho and cut settlement times by 90%.",
    avatar: "",
  },
  {
    name: "Sarah Park",
    role: "Head of Product",
    company: "Vault Protocol",
    quote: "The developer experience with Jericho's APIs is what every Web3 team dreams of. Clean, fast, and reliable.",
    avatar: "",
  },
  {
    name: "Marcus Rivera",
    role: "CEO",
    company: "ChainBridge Capital",
    quote: "We evaluated 12 wallet solutions. Jericho was the only one that met our institutional security standards while still being beautiful to use.",
    avatar: "",
  },
  {
    name: "Priya Sharma",
    role: "Lead Engineer",
    company: "DeFi Labs",
    quote: "MPC key management, SOC 2 compliance, and the most intuitive swap interface I've ever used. Jericho sets the new standard.",
    avatar: "",
  },
];

export const SECURITY_BADGES = [
  "SOC 2 Type II Certified",
  "Multi-Party Computation (MPC)",
  "Hardware Security Module (HSM)",
  "24/7 Threat Monitoring",
  "Bug Bounty Program",
  "Annual Penetration Testing",
];
