// src/pages/ConsumerProfile.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Settings, 
  HelpCircle,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import UserProfileCard from './components/UserProfileCard';
import WalletCard from './components/WalletCard';
import ReferralDashboard from './components/ReferralDashboard';
import TransactionHistory from './components/TransactionHistory';
import { 
  User, 
  Wallet, 
  Referral, 
  Transaction 
} from '../../../types/index';

const ConsumerProfile: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'overview' | 'transactions' | 'referrals'>('overview');
  
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
    // Implement edit profile logic
    console.log('Edit profile clicked');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                My Profile
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <Settings className="w-6 h-6" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                <LogOut className="w-5 h-5" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Mobile Drawer */}
          <motion.aside
            initial={false}
            animate={{
              x: sidebarOpen ? 0 : '-100%',
              opacity: sidebarOpen ? 1 : 0
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 shadow-xl lg:shadow-none lg:bg-transparent lg:w-1/4 lg:block ${
              sidebarOpen ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="h-full p-6 lg:p-0">
              {/* Navigation */}
              <nav className="space-y-2">
                <button
                  onClick={() => {
                    setActiveSection('overview');
                    setSidebarOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${
                    activeSection === 'overview'
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Overview Dashboard
                </button>
                <button
                  onClick={() => {
                    setActiveSection('transactions');
                    setSidebarOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${
                    activeSection === 'transactions'
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Transaction History
                </button>
                <button
                  onClick={() => {
                    setActiveSection('referrals');
                    setSidebarOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${
                    activeSection === 'referrals'
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Referral Program
                </button>
                
                {/* Additional menu items */}
                <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
                  <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    Security Settings
                  </button>
                  <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    Notification Preferences
                  </button>
                  <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    Privacy Settings
                  </button>
                </div>
              </nav>
              
              {/* Help section */}
              <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <h4 className="font-semibold">Need Help?</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Our support team is here 24/7
                </p>
                <button className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600">
                  Contact Support
                </button>
              </div>
            </div>
          </motion.aside>

          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-30 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main content */}
          <main className="flex-1">
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
                  <p className="text-gray-600 dark:text-gray-400">
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
                  <p className="text-gray-600 dark:text-gray-400">
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
                  <p className="text-gray-600 dark:text-gray-400">
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
            className={`flex flex-col items-center p-2 ${
              activeSection === 'overview'
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <div className="w-6 h-6 mb-1">📊</div>
            <span className="text-xs">Overview</span>
          </button>
          <button
            onClick={() => setActiveSection('transactions')}
            className={`flex flex-col items-center p-2 ${
              activeSection === 'transactions'
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <div className="w-6 h-6 mb-1">💳</div>
            <span className="text-xs">Transactions</span>
          </button>
          <button
            onClick={() => setActiveSection('referrals')}
            className={`flex flex-col items-center p-2 ${
              activeSection === 'referrals'
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <div className="w-6 h-6 mb-1">👥</div>
            <span className="text-xs">Referrals</span>
          </button>
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex flex-col items-center p-2 text-gray-600 dark:text-gray-400"
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