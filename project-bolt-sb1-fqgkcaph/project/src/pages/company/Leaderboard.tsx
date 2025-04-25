import React from 'react';
import LeaderboardChart from '../../components/charts/LeaderboardChart';
import { Card } from '../../components/ui/Card';

const CompanyLeaderboard = () => {
  // Mock data for the chart
  const mockData = [
    { name: 'Company A', footprint: 1200, reduction: 25 },
    { name: 'Company B', footprint: 800, reduction: 35 },
    { name: 'Company C', footprint: 1500, reduction: 15 },
    { name: 'Company D', footprint: 950, reduction: 30 },
    { name: 'Company E', footprint: 1100, reduction: 20 },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Company Leaderboard</h1>
      
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Employee Rankings</h2>
        <LeaderboardChart data={mockData} />
      </Card>
    </div>
  );
};

export default CompanyLeaderboard;