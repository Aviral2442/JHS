// components/blog/CommentSection.tsx
import React, { useState } from 'react';
import { Comment } from '../../../types/blog';
import { FaCrown } from 'react-icons/fa';

interface CommentSectionProps {
  comments: Comment[];
}

export const CommentSection: React.FC<CommentSectionProps> = ({ comments }) => {
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const CommentItem: React.FC<{ comment: Comment; depth?: number }> = ({ comment, depth = 0 }) => {


    return (
      <div className={`${depth > 0 ? 'ml-6 md:ml-12 pt-6' : 'py-6'} border-b dark:border-gray-800 last:border-0`} style={{ borderColor: 'var(--background-alt)' }}>
        <div className="flex gap-4">
          <div className="shrink-0">
            <img
              src={comment.author.avatar}
              alt={comment.author.name}
              className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-800"
            />
            {comment.author.role === 'admin' && (
              <div className="mt-2 text-center">
                <FaCrown className="w-4 h-4 mx-auto" style={{ color: 'var(--sky-blue)' }} />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold dark:text-white" style={{ color: 'var(--black-color)' }}>
                    {comment.author.name}
                  </h4>
                  {comment.author.role && (
                    <span className="px-2 py-1 dark:bg-blue-900/30 text-xs font-medium rounded-full" style={{ backgroundColor: 'var(--background-alt)', color: 'var(--sky-blue)' }}>
                      {comment.author.role}
                    </span>
                  )}
                </div>
                <p className="text-sm dark:text-gray-400 mt-1" style={{ color: 'var(--gray-color)' }}>
                  {new Date(comment.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
              
            </div>
            
            <p className="mt-4 dark:text-gray-300 leading-relaxed" style={{ color: 'var(--gray-color)' }}>
              {comment.content}
            </p>
            
            {replyingTo === comment.id && (
              <div className="mt-4 p-4 dark:bg-gray-800/50 rounded-xl" style={{ backgroundColor: 'var(--background-alt)' }}>
                <textarea
                  placeholder="Write your reply..."
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg focus:ring-2 focus:border-transparent outline-none resize-none"
                  style={{ borderColor: 'var(--gray-color)' }}
                  rows={3}
                />
                <div className="flex justify-end gap-3 mt-3">
                  <button
                    onClick={() => setReplyingTo(null)}
                    className="px-4 py-2 text-sm font-medium dark:text-gray-300 rounded-lg"
                    style={{ color: 'var(--gray-color)' }}
                  >
                    Cancel
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-white rounded-lg" style={{ backgroundColor: 'var(--sky-blue)' }}>
                    Post Reply
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border dark:border-gray-700 p-6 md:p-8" style={{ borderColor: 'var(--background-alt)' }}>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold dark:text-white" style={{ color: 'var(--black-color)' }}>
          💬 Discussion ({comments.length})
        </h2>
      </div>

      {/* New Comment Form */}
      <div className="mb-8 p-6 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-2xl" style={{ background: 'linear-gradient(to right, var(--background-alt), var(--background-alt))' }}>
        <h3 className="text-lg font-semibold dark:text-white mb-4" style={{ color: 'var(--black-color)' }}>
          Join the discussion
        </h3>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts..."
          className="w-full px-4 py-3 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg focus:ring-2 focus:border-transparent outline-none resize-none"
          style={{ borderColor: 'var(--gray-color)' }}
          rows={4}
        />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
          <div className="flex items-center gap-4">
          </div>
          <button className="px-6 py-3 text-white font-medium rounded-lg" style={{ backgroundColor: 'var(--sky-blue)' }}>
            Post Comment
          </button>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-2">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-8">
        <button className="px-6 py-3 border dark:border-gray-600 dark:text-gray-300 rounded-lg font-medium" style={{ borderColor: 'var(--gray-color)', color: 'var(--gray-color)' }}>
          Load More Comments
        </button>
      </div>
    </div>
  );
};