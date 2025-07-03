import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePackages } from '@/hooks/usePackages';

const UpcomingTripsSection = () => {
  const { packages, loading } = usePackages();
  const [activeFilter, setActiveFilter] = useState('All');

  const filterTags = [
    'All',
    'Senior Deals',
    'Couple Retreat', 
    'Family Specials',
    'Something New',
    'Adults Only Retreat'
  ];

  // Simulate package tags for filtering - in real app, this would come from the database
  const getPackageTag = (pkg: any) => {
    const tags = ['Senior Deals', 'Couple Retreat', 'Family Specials', 'Something New', 'Adults Only Retreat'];
    return tags[Math.floor(Math.random() * tags.length)];
  };

  const filteredPackages = packages
    .filter(pkg => pkg.status === 'published')
    .filter(pkg => {
      if (activeFilter === 'All') return true;
      return getPackageTag(pkg) === activeFilter;
    })
    .slice(0, 6);

  if (loading) {
    return (
      <section id="upcoming-trips-section" className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A8D03D] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading packages...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="upcoming-trips-section" className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Upcoming Trips
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-8">
            Discover our carefully curated selection of upcoming adventures, each designed to create unforgettable memories.
          </p>
          
          {/* Filter Tags */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
            {filterTags.map((tag) => (
              <Button
                key={tag}
                variant={activeFilter === tag ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(tag)}
                className={`text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-full transition-all duration-200 ${
                  activeFilter === tag
                    ? 'bg-[#A8D03D] hover:bg-[#96BD35] text-white border-[#A8D03D]'
                    : 'text-gray-600 border-gray-300 hover:border-[#A8D03D] hover:text-[#A8D03D]'
                }`}
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>

        {filteredPackages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No packages available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
            {filteredPackages.map((pkg) => (
              <Link key={pkg.id} to={`/package/${pkg.id}`} className="group">
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full">
                  <div className="aspect-video bg-gray-200 relative overflow-hidden">
                    {pkg.images && pkg.images.length > 0 ? (
                      <img 
                        src={pkg.images[0]} 
                        alt={pkg.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-500 text-sm">No image available</span>
                      </div>
                    )}
                    
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-[#A8D03D] hover:bg-[#96BD35] text-white text-xs">
                        {getPackageTag(pkg)}
                      </Badge>
                    </div>
                    
                    {pkg.images && pkg.images.length > 1 && (
                      <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded-md text-xs">
                        +{pkg.images.length - 1} photos
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-4 sm:p-6 flex-1 flex flex-col">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-base sm:text-lg mb-2 group-hover:text-[#A8D03D] transition-colors line-clamp-2">
                            {pkg.title}
                          </h3>
                          
                          {pkg.location && (
                            <div className="flex items-center gap-1 text-gray-600 mb-2">
                              <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span className="text-sm">{pkg.location}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="text-right ml-2">
                          <div className="text-lg sm:text-xl font-bold text-[#A8D03D]">
                            {pkg.price}
                          </div>
                          {pkg.duration && (
                            <div className="text-xs text-gray-500">
                              {pkg.duration}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{pkg.rating || 4.5}</span>
                          <span>({pkg.review_count || 0})</span>
                        </div>
                        
                        {pkg.travel_period && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span className="text-xs">{pkg.travel_period}</span>
                          </div>
                        )}
                      </div>
                      
                      {pkg.description && (
                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                          {pkg.description}
                        </p>
                      )}
                    </div>
                    
                    <Button 
                      className="w-full bg-[#A8D03D] hover:bg-[#96BD35] text-white text-sm py-2 mt-auto"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center">
          <Link to="/packages">
            <Button 
              variant="outline" 
              size="lg"
              className="border-[#A8D03D] text-[#A8D03D] hover:bg-[#A8D03D] hover:text-white px-6 sm:px-8 py-2 sm:py-3"
            >
              View All Packages
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UpcomingTripsSection;
