
import { useState, useEffect } from 'react';

const destinations = [
  {
    id: 1,
    name: "Mauritius",
    image: "/lovable-uploads/893aafb9-5ed5-4a49-9c86-1ea0b0878676.png",
    description: "Tropical paradise with pristine beaches"
  },
  {
    id: 2,
    name: "Spain",
    image: "/lovable-uploads/df4ee840-a660-44b5-835d-7e4f5e4af604.png",
    description: "Mediterranean coastline and vibrant culture"
  },
  {
    id: 3,
    name: "Cape Town",
    image: "/lovable-uploads/df66bfc8-5b2d-4dbb-8cf8-14b55c2507f9.png",
    description: "Wildlife encounters and stunning landscapes"
  },
  {
    id: 4,
    name: "Bali",
    image: "/lovable-uploads/089175c6-7887-4826-9e5f-25f4641a93c6.png",
    description: "Ancient temples and spiritual experiences"
  },
  {
    id: 5,
    name: "Dubai",
    image: "/lovable-uploads/bb007a5d-4c61-4420-9f93-b4782a574bbb.png",
    description: "Modern skyline and luxury experiences"
  },
  {
    id: 6,
    name: "Hong Kong",
    image: "/lovable-uploads/4a8ec1c8-a4dd-4c80-92ab-15c40ee15f30.png",
    description: "Harbor views and traditional culture"
  }
];

const DestinationSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % destinations.length);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [isPaused]);

  return (
    <section className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
      <div 
        className="flex transition-transform duration-1000 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {destinations.map((destination) => (
          <div key={destination.id} className="min-w-full h-full relative">
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end">
              <div className="p-4 sm:p-6 md:p-8 text-white">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                  {destination.name}
                </h3>
                <p className="text-sm sm:text-base opacity-90">
                  {destination.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {destinations.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default DestinationSlider;
