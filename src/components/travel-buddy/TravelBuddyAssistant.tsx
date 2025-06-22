import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users, 
  Plane, 
  Building, 
  Utensils,
  Camera,
  Gift,
  Star,
  Clock,
  Navigation,
  Heart,
  Send,
  Sparkles,
  ExternalLink,
  Info,
  Package,
  Shield,
  Car,
  Globe,
  Wifi,
  Coffee,
  FileText,
  Route,
  Save,
  CheckCircle
} from 'lucide-react';
import ItineraryPlanner from './ItineraryPlanner';
import VisaInformation from './VisaInformation';

interface TravelInput {
  startingLocation: string;
  destination: string;
  budget: {
    flight: number;
    hotel: number;
    food: number;
    tourism: number;
    souvenirs: number;
  };
  travelDate?: string;
  tripDuration: number;
  activityTypes: string[];
}

interface TripOption {
  id: number;
  title: string;
  cheapDates?: Array<{ date: string; price: number }>;
  flight: {
    airline: string;
    price: number;
    departure: string;
    arrival: string;
    bookingLink: string;
  };
  hotel: {
    name: string;
    price: number;
    bookingLink: string;
  };
  restaurants: Array<{
    name: string;
    googleMapsLink: string;
  }>;
  attractions: Array<{
    name: string;
    googleMapsLink: string;
  }>;
  souvenirShopping: {
    name: string;
    googleMapsLink: string;
  };
  totalCost: {
    flight: number;
    hotel: number;
    food: number;
    tourism: number;
    souvenirs: number;
    total: number;
  };
  budgetFit: string;
  dailyPlanner: Array<{
    day: number;
    activities: string[];
    mission: string;
  }>;
  packingList: string[];
  visaRequirements: {
    required: boolean;
    processingTime: string;
    documents: string[];
    tips: string[];
  };
  localTransport: {
    metro: { name: string; link: string };
    ridehailing: string[];
    rentals: string[];
    bikes: string[];
  };
  tripMissions: string[];
}

interface SavedTrip {
  id: number;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: 'Planned' | 'Booked' | 'In Progress' | 'Completed';
  budget: number;
  itinerary?: TripOption;
}

