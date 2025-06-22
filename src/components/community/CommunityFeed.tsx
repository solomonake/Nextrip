import React, { useState } from 'react';
import { Heart, MessageCircle, Bookmark, MoreHorizontal, MapPin, Clock, TrendingUp, Users, ChevronLeft, ChevronRight } from 'lucide-react';

interface CommunityPost {
  id: number;
  username: string;
  profilePic: string;
  activityType: 'Hike' | 'Mission' | 'Discovery' | 'Sightseeing' | 'Food' | 'Culture' | 'Adventure' | 'Beach';
  photos: string[];
  description: string;
  location: string;
  likes: number;
  comments: number;
  postedAt: string;
  distance?: string;
  elevationGain?: string;
  duration?: string;
  hashtags?: string[];
}

const communityFeed: CommunityPost[] = [
  {
    id: 1,
    username: 'mountain_explorer',
    profilePic: 'https://randomuser.me/api/portraits/women/44.jpg',
    activityType: 'Hike',
    photos: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1464822759844-d150baec0494?w=600&h=600&fit=crop'
    ],
    description: 'Epic sunrise hike to Eagle Peak! 🌅 The 6am start was totally worth it for these views. Met some amazing fellow hikers along the way.',
    location: 'Eagle Peak Trail, Colorado',
    likes: 234,
    comments: 23,
    postedAt: '2 hours ago',
    distance: '8.2 km',
    elevationGain: '650 m',
    duration: '3h 45m',
    hashtags: ['#hiking', '#sunrise', '#colorado', '#mountains']
  },
  {
    id: 2,
    username: 'city_wanderer',
    profilePic: 'https://randomuser.me/api/portraits/men/32.jpg',
    activityType: 'Discovery',
    photos: [
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=600&fit=crop'
    ],
    description: 'Found this incredible hidden speakeasy in the heart of London! 🍸 Sometimes the best discoveries happen when you least expect them.',
    location: 'Shoreditch, London',
    likes: 189,
    comments: 15,
    postedAt: '4 hours ago',
    hashtags: ['#london', '#speakeasy', '#discovery', '#nightlife']
  },
  {
    id: 3,
    username: 'adventure_seeker',
    profilePic: 'https://randomuser.me/api/portraits/women/28.jpg',
    activityType: 'Mission',
    photos: [
      'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1464822759844-d150baec0494?w=600&h=600&fit=crop'
    ],
    description: 'Mission accomplished! ✅ Completed my first multi-day trek through the Dolomites. Pushed my limits and discovered what I\'m truly capable of.',
    location: 'Dolomites, Italy',
    likes: 412,
    comments: 41,
    postedAt: '6 hours ago',
    distance: '42.5 km',
    elevationGain: '2,100 m',
    duration: '3 days',
    hashtags: ['#dolomites', '#trekking', '#mission', '#italy']
  },
  {
    id: 4,
    username: 'foodie_traveler',
    profilePic: 'https://randomuser.me/api/portraits/women/67.jpg',
    activityType: 'Food',
    photos: [
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=600&fit=crop'
    ],
    description: 'Street food tour through Bangkok! 🍜 Tried 12 different dishes in one evening. My taste buds are still dancing! Who else loves authentic local cuisine?',
    location: 'Chatuchak Market, Bangkok',
    likes: 298,
    comments: 34,
    postedAt: '8 hours ago',
    hashtags: ['#bangkok', '#streetfood', '#thailand', '#foodie']
  },
  {
    id: 5,
    username: 'beach_nomad',
    profilePic: 'https://randomuser.me/api/portraits/men/45.jpg',
    activityType: 'Beach',
    photos: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=600&fit=crop'
    ],
    description: 'Perfect beach day in Santorini! ☀️ Crystal clear waters and that famous sunset. Sometimes you just need to slow down and appreciate paradise.',
    location: 'Oia, Santorini',
    likes: 567,
    comments: 28,
    postedAt: '12 hours ago',
    hashtags: ['#santorini', '#greece', '#sunset', '#paradise']
  },
  {
    id: 6,
    username: 'culture_hunter',
    profilePic: 'https://randomuser.me/api/portraits/women/55.jpg',
    activityType: 'Culture',
    photos: [
      'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=600&fit=crop'
    ],
    description: 'Spent the entire day exploring the Louvre! 🎨 Van Gogh, Da Vinci, and so many masterpieces. Art has the power to transport you through time.',
    location: 'Louvre Museum, Paris',
    likes: 156,
    comments: 19,
    postedAt: '1 day ago',
    duration: '6 hours',
    hashtags: ['#louvre', '#paris', '#art', '#culture']
  },
  {
    id: 7,
    username: 'urban_explorer',
    profilePic: 'https://randomuser.me/api/portraits/men/38.jpg',
    activityType: 'Discovery',
    photos: [
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=600&fit=crop'
    ],
    description: 'Street art hunting in Berlin! 🎨 Every corner tells a story. This city never fails to inspire my creative soul. Found some incredible murals today!',
    location: 'Kreuzberg, Berlin',
    likes: 203,
    comments: 22,
    postedAt: '1 day ago',
    hashtags: ['#berlin', '#streetart', '#urban', '#creativity']
  },
  {
    id: 8,
    username: 'nature_lover',
    profilePic: 'https://randomuser.me/api/portraits/women/42.jpg',
    activityType: 'Sightseeing',
    photos: [
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=600&fit=crop'
    ],
    description: 'Walking through ancient redwood forests 🌲 These giants have been standing for over 1000 years. Feeling so small yet so connected to nature.',
    location: 'Muir Woods, California',
    likes: 178,
    comments: 16,
    postedAt: '2 days ago',
    distance: '5.1 km',
    duration: '2h 30m',
    hashtags: ['#redwoods', '#california', '#nature', '#peaceful']
  },
  {
    id: 9,
    username: 'adventure_couple',
    profilePic: 'https://randomuser.me/api/portraits/men/25.jpg',
    activityType: 'Adventure',
    photos: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1464822759844-d150baec0494?w=600&h=600&fit=crop'
    ],
    description: 'Bungee jumping in New Zealand! 🪂 143 meters of pure adrenaline. My partner and I conquered our fears together. What\'s next on our bucket list?',
    location: 'Kawarau Gorge, Queenstown',
    likes: 445,
    comments: 52,
    postedAt: '2 days ago',
    hashtags: ['#bungeejump', '#newzealand', '#adrenaline', '#bucketlist']
  },
  {
    id: 10,
    username: 'solo_wanderer',
    profilePic: 'https://randomuser.me/api/portraits/women/33.jpg',
    activityType: 'Culture',
    photos: [
      'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=600&h=600&fit=crop'
    ],
    description: 'Tea ceremony in Kyoto 🍵 Learning about the ancient art of mindfulness through tea. Solo travel teaches you so much about yourself and other cultures.',
    location: 'Gion District, Kyoto',
    likes: 267,
    comments: 31,
    postedAt: '3 days ago',
    duration: '2 hours',
    hashtags: ['#kyoto', '#teaceremony', '#mindfulness', '#solotravel']
  },
  {
    id: 11,
    username: 'summit_chaser',
    profilePic: 'https://randomuser.me/api/portraits/men/52.jpg',
    activityType: 'Hike',
    photos: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop'
    ],
    description: 'Another peak conquered! 🏔️ Mount Washington was challenging but the summit views made every step worth it. Already planning the next adventure.',
    location: 'Mount Washington, New Hampshire',
    likes: 189,
    comments: 24,
    postedAt: '3 days ago',
    distance: '12.8 km',
    elevationGain: '1,200 m',
    duration: '6h 15m',
    hashtags: ['#mountwashington', '#hiking', '#summit', '#newhampshire']
  },
  {
    id: 12,
    username: 'digital_nomad',
    profilePic: 'https://randomuser.me/api/portraits/women/29.jpg',
    activityType: 'Discovery',
    photos: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1464822759844-d150baec0494?w=600&h=600&fit=crop'
    ],
    description: 'Working from a café in Lisbon today! ☕ The perfect blend of productivity and wanderlust. This city has stolen my heart with its colorful tiles and warm people.',
    location: 'Alfama District, Lisbon',
    likes: 134,
    comments: 18,
    postedAt: '4 days ago',
    hashtags: ['#digitalnomad', '#lisbon', '#workremote', '#portugal']
  }
];

