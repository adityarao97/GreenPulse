import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingDown, Award, BarChart } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/ui/Card';
import FootprintChart from '../../components/charts/FootprintChart';
import CategoryBreakdown from '../../components/carbon/CategoryBreakdown';
import LeaderboardChart from '../../components/charts/LeaderboardChart';
import { Chatbot } from '../../components/chat/Chatbot';

const CompanyDashboard: React.FC = () => {
  const [chartPeriod, setChartPeriod] = useState<'daily' | 'weekly' | 'monthly'>('monthly');
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

  const leaderboardData = activityData?.companyLeaderboard?.map(company => ({
    name: company.company_id,
    footprint: company.total_emission,
    reduction: ((1000 - company.total_emission) / 1000) * 100 // Example calculation
  })) || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Company Dashboard</h1>
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
        {/* Summary stats */}
        <motion.div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-primary-50 border border-primary-100">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm text-primary-700 font-medium">Total Employees</p>
                  <p className="text-2xl font-bold text-primary-900">
                    {activityData?.top_3_users?.length || 0}
                  </p>
                  <p className="text-xs text-primary-600">Actively tracking</p>
                </div>
              </div>
            </Card>
            
            <Card className="bg-secondary-50 border border-secondary-100">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mr-4">
                  <TrendingDown className="h-6 w-6 text-secondary-600" />
                </div>
                <div>
                  <p className="text-sm text-secondary-700 font-medium">Total Emissions</p>
                  <p className="text-2xl font-bold text-secondary-900">
                    {activityData?.total_emission.toFixed(1)} kg
                  </p>
                  <p className="text-xs text-secondary-600">CO₂e this month</p>
                </div>
              </div>
            </Card>
            
            <Card className="bg-accent-50 border border-accent-100">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mr-4">
                  <BarChart className="h-6 w-6 text-accent-600" />
                </div>
                <div>
                  <p className="text-sm text-accent-700 font-medium">Company Ranking</p>
                  <p className="text-2xl font-bold text-accent-900">
                    {activityData?.companyLeaderboard?.findIndex(
                      c => c.company_id === user?.name
                    ) + 1 || '-'}
                  </p>
                  <p className="text-xs text-accent-600">
                    out of {activityData?.companyLeaderboard?.length || 0} companies
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>
        
        {/* Chart card */}
        <motion.div className="lg:col-span-2">
          <Card className="h-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Footprint Trend</h3>
            <FootprintChart 
              data={chartData}
              period={chartPeriod}
              height={280}
            />
          </Card>
        </motion.div>
        
        {/* Category breakdown */}
        <motion.div className="lg:col-span-1">
          <CategoryBreakdown data={categoryData} />
        </motion.div>
        
        {/* Leaderboard chart */}
        <motion.div className="lg:col-span-2">
          <Card className="h-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Leaderboard</h3>
            <p className="text-sm text-gray-500 mb-4">Top companies by carbon reduction percentage</p>
            <LeaderboardChart data={leaderboardData} height={280} />
          </Card>
        </motion.div>
      </motion.div>

      {/* Chatbot */}
      {user && (
        <Chatbot 
          userType="company"
          identifier={user.name}
        />
      )}
    </div>
  );
};

export default CompanyDashboard;