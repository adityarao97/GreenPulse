import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      const success = await login(email, password);
      if (success) {
        // Redirect based on user role
        const userRole = email.includes('company') ? 'company' : 'employee';
        navigate(`/${userRole}`);
      }
    } catch (err) {
      setError('Failed to log in');
      console.error(err);
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
        <p className="text-gray-600 mt-2">Sign in to continue to your dashboard</p>
      </div>
      
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-error-50 text-error-700 p-3 rounded-md mb-6 flex items-center"
        >
          <AlertCircle size={18} className="mr-2 flex-shrink-0" />
          <span>{error}</span>
        </motion.div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
          />
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <a href="#" className="text-sm text-primary-600 hover:text-primary-700">
              Forgot password?
            </a>
          </div>
          <input
            type="password"
            id="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>
        
        <div className="mb-6">
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            icon={<ArrowRight size={18} />}
            full
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </div>
      </form>
      
      <div className="text-center">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">
            Sign up
          </Link>
        </p>
      </div>

      {/* Demo accounts */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-center text-gray-500 mb-3">Demo Accounts</p>
        <div className="space-y-2">
          <button
            onClick={() => {
              setEmail('employee@example.com');
              setPassword('password');
            }}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md text-left hover:bg-gray-50"
          >
            <div className="font-medium">Employee Demo</div>
            <div className="text-gray-500 text-xs">employee@example.com / password</div>
          </button>
          <button
            onClick={() => {
              setEmail('company@example.com');
              setPassword('password');
            }}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md text-left hover:bg-gray-50"
          >
            <div className="font-medium">Company Demo</div>
            <div className="text-gray-500 text-xs">company@example.com / password</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;