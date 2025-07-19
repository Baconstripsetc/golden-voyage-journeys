
import { useState, useEffect } from 'react';

export interface TravelMomentVideo {
  id: string;
  name: string;
  url: string;
  file_size: number;
  created_at: string;
}

export const useTravelMomentVideos = () => {
  const [videos, setVideos] = useState<TravelMomentVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = () => {
    setLoading(true);
    try {
      const savedVideos = localStorage.getItem('travelMomentVideos');
      if (savedVideos) {
        setVideos(JSON.parse(savedVideos));
      }
    } catch (error) {
      console.error('Error loading travel moment videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveVideos = (updatedVideos: TravelMomentVideo[]) => {
    try {
      localStorage.setItem('travelMomentVideos', JSON.stringify(updatedVideos));
      setVideos(updatedVideos);
    } catch (error) {
      console.error('Error saving travel moment videos:', error);
    }
  };

  const addVideo = (video: TravelMomentVideo) => {
    const updatedVideos = [...videos, video];
    saveVideos(updatedVideos);
  };

  const updateVideo = (id: string, updates: Partial<TravelMomentVideo>) => {
    const updatedVideos = videos.map(video => 
      video.id === id ? { ...video, ...updates } : video
    );
    saveVideos(updatedVideos);
  };

  const deleteVideo = (id: string) => {
    const updatedVideos = videos.filter(video => video.id !== id);
    saveVideos(updatedVideos);
  };

  return {
    videos,
    loading,
    addVideo,
    updateVideo,
    deleteVideo,
    refreshVideos: loadVideos
  };
};
