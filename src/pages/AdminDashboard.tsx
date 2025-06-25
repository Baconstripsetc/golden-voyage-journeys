
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Edit, Trash2, Plus } from 'lucide-react';

// Mock data for packages (in real app, this would come from backend)
const mockPackages = [
  {
    id: 1,
    title: 'Luxury Safari Adventure',
    slug: 'luxury-safari-adventure',
    price: 'R45,999 PPS',
    status: 'Published',
    image: '/placeholder.svg'
  },
  {
    id: 2,
    title: 'Cape Town City Break',
    slug: 'cape-town-city-break',
    price: 'R12,500 PPS',
    status: 'Draft',
    image: '/placeholder.svg'
  },
  {
    id: 3,
    title: 'Coastal Escape Package',
    slug: 'coastal-escape-package',
    price: 'R8,999 PPS',
    status: 'Published',
    image: '/placeholder.svg'
  },
  {
    id: 4,
    title: 'Mountain Retreat Adventure',
    slug: 'mountain-retreat-adventure',
    price: 'R15,999 PPS',
    status: 'Published',
    image: '/placeholder.svg'
  }
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState(mockPackages);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    // Check if admin is logged in
    if (!localStorage.getItem('adminLoggedIn')) {
      navigate('/admin');
    }
  }, [navigate]);

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'All' || pkg.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      setPackages(packages.filter(pkg => pkg.id !== id));
    }
  };

  const tabs = ['All', 'Published', 'Draft'];

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Manage Packages</h1>
              <p className="text-gray-600 mt-1">Create and manage your travel packages</p>
            </div>
            <Button 
              onClick={() => navigate('/admin/new-package')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Package
            </Button>
          </div>

          <div className="mb-6">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by title or slug..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex space-x-1 border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPackages.map((pkg) => (
              <Card key={pkg.id} className="overflow-hidden">
                <div className="aspect-video bg-gray-200 relative">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = '<div class="flex items-center justify-center h-full text-gray-400"><svg class="w-12 h-12" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path></svg></div>';
                      }
                    }}
                  />
                </div>
                <CardContent className="p-4">
                  <div className="mb-2">
                    <h3 className="font-semibold text-lg text-gray-900">{pkg.title}</h3>
                    <p className="text-sm text-gray-500">/{pkg.slug}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-blue-600">{pkg.price}</span>
                    <Badge variant={pkg.status === 'Published' ? 'default' : 'secondary'}>
                      {pkg.status}
                    </Badge>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/admin/edit-package/${pkg.id}`)}
                      className="flex-1"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDelete(pkg.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPackages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No packages found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
