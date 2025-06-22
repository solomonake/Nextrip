import React, { useState } from 'react';
import { Heart, MessageCircle, Bookmark, MoreHorizontal, MapPin, Clock, TrendingUp, Users, ChevronLeft, ChevronRight } from 'lucide-react';

interface CommunityPost {
  id: number;
  username: string;
  profilePic: string;
  activityType: 'Hike' | 'Mission' | 'Discovery' | 'Sightseeing';
  photos: string[];
  description: string;
  location: string;
  likes: number;
  comments: number;
  postedAt: string;
}

const communityFeed: CommunityPost[] = [
  {
    id: 1,
    username: 'hike_queen',
    profilePic: 'https://randomuser.me/api/portraits/women/15.jpg',
    activityType: 'Hike',
    photos: [
      'https://source.unsplash.com/600x400/?mountains,hike',
      'https://source.unsplash.com/600x400/?nature,trail'
    ],
    description: '10-mile sunrise hike in the Rockies 🌄 — 1,500ft elevation gain!',
    location: 'Colorado, USA',
    likes: 122,
    comments: 18,
    postedAt: '3 hours ago'
  },
  {
    id: 2,
    username: 'urban_explorer',
    profilePic: 'https://randomuser.me/api/portraits/men/18.jpg',
    activityType: 'Discovery',
    photos: [
      'https://source.unsplash.com/600x400/?city,architecture'
    ],
    description: 'Exploring hidden courtyards in Prague 🏰',
    location: 'Prague, Czech Republic',
    likes: 89,
    comments: 12,
    postedAt: '7 hours ago'
  },
  {
    id: 3,
    username: 'adventure_seeker',
    profilePic: 'https://randomuser.me/api/portraits/women/28.jpg',
    activityType: 'Mission',
    photos: [
      'https://source.unsplash.com/600x400/?mountain,summit',
      'https://source.unsplash.com/600x400/?hiking,adventure',
      'https://source.unsplash.com/600x400/?nature,landscape'
    ],
    description: 'Mission accomplished! ✅ Completed my first multi-day trek through the Dolomites.',
    location: 'Dolomites, Italy',
    likes: 203,
    comments: 41,
    postedAt: '12 hours ago'
  },
  {
    id: 4,
    username: 'nature_lover',
    profilePic: 'https://randomuser.me/api/portraits/men/45.jpg',
    activityType: 'Sightseeing',
    photos: [
      'https://source.unsplash.com/600x400/?forest,trees'
    ],
    description: 'Peaceful morning walk through the ancient redwood forest 🌲',
    location: 'Muir Woods, California',
    likes: 156,
    comments: 28,
    postedAt: '1 day ago'
  },
  {
    id: 5,
    username: 'city_wanderer',
    profilePic: 'https://randomuser.me/api/portraits/women/67.jpg',
    activityType: 'Discovery',
    photos: [
      'https://source.unsplash.com/600x400/?street,art',
      'https://source.unsplash.com/600x400/?urban,graffiti'
    ],
    description: 'Street art hunting in Berlin! 🎨 Every corner tells a story.',
    location: 'Kreuzberg, Berlin',
    likes: 94,
    comments: 19,
    postedAt: '2 days ago'
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

export default function CommunityFeed() {
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<number>>(new Set());

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

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'Hike': return 'bg-green-100 text-green-800';
      case 'Mission': return 'bg-purple-100 text-purple-800';
      case 'Discovery': return 'bg-orange-100 text-orange-800';
      case 'Sightseeing': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-[700px] mx-auto space-y-6">
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
              <div className="mb-2">
                <p className="text-gray-900">
                  <span className="font-semibold">{post.username}</span> {post.description}
                </p>
              </div>

              {/* Comments */}
              <button className="text-gray-500 text-sm hover:text-gray-700 transition-colors mb-4">
                View all {post.comments} comments
              </button>

              {/* Ask for Collab Button */}
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2">
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
    </div>
  );
}