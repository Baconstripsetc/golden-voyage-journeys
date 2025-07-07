import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Upload, X, Plus, GripVertical, Play, Link, FileVideo } from 'lucide-react';
import { useImageUpload } from '@/hooks/useImageUpload';

interface Video {
  id: string;
  type: 'upload' | 'url';
  url: string;
  title?: string;
  description?: string;
  order: number;
}

interface VideoManagementProps {
  videos: Video[];
  onVideosChange: (videos: Video[]) => void;
  maxVideos?: number;
  title?: string;
  description?: string;
}

const VideoManagement: React.FC<VideoManagementProps> = ({
  videos,
  onVideosChange,
  maxVideos = 6,
  title = "Travel Moments Videos",
  description = "Upload up to 6 videos or add video URLs for the travel moments carousel"
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadImage: uploadVideo, uploading } = useImageUpload();
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlData, setUrlData] = useState({
    url: '',
    title: '',
    description: ''
  });

  const handleFileUpload = async (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const remainingSlots = maxVideos - videos.length;
    const filesToUpload = fileArray.slice(0, remainingSlots);

    for (const file of filesToUpload) {
      if (file.type.startsWith('video/')) {
        const url = await uploadVideo(file, 'packages');
        if (url) {
          const newVideo: Video = {
            id: Date.now().toString() + Math.random(),
            type: 'upload',
            url,
            order: videos.length
          };
          onVideosChange([...videos, newVideo]);
        }
      }
    }
  };

  const handleUrlAdd = () => {
    if (!urlData.url.trim()) return;

    const newVideo: Video = {
      id: Date.now().toString() + Math.random(),
      type: 'url',
      url: urlData.url.trim(),
      title: urlData.title.trim() || undefined,
      description: urlData.description.trim() || undefined,
      order: videos.length
    };

    onVideosChange([...videos, newVideo]);
    setUrlData({ url: '', title: '', description: '' });
    setShowUrlInput(false);
  };

  const removeVideo = (index: number) => {
    const newVideos = videos.filter((_, i) => i !== index);
    // Reorder remaining videos
    const reorderedVideos = newVideos.map((video, i) => ({ ...video, order: i }));
    onVideosChange(reorderedVideos);
  };

  const updateVideoInfo = (index: number, field: 'title' | 'description', value: string) => {
    const newVideos = videos.map((video, i) => 
      i === index ? { ...video, [field]: value || undefined } : video
    );
    onVideosChange(newVideos);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newVideos = [...videos];
    const draggedVideo = newVideos[draggedIndex];
    
    newVideos.splice(draggedIndex, 1);
    newVideos.splice(dropIndex, 0, draggedVideo);
    
    // Update order
    const reorderedVideos = newVideos.map((video, i) => ({ ...video, order: i }));
    onVideosChange(reorderedVideos);
    setDraggedIndex(null);
  };

  const getVideoThumbnail = (video: Video) => {
    if (video.type === 'url') {
      // Generate thumbnail for YouTube/Vimeo
      if (video.url.includes('youtube.com') || video.url.includes('youtu.be')) {
        const videoId = video.url.includes('youtu.be') 
          ? video.url.split('/').pop()?.split('?')[0]
          : video.url.split('v=')[1]?.split('&')[0];
        return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
      }
      return null;
    }
    return video.url; // For uploaded videos, use the URL directly
  };

  const getVideoType = (video: Video) => {
    if (video.type === 'url') {
      if (video.url.includes('youtube.com') || video.url.includes('youtu.be')) return 'YouTube';
      if (video.url.includes('vimeo.com')) return 'Vimeo';
      return 'External URL';
    }
    return 'Uploaded Video';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileVideo className="w-5 h-5" />
          {title}
        </CardTitle>
        <p className="text-sm text-gray-600">{description}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Existing Videos */}
        {videos.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Current Videos ({videos.length}/{maxVideos})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {videos.map((video, index) => (
                <div
                  key={video.id}
                  className="border rounded-lg p-4 bg-gray-50"
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                      <Badge variant="secondary" className="text-xs">
                        {getVideoType(video)}
                      </Badge>
                      <span className="text-xs text-gray-500">#{video.order + 1}</span>
                    </div>
                    <Button
                      onClick={() => removeVideo(index)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 h-6 w-6 p-0"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>

                  {/* Video Thumbnail/Preview */}
                  <div className="aspect-video bg-gray-200 rounded mb-3 relative overflow-hidden">
                    {video.type === 'upload' ? (
                      <video 
                        src={video.url} 
                        className="w-full h-full object-cover"
                        muted
                        preload="metadata"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-300">
                        {getVideoThumbnail(video) ? (
                          <img 
                            src={getVideoThumbnail(video)!} 
                            alt="Video thumbnail"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Play className="w-8 h-8 text-gray-500" />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Video Info Inputs */}
                  <div className="space-y-2">
                    <Input
                      placeholder="Video title (optional)"
                      value={video.title || ''}
                      onChange={(e) => updateVideoInfo(index, 'title', e.target.value)}
                      className="text-sm"
                    />
                    <Textarea
                      placeholder="Video description (optional)"
                      value={video.description || ''}
                      onChange={(e) => updateVideoInfo(index, 'description', e.target.value)}
                      rows={2}
                      className="text-sm resize-none"
                    />
                    {video.type === 'url' && (
                      <p className="text-xs text-gray-500 truncate" title={video.url}>
                        URL: {video.url}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add New Videos */}
        {videos.length < maxVideos && (
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Add New Videos</h3>
            
            {/* File Upload */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 mb-2">
                {uploading ? 'Uploading...' : 'Upload video files'}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                {videos.length}/{maxVideos} videos • Drag & drop or click to browse
              </p>
              <Button 
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading || videos.length >= maxVideos}
                variant="outline"
                className="mb-2"
              >
                <FileVideo className="w-4 h-4 mr-2" />
                Choose Video Files
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="video/*"
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
              />
            </div>

            {/* URL Input */}
            <div className="border border-gray-200 rounded-lg p-4">
              {!showUrlInput ? (
                <Button
                  onClick={() => setShowUrlInput(true)}
                  variant="outline"
                  className="w-full"
                  disabled={videos.length >= maxVideos}
                >
                  <Link className="w-4 h-4 mr-2" />
                  Add Video URL (YouTube, Vimeo, etc.)
                </Button>
              ) : (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="video-url">Video URL *</Label>
                    <Input
                      id="video-url"
                      placeholder="https://www.youtube.com/watch?v=... or https://vimeo.com/..."
                      value={urlData.url}
                      onChange={(e) => setUrlData(prev => ({ ...prev, url: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="video-title">Title (Optional)</Label>
                    <Input
                      id="video-title"
                      placeholder="Video title"
                      value={urlData.title}
                      onChange={(e) => setUrlData(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="video-description">Description (Optional)</Label>
                    <Textarea
                      id="video-description"
                      placeholder="Video description"
                      value={urlData.description}
                      onChange={(e) => setUrlData(prev => ({ ...prev, description: e.target.value }))}
                      rows={2}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleUrlAdd} disabled={!urlData.url.trim()}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Video
                    </Button>
                    <Button 
                      onClick={() => {
                        setShowUrlInput(false);
                        setUrlData({ url: '', title: '', description: '' });
                      }}
                      variant="outline"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {videos.length >= maxVideos && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              Maximum of {maxVideos} videos reached. Remove a video to add a new one.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VideoManagement;
