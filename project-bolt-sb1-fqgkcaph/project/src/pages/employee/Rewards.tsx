import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Gift, Award, Trophy, Bike, Leaf, Utensils, Recycle, Sun } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface RewardData {
  user_id: string;
  current_streak: number;
  last_logged_date: string;
  total_points: number;
  total_emission_saved: number;
  badges_unlocked: string[];
  walking_km: number;
  plastic_kg: number;
  glass_kg: number;
  vegan_meals: number;
  solar_logs: number;
}

const EmployeeRewards = () => {
  const [rewardData, setRewardData] = useState<RewardData | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchRewardData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8006/reward?user_id=${user?.name || 'user1'}`);
        const data = await response.json();
        setRewardData(data);
      } catch (error) {
        console.error('Error fetching reward data:', error);
      }
    };

    fetchRewardData();
  }, [user]);

  const rewards = [
    {
      id: 1,
      title: 'Green Commuter',
      description: 'Walk or cycle for a total of 50km',
      requiredPoints: 100,
      icon: <Bike className="w-6 h-6 text-blue-500" />,
      status: (rewardData?.total_points || 0) >= 100 ? 'achieved' : 'in-progress',
    },
    {
      id: 2,
      title: 'Recycling Champion',
      description: 'Recycle 10kg of plastic and glass',
      requiredPoints: 200,
      icon: <Recycle className="w-6 h-6 text-green-500" />,
      status: (rewardData?.total_points || 0) >= 200 ? 'achieved' : 'in-progress',
    },
    {
      id: 3,
      title: 'Plant-Based Pioneer',
      description: 'Choose 20 vegan meals',
      requiredPoints: 300,
      icon: <Utensils className="w-6 h-6 text-yellow-500" />,
      status: (rewardData?.total_points || 0) >= 300 ? 'achieved' : 'in-progress',
    },
    {
      id: 4,
      title: 'Solar Supporter',
      description: 'Log 5 days of solar power usage',
      requiredPoints: 400,
      icon: <Sun className="w-6 h-6 text-orange-500" />,
      status: (rewardData?.total_points || 0) >= 400 ? 'achieved' : 'in-progress',
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
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="font-semibold">{rewardData?.total_points || 0} Points</span>
          </div>
          <div className="flex items-center space-x-2">
            <Leaf className="w-5 h-5 text-green-500" />
            <span className="font-semibold">{rewardData?.total_emission_saved.toFixed(1)} kg CO₂e saved</span>
          </div>
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
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <Badge
                      variant={
                        reward.status === 'achieved' ? 'success' :
                        reward.status === 'in-progress' ? 'warning' : 'secondary'
                      }
                    >
                      {reward.status === 'achieved' ? 'Achieved' :
                       reward.status === 'in-progress' ? 'In Progress' : 'Locked'}
                    </Badge>
                    <span className="text-sm font-medium text-gray-600">{reward.requiredPoints} points required</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${Math.min(((rewardData?.total_points || 0) / reward.requiredPoints) * 100, 100)}%` 
                      }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 text-right">
                    {rewardData?.total_points || 0} / {reward.requiredPoints} points
                  </div>
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

      {/* Current Streak */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Current Streak</h3>
            <p className="text-sm text-gray-600">Keep logging your activities daily to maintain your streak!</p>
          </div>
          <div className="flex items-center space-x-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <span className="text-2xl font-bold text-gray-900">{rewardData?.current_streak || 0}</span>
            <span className="text-gray-600">days</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default EmployeeRewards;