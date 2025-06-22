import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Calendar, 
  MapPin, 
  Clock, 
  DollarSign,
  Users,
  Edit,
  Trash2,
  Share,
  Download,
  Sparkles,
  Package,
  AlertTriangle
} from 'lucide-react';
import { useTrip } from '../contexts/TripContext';
import CreateTripModal from '../components/itinerary/CreateTripModal';
import ItineraryTimeline from '../components/itinerary/ItineraryTimeline';
import BudgetTracker from '../components/itinerary/BudgetTracker';
import AIAssistant from '../components/itinerary/AIAssistant';
import PackingAssistant from '../components/advanced/PackingAssistant';
import EmergencySOS from '../components/advanced/EmergencySOS';

const ItineraryPage: React.FC = () => {
  const { currentTrip, trips, setCurrentTrip } = useTrip();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEmergencySOS, setShowEmergencySOS] = useState(false);
  const [activeTab, setActiveTab] = useState<'timeline' | 'budget' | 'ai' | 'packing'>('timeline');

  const tabs = [
    { id: 'timeline', label: 'Timeline', icon: Calendar },
    { id: 'budget', label: 'Budget', icon: DollarSign },
    { id: 'ai', label: 'AI Assistant', icon: Sparkles },
    { id: 'packing', label: 'Packing', icon: Package }
  ];

  // Mock trip details for packing assistant
  const mockTripDetails = currentTrip ? {
    destination: currentTrip.destination,
    startDate: currentTrip.startDate,
    endDate: currentTrip.endDate,
    travelers: currentTrip.travelers,
    activities: ['sightseeing', 'dining', 'photography'], // Mock activities
    weather: {
      avgTemp: 22,
      conditions: 'sunny' as const,
      precipitation: 20
    }
  } : null;

  if (!currentTrip && trips.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Start Planning Your Next Adventure
          </h2>
          <p className="text-gray-600 mb-8">
            Create your first trip itinerary and let our AI help you plan the perfect journey.
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 mx-auto"
          >
            <Plus className="w-5 h-5" />
            <span>Create New Trip</span>
          </button>
        </motion.div>

        <CreateTripModal 
          isOpen={showCreateModal} 
          onClose={() => setShowCreateModal(false)} 
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {currentTrip?.title || 'My Trips'}
            </h1>
            {currentTrip && (
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{currentTrip.destination}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {currentTrip.startDate.toLocaleDateString()} - {currentTrip.endDate.toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{currentTrip.travelers} traveler{currentTrip.travelers > 1 ? 's' : ''}</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex space-x-3 mt-4 lg:mt-0">
            <button
              onClick={() => setShowEmergencySOS(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Emergency SOS</span>
            </button>
            
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>New Trip</span>
            </button>
            
            {currentTrip && (
              <>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Share className="w-4 h-4" />
                  <span>Share</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Trip Selector */}
        {trips.length > 1 && (
          <div className="mb-8">
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {trips.map((trip) => (
                <button
                  key={trip.id}
                  onClick={() => setCurrentTrip(trip)}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentTrip?.id === trip.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {trip.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentTrip && (
          <>
            {/* Tabs */}
            <div className="flex space-x-1 mb-8 bg-gray-100 rounded-lg p-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'timeline' && <ItineraryTimeline trip={currentTrip} />}
              {activeTab === 'budget' && <BudgetTracker trip={currentTrip} />}
              {activeTab === 'ai' && <AIAssistant trip={currentTrip} />}
              {activeTab === 'packing' && mockTripDetails && (
                <PackingAssistant tripDetails={mockTripDetails} />
              )}
            </motion.div>
          </>
        )}

        <CreateTripModal 
          isOpen={showCreateModal} 
          onClose={() => setShowCreateModal(false)} 
        />

        <EmergencySOS
          isActive={showEmergencySOS}
          onClose={() => setShowEmergencySOS(false)}
          destination={currentTrip?.destination}
        />
      </div>
    </div>
  );
};

export default ItineraryPage;