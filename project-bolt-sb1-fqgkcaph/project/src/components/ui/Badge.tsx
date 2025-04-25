import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'primary',
  className = '',
}) => {
  const variants = {
    primary: 'badge-primary',
    secondary: 'badge-secondary',
    accent: 'badge-accent',
    success: 'badge-success',
    warning: 'badge-warning',
    error: 'badge-error',
  };

  return (
    <span className={`badge ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
export { Badge };