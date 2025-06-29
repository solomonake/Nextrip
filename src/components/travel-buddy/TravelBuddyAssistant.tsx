import React, { useState, useEffect } from 'react';
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
  Clock,
  ChevronLeft,
  ChevronRight,
  Utensils,
  Map
} from 'lucide-react';
import ItineraryPlanner from './ItineraryPlanner';
import VisaInformation from './VisaInformation';
import CollabMatching from '../community/CollabMatching';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ItineraryGenerator from '../ItineraryGenerator';
import { useTrip } from '../../contexts/TripContext';
import { useToast } from '../../contexts/ToastContext';
import { useNavigate } from 'react-router-dom';
import GoogleMapsSelector from './GoogleMapsSelector';
import { useAppState } from '../../contexts/AppStateContext';

interface Attraction {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  rating: number;
  price_level?: number;
  types: string[];
  vicinity: string;
  photos?: { photo_reference: string }[];
  selected?: boolean;
}

const TravelBuddyAssistant: React.FC = () => {
  const { appState, updateTravelDetails } = useAppState();
  const [step, setStep] = useState<'input' | 'results' | 'itinerary' | 'visa' | 'buddies' | 'itineraryOptions' | 'map'>('input');
  const [selectedItinerary, setSelectedItinerary] = useState<number | null>(null);
  const [selectedAttractions, setSelectedAttractions] = useState<Attraction[]>([]);
  const [showBuddies, setShowBuddies] = useState(false);
  const { addTrip } = useTrip();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string | Date | null) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      if (parent === 'budgets') {
        updateTravelDetails({
          budgets: {
            ...appState.travelDetails.budgets,
            [child]: typeof value === 'string' ? value.replace(/^0+/, '') : value
          }
        });
      }
    } else {
      updateTravelDetails({
        [field]: value
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('itineraryOptions');
  };

  const handleBack = () => {
    if (step === 'itineraryOptions') {
      setStep('input');
    } else if (step === 'results') {
      setStep('itineraryOptions');
    } else if (step === 'itinerary' || step === 'visa' || step === 'buddies' || step === 'map') {
      setStep('results');
    }
  };

  const handleSelectItinerary = (index: number) => {
    setSelectedItinerary(index);
    setStep('results');
  };

  const handleAttractionsSelected = (attractions: Attraction[]) => {
    setSelectedAttractions(attractions);
  };

  const handleSaveTrip = () => {
    if (!appState.travelDetails.startDate || !appState.travelDetails.endDate) {
      showToast('Please select valid travel dates', 'error');
      return;
    }

    // Calculate total budget
    const totalBudget = Object.values(appState.travelDetails.budgets).reduce(
      (sum, val) => sum + parseInt(val || '0'), 0
    );

    // Create a new trip object
    const newTrip = {
      id: Date.now().toString(),
      title: `Trip to ${appState.travelDetails.destination}`,
      destination: appState.travelDetails.destination,
      startDate: appState.travelDetails.startDate,
      endDate: appState.travelDetails.endDate,
      travelers: parseInt(appState.travelDetails.travelers),
      budget: {
        total: totalBudget,
        spent: 0,
        categories: {
          flights: parseInt(appState.travelDetails.budgets.flight) || 0,
          hotels: parseInt(appState.travelDetails.budgets.hotel) || 0,
          food: parseInt(appState.travelDetails.budgets.food) || 0,
          activities: parseInt(appState.travelDetails.budgets.activities) || 0,
          transport: parseInt(appState.travelDetails.budgets.souvenirs) || 0
        }
      },
      itinerary: [],
      bookings: []
    };

    // Add the trip to the context
    addTrip(newTrip);
    
    // Show success toast
    showToast('Trip saved successfully!', 'success');
    
    // Navigate to the trips page
    navigate('/my-trips');
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
              value={appState.travelDetails.startingLocation}
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
              value={appState.travelDetails.destination}
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
              Start Date
            </label>
            <div className="relative">
              <DatePicker
                selected={appState.travelDetails.startDate}
                onChange={(date) => handleInputChange('startDate', date)}
                selectsStart
                startDate={appState.travelDetails.startDate}
                endDate={appState.travelDetails.endDate}
                minDate={new Date()}
                placeholderText="Select start date"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              End Date
            </label>
            <div className="relative">
              <DatePicker
                selected={appState.travelDetails.endDate}
                onChange={(date) => handleInputChange('endDate', date)}
                selectsEnd
                startDate={appState.travelDetails.startDate}
                endDate={appState.travelDetails.endDate}
                minDate={appState.travelDetails.startDate}
                placeholderText="Select end date"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Users className="w-4 h-4 inline mr-1" />
            Number of Travelers
          </label>
          <select
            value={appState.travelDetails.travelers}
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
                  appState.travelDetails.travelStyle === style.id
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
                value={appState.travelDetails.budgets.flight}
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
                value={appState.travelDetails.budgets.hotel}
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
                value={appState.travelDetails.budgets.food}
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
                value={appState.travelDetails.budgets.activities}
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
                value={appState.travelDetails.budgets.souvenirs}
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

  const renderItineraryOptions = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto"
    >
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Choose Your Ideal Itinerary</h2>
      <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
        We've created three personalized itineraries for your trip to {appState.travelDetails.destination}. 
        Each offers a different experience based on your preferences.
      </p>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Budget Explorer Itinerary */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6">
            <h3 className="text-2xl font-bold mb-2">Budget Explorer</h3>
            <p className="text-sm opacity-90">Smart savings without compromising on experiences</p>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <span className="text-3xl font-bold">$1,850</span>
                <span className="text-sm opacity-75 ml-2">total</span>
              </div>
              <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                <span className="text-sm font-medium">Save $450</span>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <div className="flex items-center mb-3">
                <Plane className="w-5 h-5 text-blue-600 mr-2" />
                <h4 className="font-semibold text-gray-900">Economy Flights</h4>
              </div>
              <p className="text-sm text-gray-600">Affordable flights with one stop, optimized for value</p>
            </div>

            <div>
              <div className="flex items-center mb-3">
                <Building className="w-5 h-5 text-purple-600 mr-2" />
                <h4 className="font-semibold text-gray-900">Comfortable Hostels & Guesthouses</h4>
              </div>
              <p className="text-sm text-gray-600">Clean, well-rated budget accommodations in good locations</p>
            </div>

            <div>
              <div className="flex items-center mb-3">
                <Utensils className="w-5 h-5 text-orange-600 mr-2" />
                <h4 className="font-semibold text-gray-900">Local Eateries & Street Food</h4>
              </div>
              <p className="text-sm text-gray-600">Authentic local cuisine at affordable prices</p>
            </div>

            <div>
              <div className="flex items-center mb-3">
                <Camera className="w-5 h-5 text-green-600 mr-2" />
                <h4 className="font-semibold text-gray-900">Free & Low-Cost Activities</h4>
              </div>
              <p className="text-sm text-gray-600">Focus on free attractions with select paid experiences</p>
            </div>
          </div>

          <div className="p-6 bg-gray-50 border-t">
            <button 
              onClick={() => handleSelectItinerary(0)}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors"
            >
              Choose This Itinerary
            </button>
          </div>
        </div>

        {/* Balanced Itinerary */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform scale-105 z-10">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 relative">
            <div className="absolute top-0 right-0 bg-yellow-400 text-blue-900 px-4 py-1 font-bold text-sm transform translate-y-2 rotate-45 origin-bottom-right">
              POPULAR
            </div>
            <h3 className="text-2xl font-bold mb-2">Perfect Balance</h3>
            <p className="text-sm opacity-90">The ideal mix of comfort, culture, and adventure</p>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <span className="text-3xl font-bold">$2,300</span>
                <span className="text-sm opacity-75 ml-2">total</span>
              </div>
              <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                <span className="text-sm font-medium">Best Value</span>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <div className="flex items-center mb-3">
                <Plane className="w-5 h-5 text-blue-600 mr-2" />
                <h4 className="font-semibold text-gray-900">Direct Flights</h4>
              </div>
              <p className="text-sm text-gray-600">Convenient flight times with minimal layovers</p>
            </div>

            <div>
              <div className="flex items-center mb-3">
                <Building className="w-5 h-5 text-purple-600 mr-2" />
                <h4 className="font-semibold text-gray-900">Mid-Range Hotels</h4>
              </div>
              <p className="text-sm text-gray-600">3-4 star hotels with good amenities in central locations</p>
            </div>

            <div>
              <div className="flex items-center mb-3">
                <Utensils className="w-5 h-5 text-orange-600 mr-2" />
                <h4 className="font-semibold text-gray-900">Mix of Dining Experiences</h4>
              </div>
              <p className="text-sm text-gray-600">Local favorites plus some special dining experiences</p>
            </div>

            <div>
              <div className="flex items-center mb-3">
                <Camera className="w-5 h-5 text-green-600 mr-2" />
                <h4 className="font-semibold text-gray-900">Curated Activities</h4>
              </div>
              <p className="text-sm text-gray-600">Must-see attractions plus some unique experiences</p>
            </div>
          </div>

          <div className="p-6 bg-gray-50 border-t">
            <button 
              onClick={() => handleSelectItinerary(1)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
            >
              Choose This Itinerary
            </button>
          </div>
        </div>

        {/* Luxury Itinerary */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
            <h3 className="text-2xl font-bold mb-2">Premium Experience</h3>
            <p className="text-sm opacity-90">Luxury accommodations and exclusive experiences</p>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <span className="text-3xl font-bold">$3,500</span>
                <span className="text-sm opacity-75 ml-2">total</span>
              </div>
              <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                <span className="text-sm font-medium">Top Tier</span>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <div className="flex items-center mb-3">
                <Plane className="w-5 h-5 text-blue-600 mr-2" />
                <h4 className="font-semibold text-gray-900">Business Class Flights</h4>
              </div>
              <p className="text-sm text-gray-600">Premium comfort with direct routes and flexible options</p>
            </div>

            <div>
              <div className="flex items-center mb-3">
                <Building className="w-5 h-5 text-purple-600 mr-2" />
                <h4 className="font-semibold text-gray-900">Luxury Hotels & Resorts</h4>
              </div>
              <p className="text-sm text-gray-600">4-5 star accommodations with premium amenities</p>
            </div>

            <div>
              <div className="flex items-center mb-3">
                <Utensils className="w-5 h-5 text-orange-600 mr-2" />
                <h4 className="font-semibold text-gray-900">Fine Dining Experiences</h4>
              </div>
              <p className="text-sm text-gray-600">Michelin-starred restaurants and exclusive dining</p>
            </div>

            <div>
              <div className="flex items-center mb-3">
                <Camera className="w-5 h-5 text-green-600 mr-2" />
                <h4 className="font-semibold text-gray-900">VIP Experiences & Private Tours</h4>
              </div>
              <p className="text-sm text-gray-600">Skip-the-line access and personalized experiences</p>
            </div>
          </div>

          <div className="p-6 bg-gray-50 border-t">
            <button 
              onClick={() => handleSelectItinerary(2)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition-colors"
            >
              Choose This Itinerary
            </button>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Itinerary Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Feature</th>
                <th className="text-center py-3 px-4">Budget Explorer</th>
                <th className="text-center py-3 px-4">Perfect Balance</th>
                <th className="text-center py-3 px-4">Premium Experience</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4 font-medium">Price</td>
                <td className="text-center py-3 px-4 text-green-600 font-medium">$1,850</td>
                <td className="text-center py-3 px-4 text-blue-600 font-medium">$2,300</td>
                <td className="text-center py-3 px-4 text-purple-600 font-medium">$3,500</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-medium">Accommodation</td>
                <td className="text-center py-3 px-4">Hostels & Guesthouses</td>
                <td className="text-center py-3 px-4">3-4 Star Hotels</td>
                <td className="text-center py-3 px-4">4-5 Star Luxury Hotels</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-medium">Transportation</td>
                <td className="text-center py-3 px-4">Public Transit & Walking</td>
                <td className="text-center py-3 px-4">Mix of Transit & Taxis</td>
                <td className="text-center py-3 px-4">Private Transfers</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-medium">Dining</td>
                <td className="text-center py-3 px-4">Street Food & Local Eateries</td>
                <td className="text-center py-3 px-4">Mix of Local & Upscale</td>
                <td className="text-center py-3 px-4">Fine Dining & Exclusive</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-medium">Activities</td>
                <td className="text-center py-3 px-4">Free & Budget-Friendly</td>
                <td className="text-center py-3 px-4">Mix of Essential & Special</td>
                <td className="text-center py-3 px-4">VIP Access & Private Tours</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Best For</td>
                <td className="text-center py-3 px-4">Budget-conscious travelers</td>
                <td className="text-center py-3 px-4">Most travelers</td>
                <td className="text-center py-3 px-4">Luxury experience seekers</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={handleBack}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Back to Planning
        </button>
      </div>
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
          <h2 className="text-2xl font-bold text-gray-900">Your Trip to {appState.travelDetails.destination}</h2>
          <p className="text-gray-600">
            {appState.travelDetails.startDate && appState.travelDetails.endDate ? 
              `${appState.travelDetails.startDate.toLocaleDateString()} - ${appState.travelDetails.endDate.toLocaleDateString()}` : 
              "Date range not specified"} • {appState.travelDetails.travelers} {parseInt(appState.travelDetails.travelers) === 1 ? 'Traveler' : 'Travelers'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Map className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Explore Map</h3>
          <p className="text-gray-600 mb-4">Discover and select attractions for your itinerary</p>
          <button
            onClick={() => setStep('map')}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Open Map
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
                <p className="font-medium text-gray-900">{appState.travelDetails.startingLocation}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 mb-3">
              <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">To</p>
                <p className="font-medium text-gray-900">{appState.travelDetails.destination}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Calendar className="w-5 h-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Dates</p>
                <p className="font-medium text-gray-900">
                  {appState.travelDetails.startDate && appState.travelDetails.endDate ? 
                    `${appState.travelDetails.startDate.toLocaleDateString()} - ${appState.travelDetails.endDate.toLocaleDateString()}` : 
                    "Date range not specified"}
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-start space-x-3 mb-3">
              <Users className="w-5 h-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Travelers</p>
                <p className="font-medium text-gray-900">{appState.travelDetails.travelers} {parseInt(appState.travelDetails.travelers) === 1 ? 'Person' : 'People'}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 mb-3">
              <Star className="w-5 h-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Travel Style</p>
                <p className="font-medium text-gray-900">
                  {travelStyles.find(style => style.id === appState.travelDetails.travelStyle)?.label || 'Adventure Seeker'}
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

      {selectedAttractions.length > 0 && (
        <div className="bg-green-50 rounded-xl p-6 mb-8 border border-green-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <MapPin className="w-5 h-5 text-green-600 mr-2" />
            Selected Attractions ({selectedAttractions.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {selectedAttractions.map(attraction => (
              <div key={attraction.id} className="flex items-center p-3 bg-white rounded-lg border border-green-100">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{attraction.name}</h4>
                  <div className="flex items-center text-xs text-gray-600">
                    <Star className="w-3 h-3 text-yellow-500 mr-1" />
                    <span>{attraction.rating.toFixed(1)}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const updated = selectedAttractions.filter(a => a.id !== attraction.id);
                    setSelectedAttractions(updated);
                  }}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex space-x-4">
        <button
          onClick={handleBack}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Back to Options
        </button>
        <button
          onClick={handleSaveTrip}
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
              Connect with like-minded travelers who are visiting {appState.travelDetails.destination} around the same time. 
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

  const formatDateRange = () => {
    if (!appState.travelDetails.startDate || !appState.travelDetails.endDate) return "";
    
    const options = { year: 'numeric', month: 'short', day: 'numeric' } as const;
    return `${appState.travelDetails.startDate.toLocaleDateString('en-US', options)} - ${appState.travelDetails.endDate.toLocaleDateString('en-US', options)}`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {step === 'input' && renderInputForm()}
      {step === 'itineraryOptions' && renderItineraryOptions()}
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
            destination={appState.travelDetails.destination}
            startDate={appState.travelDetails.startDate || new Date()}
            endDate={appState.travelDetails.endDate || new Date(new Date().setDate(new Date().getDate() + 7))}
            budget={Object.values(appState.travelDetails.budgets).reduce((sum, val) => sum + parseInt(val || '0'), 0)}
            activityTypes={[appState.travelDetails.travelStyle]}
            travelers={parseInt(appState.travelDetails.travelers)}
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
            fromCountry={appState.travelDetails.startingLocation}
            toCountry={appState.travelDetails.destination}
            travelDate={appState.travelDetails.startDate || new Date()}
            tripDuration={appState.travelDetails.startDate && appState.travelDetails.endDate ? 
              Math.ceil((appState.travelDetails.endDate.getTime() - appState.travelDetails.startDate.getTime()) / (1000 * 60 * 60 * 24)) : 7}
            travelPurpose="tourism"
          />
        </div>
      )}
      {step === 'map' && (
        <div className="max-w-6xl mx-auto">
          <button
            onClick={handleBack}
            className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-700"
          >
            ← Back to results
          </button>
          <GoogleMapsSelector 
            destination={appState.travelDetails.destination}
            onAttractionsSelected={handleAttractionsSelected}
            selectedAttractions={selectedAttractions}
          />
        </div>
      )}
    </div>
  );
};

export default TravelBuddyAssistant;