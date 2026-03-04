import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { HeroDemo } from "@/components/hero-demo";
import { FeaturedModels } from "@/components/featured-models";
import { ToolsSection } from "@/components/tools-section";
import { FeaturesSection } from "@/components/features-section";
import { ForCreators } from "@/components/for-creators";
import { Testimonials } from "@/components/testimonials";
import { CTABanner } from "@/components/cta-banner";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <HeroDemo />
      <FeaturedModels />
      <ToolsSection />
      <FeaturesSection />
      <ForCreators />
      <Testimonials />
      <CTABanner />
      <Footer />
    </main>
  );
}
