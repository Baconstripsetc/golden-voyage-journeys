
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";

const DiscoverSection = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = [
    "All",
    "Family Trips", 
    "For Couples", 
    "Adventure", 
    "Cultural Heritage", 
    "Wellness Retreats"
  ];

  const packages = [
    {
      id: 1,
      title: "Serengeti Safari Adventure",
      location: "Tanzania, Africa",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "$4,500",
      duration: "8 days",
      category: ["Adventure", "For Couples"],
      description: "Experience the great migration in luxury tented camps"
    },
    {
      id: 2,
      title: "Tuscany Wine & Culture",
      location: "Italy",
      image: "https://images.unsplash.com/photo-1523906921802-b5d2d899e93b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "$3,200",
      duration: "7 days",
      category: ["Cultural Heritage", "For Couples"],
      description: "Private vineyard tours and Renaissance art immersion"
    },
    {
      id: 3,
      title: "Himalayan Wellness Retreat",
      location: "Nepal",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "$2,800",
      duration: "10 days",
      category: ["Wellness Retreats", "Adventure"],
      description: "Meditation, yoga, and mountain serenity"
    },
    {
      id: 4,
      title: "Patagonia Family Explorer",
      location: "Chile & Argentina",
      image: "https://images.unsplash.com/photo-1518767714831-16f72abaeba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "$5,200",
      duration: "12 days",
      category: ["Family Trips", "Adventure"],
      description: "Multi-generational adventure through pristine wilderness"
    },
    {
      id: 5,
      title: "Japanese Cultural Immersion",
      location: "Japan",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "$4,800",
      duration: "9 days",
      category: ["Cultural Heritage", "For Couples"],
      description: "Tea ceremonies, temple stays, and artisan workshops"
    },
    {
      id: 6,
      title: "Bali Wellness & Family Bonding",
      location: "Indonesia",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "$3,600",
      duration: "8 days",
      category: ["Family Trips", "Wellness Retreats"],
      description: "Spa treatments, cooking classes, and cultural activities"
    }
  ];

  const filteredPackages = activeFilter === "All" 
    ? packages 
    : packages.filter(pkg => pkg.category.includes(activeFilter));

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Discover
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Curated experiences designed for the sophisticated traveler seeking authentic adventures
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-6 py-2 transition-all ${
                activeFilter === filter
                  ? "bg-[#A6CE38] hover:bg-[#95b632] text-white"
                  : "border-[#A6CE38] text-[#A6CE38] hover:bg-[#A6CE38] hover:text-white"
              }`}
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* Package Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <Card key={pkg.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={pkg.image} 
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-[#A6CE38] text-white">
                    {pkg.price}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    {pkg.location}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{pkg.title}</h3>
                  <p className="text-gray-600">{pkg.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {pkg.duration}
                    </div>
                    <Link to={`/package/${pkg.id}`}>
                      <Button 
                        size="sm" 
                        className="bg-[#A6CE38] hover:bg-[#95b632] text-white"
                      >
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Button 
            size="lg" 
            variant="outline"
            className="border-2 border-[#A6CE38] text-[#A6CE38] hover:bg-[#A6CE38] hover:text-white px-8 py-4 text-lg font-semibold rounded-full"
          >
            View All Packages
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DiscoverSection;
