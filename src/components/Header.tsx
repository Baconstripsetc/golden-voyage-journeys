
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleWhatsAppContact = () => {
    window.open('https://wa.me/1234567890', '_blank');
  };

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-[#A6CE38] text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="flex items-center space-x-1 md:space-x-2">
              <Phone size={12} className="md:w-3.5 md:h-3.5" />
              <span className="text-xs md:text-sm">+1 (555) 123-4567</span>
            </div>
            <div className="hidden sm:flex items-center space-x-2">
              <Mail size={14} />
              <span>info@trevecom.com</span>
            </div>
          </div>
          <div className="hidden lg:block">
            <span className="text-xs md:text-sm">Curated luxury adventures for the discerning traveler</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/96c4d968-6887-4b3f-9f9b-e392e0f0c84e.png" 
              alt="Trevecom" 
              className="h-8 md:h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link to="/" className="text-gray-700 hover:text-[#A6CE38] transition-colors text-sm lg:text-base">
              Home
            </Link>
            <Link to="/discover" className="text-gray-700 hover:text-[#A6CE38] transition-colors text-sm lg:text-base">
              Discover
            </Link>
            <Link to="/upcoming-trips" className="text-gray-700 hover:text-[#A6CE38] transition-colors text-sm lg:text-base">
              Upcoming Trips
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-[#A6CE38] transition-colors text-sm lg:text-base">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-[#A6CE38] transition-colors text-sm lg:text-base">
              Contact
            </Link>
            <Button 
              onClick={handleWhatsAppContact}
              className="bg-[#A6CE38] hover:bg-[#95b632] text-white px-4 lg:px-6 py-2 text-sm lg:text-base"
              size="sm"
            >
              Book Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 p-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t">
            <div className="flex flex-col space-y-4 pt-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-[#A6CE38] transition-colors py-2 px-2 text-base"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/discover" 
                className="text-gray-700 hover:text-[#A6CE38] transition-colors py-2 px-2 text-base"
                onClick={() => setIsMenuOpen(false)}
              >
                Discover
              </Link>
              <Link 
                to="/upcoming-trips" 
                className="text-gray-700 hover:text-[#A6CE38] transition-colors py-2 px-2 text-base"
                onClick={() => setIsMenuOpen(false)}
              >
                Upcoming Trips
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-[#A6CE38] transition-colors py-2 px-2 text-base"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-700 hover:text-[#A6CE38] transition-colors py-2 px-2 text-base"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Button 
                onClick={() => {
                  handleWhatsAppContact();
                  setIsMenuOpen(false);
                }}
                className="bg-[#A6CE38] hover:bg-[#95b632] text-white w-full py-3 text-base font-medium mt-2"
              >
                Book Now
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
