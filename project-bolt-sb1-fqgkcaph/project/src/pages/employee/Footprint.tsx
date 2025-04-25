import React from 'react';
import { motion } from 'framer-motion';
import FootprintChart from '../../components/charts/FootprintChart';
import FootprintSummary from '../../components/carbon/FootprintSummary';
import CategoryBreakdown from '../../components/carbon/CategoryBreakdown';

const EmployeeFootprint = () => {
  // Example data - in a real app, this would come from your data source
  const footprintData = {
    currentValue: 1250,
    previousValue: 1400,
    target: 1000,
    unit: 'kg CO₂e',
    period: 'this week'
  };

  // Mock data for the FootprintChart
  const chartData = {
    weekly: [
      { date: '2024-01-01', value: 1200 },
      { date: '2024-01-08', value: 1300 },
      { date: '2024-01-15', value: 1100 },
      { date: '2024-01-22', value: 1250 },
    ]
  };

  // Mock data for CategoryBreakdown
  const categoryData = [
    { category: 'Transportation', value: 450 },
    { category: 'Energy', value: 350 },
    { category: 'Food', value: 250 },
    { category: 'Waste', value: 200 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6 p-6"
    >
      <h1 className="text-3xl font-bold text-gray-900">Carbon Footprint</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FootprintSummary 
          currentValue={footprintData.currentValue}
          previousValue={footprintData.previousValue}
          target={footprintData.target}
          unit={footprintData.unit}
          period={footprintData.period}
        />
        <FootprintChart data={chartData.weekly} period="weekly" />
      </div>
      
      <CategoryBreakdown data={categoryData} />
    </motion.div>
  );
};

export default EmployeeFootprint;