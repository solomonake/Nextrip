import React, { useState } from 'react';
import { Check, X, Clock, UserCheck, UserX, Users, MessageCircle, MapPin, Calendar } from 'lucide-react';

interface IncomingRequest {
  id: number;
  fromUsername: string;
  profilePic: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  timestamp: string;
  tripDestination?: string;
  travelDates?: string;
  commonInterests: string[];
}

interface SentRequest {
  id: number;
  toUsername: string;
  profilePic: string;
  status: 'pending' | 'accepted' | 'rejected';
  timestamp: string;
  tripDestination?: string;
  travelDates?: string;
}

const collabRequests = {
  incoming: [
    {
      id: 1,
      fromUsername: 'adventure_girl',
      profilePic: 'https://randomuser.me/api/portraits/women/32.jpg',
      message: 'Hey! I saw your hiking posts and would love to explore some trails together in the Alps. I\'m planning a 10-day trek and looking for experienced hikers to join. Are you interested in a collaboration?',
      status: 'pending' as const,
      timestamp: '2 hours ago',
      tripDestination: 'Swiss Alps',
      travelDates: 'June 15-25, 2024',
      commonInterests: ['Hiking', 'Photography', 'Nature']
    },
    {
      id: 2,
      fromUsername: 'mountain_explorer',
      profilePic: 'https://randomuser.me/api/portraits/women/44.jpg',
      message: 'Your photography skills are amazing! I\'m planning a trip to capture the Northern Lights next month. Want to join me for this once-in-a-lifetime experience?',
      status: 'pending' as const,
      timestamp: '5 hours ago',
      tripDestination: 'Iceland',
      travelDates: 'March 10-17, 2024',
      commonInterests: ['Photography', 'Adventure', 'Nature']
    },
    {
      id: 3,
      fromUsername: 'nomad_explorer',
      profilePic: 'https://randomuser.me/api/portraits/men/44.jpg',
      message: 'I\'m organizing a cultural tour through Southeast Asia. Your travel experience and cultural insights would be perfect for our group! We\'re focusing on local experiences and authentic cuisine.',
      status: 'accepted' as const,
      timestamp: '1 day ago',
      tripDestination: 'Thailand, Vietnam, Cambodia',
      travelDates: 'April 5-25, 2024',
      commonInterests: ['Culture', 'Food', 'Local Experiences']
    },
    {
      id: 4,
      fromUsername: 'beach_wanderer',
      profilePic: 'https://randomuser.me/api/portraits/women/68.jpg',
      message: 'Planning a diving expedition in the Maldives with a focus on marine conservation. Looking for certified divers who share a passion for ocean protection!',
      status: 'rejected' as const,
      timestamp: '2 days ago',
      tripDestination: 'Maldives',
      travelDates: 'May 20-30, 2024',
      commonInterests: ['Diving', 'Conservation', 'Marine Life']
    },
    {
      id: 5,
      fromUsername: 'culture_seeker',
      profilePic: 'https://randomuser.me/api/portraits/men/25.jpg',
      message: 'I\'m planning an art and history tour through Italy\'s Renaissance cities. Would love to have someone who appreciates art and culture join me for museum visits and historical site explorations.',
      status: 'pending' as const,
      timestamp: '3 days ago',
      tripDestination: 'Florence, Rome, Venice',
      travelDates: 'September 8-22, 2024',
      commonInterests: ['Art', 'History', 'Culture']
    },
    {
      id: 6,
      fromUsername: 'foodie_traveler',
      profilePic: 'https://randomuser.me/api/portraits/women/55.jpg',
      message: 'Culinary adventure through Japan! I\'m organizing cooking classes, food tours, and visits to local markets. Perfect for fellow food enthusiasts who want to dive deep into Japanese cuisine.',
      status: 'pending' as const,
      timestamp: '4 days ago',
      tripDestination: 'Tokyo, Osaka, Kyoto',
      travelDates: 'October 12-26, 2024',
      commonInterests: ['Food', 'Cooking', 'Culture']
    }
  ],
  sent: [
    {
      id: 1,
      toUsername: 'urban_adventurer',
      profilePic: 'https://randomuser.me/api/portraits/men/38.jpg',
      status: 'accepted' as const,
      timestamp: '3 hours ago',
      tripDestination: 'Berlin Street Art Tour',
      travelDates: 'March 20-25, 2024'
    },
    {
      id: 2,
      toUsername: 'wild_spirit',
      profilePic: 'https://randomuser.me/api/portraits/women/45.jpg',
      status: 'pending' as const,
      timestamp: '1 day ago',
      tripDestination: 'Kenya Safari',
      travelDates: 'July 10-20, 2024'
    },
    {
      id: 3,
      toUsername: 'solo_backpacker',
      profilePic: 'https://randomuser.me/api/portraits/men/33.jpg',
      status: 'pending' as const,
      timestamp: '2 days ago',
      tripDestination: 'Vietnam Backpacking',
      travelDates: 'August 5-25, 2024'
    },
    {
      id: 4,
      toUsername: 'summit_chaser',
      profilePic: 'https://randomuser.me/api/portraits/men/55.jpg',
      status: 'rejected' as const,
      timestamp: '3 days ago',
      tripDestination: 'Everest Base Camp',
      travelDates: 'October 1-21, 2024'
    },
    {
      id: 5,
      toUsername: 'digital_nomad',
      profilePic: 'https://randomuser.me/api/portraits/women/29.jpg',
      status: 'accepted' as const,
      timestamp: '5 days ago',
      tripDestination: 'Lisbon Co-working',
      travelDates: 'June 1-30, 2024'
    },
    {
      id: 6,
      toUsername: 'ocean_lover',
      profilePic: 'https://randomuser.me/api/portraits/women/37.jpg',
      status: 'pending' as const,
      timestamp: '1 week ago',
      tripDestination: 'Great Barrier Reef',
      travelDates: 'November 15-25, 2024'
    }
  ]
};

export default function CollabRequests() {
  const [activeTab, setActiveTab] = useState<'incoming' | 'sent'>('incoming');
  const [incomingRequests, setIncomingRequests] = useState<IncomingRequest[]>(collabRequests.incoming);
  const [sentRequests] = useState<SentRequest[]>(collabRequests.sent);

  const handleAcceptRequest = (requestId: number, username: string) => {
    console.log(`Accepted request from ${username}`);
    setIncomingRequests(prev => 
      prev.map(req => 
        req.id === requestId ? { ...req, status: 'accepted' } : req
      )
    );
  };

  const handleDenyRequest = (requestId: number, username: string) => {
    console.log(`Denied request from ${username}`);
    setIncomingRequests(prev => 
      prev.map(req => 
        req.id === requestId ? { ...req, status: 'rejected' } : req
      )
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <UserCheck className="w-4 h-4" />;
      case 'rejected':
        return <UserX className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const pendingIncoming = incomingRequests.filter(req => req.status === 'pending').length;
  const pendingSent = sentRequests.filter(req => req.status === 'pending').length;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 rounded-xl p-1 flex">
          <button
            onClick={() => setActiveTab('incoming')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
              activeTab === 'incoming'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Incoming Requests</span>
            {pendingIncoming > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {pendingIncoming}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('sent')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
              activeTab === 'sent'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Sent Requests</span>
            {pendingSent > 0 && (
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                {pendingSent}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {activeTab === 'incoming' ? (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Incoming Requests ({incomingRequests.length})
            </h2>
            
            {incomingRequests.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No incoming requests</h3>
                <p className="text-gray-600">When someone wants to collaborate with you, their requests will appear here.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {incomingRequests.map((request) => (
                  <div key={request.id} className="border border-gray-200 rounded-xl p-6 hover:border-gray-300 transition-colors">
                    <div className="flex items-start space-x-4">
                      <img
                        src={request.profilePic}
                        alt={request.fromUsername}
                        className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900 text-lg">@{request.fromUsername}</h3>
                            <p className="text-sm text-gray-500">{request.timestamp}</p>
                          </div>
                          
                          {request.status !== 'pending' && (
                            <span className={`px-3 py-1 rounded-lg text-sm font-medium border flex items-center space-x-1 ${getStatusBadge(request.status)}`}>
                              {getStatusIcon(request.status)}
                              <span className="capitalize">{request.status}</span>
                            </span>
                          )}
                        </div>

                        {/* Trip Details */}
                        {request.tripDestination && (
                          <div className="bg-blue-50 rounded-lg p-3 mb-4">
                            <div className="flex items-center space-x-4 text-sm">
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-4 h-4 text-blue-600" />
                                <span className="font-medium text-blue-900">{request.tripDestination}</span>
                              </div>
                              {request.travelDates && (
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-4 h-4 text-blue-600" />
                                  <span className="text-blue-800">{request.travelDates}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Common Interests */}
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1">
                            {request.commonInterests.map((interest, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full"
                              >
                                {interest}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-4 leading-relaxed">{request.message}</p>
                        
                        {request.status === 'pending' && (
                          <div className="flex space-x-3">
                            <button
                              onClick={() => handleAcceptRequest(request.id, request.fromUsername)}
                              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 font-medium"
                            >
                              <Check className="w-4 h-4" />
                              <span>Accept</span>
                            </button>
                            <button
                              onClick={() => handleDenyRequest(request.id, request.fromUsername)}
                              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2 font-medium"
                            >
                              <X className="w-4 h-4" />
                              <span>Decline</span>
                            </button>
                            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2 font-medium">
                              <MessageCircle className="w-4 h-4" />
                              <span>Message</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              Sent Requests ({sentRequests.length})
            </h2>
            
            {sentRequests.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No sent requests</h3>
                <p className="text-gray-600">Requests you send to other travelers will appear here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {sentRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
                    <div className="flex items-center space-x-4">
                      <img
                        src={request.profilePic}
                        alt={request.toUsername}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">@{request.toUsername}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <span>Collaboration request sent</span>
                          <span>•</span>
                          <span>{request.timestamp}</span>
                        </div>
                        {request.tripDestination && (
                          <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                            <MapPin className="w-3 h-3" />
                            <span>{request.tripDestination}</span>
                            {request.travelDates && (
                              <>
                                <span>•</span>
                                <span>{request.travelDates}</span>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <span className={`px-3 py-2 rounded-lg text-sm font-medium border flex items-center space-x-2 ${getStatusBadge(request.status)}`}>
                      {getStatusIcon(request.status)}
                      <span className="capitalize">{request.status}</span>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Enhanced Stats Summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 text-center shadow-lg">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Clock className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            {[...incomingRequests, ...sentRequests].filter(req => req.status === 'pending').length}
          </h3>
          <p className="text-sm text-gray-600">Pending Requests</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 text-center shadow-lg">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <UserCheck className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            {[...incomingRequests, ...sentRequests].filter(req => req.status === 'accepted').length}
          </h3>
          <p className="text-sm text-gray-600">Accepted Requests</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 text-center shadow-lg">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            {incomingRequests.filter(req => req.status === 'accepted').length}
          </h3>
          <p className="text-sm text-gray-600">Active Collaborations</p>
        </div>

        <div className="bg-white rounded-xl p-6 text-center shadow-lg">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <MessageCircle className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            {incomingRequests.length + sentRequests.length}
          </h3>
          <p className="text-sm text-gray-600">Total Requests</p>
        </div>
      </div>
    </div>
  );
}