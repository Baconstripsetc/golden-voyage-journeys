
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import ImageUpload from '../components/ImageUpload';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from 'lucide-react';
import { usePackages, TravelPackage } from '@/hooks/usePackages';
import { useDiscoveryPackages, DiscoveryPackage } from '@/hooks/useDiscoveryPackages';
import { useAuth } from '@/hooks/useAuth';

const AdminNewPackage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const { createPackage, updatePackage, getPackageById } = usePackages();
  const { createPackage: createDiscoveryPackage, updatePackage: updateDiscoveryPackage, getPackageById: getDiscoveryPackageById } = useDiscoveryPackages();
  
  const isDiscovery = location.pathname.includes('discovery');
  const isEditing = !!id;
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    price: '',
    duration: '',
    travel_period: '',
    location: '',
    description: '',
    images: [] as string[],
    highlights: [''],
    itinerary: [{ day: '', activity: '', accommodation: '' }],
    inclusions: [''],
    exclusions: [''],
    status: 'draft' as 'draft' | 'published'
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin');
      return;
    }

    if (isEditing && id) {
      loadPackage();
    }
  }, [isAuthenticated, navigate, id, isEditing]);

  const loadPackage = async () => {
    if (!id) return;
    
    setLoading(true);
    try {
      const pkg = isDiscovery 
        ? await getDiscoveryPackageById(id)
        : await getPackageById(id);
      
      if (pkg) {
        setFormData({
          title: pkg.title,
          slug: pkg.slug,
          price: pkg.price,
          duration: pkg.duration || '',
          travel_period: pkg.travel_period || '',
          location: pkg.location || '',
          description: pkg.description || '',
          images: pkg.images || [],
          highlights: pkg.highlights && pkg.highlights.length > 0 ? pkg.highlights : [''],
          itinerary: pkg.itinerary && pkg.itinerary.length > 0 ? pkg.itinerary : [{ day: '', activity: '', accommodation: '' }],
          inclusions: pkg.inclusions && pkg.inclusions.length > 0 ? pkg.inclusions : [''],
          exclusions: pkg.exclusions && pkg.exclusions.length > 0 ? pkg.exclusions : [''],
          status: pkg.status
        });
      }
    } catch (error) {
      console.error('Error loading package:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addArrayItem = (field: 'highlights' | 'inclusions' | 'exclusions', defaultValue = '') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], defaultValue]
    }));
  };

  const updateArrayItem = (field: 'highlights' | 'inclusions' | 'exclusions', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const removeArrayItem = (field: 'highlights' | 'inclusions' | 'exclusions', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const addItineraryDay = () => {
    setFormData(prev => ({
      ...prev,
      itinerary: [...prev.itinerary, { day: '', activity: '', accommodation: '' }]
    }));
  };

  const updateItinerary = (index: number, field: 'day' | 'activity' | 'accommodation', value: string) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const removeItineraryDay = (index: number) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async (publish = false) => {
    if (!formData.title.trim()) {
      alert('Please enter a title');
      return;
    }

    setLoading(true);
    try {
      const packageData = {
        ...formData,
        status: publish ? 'published' as const : 'draft' as const,
        highlights: formData.highlights.filter(h => h.trim() !== ''),
        inclusions: formData.inclusions.filter(i => i.trim() !== ''),
        exclusions: formData.exclusions.filter(e => e.trim() !== ''),
        itinerary: formData.itinerary.filter(item => 
          item.day.trim() !== '' || item.activity.trim() !== '' || item.accommodation.trim() !== ''
        )
      };

      let result;
      if (isEditing && id) {
        result = isDiscovery 
          ? await updateDiscoveryPackage(id, packageData)
          : await updatePackage(id, packageData);
      } else {
        result = isDiscovery 
          ? await createDiscoveryPackage(packageData)
          : await createPackage(packageData);
      }

      if (result) {
        const dashboardPath = isDiscovery ? '/admin/discovery' : '/admin/dashboard';
        navigate(dashboardPath);
      }
    } catch (error) {
      console.error('Error saving package:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return (
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-lg">Loading package...</div>
        </div>
      </div>
    );
  }

  const pageTitle = isEditing 
    ? `Edit ${isDiscovery ? 'Discovery' : 'Package'}` 
    : `Create New ${isDiscovery ? 'Discovery' : 'Package'}`;

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <span>Manage {isDiscovery ? 'Discovery' : 'Packages'}</span>
                <span className="mx-2">›</span>
                <span>{pageTitle}</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">{pageTitle}</h1>
              <p className="text-gray-600 mt-1">Fill in the details to {isEditing ? 'update' : 'create'} a travel {isDiscovery ? 'discovery' : 'package'}</p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline"
                onClick={() => handleSave(false)}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Draft'}
              </Button>
              <Button 
                onClick={() => handleSave(true)}
                className="bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? 'Publishing...' : 'Publish'}
              </Button>
            </div>
          </div>

          <div className="space-y-8">
            {/* Image Upload */}
            <ImageUpload
              images={formData.images}
              onImagesChange={(images) => setFormData(prev => ({ ...prev, images }))}
              maxImages={4}
              title="Package Images"
              description="Upload 1-4 images for the package header"
            />

            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      placeholder="Enter package title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="slug">URL Slug</Label>
                    <Input
                      id="slug"
                      placeholder="package-url-slug"
                      value={formData.slug}
                      onChange={(e) => handleInputChange('slug', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="price">Price *</Label>
                    <Input
                      id="price"
                      placeholder="$2,999"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      placeholder="7 days"
                      value={formData.duration}
                      onChange={(e) => handleInputChange('duration', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="Italy"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="travel_period">Travel Period</Label>
                  <Input
                    id="travel_period"
                    placeholder="Feb-Nov 2026"
                    value={formData.travel_period}
                    onChange={(e) => handleInputChange('travel_period', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <Label htmlFor="description">Package Description</Label>
                <Textarea
                  id="description"
                  rows={4}
                  placeholder="Enter a detailed description of the package..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              </CardContent>
            </Card>

            {/* Highlights */}
            <Card>
              <CardHeader>
                <CardTitle>Package Highlights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {formData.highlights.map((highlight, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder={`Highlight ${index + 1}`}
                      value={highlight}
                      onChange={(e) => updateArrayItem('highlights', index, e.target.value)}
                      className="flex-1"
                    />
                    {formData.highlights.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem('highlights', index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => addArrayItem('highlights')}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Highlight
                </Button>
              </CardContent>
            </Card>

            {/* Itinerary */}
            <Card>
              <CardHeader>
                <CardTitle>Itinerary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.itinerary.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium">Day {index + 1}</h4>
                      {formData.itinerary.length > 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeItineraryDay(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <Label>Day Name</Label>
                        <Input
                          placeholder="Arrival"
                          value={item.day}
                          onChange={(e) => updateItinerary(index, 'day', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Activities</Label>
                        <Input
                          placeholder="City tour, welcome dinner"
                          value={item.activity}
                          onChange={(e) => updateItinerary(index, 'activity', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Accommodation</Label>
                        <Input
                          placeholder="Hotel Name"
                          value={item.accommodation}
                          onChange={(e) => updateItinerary(index, 'accommodation', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={addItineraryDay}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Day
                </Button>
              </CardContent>
            </Card>

            {/* Inclusions */}
            <Card>
              <CardHeader>
                <CardTitle>What's Included</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {formData.inclusions.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder={`Included Item ${index + 1}`}
                      value={item}
                      onChange={(e) => updateArrayItem('inclusions', index, e.target.value)}
                      className="flex-1"
                    />
                    {formData.inclusions.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem('inclusions', index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => addArrayItem('inclusions')}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Inclusion
                </Button>
              </CardContent>
            </Card>

            {/* Exclusions */}
            <Card>
              <CardHeader>
                <CardTitle>What's Not Included</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {formData.exclusions.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder={`Excluded Item ${index + 1}`}
                      value={item}
                      onChange={(e) => updateArrayItem('exclusions', index, e.target.value)}
                      className="flex-1"
                    />
                    {formData.exclusions.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem('exclusions', index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => addArrayItem('exclusions')}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Exclusion
                </Button>
              </CardContent>
            </Card>

            {/* Status */}
            <Card>
              <CardHeader>
                <CardTitle>Publication Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Current Status</Label>
                    <p className="text-sm text-gray-600">Package will be saved with the selected status</p>
                  </div>
                  <Badge variant={formData.status === 'published' ? 'default' : 'secondary'}>
                    {formData.status === 'published' ? 'Published' : 'Draft'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-3 pb-8">
              <Button 
                variant="outline"
                onClick={() => navigate(isDiscovery ? '/admin/discovery' : '/admin/dashboard')}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button 
                variant="outline"
                onClick={() => handleSave(false)}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Draft'}
              </Button>
              <Button 
                onClick={() => handleSave(true)}
                className="bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? 'Publishing...' : 'Publish Package'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNewPackage;
