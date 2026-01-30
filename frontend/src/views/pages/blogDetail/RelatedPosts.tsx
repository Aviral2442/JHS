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
    <div className="rounded-2xl border dark:border-gray-700 p-8" style={{ background: 'linear-gradient(to bottom right, var(--background-alt), var(--white-color))', borderColor: 'var(--background-alt)' }}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold dark:text-white" style={{ color: 'var(--black-color)' }}>
            🔥 Related Articles
          </h2>
          <p className="dark:text-gray-400 mt-2" style={{ color: 'var(--gray-color)' }}>
            Dive deeper into related topics
          </p>
        </div>
        <HiFire className="w-8 h-8" style={{ color: 'var(--sky-blue)' }} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article
            key={post.id}
            className="group bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            style={{ borderColor: 'var(--background-alt)' }}
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
              <div className="flex items-center gap-4 text-sm dark:text-gray-400 mb-3" style={{ color: 'var(--gray-color)' }}>
                <div className="flex items-center gap-2">
                  <FaUser className="w-3 h-3" />
                  <span>{post.author.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="w-3 h-3" />
                  <span>{post.readTime} min read</span>
                </div>
              </div>
              
              <h3 className="font-bold dark:text-white text-lg transition-colors line-clamp-2" style={{ color: 'var(--black-color)' }}>
                {post.title}
              </h3>
              
              <p className="dark:text-gray-400 mt-2 text-sm line-clamp-3" style={{ color: 'var(--gray-color)' }}>
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between mt-6">
                <span className="text-xs font-medium px-3 py-1 dark:bg-blue-900/30 rounded-full" style={{ backgroundColor: 'var(--background-alt)', color: 'var(--sky-blue)' }}>
                  React
                </span>
                <button className="text-sm font-medium dark:text-gray-300 transition-colors" style={{ color: 'var(--gray-color)' }}>
                  Read →
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
};