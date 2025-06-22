import React, { useState } from 'react';
import { X, Check, MapPin, Star, Camera, Heart, Users, Globe, Mountain, Plane, Award, Coffee, Compass } from 'lucide-react';

interface CollabMatch {
  id: number;
  username: string;
  profilePic: string;
  bio: string;
  age: number;
  location: string;
  countriesVisited: number;
  commonInterests: string[];
  photos: string[];
  tripsCompleted: number;
  missionsCompleted: number;
  travelStyle: string;
  nextDestination: string;
  languages: string[];
  verified: boolean;
}

const collabMatches: CollabMatch[] = [
  {
    id: 1,
    username: 'adventure_girl',
    profilePic: 'https://randomuser.me/api/portraits/women/32.jpg',
    bio: 'Mountain lover seeking hiking buddies for epic adventures! Always ready for the next summit 🏔️',
    age: 28,
    location: 'Denver, Colorado',
    countriesVisited: 15,
    commonInterests: ['Hiking', 'Photography', 'Nature', 'Adventure', 'Camping'],
    photos: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1464822759844-d150baec0494?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop'
    ],
    tripsCompleted: 23,
    missionsCompleted: 12,
    travelStyle: 'Adventure Seeker',
    nextDestination: 'Patagonia, Chile',
    languages: ['English', 'Spanish'],
    verified: true
  },
  {
    id: 2,
    username: 'nomad_explorer',
    profilePic: 'https://randomuser.me/api/portraits/men/44.jpg',
    bio: 'Digital nomad exploring the world one city at a time. Love discovering hidden gems and local cultures ✈️',
    age: 32,
    location: 'Barcelona, Spain',
    countriesVisited: 35,
    commonInterests: ['Culture', 'Food', 'Cities', 'Photography', 'Remote Work'],
    photos: [
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=600&fit=crop'
    ],
    tripsCompleted: 42,
    missionsCompleted: 18,
    travelStyle: 'Digital Nomad',
    nextDestination: 'Lisbon, Portugal',
    languages: ['English', 'Spanish', 'French'],
    verified: true
  },
  {
    id: 3,
    username: 'beach_wanderer',
    profilePic: 'https://randomuser.me/api/portraits/women/68.jpg',
    bio: 'Ocean soul seeking beach adventures and sunset chasers. Certified dive instructor and marine life enthusiast 🌅',
    age: 26,
    location: 'San Diego, California',
    countriesVisited: 12,
    commonInterests: ['Beach', 'Diving', 'Surfing', 'Sunset', 'Marine Life'],
    photos: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop'
    ],
    tripsCompleted: 18,
    missionsCompleted: 8,
    travelStyle: 'Beach Explorer',
    nextDestination: 'Maldives',
    languages: ['English'],
    verified: false
  },
  {
    id: 4,
    username: 'culture_seeker',
    profilePic: 'https://randomuser.me/api/portraits/men/25.jpg',
    bio: 'History buff and culture enthusiast. Let\'s explore museums, ancient sites, and local traditions together! 🏛️',
    age: 35,
    location: 'Rome, Italy',
    countriesVisited: 28,
    commonInterests: ['History', 'Museums', 'Architecture', 'Culture', 'Art'],
    photos: [
      'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=600&fit=crop'
    ],
    tripsCompleted: 31,
    missionsCompleted: 15,
    travelStyle: 'Cultural Explorer',
    nextDestination: 'Kyoto, Japan',
    languages: ['English', 'Italian', 'French'],
    verified: true
  },
  {
    id: 5,
    username: 'wild_spirit',
    profilePic: 'https://randomuser.me/api/portraits/women/45.jpg',
    bio: 'Wildlife photographer and nature conservationist. Passionate about protecting our planet\'s biodiversity 📸🦋',
    age: 30,
    location: 'Nairobi, Kenya',
    countriesVisited: 22,
    commonInterests: ['Wildlife', 'Photography', 'Conservation', 'Safari', 'Nature'],
    photos: [
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1464822759844-d150baec0494?w=400&h=600&fit=crop'
    ],
    tripsCompleted: 27,
    missionsCompleted: 16,
    travelStyle: 'Wildlife Explorer',
    nextDestination: 'Madagascar',
    languages: ['English', 'Swahili'],
    verified: true
  },
  {
    id: 6,
    username: 'urban_adventurer',
    profilePic: 'https://randomuser.me/api/portraits/men/38.jpg',
    bio: 'Street art hunter and urban explorer. Let\'s discover hidden gems in the world\'s greatest cities! 🎨',
    age: 29,
    location: 'Berlin, Germany',
    countriesVisited: 19,
    commonInterests: ['Street Art', 'Urban Exploration', 'Nightlife', 'Food', 'Music'],
    photos: [
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=600&fit=crop'
    ],
    tripsCompleted: 25,
    missionsCompleted: 11,
    travelStyle: 'Urban Explorer',
    nextDestination: 'Tokyo, Japan',
    languages: ['English', 'German'],
    verified: false
  },
  {
    id: 7,
    username: 'foodie_traveler',
    profilePic: 'https://randomuser.me/api/portraits/women/55.jpg',
    bio: 'Culinary adventurer on a mission to taste the world! Cooking classes and food tours are my specialty 🍜',
    age: 27,
    location: 'Bangkok, Thailand',
    countriesVisited: 16,
    commonInterests: ['Food', 'Cooking', 'Street Food', 'Culture', 'Markets'],
    photos: [
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=600&fit=crop'
    ],
    tripsCompleted: 20,
    missionsCompleted: 9,
    travelStyle: 'Culinary Explorer',
    nextDestination: 'Istanbul, Turkey',
    languages: ['English', 'Thai'],
    verified: true
  },
  {
    id: 8,
    username: 'solo_backpacker',
    profilePic: 'https://randomuser.me/api/portraits/men/33.jpg',
    bio: 'Backpacking enthusiast who believes the best adventures happen off the beaten path. Budget travel expert! 🎒',
    age: 24,
    location: 'Melbourne, Australia',
    countriesVisited: 8,
    commonInterests: ['Backpacking', 'Budget Travel', 'Hostels', 'Local Culture', 'Adventure'],
    photos: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop'
    ],
    tripsCompleted: 12,
    missionsCompleted: 6,
    travelStyle: 'Budget Backpacker',
    nextDestination: 'Vietnam',
    languages: ['English'],
    verified: false
  }
];

export default function CollabMatching() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const currentUser = collabMatches[currentIndex];

  const handleSkip = () => {
    console.log(`Skipped ${currentUser?.username}`);
    nextUser();
  };

  const handleMatch = () => {
    console.log(`Sent collab request to ${currentUser?.username}`);
    nextUser();
  };

  const nextUser = () => {
    setCurrentIndex(prev => prev + 1);
    setCurrentPhotoIndex(0);
  };

  const nextPhoto = () => {
    if (currentUser && currentPhotoIndex < currentUser.photos.length - 1) {
      setCurrentPhotoIndex(prev => prev + 1);
    }
  };

  const prevPhoto = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex(prev => prev - 1);
    }
  };

  const getInterestColor = (interest: string) => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-purple-100 text-purple-800',
      'bg-orange-100 text-orange-800',
      'bg-pink-100 text-pink-800',
      'bg-indigo-100 text-indigo-800',
      'bg-red-100 text-red-800',
      'bg-yellow-100 text-yellow-800'
    ];
    return colors[interest.length % colors.length];
  };

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            All Caught Up!
          </h2>
          <p className="text-gray-600 mb-6">
            You've viewed all potential travel buddies. Check back later for new matches!
          </p>
          <button
            onClick={() => {
              setCurrentIndex(0);
              setCurrentPhotoIndex(0);
            }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      {/* Main Card */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden relative">
        {/* Photo Section */}
        <div className="relative h-96">
          <img
            src={currentUser.photos[currentPhotoIndex]}
            alt={`${currentUser.username} photo ${currentPhotoIndex + 1}`}
            className="w-full h-full object-cover"
          />
          
          {/* Photo Navigation Overlay */}
          {currentUser.photos.length > 1 && (
            <>
              <button
                onClick={prevPhoto}
                className="absolute left-0 top-0 w-1/3 h-full bg-transparent"
                disabled={currentPhotoIndex === 0}
              />
              <button
                onClick={nextPhoto}
                className="absolute right-0 top-0 w-1/3 h-full bg-transparent"
                disabled={currentPhotoIndex === currentUser.photos.length - 1}
              />
              
              {/* Photo Indicators */}
              <div className="absolute top-4 left-4 right-4 flex space-x-1">
                {currentUser.photos.map((_, index) => (
                  <div
                    key={index}
                    className={`flex-1 h-1 rounded-full transition-all ${
                      index === currentPhotoIndex ? 'bg-white' : 'bg-white bg-opacity-30'
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Basic Info Overlay */}
          <div className="absolute bottom-4 left-4 text-white">
            <div className="flex items-center space-x-2 mb-1">
              <h2 className="text-2xl font-bold">@{currentUser.username}</h2>
              {currentUser.verified && (
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <span>{currentUser.age}</span>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>{currentUser.location}</span>
              </div>
            </div>
            <div className="text-xs opacity-90 mt-1">{currentUser.travelStyle}</div>
          </div>
        </div>

        {/* User Details */}
        <div className="p-6">
          {/* Bio */}
          <p className="text-gray-700 mb-4 leading-relaxed">{currentUser.bio}</p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center bg-blue-50 rounded-xl p-3">
              <div className="flex items-center justify-center mb-1">
                <Globe className="w-4 h-4 text-blue-600 mr-1" />
                <span className="text-xl font-bold text-blue-600">{currentUser.countriesVisited}</span>
              </div>
              <p className="text-xs text-blue-700 font-medium">Countries</p>
            </div>
            <div className="text-center bg-green-50 rounded-xl p-3">
              <div className="flex items-center justify-center mb-1">
                <Plane className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-xl font-bold text-green-600">{currentUser.tripsCompleted}</span>
              </div>
              <p className="text-xs text-green-700 font-medium">Trips</p>
            </div>
            <div className="text-center bg-purple-50 rounded-xl p-3">
              <div className="flex items-center justify-center mb-1">
                <Award className="w-4 h-4 text-purple-600 mr-1" />
                <span className="text-xl font-bold text-purple-600">{currentUser.missionsCompleted}</span>
              </div>
              <p className="text-xs text-purple-700 font-medium">Missions</p>
            </div>
          </div>

          {/* Next Destination */}
          <div className="mb-4 bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Compass className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-semibold text-orange-900">Next Destination</span>
            </div>
            <p className="text-orange-800 font-medium">{currentUser.nextDestination}</p>
          </div>

          {/* Languages */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <Globe className="w-4 h-4 mr-2" />
              Languages
            </h3>
            <div className="flex flex-wrap gap-1">
              {currentUser.languages.map((language, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                >
                  {language}
                </span>
              ))}
            </div>
          </div>

          {/* Common Interests */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <Star className="w-4 h-4 mr-2" />
              Common Interests
            </h3>
            <div className="flex flex-wrap gap-2">
              {currentUser.commonInterests.map((interest, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 text-xs font-medium rounded-full ${getInterestColor(interest)}`}
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
              className="flex-1 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white py-4 rounded-2xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 transform hover:scale-105 shadow-lg"
            >
              <Heart className="w-6 h-6" />
              <span>Connect</span>
            </button>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mt-6 text-center">
        <div className="flex justify-center space-x-2 mb-2">
          {collabMatches.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index < currentIndex
                  ? 'bg-pink-500'
                  : index === currentIndex
                  ? 'bg-blue-500'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-gray-600">
          {currentIndex + 1} of {collabMatches.length}
        </p>
      </div>
    </div>
  );
}