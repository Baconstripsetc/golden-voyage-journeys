
import HeroSection from '@/components/HeroSection';
import DestinationSlider from '@/components/DestinationSlider';
import UpcomingTripsSection from '@/components/UpcomingTripsSection';
import DiscoverSection from '@/components/DiscoverSection';
import BenefitsSection from '@/components/BenefitsSection';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TravelMomentsSection from '@/components/TravelMomentsSection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <DestinationSlider />
      <HeroSection />
      <UpcomingTripsSection />
      <TravelMomentsSection />
      <DiscoverSection />
      <BenefitsSection />
      <Footer />
    </div>
  );
};

export default Index;