interface PhotoCarouselProps {
  photos: string[];
  username: string;
}

function PhotoCarousel({ photos, username }: PhotoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  if (photos.length === 1) {
    return (
      <img
        src={photos[0]}
        alt={`${username} post`}
        className="w-full h-96 object-cover"
      />
    );
  }

  return (
    <div className="relative">
      <img
        src={photos[currentIndex]}
        alt={`${username} post ${currentIndex + 1}`}
        className="w-full h-96 object-cover"
      />
      
      {photos.length > 1 && (
        <>
          <button
            onClick={prevPhoto}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextPhoto}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {photos.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

interface ActivityStatsProps {
  post: CommunityPost;
}

function ActivityStats({ post }: ActivityStatsProps) {
  const hasStats = post.distance || post.elevationGain || post.duration;
  
  if (!hasStats) return null;

  return (
    <div className="bg-gray-50 rounded-lg p-3 mb-3">
      <div className="flex items-center justify-between text-sm">
        {post.distance && (
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4 text-gray-600" />
            <span className="font-medium text-gray-900">{post.distance}</span>
          </div>
        )}
        {post.elevationGain && (
          <div className="flex items-center space-x-1">
            <TrendingUp className="w-4 h-4 text-gray-600" />
            <span className="font-medium text-gray-900">{post.elevationGain}</span>
          </div>
        )}
        {post.duration && (
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4 text-gray-600" />
            <span className="font-medium text-gray-900">{post.duration}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CommunityFeed() {
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<number>>(new Set());
  const [showCollabModal, setShowCollabModal] = useState<number | null>(null);

  const handleLike = (postId: number) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleSave = (postId: number) => {
    setSavedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleCollabRequest = (username: string) => {
    console.log(`Sent collab request to ${username}`);
    setShowCollabModal(null);
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'Hike': return 'bg-green-100 text-green-800';
      case 'Mission': return 'bg-purple-100 text-purple-800';
      case 'Discovery': return 'bg-orange-100 text-orange-800';
      case 'Sightseeing': return 'bg-blue-100 text-blue-800';
      case 'Food': return 'bg-red-100 text-red-800';
      case 'Culture': return 'bg-indigo-100 text-indigo-800';
      case 'Adventure': return 'bg-yellow-100 text-yellow-800';
      case 'Beach': return 'bg-cyan-100 text-cyan-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {communityFeed.map((post) => {
        const isLiked = likedPosts.has(post.id);
        const isSaved = savedPosts.has(post.id);
        
        return (
          <div key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Post Header */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <img
                  src={post.profilePic}
                  alt={post.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{post.username}</h3>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-gray-500">{post.postedAt}</p>
                    <span className="text-gray-300">•</span>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-gray-500" />
                      <p className="text-sm text-gray-500">{post.location}</p>
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getActivityColor(post.activityType)}`}>
                  {post.activityType}
                </span>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <MoreHorizontal className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Photo Carousel */}
            <PhotoCarousel photos={post.photos} username={post.username} />

            {/* Post Content */}
            <div className="p-4">
              {/* Activity Stats */}
              <ActivityStats post={post} />

              {/* Action Buttons */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-full transition-colors"
                  >
                    <Heart className={`w-6 h-6 transition-colors ${
                      isLiked ? 'text-red-500 fill-current' : 'text-gray-600 hover:text-red-500'
                    }`} />
                  </button>
                  <button className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-full transition-colors">
                    <MessageCircle className="w-6 h-6 text-gray-600" />
                  </button>
                </div>
                <button 
                  onClick={() => handleSave(post.id)}
                  className="hover:bg-gray-100 p-2 rounded-full transition-colors"
                >
                  <Bookmark className={`w-6 h-6 transition-colors ${
                    isSaved ? 'text-blue-500 fill-current' : 'text-gray-600'
                  }`} />
                </button>
              </div>

              {/* Likes Count */}
              <div className="mb-3">
                <p className="font-semibold text-gray-900">
                  {post.likes + (isLiked ? 1 : 0)} likes
                </p>
              </div>

              {/* Post Description */}
              <div className="mb-3">
                <p className="text-gray-900">
                  <span className="font-semibold">{post.username}</span> {post.description}
                </p>
              </div>

              {/* Hashtags */}
              {post.hashtags && (
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {post.hashtags.map((hashtag, index) => (
                      <span key={index} className="text-blue-600 text-sm hover:underline cursor-pointer">
                        {hashtag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Comments */}
              <button className="text-gray-500 text-sm hover:text-gray-700 transition-colors mb-4">
                View all {post.comments} comments
              </button>

              {/* Ask for Collab Button */}
              <button 
                onClick={() => setShowCollabModal(post.id)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Users className="w-5 h-5" />
                <span>Ask for Collab</span>
              </button>
            </div>
          </div>
        );
      })}

      {/* Load More */}
      <div className="text-center py-8">
        <button className="bg-gray-100 text-gray-600 px-8 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors">
          Load More Posts
        </button>
      </div>

      {/* Collab Request Modal */}
      {showCollabModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            {(() => {
              const post = communityFeed.find(p => p.id === showCollabModal);
              return post ? (
                <>
                  <div className="text-center mb-6">
                    <img
                      src={post.profilePic}
                      alt={post.username}
                      className="w-16 h-16 rounded-full object-cover mx-auto mb-4"
                    />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Send Collab Request</h3>
                    <p className="text-gray-600">
                      Do you want to send a collab request to <span className="font-semibold">@{post.username}</span>?
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowCollabModal(null)}
                      className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleCollabRequest(post.username)}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                    >
                      Send Request
                    </button>
                  </div>
                </>
              ) : null;
            })()}
          </div>
        </div>
      )}
    </div>
  );
}