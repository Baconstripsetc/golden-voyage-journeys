
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Let's Plan Your <span className="text-[#A6CE38]">Perfect Journey</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Our expert travel concierges are ready to craft your personalized adventure. 
              Reach out today and let's start creating memories that will last a lifetime.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8">
              <CardContent className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Send us a Message</h2>
                  <p className="text-gray-600">Tell us about your dream destination and travel preferences</p>
                </div>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <Input placeholder="Enter your first name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <Input placeholder="Enter your last name" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <Input type="email" placeholder="Enter your email address" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <Input type="tel" placeholder="Enter your phone number" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Travel Dates</label>
                    <Input placeholder="e.g., March 2025 or flexible" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tell us about your dream trip</label>
                    <Textarea 
                      placeholder="Describe your ideal destination, activities, accommodation preferences, and any special requirements..."
                      rows={5}
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full bg-[#A6CE38] hover:bg-[#95b632] text-white py-3 text-lg font-semibold"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Ready to embark on your next adventure? Our team of expert travel concierges 
                  is here to help you create the perfect personalized journey.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-6">
                <Card className="p-6">
                  <CardContent className="flex items-start space-x-4">
                    <div className="p-3 bg-[#A6CE38]/10 rounded-lg">
                      <Phone className="w-6 h-6 text-[#A6CE38]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                      <p className="text-sm text-gray-500">Speak directly with a travel concierge</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-6">
                  <CardContent className="flex items-start space-x-4">
                    <div className="p-3 bg-[#A6CE38]/10 rounded-lg">
                      <Mail className="w-6 h-6 text-[#A6CE38]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                      <p className="text-gray-600">info@luxureadventures.com</p>
                      <p className="text-sm text-gray-500">We respond within 2 hours</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-6">
                  <CardContent className="flex items-start space-x-4">
                    <div className="p-3 bg-[#A6CE38]/10 rounded-lg">
                      <MapPin className="w-6 h-6 text-[#A6CE38]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Visit Us</h3>
                      <p className="text-gray-600">123 Luxury Lane<br />Travel District, TD 12345</p>
                      <p className="text-sm text-gray-500">By appointment only</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-6">
                  <CardContent className="flex items-start space-x-4">
                    <div className="p-3 bg-[#A6CE38]/10 rounded-lg">
                      <Clock className="w-6 h-6 text-[#A6CE38]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                      <p className="text-gray-600">
                        Monday - Friday: 9:00 AM - 7:00 PM<br />
                        Saturday: 10:00 AM - 4:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Emergency Contact */}
              <Card className="p-6 bg-[#A6CE38]/5 border-[#A6CE38]/20">
                <CardContent>
                  <h3 className="font-semibold text-gray-900 mb-2">24/7 Travel Support</h3>
                  <p className="text-gray-600 mb-3">
                    Already traveling with us? Our emergency support line is available around the clock.
                  </p>
                  <p className="font-semibold text-[#A6CE38]">Emergency: +1 (555) 999-HELP</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
