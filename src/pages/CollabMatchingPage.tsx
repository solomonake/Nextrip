import React, { useState } from 'react';
import { X, Check, MapPin, Star, Camera } from 'lucide-react';

interface UserToMatch {
  id: number;
  username: string;
  profilePic: string;
  tripsCompleted: number;
  missionsCompleted: number;
  commonInterests: string[];
}

export default function CollabMatchingPage() {
  const [usersToMatch] = useState<UserToMatch[]>([
    {
      id: 1,
      username: 'adventure_girl',
      profilePic: 'https://randomuser.me/api/portraits/women/32.jpg',
      tripsCompleted: 5,
      missionsCompleted: 3,
      commonInterests: ['Hiking', 'Food', 'Adventure']
    },
    {
      id: 2,
      username: 'traveler_dude',
      profilePic: 'https://randomuser.me/api/portraits/men/44.jpg',
      tripsCompleted: 7,
      missionsCompleted: 4,
      commonInterests: ['Nature', 'Photography', 'Culture']
    },
    {
      id: 3,
      username: 'explorer_jane',
      profilePic: 'https://randomuser.me/api/portraits/women/68.jpg',
      tripsCompleted: 12,
      missionsCompleted: 8,
      commonInterests: ['Mountains', 'Camping', 'Wildlife']
    },
    {
      id: 4,
      username: 'nomad_alex',
      profilePic: 'https://randomuser.me/api/portraits/men/25.jpg',
      tripsCompleted: 15,
      missionsCompleted: 12,
      commonInterests: ['Backpacking', 'Local Culture', 'Street Food']
    },
    {
      id: 5,
      username: 'wanderlust_sam',
      profilePic: 'https://randomuser.me/api/portraits/women/45.jpg',
      tripsCompleted: 9,
      missionsCompleted: 6,
      commonInterests: ['Beach', 'Diving', 'Sunset Chasing']
    }
  ]);

  const [currentUserIndex, setCurrentUserIndex] = useState(0);

  const handleSkip = () => {
    console.log(`Skipped ${usersToMatch[currentUserIndex]?.username}`);
    setCurrentUserIndex(prev => prev + 1);
  };

  const handleMatch = () => {
    const currentUser = usersToMatch[currentUserIndex];
    if (currentUser) {
      console.log(`Sent collab request to ${currentUser.username}`);
    }
    setCurrentUserIndex(prev => prev + 1);
  };

  const currentUser = usersToMatch[currentUserIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-8">
      <div className="max-w-md mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Travel Buddies</h1>
          <p className="text-gray-600">Discover fellow adventurers to explore with</p>
        </div>

        {/* Card Container */}
        <div className="relative h-[600px] flex items-center justify-center">
          {currentUser ? (
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-sm transform transition-all duration-300 hover:scale-105">
              {/* Profile Picture */}
              <div className="relative">
                <img
                  src={currentUser.profilePic}
                  alt={currentUser.username}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              {/* User Info */}
              <div className="p-6">
                {/* Username */}
                <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                  @{currentUser.username}
                </h2>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center bg-blue-50 rounded-xl p-3">
                    <div className="flex items-center justify-center mb-1">
                      <MapPin className="w-4 h-4 text-blue-600 mr-1" />
                      <span className="text-2xl font-bold text-blue-600">{currentUser.tripsCompleted}</span>
                    </div>
                    <p className="text-sm text-blue-700 font-medium">Trips Completed</p>
                  </div>
                  <div className="text-center bg-purple-50 rounded-xl p-3">
                    <div className="flex items-center justify-center mb-1">
                      <Star className="w-4 h-4 text-purple-600 mr-1" />
                      <span className="text-2xl font-bold text-purple-600">{currentUser.missionsCompleted}</span>
                    </div>
                    <p className="text-sm text-purple-700 font-medium">Missions Completed</p>
                  </div>
                </div>

                {/* Common Interests */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <Camera className="w-4 h-4 mr-2" />
                    Common Interests
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {currentUser.commonInterests.map((interest, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-orange-100 to-pink-100 text-orange-800 text-sm font-medium rounded-full border border-orange-200"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button
                    onClick={handleSkip}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 rounded-2xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 transform hover:scale-105"
                  >
                    <X className="w-6 h-6" />
                    <span>Skip</span>
                  </button>
                  <button
                    onClick={handleMatch}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-4 rounded-2xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 transform hover:scale-105 shadow-lg"
                  >
                    <Check className="w-6 h-6" />
                    <span>Connect</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* No More Users */
            <div className="text-center bg-white rounded-3xl shadow-2xl p-12 max-w-sm w-full">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                All Caught Up!
              </h2>
              <p className="text-gray-600 mb-6">
                You have viewed all users for now. Check back later for new travel buddies!
              </p>
              <button
                onClick={() => setCurrentUserIndex(0)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105"
              >
                Start Over
              </button>
            </div>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="mt-8 text-center">
          <div className="flex justify-center space-x-2 mb-2">
            {usersToMatch.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index < currentUserIndex
                    ? 'bg-green-500'
                    : index === currentUserIndex
                    ? 'bg-blue-500'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600">
            {currentUser ? `${currentUserIndex + 1} of ${usersToMatch.length}` : 'Complete!'}
          </p>
        </div>
      </div>
    </div>
  );
}