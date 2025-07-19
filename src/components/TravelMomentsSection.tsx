
import React, { useState, useRef, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { useTravelMomentVideos } from '@/hooks/useTravelMomentVideos';

const TravelMomentsSection: React.FC = () => {
  const { videos, loading } = useTravelMomentVideos();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Don't render if no videos are available
  if (loading || videos.length === 0) {
    return null;
  }

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
    setIsPlaying(false);
  };

  const prevVideo = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
    setIsPlaying(false);
  };

  const goToVideo = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < videos.length - 1) {
      nextVideo();
    }
    if (isRightSwipe && currentIndex > 0) {
      prevVideo();
    }
  };

  const currentVideo = videos[currentIndex];

  return (
    <section className="py-6 sm:py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 text-center">
            Travel Moments
          </h2>
          
          <Card className="overflow-hidden relative group">
            <div 
              className="aspect-[9/16] bg-gray-900 relative max-w-md mx-auto"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <video
                ref={videoRef}
                src={currentVideo.url}
                className="w-full h-full object-cover"
                controls={false}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                playsInline
                preload="metadata"
                autoPlay
                muted
              />
              
              {/* Play/Pause Button */}
              <Button
                onClick={togglePlay}
                className="absolute inset-0 w-full h-full bg-black/20 hover:bg-black/30 border-0 rounded-none flex items-center justify-center"
                variant="ghost"
              >
                {isPlaying ? (
                  <Pause className="w-12 h-12 text-white" />
                ) : (
                  <Play className="w-12 h-12 text-white ml-1" />
                )}
              </Button>

              {/* Navigation arrows */}
              {videos.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevVideo}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-10 h-10 rounded-full"
                    disabled={currentIndex === 0}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextVideo}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-10 h-10 rounded-full"
                    disabled={currentIndex === videos.length - 1}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}

              {/* Video counter */}
              <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded-md text-sm font-medium">
                {currentIndex + 1} / {videos.length}
              </div>

              {/* Video title overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white font-medium text-sm sm:text-base">
                  {currentVideo.name}
                </h3>
              </div>
            </div>

            {/* Pagination dots */}
            {videos.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {videos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToVideo(index)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                      index === currentIndex 
                        ? 'bg-white scale-110' 
                        : 'bg-white/50 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            )}
          </Card>

          {/* Swipe indicator for mobile */}
          <div className="flex justify-center mt-4 sm:hidden">
            <p className="text-xs text-gray-500">Swipe left or right to navigate</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelMomentsSection;
