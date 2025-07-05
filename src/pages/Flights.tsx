
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Plane, Search, Calendar, Users } from 'lucide-react';

const Flights = () => {
  const handleWhatsAppContact = () => {
    const message = "Hi! I'm interested in your discounted flight services. Can you help me find the best deals?";
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
                <Plane className="w-12 h-12 text-[#A8D03D]" />
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Exclusive Flight Deals
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Access our network of airline partners and get exclusive discounts on flights worldwide. 
              From business class upgrades to last-minute deals, we've got you covered.
            </p>

            <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <Search className="w-8 h-8 text-[#A8D03D] mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Search & Compare</h3>
                  <p className="text-gray-600 text-sm">We search hundreds of airlines to find you the best deals</p>
                </div>
                <div className="text-center">
                  <Calendar className="w-8 h-8 text-[#A8D03D] mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Flexible Dates</h3>
                  <p className="text-gray-600 text-sm">Find the cheapest days to fly with our flexible date options</p>
                </div>
                <div className="text-center">
                  <Users className="w-8 h-8 text-[#A8D03D] mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Group Discounts</h3>
                  <p className="text-gray-600 text-sm">Special rates for groups and families traveling together</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-0 sm:flex sm:gap-4 sm:justify-center">
              <Button 
                size="lg" 
                className="bg-[#A8D03D] hover:bg-[#96BD35] text-white px-8 py-4 text-lg font-semibold rounded-full w-full sm:w-auto"
                onClick={handleWhatsAppContact}
              >
                Get Flight Quotes
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-[#A8D03D] text-[#A8D03D] hover:bg-[#A8D03D] hover:text-white px-8 py-4 text-lg font-semibold rounded-full w-full sm:w-auto"
                onClick={handleWhatsAppContact}
              >
                Speak to Expert
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Flights;
