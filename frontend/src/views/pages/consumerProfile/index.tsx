// src/pages/ConsumerProfile.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Menu,
} from 'lucide-react';
import UserProfileCard from './components/UserProfileCard';
import WalletCard from './components/WalletCard';
import ReferralDashboard from './components/ReferralDashboard';
import TransactionHistory from './components/TransactionHistory';
import UpdateProfileForm from './components/UpdateProfileForm';
import { 
  User, 
  Wallet, 
  Referral, 
   
} from '../../../types/index';

const ConsumerProfile: React.FC = () => {
  const [_sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'overview' | 'transactions' | 'referrals'>('overview');
  const [showEditProfile, setShowEditProfile] = useState(false);
  
  // Mock data
  const user: User = {
    id: 'USR001',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    joinDate: '2022-03-15',
    membership: 'Gold',
    verified: true
  };

  const wallet: Wallet = {
    balance: 2450.75,
    currency: 'USD',
    totalEarned: 5200.50,
    totalSpent: 2749.75,
    transactions: [
      {
        id: 'TX001',
        type: 'credit',
        amount: 500,
        description: 'Wallet Top-up',
        date: '2024-01-15',
        status: 'completed',
        category: 'Deposit'
      },
      {
        id: 'TX002',
        type: 'referral',
        amount: 100,
        description: 'Referral Bonus - John Doe',
        date: '2024-01-14',
        status: 'completed',
        category: 'Referral'
      },
      {
        id: 'TX003',
        type: 'purchase',
        amount: 149.25,
        description: 'Online Shopping',
        date: '2024-01-13',
        status: 'completed',
        category: 'Shopping'
      },
      {
        id: 'TX004',
        type: 'debit',
        amount: 200,
        description: 'Withdrawal',
        date: '2024-01-12',
        status: 'pending',
        category: 'Withdrawal'
      }
    ]
  };

  const referral: Referral = {
    id: 'REF001',
    code: 'ALEX50',
    totalEarnings: 1250.50,
    totalReferrals: 8,
    pendingAmount: 150,
    referrals: [
      {
        id: 'REF001-1',
        name: 'John Doe',
        email: 'john@example.com',
        joinDate: '2024-01-10',
        status: 'active',
        earnedAmount: 50
      },
      {
        id: 'REF001-2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        joinDate: '2024-01-08',
        status: 'active',
        earnedAmount: 75
      },
      {
        id: 'REF001-3',
        name: 'Bob Wilson',
        email: 'bob@example.com',
        joinDate: '2024-01-05',
        status: 'pending',
        earnedAmount: 25
      }
    ],
    campaign: {
      name: 'Winter Referral Program',
      commissionRate: 15,
      minWithdrawal: 20,
      expirationDate: '2024-03-31'
    }
  };

  const handleAddFunds = () => {
    // Implement add funds logic
    console.log('Add funds clicked');
  };

  const handleWithdraw = () => {
    // Implement withdraw logic
    console.log('Withdraw clicked');
  };

  const handleEditProfile = () => {
    setShowEditProfile(true);
  };

  return (
    <div className="min-h-screen dark:bg-gray-900" style={{ backgroundColor: 'var(--background-alt)' }}>

      {/* Update Profile Modal */}
      {showEditProfile && (
        <UpdateProfileForm
          onClose={() => setShowEditProfile(false)}
          onSuccess={() => {
            // Optionally refresh profile data here
          }}
        />
      )}

      <div className="max-w-[90%] mx-auto px-4 py-8">
        <div className="gap-8">
          <main className="">
            {activeSection === 'overview' ? (
              <>
                {/* Welcome Banner */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8"
                >
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Welcome back, {user.name}!
                  </h2>
                  <p className="dark:text-gray-400" style={{ color: 'var(--gray-color)' }}>
                    Here's your account overview and recent activities
                  </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column - Profile */}
                  <div className="lg:col-span-1">
                    <UserProfileCard
                      user={user}
                      wallet={wallet}
                      onEditProfile={handleEditProfile}
                    />
                  </div>

                  {/* Right Column - Wallet & Referrals */}
                  <div className="lg:col-span-2 space-y-8">
                    <WalletCard
                      wallet={wallet}
                      onAddFunds={handleAddFunds}
                      onWithdraw={handleWithdraw}
                      onViewTransactions={() => setActiveSection('transactions')}
                    />
                    
                    <ReferralDashboard referral={referral} />
                  </div>
                </div>
              </>
            ) : activeSection === 'transactions' ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Transaction History
                  </h2>
                  <p className="dark:text-gray-400" style={{ color: 'var(--gray-color)' }}>
                    View and manage all your wallet transactions
                  </p>
                </div>
                <TransactionHistory transactions={wallet.transactions} />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Referral Program
                  </h2>
                  <p className="dark:text-gray-400" style={{ color: 'var(--gray-color)' }}>
                    Track your referral earnings and manage referrals
                  </p>
                </div>
                <ReferralDashboard referral={referral} />
              </motion.div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-around items-center h-16">
          <button
            onClick={() => setActiveSection('overview')}
            className="flex flex-col items-center p-2 dark:text-blue-400"
            style={{ color: activeSection === 'overview' ? 'var(--sky-blue)' : 'var(--gray-color)' }}
          >
            <div className="w-6 h-6 mb-1">📊</div>
            <span className="text-xs">Overview</span>
          </button>
          <button
            onClick={() => setActiveSection('transactions')}
            className="flex flex-col items-center p-2 dark:text-blue-400"
            style={{ color: activeSection === 'transactions' ? 'var(--sky-blue)' : 'var(--gray-color)' }}
          >
            <div className="w-6 h-6 mb-1">💳</div>
            <span className="text-xs">Transactions</span>
          </button>
          <button
            onClick={() => setActiveSection('referrals')}
            className="flex flex-col items-center p-2 dark:text-blue-400"
            style={{ color: activeSection === 'referrals' ? 'var(--sky-blue)' : 'var(--gray-color)' }}
          >
            <div className="w-6 h-6 mb-1">👥</div>
            <span className="text-xs">Referrals</span>
          </button>
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex flex-col items-center p-2 dark:text-gray-400"
            style={{ color: 'var(--gray-color)' }}
          >
            <Menu className="w-6 h-6 mb-1" />
            <span className="text-xs">Menu</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsumerProfile;