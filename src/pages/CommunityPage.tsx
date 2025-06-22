import React, { useState } from 'react';
import { Heart, MessageCircle, Bookmark, Users, Search, UserPlus, Settings, TrendingUp, Globe, Camera, Award, Trophy, Target } from 'lucide-react';
import TravelMissions from '../components/community/TravelMissions';

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<'feed' | 'collab-matching' | 'collab-requests' | 'my-profile' | 'missions'>('feed');

  const tabs = [
    { id: 'feed', label: 'Community Feed', icon: Heart },
    { id: 'collab-matching', label: 'Find Travel Buddies', icon: Search },
    { id: 'collab-requests', label: 'Collaboration Requests', icon: UserPlus },
    { id: 'missions', label: 'Travel Missions', icon: Trophy },
    { id: 'my-profile', label: 'My Travel Profile', icon: Settings }
  ];

  const communityStats = [
    {
      icon: Users,
      value: '12.5K',
      label: 'Active Travelers',
      color: 'bg-blue-100 text-blue-600',
      description: 'Explorers from around the world'
    },
    {
      icon: Heart,
      value: '45.2K',
      label: 'Posts Shared',
      color: 'bg-purple-100 text-purple-600',
      description: 'Amazing travel moments captured'
    },
    {
      icon: UserPlus,
      value: '3.8K',
      label: 'Collaborations',
      color: 'bg-green-100 text-green-600',
      description: 'Successful travel partnerships'
    },
    {
      icon: Trophy,
      value: '8.2K',
      label: 'Missions Completed',
      color: 'bg-yellow-100 text-yellow-600',
      description: 'Travel challenges conquered'
    }
  ];

  const featuredTravelers = [
    {
      username: 'mountain_explorer',
      profilePic: 'https://randomuser.me/api/portraits/women/44.jpg',
      badge: 'Mission Master',
      trips: 28,
      followers: '2.1K',
      points: 2850
    },
    {
      username: 'nomad_explorer',
      profilePic: 'https://randomuser.me/api/portraits/men/44.jpg',
      badge: 'Explorer Legend',
      trips: 42,
      followers: '3.5K',
      points: 2340
    },
    {
      username: 'culture_seeker',
      profilePic: 'https://randomuser.me/api/portraits/men/25.jpg',
      badge: 'Culture Expert',
      trips: 31,
      followers: '1.8K',
      points: 2120
    }
  ];

  const trendingDestinations = [
    { name: 'Santorini, Greece', posts: 234, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop' },
    { name: 'Tokyo, Japan', posts: 189, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300&h=200&fit=crop' },
    { name: 'Swiss Alps', posts: 156, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop' },
    { name: 'Bali, Indonesia', posts: 142, image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=300&h=200&fit=crop' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <div className="relative">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Travel Community
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Connect with fellow adventurers, share your journeys, complete exciting missions, 
              and discover your next travel companion. Join a global community of passionate explorers.
            </p>
            
            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                onClick={() => setActiveTab('feed')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
              >
                <Heart className="w-5 h-5" />
                <span>Explore Community</span>
              </button>
              <button
                onClick={() => setActiveTab('missions')}
                className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-yellow-600 hover:to-orange-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
              >
                <Trophy className="w-5 h-5" />
                <span>Travel Missions</span>
              </button>
              <button
                onClick={() => setActiveTab('collab-matching')}
                className="bg-white border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
              >
                <Search className="w-5 h-5" />
                <span>Find Travel Buddies</span>
              </button>
            </div>
          </div>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {communityStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</p>
                <p className="text-sm text-gray-600">{stat.description}</p>
              </div>
            );
          })}
        </div>

        {/* Featured Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Featured Travelers */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Award className="w-5 h-5 mr-2 text-yellow-500" />
              Top Mission Completers
            </h3>
            <div className="space-y-4">
              {featuredTravelers.map((traveler, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <img
                    src={traveler.profilePic}
                    alt={traveler.username}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">@{traveler.username}</h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                        {traveler.badge}
                      </span>
                      <span>{traveler.points} pts</span>
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <div className="font-medium text-gray-900">#{index + 1}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Destinations */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
              Trending Destinations
            </h3>
            <div className="space-y-4">
              {trendingDestinations.map((destination, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{destination.name}</h4>
                    <p className="text-sm text-gray-600">{destination.posts} recent posts</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-blue-600">#{index + 1}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Camera className="w-5 h-5 mr-2 text-purple-500" />
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button 
                onClick={() => setActiveTab('missions')}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-3 rounded-lg font-medium hover:from-yellow-600 hover:to-orange-700 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Trophy className="w-4 h-4" />
                <span>Complete Missions</span>
              </button>
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2">
                <Camera className="w-4 h-4" />
                <span>Share Your Adventure</span>
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                <Search className="w-4 h-4" />
                <span>Find Travel Partners</span>
              </button>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">🎯 Mission Tip</h4>
              <p className="text-sm text-gray-700">
                Complete photo missions to earn points and climb the leaderboard! Share your achievements to inspire others.
              </p>
            </div>
          </div>
        </div>

        {/* Main Tabs Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-2 flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-6 py-4 rounded-xl font-medium transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden min-h-[600px]">
          {activeTab === 'missions' && <TravelMissions />}
          
          {activeTab === 'feed' && (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Community Feed</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Discover amazing travel stories, get inspired by fellow adventurers, and share your own journey with the community.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">📸 Share Photos</h4>
                  <p className="text-sm text-blue-800">Post your travel photos and inspire others</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">💬 Connect</h4>
                  <p className="text-sm text-purple-800">Comment and engage with fellow travelers</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">🤝 Collaborate</h4>
                  <p className="text-sm text-green-800">Find travel partners for your next adventure</p>
                </div>
              </div>
              <a
                href="/community/feed"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
              >
                <Heart className="w-5 h-5" />
                <span>Explore Community Feed</span>
              </a>
            </div>
          )}

          {activeTab === 'collab-matching' && (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Find Your Perfect Travel Buddy</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Our smart matching algorithm connects you with like-minded travelers based on your interests, travel style, and destinations.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-purple-900 mb-3">🎯 Smart Matching</h4>
                  <p className="text-sm text-purple-800">AI-powered algorithm matches you with compatible travel partners</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-blue-900 mb-3">🌍 Global Network</h4>
                  <p className="text-sm text-blue-800">Connect with travelers from around the world</p>
                </div>
              </div>
              <a
                href="/community/collab-matching"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg"
              >
                <Search className="w-5 h-5" />
                <span>Start Matching</span>
              </a>
            </div>
          )}

          {activeTab === 'collab-requests' && (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Collaboration Requests</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Manage your collaboration requests, respond to travel invitations, and track your partnerships with other travelers.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-green-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-green-900 mb-3">📥 Incoming Requests</h4>
                  <p className="text-sm text-green-800">Review and respond to collaboration invitations</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-blue-900 mb-3">📤 Sent Requests</h4>
                  <p className="text-sm text-blue-800">Track the status of your collaboration requests</p>
                </div>
              </div>
              <a
                href="/community/collab-requests"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg"
              >
                <UserPlus className="w-5 h-5" />
                <span>View Requests</span>
              </a>
            </div>
          )}

          {activeTab === 'my-profile' && (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="w-8 h-8 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">My Travel Profile</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Showcase your travel experiences, share your adventures, and let other travelers know what makes you a great travel companion.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-900 mb-2">📊 Travel Stats</h4>
                  <p className="text-sm text-orange-800">Showcase your travel achievements</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-900 mb-2">📷 Photo Gallery</h4>
                  <p className="text-sm text-red-800">Share your best travel moments</p>
                </div>
                <div className="bg-pink-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-pink-900 mb-2">🎯 Travel Goals</h4>
                  <p className="text-sm text-pink-800">Set and track your travel objectives</p>
                </div>
              </div>
              <a
                href="/community/profile"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-xl font-medium hover:from-orange-700 hover:to-red-700 transition-all duration-200 shadow-lg"
              >
                <Settings className="w-5 h-5" />
                <span>View My Profile</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}