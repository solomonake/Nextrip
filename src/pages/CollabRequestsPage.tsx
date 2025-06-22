import React, { useState } from 'react';
import { Check, X, Clock, UserCheck, UserX, Users } from 'lucide-react';

interface IncomingRequest {
  id: number;
  fromUsername: string;
  profilePic: string;
  status: 'pending' | 'accepted' | 'rejected';
}

interface SentRequest {
  id: number;
  toUsername: string;
  profilePic: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export default function CollabRequestsPage() {
  const [activeTab, setActiveTab] = useState<'incoming' | 'sent'>('incoming');
  
  const [incomingRequests, setIncomingRequests] = useState<IncomingRequest[]>([
    {
      id: 1,
      fromUsername: 'adventure_girl',
      profilePic: 'https://randomuser.me/api/portraits/women/32.jpg',
      status: 'pending'
    },
    {
      id: 2,
      fromUsername: 'hiking_buddy',
      profilePic: 'https://randomuser.me/api/portraits/men/45.jpg',
      status: 'pending'
    }
  ]);

  const [sentRequests, setSentRequests] = useState<SentRequest[]>([
    {
      id: 1,
      toUsername: 'traveler_dude',
      profilePic: 'https://randomuser.me/api/portraits/men/44.jpg',
      status: 'accepted'
    },
    {
      id: 2,
      toUsername: 'nature_lover',
      profilePic: 'https://randomuser.me/api/portraits/women/36.jpg',
      status: 'pending'
    }
  ]);

  const handleAcceptRequest = (requestId: number, username: string) => {
    console.log(`Accepted request from ${username}`);
    setIncomingRequests(prev => 
      prev.map(req => 
        req.id === requestId ? { ...req, status: 'accepted' } : req
      )
    );
  };

  const handleRejectRequest = (requestId: number, username: string) => {
    console.log(`Rejected request from ${username}`);
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Collab Requests</h1>
          <p className="text-lg text-gray-600">Manage your collaboration requests</p>
        </div>

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
              {incomingRequests.filter(req => req.status === 'pending').length > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {incomingRequests.filter(req => req.status === 'pending').length}
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
              <Users className="w-4 h-4" />
              <span>Sent Requests</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {activeTab === 'incoming' ? (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Incoming Requests</h2>
              
              {incomingRequests.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No incoming requests</h3>
                  <p className="text-gray-600">When someone wants to collaborate with you, their requests will appear here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {incomingRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
                      <div className="flex items-center space-x-4">
                        <img
                          src={request.profilePic}
                          alt={request.fromUsername}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">@{request.fromUsername}</h3>
                          <p className="text-sm text-gray-600">Wants to collaborate with you</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        {request.status === 'pending' ? (
                          <>
                            <button
                              onClick={() => handleAcceptRequest(request.id, request.fromUsername)}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                            >
                              <Check className="w-4 h-4" />
                              <span>Accept</span>
                            </button>
                            <button
                              onClick={() => handleRejectRequest(request.id, request.fromUsername)}
                              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                            >
                              <X className="w-4 h-4" />
                              <span>Reject</span>
                            </button>
                          </>
                        ) : (
                          <span className={`px-3 py-2 rounded-lg text-sm font-medium border flex items-center space-x-2 ${getStatusBadge(request.status)}`}>
                            {getStatusIcon(request.status)}
                            <span className="capitalize">{request.status}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Sent Requests</h2>
              
              {sentRequests.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-gray-400" />
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
                          <p className="text-sm text-gray-600">Collaboration request sent</p>
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

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
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
        </div>
      </div>
    </div>
  );
}