// components/blog/CommentSection.tsx
import React, { useState } from 'react';
import { Comment } from '../../types/blog';
import { FaHeart, FaReply, FaShare, FaCrown } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';

interface CommentSectionProps {
  comments: Comment[];
}

export const CommentSection: React.FC<CommentSectionProps> = ({ comments }) => {
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const CommentItem: React.FC<{ comment: Comment; depth?: number }> = ({ comment, depth = 0 }) => {
    const [isLiked, setIsLiked] = useState(comment.isLiked);
    const [likes, setLikes] = useState(comment.likes);
    const [showReplies, setShowReplies] = useState(true);

    const handleLike = () => {
      setIsLiked(!isLiked);
      setLikes(isLiked ? likes - 1 : likes + 1);
    };

    return (
      <div className={`${depth > 0 ? 'ml-6 md:ml-12 pt-6' : 'py-6'} border-b border-gray-100 dark:border-gray-800 last:border-0`}>
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <img
              src={comment.author.avatar}
              alt={comment.author.name}
              className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-800"
            />
            {comment.author.role === 'admin' && (
              <div className="mt-2 text-center">
                <FaCrown className="w-4 h-4 text-yellow-500 mx-auto" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {comment.author.name}
                  </h4>
                  {comment.author.role && (
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full">
                      {comment.author.role}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {new Date(comment.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
              
              {/* <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <BsThreeDots className="w-5 h-5 text-gray-500" />
              </button> */}
            </div>
            
            <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              {comment.content}
            </p>
            
            <div className="flex items-center gap-6 mt-4">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                  isLiked
                    ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <FaHeart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                <span className="text-sm font-medium">{likes}</span>
              </button>
            </div>
            
            {replyingTo === comment.id && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <textarea
                  placeholder="Write your reply..."
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                  rows={3}
                />
                <div className="flex justify-end gap-3 mt-3">
                  <button
                    onClick={() => setReplyingTo(null)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg">
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
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          💬 Discussion ({comments.length})
        </h2>
        {/* <div className="flex items-center gap-4">
          <select className="px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300">
            <option>Newest First</option>
            <option>Oldest First</option>
            <option>Most Liked</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg">
            Subscribe
          </button>
        </div> */}
      </div>

      {/* New Comment Form */}
      <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-2xl">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Join the discussion
        </h3>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts..."
          className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
          rows={4}
        />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
          <div className="flex items-center gap-4">
          </div>
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg">
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
        <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium">
          Load More Comments
        </button>
      </div>
    </div>
  );
};