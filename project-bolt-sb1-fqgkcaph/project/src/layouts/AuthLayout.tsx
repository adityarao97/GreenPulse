import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Image/Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-b from-primary-600 to-primary-800 text-white p-12 flex-col justify-between">
        <div className="flex items-center">
          <Leaf className="h-8 w-8 mr-2" />
          <span className="text-2xl font-semibold">GreenPulse</span>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-4xl font-bold">Make a difference with every choice</h1>
          <p className="text-xl opacity-90">Track, reduce, and be rewarded for your environmental impact.</p>
          
          <div className="pt-6">
            <div className="flex items-center space-x-4">
              <img 
                src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150" 
                alt="User" 
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">"GreenPulse helped our team reduce emissions by 23% in just 3 months."</p>
                <p className="text-primary-200 mt-1">Sarah Chen, Product Manager</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        <div className="text-sm opacity-75">
          © 2025 GreenPulse. All rights reserved.
        </div>
      </div>

      {/* Right side - Auth form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="mb-10 lg:hidden flex items-center justify-center">
            <Leaf className="h-8 w-8 mr-2 text-primary-600" />
            <span className="text-2xl font-semibold text-primary-600">GreenPulse</span>
          </div>
          
          <Outlet />
          
          <div className="mt-8 text-center text-gray-600 text-sm">
            <p>© 2025 GreenPulse. All rights reserved.</p>
            <div className="mt-3">
              <Link to="/" className="text-primary-600 hover:text-primary-700">
                Return to Home
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;