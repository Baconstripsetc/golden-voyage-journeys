
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
      {/* Background image overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
        }}
      />
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8 fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
            That's <span className="text-[#A6CE38]">75 years</span><br />
            of <span className="text-[#A6CE38]">L'Esprit Libre</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            In 1950, we were the pioneers of sophisticated travel, creating unforgettable experiences 
            for the discerning adventurer. Today, we continue to craft journeys that blend luxury 
            with authentic discovery, designed specifically for those who appreciate the finer things in life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button 
              size="lg" 
              className="bg-[#A6CE38] hover:bg-[#95b632] text-white px-8 py-4 text-lg font-semibold rounded-full"
            >
              Discover Your Next Adventure
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-[#A6CE38] text-[#A6CE38] hover:bg-[#A6CE38] hover:text-white px-8 py-4 text-lg font-semibold rounded-full"
            >
              View Upcoming Trips
            </Button>
          </div>
          
          <div className="pt-12">
            <p className="text-sm text-gray-500 mb-4">As seen in premium travel</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-lg font-bold text-gray-600">Travel + Leisure</div>
              <div className="text-lg font-bold text-gray-600">Condé Nast</div>
              <div className="text-lg font-bold text-gray-600">National Geographic</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
