// src/components/Referral/ReferralDashboard.tsx
import React, { useState } from 'react';
import { Referral } from '../../../../types/index';
import { 
  Users, 
  Copy, 
  Share2, 
  TrendingUp, 
  Gift,
  Link,
  Download,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReferralStats from './ReferralStats';
import ReferredUsersTable from './ReferredUsersTable';

interface ReferralDashboardProps {
  referral: Referral;
}

const ReferralDashboard: React.FC<ReferralDashboardProps> = ({ referral }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'stats' | 'users'>('stats');
  
  const referralLink = `https://yourwebsite.com/ref/${referral.code}`;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const shareReferral = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join me!',
          text: `Use my referral code ${referral.code} to get started!`,
          url: referralLink,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Users className="w-6 h-6" style={{ color: 'var(--sky-blue)' }} />
              Referral Program
            </h3>
            <p className="dark:text-gray-400" style={{ color: 'var(--gray-color)' }}>
              Invite friends and earn rewards
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="dark:from-purple-900/30 dark:to-pink-900/30 px-4 py-2 rounded-lg" style={{ background: 'linear-gradient(to right, var(--background-alt), var(--background-alt))' }}>
              <div className="text-sm dark:text-gray-400" style={{ color: 'var(--gray-color)' }}>Commission Rate</div>
              <div className="text-xl font-bold dark:text-purple-300" style={{ color: 'var(--sky-blue)' }}>
                {referral.campaign.commissionRate}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Referral Code Section */}
      <div className="p-6 dark:from-purple-900/20 dark:to-blue-900/20" style={{ background: 'linear-gradient(to right, var(--background-alt), var(--background-alt))' }}>
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Your Referral Code
            </h4>
            <div className="flex items-center gap-3">
              <div className="bg-white dark:bg-gray-800 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 font-mono text-lg font-bold">
                {referral.code}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-4 py-3 text-white rounded-lg transition-colors"
                style={{ backgroundColor: 'var(--sky-blue)' }}
              >
                <Copy className="w-5 h-5" />
                {copied ? 'Copied!' : 'Copy Code'}
              </motion.button>
            </div>
          </div>
          
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={shareReferral}
              className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Share2 className="w-5 h-5" />
              Share
            </motion.button>
            <button className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Referral Link */}
        <div className="mt-4">
          <div className="text-sm dark:text-gray-400 mb-2" style={{ color: 'var(--gray-color)' }}>
            Your referral link:
          </div>
          <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-300 dark:border-gray-600">
            <Link className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              readOnly
              value={referralLink}
              className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex">
          <button
            onClick={() => setActiveTab('stats')}
            className="flex-1 px-6 py-4 font-medium"
            style={activeTab === 'stats' ? { color: 'var(--sky-blue)', borderBottom: '2px solid var(--sky-blue)' } : { color: 'var(--gray-color)' }}
          >
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Statistics
            </div>
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className="flex-1 px-6 py-4 font-medium"
            style={activeTab === 'users' ? { color: 'var(--sky-blue)', borderBottom: '2px solid var(--sky-blue)' } : { color: 'var(--gray-color)' }}
          >
            <div className="flex items-center justify-center gap-2">
              <Users className="w-5 h-5" />
              Referred Users ({referral.referrals.length})
            </div>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'stats' ? (
              <ReferralStats referral={referral} />
            ) : (
              <ReferredUsersTable referrals={referral.referrals} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Campaign Info */}
      <div className="p-6 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700" style={{ backgroundColor: 'var(--background-alt)' }}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <Gift className="w-6 h-6" style={{ color: 'var(--sky-blue)' }} />
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">
                {referral.campaign.name}
              </h4>
              <p className="text-sm dark:text-gray-400" style={{ color: 'var(--gray-color)' }}>
                Min withdrawal: ${referral.campaign.minWithdrawal}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm dark:text-gray-400" style={{ color: 'var(--gray-color)' }}>
            <Calendar className="w-4 h-4" />
            <span>Expires: {new Date(referral.campaign.expirationDate).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralDashboard;