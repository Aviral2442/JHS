// components/blog/AuthorCard.tsx
import React from 'react';
import { Author } from '../../../types/blog';
import { FaTwitter, FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';

interface AuthorCardProps {
  author: Author;
}

export const AuthorCard: React.FC<AuthorCardProps> = ({ author }) => {
  return (
    <div className="bg-linear-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="relative">
          <img
            src={author.avatar}
            alt={author.name}
            className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 shadow-lg"
          />
          <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            PRO
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {author.name}
              </h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mt-1">
                {author.role}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-3 text-sm">
                {author.bio}
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              {author.socialLinks.twitter && (
                <a
                  href={author.socialLinks.twitter}
                  className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label="Twitter"
                >
                  <FaTwitter className="w-5 h-5" />
                </a>
              )}
              {author.socialLinks.linkedin && (
                <a
                  href={author.socialLinks.linkedin}
                  className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="w-5 h-5" />
                </a>
              )}
              {author.socialLinks.github && (
                <a
                  href={author.socialLinks.github}
                  className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  aria-label="GitHub"
                >
                  <FaGithub className="w-5 h-5" />
                </a>
              )}
              {author.socialLinks.website && (
                <a
                  href={author.socialLinks.website}
                  className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                  aria-label="Website"
                >
                  <FaGlobe className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">42</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Articles</div>
            </div>
            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">12.5K</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Followers</div>
            </div>
            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">8.9K</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Likes</div>
            </div>
            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">3.2K</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Comments</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};