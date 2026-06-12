import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuroraBackground } from "@/components/effects/AuroraBackground";
import { ParticleCursor } from "@/components/effects/ParticleCursor";
import { ScrollProgressBar } from "@/components/effects/ScrollProgressBar";
import { HeroSection } from "@/components/sections/HeroSection";
import { BlockchainUniverseSection } from "@/components/sections/BlockchainUniverseSection";
import { CrossChainSection } from "@/components/sections/CrossChainSection";
import { EcosystemSection } from "@/components/sections/EcosystemSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";

export default function Home() {
  return (
    <SmoothScroll>
      <AuroraBackground />
      <ScrollProgressBar />
      <ParticleCursor />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <BlockchainUniverseSection />
        <CrossChainSection />
        <EcosystemSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
