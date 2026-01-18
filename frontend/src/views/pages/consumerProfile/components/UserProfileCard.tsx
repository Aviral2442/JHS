// src/components/Profile/UserProfileCard.tsx
import React, { useState } from "react";
import { User, Wallet } from "../../../../types/index";
import {
  Edit3,
  Camera,
  CheckCircle,
  Shield,
  Calendar,
  Mail,
  Phone,
  Award,
  Star,
} from "lucide-react";

interface UserProfileCardProps {
  user: User;
  wallet: Wallet;
  onEditProfile: () => void;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  user,
  onEditProfile,
}) => {
  const [_isEditingAvatar, setIsEditingAvatar] = useState(false);

  const membershipColors = {
    Gold: "bg-gradient-to-r from-yellow-400 to-orange-500",
    Silver: "bg-gradient-to-r from-gray-300 to-gray-400",
    Platinum: "bg-gradient-to-r from-purple-400 to-blue-500",
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Profile header with gradient */}
      <div className={`h-32 ${membershipColors[user.membership]} relative`}>
        <button
          onClick={onEditProfile}
          className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2 rounded-lg shadow-lg hover:scale-105 transition-transform"
        >
          <Edit3 className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
      </div>

      {/* Profile content */}
      <div className="px-6 pb-6">
        {/* Avatar section */}
        <div className="relative -mt-16 mb-4">
          <div className="relative w-32 h-32 mx-auto">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-lg"
            />
            <button
              onClick={() => setIsEditingAvatar(true)}
              className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* User info */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {user.name}
            </h2>
            {user.verified && (
              <CheckCircle
                className="w-6 h-6 text-green-500"
                fill="currentColor"
              />
            )}
          </div>

          <div className="flex items-center justify-center gap-4 text-gray-600 dark:text-gray-400 mb-4">
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>{user.phone}</span>
            </div>
          </div>

          {/* Membership badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${membershipColors[user.membership]} text-white font-semibold mb-4`}
          >
            <Award className="w-5 h-5" />
            {user.membership} Member
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Member Since
              </span>
            </div>
            <p className="font-semibold text-gray-900 dark:text-white">
              {new Date(user.joinDate).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Trust Score
              </span>
            </div>
            <p className="font-semibold text-gray-900 dark:text-white">
              4.8/5.0
            </p>
          </div>
        </div>

        {/* Security status */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl border border-green-100 dark:border-green-800">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Account Security
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                All security features are enabled
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
