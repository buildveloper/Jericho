# Tech Stack
- Use Next.js 15 with App Router and TypeScript exclusively. Confidence: 0.85
- Use Tailwind CSS + shadcn/ui for all 2D UI components. Confidence: 0.85
- Use Three.js + @react-three/fiber + @react-three/drei for all 3D scenes and WebGL. Confidence: 0.85
- Use GSAP + Framer Motion + Lenis for animations and smooth scrolling. Confidence: 0.85

# Design System
- Dark mode only with #050505 deep black as the base background color. Confidence: 0.90
- Use glassmorphism panels with soft blur, subtle borders, and reflections for UI surfaces. Confidence: 0.85
- Use Inter as the primary font and Satoshi (or similar modern display font) for headings. Confidence: 0.85
- Use dynamic aurora gradients in blues, purples, and teals for backgrounds and accents. Confidence: 0.80
- Avoid typical crypto/web3 aesthetics (no neon overload, no meme coin styling). Confidence: 0.85

# Performance
- Target 60fps on mid-range devices; use mobile-first, fully responsive approach. Confidence: 0.80
- Use React Suspense + lazy loading for heavy 3D scenes and components. Confidence: 0.80
- Use InstancedMesh for particle systems; optimize geometries and use LOD where needed. Confidence: 0.80

# Code Quality
- Deliver production-ready, clean, well-commented code. Confidence: 0.75
- Structure project with clear folders (components, scenes, shaders, etc.). Confidence: 0.75
- Ensure high accessibility with ARIA labels and prefers-reduced-motion support. Confidence: 0.80

# Framer Motion + R3F
- Use useMotionValueEvent to bridge Framer Motion scroll progress into React state before passing to R3F Canvas; MotionValue cannot be consumed directly in R3F. Confidence: 0.70
