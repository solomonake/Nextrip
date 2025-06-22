import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Camera, MapPin, Star, Clock, Users, Award, CheckCircle, Upload, X, Heart, MessageCircle, Crown, Medal, Zap, Siren as Fire, TrendingUp } from 'lucide-react';

interface Mission {
  id: string;
  title: string;
  description: string;
  points: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Epic';
  category: 'Food' | 'Culture' | 'Adventure' | 'Social' | 'Photography' | 'Discovery';
  icon: string;
  completed: boolean;
  verificationRequired: boolean;
  timeLimit?: string;
  location?: string;
}

interface CompletedMission {
  id: string;
  missionId: string;
  userId: string;
  username: string;
  profilePic: string;
  photo: string;
  caption: string;
  location: string;
  completedAt: Date;
  likes: number;
  verified: boolean;
}

interface LeaderboardUser {
  id: string;
  username: string;
  profilePic: string;
  totalPoints: number;
  missionsCompleted: number;
  rank: number;
  badge: string;
  streak: number;
  level: number;
}

const missions: Mission[] = [
  {
    id: '1',
    title: 'Local Food Explorer',
    description: 'Try 5 different local dishes and post photos of each',
    points: 150,
    difficulty: 'Medium',
    category: 'Food',
    icon: '🍜',
    completed: false,
    verificationRequired: true,
    timeLimit: '7 days'
  },
  {
    id: '2',
    title: 'Cultural Ambassador',
    description: 'Take a photo with a local person and share their story',
    points: 200,
    difficulty: 'Medium',
    category: 'Social',
    icon: '🤝',
    completed: true,
    verificationRequired: true
  },
  {
    id: '3',
    title: 'Hidden Gem Hunter',
    description: 'Discover and photograph a place not mentioned in guidebooks',
    points: 300,
    difficulty: 'Hard',
    category: 'Discovery',
    icon: '💎',
    completed: false,
    verificationRequired: true
  },
  {
    id: '4',
    title: 'Sunrise Chaser',
    description: 'Capture a sunrise photo from a scenic viewpoint',
    points: 100,
    difficulty: 'Easy',
    category: 'Photography',
    icon: '🌅',
    completed: false,
    verificationRequired: true,
    timeLimit: '3 days'
  },
  {
    id: '5',
    title: 'Language Learner',
    description: 'Learn and use 10 phrases in the local language',
    points: 120,
    difficulty: 'Medium',
    category: 'Culture',
    icon: '🗣️',
    completed: false,
    verificationRequired: true
  },
  {
    id: '6',
    title: 'Adventure Seeker',
    description: 'Complete an adrenaline activity (bungee, skydiving, etc.)',
    points: 400,
    difficulty: 'Epic',
    category: 'Adventure',
    icon: '🪂',
    completed: false,
    verificationRequired: true
  },
  {
    id: '7',
    title: 'Street Art Detective',
    description: 'Find and photograph 3 unique street art pieces',
    points: 80,
    difficulty: 'Easy',
    category: 'Photography',
    icon: '🎨',
    completed: false,
    verificationRequired: true
  },
  {
    id: '8',
    title: 'Market Master',
    description: 'Visit a local market and buy something unique',
    points: 90,
    difficulty: 'Easy',
    category: 'Culture',
    icon: '🛒',
    completed: false,
    verificationRequired: true
  },
  {
    id: '9',
    title: 'Transportation Explorer',
    description: 'Use 3 different types of local transportation',
    points: 110,
    difficulty: 'Medium',
    category: 'Discovery',
    icon: '🚇',
    completed: false,
    verificationRequired: true
  },
  {
    id: '10',
    title: 'Sunset Photographer',
    description: 'Capture the perfect sunset photo',
    points: 100,
    difficulty: 'Easy',
    category: 'Photography',
    icon: '🌇',
    completed: false,
    verificationRequired: true
  }
];

const completedMissions: CompletedMission[] = [
  {
    id: '1',
    missionId: '2',
    userId: 'user1',
    username: 'adventure_girl',
    profilePic: 'https://randomuser.me/api/portraits/women/32.jpg',
    photo: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop',
    caption: 'Met Maria, a local artist who showed me the best hidden galleries in the city! 🎨',
    location: 'Barcelona, Spain',
    completedAt: new Date('2024-03-15T14:30:00'),
    likes: 89,
    verified: true
  },
  {
    id: '2',
    missionId: '1',
    userId: 'user2',
    username: 'foodie_traveler',
    profilePic: 'https://randomuser.me/api/portraits/women/55.jpg',
    photo: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop',
    caption: 'Dish #3 of 5: Authentic Pad Thai from a street vendor! The flavors are incredible 🍜',
    location: 'Bangkok, Thailand',
    completedAt: new Date('2024-03-14T19:45:00'),
    likes: 156,
    verified: true
  },
  {
    id: '3',
    missionId: '7',
    userId: 'user3',
    username: 'urban_explorer',
    profilePic: 'https://randomuser.me/api/portraits/men/38.jpg',
    photo: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=400&fit=crop',
    caption: 'Found this amazing mural in Kreuzberg! Street art tells the story of Berlin 🎨',
    location: 'Berlin, Germany',
    completedAt: new Date('2024-03-13T16:20:00'),
    likes: 203,
    verified: true
  },
  {
    id: '4',
    missionId: '4',
    userId: 'user4',
    username: 'mountain_explorer',
    profilePic: 'https://randomuser.me/api/portraits/women/44.jpg',
    photo: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
    caption: 'Worth the 5am wake-up call! Sunrise over the Alps was absolutely magical 🌅',
    location: 'Swiss Alps, Switzerland',
    completedAt: new Date('2024-03-12T06:15:00'),
    likes: 312,
    verified: true
  }
];

