import CommunityFeed from './CommunityFeed';

{activeTab === 'Feed' && <CommunityFeed />}

import React, { useState } from 'react';
import { Heart, Search, UserPlus, Settings } from 'lucide-react';
import CommunityFeed from './CommunityFeed';
import CollabMatching from './CollabMatching';
import CollabRequests from './CollabRequests';
import ProfilePage from '../../pages/ProfilePage';

export default function CommunityTabsLayout() {
  const [activeTab, setActiveTab] = useState<'feed' | 'collab-matching' | 'collab-requests' | 'my-profile'>('feed');

  const tabs = [
    { id: 'feed', label: 'Feed', icon: Heart },
    { id: 'collab-matching', label: 'Collab Matching', icon: Search },
    { id: 'collab-requests', label: 'Collab Requests', icon: UserPlus },
    { id: 'my-profile', label: 'My Profile', icon: Settings }
  ];

  return (
    <div className="w-full">
      {/* Tabs Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-2 flex space-x-1 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 whitespace-nowrap ${
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
      <div className="max-w-[900px] mx-auto px-4">
        {activeTab === 'feed' && <CommunityFeed />}
        {activeTab === 'collab-matching' && <CollabMatching />}
        {activeTab === 'collab-requests' && <CollabRequests />}
        {activeTab === 'my-profile' && <ProfilePage />}
      </div>
    </div>
  );
}