
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const UpcomingTripsSection = () => {
  const upcomingTrips = [
    {
      id: 1,
      title: "Machu Picchu Sacred Journey",
      location: "Peru",
      image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      dates: "March 15-25, 2025",
      price: "$4,200",
      spotsLeft: 3,
      totalSpots: 12,
      highlights: ["Private guides", "Luxury accommodations", "Small group size"],
      description: "Experience the mystical wonder of the ancient Incan citadel with expert archaeologists"
    },
    {
      id: 2,
      title: "Norwegian Fjords & Northern Lights",
      location: "Norway",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      dates: "February 8-16, 2025",
      price: "$5,800",
      spotsLeft: 7,
      totalSpots: 16,
      highlights: ["Aurora hunting", "Ice hotel stay", "Scenic railways"],
      description: "Witness the magical northern lights while cruising through dramatic fjord landscapes"
    },
    {
      id: 3,
      title: "Morocco Imperial Cities",
      location: "Morocco",
      image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73dd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      dates: "April 12-22, 2025",
      price: "$3,400",
      spotsLeft: 5,
      totalSpots: 14,
      highlights: ["Riad accommodations", "Cooking classes", "Desert camping"],
      description: "Journey through ancient souks and palaces in Marrakech, Fez, and Casablanca"
    }
  ];

  const handleWhatsAppContact = () => {
    window.open('https://wa.me/1234567890', '_blank');
  };

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            Upcoming <span className="text-[#A6CE38]">Departures</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Join our next carefully curated adventures. Limited spaces available for an intimate, personalized experience.
          </p>
        </div>

        {/* Trips Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
          {upcomingTrips.map((trip) => (
            <Card key={trip.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 group bg-white">
              <div className="relative h-56 md:h-72 overflow-hidden">
                <img 
                  src={trip.image} 
                  alt={trip.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-3 md:top-4 left-3 md:left-4 right-3 md:right-4 flex justify-between">
                  <Badge className="bg-[#A6CE38] text-white font-semibold text-xs md:text-sm">
                    {trip.spotsLeft} spots left
                  </Badge>
                  <Badge variant="secondary" className="bg-white/90 text-gray-900 text-xs md:text-sm">
                    {trip.price}
                  </Badge>
                </div>
                <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 right-3 md:right-4">
                  <h3 className="text-lg md:text-2xl font-bold text-white mb-2 leading-tight">{trip.title}</h3>
                  <div className="flex items-center text-white/90 text-sm md:text-base">
                    <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                    {trip.location}
                  </div>
                </div>
              </div>
              
              <CardContent className="p-4 md:p-6">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center text-gray-600 text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="font-medium">{trip.dates}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Users className="w-4 h-4 mr-2" />
                      <span>{trip.totalSpots} max guests</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">{trip.description}</p>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 text-sm md:text-base">Trip Highlights:</h4>
                    <div className="flex flex-wrap gap-1 md:gap-2">
                      {trip.highlights.map((highlight, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4 space-y-3">
                    <Button 
                      onClick={handleWhatsAppContact}
                      className="w-full bg-[#A6CE38] hover:bg-[#95b632] text-white font-semibold py-3 text-sm md:text-base"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Talk to One of Our Agents
                    </Button>
                    <Link to={`/package/${trip.id}`}>
                      <Button 
                        variant="outline" 
                        className="w-full border-[#A6CE38] text-[#A6CE38] hover:bg-[#A6CE38] hover:text-white py-3 text-sm md:text-base"
                      >
                        View Full Itinerary
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Don't See Your Perfect Trip?
            </h3>
            <p className="text-gray-600 mb-6 text-sm md:text-base">
              Our travel concierges can create a completely customized itinerary just for you.
            </p>
            <Button 
              onClick={handleWhatsAppContact}
              size="lg" 
              className="bg-[#A6CE38] hover:bg-[#95b632] text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-full w-full sm:w-auto"
            >
              Plan Custom Trip
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingTripsSection;
