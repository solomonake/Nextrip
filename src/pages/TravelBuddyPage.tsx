import React from 'react';
import TravelBuddyAssistant from '../components/travel-buddy/TravelBuddyAssistant';

const TravelBuddyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <TravelBuddyAssistant />
    </div>
  );
};

export default TravelBuddyPage;