import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { SuggestionCard } from '../../components/carbon/SuggestionCard';

// Mock suggestions data
const mockSuggestions = [
  {
    id: '1',
    title: 'Switch to LED Lighting',
    description: 'Replace traditional bulbs with LED alternatives to reduce energy consumption.',
    impact: 'medium' as const,
    points: 50,
    category: 'energy',
    completed: false
  },
  {
    id: '2',
    title: 'Optimize Computer Power Settings',
    description: 'Configure your computer to enter sleep mode when inactive.',
    impact: 'low' as const,
    points: 30,
    category: 'energy',
    completed: false
  },
  {
    id: '3',
    title: 'Use Public Transportation',
    description: 'Consider using public transport for your daily commute.',
    impact: 'high' as const,
    points: 100,
    category: 'transportation',
    completed: false
  }
];

const EmployeeSuggestions = () => {
  const handleComplete = (id: string) => {
    console.log('Completed suggestion:', id);
  };

  const handleDetails = (id: string) => {
    console.log('View details for suggestion:', id);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Carbon Reduction Suggestions</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockSuggestions.map((suggestion) => (
          <SuggestionCard
            key={suggestion.id}
            suggestion={suggestion}
            onComplete={handleComplete}
            onDetails={handleDetails}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default EmployeeSuggestions;