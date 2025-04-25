import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
      
      <Card className="max-w-2xl mx-auto">
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                defaultValue={user?.name}
                readOnly
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                defaultValue={user?.email}
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                defaultValue={user?.role}
                readOnly
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Profile;