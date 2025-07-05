
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Building2, Star, MapPin, Wifi, Coffee, Car } from 'lucide-react';

const Hotels = () => {
  const handleWhatsAppContact = () => {
    const message = "Hi! I'm interested in your discounted hotel services. Can you help me find the best accommodation deals?";
    window.open(`https://wa.me/1234567890?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="py-16 bg-gradient-to-br from-slate-100 to-slate-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-[#A8D03D] bg-opacity-10 p-6 rounded-full">
                <Building2 className="w-12 h-12 text-[#A8D03D]" />
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Premium Hotel Deals
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Stay in luxury for less with our exclusive hotel partnerships. From boutique properties to 
              world-class resorts, enjoy premium accommodations at discounted rates.
            </p>

            <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <Star className="w-8 h-8 text-[#A8D03D] mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Luxury Properties</h3>
                  <p className="text-gray-600 text-sm">Hand-selected 4 & 5-star hotels and resorts</p>
                </div>
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-[#A8D03D] mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Prime Locations</h3>
                  <p className="text-gray-600 text-sm">Strategic locations near major attractions</p>
                </div>
                <div className="text-center">
                  <Wifi className="w-8 h-8 text-[#A8D03D] mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Full Amenities</h3>
                  <p className="text-gray-600 text-sm">WiFi, fitness centers, pools, and more</p>
                </div>
                <div className="text-center">
                  <Coffee className="w-8 h-8 text-[#A8D03D] mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Complimentary Breakfast</h3>
                  <p className="text-gray-600 text-sm">Start your day right with included breakfast</p>
                </div>
                <div className="text-center">
                  <Car className="w-8 h-8 text-[#A8D03D] mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Airport Transfers</h3>
                  <p className="text-gray-600 text-sm">Convenient transportation included</p>
                </div>
                <div className="text-center">
                  <Building2 className="w-8 h-8 text-[#A8D03D] mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Flexible Cancellation</h3>
                  <p className="text-gray-600 text-sm">Peace of mind with flexible booking terms</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-0 sm:flex sm:gap-4 sm:justify-center">
              <Button 
                size="lg" 
                className="bg-[#A8D03D] hover:bg-[#96BD35] text-white px-8 py-4 text-lg font-semibold rounded-full w-full sm:w-auto"
                onClick={handleWhatsAppContact}
              >
                Find Hotel Deals
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-[#A8D03D] text-[#A8D03D] hover:bg-[#A8D03D] hover:text-white px-8 py-4 text-lg font-semibold rounded-full w-full sm:w-auto"
                onClick={handleWhatsAppContact}
              >
                Custom Requests
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Hotels;
