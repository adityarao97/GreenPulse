import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'employee' | 'company'>('employee');
  const [error, setError] = useState('');
  
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    try {
      const success = await register({
        name,
        email,
        password,
        role,
      });

      if (success) {
        navigate(`/${role}`);
      }
    } catch (err) {
      setError('Failed to create account');
      console.error(err);
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create an account</h1>
        <p className="text-gray-600 mt-2">Join us in reducing carbon footprint</p>
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
      
      <div className="mb-6">
        <div className="flex w-full rounded-md overflow-hidden">
          <button
            type="button"
            onClick={() => setRole('employee')}
            className={`flex-1 py-2 text-center transition-colors ${
              role === 'employee' 
                ? 'bg-primary-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Employee
          </button>
          <button
            type="button"
            onClick={() => setRole('company')}
            className={`flex-1 py-2 text-center transition-colors ${
              role === 'company' 
                ? 'bg-primary-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Company
          </button>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            {role === 'company' ? 'Company Name' : 'Full Name'}
          </label>
          <input
            type="text"
            id="name"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={role === 'company' ? 'Acme Inc.' : 'John Doe'}
          />
        </div>
        
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
        
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
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
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            {isLoading ? 'Creating account...' : 'Create account'}
          </Button>
        </div>
      </form>
      
      <div className="text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;