
import { Button } from "@/components/ui/button";
import { Plane, Star, Clock, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const FlightsSection = () => {
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-[#A8D03D] bg-opacity-10 p-4 rounded-full">
              <Plane className="w-8 h-8 text-[#A8D03D]" />
            </div>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Discounted Flight Services
          </h2>
          
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Get exclusive access to discounted flights worldwide. We negotiate the best deals so you can focus on your journey.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="flex flex-col items-center text-center">
              <Star className="w-6 h-6 text-[#A8D03D] mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Best Prices</h3>
              <p className="text-sm text-gray-600">Exclusive deals and discounted rates</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Clock className="w-6 h-6 text-[#A8D03D] mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Quick Booking</h3>
              <p className="text-sm text-gray-600">Fast and easy reservation process</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Shield className="w-6 h-6 text-[#A8D03D] mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Secure Travel</h3>
              <p className="text-sm text-gray-600">Protected bookings and support</p>
            </div>
          </div>

          <Link to="/flights">
            <Button 
              size="lg" 
              className="bg-[#A8D03D] hover:bg-[#96BD35] text-white px-8 py-4 text-lg font-semibold rounded-full"
            >
              Find Discounted Flights
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FlightsSection;
