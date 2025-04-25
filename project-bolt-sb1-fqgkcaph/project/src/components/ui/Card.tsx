import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '',
  onClick,
  hover = true,
}) => {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : {}}
      transition={{ duration: 0.2 }}
      className={`card ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default Card