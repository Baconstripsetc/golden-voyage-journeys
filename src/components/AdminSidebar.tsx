
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Settings, Package, Plus, LogOut, Compass } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth';

const AdminSidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  
  const handleLogout = () => {
    logout();
  };

  const travelMenuItems = [
    {
      title: 'Manage Packages',
      icon: Package,
      path: '/admin/dashboard',
      active: location.pathname === '/admin/dashboard'
    },
    {
      title: 'Add New Package',
      icon: Plus,
      path: '/admin/new-package',
      active: location.pathname === '/admin/new-package' || location.pathname.includes('/admin/edit-package')
    }
  ];

  const discoveryMenuItems = [
    {
      title: 'Manage Discovery',
      icon: Compass,
      path: '/admin/discovery',
      active: location.pathname === '/admin/discovery'
    },
    {
      title: 'Add New Discovery',
      icon: Plus,
      path: '/admin/new-discovery',
      active: location.pathname === '/admin/new-discovery' || location.pathname.includes('/admin/edit-discovery')
    }
  ];

  const settingsMenuItems = [
    {
      title: 'Settings',
      icon: Settings,
      path: '/admin/settings',
      active: location.pathname === '/admin/settings'
    }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Trevecom Admin</h2>
        <p className="text-sm text-gray-600 mt-1">Content Management</p>
      </div>
      
      <div className="flex-1 py-6">
        <div className="px-4 mb-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Travel Packages
          </h3>
          <nav className="space-y-1">
            {travelMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    item.active
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="px-4 mb-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Discovery Packages
          </h3>
          <nav className="space-y-1">
            {discoveryMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    item.active
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="px-4 mb-6">
          <nav className="space-y-1">
            {settingsMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    item.active
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-gray-600 hover:text-gray-900"
        >
          <LogOut className="w-4 h-4 mr-3" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
