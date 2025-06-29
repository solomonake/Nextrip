import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Users, 
  Plane,
  Building,
  Car,
  Camera,
  Star,
  Clock,
  DollarSign,
  Wifi,
  Coffee,
  Utensils,
  Scan,
  Leaf,
  Shield,
  ExternalLink,
  Info
} from 'lucide-react';
import SearchFilters from '../components/search/SearchFilters';
import SearchResults from '../components/search/SearchResults';
import MapView from '../components/search/MapView';
import ARExplorer from '../components/advanced/ARExplorer';
import SustainabilityScore from '../components/advanced/SustainabilityScore';
import AITravelRisk from '../components/advanced/AITravelRisk';
import { useAppState } from '../contexts/AppStateContext';

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

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { appState, updateSearchFilters } = useAppState();
  const [showFilters, setShowFilters] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showAR, setShowAR] = useState(false);
  const [showSustainability, setShowSustainability] = useState(false);
  const [showRiskAssessment, setShowRiskAssessment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState(appState.searchFilters.destination);

  useEffect(() => {
    if (searchParams.get('q')) {
      setSearchQuery(searchParams.get('q') || '');
      updateSearchFilters({ destination: searchParams.get('q') || '' });
    }
    
    if (searchParams.get('type')) {
      updateSearchFilters({ type: searchParams.get('type') as any });
    }
  }, [searchParams, updateSearchFilters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    updateSearchFilters({ destination: searchQuery });
    setSearchParams({ q: searchQuery, type: appState.searchFilters.type });
    
    // Simulate search delay
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleFilterChange = (newFilters: Partial<SearchFilters>) => {
    updateSearchFilters(newFilters);
  };

  const searchTypes = [
    { id: 'flights', label: 'Flights', icon: Plane },
    { id: 'hotels', label: 'Hotels', icon: Building },
    { id: 'cars', label: 'Car Rental', icon: Car },
    { id: 'activities', label: 'Activities', icon: Camera }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Search Type Tabs */}
          <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
            {searchTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => handleFilterChange({ type: type.id as any })}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    appState.searchFilters.type === type.id
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{type.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${appState.searchFilters.type}...`}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {appState.searchFilters.type === 'hotels' && (
              <>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="date"
                      value={appState.searchFilters.checkIn}
                      onChange={(e) => handleFilterChange({ checkIn: e.target.value })}
                      className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="date"
                      value={appState.searchFilters.checkOut}
                      onChange={(e) => handleFilterChange({ checkOut: e.target.value })}
                      className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    value={appState.searchFilters.guests}
                    onChange={(e) => handleFilterChange({ guests: parseInt(e.target.value) })}
                    className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>
                        {num} Guest{num > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
              
              <button
                type="button"
                onClick={() => setShowMap(!showMap)}
                className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <MapPin className="w-4 h-4" />
                <span>Map</span>
              </button>

              <button
                type="button"
                onClick={() => setShowAR(true)}
                className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Scan className="w-4 h-4" />
                <span>AR</span>
              </button>

              <button
                type="button"
                onClick={() => setShowSustainability(!showSustainability)}
                className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Leaf className="w-4 h-4" />
                <span>Eco</span>
              </button>

              <button
                type="button"
                onClick={() => setShowRiskAssessment(!showRiskAssessment)}
                className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Shield className="w-4 h-4" />
                <span>Risk</span>
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Search'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-80 flex-shrink-0 space-y-6"
            >
              <SearchFilters 
                filters={appState.searchFilters} 
                onFilterChange={handleFilterChange}
              />
              
              {/* Advanced Features */}
              {showSustainability && (
                <SustainabilityScore 
                  type={appState.searchFilters.type === 'flights' ? 'flight' : appState.searchFilters.type === 'hotels' ? 'hotel' : 'activity'}
                  itemName={`Sample ${appState.searchFilters.type.slice(0, -1)}`}
                />
              )}
              
              {showRiskAssessment && appState.searchFilters.destination && (
                <AITravelRisk 
                  destination={appState.searchFilters.destination}
                  travelDate={new Date(appState.searchFilters.checkIn || Date.now())}
                />
              )}
            </motion.div>
          )}

          {/* Results */}
          <div className="flex-1">
            {showMap ? (
              <MapView filters={appState.searchFilters} />
            ) : (
              <SearchResults filters={appState.searchFilters} isLoading={isLoading} />
            )}
          </div>
        </div>
      </div>

      {/* AR Explorer */}
      <ARExplorer 
        isActive={showAR}
        onClose={() => setShowAR(false)}
      />
    </div>
  );
};

export default SearchPage;

export { SearchFilters }