import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, TrendingDown, Award } from 'lucide-react';
import { mockFootprintData, mockCategoryData, mockSuggestions } from '../../data/mockData';
import Card from '../../components/ui/Card';
import FootprintChart from '../../components/charts/FootprintChart';
import FootprintSummary from '../../components/carbon/FootprintSummary';
import CategoryBreakdown from '../../components/carbon/CategoryBreakdown';
import SuggestionCard from '../../components/carbon/SuggestionCard';

const EmployeeDashboard: React.FC = () => {
  const [chartPeriod, setChartPeriod] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  
  // Calculate current and previous footprint values based on the selected period
  const currentFootprint = mockFootprintData[chartPeriod][mockFootprintData[chartPeriod].length - 1].value;
  const previousFootprint = mockFootprintData[chartPeriod][mockFootprintData[chartPeriod].length - 2].value;
  
  // Get top suggestions (not completed)
  const topSuggestions = mockSuggestions
    .filter(suggestion => !suggestion.completed)
    .slice(0, 2);
  
  const handleSuggestionComplete = (id: string) => {
    console.log(`Marking suggestion ${id} as complete`);
    // In a real app, this would update the database
  };
  
  const handleSuggestionDetails = (id: string) => {
    console.log(`View details for suggestion ${id}`);
    // In a real app, this would navigate to a details page
  };
  
  // Define animations for the dashboard elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="mt-2 md:mt-0 inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            onClick={() => setChartPeriod('daily')}
            className={`px-4 py-2 text-sm font-medium rounded-l-md ${
              chartPeriod === 'daily'
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border border-gray-300`}
          >
            Daily
          </button>
          <button
            type="button"
            onClick={() => setChartPeriod('weekly')}
            className={`px-4 py-2 text-sm font-medium ${
              chartPeriod === 'weekly'
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border-t border-b border-gray-300`}
          >
            Weekly
          </button>
          <button
            type="button"
            onClick={() => setChartPeriod('monthly')}
            className={`px-4 py-2 text-sm font-medium rounded-r-md ${
              chartPeriod === 'monthly'
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border border-gray-300`}
          >
            Monthly
          </button>
        </div>
      </div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Summary stats */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <FootprintSummary
            currentValue={currentFootprint}
            previousValue={previousFootprint}
            target={chartPeriod === 'daily' ? 7 : chartPeriod === 'weekly' ? 50 : 200}
            period={`this ${chartPeriod.slice(0, -2)}${chartPeriod === 'daily' ? '' : 'week'}`}
          />
        </motion.div>
        
        {/* Chart card */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="h-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Carbon Footprint Trend</h3>
              <div className="flex items-center text-sm text-gray-500">
                <CalendarDays size={16} className="mr-1" />
                <span>
                  {chartPeriod === 'daily' ? 'Last 7 days' : 
                   chartPeriod === 'weekly' ? 'Last 6 weeks' : 
                   'Last 6 months'}
                </span>
              </div>
            </div>
            <FootprintChart 
              data={mockFootprintData[chartPeriod]} 
              period={chartPeriod}
              height={280}
            />
          </Card>
        </motion.div>
        
        {/* Category breakdown */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <CategoryBreakdown data={mockCategoryData} />
        </motion.div>
        
        {/* Top suggestions */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <div className="h-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Suggested Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
              {topSuggestions.map(suggestion => (
                <SuggestionCard
                  key={suggestion.id}
                  suggestion={suggestion}
                  onComplete={handleSuggestionComplete}
                  onDetails={handleSuggestionDetails}
                />
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Stats cards */}
        <motion.div variants={itemVariants} className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-primary-50 border border-primary-100">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                  <TrendingDown className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm text-primary-700 font-medium">Total Reduction</p>
                  <p className="text-2xl font-bold text-primary-900">152.7 kg</p>
                  <p className="text-xs text-primary-600">CO₂e saved this year</p>
                </div>
              </div>
            </Card>
            
            <Card className="bg-secondary-50 border border-secondary-100">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mr-4">
                  <Award className="h-6 w-6 text-secondary-600" />
                </div>
                <div>
                  <p className="text-sm text-secondary-700 font-medium">Your Points</p>
                  <p className="text-2xl font-bold text-secondary-900">850</p>
                  <p className="text-xs text-secondary-600">150 points until next reward</p>
                </div>
              </div>
            </Card>
            
            <Card className="bg-accent-50 border border-accent-100">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mr-4">
                  <CalendarDays className="h-6 w-6 text-accent-600" />
                </div>
                <div>
                  <p className="text-sm text-accent-700 font-medium">Tracking Streak</p>
                  <p className="text-2xl font-bold text-accent-900">24 days</p>
                  <p className="text-xs text-accent-600">Keep it up!</p>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EmployeeDashboard;