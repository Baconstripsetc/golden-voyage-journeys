
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DiscoverSection from "@/components/DiscoverSection";

const HiddenGems = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-8">
        <DiscoverSection />
      </div>
      <Footer />
    </div>
  );
};

export default HiddenGems;
