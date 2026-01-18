// src/components/Wallet/WalletCard.tsx
import React, { useState } from 'react';
import { Wallet } from '../../../../types/index';
import { 
  Wallet as WalletIcon, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Plus, 
  Send,
  TrendingUp,
  Eye,
  EyeOff
} from 'lucide-react';
import { motion } from 'framer-motion';

interface WalletCardProps {
  wallet: Wallet;
  onAddFunds: () => void;
  onWithdraw: () => void;
  onViewTransactions: () => void;
}

const WalletCard: React.FC<WalletCardProps> = ({ 
  wallet, 
  onAddFunds, 
  onWithdraw,
  onViewTransactions 
}) => {
  const [showBalance, setShowBalance] = useState(true);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: wallet.currency
    }).format(amount);
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-2xl overflow-hidden">
      <div className="p-6 text-white">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <WalletIcon className="w-8 h-8" />
            <div>
              <h3 className="text-lg font-semibold">Digital Wallet</h3>
              <p className="text-blue-100 text-sm">Available Balance</p>
            </div>
          </div>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {showBalance ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        {/* Balance */}
        <div className="mb-8">
          <motion.div
            key={showBalance ? 'visible' : 'hidden'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-2"
          >
            {showBalance ? formatCurrency(wallet.balance) : '••••••'}
          </motion.div>
          <div className="flex items-center gap-4 text-blue-100">
            <div className="flex items-center gap-1">
              <ArrowUpRight className="w-4 h-4" />
              <span>Earned: {formatCurrency(wallet.totalEarned)}</span>
            </div>
            <div className="flex items-center gap-1">
              <ArrowDownLeft className="w-4 h-4" />
              <span>Spent: {formatCurrency(wallet.totalSpent)}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAddFunds}
            className="bg-white/20 backdrop-blur-sm p-4 rounded-xl flex flex-col items-center gap-2 hover:bg-white/30 transition-colors"
          >
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">Add Funds</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onWithdraw}
            className="bg-white/20 backdrop-blur-sm p-4 rounded-xl flex flex-col items-center gap-2 hover:bg-white/30 transition-colors"
          >
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Send className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">Withdraw</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onViewTransactions}
            className="bg-white/20 backdrop-blur-sm p-4 rounded-xl flex flex-col items-center gap-2 hover:bg-white/30 transition-colors"
          >
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">History</span>
          </motion.button>
        </div>

        {/* Recent transactions preview */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold">Recent Activity</h4>
            <button 
              onClick={onViewTransactions}
              className="text-sm text-blue-200 hover:text-white"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {wallet.transactions.slice(0, 2).map((transaction) => (
              <div key={transaction.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-xs text-blue-200">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
                <div className={`font-semibold ${
                  transaction.type === 'credit' || transaction.type === 'referral'
                    ? 'text-green-300'
                    : 'text-red-300'
                }`}>
                  {transaction.type === 'credit' || transaction.type === 'referral' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletCard;