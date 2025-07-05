
import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const videos = [
  {
    id: 1,
    title: "Santorini Sunset",
    thumbnail: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    videoUrl: "#", // Placeholder for now
  },
  {
    id: 2,
    title: "Bali Rice Terraces",
    thumbnail: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    videoUrl: "#", // Placeholder for now
  },
  {
    id: 3,
    title: "Machu Picchu Sunrise",
    thumbnail: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    videoUrl: "#", // Placeholder for now
  },
  {
    id: 4,
    title: "Swiss Mountain Views",
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    videoUrl: "#", // Placeholder for now
  },
  {
    id: 5,
    title: "Maldives Paradise",
    thumbnail: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    videoUrl: "#", // Placeholder for now
  },
  {
    id: 6,
    title: "Tokyo Lights",
    thumbnail: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    videoUrl: "#", // Placeholder for now
  },
  {
    id: 7,
    title: "Dubai Skyline",
    thumbnail: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    videoUrl: "#", // Placeholder for now
  }
];

const VideoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollTo = (index: number) => {
    setCurrentIndex(index);
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const itemWidth = container.clientWidth / 2; // Show 2 videos on mobile
      container.scrollTo({
        left: index * itemWidth,
        behavior: 'smooth'
      });
    }
  };

  const scrollLeft = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : videos.length - 1;
    scrollTo(newIndex);
  };

  const scrollRight = () => {
    const newIndex = currentIndex < videos.length - 1 ? currentIndex + 1 : 0;
    scrollTo(newIndex);
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Travel Moments
          </h2>
        </div>

        <div className="relative">
          {/* Navigation buttons for desktop */}
          <button
            onClick={scrollLeft}
            className="hidden md:flex absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          
          <button
            onClick={scrollRight}
            className="hidden md:flex absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>

          {/* Video container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide space-x-4 pb-4"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {videos.map((video, index) => (
              <div
                key={video.id}
                className="flex-shrink-0 w-48 sm:w-56 md:w-64"
                style={{ scrollSnapAlign: 'start' }}
              >
                <div className="relative aspect-[9/16] bg-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-l-4 border-l-gray-700 border-t-2 border-t-transparent border-b-2 border-b-transparent ml-1"></div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
                    <h3 className="text-white text-sm font-medium truncate">
                      {video.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile scroll indicators */}
          <div className="flex justify-center mt-4 space-x-2 md:hidden">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  Math.floor(index / 2) === Math.floor(currentIndex / 2) 
                    ? 'bg-[#A8D03D]' 
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoCarousel;
