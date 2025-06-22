// User types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: {
    currency: string;
    language: string;
    persona: 'solo' | 'group' | 'business' | 'eco' | 'budget';
  };
}

// Trip types
export interface Trip {
  id: string;
  title: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  travelers: number;
  budget: {
    total: number;
    spent: number;
    categories: {
      flights: number;
      hotels: number;
      food: number;
      activities: number;
      transport: number;
    };
  };
  itinerary: ItineraryItem[];
  bookings: Booking[];
  collaborators?: string[];
}

export interface ItineraryItem {
  id: string;
  type: 'flight' | 'hotel' | 'activity' | 'restaurant' | 'transport';
  title: string;
  description: string;
  startTime: Date;
  endTime?: Date;
  location: string;
  cost: number;
  status: 'planned' | 'booked' | 'completed';
  bookingId?: string;
}

export interface Booking {
  id: string;
  type: 'flight' | 'hotel' | 'car' | 'activity';
  title: string;
  details: any;
  cost: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  confirmationCode?: string;
}

// Community types
export interface CommunityPost {
  id: number;
  username: string;
  profilePic: string;
  activityType: 'Hike' | 'Mission' | 'Discovery' | 'Sightseeing' | 'Food' | 'Culture' | 'Adventure' | 'Beach';
  photos: string[];
  description: string;
  location: string;
  likes: number;
  comments: number;
  postedAt: string;
  distance?: string;
  elevationGain?: string;
  duration?: string;
  hashtags?: string[];
}

export interface CollabMatch {
  id: number;
  username: string;
  profilePic: string;
  bio: string;
  age: number;
  location: string;
  countriesVisited: number;
  commonInterests: string[];
  photos: string[];
  tripsCompleted: number;
  missionsCompleted: number;
  travelStyle: string;
  nextDestination: string;
  languages: string[];
  verified: boolean;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  points: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Epic';
  category: 'Food' | 'Culture' | 'Adventure' | 'Social' | 'Photography' | 'Discovery';
  icon: string;
  completed: boolean;
  verificationRequired: boolean;
  timeLimit?: string;
  location?: string;
}

// Search types
export interface SearchFilters {
  type: 'flights' | 'hotels' | 'cars' | 'activities';
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  priceRange: [number, number];
  rating: number;
  amenities: string[];
  sortBy: 'price' | 'rating' | 'distance' | 'popularity';
}

// Weather types
export interface WeatherData {
  location: string;
  country: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  visibility: number;
  uvIndex: number;
  pressure: number;
  sunrise: string;
  sunset: string;
  icon: string;
}

export interface ForecastDay {
  date: Date;
  high: number;
  low: number;
  condition: string;
  icon: string;
  precipitation: number;
  windSpeed: number;
}

// Currency types
export interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  rate: number;
}

export interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  change24h: number;
  lastUpdated: Date;
}