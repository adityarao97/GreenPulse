import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, TrendingDown, Award } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/ui/Card';
import FootprintChart from '../../components/charts/FootprintChart';
import FootprintSummary from '../../components/carbon/FootprintSummary';
import CategoryBreakdown from '../../components/carbon/CategoryBreakdown';
import SuggestionCard from '../../components/carbon/SuggestionCard';
import { Chatbot } from '../../components/chat/Chatbot';

const EmployeeDashboard: React.FC = () => {
  const [chartPeriod, setChartPeriod] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const { user, fetchActivityData } = useAuth();
  const activityData = user?.activityData;

  useEffect(() => {
    fetchActivityData();
  }, []);

  // Transform activity data for components
  const categoryData = activityData ? Object.entries(activityData.activity_type_breakdown).map(([category, value]) => ({
    category: category.charAt(0).toUpperCase() + category.slice(1),
    value
  })) : [];

  const chartData = activityData ? activityData[`${chartPeriod}_emission_breakdown`].map(item => ({
    date: item.start,
    value: item.emission
  })) : [];

  // Get current and previous values for summary
  const currentValue = activityData?.total_emission || 0;
  const previousValue = currentValue * 1.1; // Example: assuming 10% higher last period

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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <motion.div className="lg:col-span-1">
          <FootprintSummary
            currentValue={currentValue}
            previousValue={previousValue}
            target={currentValue * 0.9} // Example: target is 10% reduction
            period={`this ${chartPeriod.slice(0, -2)}${chartPeriod === 'daily' ? '' : 'week'}`}
          />
        </motion.div>
        
        <motion.div className="lg:col-span-2">
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
              data={chartData}
              period={chartPeriod}
              height={280}
            />
          </Card>
        </motion.div>
        
        <motion.div className="lg:col-span-1">
          <CategoryBreakdown data={categoryData} />
        </motion.div>
      </motion.div>

      {/* Chatbot */}
      {user && (
        <Chatbot 
          userType="employee"
          identifier={user.name}
        />
      )}
    </div>
  );
};

export default EmployeeDashboard;