import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/context/AuthContext';
import { ProtectedRoute } from '@/app/components/auth/ProtectedRoute';
import { ProfileEditor } from '@/app/components/profile/ProfileEditor';
import { AddressBook } from '@/app/components/address/AddressBook';
import { OrderHistory } from '@/app/components/profile/OrderHistory';
import { Button } from '@/app/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { LogOut, User, MapPin, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
    navigate('/', { replace: true });
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display' }}>
                My Account
              </h1>
              <p className="text-gray-600 text-sm mt-1">Welcome back, {user?.fullName}!</p>
            </div>

            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full rounded-none border-b border-gray-200 bg-gray-50 grid grid-cols-3">
                <TabsTrigger
                  value="profile"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-blue-400 rounded-none"
                >
                  <User size={16} className="mr-2" />
                  Profile
                </TabsTrigger>
                <TabsTrigger
                  value="addresses"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-blue-400 rounded-none"
                >
                  <MapPin size={16} className="mr-2" />
                  Addresses
                </TabsTrigger>
                <TabsTrigger
                  value="orders"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-blue-400 rounded-none"
                >
                  <ShoppingBag size={16} className="mr-2" />
                  Orders
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="p-8">
                <ProfileEditor />
              </TabsContent>

              {/* Addresses Tab */}
              <TabsContent value="addresses" className="p-8">
                <AddressBook />
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders" className="p-8">
                <OrderHistory />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