const leaderboard: LeaderboardUser[] = [
  {
    id: '1',
    username: 'mission_master',
    profilePic: 'https://randomuser.me/api/portraits/men/52.jpg',
    totalPoints: 2850,
    missionsCompleted: 23,
    rank: 1,
    badge: 'Legend',
    streak: 12,
    level: 8
  },
  {
    id: '2',
    username: 'adventure_girl',
    profilePic: 'https://randomuser.me/api/portraits/women/32.jpg',
    totalPoints: 2340,
    missionsCompleted: 19,
    rank: 2,
    badge: 'Explorer',
    streak: 8,
    level: 7
  },
  {
    id: '3',
    username: 'globe_trotter',
    profilePic: 'https://randomuser.me/api/portraits/men/25.jpg',
    totalPoints: 2120,
    missionsCompleted: 17,
    rank: 3,
    badge: 'Adventurer',
    streak: 5,
    level: 6
  },
  {
    id: '4',
    username: 'culture_hunter',
    profilePic: 'https://randomuser.me/api/portraits/women/67.jpg',
    totalPoints: 1890,
    missionsCompleted: 15,
    rank: 4,
    badge: 'Discoverer',
    streak: 7,
    level: 6
  },
  {
    id: '5',
    username: 'foodie_traveler',
    profilePic: 'https://randomuser.me/api/portraits/women/55.jpg',
    totalPoints: 1650,
    missionsCompleted: 13,
    rank: 5,
    badge: 'Explorer',
    streak: 3,
    level: 5
  },
  {
    id: '6',
    username: 'photo_wanderer',
    profilePic: 'https://randomuser.me/api/portraits/men/33.jpg',
    totalPoints: 1420,
    missionsCompleted: 11,
    rank: 6,
    badge: 'Adventurer',
    streak: 4,
    level: 5
  },
  {
    id: '7',
    username: 'urban_explorer',
    profilePic: 'https://randomuser.me/api/portraits/men/38.jpg',
    totalPoints: 1280,
    missionsCompleted: 10,
    rank: 7,
    badge: 'Discoverer',
    streak: 2,
    level: 4
  },
  {
    id: '8',
    username: 'mountain_explorer',
    profilePic: 'https://randomuser.me/api/portraits/women/44.jpg',
    totalPoints: 1150,
    missionsCompleted: 9,
    rank: 8,
    badge: 'Traveler',
    streak: 6,
    level: 4
  }
];

