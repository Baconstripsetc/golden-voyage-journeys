import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Globe, Heart, Shield } from "lucide-react";
const About = () => {
  const values = [{
    icon: <Globe className="w-8 h-8 text-[#A6CE38]" />,
    title: "Global Expertise",
    description: "75 years of crafting exceptional travel experiences across all seven continents"
  }, {
    icon: <Heart className="w-8 h-8 text-[#A6CE38]" />,
    title: "Personal Touch",
    description: "Every journey is personally curated by our expert travel concierges"
  }, {
    icon: <Shield className="w-8 h-8 text-[#A6CE38]" />,
    title: "Trust & Safety",
    description: "Your peace of mind is our priority with 24/7 support and comprehensive travel insurance"
  }, {
    icon: <Award className="w-8 h-8 text-[#A6CE38]" />,
    title: "Excellence",
    description: "Award-winning service recognized by leading travel publications worldwide"
  }];
  return <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 1950 by visionary travel enthusiast Marcel Dubois, LuxureAdventures 
                  began with a simple philosophy: travel should transform you. What started as a 
                  small boutique agency in Paris has grown into a globally recognized curator of 
                  extraordinary experiences.
                </p>
                <p>
                  Our founder believed that the best journeys combine luxury with authenticity, 
                  comfort with discovery. This philosophy continues to guide us today as we craft 
                  unique adventures for travelers who refuse to settle for ordinary.
                </p>
                <p>
                  With 75 years of expertise, we've perfected the art of travel curation, 
                  focusing specifically on sophisticated travelers aged 45+ who value quality, 
                  comfort, and meaningful experiences over rushed itineraries and crowded tours.
                </p>
              </div>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Luxury travel experience" className="rounded-2xl shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">What Sets Us Apart</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our commitment to excellence has earned us the trust of sophisticated travelers worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="space-y-4">
                  <div className="flex justify-center">{value.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Expert Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet the travel concierges who make your dream journeys a reality
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
            name: "Sophie Laurent",
            title: "Senior Travel Concierge",
            image: "https://images.unsplash.com/photo-1494790108755-2616c0763093?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            experience: "25 years experience in luxury travel"
          }, {
            name: "James Mitchell",
            title: "Adventure Specialist",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            experience: "Expert in unique cultural experiences"
          }, {
            name: "Maria Rodriguez",
            title: "Wellness Travel Expert",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            experience: "Specialist in transformative journeys"
          }].map((member, index) => <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-64 overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-[#A6CE38] font-semibold mb-2">{member.title}</p>
                  <p className="text-gray-600 text-sm">{member.experience}</p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#A6CE38]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Begin Your Next Adventure?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let our expert concierges craft a personalized journey that exceeds your expectations
          </p>
          <Button size="lg" className="bg-white text-[#A6CE38] hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full">
            Start Planning Today
          </Button>
        </div>
      </section>

      <Footer />
    </div>;
};
export default About;