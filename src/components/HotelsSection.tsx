
import { Button } from "@/components/ui/button";
import { Building2, Star, MapPin, Wifi } from 'lucide-react';
import { Link } from 'react-router-dom';

const HotelsSection = () => {
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-[#A8D03D] bg-opacity-10 p-4 rounded-full">
              <Building2 className="w-8 h-8 text-[#A8D03D]" />
            </div>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Discounted Hotel Services
          </h2>
          
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Stay in comfort with our exclusive hotel deals. From luxury resorts to boutique hotels, find your perfect accommodation at unbeatable prices.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="flex flex-col items-center text-center">
              <Star className="w-6 h-6 text-[#A8D03D] mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Premium Hotels</h3>
              <p className="text-sm text-gray-600">Hand-picked luxury accommodations</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <MapPin className="w-6 h-6 text-[#A8D03D] mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Prime Locations</h3>
              <p className="text-sm text-gray-600">Strategic locations near attractions</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Wifi className="w-6 h-6 text-[#A8D03D] mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Full Amenities</h3>
              <p className="text-sm text-gray-600">Complete facilities and services</p>
            </div>
          </div>

          <Link to="/hotels">
            <Button 
              size="lg" 
              className="bg-[#A8D03D] hover:bg-[#96BD35] text-white px-8 py-4 text-lg font-semibold rounded-full"
            >
              Find Discounted Hotels
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HotelsSection;
