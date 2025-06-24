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
    // This will be linked to actual WhatsApp number later
    window.open('https://wa.me/1234567890', '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Upcoming <span className="text-[#A6CE38]">Departures</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join our next carefully curated adventures. Limited spaces available for an intimate, personalized experience.
          </p>
        </div>

        {/* Trips Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {upcomingTrips.map((trip) => (
            <Card key={trip.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 group bg-white">
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={trip.image} 
                  alt={trip.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 right-4 flex justify-between">
                  <Badge className="bg-[#A6CE38] text-white font-semibold">
                    {trip.spotsLeft} spots left
                  </Badge>
                  <Badge variant="secondary" className="bg-white/90 text-gray-900">
                    {trip.price}
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-2">{trip.title}</h3>
                  <div className="flex items-center text-white/90">
                    <MapPin className="w-4 h-4 mr-1" />
                    {trip.location}
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="font-medium">{trip.dates}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      <span>{trip.totalSpots} max guests</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed">{trip.description}</p>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Trip Highlights:</h4>
                    <div className="flex flex-wrap gap-2">
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
                      className="w-full bg-[#A6CE38] hover:bg-[#95b632] text-white font-semibold py-3"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Talk to One of Our Agents
                    </Button>
                    <Link to={`/package/${trip.id}`}>
                      <Button 
                        variant="outline" 
                        className="w-full border-[#A6CE38] text-[#A6CE38] hover:bg-[#A6CE38] hover:text-white"
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
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Don't See Your Perfect Trip?
            </h3>
            <p className="text-gray-600 mb-6">
              Our travel concierges can create a completely customized itinerary just for you.
            </p>
            <Button 
              onClick={handleWhatsAppContact}
              size="lg" 
              className="bg-[#A6CE38] hover:bg-[#95b632] text-white px-8 py-4 text-lg font-semibold rounded-full"
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
