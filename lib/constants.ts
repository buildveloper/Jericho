export const COLORS = {
  base: "#050505",
  auroraBlue: "#3B82F6",
  auroraPurple: "#8B5CF6",
  auroraTeal: "#14B8A6",
  auroraCyan: "#06B6D4",
  surfaceGlass: "rgba(255, 255, 255, 0.03)",
  surfaceBorder: "rgba(255, 255, 255, 0.06)",
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const ANIMATION = {
  particleCount: 5000,
  particleCountMobile: 1500,
  galaxyStarCount: 10000,
  galaxyStarCountMobile: 3000,
  tokenTrailCount: 200,
  chainOrbitRadius: 3.5,
  mouseParallaxStrength: 0.15,
  moduleOrbitRadius: 4,
} as const;

export const WALLET_DIMENSIONS = {
  width: 2,
  height: 3,
  depth: 0.3,
  cornerRadius: 0.2,
} as const;
