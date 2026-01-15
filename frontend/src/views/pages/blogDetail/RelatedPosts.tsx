// components/blog/RelatedPosts.tsx
import React from 'react';
import { RelatedPost } from '../../../types/blog';
import { FaClock, FaUser } from 'react-icons/fa';
import { HiFire } from 'react-icons/hi';

interface RelatedPostsProps {
  posts: RelatedPost[];
}

export const RelatedPosts: React.FC<RelatedPostsProps> = ({ posts }) => {
  return (
    <div className="bg-linear-to-br from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            🔥 Related Articles
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Dive deeper into related topics
          </p>
        </div>
        <HiFire className="w-8 h-8 text-orange-500" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article
            key={post.id}
            className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="relative overflow-hidden h-48">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            <div className="p-6">
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                <div className="flex items-center gap-2">
                  <FaUser className="w-3 h-3" />
                  <span>{post.author.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="w-3 h-3" />
                  <span>{post.readTime} min read</span>
                </div>
              </div>
              
              <h3 className="font-bold text-gray-900 dark:text-white text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                {post.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm line-clamp-3">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between mt-6">
                <span className="text-xs font-medium px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                  React
                </span>
                <button className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Read →
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 p-6 bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Want more content like this?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Subscribe to our newsletter for weekly insights and tutorials
            </p>
          </div>
          <div className="flex gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none min-w-62.5"
            />
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};