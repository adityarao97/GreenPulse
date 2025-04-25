import React from 'react';
import { TrendingDown, TrendingUp } from 'lucide-react';
import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';

interface FootprintSummaryProps {
  currentValue: number;
  previousValue: number;
  target: number;
  unit?: string;
  period?: string;
}

const FootprintSummary: React.FC<FootprintSummaryProps> = ({
  currentValue,
  previousValue,
  target,
  unit = 'kg CO₂e',
  period = 'this week',
}) => {
  const change = previousValue ? ((currentValue - previousValue) / previousValue) * 100 : 0;
  const isReduction = change <= 0;
  
  return (
    <Card className="flex flex-col h-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Carbon Footprint Summary</h3>
      <p className="text-sm text-gray-500 mb-4">{period}</p>
      
      <div className="flex items-end mb-4">
        <div className="text-3xl font-bold text-gray-900">{currentValue.toLocaleString()}</div>
        <div className="text-gray-600 ml-1 mb-0.5">{unit}</div>
      </div>
      
      <div className="flex items-center mb-4">
        <div 
          className={`flex items-center ${
            isReduction ? 'text-success-600' : 'text-error-600'
          }`}
        >
          {isReduction ? (
            <TrendingDown className="w-5 h-5 mr-1" />
          ) : (
            <TrendingUp className="w-5 h-5 mr-1" />
          )}
          <span className="font-medium">
            {Math.abs(change).toFixed(1)}%
          </span>
        </div>
        <span className="text-gray-500 text-sm ml-1">
          vs previous {period.split(' ')[1]}
        </span>
      </div>
      
      <div className="mt-auto">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">Progress to target</span>
          <span className="font-medium">{((currentValue / target) * 100).toFixed(0)}%</span>
        </div>
        <ProgressBar 
          value={currentValue} 
          max={target} 
          color={isReduction ? "success" : "warning"}
        />
        <div className="text-xs text-gray-500 mt-2">
          Target: {target.toLocaleString()} {unit}
        </div>
      </div>
    </Card>
  );
};

export default FootprintSummary;