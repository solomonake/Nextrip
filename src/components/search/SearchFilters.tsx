import React from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  Star, 
  Wifi, 
  Coffee, 
  Car, 
  Utensils,
  Dumbbell,
  Waves,
  PawPrint,
  Snowflake
} from 'lucide-react';
import { SearchFilters as SearchFiltersType } from '../../pages/SearchPage';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFilterChange: (filters: Partial<SearchFiltersType>) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ filters, onFilterChange }) => {
  const amenityOptions = [
    { id: 'wifi', label: 'Free WiFi', icon: Wifi },
    { id: 'breakfast', label: 'Breakfast', icon: Coffee },
    { id: 'parking', label: 'Parking', icon: Car },
    { id: 'restaurant', label: 'Restaurant', icon: Utensils },
    { id: 'gym', label: 'Fitness Center', icon: Dumbbell },
    { id: 'pool', label: 'Swimming Pool', icon: Waves },
    { id: 'pets', label: 'Pet Friendly', icon: PawPrint },
    { id: 'ac', label: 'Air Conditioning', icon: Snowflake }
  ];

  const handleAmenityToggle = (amenityId: string) => {
    const newAmenities = filters.amenities.includes(amenityId)
      ? filters.amenities.filter(id => id !== amenityId)
      : [...filters.amenities, amenityId];
    
    onFilterChange({ amenities: newAmenities });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-6 space-y-6"
    >
      <h3 className="text-lg font-semibold text-gray-900">Filters</h3>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          <DollarSign className="w-4 h-4 inline mr-1" />
          Price Range
        </label>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
          <input
            type="range"
            min="0"
            max="2000"
            step="50"
            value={filters.priceRange[1]}
            onChange={(e) => onFilterChange({ 
              priceRange: [filters.priceRange[0], parseInt(e.target.value)] 
            })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </div>

      {/* Rating */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          <Star className="w-4 h-4 inline mr-1" />
          Minimum Rating
        </label>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              onClick={() => onFilterChange({ rating: rating === filters.rating ? 0 : rating })}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                filters.rating >= rating
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Star className={`w-4 h-4 ${filters.rating >= rating ? 'fill-current' : ''}`} />
              <span>{rating}+</span>
            </button>
          ))}
        </div>
      </div>

      {/* Amenities */}
      {filters.type === 'hotels' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Amenities
          </label>
          <div className="grid grid-cols-2 gap-2">
            {amenityOptions.map((amenity) => {
              const Icon = amenity.icon;
              const isSelected = filters.amenities.includes(amenity.id);
              
              return (
                <button
                  key={amenity.id}
                  onClick={() => handleAmenityToggle(amenity.id)}
                  className={`flex items-center space-x-2 p-3 rounded-lg text-sm font-medium transition-colors ${
                    isSelected
                      ? 'bg-blue-100 text-blue-800 border-2 border-blue-200'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-2 border-transparent'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-xs">{amenity.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Sort By */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Sort By
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="popularity">Most Popular</option>
          <option value="price">Price: Low to High</option>
          <option value="rating">Highest Rated</option>
          <option value="distance">Nearest First</option>
        </select>
      </div>

      {/* Clear Filters */}
      <button
        onClick={() => onFilterChange({
          priceRange: [0, 1000],
          rating: 0,
          amenities: [],
          sortBy: 'popularity'
        })}
        className="w-full py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
      >
        Clear All Filters
      </button>
    </motion.div>
  );
};

export default SearchFilters;