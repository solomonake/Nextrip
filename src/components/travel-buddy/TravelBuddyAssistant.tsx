import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Users, 
  Search,
  ArrowRight,
  Globe,
  Flag,
  Compass,
  Heart,
  MessageCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const TravelBuddyAssistant: React.FC = () => {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [travelStyle, setTravelStyle] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const travelStyles = [
    { id: 'adventurous', label: 'Adventurous' },
    { id: 'relaxed', label: 'Relaxed' },
    { id: 'cultural', label: 'Cultural' },
    { id: 'foodie', label: 'Foodie' },
    { id: 'luxury', label: 'Luxury' },
    { id: 'budget', label: 'Budget' },
    { id: 'nightlife', label: 'Nightlife' },
    { id: 'nature', label: 'Nature Lover' }
  ];

  const interestOptions = [
    { id: 'hiking', label: 'Hiking' },
    { id: 'photography', label: 'Photography' },
    { id: 'food', label: 'Local Cuisine' },
    { id: 'museums', label: 'Museums' },
    { id: 'shopping', label: 'Shopping' },
    { id: 'beaches', label: 'Beaches' },
    { id: 'nightlife', label: 'Nightlife' },
    { id: 'history', label: 'History' },
    { id: 'art', label: 'Art' },
    { id: 'music', label: 'Music' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'wildlife', label: 'Wildlife' }
  ];

  const handleTravelStyleToggle = (styleId: string) => {
    if (travelStyle.includes(styleId)) {
      setTravelStyle(travelStyle.filter(id => id !== styleId));
    } else {
      setTravelStyle([...travelStyle, styleId]);
    }
  };

  const handleInterestToggle = (interestId: string) => {
    if (interests.includes(interestId)) {
      setInterests(interests.filter(id => id !== interestId));
    } else {
      setInterests([...interests, interestId]);
    }
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // In a real app, this would send the data to an API
    console.log({
      destination,
      startDate,
      endDate,
      travelStyle,
      interests
    });
    
    // Simulate API call delay
    setTimeout(() => {
      setIsSubmitting(false);
      // Navigate to the matching page
      window.location.href = '/travel-buddy-matching';
    }, 1500);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return destination.trim() !== '';
      case 2:
        return startDate !== '' && endDate !== '';
      case 3:
        return travelStyle.length > 0 && interests.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <Sparkles className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Find Your Perfect Travel Buddy
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Connect with like-minded travelers who share your destination, dates, and travel style.
          Explore together and make lasting memories!
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Progress Steps */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-white">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              {[1, 2, 3].map((stepNumber) => (
                <div 
                  key={stepNumber}
                  className={`flex items-center ${stepNumber < step ? 'text-white' : stepNumber === step ? 'text-white' : 'text-white/50'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                    stepNumber < step 
                      ? 'bg-white text-blue-600' 
                      : stepNumber === step 
                      ? 'bg-white/20 border-2 border-white' 
                      : 'bg-white/10'
                  }`}>
                    {stepNumber < step ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      stepNumber
                    )}
                  </div>
                  <span className="hidden sm:inline font-medium">
                    {stepNumber === 1 ? 'Destination' : 
                     stepNumber === 2 ? 'Dates' : 
                     'Preferences'}
                  </span>
                </div>
              ))}
            </div>
            <div className="text-sm font-medium">
              Step {step} of 3
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-8">
          {/* Step 1: Destination */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Where are you traveling to?</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Destination
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g., Tokyo, Japan"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Enter the city or country you're planning to visit
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                  <Compass className="w-5 h-5 mr-2" />
                  Popular Destinations
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {['Tokyo, Japan', 'Paris, France', 'Bali, Indonesia', 'New York, USA', 'Barcelona, Spain', 'Bangkok, Thailand'].map((place) => (
                    <button
                      key={place}
                      onClick={() => setDestination(place)}
                      className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                        destination === place
                          ? 'bg-blue-200 text-blue-800'
                          : 'bg-white hover:bg-blue-100 text-gray-700 hover:text-blue-800'
                      }`}
                    >
                      {place}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Travel Dates */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">When are you traveling?</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="bg-purple-50 rounded-lg p-6 border border-purple-100">
                <h3 className="font-semibold text-purple-900 mb-3">Travel Buddy Tip</h3>
                <p className="text-sm text-purple-800">
                  Setting flexible dates increases your chances of finding compatible travel buddies. 
                  Consider adding a few days of buffer before and after your ideal travel period.
                </p>
              </div>
            </motion.div>
          )}

          {/* Step 3: Travel Style & Interests */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What's your travel style?</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Travel Style (select all that apply)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {travelStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => handleTravelStyleToggle(style.id)}
                      className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                        travelStyle.includes(style.id)
                          ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent'
                      }`}
                    >
                      {style.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interests (select all that apply)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {interestOptions.map((interest) => (
                    <button
                      key={interest.id}
                      onClick={() => handleInterestToggle(interest.id)}
                      className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                        interests.includes(interest.id)
                          ? 'bg-green-100 text-green-800 border-2 border-green-300'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent'
                      }`}
                    >
                      {interest.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-pink-50 rounded-lg p-6 border border-pink-100">
                <h3 className="font-semibold text-pink-900 mb-3 flex items-center">
                  <Heart className="w-5 h-5 mr-2" />
                  How Matching Works
                </h3>
                <p className="text-sm text-pink-800">
                  We'll match you with travelers who share your destination, have overlapping travel dates, 
                  and compatible travel styles. The more information you provide, the better matches we can find!
                </p>
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevStep}
              className={`px-6 py-3 text-gray-600 font-medium ${step === 1 ? 'invisible' : ''}`}
            >
              Back
            </button>
            
            <button
              onClick={handleNextStep}
              disabled={!isStepValid() || isSubmitting}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Finding Matches...</span>
                </>
              ) : (
                <>
                  <span>{step === 3 ? 'Find Matches' : 'Next'}</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Flag className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Shared Experiences</h3>
          <p className="text-gray-600 text-sm">
            Travel with someone who shares your interests and can enhance your journey with their unique perspective.
          </p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Safety in Numbers</h3>
          <p className="text-gray-600 text-sm">
            Traveling with a buddy can be safer, especially in unfamiliar destinations. Share costs and watch out for each other.
          </p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
            <MessageCircle className="w-6 h-6 text-pink-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Make New Friends</h3>
          <p className="text-gray-600 text-sm">
            Form meaningful connections with travelers from around the world who share your passion for exploration.
          </p>
        </div>
      </div>
    </div>
  );
};

// Additional components for the page
const Check: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export default TravelBuddyAssistant;