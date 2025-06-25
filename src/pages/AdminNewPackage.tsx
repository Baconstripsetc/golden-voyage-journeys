
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, Plus, X } from 'lucide-react';

const AdminNewPackage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    price: '',
    duration: '',
    travelPeriod: '',
    description: '',
    highlights: [''],
    itinerary: [{ day: 1, stopName: '', accommodation: '', activities: '' }],
    included: [''],
    publishStatus: 'Draft'
  });

  useEffect(() => {
    // Check if admin is logged in
    if (!localStorage.getItem('adminLoggedIn')) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-generate slug from title
    if (field === 'title') {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const addHighlight = () => {
    setFormData(prev => ({
      ...prev,
      highlights: [...prev.highlights, '']
    }));
  };

  const updateHighlight = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.map((h, i) => i === index ? value : h)
    }));
  };

  const removeHighlight = (index: number) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index)
    }));
  };

  const addItineraryDay = () => {
    setFormData(prev => ({
      ...prev,
      itinerary: [...prev.itinerary, { 
        day: prev.itinerary.length + 1, 
        stopName: '', 
        accommodation: '', 
        activities: '' 
      }]
    }));
  };

  const updateItinerary = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addIncludedItem = () => {
    setFormData(prev => ({
      ...prev,
      included: [...prev.included, '']
    }));
  };

  const updateIncluded = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      included: prev.included.map((item, i) => i === index ? value : item)
    }));
  };

  const removeIncluded = (index: number) => {
    setFormData(prev => ({
      ...prev,
      included: prev.included.filter((_, i) => i !== index)
    }));
  };

  const handleSave = (publish = false) => {
    const finalData = {
      ...formData,
      publishStatus: publish ? 'Published' : 'Draft'
    };
    
    // In real app, this would save to backend
    console.log('Saving package:', finalData);
    alert(`Package ${publish ? 'published' : 'saved as draft'} successfully!`);
    navigate('/admin/dashboard');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <span>Manage Packages</span>
                <span className="mx-2">›</span>
                <span>New Package</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Create New Package</h1>
              <p className="text-gray-600 mt-1">Fill in the details to create a new travel package</p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline"
                onClick={() => handleSave(false)}
              >
                Save Draft
              </Button>
              <Button 
                onClick={() => handleSave(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Publish
              </Button>
            </div>
          </div>

          <div className="space-y-8">
            {/* Header Carousel */}
            <Card>
              <CardHeader>
                <CardTitle>Header Carousel</CardTitle>
                <p className="text-sm text-gray-600">Upload 1-4 images for the package header</p>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500 mt-1">0/4 images uploaded</p>
                </div>
              </CardContent>
            </Card>

            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter package title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="slug">Slug</Label>
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
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      placeholder="R27,999 PPS"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      placeholder="7 nights + 1 free"
                      value={formData.duration}
                      onChange={(e) => handleInputChange('duration', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="travelPeriod">Travel Period</Label>
                    <Input
                      id="travelPeriod"
                      placeholder="Feb-Nov 2026"
                      value={formData.travelPeriod}
                      onChange={(e) => handleInputChange('travelPeriod', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Brief Detail */}
            <Card>
              <CardHeader>
                <CardTitle>Brief Detail</CardTitle>
              </CardHeader>
              <CardContent>
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  rows={4}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter a brief description of the package..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
                <p className="text-sm text-gray-500 mt-1">0/300</p>
              </CardContent>
            </Card>

            {/* Trip Highlights */}
            <Card>
              <CardHeader>
                <CardTitle>Trip Highlights</CardTitle>
                <p className="text-sm text-gray-600">Add up to 10 key highlights</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {formData.highlights.map((highlight, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="Highlight 1"
                      value={highlight}
                      onChange={(e) => updateHighlight(index, e.target.value)}
                      className="flex-1"
                    />
                    {formData.highlights.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeHighlight(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={addHighlight}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Highlight
                </Button>
              </CardContent>
            </Card>

            {/* What's Included */}
            <Card>
              <CardHeader>
                <CardTitle>What's Included</CardTitle>
                <p className="text-sm text-gray-600">Add up to 15 included items</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {formData.included.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="Included Item 1"
                      value={item}
                      onChange={(e) => updateIncluded(index, e.target.value)}
                      className="flex-1"
                    />
                    {formData.included.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeIncluded(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={addIncludedItem}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </CardContent>
            </Card>

            {/* Publish Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Publish Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Publication Status</Label>
                    <p className="text-sm text-gray-600">Package will be saved as draft</p>
                  </div>
                  <Badge variant="secondary">Draft</Badge>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-3 pb-8">
              <Button 
                variant="outline"
                onClick={() => navigate('/admin/dashboard')}
              >
                Cancel
              </Button>
              <Button 
                variant="outline"
                onClick={() => handleSave(false)}
              >
                Save Draft
              </Button>
              <Button 
                onClick={() => handleSave(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Publish Package
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNewPackage;
