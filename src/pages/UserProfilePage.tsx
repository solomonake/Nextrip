import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Calendar, 
  Heart, 
  MessageCircle, 
  UserPlus, 
  UserCheck,
  Users,
  Star,
  Camera,
  Mountain,
  Award,
  Settings,
  MoreHorizontal,
  Plane,
  Clock,
  Badge,
  CheckCircle
} from 'lucide-react';

interface Trip {
  id: number;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: 'Planned' | 'Booked' | 'In Progress' | 'Completed';
}

interface Photo {
  id: number;
  url: string;
  caption: string;
  likes: number;
  location: string;
}

interface UserProfile {
  username: string;
  profilePic: string;
  bio: string;
  followersCount: number;
  followingCount: number;
  likesReceived: number;
  tripsCompleted: number;
  missionsCompleted: number;
  isFollowing: boolean;
  photos: Photo[];
  pastTrips: Trip[];
  futureTrips: Trip[];
}

const userProfile: UserProfile = {
  username: 'adventure_seeker',
  profilePic: 'https://randomuser.me/api/portraits/women/32.jpg',
  bio: 'Explorer of mountains and cities 🌍 | Photography enthusiast 📸 | Always planning the next adventure ✈️',
  followersCount: 2847,
  followingCount: 1205,
  likesReceived: 15420,
  tripsCompleted: 28,
  missionsCompleted: 15,
  isFollowing: false,
  photos: [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
      caption: 'Sunrise at Mount Fuji - absolutely breathtaking! 🗻',
      likes: 234,
      location: 'Mount Fuji, Japan'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1464822759844-d150baec0494?w=400&h=400&fit=crop',
      caption: 'Hidden waterfall discovered during our hike 💧',
      likes: 189,
      location: 'Olympic National Park, USA'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop',
      caption: 'Walking through ancient redwood forests 🌲',
      likes: 156,
      location: 'Muir Woods, California'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=400&fit=crop',
      caption: 'Street art hunting in Berlin 🎨',
      likes: 298,
      location: 'Berlin, Germany'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop',
      caption: 'Perfect beach day in Santorini ☀️',
      likes: 412,
      location: 'Santorini, Greece'
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=400&fit=crop',
      caption: 'Urban exploration in Tokyo 🏙️',
      likes: 267,
      location: 'Tokyo, Japan'
    },
    {
      id: 7,
      url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=400&fit=crop',
      caption: 'Sunset over the Alps 🌅',
      likes: 345,
      location: 'Swiss Alps, Switzerland'
    },
    {
      id: 8,
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
      caption: 'Mountain peak conquered! 🏔️',
      likes: 523,
      location: 'Matterhorn, Switzerland'
    },
    {
      id: 9,
      url: 'https://images.unsplash.com/photo-1464822759844-d150baec0494?w=400&h=400&fit=crop',
      caption: 'Crystal clear lake reflection 💎',
      likes: 178,
      location: 'Lake Bled, Slovenia'
    }
  ],
  pastTrips: [
    {
      id: 1,
      name: 'Japan Adventure',
      destination: 'Tokyo & Kyoto, Japan',
      startDate: '2024-03-15',
      endDate: '2024-03-28',
      status: 'Completed'
    },
    {
      id: 2,
      name: 'European Backpacking',
      destination: 'Berlin, Prague, Vienna',
      startDate: '2024-01-10',
      endDate: '2024-01-24',
      status: 'Completed'
    },
    {
      id: 3,
      name: 'Greek Island Hopping',
      destination: 'Santorini & Mykonos, Greece',
      startDate: '2023-09-05',
      endDate: '2023-09-18',
      status: 'Completed'
    },
    {
      id: 4,
      name: 'Swiss Alps Hiking',
      destination: 'Zermatt & Interlaken, Switzerland',
      startDate: '2023-07-20',
      endDate: '2023-08-02',
      status: 'Completed'
    }
  ],
  futureTrips: [
    {
      id: 5,
      name: 'Iceland Northern Lights',
      destination: 'Reykjavik & Blue Lagoon, Iceland',
      startDate: '2024-12-15',
      endDate: '2024-12-22',
      status: 'Booked'
    },
    {
      id: 6,
      name: 'New Zealand Adventure',
      destination: 'Auckland & Queenstown, New Zealand',
      startDate: '2025-02-10',
      endDate: '2025-02-28',
      status: 'Planned'
    },
    {
      id: 7,
      name: 'Patagonia Expedition',
      destination: 'Torres del Paine, Chile',
      startDate: '2025-04-05',
      endDate: '2025-04-20',
      status: 'Planned'
    }
  ]
};

