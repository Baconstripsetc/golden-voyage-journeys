
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin } from 'lucide-react';
import { useDiscoveryPackages, DiscoveryPackage } from '@/hooks/useDiscoveryPackages';
import { Link } from 'react-router-dom';
import TravelMomentsCarousel from '@/components/TravelMomentsCarousel';

const HiddenGems = () => {
  const { packages, loading } = useDiscoveryPackages();
  const [displayPackages, setDisplayPackages] = useState<DiscoveryPackage[]>([]);

  useEffect(() => {
    // Show all published packages
    const publishedPackages = packages.filter(pkg => pkg.status === 'published');
    setDisplayPackages(publishedPackages);
  }, [packages]);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-8">
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                All Hidden Gems
              </h1>
              <p className="text-base text-gray-600 max-w-2xl mx-auto">
                Uncover secret destinations and unique experiences that most travelers never find
              </p>
            </div>

            {loading ? (
              <div className="text-center">Loading discovery packages...</div>
            ) : displayPackages.length === 0 ? (
              <div className="text-center text-gray-600">
                No discovery packages available at the moment. Check back soon!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayPackages.map((pkg) => (
                  <Card key={pkg.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <Link to={`/package/${pkg.id}`}>
                      <div className="aspect-video bg-gray-200 relative">
                        {pkg.images && pkg.images.length > 0 ? (
                          <img 
                            src={pkg.images[0]} 
                            alt={pkg.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = '<div class="flex items-center justify-center h-full text-gray-400"><div class="text-center"><div class="text-4xl mb-2">🏞️</div><div>No Image</div></div></div>';
                              }
                            }}
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-400">
                            <div className="text-center">
                              <div className="text-4xl mb-2">🏞️</div>
                              <div>No Image</div>
                            </div>
                          </div>
                        )}
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-[#A8D03D] hover:bg-[#96BD35] text-white">Discovery</Badge>
                        </div>
                      </div>
                    </Link>
                    
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        {pkg.location && (
                          <>
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{pkg.location}</span>
                          </>
                        )}
                      </div>
                      
                      <Link to={`/package/${pkg.id}`}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-[#A8D03D] transition-colors">
                          {pkg.title}
                        </h3>
                      </Link>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {pkg.description}
                      </p>

                      {/* Travel Moments Video Carousel */}
                      {pkg.videos && pkg.videos.length > 0 && (
                        <div className="mb-4">
                          <TravelMomentsCarousel videos={pkg.videos} title={pkg.title} />
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{pkg.rating || 4.5}</span>
                          <span className="text-sm text-gray-500">({pkg.review_count || 0})</span>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-lg font-bold text-[#A8D03D]">{pkg.price}</div>
                          {pkg.duration && (
                            <div className="text-sm text-gray-500">{pkg.duration}</div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default HiddenGems;
