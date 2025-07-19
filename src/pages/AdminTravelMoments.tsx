
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Upload, Play, FileVideo, Edit2, Trash2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useToast } from '@/hooks/use-toast';
import { useTravelMomentVideos } from '@/hooks/useTravelMomentVideos';

const AdminTravelMoments = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { uploadImage: uploadVideo, uploading } = useImageUpload();
  const { toast } = useToast();
  const { videos, addVideo, updateVideo, deleteVideo } = useTravelMomentVideos();
  
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const maxVideos = 7;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin');
      return;
    }
  }, [isAuthenticated, navigate]);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const maxSize = 60 * 1024 * 1024; // 60MB in bytes
    const remainingSlots = maxVideos - videos.length;

    if (remainingSlots <= 0) {
      toast({
        title: "Upload Limit Reached",
        description: `Maximum of ${maxVideos} videos allowed`,
        variant: "destructive",
      });
      return;
    }

    const filesToUpload = fileArray.slice(0, remainingSlots);

    for (const file of filesToUpload) {
      if (!file.type.startsWith('video/')) {
        toast({
          title: "Invalid File",
          description: `${file.name} is not a video file`,
          variant: "destructive",
        });
        continue;
      }

      if (file.size > maxSize) {
        toast({
          title: "File Too Large",
          description: `${file.name} exceeds 60MB limit (${Math.round(file.size / 1024 / 1024)}MB)`,
          variant: "destructive",
        });
        continue;
      }

      try {
        setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));
        
        const url = await uploadVideo(file, 'travel-moments');
        
        if (url) {
          const newVideo = {
            id: Date.now().toString() + Math.random(),
            name: file.name.replace(/\.[^/.]+$/, ""),
            url,
            file_size: file.size,
            created_at: new Date().toISOString()
          };

          addVideo(newVideo);

          toast({
            title: "Success",
            description: `${file.name} uploaded successfully`,
          });
        }
      } catch (error) {
        console.error('Upload error:', error);
        toast({
          title: "Upload Failed",
          description: `Failed to upload ${file.name}`,
          variant: "destructive",
        });
      } finally {
        setUploadProgress(prev => {
          const updated = { ...prev };
          delete updated[file.name];
          return updated;
        });
      }
    }
  };

  const handleVideoNameUpdate = (id: string, newName: string) => {
    updateVideo(id, { name: newName });
    toast({
      title: "Success",
      description: "Video name updated successfully",
    });
  };

  const handleVideoDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this video?')) {
      deleteVideo(id);
      toast({
        title: "Success",
        description: "Video deleted successfully",
      });
    }
  };

  const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-4 sm:p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <span>Admin Panel</span>
                <span className="mx-2">›</span>
                <span>Travel Moment Videos</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Travel Moment Videos</h1>
              <p className="text-gray-600 mt-1">
                Upload and manage videos for travel moments carousel (Max 7 videos, 60MB each)
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload New Videos ({videos.length}/{maxVideos})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <FileVideo className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    {uploading ? 'Uploading videos...' : videos.length >= maxVideos ? 'Maximum videos reached' : 'Drop video files here or click to browse'}
                  </p>
                  <p className="text-sm text-gray-500 mb-6">
                    Supports MP4, MOV, AVI, WebM • Maximum 60MB per file • {videos.length}/{maxVideos} videos
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="video/*"
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="hidden"
                    id="video-upload"
                    disabled={uploading || videos.length >= maxVideos}
                  />
                  <Button 
                    onClick={() => document.getElementById('video-upload')?.click()}
                    disabled={uploading || videos.length >= maxVideos}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {uploading ? 'Uploading...' : videos.length >= maxVideos ? 'Limit Reached' : 'Choose Video Files'}
                  </Button>
                </div>

                {Object.keys(uploadProgress).length > 0 && (
                  <div className="mt-4 space-y-2">
                    {Object.entries(uploadProgress).map(([fileName, progress]) => (
                      <div key={fileName} className="bg-gray-100 rounded p-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">{fileName}</span>
                          <span>{progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Videos List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <FileVideo className="w-5 h-5" />
                    Travel Moment Videos ({videos.length})
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {videos.length === 0 ? (
                  <div className="text-center py-8">
                    <FileVideo className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No videos uploaded yet</p>
                    <p className="text-sm text-gray-400 mt-1">Upload videos to display in travel moments carousel</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {videos.map((video) => (
                      <VideoCard
                        key={video.id}
                        video={video}
                        onNameUpdate={handleVideoNameUpdate}
                        onDelete={handleVideoDelete}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

interface VideoCardProps {
  video: {
    id: string;
    name: string;
    url: string;
    file_size: number;
    created_at: string;
  };
  onNameUpdate: (id: string, name: string) => void;
  onDelete: (id: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onNameUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(video.name);

  const handleSaveName = () => {
    if (editName.trim() !== video.name) {
      onNameUpdate(video.id, editName.trim());
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditName(video.name);
    setIsEditing(false);
  };

  return (
    <div className="border rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
      {/* Video Preview */}
      <div className="aspect-video bg-gray-100 rounded mb-3 relative overflow-hidden">
        <video 
          src={video.url} 
          className="w-full h-full object-cover"
          muted
          preload="metadata"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <Play className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Video Info */}
      <div className="space-y-3">
        {/* Name */}
        {isEditing ? (
          <div className="space-y-2">
            <Input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Video name"
              className="text-sm"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveName();
                if (e.key === 'Escape') handleCancelEdit();
              }}
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSaveName}>Save</Button>
              <Button size="sm" variant="outline" onClick={handleCancelEdit}>Cancel</Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900 truncate">{video.name}</h3>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditing(true)}
              className="h-6 w-6 p-0"
            >
              <Edit2 className="w-3 h-3" />
            </Button>
          </div>
        )}

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <Badge variant="secondary">{formatFileSize(video.file_size)}</Badge>
          <span>{formatDate(video.created_at)}</span>
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-2 border-t">
          <Button
            size="sm"
            variant="outline"
            onClick={() => window.open(video.url, '_blank')}
          >
            <Play className="w-3 h-3 mr-1" />
            Preview
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onDelete(video.id)}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-3 h-3 mr-1" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

const formatFileSize = (bytes: number) => {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export default AdminTravelMoments;
