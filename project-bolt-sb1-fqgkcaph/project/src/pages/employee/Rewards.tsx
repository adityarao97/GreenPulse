import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Gift, Award, Trophy } from 'lucide-react';

const EmployeeRewards = () => {
  const rewards = [
    {
      id: 1,
      title: 'Green Commuter',
      description: 'Used eco-friendly transportation for 30 days straight',
      points: 500,
      icon: <Trophy className="w-6 h-6 text-yellow-500" />,
      status: 'achieved'
    },
    {
      id: 2,
      title: 'Energy Saver',
      description: 'Reduced energy consumption by 20% this month',
      points: 300,
      icon: <Award className="w-6 h-6 text-blue-500" />,
      status: 'in-progress'
    },
    {
      id: 3,
      title: 'Zero Waste Hero',
      description: 'Maintained zero waste for a week',
      points: 200,
      icon: <Gift className="w-6 h-6 text-green-500" />,
      status: 'locked'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-6 space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Rewards</h1>
        <div className="flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="font-semibold">1000 Points</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((reward) => (
          <Card key={reward.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  {reward.icon}
                  <h3 className="text-lg font-semibold text-gray-900">{reward.title}</h3>
                </div>
                <p className="mt-2 text-sm text-gray-600">{reward.description}</p>
                <div className="mt-4 flex items-center space-x-2">
                  <Badge
                    variant={
                      reward.status === 'achieved' ? 'success' :
                      reward.status === 'in-progress' ? 'warning' : 'secondary'
                    }
                  >
                    {reward.status === 'achieved' ? 'Achieved' :
                     reward.status === 'in-progress' ? 'In Progress' : 'Locked'}
                  </Badge>
                  <span className="text-sm font-medium text-gray-600">{reward.points} points</span>
                </div>
              </div>
            </div>
            {reward.status === 'achieved' && (
              <Button className="mt-4 w-full" variant="outline">
                Claim Reward
              </Button>
            )}
          </Card>
        ))}
      </div>
    </motion.div>
  );
};

export default EmployeeRewards;