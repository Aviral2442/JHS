// components/blog/BlogActions.tsx
import React, { useState } from 'react';
import {
  FaBookmark,
  FaShareAlt,
  FaPrint,
  FaFont,
  FaMoon,
  FaSun,
  FaHeart,
  FaEye,
} from 'react-icons/fa';
import { HiDownload, HiBookOpen } from 'react-icons/hi';

interface BlogActionsProps {
  onFontSizeChange: (size: string) => void;
  onThemeToggle: () => void;
  isBookmarked: boolean;
  onBookmarkToggle: () => void;
  likes: number;
  onLikeToggle: () => void;
  views: number;
}

export const BlogActions: React.FC<BlogActionsProps> = ({
  onFontSizeChange,
  onThemeToggle,
  isBookmarked,
  onBookmarkToggle,
  likes,
  onLikeToggle,
  views,
}) => {
  const [fontSize, setFontSize] = useState('medium');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(likes);

  const handleFontSizeChange = (size: string) => {
    setFontSize(size);
    onFontSizeChange(size);
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    onThemeToggle();
  };

  const handleLike = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setCurrentLikes(newLikedState ? currentLikes + 1 : currentLikes - 1);
    onLikeToggle();
  };

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden xl:block">
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-2xl p-4">
        <div className="space-y-6">
          {/* Reading Stats */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
              <FaEye className="w-4 h-4" />
              <span className="text-sm font-medium">{views.toLocaleString()} views</span>
            </div>
            <div className="w-24 h-24 relative">
              <svg className="w-24 h-24" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="3"
                  strokeDasharray="75, 100"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">75%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Read</div>
                </div>
              </div>
            </div>
          </div>

          {/* Like Button */}
          <button
            onClick={handleLike}
            className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center transition-all ${
              isLiked
                ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <FaHeart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            <span className="text-xs font-bold mt-1">{currentLikes}</span>
          </button>

          {/* Bookmark Button */}
          <button
            onClick={onBookmarkToggle}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
              isBookmarked
                ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <FaBookmark className="w-5 h-5" />
          </button>

          {/* Font Size Controls */}
          <div className="space-y-2">
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 text-center">
              Font Size
            </div>
            <div className="flex flex-col items-center gap-2">
              {['small', 'medium', 'large'].map((size) => (
                <button
                  key={size}
                  onClick={() => handleFontSizeChange(size)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    fontSize === size
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <FaFont className="w-3 h-3" />
                </button>
              ))}
            </div>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={handleThemeToggle}
            className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition-colors"
          >
            {isDarkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
          </button>

          {/* Share Button */}
          <button className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition-colors">
            <FaShareAlt className="w-5 h-5" />
          </button>

          {/* Print Button */}
          <button className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition-colors">
            <FaPrint className="w-5 h-5" />
          </button>

          {/* Download PDF */}
          <button className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition-colors">
            <HiDownload className="w-5 h-5" />
          </button>

          {/* Reading Mode */}
          <button className="w-12 h-12 rounded-xl bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center transition-colors">
            <HiBookOpen className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};