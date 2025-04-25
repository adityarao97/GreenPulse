import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
  showValue?: boolean;
  height?: number;
  className?: string;
  animated?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  value, 
  max = 100, 
  color = 'primary',
  showValue = false,
  height = 6,
  className = '',
  animated = true,
}) => {
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);
  
  const colorClasses = {
    primary: 'bg-primary-500',
    secondary: 'bg-secondary-500',
    accent: 'bg-accent-500',
    success: 'bg-success-500',
    warning: 'bg-warning-500',
    error: 'bg-error-500',
  };

  return (
    <div className={`w-full ${className}`}>
      <div 
        className="w-full bg-gray-200 rounded-full overflow-hidden" 
        style={{ height: `${height}px` }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`${colorClasses[color]} h-full ${animated ? 'animate-pulse-slow' : ''}`}
        />
      </div>
      {showValue && (
        <div className="mt-1 text-xs text-gray-600">
          {value.toLocaleString()} / {max.toLocaleString()} ({percentage.toFixed(0)}%)
        </div>
      )}
    </div>
  );
};

export default ProgressBar;