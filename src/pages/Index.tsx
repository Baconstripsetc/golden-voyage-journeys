
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import DiscoverSection from "@/components/DiscoverSection";
import BenefitsSection from "@/components/BenefitsSection";
import UpcomingTripsSection from "@/components/UpcomingTripsSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <DiscoverSection />
      <BenefitsSection />
      <UpcomingTripsSection />
      <Footer />
    </div>
  );
};

export default Index;
