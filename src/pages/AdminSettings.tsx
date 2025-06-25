
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Edit, X } from 'lucide-react';

const AdminSettings = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is logged in
    if (!localStorage.getItem('adminLoggedIn')) {
      navigate('/admin');
    }
  }, [navigate]);

  const emailAddresses = [
    {
      email: 'admin@trevecom.com',
      status: 'Primary',
      verified: true
    },
    {
      email: 'support@trevecom.com',
      status: 'Verified',
      verified: true
    },
    {
      email: 'notifications@trevecom.com',
      status: 'Pending Verification',
      verified: false
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
            <p className="text-gray-600 mt-1">Manage your account preferences and email addresses</p>
          </div>

          <div className="space-y-8">
            {/* Email Addresses */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <Mail className="w-5 h-5 mr-2" />
                    Email Addresses
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    Manage your email addresses for notifications and account access
                  </p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Mail className="w-4 h-4 mr-2" />
                  Add Email
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {emailAddresses.map((emailData, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">{emailData.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {emailData.status === 'Primary' && (
                            <Badge variant="default">Primary</Badge>
                          )}
                          {emailData.verified ? (
                            <Badge className="bg-green-100 text-green-800">Verified</Badge>
                          ) : (
                            <Badge variant="secondary">Pending Verification</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {emailData.status !== 'Primary' && emailData.verified && (
                        <Button variant="outline" size="sm">
                          Set as Primary
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      {emailData.status !== 'Primary' && (
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Account Information */}
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <p className="text-sm text-gray-600">Your account details and statistics</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Account ID</p>
                      <p className="text-gray-900">user_123456789</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Email Addresses</p>
                      <p className="text-gray-900">3</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Member Since</p>
                      <p className="text-gray-900">January 1, 2024</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Verified Emails</p>
                      <p className="text-gray-900">2 of 3</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
