
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Calendar, Clock, ArrowLeft, Check, X } from 'lucide-react';
import { usePackages, TravelPackage } from '@/hooks/usePackages';
import { useDiscoveryPackages, DiscoveryPackage } from '@/hooks/useDiscoveryPackages';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageCarousel from '@/components/ImageCarousel';

const PackageDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { getPackageById, getPackageBySlug } = usePackages();
  const { getPackageById: getDiscoveryPackageById } = useDiscoveryPackages();
  
  const [packageData, setPackageData] = useState<TravelPackage | DiscoveryPackage | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDiscovery, setIsDiscovery] = useState(false);

  useEffect(() => {
    if (id) {
      loadPackage();
    }
  }, [id]);

  const loadPackage = async () => {
    if (!id) return;
    
    setLoading(true);
    try {
      // Try to load as regular package first
      let pkg = await getPackageById(id);
      
      // If not found, try as discovery package
      if (!pkg) {
        pkg = await getDiscoveryPackageById(id);
        if (pkg) {
          setIsDiscovery(true);
        }
      }
      
      // If still not found, try by slug for regular packages
      if (!pkg) {
        pkg = await getPackageBySlug(id);
      }
      
      setPackageData(pkg);
    } catch (error) {
      console.error('Error loading package:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    // WhatsApp API integration
    const phoneNumber = '+1234567890'; // Replace with actual business phone number
    const message = `Hi! I'm interested in booking the "${packageData?.title}" package. Please provide more details about availability and pricing.`;
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A8D03D] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading package details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!packageData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Package Not Found</h1>
            <p className="text-gray-600 mb-8">The package you're looking for doesn't exist or has been removed.</p>
            <Link to="/" className="text-[#A8D03D] hover:text-[#96BD35]">
              <Button className="bg-[#A8D03D] hover:bg-[#96BD35] text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const images = packageData.images || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-4 sm:py-8">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 sm:mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span className="text-sm sm:text-base">Back to Home</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Image Gallery */}
            {images.length > 0 && (
              <ImageCarousel images={images} title={packageData.title} />
            )}

            {/* Package Info */}
            <div className="space-y-4 sm:space-y-6">
              <div>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4">
                  <Badge className="bg-[#A8D03D] hover:bg-[#96BD35] text-white">
                    {isDiscovery ? 'Discovery' : 'Trip'}
                  </Badge>
                  {packageData.location && (
                    <div className="flex items-center gap-1 text-gray-600 text-sm sm:text-base">
                      <MapPin className="w-4 h-4" />
                      <span>{packageData.location}</span>
                    </div>
                  )}
                </div>
                
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  {packageData.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-4 sm:mb-6 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{packageData.rating || 4.5}</span>
                    <span>({packageData.review_count || 0} reviews)</span>
                  </div>
                  
                  {packageData.duration && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{packageData.duration}</span>
                    </div>
                  )}
                  
                  {packageData.travel_period && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{packageData.travel_period}</span>
                    </div>
                  )}
                </div>
                
                {packageData.description && (
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    {packageData.description}
                  </p>
                )}
              </div>

              {/* Highlights */}
              {packageData.highlights && packageData.highlights.length > 0 && (
                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                      {isDiscovery ? 'Discovery' : 'Trip'} Highlights
                    </h3>
                    <ul className="grid grid-cols-1 gap-3">
                      {packageData.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-[#A8D03D] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm sm:text-base">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Itinerary */}
              {packageData.itinerary && packageData.itinerary.length > 0 && (
                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Itinerary</h3>
                    <div className="space-y-4">
                      {packageData.itinerary.map((item, index) => (
                        <div key={index} className="border-l-2 border-[#A8D03D] pl-4">
                          <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{item.day}</h4>
                          <p className="text-gray-700 mb-1 text-sm sm:text-base">{item.activity}</p>
                          {item.accommodation && (
                            <p className="text-sm text-gray-600">📍 {item.accommodation}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* What's Included & Not Included */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {packageData.inclusions && packageData.inclusions.length > 0 && (
                  <Card>
                    <CardContent className="p-4 sm:p-6">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">What's Included</h3>
                      <ul className="space-y-2">
                        {packageData.inclusions.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-[#A8D03D] mt-1 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {packageData.exclusions && packageData.exclusions.length > 0 && (
                  <Card>
                    <CardContent className="p-4 sm:p-6">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">What's Not Included</h3>
                      <ul className="space-y-2">
                        {packageData.exclusions.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <X className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4 lg:top-8">
              <CardContent className="p-4 sm:p-6">
                <div className="text-center mb-4 sm:mb-6">
                  <div className="text-2xl sm:text-3xl font-bold text-[#A8D03D] mb-2">
                    {packageData.price}
                  </div>
                  {packageData.duration && (
                    <div className="text-sm text-gray-600">
                      per person • {packageData.duration}
                    </div>
                  )}
                </div>

                <Button 
                  onClick={handleBookNow}
                  className="w-full bg-[#A8D03D] hover:bg-[#96BD35] text-white text-base sm:text-lg py-4 sm:py-6 mb-4"
                >
                  Book Now
                </Button>

                <div className="text-center">
                  <Link 
                    to="/contact" 
                    className="text-[#A8D03D] hover:text-[#96BD35] text-sm"
                  >
                    Have questions? Contact us
                  </Link>
                </div>

                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#A8D03D]" />
                      <span>Free cancellation up to 24 hours</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#A8D03D]" />
                      <span>Reserve now & pay later</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#A8D03D]" />
                      <span>Mobile ticket accepted</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PackageDetails;
