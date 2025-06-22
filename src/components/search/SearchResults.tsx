import React from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  MapPin, 
  Clock, 
  DollarSign, 
  Wifi, 
  Coffee, 
  Car,
  Heart,
  Share,
  ExternalLink,
  Info
} from 'lucide-react';
import { SearchFilters } from '../../pages/SearchPage';

interface SearchResultsProps {
  filters: SearchFilters;
  isLoading: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({ filters, isLoading }) => {
  // Mock data generator based on filters
  const generateMockResults = () => {
    const baseResults = {
      flights: [
        {
          id: '1',
          airline: 'Delta Airlines',
          price: 450,
          duration: '5h 30m',
          stops: 'Direct',
          departure: '08:30',
          arrival: '14:00',
          rating: 4.2,
          image: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=400',
          details: {
            aircraft: 'Boeing 737-800',
            baggage: '1 carry-on, 1 checked bag included',
            amenities: ['WiFi', 'In-flight entertainment', 'Meals'],
            cancellation: 'Free cancellation up to 24 hours'
          }
        },
        {
          id: '2',
          airline: 'American Airlines',
          price: 380,
          duration: '6h 15m',
          stops: '1 stop',
          departure: '10:15',
          arrival: '16:30',
          rating: 4.0,
          image: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=400',
          details: {
            aircraft: 'Airbus A320',
            baggage: '1 carry-on included',
            amenities: ['WiFi', 'Snacks'],
            cancellation: 'Cancellation fee applies'
          }
        },
        {
          id: '3',
          airline: 'United Airlines',
          price: 520,
          duration: '4h 45m',
          stops: 'Direct',
          departure: '14:20',
          arrival: '19:05',
          rating: 4.5,
          image: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=400',
          details: {
            aircraft: 'Boeing 787',
            baggage: '2 carry-ons, 1 checked bag included',
            amenities: ['Premium WiFi', 'Premium entertainment', 'Premium meals'],
            cancellation: 'Free cancellation up to 48 hours'
          }
        }
      ],
      hotels: [
        {
          id: '1',
          name: 'Grand Plaza Hotel',
          price: 180,
          rating: 4.5,
          location: 'Downtown',
          amenities: ['wifi', 'breakfast', 'gym', 'pool'],
          image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: 'Luxury hotel in the heart of the city with stunning views',
          details: {
            roomType: 'Deluxe King Room',
            checkIn: '3:00 PM',
            checkOut: '11:00 AM',
            policies: 'Free cancellation until 6 PM on day of arrival',
            included: ['Free WiFi', 'Breakfast buffet', 'Gym access']
          }
        },
        {
          id: '2',
          name: 'Boutique Inn',
          price: 120,
          rating: 4.2,
          location: 'Arts District',
          amenities: ['wifi', 'restaurant', 'pets'],
          image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: 'Charming boutique hotel with personalized service',
          details: {
            roomType: 'Standard Queen Room',
            checkIn: '4:00 PM',
            checkOut: '12:00 PM',
            policies: 'Cancellation fee applies after 24 hours',
            included: ['Free WiFi', 'Pet-friendly']
          }
        },
        {
          id: '3',
          name: 'City Center Suites',
          price: 220,
          rating: 4.7,
          location: 'Business District',
          amenities: ['wifi', 'breakfast', 'gym', 'parking', 'ac'],
          image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: 'Modern suites perfect for business and leisure travelers',
          details: {
            roomType: 'Executive Suite',
            checkIn: '3:00 PM',
            checkOut: '12:00 PM',
            policies: 'Free cancellation up to 48 hours before arrival',
            included: ['Free WiFi', 'Breakfast', 'Gym', 'Parking']
          }
        }
      ],
      cars: [
        {
          id: '1',
          name: 'Toyota Camry',
          price: 45,
          type: 'Sedan',
          seats: 5,
          transmission: 'Automatic',
          rating: 4.3,
          image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=400',
          details: {
            fuel: 'Gasoline',
            mileage: 'Unlimited',
            insurance: 'Basic coverage included',
            pickup: 'Airport terminal',
            features: ['GPS Navigation', 'Bluetooth', 'Air Conditioning']
          }
        },
        {
          id: '2',
          name: 'Honda CR-V',
          price: 65,
          type: 'SUV',
          seats: 5,
          transmission: 'Automatic',
          rating: 4.5,
          image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=400',
          details: {
            fuel: 'Gasoline',
            mileage: 'Unlimited',
            insurance: 'Comprehensive coverage included',
            pickup: 'Downtown location',
            features: ['GPS Navigation', 'Bluetooth', 'All-wheel drive', 'Backup camera']
          }
        }
      ],
      activities: [
        {
          id: '1',
          name: 'City Walking Tour',
          price: 25,
          duration: '3 hours',
          rating: 4.6,
          category: 'Cultural',
          image: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: 'Explore the historic downtown with a local guide',
          details: {
            groupSize: 'Max 15 people',
            languages: ['English', 'Spanish'],
            includes: ['Professional guide', 'Historical insights', 'Photo opportunities'],
            meetingPoint: 'City Hall main entrance',
            cancellation: 'Free cancellation up to 24 hours'
          }
        },
        {
          id: '2',
          name: 'Food & Wine Experience',
          price: 85,
          duration: '4 hours',
          rating: 4.8,
          category: 'Culinary',
          image: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: 'Taste local specialties and wines with expert sommelier',
          details: {
            groupSize: 'Max 8 people',
            languages: ['English'],
            includes: ['Wine tastings', 'Local food samples', 'Expert sommelier', 'Transportation'],
            meetingPoint: 'Wine bar downtown',
            cancellation: 'Free cancellation up to 48 hours'
          }
        }
      ]
    };

    return baseResults[filters.type] || [];
  };

  const results = generateMockResults();

  const getAmenityIcon = (amenity: string) => {
    const icons: Record<string, any> = {
      wifi: Wifi,
      breakfast: Coffee,
      parking: Car,
      restaurant: Coffee,
      gym: Coffee,
      pool: Coffee,
      pets: Coffee,
      ac: Coffee
    };
    return icons[amenity] || Coffee;
  };

  const handleViewDetails = (result: any) => {
    const detailsText = `
${result.name || result.airline} Details:

${filters.type === 'flights' ? `
Aircraft: ${result.details?.aircraft}
Baggage: ${result.details?.baggage}
Amenities: ${result.details?.amenities?.join(', ')}
Cancellation: ${result.details?.cancellation}
` : ''}

${filters.type === 'hotels' ? `
Room Type: ${result.details?.roomType}
Check-in: ${result.details?.checkIn}
Check-out: ${result.details?.checkOut}
Policies: ${result.details?.policies}
Included: ${result.details?.included?.join(', ')}
` : ''}

${filters.type === 'cars' ? `
Fuel: ${result.details?.fuel}
Mileage: ${result.details?.mileage}
Insurance: ${result.details?.insurance}
Pickup: ${result.details?.pickup}
Features: ${result.details?.features?.join(', ')}
` : ''}

${filters.type === 'activities' ? `
Group Size: ${result.details?.groupSize}
Languages: ${result.details?.languages?.join(', ')}
Includes: ${result.details?.includes?.join(', ')}
Meeting Point: ${result.details?.meetingPoint}
Cancellation: ${result.details?.cancellation}
` : ''}
    `.trim();

    alert(detailsText);
  };

  const handleExternalLink = (result: any) => {
    // Generate external booking links based on type
    let url = '';
    const destination = filters.destination.toLowerCase().replace(/\s+/g, '-');
    
    switch (filters.type) {
      case 'flights':
        url = `https://www.skyscanner.com/transport/flights/${destination}/`;
        break;
      case 'hotels':
        url = `https://www.booking.com/searchresults.html?ss=${destination}`;
        break;
      case 'cars':
        url = `https://www.kayak.com/cars/${destination}`;
        break;
      case 'activities':
        url = `https://www.viator.com/searchResults/all?text=${destination}`;
        break;
    }
    
    window.open(url, '_blank');
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
            <div className="flex space-x-4">
              <div className="w-32 h-24 bg-gray-200 rounded-lg" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
                <div className="h-3 bg-gray-200 rounded w-1/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MapPin className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
        <p className="text-gray-600">Try adjusting your search criteria or filters</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          {results.length} {filters.type} found {filters.destination && `in ${filters.destination}`}
        </p>
      </div>

      {results.map((result: any, index) => (
        <motion.div
          key={result.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
        >
          <div className="flex flex-col md:flex-row">
            {/* Image */}
            <div className="md:w-64 h-48 md:h-auto">
              <img
                src={result.image}
                alt={result.name || result.airline}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {result.name || result.airline}
                  </h3>
                  {result.description && (
                    <p className="text-gray-600 text-sm mb-2">{result.description}</p>
                  )}
                  {result.location && (
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {result.location}
                    </div>
                  )}
                  {result.duration && (
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {result.duration}
                      {result.stops && ` • ${result.stops}`}
                    </div>
                  )}
                </div>

                <div className="text-right">
                  <div className="flex items-center mb-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm font-medium">{result.rating}</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    ${result.price}
                    <span className="text-sm font-normal text-gray-500">
                      {filters.type === 'hotels' ? '/night' : 
                       filters.type === 'cars' ? '/day' : ''}
                    </span>
                  </div>
                </div>
              </div>

              {/* Amenities for hotels */}
              {filters.type === 'hotels' && result.amenities && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {result.amenities.slice(0, 4).map((amenity: string) => {
                    const Icon = getAmenityIcon(amenity);
                    return (
                      <div
                        key={amenity}
                        className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-600"
                      >
                        <Icon className="w-3 h-3" />
                        <span className="capitalize">{amenity}</span>
                      </div>
                    );
                  })}
                  {result.amenities.length > 4 && (
                    <span className="text-xs text-gray-500">
                      +{result.amenities.length - 4} more
                    </span>
                  )}
                </div>
              )}

              {/* Flight times */}
              {filters.type === 'flights' && (
                <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                  <span>Departure: {result.departure}</span>
                  <span>•</span>
                  <span>Arrival: {result.arrival}</span>
                </div>
              )}

              {/* Car details */}
              {filters.type === 'cars' && (
                <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                  <span>{result.type}</span>
                  <span>•</span>
                  <span>{result.seats} seats</span>
                  <span>•</span>
                  <span>{result.transmission}</span>
                </div>
              )}

              {/* Activity details */}
              {filters.type === 'activities' && (
                <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                  <span>{result.category}</span>
                  <span>•</span>
                  <span>{result.duration}</span>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Share className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleViewDetails(result)}
                    className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center space-x-2"
                  >
                    <Info className="w-4 h-4" />
                    <span>Details</span>
                  </button>
                  <button 
                    onClick={() => handleExternalLink(result)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2"
                  >
                    <span>View on External Site</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SearchResults;