
import React, { useState, useRef, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface Video {
  id: string;
  type: 'upload' | 'url';
  url: string;
  title?: string;
  description?: string;
  order: number;
}

interface TravelMomentsCarouselProps {
  videos: Video[];
  title: string;
}

const TravelMomentsCarousel: React.FC<TravelMomentsCarouselProps> = ({ videos, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const sortedVideos = videos.sort((a, b) => a.order - b.order).slice(0, 6);

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % sortedVideos.length);
    setIsPlaying(false);
  };

  const prevVideo = () => {
    setCurrentIndex((prev) => (prev - 1 + sortedVideos.length) % sortedVideos.length);
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

    if (isLeftSwipe && currentIndex < sortedVideos.length - 1) {
      nextVideo();
    }
    if (isRightSwipe && currentIndex > 0) {
      prevVideo();
    }
  };

  const getVideoUrl = (video: Video) => {
    if (video.type === 'url') {
      // Handle YouTube, Vimeo URLs - convert to embed format
      if (video.url.includes('youtube.com') || video.url.includes('youtu.be')) {
        const videoId = video.url.includes('youtu.be') 
          ? video.url.split('/').pop()?.split('?')[0]
          : video.url.split('v=')[1]?.split('&')[0];
        return `https://www.youtube.com/embed/${videoId}`;
      }
      if (video.url.includes('vimeo.com')) {
        const videoId = video.url.split('/').pop();
        return `https://player.vimeo.com/video/${videoId}`;
      }
      return video.url;
    }
    return video.url;
  };

  const isEmbedVideo = (video: Video) => {
    return video.type === 'url' && (
      video.url.includes('youtube.com') || 
      video.url.includes('youtu.be') || 
      video.url.includes('vimeo.com')
    );
  };

  if (!sortedVideos.length) {
    return null;
  }

  const currentVideo = sortedVideos[currentIndex];

  return (
    <section className="py-6 sm:py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 text-center">
            Travel Moments - {title}
          </h2>
          
          <Card className="overflow-hidden relative group">
            <div 
              className="aspect-video bg-gray-900 relative"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              ref={carouselRef}
            >
              {isEmbedVideo(currentVideo) ? (
                <iframe
                  src={getVideoUrl(currentVideo)}
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              ) : (
                <>
                  <video
                    ref={videoRef}
                    src={currentVideo.url}
                    className="w-full h-full object-cover"
                    controls={false}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    playsInline
                    preload="metadata"
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
                </>
              )}

              {/* Navigation arrows */}
              {sortedVideos.length > 1 && (
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
                    disabled={currentIndex === sortedVideos.length - 1}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}

              {/* Video counter */}
              <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded-md text-sm font-medium">
                {currentIndex + 1} / {sortedVideos.length}
              </div>

              {/* Video title overlay */}
              {currentVideo.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-medium text-sm sm:text-base">
                    {currentVideo.title}
                  </h3>
                  {currentVideo.description && (
                    <p className="text-white/80 text-xs sm:text-sm mt-1">
                      {currentVideo.description}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Pagination dots */}
            {sortedVideos.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {sortedVideos.map((_, index) => (
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

export default TravelMomentsCarousel;
