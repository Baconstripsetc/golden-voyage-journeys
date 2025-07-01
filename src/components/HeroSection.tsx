import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Brand logos - placeholder URLs that will be replaced with actual logos later
  const brandLogos = [{
    name: "Nike",
    url: "https://logos-world.net/wp-content/uploads/2020/04/Nike-Logo.png"
  }, {
    name: "Apple",
    url: "https://logos-world.net/wp-content/uploads/2020/04/Apple-Logo.png"
  }, {
    name: "Adidas",
    url: "https://logos-world.net/wp-content/uploads/2020/04/Adidas-Logo.png"
  }, {
    name: "Samsung",
    url: "https://logos-world.net/wp-content/uploads/2020/06/Samsung-Logo.png"
  }, {
    name: "Google",
    url: "https://logos-world.net/wp-content/uploads/2020/09/Google-Logo.png"
  }, {
    name: "Microsoft",
    url: "https://logos-world.net/wp-content/uploads/2020/09/Microsoft-Logo.png"
  }, {
    name: "Amazon",
    url: "https://logos-world.net/wp-content/uploads/2020/04/Amazon-Logo.png"
  }, {
    name: "Coca Cola",
    url: "https://logos-world.net/wp-content/uploads/2020/04/Coca-Cola-Logo.png"
  }];

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % brandLogos.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [brandLogos.length]);
  return <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
      {/* Background image overlay */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20" style={{
      backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
    }} />
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8 fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight lg:text-4xl text-center">
            That's <span className="text-[#A6CE38]">75 years</span><br />
            of <span className="text-[#A6CE38]">L'Esprit Libre</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            In 1950, we were the pioneers of sophisticated travel, creating unforgettable experiences 
            for the discerning adventurer. Today, we continue to craft journeys that blend luxury 
            with authentic discovery, designed specifically for those who appreciate the finer things in life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 md:pt-6 px-4">
            <Button size="lg" className="bg-[#A6CE38] hover:bg-[#95b632] text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full w-full sm:w-auto">
              Discover Your Next Adventure
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            
            <Button variant="outline" size="lg" className="border-2 border-[#A6CE38] text-[#A6CE38] hover:bg-[#A6CE38] hover:text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full w-full sm:w-auto">
              View Upcoming Trips
            </Button>
          </div>
          
          <div className="pt-8 md:pt-12">
            <p className="text-xs sm:text-sm text-gray-500 mb-6">Trusted by premium brands worldwide</p>
            
            {/* Brand logos carousel */}
            <div className="relative overflow-hidden max-w-4xl mx-auto">
              <div className="flex transition-transform duration-1000 ease-in-out" style={{
              transform: `translateX(-${currentIndex * (100 / 4)}%)`,
              width: `${brandLogos.length * 25}%`
            }}>
                {brandLogos.map((brand, index) => <div key={index} className="w-1/4 flex-shrink-0 px-2 sm:px-4 flex items-center justify-center" style={{
                width: `${100 / brandLogos.length}%`
              }}>
                    <img src={brand.url} alt={brand.name} className="h-8 sm:h-10 md:h-12 w-auto object-contain opacity-60 hover:opacity-80 transition-opacity duration-300 filter grayscale hover:grayscale-0" onError={e => {
                  // Fallback to text if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const textFallback = document.createElement('div');
                  textFallback.textContent = brand.name;
                  textFallback.className = 'text-sm sm:text-lg font-bold text-gray-600 opacity-60';
                  target.parentNode?.appendChild(textFallback);
                }} />
                  </div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;