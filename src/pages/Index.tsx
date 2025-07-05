
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DestinationSlider from "@/components/DestinationSlider";
import HeroSection from "@/components/HeroSection";
import UpcomingTripsSection from "@/components/UpcomingTripsSection";
import VideoCarousel from "@/components/VideoCarousel";
import DiscoverSection from "@/components/DiscoverSection";
import BenefitsSection from "@/components/BenefitsSection";
import FlightsSection from "@/components/FlightsSection";
import HotelsSection from "@/components/HotelsSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <DestinationSlider />
      <HeroSection />
      <UpcomingTripsSection />
      <VideoCarousel />
      <DiscoverSection />
      <FlightsSection />
      <HotelsSection />
      <BenefitsSection />
      <Footer />
    </div>
  );
};

export default Index;
