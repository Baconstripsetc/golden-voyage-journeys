
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-[#A6CE38]">LuxureAdventures</h3>
            <p className="text-gray-300">
              Crafting extraordinary travel experiences for the sophisticated adventurer. 
              Where luxury meets discovery.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-[#A6CE38] cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-[#A6CE38] cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/discover" className="block text-gray-300 hover:text-[#A6CE38] transition-colors">
                Discover Trips
              </Link>
              <Link to="/upcoming-trips" className="block text-gray-300 hover:text-[#A6CE38] transition-colors">
                Upcoming Trips
              </Link>
              <Link to="/about" className="block text-gray-300 hover:text-[#A6CE38] transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="block text-gray-300 hover:text-[#A6CE38] transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Trip Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Trip Categories</h4>
            <div className="space-y-2">
              <p className="text-gray-300">Family Trips</p>
              <p className="text-gray-300">For Couples</p>
              <p className="text-gray-300">Adventure</p>
              <p className="text-gray-300">Cultural Heritage</p>
              <p className="text-gray-300">Wellness Retreats</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#A6CE38]" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#A6CE38]" />
                <span className="text-gray-300">info@luxureadventures.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#A6CE38] mt-1" />
                <span className="text-gray-300">
                  123 Luxury Lane<br />
                  Travel District, TD 12345
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 LuxureAdventures. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
