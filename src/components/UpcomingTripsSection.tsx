
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Calendar } from 'lucide-react';
import { usePackages, TravelPackage } from '@/hooks/usePackages';
import { Link } from 'react-router-dom';

const UpcomingTripsSection = () => {
  const { packages, loading } = usePackages();
  const [displayPackages, setDisplayPackages] = useState<TravelPackage[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filterTags = [
    'All',
    'Senior Deals',
    'Couple Retreat',
    'Family Specials',
    'Something New',
    'Adults Only Retreat'
  ];

  useEffect(() => {
    // Filter and limit packages based on active filter
    let filteredPackages = packages.filter(pkg => pkg.status === 'published');
    
    if (activeFilter !== 'All') {
      // For demo purposes, we'll randomly assign tags to packages
      // In a real app, you'd have a tags field in your database
      filteredPackages = filteredPackages.filter((pkg, index) => {
        const packageTags = getPackageTags(pkg.id);
        return packageTags.includes(activeFilter);
      });
    }
    
    setDisplayPackages(filteredPackages.slice(0, 6));
  }, [packages, activeFilter]);

  // Helper function to simulate tags for packages (in real app, this would come from database)
  const getPackageTags = (packageId: string) => {
    const tagMap: { [key: string]: string[] } = {};
    const tags = ['Senior Deals', 'Couple Retreat', 'Family Specials', 'Something New', 'Adults Only Retreat'];
    
    // Simple hash-based assignment for consistency
    const hash = packageId.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const numTags = (hash % 3) + 1; // 1-3 tags per package
    const selectedTags = [];
    
    for (let i = 0; i < numTags; i++) {
      selectedTags.push(tags[(hash + i) % tags.length]);
    }
    
    return selectedTags;
  };

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Upcoming Trips
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join our carefully curated group adventures to the world's most spectacular destinations
            </p>
          </div>
          <div className="text-center">Loading travel packages...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Upcoming Trips
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Join our carefully curated group adventures to the world's most spectacular destinations
          </p>
          
          {/* Filter Tags Section */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
            {filterTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-200 whitespace-nowrap ${
                  activeFilter === tag
                    ? 'bg-[#A7CE39] text-white shadow-md transform scale-105'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-[#A7CE39] hover:text-[#A7CE39] hover:shadow-sm'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {displayPackages.length === 0 ? (
          <div className="text-center text-gray-600">
            {activeFilter === 'All' 
              ? "No upcoming trips available at the moment. Check back soon!"
              : `No trips found for "${activeFilter}". Try a different filter.`
            }
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {displayPackages.map((pkg) => (
                <Link key={pkg.id} to={`/package/${pkg.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
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
                              parent.innerHTML = '<div class="flex items-center justify-center h-full text-gray-400"><div class="text-center"><div class="text-4xl mb-2">✈️</div><div>No Image</div></div></div>';
                            }
                          }}
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                          <div className="text-center">
                            <div className="text-4xl mb-2">✈️</div>
                            <div>No Image</div>
                          </div>
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-[#A7CE39] hover:bg-[#95b632] text-white">Trip</Badge>
                      </div>
                      
                      {/* Package Tags */}
                      <div className="absolute top-4 right-4 flex flex-col gap-1">
                        {getPackageTags(pkg.id).slice(0, 2).map((tag) => (
                          <Badge 
                            key={tag}
                            variant="secondary"
                            className="bg-white/90 text-gray-700 text-xs backdrop-blur-sm"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center gap-2 sm:gap-4 mb-2 text-xs sm:text-sm text-gray-600">
                        {pkg.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="truncate">{pkg.location}</span>
                          </div>
                        )}
                        {pkg.travel_period && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="truncate">{pkg.travel_period}</span>
                          </div>
                        )}
                      </div>
                      
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                        {pkg.title}
                      </h3>
                      
                      <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-2">
                        {pkg.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs sm:text-sm font-medium">{pkg.rating || 4.5}</span>
                          <span className="text-xs sm:text-sm text-gray-500">({pkg.review_count || 0})</span>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-base sm:text-lg font-bold text-[#A7CE39]">{pkg.price}</div>
                          {pkg.duration && (
                            <div className="text-xs sm:text-sm text-gray-500">{pkg.duration}</div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link 
                to="/upcoming-trips" 
                className="inline-block bg-[#A7CE39] hover:bg-[#95b632] text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base"
              >
                View All Trips
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default UpcomingTripsSection;
