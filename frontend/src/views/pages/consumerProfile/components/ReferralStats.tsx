// src/components/Referral/ReferralStats.tsx
import React from 'react';
import { Referral } from '../../../../types/index';
import { TrendingUp, Target, Clock, DollarSign } from 'lucide-react';

interface ReferralStatsProps {
  referral: Referral;
}

const ReferralStats: React.FC<ReferralStatsProps> = ({ referral }) => {
  const stats = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      label: 'Total Earnings',
      value: `$${referral.totalEarnings.toLocaleString()}`,
      color: 'text-green-600 bg-green-100 dark:bg-green-900/30',
      change: '+12.5%',
      trend: 'up'
    },
    {
      icon: <Target className="w-6 h-6" />,
      label: 'Successful Referrals',
      value: referral.totalReferrals,
      color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30',
      change: '+8',
      trend: 'up'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      label: 'Pending Earnings',
      value: `$${referral.pendingAmount}`,
      color: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30',
      change: 'Processing',
      trend: 'neutral'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: 'Conversion Rate',
      value: '68%',
      color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30',
      change: '+5.2%',
      trend: 'up'
    }
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${stat.color}`}>
                {stat.icon}
              </div>
              <span className={`text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 
                stat.trend === 'down' ? 'text-red-600' : 'text-yellow-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Earnings Chart Placeholder */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
          Earnings Over Time
        </h4>
        <div className="h-64 flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              Chart visualization would show earnings growth over months
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralStats;