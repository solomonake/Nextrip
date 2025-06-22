import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Users, DollarSign, Sparkles } from 'lucide-react';
import { useTrip } from '../../contexts/TripContext';
import { Trip } from '../../contexts/TripContext';

interface CreateTripModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateTripModal: React.FC<CreateTripModalProps> = ({ isOpen, onClose }) => {
  const { addTrip } = useTrip();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 1,
    budget: 1000,
    persona: 'solo' as 'solo' | 'group' | 'business' | 'eco' | 'budget'
  });

  const personas = [
    { id: 'solo', label: 'Solo Explorer', icon: '🎒', description: 'Independent adventures' },
    { id: 'group', label: 'Group Planner', icon: '👥', description: 'Collaborative trips' },
    { id: 'business', label: 'Business Traveler', icon: '💼', description: 'Efficient travel' },
    { id: 'eco', label: 'Eco-Conscious', icon: '🌱', description: 'Sustainable journeys' },
    { id: 'budget', label: 'Budget Traveler', icon: '💰', description: 'Value-focused trips' }
  ];

  const validateDate = (dateString: string): boolean => {
    if (!dateString) return false;
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate dates before creating the trip
    if (!validateDate(formData.startDate)) {
      alert('Please enter a valid start date');
      return;
    }
    
    if (!validateDate(formData.endDate)) {
      alert('Please enter a valid end date');
      return;
    }
    
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    
    // Additional validation: end date should be after start date
    if (endDate <= startDate) {
      alert('End date must be after start date');
      return;
    }
    
    const newTrip: Trip = {
      id: Date.now().toString(),
      title: formData.title,
      destination: formData.destination,
      startDate: startDate,
      endDate: endDate,
      travelers: formData.travelers,
      budget: {
        total: formData.budget,
        spent: 0,
        categories: {
          flights: Math.round(formData.budget * 0.3),
          hotels: Math.round(formData.budget * 0.35),
          food: Math.round(formData.budget * 0.2),
          activities: Math.round(formData.budget * 0.1),
          transport: Math.round(formData.budget * 0.05)
        }
      },
      itinerary: [],
      bookings: []
    };

    addTrip(newTrip);
    onClose();
    setStep(1);
    setFormData({
      title: '',
      destination: '',
      startDate: '',
      endDate: '',
      travelers: 1,
      budget: 1000,
      persona: 'solo'
    });
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
              onClick={onClose}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Step {step} of 3</span>
                  <span className="text-sm text-gray-500">{Math.round((step / 3) * 100)}% complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(step / 3) * 100}%` }}
                  />
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Step 1: Basic Info */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Trip Details</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Trip Title
                        </label>
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) => handleInputChange('title', e.target.value)}
                          placeholder="e.g., Summer Adventure in Japan"
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
                          value={formData.destination}
                          onChange={(e) => handleInputChange('destination', e.target.value)}
                          placeholder="e.g., Tokyo, Japan"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <Calendar className="w-4 h-4 inline mr-1" />
                            Start Date
                          </label>
                          <input
                            type="date"
                            value={formData.startDate}
                            onChange={(e) => handleInputChange('startDate', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            End Date
                          </label>
                          <input
                            type="date"
                            value={formData.endDate}
                            onChange={(e) => handleInputChange('endDate', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Users className="w-4 h-4 inline mr-1" />
                          Number of Travelers
                        </label>
                        <select
                          value={formData.travelers}
                          onChange={(e) => handleInputChange('travelers', parseInt(e.target.value))}
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
                  </motion.div>
                )}

                {/* Step 2: Budget */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Budget Planning</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <DollarSign className="w-4 h-4 inline mr-1" />
                          Total Budget
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                          <input
                            type="number"
                            value={formData.budget}
                            onChange={(e) => handleInputChange('budget', parseInt(e.target.value))}
                            min="100"
                            step="100"
                            className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div className="mt-2 text-sm text-gray-500">
                          Budget will be automatically distributed across categories
                        </div>
                      </div>

                      {/* Budget Breakdown Preview */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">Budget Breakdown</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Flights (30%)</span>
                            <span>${Math.round(formData.budget * 0.3)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Hotels (35%)</span>
                            <span>${Math.round(formData.budget * 0.35)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Food (20%)</span>
                            <span>${Math.round(formData.budget * 0.2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Activities (10%)</span>
                            <span>${Math.round(formData.budget * 0.1)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Transport (5%)</span>
                            <span>${Math.round(formData.budget * 0.05)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Travel Persona */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Travel Style</h2>
                    <p className="text-gray-600 mb-6">
                      Choose your travel persona to get personalized recommendations
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {personas.map((persona) => (
                        <button
                          key={persona.id}
                          type="button"
                          onClick={() => handleInputChange('persona', persona.id)}
                          className={`p-4 rounded-lg border-2 text-left transition-all ${
                            formData.persona === persona.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{persona.icon}</span>
                            <div>
                              <h4 className="font-medium text-gray-900">{persona.label}</h4>
                              <p className="text-sm text-gray-600">{persona.description}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Navigation */}
                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={step === 1 ? onClose : prevStep}
                    className="px-6 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {step === 1 ? 'Cancel' : 'Back'}
                  </button>

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={
                        (step === 1 && (!formData.title || !formData.destination || !formData.startDate || !formData.endDate)) ||
                        (step === 2 && formData.budget < 100)
                      }
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Create Trip</span>
                    </button>
                  )}
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CreateTripModal;