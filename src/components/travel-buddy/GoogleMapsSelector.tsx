import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { MapPin, Star, Clock, DollarSign, Plus, Check, Loader, X, AlertCircle } from 'lucide-react';

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

interface GoogleMapsSelectorProps {
  destination: string;
  onAttractionsSelected: (attractions: Attraction[]) => void;
  selectedAttractions: Attraction[];
}

const containerStyle = {
  width: '100%',
  height: '500px'
};

const GoogleMapsSelector: React.FC<GoogleMapsSelectorProps> = ({ 
  destination, 
  onAttractionsSelected,
  selectedAttractions
}) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({ lat: 48.8566, lng: 2.3522 }); // Default to Paris
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get API key from environment variables
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const hasValidApiKey = apiKey && apiKey !== 'YOUR_API_KEY' && apiKey.trim() !== '';

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: hasValidApiKey ? apiKey : 'demo-key' // Use demo key to prevent loading if no valid key
  });

  // Geocode the destination to get coordinates
  useEffect(() => {
    if (destination) {
      setIsLoading(true);
      
      // In a real app, this would use the Google Maps Geocoding API
      // For demo purposes, we'll use hardcoded coordinates for some popular destinations
      const destinationCoordinates: Record<string, google.maps.LatLngLiteral> = {
        'Paris, France': { lat: 48.8566, lng: 2.3522 },
        'Tokyo, Japan': { lat: 35.6762, lng: 139.6503 },
        'New York, USA': { lat: 40.7128, lng: -74.0060 },
        'London, UK': { lat: 51.5074, lng: -0.1278 },
        'Rome, Italy': { lat: 41.9028, lng: 12.4964 },
        'Sydney, Australia': { lat: -33.8688, lng: 151.2093 },
        'Barcelona, Spain': { lat: 41.3851, lng: 2.1734 },
        'Amsterdam, Netherlands': { lat: 52.3676, lng: 4.9041 }
      };
      
      const coordinates = destinationCoordinates[destination] || { lat: 48.8566, lng: 2.3522 };
      setCenter(coordinates);
      
      // Simulate fetching attractions
      setTimeout(() => {
        const mockAttractions = generateMockAttractions(coordinates, destination);
        
        // Mark attractions that are already selected
        const updatedAttractions = mockAttractions.map(attraction => ({
          ...attraction,
          selected: selectedAttractions.some(selected => selected.id === attraction.id)
        }));
        
        setAttractions(updatedAttractions);
        setIsLoading(false);
      }, 1000);
    }
  }, [destination, selectedAttractions]);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleMarkerClick = (attraction: Attraction) => {
    setSelectedAttraction(attraction);
  };

  const handleToggleAttraction = (attraction: Attraction) => {
    const isSelected = selectedAttractions.some(selected => selected.id === attraction.id);
    
    let updatedSelected;
    if (isSelected) {
      // Remove from selected
      updatedSelected = selectedAttractions.filter(selected => selected.id !== attraction.id);
    } else {
      // Add to selected
      updatedSelected = [...selectedAttractions, attraction];
    }
    
    // Update local state
    setAttractions(attractions.map(a => 
      a.id === attraction.id ? { ...a, selected: !isSelected } : a
    ));
    
    // Notify parent
    onAttractionsSelected(updatedSelected);
    
    // Close info window
    setSelectedAttraction(null);
  };

  const generateMockAttractions = (coordinates: google.maps.LatLngLiteral, destination: string): Attraction[] => {
    // Generate attractions based on the destination
    if (destination.includes('Paris')) {
      return [
        {
          id: 'paris-1',
          name: 'Eiffel Tower',
          location: { lat: 48.8584, lng: 2.2945 },
          rating: 4.7,
          price_level: 2,
          types: ['tourist_attraction', 'point_of_interest'],
          vicinity: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France'
        },
        {
          id: 'paris-2',
          name: 'Louvre Museum',
          location: { lat: 48.8606, lng: 2.3376 },
          rating: 4.8,
          price_level: 2,
          types: ['museum', 'tourist_attraction'],
          vicinity: 'Rue de Rivoli, 75001 Paris, France'
        },
        {
          id: 'paris-3',
          name: 'Notre-Dame Cathedral',
          location: { lat: 48.8530, lng: 2.3499 },
          rating: 4.7,
          price_level: 0,
          types: ['church', 'tourist_attraction'],
          vicinity: '6 Parvis Notre-Dame - Pl. Jean-Paul II, 75004 Paris, France'
        },
        {
          id: 'paris-4',
          name: 'Arc de Triomphe',
          location: { lat: 48.8738, lng: 2.2950 },
          rating: 4.7,
          price_level: 1,
          types: ['tourist_attraction', 'point_of_interest'],
          vicinity: 'Place Charles de Gaulle, 75008 Paris, France'
        },
        {
          id: 'paris-5',
          name: 'Montmartre',
          location: { lat: 48.8867, lng: 2.3431 },
          rating: 4.6,
          price_level: 0,
          types: ['neighborhood', 'tourist_attraction'],
          vicinity: 'Montmartre, 75018 Paris, France'
        },
        {
          id: 'paris-6',
          name: 'Sainte-Chapelle',
          location: { lat: 48.8554, lng: 2.3457 },
          rating: 4.8,
          price_level: 2,
          types: ['church', 'tourist_attraction'],
          vicinity: '8 Boulevard du Palais, 75001 Paris, France'
        },
        {
          id: 'paris-7',
          name: 'Musée d\'Orsay',
          location: { lat: 48.8600, lng: 2.3266 },
          rating: 4.7,
          price_level: 2,
          types: ['museum', 'tourist_attraction'],
          vicinity: '1 Rue de la Légion d\'Honneur, 75007 Paris, France'
        }
      ];
    } else if (destination.includes('Tokyo')) {
      return [
        {
          id: 'tokyo-1',
          name: 'Tokyo Skytree',
          location: { lat: 35.7101, lng: 139.8107 },
          rating: 4.6,
          price_level: 2,
          types: ['tourist_attraction', 'point_of_interest'],
          vicinity: '1 Chome-1-2 Oshiage, Sumida City, Tokyo 131-0045, Japan'
        },
        {
          id: 'tokyo-2',
          name: 'Senso-ji Temple',
          location: { lat: 35.7147, lng: 139.7966 },
          rating: 4.7,
          price_level: 0,
          types: ['temple', 'tourist_attraction'],
          vicinity: '2 Chome-3-1 Asakusa, Taito City, Tokyo 111-0032, Japan'
        },
        {
          id: 'tokyo-3',
          name: 'Meiji Shrine',
          location: { lat: 35.6763, lng: 139.6993 },
          rating: 4.6,
          price_level: 0,
          types: ['shrine', 'tourist_attraction'],
          vicinity: '1-1 Yoyogikamizonocho, Shibuya City, Tokyo 151-8557, Japan'
        },
        {
          id: 'tokyo-4',
          name: 'Shinjuku Gyoen National Garden',
          location: { lat: 35.6851, lng: 139.7100 },
          rating: 4.6,
          price_level: 1,
          types: ['park', 'tourist_attraction'],
          vicinity: '11 Naitomachi, Shinjuku City, Tokyo 160-0014, Japan'
        },
        {
          id: 'tokyo-5',
          name: 'Tokyo Tower',
          location: { lat: 35.6586, lng: 139.7454 },
          rating: 4.5,
          price_level: 2,
          types: ['tourist_attraction', 'point_of_interest'],
          vicinity: '4 Chome-2-8 Shibakoen, Minato City, Tokyo 105-0011, Japan'
        }
      ];
    } else {
      // Generate random attractions around the coordinates
      return Array.from({ length: 5 }, (_, i) => {
        const lat = coordinates.lat + (Math.random() - 0.5) * 0.05;
        const lng = coordinates.lng + (Math.random() - 0.5) * 0.05;
        
        return {
          id: `attraction-${i}`,
          name: `Attraction ${i + 1}`,
          location: { lat, lng },
          rating: 3.5 + Math.random() * 1.5,
          price_level: Math.floor(Math.random() * 4),
          types: ['tourist_attraction', 'point_of_interest'],
          vicinity: `${destination}`
        };
      });
    }
  };

  const getPriceLevel = (level?: number) => {
    if (level === undefined) return 'Free';
    
    switch (level) {
      case 0: return 'Free';
      case 1: return '$';
      case 2: return '$$';
      case 3: return '$$$';
      case 4: return '$$$$';
      default: return 'Free';
    }
  };

  const getAttractionTypeLabel = (types: string[]) => {
    const typeMap: Record<string, string> = {
      'tourist_attraction': 'Tourist Attraction',
      'museum': 'Museum',
      'church': 'Church',
      'temple': 'Temple',
      'shrine': 'Shrine',
      'park': 'Park',
      'point_of_interest': 'Point of Interest',
      'neighborhood': 'Neighborhood'
    };
    
    for (const type of types) {
      if (typeMap[type]) return typeMap[type];
    }
    
    return 'Attraction';
  };

  // Show error message if no valid API key is provided
  if (!hasValidApiKey) {
    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Explore {destination}</h3>
          <p className="text-gray-600">Select attractions and activities to add to your itinerary</p>
        </div>
        
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-amber-600" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Google Maps API Key Required</h4>
          <p className="text-gray-600 mb-4">
            To use the interactive map feature, please add your Google Maps API key to the environment variables.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 text-left">
            <p className="text-sm text-gray-700 mb-2">
              <strong>Steps to add API key:</strong>
            </p>
            <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
              <li>Get a Google Maps JavaScript API key from the Google Cloud Console</li>
              <li>Add <code className="bg-gray-200 px-1 rounded">VITE_GOOGLE_MAPS_API_KEY=your_api_key_here</code> to your .env file</li>
              <li>Restart the development server</li>
            </ol>
          </div>
        </div>
        
        <div className="p-6">
          <h4 className="font-semibold text-gray-900 mb-3">Selected Attractions ({selectedAttractions.length})</h4>
          
          {selectedAttractions.length === 0 ? (
            <div className="text-center py-6 bg-gray-50 rounded-lg">
              <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">No attractions selected yet</p>
              <p className="text-sm text-gray-500">Map functionality requires Google Maps API key</p>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedAttractions.map(attraction => (
                <div key={attraction.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">{attraction.name}</h5>
                      <div className="flex items-center space-x-2 text-xs text-gray-600">
                        <div className="flex items-center">
                          <Star className="w-3 h-3 text-yellow-500 mr-1" />
                          <span>{attraction.rating.toFixed(1)}</span>
                        </div>
                        <span>•</span>
                        <span>{getAttractionTypeLabel(attraction.types)}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggleAttraction(attraction)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Failed to Load Maps</h3>
        <p className="text-gray-600">There was an error loading Google Maps. Please check your API key and try again.</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading Maps</h3>
        <p className="text-gray-600">Please wait while we load the map...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Explore {destination}</h3>
        <p className="text-gray-600">Select attractions and activities to add to your itinerary</p>
      </div>
      
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-80 z-10 flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <Loader className="w-6 h-6 text-blue-600 animate-spin" />
              <span className="text-lg font-medium text-gray-900">Loading attractions...</span>
            </div>
          </div>
        )}
        
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            disableDefaultUI: false,
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false
          }}
        >
          {attractions.map(attraction => (
            <Marker
              key={attraction.id}
              position={attraction.location}
              onClick={() => handleMarkerClick(attraction)}
              icon={{
                url: attraction.selected 
                  ? 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
                  : 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                scaledSize: new google.maps.Size(40, 40)
              }}
            />
          ))}
          
          {selectedAttraction && (
            <InfoWindow
              position={selectedAttraction.location}
              onCloseClick={() => setSelectedAttraction(null)}
            >
              <div className="p-2 max-w-xs">
                <h4 className="font-semibold text-gray-900 mb-1">{selectedAttraction.name}</h4>
                <div className="flex items-center space-x-2 mb-2 text-sm">
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-yellow-500 mr-1" />
                    <span>{selectedAttraction.rating.toFixed(1)}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center">
                    <DollarSign className="w-3 h-3 text-gray-500 mr-1" />
                    <span>{getPriceLevel(selectedAttraction.price_level)}</span>
                  </div>
                  <span>•</span>
                  <span>{getAttractionTypeLabel(selectedAttraction.types)}</span>
                </div>
                <p className="text-xs text-gray-600 mb-3">{selectedAttraction.vicinity}</p>
                <button
                  onClick={() => handleToggleAttraction(selectedAttraction)}
                  className={`w-full py-1.5 rounded text-sm font-medium flex items-center justify-center space-x-1 ${
                    selectedAttraction.selected
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {selectedAttraction.selected ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>Added to Itinerary</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3 h-3" />
                      <span>Add to Itinerary</span>
                    </>
                  )}
                </button>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
      
      <div className="p-6">
        <h4 className="font-semibold text-gray-900 mb-3">Selected Attractions ({selectedAttractions.length})</h4>
        
        {selectedAttractions.length === 0 ? (
          <div className="text-center py-6 bg-gray-50 rounded-lg">
            <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">No attractions selected yet</p>
            <p className="text-sm text-gray-500">Click on map markers to add attractions to your itinerary</p>
          </div>
        ) : (
          <div className="space-y-3">
            {selectedAttractions.map(attraction => (
              <div key={attraction.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900">{attraction.name}</h5>
                    <div className="flex items-center space-x-2 text-xs text-gray-600">
                      <div className="flex items-center">
                        <Star className="w-3 h-3 text-yellow-500 mr-1" />
                        <span>{attraction.rating.toFixed(1)}</span>
                      </div>
                      <span>•</span>
                      <span>{getAttractionTypeLabel(attraction.types)}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleToggleAttraction(attraction)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GoogleMapsSelector;