export default function ProfilePage() {
  const [user] = useState<UserProfile>(userProfile);
  const [isFollowing, setIsFollowing] = useState(user.isFollowing);
  const [activeTab, setActiveTab] = useState<'photos' | 'past-trips' | 'future-trips'>('photos');

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    console.log(isFollowing ? `Unfollowed ${user.username}` : `Followed ${user.username}`);
  };

  const handleFollowersClick = () => {
    console.log(`Viewing ${user.username}'s followers`);
  };

  const handleFollowingClick = () => {
    console.log(`Viewing ${user.username}'s following`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'Booked': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'In Progress': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Planned': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="w-4 h-4" />;
      case 'Booked': return <Plane className="w-4 h-4" />;
      case 'In Progress': return <Clock className="w-4 h-4" />;
      case 'Planned': return <Calendar className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          {/* Cover Photo */}
          <div className="h-48 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          </div>
          
          {/* Profile Info */}
          <div className="relative px-8 pb-8">
            {/* Profile Picture */}
            <div className="flex justify-center -mt-20 mb-6">
              <div className="relative">
                <img
                  src={user.profilePic}
                  alt={user.username}
                  className="w-40 h-40 rounded-full border-6 border-white shadow-xl object-cover"
                />
                <div className="absolute bottom-2 right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
              </div>
            </div>

            {/* User Info */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">@{user.username}</h1>
              <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto leading-relaxed">{user.bio}</p>
              
              {/* Stats Row */}
              <div className="flex justify-center space-x-12 mb-8">
                <button 
                  onClick={handleFollowersClick}
                  className="text-center hover:bg-gray-50 px-4 py-3 rounded-lg transition-colors"
                >
                  <div className="text-3xl font-bold text-gray-900">{user.followersCount.toLocaleString()}</div>
                  <div className="text-sm text-gray-600 font-medium">Followers</div>
                </button>
                <button 
                  onClick={handleFollowingClick}
                  className="text-center hover:bg-gray-50 px-4 py-3 rounded-lg transition-colors"
                >
                  <div className="text-3xl font-bold text-gray-900">{user.followingCount.toLocaleString()}</div>
                  <div className="text-sm text-gray-600 font-medium">Following</div>
                </button>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">{user.likesReceived.toLocaleString()}</div>
                  <div className="text-sm text-gray-600 font-medium">Likes Received</div>
                </div>
              </div>

              {/* Achievement Badges */}
              <div className="flex justify-center space-x-6 mb-8">
                <div className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-6 py-3 rounded-2xl flex items-center space-x-3 shadow-md">
                  <Mountain className="w-6 h-6" />
                  <div>
                    <span className="text-2xl font-bold">{user.tripsCompleted}</span>
                    <span className="text-sm ml-2">Trips Completed</span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 px-6 py-3 rounded-2xl flex items-center space-x-3 shadow-md">
                  <Award className="w-6 h-6" />
                  <div>
                    <span className="text-2xl font-bold">{user.missionsCompleted}</span>
                    <span className="text-sm ml-2">Missions Completed</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleFollowToggle}
                  className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                    isFollowing
                      ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                  }`}
                >
                  {isFollowing ? <UserCheck className="w-6 h-6" /> : <UserPlus className="w-6 h-6" />}
                  <span>{isFollowing ? 'Following' : 'Follow'}</span>
                </button>
                
                <button className="bg-white border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all duration-200 flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105">
                  <MessageCircle className="w-6 h-6" />
                  <span>Message</span>
                </button>

                <button className="bg-gray-100 text-gray-600 p-4 rounded-xl hover:bg-gray-200 transition-colors shadow-lg">
                  <MoreHorizontal className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <div className="flex space-x-1 p-2">
              {[
                { id: 'photos', label: 'Photos Grid', icon: Camera, count: user.photos.length },
                { id: 'past-trips', label: 'Past Trips', icon: CheckCircle, count: user.pastTrips.length },
                { id: 'future-trips', label: 'Future Trips', icon: Plane, count: user.futureTrips.length }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 px-6 py-4 rounded-lg font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                    <span className="bg-white bg-opacity-50 px-2 py-1 rounded-full text-xs font-bold">
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {/* Photos Grid */}
            {activeTab === 'photos' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Camera className="w-6 h-6 mr-3" />
                  Travel Photos ({user.photos.length})
                </h2>
                
                {user.photos.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Camera className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No photos yet</h3>
                    <p className="text-gray-600">This user hasn't shared any travel photos yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {user.photos.map((photo) => (
                      <div key={photo.id} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                        <div className="relative group">
                          <img
                            src={photo.url}
                            alt={photo.caption}
                            className="w-full h-64 object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
                              <Heart className="w-8 h-8 mx-auto mb-2" />
                              <span className="font-semibold">{photo.likes} likes</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-4">
                          <p className="text-gray-900 mb-2 line-clamp-2 leading-relaxed">{photo.caption}</p>
                          
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span className="truncate">{photo.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="w-4 h-4" />
                              <span>{photo.likes}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Past Trips */}
            {activeTab === 'past-trips' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <CheckCircle className="w-6 h-6 mr-3" />
                  Past Trips ({user.pastTrips.length})
                </h2>
                
                {user.pastTrips.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No past trips</h3>
                    <p className="text-gray-600">This user hasn't completed any trips yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {user.pastTrips.map((trip) => (
                      <div key={trip.id} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-200">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{trip.name}</h3>
                            <div className="flex items-center text-gray-600 mb-2">
                              <MapPin className="w-4 h-4 mr-2" />
                              <span>{trip.destination}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Calendar className="w-4 h-4 mr-2" />
                              <span>{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</span>
                            </div>
                          </div>
                          <span className={`px-3 py-2 rounded-lg text-sm font-medium border flex items-center space-x-2 ${getStatusColor(trip.status)}`}>
                            {getStatusIcon(trip.status)}
                            <span>{trip.status}</span>
                          </span>
                        </div>
                        
                        <div className="flex space-x-3">
                          <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                            View Details
                          </button>
                          <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                            View Photos
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Future Trips */}
            {activeTab === 'future-trips' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Plane className="w-6 h-6 mr-3" />
                  Future Trips ({user.futureTrips.length})
                </h2>
                
                {user.futureTrips.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Plane className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No future trips</h3>
                    <p className="text-gray-600">This user hasn't planned any upcoming trips yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {user.futureTrips.map((trip) => (
                      <div key={trip.id} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-blue-200">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{trip.name}</h3>
                            <div className="flex items-center text-gray-600 mb-2">
                              <MapPin className="w-4 h-4 mr-2" />
                              <span>{trip.destination}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Calendar className="w-4 h-4 mr-2" />
                              <span>{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</span>
                            </div>
                          </div>
                          <span className={`px-3 py-2 rounded-lg text-sm font-medium border flex items-center space-x-2 ${getStatusColor(trip.status)}`}>
                            {getStatusIcon(trip.status)}
                            <span>{trip.status}</span>
                          </span>
                        </div>
                        
                        <div className="flex space-x-3">
                          <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-sm font-medium">
                            View Itinerary
                          </button>
                          <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                            Join Trip
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}