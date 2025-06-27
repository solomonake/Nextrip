import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Send, 
  MapPin, 
  Calendar, 
  Users, 
  Plane,
  Building,
  Car,
  Camera,
  MessageCircle,
  Search,
  Heart,
  User,
  X,
  Check,
  Star,
  Globe,
  Clock
} from 'lucide-react';
import ItineraryPlanner from './ItineraryPlanner';
import VisaInformation from './VisaInformation';
import CollabMatching from '../community/CollabMatching';

const TravelBuddyAssistant: React.FC = () => {
  const [step, setStep] = useState<'input' | 'results' | 'itinerary' | 'visa' | 'buddies'>('input');
  const [travelDetails, setTravelDetails] = useState({
    startingLocation: '',
    destination: '',
    dateRange: '',
    travelers: '1',
    travelStyle: 'adventure',
    budgets: {
      flight: '0',
      hotel: '0',
      food: '0',
      activities: '0',
      souvenirs: '0'
    }
  });
  const [showBuddies, setShowBuddies] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setTravelDetails(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev] as Record<string, string>,
          [child]: value.replace(/^0+/, '') // Remove leading zeros
        }
      }));
    } else {
      setTravelDetails(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('results');
  };

  const handleBack = () => {
    if (step === 'results') {
      setStep('input');
    } else if (step === 'itinerary' || step === 'visa' || step === 'buddies') {
      setStep('results');
    }
  };

  const travelStyles = [
    { id: 'adventure', label: 'Adventure Seeker', icon: '🏔️', description: 'Thrilling activities and exploration' },
    { id: 'relaxation', label: 'Relaxation Enthusiast', icon: '🏖️', description: 'Peaceful and rejuvenating experiences' },
    { id: 'culture', label: 'Culture Explorer', icon: '🏛️', description: 'Museums, history, and local traditions' },
    { id: 'foodie', label: 'Food Connoisseur', icon: '🍜', description: 'Culinary experiences and local cuisine' },
    { id: 'budget', label: 'Budget Traveler', icon: '💰', description: 'Value-focused, affordable options' },
    { id: 'luxury', label: 'Luxury Traveler', icon: '✨', description: 'High-end experiences and accommodations' }
  ];

  const renderInputForm = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto"
    >
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-4">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AI Travel Planner</h2>
          <p className="text-gray-600">Tell me about your dream trip and I'll create the perfect itinerary</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              Starting Location
            </label>
            <input
              type="text"
              value={travelDetails.startingLocation}
              onChange={(e) => handleInputChange('startingLocation', e.target.value)}
              placeholder="e.g., New York, USA"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              Destination
            </label>
            <input
              type="text"
              value={travelDetails.destination}
              onChange={(e) => handleInputChange('destination', e.target.value)}
              placeholder="e.g., Paris, France"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Date Range
            </label>
            <input
              type="text"
              value={travelDetails.dateRange}
              onChange={(e) => handleInputChange('dateRange', e.target.value)}
              placeholder="e.g., June 15-25, 2024"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users className="w-4 h-4 inline mr-1" />
              Number of Travelers
            </label>
            <select
              value={travelDetails.travelers}
              onChange={(e) => handleInputChange('travelers', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Traveler' : 'Travelers'}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Travel Style
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {travelStyles.map((style) => (
              <button
                key={style.id}
                type="button"
                onClick={() => handleInputChange('travelStyle', style.id)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  travelDetails.travelStyle === style.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{style.icon}</span>
                  <div>
                    <h4 className="font-medium text-gray-900">{style.label}</h4>
                    <p className="text-xs text-gray-600">{style.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Budget Breakdown (USD)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">
                <Plane className="w-3 h-3 inline mr-1" />
                Flight
              </label>
              <input
                type="number"
                value={travelDetails.budgets.flight}
                onChange={(e) => handleInputChange('budgets.flight', e.target.value)}
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">
                <Building className="w-3 h-3 inline mr-1" />
                Hotel
              </label>
              <input
                type="number"
                value={travelDetails.budgets.hotel}
                onChange={(e) => handleInputChange('budgets.hotel', e.target.value)}
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">
                Food
              </label>
              <input
                type="number"
                value={travelDetails.budgets.food}
                onChange={(e) => handleInputChange('budgets.food', e.target.value)}
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">
                <Camera className="w-3 h-3 inline mr-1" />
                Activities
              </label>
              <input
                type="number"
                value={travelDetails.budgets.activities}
                onChange={(e) => handleInputChange('budgets.activities', e.target.value)}
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">
                Souvenirs
              </label>
              <input
                type="number"
                value={travelDetails.budgets.souvenirs}
                onChange={(e) => handleInputChange('budgets.souvenirs', e.target.value)}
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <Sparkles className="w-5 h-5" />
          <span>Generate My Perfect Trip</span>
        </button>
      </form>
    </motion.div>
  );

  const renderResults = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto"
    >
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mr-4">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Your Trip to {travelDetails.destination}</h2>
          <p className="text-gray-600">{travelDetails.dateRange} • {travelDetails.travelers} {parseInt(travelDetails.travelers) === 1 ? 'Traveler' : 'Travelers'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Plane className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Detailed Itinerary</h3>
          <p className="text-gray-600 mb-4">Day-by-day plan with activities, restaurants, and attractions</p>
          <button
            onClick={() => setStep('itinerary')}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Itinerary
          </button>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <Globe className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Visa Information</h3>
          <p className="text-gray-600 mb-4">Requirements, documents, and application process</p>
          <button
            onClick={() => setStep('visa')}
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Check Requirements
          </button>
        </div>

        <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-pink-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Travel Buddies</h3>
          <p className="text-gray-600 mb-4">Find compatible travelers for your trip (optional)</p>
          <button
            onClick={() => setShowBuddies(true)}
            className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition-colors"
          >
            Find Buddies
          </button>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Trip Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-start space-x-3 mb-3">
              <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">From</p>
                <p className="font-medium text-gray-900">{travelDetails.startingLocation}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 mb-3">
              <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">To</p>
                <p className="font-medium text-gray-900">{travelDetails.destination}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Calendar className="w-5 h-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Dates</p>
                <p className="font-medium text-gray-900">{travelDetails.dateRange}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-start space-x-3 mb-3">
              <Users className="w-5 h-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Travelers</p>
                <p className="font-medium text-gray-900">{travelDetails.travelers} {parseInt(travelDetails.travelers) === 1 ? 'Person' : 'People'}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 mb-3">
              <Star className="w-5 h-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Travel Style</p>
                <p className="font-medium text-gray-900">
                  {travelStyles.find(style => style.id === travelDetails.travelStyle)?.label || 'Adventure Seeker'}
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Generated</p>
                <p className="font-medium text-gray-900">{new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={handleBack}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Back to Planning
        </button>
        <button
          onClick={() => {}}
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <Send className="w-5 h-5" />
          <span>Save Trip</span>
        </button>
      </div>

      {/* Travel Buddies Modal */}
      {showBuddies && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Find Travel Buddies</h3>
              <button
                onClick={() => setShowBuddies(false)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-gray-600 mb-6">
              Connect with like-minded travelers who are visiting {travelDetails.destination} around the same time. 
              Finding travel buddies is optional and can enhance your travel experience.
            </p>
            
            <div className="mb-6">
              <CollabMatching />
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={() => setShowBuddies(false)}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {step === 'input' && renderInputForm()}
      {step === 'results' && renderResults()}
      {step === 'itinerary' && (
        <div className="max-w-6xl mx-auto">
          <button
            onClick={handleBack}
            className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-700"
          >
            ← Back to results
          </button>
          <ItineraryPlanner
            destination={travelDetails.destination}
            startDate={new Date()}
            endDate={new Date(new Date().setDate(new Date().getDate() + 7))}
            budget={Object.values(travelDetails.budgets).reduce((sum, val) => sum + parseInt(val || '0'), 0)}
            activityTypes={[travelDetails.travelStyle]}
            travelers={parseInt(travelDetails.travelers)}
          />
        </div>
      )}
      {step === 'visa' && (
        <div className="max-w-6xl mx-auto">
          <button
            onClick={handleBack}
            className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-700"
          >
            ← Back to results
          </button>
          <VisaInformation
            fromCountry={travelDetails.startingLocation}
            toCountry={travelDetails.destination}
            travelDate={new Date()}
            tripDuration={7}
            travelPurpose="tourism"
          />
        </div>
      )}
    </div>
  );
};

export default TravelBuddyAssistant;