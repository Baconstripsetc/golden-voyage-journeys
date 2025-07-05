
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UpcomingTripsSection from "@/components/UpcomingTripsSection";

const UpcomingTrips = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-8">
        <UpcomingTripsSection />
      </div>
      <Footer />
    </div>
  );
};

export default UpcomingTrips;
