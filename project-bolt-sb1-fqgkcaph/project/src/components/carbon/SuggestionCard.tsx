import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Card from '../ui/Card';
import { Badge } from '../ui/Badge';
import Button from '../ui/Button';

interface SuggestionCardProps {
  suggestion: {
    id: string;
    title: string;
    description: string;
    impact: 'low' | 'medium' | 'high';
    points: number;
    completed?: boolean;
    category: string;
  };
  onComplete?: (id: string) => void;
  onDetails?: (id: string) => void;
}

const SuggestionCard = ({
  suggestion,
  onComplete,
  onDetails,
}: SuggestionCardProps) => {
  const impactColors = {
    low: 'success',
    medium: 'warning',
    high: 'accent',
  };
  
  const categoryColors = {
    transportation: 'secondary',
    energy: 'accent',
    food: 'primary',
    shopping: 'secondary',
    home: 'primary',
  };

  return (
    <Card className="h-full" hover={false}>
      <div className="flex justify-between items-start mb-2">
        <Badge 
          variant={categoryColors[suggestion.category as keyof typeof categoryColors] || 'primary'}
          className="text-xs capitalize"
        >
          {suggestion.category}
        </Badge>
        <Badge 
          variant={impactColors[suggestion.impact]}
          className="text-xs capitalize"
        >
          {suggestion.impact} impact
        </Badge>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mt-2 mb-2">{suggestion.title}</h3>
      <p className="text-gray-600 text-sm mb-4">{suggestion.description}</p>
      
      <div className="mt-auto">
        <div className="flex items-center text-sm text-primary-600 font-medium mb-4">
          <span className="mr-1">+{suggestion.points}</span>
          <span>points</span>
        </div>
        
        <div className="flex justify-between items-center">
          {suggestion.completed ? (
            <div className="flex items-center text-success-600 font-medium">
              <CheckCircle2 size={16} className="mr-1" />
              <span>Completed</span>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onComplete && onComplete(suggestion.id)}
            >
              Mark Complete
            </Button>
          )}
          
          <Button
            variant="primary"
            size="sm"
            icon={<ArrowRight size={16} />}
            onClick={() => onDetails && onDetails(suggestion.id)}
            className="ml-2"
          >
            Details
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SuggestionCard;
export { SuggestionCard };