const TravelBuddyAssistant: React.FC = () => {
  const [step, setStep] = useState<'input' | 'results' | 'itinerary' | 'visa' | 'save-trip'>('input');
  const [travelInput, setTravelInput] = useState<TravelInput>({
    startingLocation: '',
    destination: '',
    budget: {
      flight: 0,
      hotel: 0,
      food: 0,
      tourism: 0,
      souvenirs: 0
    },
    travelDate: '',
    tripDuration: 0,
    activityTypes: []
  });
  const [tripOptions, setTripOptions] = useState<TripOption[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [tripName, setTripName] = useState('');

  const activityOptions = [
    'sightseeing', 'museums', 'nature', 'shopping', 'food', 
    'nightlife', 'relaxation', 'family-friendly', 'adventure'
  ];

  // Save trip function
  const saveTrip = (tripData: TripOption) => {
    const savedTrips = JSON.parse(localStorage.getItem('nextrip_saved_trips') || '[]');
    
    const newTrip: SavedTrip = {
      id: Date.now(),
      name: tripName || `${travelInput.destination} Adventure`,
      destination: travelInput.destination,
      startDate: travelInput.travelDate || new Date().toISOString().split('T')[0],
      endDate: travelInput.travelDate 
        ? new Date(new Date(travelInput.travelDate).getTime() + (travelInput.tripDuration * 24 * 60 * 60 * 1000)).toISOString().split('T')[0]
        : new Date(Date.now() + (travelInput.tripDuration * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
      status: 'Planned',
      budget: tripData.totalCost.total,
      itinerary: tripData
    };

    savedTrips.push(newTrip);
    localStorage.setItem('nextrip_saved_trips', JSON.stringify(savedTrips));
    
    // Redirect to My Trips page
    window.location.href = '/my-trips';
  };

  const handleSaveTrip = () => {
    if (selectedOption !== null) {
      const selectedTripData = tripOptions.find(option => option.id === selectedOption);
      if (selectedTripData) {
        saveTrip(selectedTripData);
      }
    }
  };

  const generateTripOptions = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const options: TripOption[] = [
        generateBudgetOption(),
        generateBalancedOption(),
        generateLuxuryOption()
      ];
      
      setTripOptions(options);
      setIsGenerating(false);
      setStep('results');
    }, 3000);
  };

  const generateCheapDates = () => {
    if (travelInput.travelDate) return undefined;
    
    const dates = [];
    const basePrice = 400 + Math.random() * 300;
    
    for (let i = 0; i < 10; i++) {
      const date = new Date();
      date.setDate(date.getDate() + (i * 7) + 7);
      const variation = (Math.random() - 0.5) * 200;
      dates.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        price: Math.round(basePrice + variation)
      });
    }
    
    return dates.sort((a, b) => a.price - b.price);
  };

  const generateBudgetOption = (): TripOption => {
    const flightPrice = Math.round(travelInput.budget.flight * 0.8);
    const hotelPrice = Math.round(travelInput.budget.hotel * 0.75);
    const foodPrice = Math.round(travelInput.budget.food * 0.85);
    const tourismPrice = Math.round(travelInput.budget.tourism * 0.8);
    const souvenirPrice = Math.round(travelInput.budget.souvenirs * 0.9);

    return {
      id: 1,
      title: "Budget Explorer",
      cheapDates: generateCheapDates(),
      flight: {
        airline: "Southwest Airlines",
        price: flightPrice,
        departure: "08:30",
        arrival: "14:00",
        bookingLink: `https://www.skyscanner.com/transport/flights/${encodeURIComponent(travelInput.startingLocation)}/${encodeURIComponent(travelInput.destination)}/`
      },
      hotel: {
        name: "City Center Hostel",
        price: hotelPrice,
        bookingLink: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(travelInput.destination)}`
      },
      restaurants: [
        { name: "Local Street Food Market", googleMapsLink: `https://maps.google.com/?q=Street+Food+Market+${encodeURIComponent(travelInput.destination)}` },
        { name: "Budget Friendly Cafe", googleMapsLink: `https://maps.google.com/?q=Budget+Cafe+${encodeURIComponent(travelInput.destination)}` },
        { name: "Traditional Local Eatery", googleMapsLink: `https://maps.google.com/?q=Traditional+Restaurant+${encodeURIComponent(travelInput.destination)}` }
      ],
      attractions: [
        { name: "Free Walking Tour", googleMapsLink: `https://maps.google.com/?q=Free+Walking+Tour+${encodeURIComponent(travelInput.destination)}` },
        { name: "Public Gardens", googleMapsLink: `https://maps.google.com/?q=Public+Gardens+${encodeURIComponent(travelInput.destination)}` },
        { name: "Historic City Center", googleMapsLink: `https://maps.google.com/?q=Historic+Center+${encodeURIComponent(travelInput.destination)}` }
      ],
      souvenirShopping: {
        name: "Local Artisan Market",
        googleMapsLink: `https://maps.google.com/?q=Local+Market+${encodeURIComponent(travelInput.destination)}`
      },
      totalCost: {
        flight: flightPrice,
        hotel: hotelPrice,
        food: foodPrice,
        tourism: tourismPrice,
        souvenirs: souvenirPrice,
        total: flightPrice + hotelPrice + foodPrice + tourismPrice + souvenirPrice
      },
      budgetFit: "Well within budget with savings for extras!",
      dailyPlanner: generateDailyPlanner('budget'),
      packingList: generatePackingList('budget'),
      visaRequirements: generateVisaRequirements(),
      localTransport: generateLocalTransport(),
      tripMissions: generateTripMissions()
    };
  };

  const generateBalancedOption = (): TripOption => {
    const flightPrice = Math.round(travelInput.budget.flight * 0.95);
    const hotelPrice = Math.round(travelInput.budget.hotel * 0.9);
    const foodPrice = Math.round(travelInput.budget.food * 0.95);
    const tourismPrice = Math.round(travelInput.budget.tourism * 0.95);
    const souvenirPrice = travelInput.budget.souvenirs;

    return {
      id: 2,
      title: "Perfect Balance",
      cheapDates: generateCheapDates(),
      flight: {
        airline: "Delta Airlines",
        price: flightPrice,
        departure: "10:15",
        arrival: "16:30",
        bookingLink: `https://www.kayak.com/flights/${encodeURIComponent(travelInput.startingLocation)}-${encodeURIComponent(travelInput.destination)}/`
      },
      hotel: {
        name: "Grand Plaza Hotel",
        price: hotelPrice,
        bookingLink: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(travelInput.destination)}`
      },
      restaurants: [
        { name: "Bistro Central", googleMapsLink: `https://maps.google.com/?q=Bistro+Central+${encodeURIComponent(travelInput.destination)}` },
        { name: "The Local Table", googleMapsLink: `https://maps.google.com/?q=Local+Table+Restaurant+${encodeURIComponent(travelInput.destination)}` },
        { name: "Rooftop Dining", googleMapsLink: `https://maps.google.com/?q=Rooftop+Restaurant+${encodeURIComponent(travelInput.destination)}` }
      ],
      attractions: [
        { name: "Main Museum", googleMapsLink: `https://maps.google.com/?q=Main+Museum+${encodeURIComponent(travelInput.destination)}` },
        { name: "Guided City Tour", googleMapsLink: `https://maps.google.com/?q=City+Tour+${encodeURIComponent(travelInput.destination)}` },
        { name: "Cultural Experience", googleMapsLink: `https://maps.google.com/?q=Cultural+Experience+${encodeURIComponent(travelInput.destination)}` }
      ],
      souvenirShopping: {
        name: "Shopping District",
        googleMapsLink: `https://maps.google.com/?q=Shopping+District+${encodeURIComponent(travelInput.destination)}`
      },
      totalCost: {
        flight: flightPrice,
        hotel: hotelPrice,
        food: foodPrice,
        tourism: tourismPrice,
        souvenirs: souvenirPrice,
        total: flightPrice + hotelPrice + foodPrice + tourismPrice + souvenirPrice
      },
      budgetFit: "Perfect match for your budget!",
      dailyPlanner: generateDailyPlanner('balanced'),
      packingList: generatePackingList('balanced'),
      visaRequirements: generateVisaRequirements(),
      localTransport: generateLocalTransport(),
      tripMissions: generateTripMissions()
    };
  };

  const generateLuxuryOption = (): TripOption => {
    const flightPrice = travelInput.budget.flight;
    const hotelPrice = Math.round(travelInput.budget.hotel * 1.2);
    const foodPrice = Math.round(travelInput.budget.food * 1.3);
    const tourismPrice = Math.round(travelInput.budget.tourism * 1.4);
    const souvenirPrice = Math.round(travelInput.budget.souvenirs * 1.2);

    return {
      id: 3,
      title: "Premium Experience",
      cheapDates: generateCheapDates(),
      flight: {
        airline: "Emirates",
        price: flightPrice,
        departure: "14:20",
        arrival: "19:05",
        bookingLink: `https://www.expedia.com/Flights-Search?trip=oneway&leg1=from:${encodeURIComponent(travelInput.startingLocation)},to:${encodeURIComponent(travelInput.destination)}`
      },
      hotel: {
        name: "Five-Star Luxury Resort",
        price: hotelPrice,
        bookingLink: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(travelInput.destination)}`
      },
      restaurants: [
        { name: "Michelin Star Restaurant", googleMapsLink: `https://maps.google.com/?q=Michelin+Star+Restaurant+${encodeURIComponent(travelInput.destination)}` },
        { name: "Celebrity Chef Venue", googleMapsLink: `https://maps.google.com/?q=Celebrity+Chef+Restaurant+${encodeURIComponent(travelInput.destination)}` },
        { name: "Fine Dining Experience", googleMapsLink: `https://maps.google.com/?q=Fine+Dining+${encodeURIComponent(travelInput.destination)}` }
      ],
      attractions: [
        { name: "VIP Museum Tour", googleMapsLink: `https://maps.google.com/?q=VIP+Museum+Tour+${encodeURIComponent(travelInput.destination)}` },
        { name: "Private City Experience", googleMapsLink: `https://maps.google.com/?q=Private+Tour+${encodeURIComponent(travelInput.destination)}` },
        { name: "Exclusive Cultural Event", googleMapsLink: `https://maps.google.com/?q=Exclusive+Cultural+Event+${encodeURIComponent(travelInput.destination)}` }
      ],
      souvenirShopping: {
        name: "Luxury Boutiques",
        googleMapsLink: `https://maps.google.com/?q=Luxury+Boutiques+${encodeURIComponent(travelInput.destination)}`
      },
      totalCost: {
        flight: flightPrice,
        hotel: hotelPrice,
        food: foodPrice,
        tourism: tourismPrice,
        souvenirs: souvenirPrice,
        total: flightPrice + hotelPrice + foodPrice + tourismPrice + souvenirPrice
      },
      budgetFit: "Premium experience with some budget stretch",
      dailyPlanner: generateDailyPlanner('luxury'),
      packingList: generatePackingList('luxury'),
      visaRequirements: generateVisaRequirements(),
      localTransport: generateLocalTransport(),
      tripMissions: generateTripMissions()
    };
  };

  const generateDailyPlanner = (type: 'budget' | 'balanced' | 'luxury') => {
    const plans = [];
    const missions = [
      'Try 3 local dishes and rate them',
      'Take a selfie at the most iconic landmark',
      'Learn 5 phrases in the local language',
      'Visit a local market and buy a unique souvenir',
      'Talk to a local and get a hidden gem recommendation',
      'Capture the perfect sunset photo',
      'Try a traditional breakfast',
      'Find the best viewpoint in the city',
      'Discover a local coffee shop',
      'Take photos of street art'
    ];

    for (let day = 1; day <= travelInput.tripDuration; day++) {
      let activities = [];
      
      if (type === 'budget') {
        activities = [
          'Morning → Free walking tour of historic district',
          'Afternoon → Visit main museum (student discount)',
          'Evening → Local food market exploration'
        ];
      } else if (type === 'balanced') {
        activities = [
          'Morning → Guided city highlights tour',
          'Afternoon → Premium attraction with skip-the-line access',
          'Evening → Dinner at recommended local restaurant'
        ];
      } else {
        activities = [
          'Morning → Private guided tour with expert',
          'Afternoon → VIP experience at top attraction',
          'Evening → Fine dining at award-winning restaurant'
        ];
      }

      plans.push({
        day,
        activities,
        mission: missions[Math.floor(Math.random() * missions.length)]
      });
    }

    return plans;
  };

  const generatePackingList = (type: 'budget' | 'balanced' | 'luxury') => {
    const baseItems = [
      'Passport + travel docs',
      'Comfortable walking shoes',
      'Weather-appropriate clothing',
      'Camera or smartphone',
      'Power adapter',
      'Sunscreen',
      'First aid basics',
      'Reusable water bottle'
    ];

    if (type === 'luxury') {
      baseItems.push('Formal attire', 'Dress shoes', 'Premium toiletries');
    } else if (type === 'budget') {
      baseItems.push('Laundry detergent', 'Snacks', 'Travel towel');
    }

    // Add weather-specific items
    if (travelInput.destination.toLowerCase().includes('cold')) {
      baseItems.push('Warm jacket', 'Gloves', 'Winter hat');
    } else {
      baseItems.push('Light jacket', 'Sunhat', 'Swimwear');
    }

    // Add activity-specific items
    if (travelInput.activityTypes.includes('adventure')) {
      baseItems.push('Hiking boots', 'Backpack', 'Water bottle');
    }
    if (travelInput.activityTypes.includes('nightlife')) {
      baseItems.push('Dressy outfit', 'Comfortable evening shoes');
    }

    return baseItems;
  };

  const generateVisaRequirements = () => {
    const isInternational = !travelInput.startingLocation.toLowerCase().includes('usa') || 
                           !travelInput.destination.toLowerCase().includes('usa');
    
    return {
      required: isInternational && Math.random() > 0.3,
      processingTime: '5-10 business days',
      documents: [
        'Valid passport (6+ months validity)',
        'Completed visa application form',
        'Recent passport photos',
        'Proof of accommodation',
        'Return flight tickets',
        'Bank statements'
      ],
      tips: [
        'Apply at least 2 weeks before travel',
        'Check embassy website for latest requirements',
        'Keep copies of all documents',
        'Ensure passport has blank pages'
      ]
    };
  };

  const generateLocalTransport = () => {
    return {
      metro: { 
        name: `${travelInput.destination} Metro`, 
        link: `https://www.google.com/search?q=${encodeURIComponent(travelInput.destination)}+metro+system`
      },
      ridehailing: ['Uber', 'Lyft', 'Local taxi apps'],
      rentals: ['Hertz', 'Avis', 'Enterprise', 'Local car rental'],
      bikes: ['City bike share', 'Lime', 'Bird scooters']
    };
  };

  const generateTripMissions = () => {
    return [
      'Take a selfie at the most famous landmark',
      'Try 3 new local dishes and rate them out of 10',
      'Visit a local market and buy a souvenir under $10',
      'Learn a local phrase and use it with a local person',
      'Discover a hidden viewpoint and take a photo',
      'Find the best local coffee shop',
      'Take a photo with a local street performer',
      'Try the local public transportation',
      'Visit a neighborhood not mentioned in guidebooks'
    ];
  };

  const handleSelectOption = (optionId: number) => {
    setSelectedOption(optionId);
    setShowSaveDialog(true);
    setTripName(`${travelInput.destination} Adventure`);
  };

  const showDetailedItinerary = () => {
    setStep('itinerary');
  };

  const showVisaInformation = () => {
    setStep('visa');
  };

  const renderInput = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Travel Buddy Assistant</h2>
        <p className="text-gray-600">Let's plan your perfect trip together! I'll create 3 complete itineraries with everything you need.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-4 h-4 inline mr-1" />
            Starting Location
          </label>
          <input
            type="text"
            value={travelInput.startingLocation}
            onChange={(e) => setTravelInput(prev => ({ ...prev, startingLocation: e.target.value }))}
            placeholder="e.g., New York, USA"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-4 h-4 inline mr-1" />
            Destination
          </label>
          <input
            type="text"
            value={travelInput.destination}
            onChange={(e) => setTravelInput(prev => ({ ...prev, destination: e.target.value }))}
            placeholder="e.g., Paris, France"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Plane className="w-4 h-4 inline mr-1" />
            Flight Budget ($)
          </label>
          <input
            type="number"
            value={travelInput.budget.flight}
            onChange={(e) => setTravelInput(prev => ({ 
              ...prev, 
              budget: { ...prev.budget, flight: parseInt(e.target.value) || 0 }
            }))}
            placeholder="500"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Building className="w-4 h-4 inline mr-1" />
            Hotel Budget ($)
          </label>
          <input
            type="number"
            value={travelInput.budget.hotel}
            onChange={(e) => setTravelInput(prev => ({ 
              ...prev, 
              budget: { ...prev.budget, hotel: parseInt(e.target.value) || 0 }
            }))}
            placeholder="400"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Utensils className="w-4 h-4 inline mr-1" />
            Food Budget ($)
          </label>
          <input
            type="number"
            value={travelInput.budget.food}
            onChange={(e) => setTravelInput(prev => ({ 
              ...prev, 
              budget: { ...prev.budget, food: parseInt(e.target.value) || 0 }
            }))}
            placeholder="300"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Camera className="w-4 h-4 inline mr-1" />
            Tourism Budget ($)
          </label>
          <input
            type="number"
            value={travelInput.budget.tourism}
            onChange={(e) => setTravelInput(prev => ({ 
              ...prev, 
              budget: { ...prev.budget, tourism: parseInt(e.target.value) || 0 }
            }))}
            placeholder="200"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Gift className="w-4 h-4 inline mr-1" />
            Souvenirs Budget ($)
          </label>
          <input
            type="number"
            value={travelInput.budget.souvenirs}
            onChange={(e) => setTravelInput(prev => ({ 
              ...prev, 
              budget: { ...prev.budget, souvenirs: parseInt(e.target.value) || 0 }
            }))}
            placeholder="100"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="w-4 h-4 inline mr-1" />
            Travel Date (Optional)
          </label>
          <input
            type="date"
            value={travelInput.travelDate}
            onChange={(e) => setTravelInput(prev => ({ ...prev, travelDate: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">Leave empty to see cheapest dates</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Clock className="w-4 h-4 inline mr-1" />
            Trip Duration (Days)
          </label>
          <input
            type="number"
            value={travelInput.tripDuration}
            onChange={(e) => setTravelInput(prev => ({ ...prev, tripDuration: parseInt(e.target.value) || 0 }))}
            placeholder="7"
            min="1"
            max="30"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Preferred Activity Types
        </label>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
          {activityOptions.map((activity) => (
            <button
              key={activity}
              onClick={() => {
                const newActivities = travelInput.activityTypes.includes(activity)
                  ? travelInput.activityTypes.filter(a => a !== activity)
                  : [...travelInput.activityTypes, activity];
                setTravelInput(prev => ({ ...prev, activityTypes: newActivities }));
              }}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                travelInput.activityTypes.includes(activity)
                  ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-transparent'
              }`}
            >
              {activity}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={generateTripOptions}
        disabled={!travelInput.startingLocation || !travelInput.destination || !travelInput.tripDuration}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        <Send className="w-5 h-5" />
        <span>Generate My Trip Options! ✈️</span>
      </button>
    </div>
  );

  const renderResults = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">🌍 Your Personalized Trip Options</h2>
        <p className="text-gray-600 text-lg">
          I've created 3 complete travel plans for your trip from{' '}
          <span className="font-semibold text-indigo-600">{travelInput.startingLocation}</span> to{' '}
          <span className="font-semibold text-indigo-600">{travelInput.destination}</span>.
        </p>
        
        {/* Quick Actions */}
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={showDetailedItinerary}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Route className="w-4 h-4" />
            <span>View Detailed Itinerary</span>
          </button>
          <button
            onClick={showVisaInformation}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center space-x-2"
          >
            <FileText className="w-4 h-4" />
            <span>Check Visa Requirements</span>
          </button>
        </div>
      </div>

      {isGenerating ? (
        <div className="text-center py-12">
          <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Creating Your Perfect Itineraries...</h3>
          <p className="text-gray-600">Analyzing destinations, finding best deals, and crafting personalized experiences</p>
        </div>
      ) : (
        <div className="space-y-12">
          {tripOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`border-2 rounded-3xl overflow-hidden shadow-xl ${
                option.id === 1 ? 'border-green-300 bg-gradient-to-br from-green-50 to-emerald-50' :
                option.id === 2 ? 'border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50' :
                'border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50'
              }`}
            >
              {/* Header */}
              <div className={`p-6 text-white ${
                option.id === 1 ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                option.id === 2 ? 'bg-gradient-to-r from-blue-500 to-indigo-600' :
                'bg-gradient-to-r from-purple-500 to-pink-600'
              }`}>
                <h3 className="text-2xl font-bold mb-2">{option.title}</h3>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-3xl font-bold">${option.totalCost.total.toLocaleString()}</span>
                    <span className="text-sm opacity-75 ml-2">total cost</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm opacity-90">Smart savings & great experiences</div>
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-8">
                {/* Cheap Travel Dates (if no date provided) */}
                {!travelInput.travelDate && option.cheapDates && (
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      📅 Cheap Travel Dates:
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {option.cheapDates.slice(0, 5).map((date, i) => (
                        <div key={i} className="text-center p-3 bg-white rounded-lg border border-gray-200">
                          <div className="font-medium text-gray-900">{date.date}</div>
                          <div className="text-lg font-bold text-blue-600">${date.price}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Flight */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    🛫 Flight: {option.flight.airline} — ${option.flight.price}
                  </h4>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-600">Departure: {option.flight.departure} → Arrival: {option.flight.arrival}</p>
                      </div>
                      <a
                        href={option.flight.bookingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                      >
                        <span>Book on External Site</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Hotel */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    🏨 Hotel: {option.hotel.name} — ${option.hotel.price}
                  </h4>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-600">Perfect location with great amenities</p>
                      </div>
                      <a
                        href={option.hotel.bookingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                      >
                        <span>Book on External Site</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Restaurants */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">🍽️ Top 3 Restaurants:</h4>
                  <div className="space-y-2">
                    {option.restaurants.map((restaurant, i) => (
                      <div key={i} className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-200">
                        <span>{i + 1}. {restaurant.name}</span>
                        <a
                          href={restaurant.googleMapsLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                        >
                          <span>Google Maps</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Attractions */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">🎡 Top 3 Attractions:</h4>
                  <div className="space-y-2">
                    {option.attractions.map((attraction, i) => (
                      <div key={i} className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-200">
                        <span>{i + 1}. {attraction.name}</span>
                        <a
                          href={attraction.googleMapsLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                        >
                          <span>Google Maps</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Souvenir Shopping */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">🛍️ Souvenir Shopping:</h4>
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <span>{option.souvenirShopping.name}</span>
                      <a
                        href={option.souvenirShopping.googleMapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                      >
                        <span>Google Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">💰 Estimated Total Cost:</h4>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>- Flight:</span>
                        <span>${option.totalCost.flight}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>- Hotel:</span>
                        <span>${option.totalCost.hotel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>- Food:</span>
                        <span>${option.totalCost.food}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>- Tourism:</span>
                        <span>${option.totalCost.tourism}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>- Souvenirs:</span>
                        <span>${option.totalCost.souvenirs}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg border-t pt-2">
                        <span>→ Total:</span>
                        <span>${option.totalCost.total}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-green-600 font-medium">🎈 Budget Fit → {option.budgetFit}</span>
                  </div>
                </div>

                {/* Daily Planner */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">🗓️ Daily Planner:</h4>
                  <div className="space-y-4">
                    {option.dailyPlanner.map((day) => (
                      <div key={day.day} className="bg-white rounded-lg p-4 border border-gray-200">
                        <h5 className="font-bold text-gray-900 mb-2">Day {day.day}:</h5>
                        <div className="space-y-1 mb-3">
                          {day.activities.map((activity, i) => (
                            <div key={i} className="text-gray-700">- {activity}</div>
                          ))}
                        </div>
                        <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                          <span className="font-medium text-yellow-800">
                            Evening Mission → {day.mission}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Packing List */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">🎒 Packing List:</h4>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="grid grid-cols-2 gap-2">
                      {option.packingList.map((item, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <span className="text-blue-600">-</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Visa Requirements */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">🛂 Visa Requirements:</h4>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">- Visa required →</span>
                        <span className={`px-2 py-1 rounded text-sm font-medium ${
                          option.visaRequirements.required ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {option.visaRequirements.required ? 'Yes' : 'No'}
                        </span>
                      </div>
                      {option.visaRequirements.required && (
                        <>
                          <div>- Processing time → {option.visaRequirements.processingTime}</div>
                          <div>- Required documents → {option.visaRequirements.documents.join(', ')}</div>
                          <div>- Entry tips → {option.visaRequirements.tips.join(', ')}</div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Local Transport */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">🚖 Destination Travel Options:</h4>
                  <div className="bg-white rounded-lg p-4 border border-gray-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span>- 🚇 Metro → {option.localTransport.metro.name}</span>
                      <a
                        href={option.localTransport.metro.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        Official Link
                      </a>
                    </div>
                    <div>- 🚗 Ride-hailing → {option.localTransport.ridehailing.join(', ')}</div>
                    <div>- 🚙 Rental Cars → {option.localTransport.rentals.join(', ')}</div>
                    <div>- 🛴 Bikes/Scooters → {option.localTransport.bikes.join(', ')}</div>
                  </div>
                </div>

                {/* Trip Missions */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">🎯 Trip Missions:</h4>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="space-y-2">
                      {option.tripMissions.slice(0, 5).map((mission, i) => (
                        <div key={i} className="flex items-start space-x-2">
                          <span className="text-blue-600 font-bold">{i + 1}.</span>
                          <span>{mission}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Selection Button */}
                <div className="text-center pt-4">
                  <button
                    onClick={() => handleSelectOption(option.id)}
                    className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 ${
                      selectedOption === option.id 
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : option.id === 1 ? 'bg-green-600 hover:bg-green-700 text-white' :
                          option.id === 2 ? 'bg-blue-600 hover:bg-blue-700 text-white' :
                          'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
                    disabled={selectedOption === option.id}
                  >
                    {selectedOption === option.id ? 'Selected ✓' : 'Choose This Itinerary ✈️'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Final CTA */}
          <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Adventure?</h3>
            <p className="text-lg mb-6">
              Please select your preferred Trip Option to continue planning your trip!
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={showDetailedItinerary}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2"
              >
                <Route className="w-4 h-4" />
                <span>View Detailed Itinerary</span>
              </button>
              <button
                onClick={showVisaInformation}
                className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2"
              >
                <FileText className="w-4 h-4" />
                <span>Check Visa Requirements</span>
              </button>
              <button
                onClick={() => {
                  setStep('input');
                  setTravelInput({
                    startingLocation: '',
                    destination: '',
                    budget: { flight: 0, hotel: 0, food: 0, tourism: 0, souvenirs: 0 },
                    travelDate: '',
                    tripDuration: 0,
                    activityTypes: []
                  });
                }}
                className="bg-white text-gray-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Plan Another Trip
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save Trip Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full mx-4"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Save className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Save Your Trip?</h3>
              <p className="text-gray-600">Would you like to save this trip to your My Trips page?</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Trip Name</label>
              <input
                type="text"
                value={tripName}
                onChange={(e) => setTripName(e.target.value)}
                placeholder="e.g., Paris Summer Adventure"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowSaveDialog(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Not Now
              </button>
              <button
                onClick={handleSaveTrip}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Trip</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );

  const renderItinerary = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Detailed Itinerary</h2>
        <button
          onClick={() => setStep('results')}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Back to Trip Options
        </button>
      </div>
      
      <ItineraryPlanner
        destination={travelInput.destination}
        startDate={travelInput.travelDate ? new Date(travelInput.travelDate) : new Date()}
        endDate={travelInput.travelDate ? new Date(new Date(travelInput.travelDate).getTime() + (travelInput.tripDuration * 24 * 60 * 60 * 1000)) : new Date(Date.now() + (travelInput.tripDuration * 24 * 60 * 60 * 1000))}
        budget={Object.values(travelInput.budget).reduce((sum, val) => sum + val, 0)}
        activityTypes={travelInput.activityTypes}
        travelers={1}
      />
    </div>
  );

  const renderVisa = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Visa Information</h2>
        <button
          onClick={() => setStep('results')}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Back to Trip Options
        </button>
      </div>
      
      <VisaInformation
        fromCountry={travelInput.startingLocation}
        toCountry={travelInput.destination}
        travelDate={travelInput.travelDate ? new Date(travelInput.travelDate) : new Date()}
        tripDuration={travelInput.tripDuration}
        travelPurpose="tourism"
      />
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {step === 'input' && renderInput()}
        {step === 'results' && renderResults()}
        {step === 'itinerary' && renderItinerary()}
        {step === 'visa' && renderVisa()}
      </motion.div>
    </div>
  );
};

export default TravelBuddyAssistant;