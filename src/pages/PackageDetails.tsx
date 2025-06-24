
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PackageDetails = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mock data - in real app this would come from an API based on the ID
  const packageData = {
    1: {
      title: "Machu Picchu Sacred Journey",
      location: "Peru",
      duration: "11 days",
      price: "$4,200",
      rating: 4.9,
      reviewCount: 127,
      description: "Experience the mystical wonder of the ancient Incan citadel with expert archaeologists. This carefully curated journey takes you through Peru's most sacred sites, combining luxury accommodations with authentic cultural experiences.",
      highlights: [
        "Private guided tours of Machu Picchu",
        "Luxury train journey through Sacred Valley",
        "Stay in boutique hotels with Andean views",
        "Traditional Peruvian cooking classes",
        "Expert archaeological guides",
        "Small group maximum 12 guests"
      ],
      images: [
        "https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1583416750470-965b2707b355?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1539650116574-75c0c6d73dd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      ],
      itinerary: [
        { day: "Arrival", activity: "Lima arrival, welcome dinner", accommodation: "Luxury hotel in Miraflores" },
        { day: "Sacred Valley", activity: "Ollantaytambo fortress, local markets", accommodation: "Boutique Sacred Valley lodge" },
        { day: "Machu Picchu", activity: "Sunrise at Machu Picchu, guided tour", accommodation: "Luxury Aguas Calientes hotel" },
        { day: "Cusco", activity: "Colonial city walking tour, cooking class", accommodation: "Historic Cusco hotel" },
        { day: "Departure", activity: "Free morning, departure transfer", accommodation: "Day use hotel room" }
      ],
      inclusions: [
        "All accommodation (luxury/boutique properties)",
        "Daily breakfast and 6 dinners",
        "Private transportation throughout",
        "All entrance fees and permits",
        "Expert English-speaking guides",
        "Machu Picchu train tickets (Vistadome)",
        "Airport transfers"
      ],
      exclusions: [
        "International flights",
        "Travel insurance",
        "Personal expenses",
        "Gratuities",
        "Alcoholic beverages (except welcome dinner)"
      ]
    },
    2: {
      title: "Norwegian Fjords & Northern Lights",
      location: "Norway",
      duration: "9 days",
      price: "$5,800",
      rating: 4.8,
      reviewCount: 89,
      description: "Witness the magical northern lights while cruising through dramatic fjord landscapes. This winter wonderland adventure combines luxury accommodations with breathtaking natural phenomena.",
      highlights: [
        "Northern Lights hunting with expert guides",
        "Luxury fjord cruise with panoramic views",
        "Stay in unique ice hotel accommodation",
        "Scenic railway through Norwegian wilderness",
        "Professional photography workshops",
        "Traditional Sami cultural experiences"
      ],
      images: [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1551524164-6cf2ac073de4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1564737913739-7c6e94dcc4eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      ],
      itinerary: [
        { day: "Arrival", activity: "Oslo arrival, city orientation", accommodation: "Luxury Oslo hotel" },
        { day: "Bergen", activity: "Scenic train to Bergen, fjord views", accommodation: "Historic Bergen hotel" },
        { day: "Geirangerfjord", activity: "Fjord cruise, waterfall viewing", accommodation: "Fjord-side lodge" },
        { day: "Tromsø", activity: "Arctic city tour, Northern Lights hunt", accommodation: "Arctic luxury hotel" },
        { day: "Ice Hotel", activity: "Ice hotel experience, aurora viewing", accommodation: "Ice hotel suite" },
        { day: "Departure", activity: "Morning activities, departure", accommodation: "Airport hotel" }
      ],
      inclusions: [
        "All accommodation including ice hotel",
        "Daily breakfast and 5 dinners",
        "All scenic train journeys",
        "Fjord cruise experiences",
        "Northern Lights tours (2 attempts)",
        "Professional photography guide",
        "Warm winter clothing provided"
      ],
      exclusions: [
        "International flights",
        "Travel insurance",
        "Personal expenses",
        "Optional activities",
        "Alcoholic beverages"
      ]
    },
    3: {
      title: "Morocco Imperial Cities",
      location: "Morocco",
      duration: "10 days",
      price: "$3,400",
      rating: 4.7,
      reviewCount: 156,
      description: "Journey through ancient souks and palaces in Marrakech, Fez, and Casablanca. This cultural immersion combines luxury riad accommodations with authentic Moroccan experiences.",
      highlights: [
        "Stay in authentic luxury riads",
        "Private guided tours of imperial cities",
        "Traditional Moroccan cooking classes",
        "Desert camping under starlit skies",
        "Artisan workshops and craft demonstrations",
        "Hammam spa experiences"
      ],
      images: [
        "https://images.unsplash.com/photo-1539650116574-75c0c6d73dd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1589993768794-d4f0a1d6e762?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1558465350-b691a1cb8c4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      ],
      itinerary: [
        { day: "Arrival", activity: "Marrakech arrival, medina exploration", accommodation: "Luxury riad in medina" },
        { day: "Marrakech", activity: "Palaces tour, cooking class", accommodation: "Luxury riad in medina" },
        { day: "Atlas Mountains", activity: "Day trip to Berber villages", accommodation: "Mountain lodge" },
        { day: "Fez", activity: "Imperial city tour, artisan workshops", accommodation: "Historic Fez riad" },
        { day: "Sahara", activity: "Desert camp, camel trekking", accommodation: "Luxury desert camp" },
        { day: "Casablanca", activity: "Hassan II Mosque, city tour", accommodation: "Luxury Casablanca hotel" }
      ],
      inclusions: [
        "All accommodation in luxury riads/hotels",
        "Daily breakfast and 6 dinners",
        "Private transportation with driver",
        "All guided tours and entrance fees",
        "Cooking classes and workshops",
        "Desert camping experience",
        "Airport transfers"
      ],
      exclusions: [
        "International flights",
        "Travel insurance",
        "Personal shopping",
        "Gratuities",
        "Spa treatments (except included hammam)"
      ]
    }
  };

  const currentPackage = packageData[id as keyof typeof packageData];

  if (!currentPackage) {
    return <div>Package not found</div>;
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % currentPackage.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + currentPackage.images.length) % currentPackage.images.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section with Image Slider */}
        <div className="relative mb-8 rounded-2xl overflow-hidden">
          <div className="relative h-64 md:h-96 lg:h-[500px]">
            <img 
              src={currentPackage.images[currentImageIndex]} 
              alt={currentPackage.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Navigation Arrows */}
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Image Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {currentPackage.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>

            {/* Title Overlay */}
            <div className="absolute bottom-8 left-8 right-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                {currentPackage.title}
              </h1>
              <div className="flex items-center text-white/90 text-lg">
                <MapPin className="w-5 h-5 mr-2" />
                {currentPackage.location}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="ml-1 font-semibold">{currentPackage.rating}</span>
                      <span className="text-gray-500 ml-1">({currentPackage.reviewCount} reviews)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-[#A6CE38]">{currentPackage.price}</div>
                    <div className="text-gray-500">per person</div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">{currentPackage.description}</p>
                
                {/* Quick Info */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 mr-2" />
                    <span>{currentPackage.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-5 h-5 mr-2" />
                    <span>Max 12 guests</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span>Multiple dates</span>
                  </div>
                </div>

                <Button className="w-full md:w-auto bg-[#A6CE38] hover:bg-[#95b632] text-white px-8 py-3">
                  Reserve Your Spot
                </Button>
              </CardContent>
            </Card>

            {/* Highlights */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Trip Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentPackage.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-[#A6CE38] rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Itinerary */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Itinerary Overview</h2>
                <div className="space-y-4">
                  {currentPackage.itinerary.map((item, index) => (
                    <div key={index} className="border-l-2 border-[#A6CE38] pl-4 pb-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                        <h3 className="font-semibold text-lg">{item.day}</h3>
                        <Badge variant="outline" className="text-xs w-fit">{item.accommodation}</Badge>
                      </div>
                      <p className="text-gray-600">{item.activity}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Inclusions */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-green-700">What's Included</h3>
                <ul className="space-y-2">
                  {currentPackage.inclusions.map((item, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Exclusions */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-red-700">Not Included</h3>
                <ul className="space-y-2">
                  {currentPackage.exclusions.map((item, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card className="bg-[#A6CE38] text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Need More Information?</h3>
                <p className="mb-4 text-sm opacity-90">
                  Our travel concierges are ready to help customize this experience for you.
                </p>
                <Button variant="secondary" className="w-full bg-white text-[#A6CE38] hover:bg-gray-100">
                  Contact Us
                </Button>
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
