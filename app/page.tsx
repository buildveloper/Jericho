import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuroraBackground } from "@/components/effects/AuroraBackground";
import { ParticleCursor } from "@/components/effects/ParticleCursor";
import { ScrollProgressBar } from "@/components/effects/ScrollProgressBar";
import { HeroSection } from "@/components/sections/HeroSection";
import { BuySection } from "@/components/sections/BuySection";
import { SellSection } from "@/components/sections/SellSection";
import { StoreSection } from "@/components/sections/StoreSection";
import { SwapSection } from "@/components/sections/SwapSection";
import { CryptoCardSection } from "@/components/sections/CryptoCardSection";
import { AirtimeSection } from "@/components/sections/AirtimeSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";

export default function Home() {
  return (
    <SmoothScroll>
      <AuroraBackground />
      <ScrollProgressBar />
      <ParticleCursor />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <BuySection />
        <SellSection />
        <StoreSection />
        <SwapSection />
        <CryptoCardSection />
        <AirtimeSection />
        <FinalCTASection />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
