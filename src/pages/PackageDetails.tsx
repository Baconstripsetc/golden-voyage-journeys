
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

const PackageDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { getPackageById, getPackageBySlug } = usePackages();
  const { getPackageById: getDiscoveryPackageById } = useDiscoveryPackages();
  
  const [packageData, setPackageData] = useState<TravelPackage | DiscoveryPackage | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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
    // Redirect to contact page with package info
    const subject = `Inquiry about ${packageData?.title}`;
    const body = `Hi, I'm interested in learning more about the ${packageData?.title} package. Please provide more details about availability and booking.`;
    window.location.href = `/contact?subject=${encodeURIComponent(subject)}&message=${encodeURIComponent(body)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">Loading package details...</div>
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
            <Link to="/" className="text-blue-600 hover:text-blue-700">
              <Button>
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
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            {images.length > 0 && (
              <Card className="overflow-hidden">
                <div className="aspect-video bg-gray-200 relative">
                  <img 
                    src={images[currentImageIndex]} 
                    alt={packageData.title}
                    className="w-full h-full object-cover"
                  />
                  {images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-3 h-3 rounded-full ${
                            index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            )}

            {/* Package Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <Badge className={isDiscovery ? "bg-green-600" : "bg-blue-600"}>
                    {isDiscovery ? 'Discovery' : 'Trip'}
                  </Badge>
                  {packageData.location && (
                    <div className="flex items-center gap-1 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{packageData.location}</span>
                    </div>
                  )}
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {packageData.title}
                </h1>
                
                <div className="flex items-center gap-6 mb-6 text-sm text-gray-600">
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
                  <p className="text-gray-700 leading-relaxed">
                    {packageData.description}
                  </p>
                )}
              </div>

              {/* Highlights */}
              {packageData.highlights && packageData.highlights.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {isDiscovery ? 'Discovery' : 'Trip'} Highlights
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {packageData.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Itinerary */}
              {packageData.itinerary && packageData.itinerary.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Itinerary</h3>
                    <div className="space-y-4">
                      {packageData.itinerary.map((item, index) => (
                        <div key={index} className="border-l-2 border-blue-200 pl-4">
                          <h4 className="font-semibold text-gray-900">{item.day}</h4>
                          <p className="text-gray-700 mb-1">{item.activity}</p>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {packageData.inclusions && packageData.inclusions.length > 0 && (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Included</h3>
                      <ul className="space-y-2">
                        {packageData.inclusions.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {packageData.exclusions && packageData.exclusions.length > 0 && (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Not Included</h3>
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
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
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
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 mb-4"
                >
                  Book Now
                </Button>

                <div className="text-center">
                  <Link 
                    to="/contact" 
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    Have questions? Contact us
                  </Link>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Free cancellation up to 24 hours</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Reserve now & pay later</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
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
