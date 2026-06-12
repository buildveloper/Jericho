export interface ChainData {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface EcosystemModule {
  id: string;
  title: string;
  description: string;
  features: string[];
  orbitRadius: number;
  orbitSpeed: number;
  color: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface TrustSignal {
  label: string;
  description: string;
  icon: string;
}
