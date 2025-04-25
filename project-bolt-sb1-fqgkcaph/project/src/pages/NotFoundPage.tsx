import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
    >
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-200">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mt-4">Page Not Found</h2>
          <p className="text-gray-600 mt-2">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg 
                   hover:bg-blue-700 transition-colors duration-200 gap-2"
        >
          <HomeIcon size={20} />
          Return Home
        </button>
      </div>
    </motion.div>
  );
};

export default NotFoundPage;