import React, { useState } from 'react';
import { Heart, MessageCircle, Bookmark, MoreHorizontal, Users, X } from 'lucide-react';

export interface PostType {
  username: string;
  avatarUrl: string;
  timestamp: string;
  activityType: 'Hike' | 'Mission' | 'Walk' | 'Discovery';
  photos: string[];
  description: string;
  likesCount: number;
  commentsCount: number;
}

export default function PostCard({ post }: { post: PostType }) {
  const [showCollabModal, setShowCollabModal] = useState(false);

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'Hike': return 'bg-green-100 text-green-800';
      case 'Mission': return 'bg-purple-100 text-purple-800';
      case 'Walk': return 'bg-blue-100 text-blue-800';
      case 'Discovery': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCollabRequest = () => {
    console.log(`Sent collab request to ${post.username}`);
    setShowCollabModal(false);
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <img
              src={post.avatarUrl}
              alt={post.username}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{post.username}</h3>
              <p className="text-sm text-gray-500">{post.timestamp}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getActivityColor(post.activityType)}`}>
              {post.activityType}
            </span>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <MoreHorizontal className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className={`grid ${post.photos.length === 1 ? 'grid-cols-1' : post.photos.length === 2 ? 'grid-cols-2' : 'grid-cols-2'} gap-1`}>
          {post.photos.map((photo, index) => (
            <div key={index} className={`${post.photos.length === 3 && index === 0 ? 'col-span-2' : ''}`}>
              <img
                src={photo}
                alt={`${post.username} post photo ${index + 1}`}
                className="w-full h-64 object-cover"
              />
            </div>
          ))}
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-full transition-colors">
                <Heart className="w-6 h-6 text-gray-600 hover:text-red-500" />
              </button>
              <button className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-full transition-colors">
                <MessageCircle className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <button className="hover:bg-gray-100 p-2 rounded-full transition-colors">
              <Bookmark className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="mb-3">
            <p className="font-semibold text-gray-900">{post.likesCount} likes</p>
          </div>

          <div className="mb-2">
            <p className="text-gray-900">
              <span className="font-semibold">{post.username}</span> {post.description}
            </p>
          </div>

          <button className="text-gray-500 text-sm hover:text-gray-700 transition-colors mb-4">
            View all {post.commentsCount} comments
          </button>

          <button
            onClick={() => setShowCollabModal(true)}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Users className="w-5 h-5" />
            <span>Ask for Collab</span>
          </button>
        </div>
      </div>

      {showCollabModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Send Collab Request</h3>
              <button
                onClick={() => setShowCollabModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="text-center mb-8">
              <img
                src={post.avatarUrl}
                alt={post.username}
                className="w-16 h-16 rounded-full object-cover mx-auto mb-4"
              />
              <p className="text-gray-700">
                Do you want to send a collab request to <span className="font-semibold">{post.username}</span>?
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowCollabModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCollabRequest}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}