export default function TravelMissions() {
  const [activeTab, setActiveTab] = useState<'missions' | 'leaderboard' | 'completed'>('missions');
  const [showUploadModal, setShowUploadModal] = useState<string | null>(null);
  const [uploadPhoto, setUploadPhoto] = useState<string>('');
  const [uploadCaption, setUploadCaption] = useState<string>('');
  const [uploadLocation, setUploadLocation] = useState<string>('');

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Epic': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Food': return 'bg-orange-100 text-orange-800';
      case 'Culture': return 'bg-purple-100 text-purple-800';
      case 'Adventure': return 'bg-red-100 text-red-800';
      case 'Social': return 'bg-blue-100 text-blue-800';
      case 'Photography': return 'bg-pink-100 text-pink-800';
      case 'Discovery': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Legend': return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white';
      case 'Explorer': return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
      case 'Adventurer': return 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white';
      case 'Discoverer': return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      case 'Traveler': return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Medal className="w-6 h-6 text-amber-600" />;
      default: return <span className="w-6 h-6 flex items-center justify-center text-gray-600 font-bold">{rank}</span>;
    }
  };

  const handleStartMission = (missionId: string) => {
    setShowUploadModal(missionId);
  };

  const handleUploadSubmission = () => {
    // In a real app, this would upload the photo and create a submission
    console.log('Submitting mission completion:', {
      missionId: showUploadModal,
      photo: uploadPhoto,
      caption: uploadCaption,
      location: uploadLocation
    });
    
    setShowUploadModal(null);
    setUploadPhoto('');
    setUploadCaption('');
    setUploadLocation('');
  };

  const tabs = [
    { id: 'missions', label: 'Active Missions', icon: Target, count: missions.filter(m => !m.completed).length },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy, count: leaderboard.length },
    { id: 'completed', label: 'Completed', icon: CheckCircle, count: completedMissions.length }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trophy className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Travel Missions</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Complete exciting challenges during your travels, earn points, and climb the leaderboard! 
          Share your achievements with the community and unlock exclusive badges.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Target className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">12</h3>
          <p className="text-sm text-gray-600">Missions Available</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">3</h3>
          <p className="text-sm text-gray-600">Completed</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Star className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">850</h3>
          <p className="text-sm text-gray-600">Total Points</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">#15</h3>
          <p className="text-sm text-gray-600">Global Rank</p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-2 flex space-x-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-4 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
                <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs font-bold">
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Active Missions */}
        {activeTab === 'missions' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {missions.filter(mission => !mission.completed).map((mission) => (
              <motion.div
                key={mission.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="p-6">
                  {/* Mission Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{mission.icon}</div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{mission.title}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(mission.category)}`}>
                            {mission.category}
                          </span>
                          <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${getDifficultyColor(mission.difficulty)}`}>
                            {mission.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{mission.points}</div>
                      <div className="text-xs text-gray-500">points</div>
                    </div>
                  </div>

                  {/* Mission Description */}
                  <p className="text-gray-700 mb-4 leading-relaxed">{mission.description}</p>

                  {/* Mission Details */}
                  <div className="space-y-2 mb-4">
                    {mission.timeLimit && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>Complete within {mission.timeLimit}</span>
                      </div>
                    )}
                    {mission.location && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{mission.location}</span>
                      </div>
                    )}
                    {mission.verificationRequired && (
                      <div className="flex items-center space-x-2 text-sm text-orange-600">
                        <Camera className="w-4 h-4" />
                        <span>Photo verification required</span>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleStartMission(mission.id)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Complete Mission</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Leaderboard */}
        {activeTab === 'leaderboard' && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Trophy className="w-6 h-6 mr-3 text-yellow-500" />
                Global Leaderboard
              </h2>
              <p className="text-gray-600 mt-2">Top travelers ranked by mission points</p>
            </div>
            
            <div className="divide-y divide-gray-200">
              {leaderboard.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`p-6 hover:bg-gray-50 transition-colors ${
                    index < 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50' : ''
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    {/* Rank */}
                    <div className="flex-shrink-0">
                      {getRankIcon(user.rank)}
                    </div>

                    {/* Profile */}
                    <div className="flex items-center space-x-3 flex-1">
                      <img
                        src={user.profilePic}
                        alt={user.username}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">@{user.username}</h3>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(user.badge)}`}>
                            {user.badge}
                          </span>
                          <span className="text-xs text-gray-500">Level {user.level}</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <div className="font-bold text-gray-900">{user.totalPoints.toLocaleString()}</div>
                        <div className="text-gray-500">Points</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-gray-900">{user.missionsCompleted}</div>
                        <div className="text-gray-500">Missions</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center space-x-1">
                          <Fire className="w-4 h-4 text-orange-500" />
                          <span className="font-bold text-gray-900">{user.streak}</span>
                        </div>
                        <div className="text-gray-500">Streak</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Completed Missions */}
        {activeTab === 'completed' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <CheckCircle className="w-6 h-6 mr-3 text-green-500" />
              Community Completions
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {completedMissions.map((completion, index) => (
                <motion.div
                  key={completion.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* User Header */}
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <img
                        src={completion.profilePic}
                        alt={completion.username}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">@{completion.username}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <span>{completion.completedAt.toLocaleDateString()}</span>
                          <span>•</span>
                          <MapPin className="w-3 h-3" />
                          <span>{completion.location}</span>
                        </div>
                      </div>
                      {completion.verified && (
                        <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          <CheckCircle className="w-3 h-3" />
                          <span>Verified</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Photo */}
                  <img
                    src={completion.photo}
                    alt="Mission completion"
                    className="w-full h-64 object-cover"
                  />

                  {/* Content */}
                  <div className="p-4">
                    <p className="text-gray-900 mb-3">{completion.caption}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors">
                          <Heart className="w-5 h-5" />
                          <span>{completion.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition-colors">
                          <MessageCircle className="w-5 h-5" />
                          <span>Comment</span>
                        </button>
                      </div>
                      
                      <div className="flex items-center space-x-1 text-blue-600">
                        <Star className="w-4 h-4" />
                        <span className="font-medium">
                          +{missions.find(m => m.id === completion.missionId)?.points || 0} points
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Complete Mission</h3>
              <button
                onClick={() => setShowUploadModal(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Photo
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Caption
                </label>
                <textarea
                  value={uploadCaption}
                  onChange={(e) => setUploadCaption(e.target.value)}
                  placeholder="Describe your mission completion..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={uploadLocation}
                  onChange={(e) => setUploadLocation(e.target.value)}
                  placeholder="Where did you complete this mission?"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowUploadModal(null)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUploadSubmission}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  Submit
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}