import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  full?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  icon,
  full = false,
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };
  
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
    outline: 'btn-outline',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.2 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn ${variants[variant]} ${sizeClasses[size]} ${full ? 'w-full' : ''} ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
    >
      <span className="flex items-center justify-center">
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </span>
    </motion.button>
  );
};

export default Button;