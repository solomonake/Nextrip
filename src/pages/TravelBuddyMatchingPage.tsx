import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Check, 
  MapPin, 
  Calendar, 
  Globe, 
  MessageCircle, 
  Heart, 
  Star, 
  Users,
  Compass,
  Flag,
  Languages,
  DollarSign,
  Camera,
  Music,
  Coffee,
  Utensils,
  Moon,
  Mountain,
  Umbrella,
  Book,
  Smile
} from 'lucide-react';

interface TravelBuddy {
  id: string;
  name: string;
  username: string;
  homeCountry: string;
  countryFlag: string;
  age: number;
  destination: string;
  travelDates: {
    start: string;
    end: string;
  };
  travelStyle: string[];
  personality: string[];
  languages: string[];
  budget: 'budget' | 'mid-range' | 'luxury';
  interests: string[];
  bio: string;
  icebreaker: string;
  profileImage: string;
  additionalImages: string[];
  matchPercentage: number;
}

const TravelBuddyMatchingPage: React.FC = () => {
  const [potentialBuddies, setPotentialBuddies] = useState<TravelBuddy[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedBuddies, setSavedBuddies] = useState<string[]>([]);
  const [skippedBuddies, setSkippedBuddies] = useState<string[]>([]);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchedBuddy, setMatchedBuddy] = useState<TravelBuddy | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    destination: '',
    minAge: 18,
    maxAge: 65,
    travelStyles: [] as string[],
    interests: [] as string[]
  });

  // Generate mock travel buddies
  useEffect(() => {
    const generateMockBuddies = (): TravelBuddy[] => {
      const mockBuddies: TravelBuddy[] = [
        {
          id: '1',
          name: 'Emma',
          username: 'adventure_emma',
          homeCountry: 'Canada',
          countryFlag: '🇨🇦',
          age: 28,
          destination: 'Tokyo, Japan',
          travelDates: {
            start: '2024-07-15',
            end: '2024-07-28'
          },
          travelStyle: ['adventurous', 'cultural', 'foodie'],
          personality: ['outgoing', 'spontaneous', 'curious'],
          languages: ['English', 'French', 'Basic Japanese'],
          budget: 'mid-range',
          interests: ['hiking', 'photography', 'local cuisine', 'temples'],
          bio: "Photographer and hiking enthusiast looking for someone to explore Tokyo's hidden gems and nearby nature trails. Always up for trying weird food and getting lost in new neighborhoods!",
          icebreaker: "What's the strangest food you've ever tried while traveling?",
          profileImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          additionalImages: [
            'https://images.pexels.com/photos/1051075/pexels-photo-1051075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          ],
          matchPercentage: 92
        },
        {
          id: '2',
          name: 'Miguel',
          username: 'miguel_explorer',
          homeCountry: 'Spain',
          countryFlag: '🇪🇸',
          age: 31,
          destination: 'Tokyo, Japan',
          travelDates: {
            start: '2024-07-18',
            end: '2024-07-30'
          },
          travelStyle: ['cultural', 'relaxed', 'foodie'],
          personality: ['laid-back', 'organized', 'friendly'],
          languages: ['Spanish', 'English', 'Portuguese'],
          budget: 'mid-range',
          interests: ['architecture', 'museums', 'street food', 'markets'],
          bio: "Architect from Barcelona with a passion for urban exploration and food markets. Looking for someone to share Tokyo adventures with. I plan just enough to not miss the important stuff, but love to wander and discover.",
          icebreaker: "If you could design your dream building in Tokyo, what would it be?",
          profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          additionalImages: [
            'https://images.pexels.com/photos/3760809/pexels-photo-3760809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/3771836/pexels-photo-3771836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          ],
          matchPercentage: 87
        },
        {
          id: '3',
          name: 'Aiko',
          username: 'aiko_tokyo',
          homeCountry: 'Japan',
          countryFlag: '🇯🇵',
          age: 26,
          destination: 'Tokyo, Japan',
          travelDates: {
            start: '2024-07-10',
            end: '2024-07-25'
          },
          travelStyle: ['local', 'cultural', 'nightlife'],
          personality: ['friendly', 'patient', 'knowledgeable'],
          languages: ['Japanese', 'English'],
          budget: 'budget',
          interests: ['karaoke', 'izakaya hopping', 'anime', 'shopping'],
          bio: "Tokyo local who loves showing visitors the real side of my city! I know all the best non-touristy spots and can help you navigate like a pro. Looking for travel buddies to share authentic experiences with.",
          icebreaker: "What's one thing about Japan that you're most curious about?",
          profileImage: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          additionalImages: [
            'https://images.pexels.com/photos/5082976/pexels-photo-5082976.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/1799901/pexels-photo-1799901.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          ],
          matchPercentage: 95
        },
        {
          id: '4',
          name: 'Liam',
          username: 'tech_nomad_liam',
          homeCountry: 'Australia',
          countryFlag: '🇦🇺',
          age: 34,
          destination: 'Tokyo, Japan',
          travelDates: {
            start: '2024-07-14',
            end: '2024-07-29'
          },
          travelStyle: ['tech', 'urban', 'luxury'],
          personality: ['analytical', 'curious', 'easy-going'],
          languages: ['English'],
          budget: 'luxury',
          interests: ['technology', 'gadgets', 'craft beer', 'modern art'],
          bio: "Digital nomad and tech enthusiast excited to explore Tokyo's cutting-edge side. Looking for someone to check out electronics districts, robot restaurants, and high-end cocktail bars. Happy to splurge on unique experiences!",
          icebreaker: "If you could bring home one piece of Japanese technology, what would it be?",
          profileImage: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          additionalImages: [
            'https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/3182834/pexels-photo-3182834.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          ],
          matchPercentage: 78
        },
        {
          id: '5',
          name: 'Sofia',
          username: 'sofia_foodie',
          homeCountry: 'Italy',
          countryFlag: '🇮🇹',
          age: 29,
          destination: 'Tokyo, Japan',
          travelDates: {
            start: '2024-07-16',
            end: '2024-07-27'
          },
          travelStyle: ['foodie', 'relaxed', 'cultural'],
          personality: ['warm', 'passionate', 'detail-oriented'],
          languages: ['Italian', 'English', 'Spanish'],
          budget: 'mid-range',
          interests: ['cooking classes', 'food markets', 'sake tasting', 'traditional crafts'],
          bio: "Culinary school graduate on a mission to discover authentic Japanese cuisine beyond sushi! Looking for a travel buddy to join me for food tours, cooking classes, and hunting down the best ramen shops in Tokyo.",
          icebreaker: "What's the best meal you've ever had while traveling?",
          profileImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          additionalImages: [
            'https://images.pexels.com/photos/3771120/pexels-photo-3771120.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          ],
          matchPercentage: 89
        }
      ];
      
      return mockBuddies;
    };
    
    // Simulate API call delay
    setTimeout(() => {
      setPotentialBuddies(generateMockBuddies());
      setIsLoading(false);
    }, 1500);
  }, []);

  const currentBuddy = potentialBuddies[currentIndex];

  const handleSwipeRight = () => {
    if (!currentBuddy) return;
    
    // Save this buddy
    setSavedBuddies(prev => [...prev, currentBuddy.id]);
    
    // Simulate a match (20% chance)
    if (Math.random() < 0.2) {
      setMatchedBuddy(currentBuddy);
      setShowMatchModal(true);
    }
    
    goToNextBuddy();
  };

  const handleSwipeLeft = () => {
    if (!currentBuddy) return;
    
    // Skip this buddy
    setSkippedBuddies(prev => [...prev, currentBuddy.id]);
    goToNextBuddy();
  };

  const goToNextBuddy = () => {
    if (currentIndex < potentialBuddies.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentImageIndex(0); // Reset image index for next buddy
    }
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentBuddy) return;
    
    const totalImages = currentBuddy.additionalImages.length + 1;
    setCurrentImageIndex((currentImageIndex + 1) % totalImages);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentBuddy) return;
    
    const totalImages = currentBuddy.additionalImages.length + 1;
    setCurrentImageIndex((currentImageIndex - 1 + totalImages) % totalImages);
  };

  const getCurrentImage = () => {
    if (!currentBuddy) return '';
    
    if (currentImageIndex === 0) {
      return currentBuddy.profileImage;
    }
    
    return currentBuddy.additionalImages[currentImageIndex - 1];
  };

  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    
    const startMonth = startDate.toLocaleString('default', { month: 'short' });
    const endMonth = endDate.toLocaleString('default', { month: 'short' });
    
    if (startMonth === endMonth) {
      return `${startMonth} ${startDate.getDate()}-${endDate.getDate()}, ${startDate.getFullYear()}`;
    }
    
    return `${startMonth} ${startDate.getDate()} - ${endMonth} ${endDate.getDate()}, ${startDate.getFullYear()}`;
  };

  const getBudgetIcon = (budget: string) => {
    switch (budget) {
      case 'budget': return <span>$</span>;
      case 'mid-range': return <span>$$</span>;
      case 'luxury': return <span>$$$</span>;
      default: return <span>$$</span>;
    }
  };

  const getInterestIcon = (interest: string) => {
    const interestMap: Record<string, React.ReactNode> = {
      'hiking': <Mountain className="w-3 h-3" />,
      'photography': <Camera className="w-3 h-3" />,
      'local cuisine': <Utensils className="w-3 h-3" />,
      'food': <Utensils className="w-3 h-3" />,
      'street food': <Utensils className="w-3 h-3" />,
      'cooking': <Utensils className="w-3 h-3" />,
      'music': <Music className="w-3 h-3" />,
      'nightlife': <Moon className="w-3 h-3" />,
      'museums': <Building className="w-3 h-3" />,
      'architecture': <Building className="w-3 h-3" />,
      'beach': <Umbrella className="w-3 h-3" />,
      'reading': <Book className="w-3 h-3" />,
      'coffee': <Coffee className="w-3 h-3" />
    };
    
    return interestMap[interest.toLowerCase()] || <Star className="w-3 h-3" />;
  };

  const getInterestColor = (index: number) => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-purple-100 text-purple-800',
      'bg-orange-100 text-orange-800',
      'bg-pink-100 text-pink-800',
      'bg-indigo-100 text-indigo-800',
      'bg-red-100 text-red-800',
      'bg-yellow-100 text-yellow-800'
    ];
    
    return colors[index % colors.length];
  };

  const handleStartChat = () => {
    // In a real app, this would initiate a chat with the matched buddy
    alert(`Starting chat with ${matchedBuddy?.name}!`);
    setShowMatchModal(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Finding your perfect travel buddies...</h2>
          <p className="text-gray-600">We're matching you with compatible travelers</p>
        </div>
      </div>
    );
  }

  if (!currentBuddy && potentialBuddies.length > 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            All Caught Up!
          </h2>
          <p className="text-gray-600 mb-8">
            You've viewed all potential travel buddies for now. Check back later for new matches!
          </p>
          <button
            onClick={() => {
              setCurrentIndex(0);
              setSavedBuddies([]);
              setSkippedBuddies([]);
            }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Travel Buddies</h1>
          <p className="text-gray-600">Discover compatible travelers for your next adventure</p>
        </div>

        {/* Main Card */}
        {currentBuddy && (
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden relative">
            {/* Profile Image with Swipeable Gallery */}
            <div className="relative h-96">
              <img
                src={getCurrentImage()}
                alt={`${currentBuddy.name}'s profile`}
                className="w-full h-full object-cover"
              />
              
              {/* Image Navigation */}
              <button 
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <button 
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              
              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {[currentBuddy.profileImage, ...currentBuddy.additionalImages].map((_, index) => (
                  <div 
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                    }`}
                  />
                ))}
              </div>
              
              {/* Match Percentage */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                {currentBuddy.matchPercentage}% Match
              </div>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              
              {/* Basic Info Overlay */}
              <div className="absolute bottom-4 left-4 text-white">
                <h2 className="text-2xl font-bold flex items-center">
                  {currentBuddy.name}, {currentBuddy.age}
                  <span className="ml-2 text-xl">{currentBuddy.countryFlag}</span>
                </h2>
                <p className="text-white/90 text-sm">@{currentBuddy.username}</p>
              </div>
            </div>

            {/* Profile Content */}
            <div className="p-6">
              {/* Destination & Dates */}
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-1">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Traveling to {currentBuddy.destination}</h3>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDateRange(currentBuddy.travelDates.start, currentBuddy.travelDates.end)}</span>
                </div>
              </div>
              
              {/* Travel Style & Personality */}
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Travel Style & Personality</h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  {currentBuddy.travelStyle.map((style, index) => (
                    <span 
                      key={`style-${index}`}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium capitalize"
                    >
                      {style}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentBuddy.personality.map((trait, index) => (
                    <span 
                      key={`trait-${index}`}
                      className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium capitalize"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Languages & Budget */}
              <div className="flex justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <Languages className="w-4 h-4 text-gray-600" />
                    <h3 className="font-semibold text-gray-900">Languages</h3>
                  </div>
                  <div className="text-sm text-gray-600">
                    {currentBuddy.languages.join(', ')}
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <DollarSign className="w-4 h-4 text-gray-600" />
                    <h3 className="font-semibold text-gray-900">Budget</h3>
                  </div>
                  <div className="text-sm text-gray-600 capitalize">
                    {getBudgetIcon(currentBuddy.budget)} {currentBuddy.budget}
                  </div>
                </div>
              </div>
              
              {/* Interests */}
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {currentBuddy.interests.map((interest, index) => (
                    <span 
                      key={`interest-${index}`}
                      className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getInterestColor(index)}`}
                    >
                      {getInterestIcon(interest)}
                      <span>{interest}</span>
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Bio */}
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">About {currentBuddy.name}</h3>
                <p className="text-gray-700 text-sm">{currentBuddy.bio}</p>
              </div>
              
              {/* Icebreaker */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <MessageCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">Icebreaker</h3>
                    <p className="text-sm text-blue-800">{currentBuddy.icebreaker}</p>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleSwipeLeft}
                  className="w-16 h-16 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg"
                >
                  <X className="w-8 h-8 text-gray-600" />
                </button>
                <button
                  onClick={handleSwipeRight}
                  className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center hover:from-pink-600 hover:to-red-600 transition-colors shadow-lg"
                >
                  <Check className="w-8 h-8 text-white" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Progress Indicator */}
        <div className="mt-8 text-center">
          <div className="flex justify-center space-x-2 mb-2">
            {potentialBuddies.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index < currentIndex
                    ? 'bg-pink-500'
                    : index === currentIndex
                    ? 'bg-blue-500'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600">
            {currentBuddy ? `${currentIndex + 1} of ${potentialBuddies.length}` : 'No more matches'}
          </p>
        </div>
      </div>

      {/* Match Modal */}
      <AnimatePresence>
        {showMatchModal && matchedBuddy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full text-center"
            >
              <div className="relative mb-8">
                <div className="w-24 h-24 mx-auto relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-500 rounded-full animate-ping opacity-25"></div>
                  <div className="relative z-10 w-full h-full bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center">
                    <Heart className="w-12 h-12 text-white" />
                  </div>
                </div>
                <div className="absolute top-4 -left-4 w-16 h-16 rounded-full overflow-hidden border-4 border-white">
                  <img src="https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Your profile" className="w-full h-full object-cover" />
                </div>
                <div className="absolute top-4 -right-4 w-16 h-16 rounded-full overflow-hidden border-4 border-white">
                  <img src={matchedBuddy.profileImage} alt={matchedBuddy.name} className="w-full h-full object-cover" />
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-2">It's a Match!</h2>
              <p className="text-gray-600 mb-6">
                You and {matchedBuddy.name} have both shown interest in traveling together to {matchedBuddy.destination}!
              </p>
              
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900 mb-1">Trip Details</h3>
                    <p className="text-sm text-gray-700">
                      {matchedBuddy.destination} • {formatDateRange(matchedBuddy.travelDates.start, matchedBuddy.travelDates.end)}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowMatchModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Maybe Later
                </button>
                <button
                  onClick={handleStartChat}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-3 rounded-xl hover:from-pink-600 hover:to-red-600 transition-colors font-medium"
                >
                  Start Chat
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Additional components for the page
const ChevronLeft: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const ChevronRight: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

export default TravelBuddyMatchingPage;