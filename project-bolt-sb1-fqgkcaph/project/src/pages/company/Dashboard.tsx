import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingDown, Award, BarChart } from 'lucide-react';
import { mockFootprintData, mockEmployees, mockCompanies } from '../../data/mockData';
import Card from '../../components/ui/Card';
import FootprintChart from '../../components/charts/FootprintChart';
import ProgressBar from '../../components/ui/ProgressBar';
import LeaderboardChart from '../../components/charts/LeaderboardChart';

const CompanyDashboard: React.FC = () => {
  const [chartPeriod, setChartPeriod] = useState<'daily' | 'weekly' | 'monthly'>('monthly');
  
  // Get company data (first company from mock data)
  const companyData = mockCompanies[0];
  
  // Calculate averages
  const avgFootprint = mockEmployees.reduce((sum, emp) => sum + emp.footprint, 0) / mockEmployees.length;
  const avgReduction = mockEmployees.reduce((sum, emp) => sum + emp.reduction, 0) / mockEmployees.length;
  
  // Get top performers (employees with highest reduction)
  const topPerformers = [...mockEmployees]
    .sort((a, b) => b.reduction - a.reduction)
    .slice(0, 3);
  
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
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Summary stats */}
        <motion.div variants={itemVariants} className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-primary-50 border border-primary-100">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm text-primary-700 font-medium">Total Employees</p>
                  <p className="text-2xl font-bold text-primary-900">{companyData.employees}</p>
                  <p className="text-xs text-primary-600">{mockEmployees.length} actively tracking</p>
                </div>
              </div>
            </Card>
            
            <Card className="bg-secondary-50 border border-secondary-100">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mr-4">
                  <TrendingDown className="h-6 w-6 text-secondary-600" />
                </div>
                <div>
                  <p className="text-sm text-secondary-700 font-medium">Avg. Reduction</p>
                  <p className="text-2xl font-bold text-secondary-900">{companyData.reduction.toFixed(1)}%</p>
                  <p className="text-xs text-secondary-600">vs. industry average 8.2%</p>
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
                  <p className="text-2xl font-bold text-accent-900">2nd</p>
                  <p className="text-xs text-accent-600">out of 35 companies</p>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>
        
        {/* Chart card */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="h-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Footprint Trend</h3>
            <FootprintChart 
              data={mockFootprintData[chartPeriod]} 
              period={chartPeriod}
              height={280}
            />
          </Card>
        </motion.div>
        
        {/* Top performers */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <Card className="h-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performers</h3>
            <div className="space-y-4">
              {topPerformers.map((employee, index) => (
                <div key={employee.id} className="flex items-center space-x-3">
                  <div className="relative">
                    <img 
                      src={employee.avatar} 
                      alt={employee.name} 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {index === 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent-500 text-white rounded-full flex items-center justify-center text-xs">
                        1
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="font-medium text-gray-900">{employee.name}</p>
                      <p className="text-success-600 font-medium">{employee.reduction}%</p>
                    </div>
                    <div className="mt-1 flex justify-between text-xs text-gray-500">
                      <p>{employee.department}</p>
                      <p>{employee.points} points</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
        
        {/* Leaderboard chart */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="h-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Leaderboard</h3>
            <p className="text-sm text-gray-500 mb-4">Top companies by carbon reduction percentage</p>
            <LeaderboardChart data={mockCompanies} height={280} />
          </Card>
        </motion.div>
        
        {/* Department performance */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <Card className="h-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Performance</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-medium">Engineering</p>
                  <p className="text-sm text-success-600 font-medium">14.2%</p>
                </div>
                <ProgressBar 
                  value={14.2} 
                  max={25} 
                  color="primary" 
                  height={8}
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-medium">Marketing</p>
                  <p className="text-sm text-success-600 font-medium">18.5%</p>
                </div>
                <ProgressBar 
                  value={18.5} 
                  max={25} 
                  color="secondary" 
                  height={8}
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-medium">Finance</p>
                  <p className="text-sm text-success-600 font-medium">9.7%</p>
                </div>
                <ProgressBar 
                  value={9.7} 
                  max={25} 
                  color="accent" 
                  height={8}
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-medium">HR</p>
                  <p className="text-sm text-success-600 font-medium">12.3%</p>
                </div>
                <ProgressBar 
                  value={12.3} 
                  max={25} 
                  color="success" 
                  height={8}
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-medium">Operations</p>
                  <p className="text-sm text-success-600 font-medium">11.8%</p>
                </div>
                <ProgressBar 
                  value={11.8} 
                  max={25} 
                  color="warning" 
                  height={8}
                />
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CompanyDashboard;