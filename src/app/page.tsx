import { Navbar } from "@/components/navbar";
import { HeroSlideshow } from "@/components/hero-slideshow";
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
      <Navbar overlay />
      <HeroSlideshow />
      <FeaturedModels />
      <ToolsSection />
      <ForCreators />
      <FeaturesSection />
      <Testimonials />
      <CTABanner />
      <Footer />
    </main>
  );
}
