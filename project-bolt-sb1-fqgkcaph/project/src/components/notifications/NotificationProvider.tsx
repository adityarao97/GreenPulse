import React, { useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Bell } from 'lucide-react';

interface Notification {
  location: string;
  category: string;
  notification: string;
  timestamp: string;
}

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8008/get-notification');
        const data: Notification = await response.json();
        
        if (data.notification) {
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? 'animate-enter' : 'animate-leave'
              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    <Bell className="h-5 w-5 text-primary-500" />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {data.location}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {data.notification}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-primary-600 hover:text-primary-500 focus:outline-none"
                >
                  Close
                </button>
              </div>
            </div>
          ), {
            duration: 15000,
            position: 'top-right',
          });
        }
      } catch (error) {
        console.error('Error fetching notification:', error);
      }
    };

    // Initial fetch
    fetchNotification();

    // Set up interval for every 10 minutes
    const interval = setInterval(fetchNotification, 1 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Toaster />
      {children}
    </>
  );
};