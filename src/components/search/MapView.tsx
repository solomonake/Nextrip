import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, DollarSign, Navigation } from 'lucide-react';
import { SearchFilters } from '../../pages/SearchPage';

interface MapViewProps {
  filters: SearchFilters;
}

const MapView: React.FC<MapViewProps> = ({ filters }) => {
  // Mock map data
  const mapResults = [
    { id: '1', name: 'Grand Plaza Hotel', price: 180, rating: 4.5, lat: 40.7589, lng: -73.9851 },
    { id: '2', name: 'Boutique Inn', price: 120, rating: 4.2, lat: 40.7505, lng: -73.9934 },
    { id: '3', name: 'City Center Suites', price: 220, rating: 4.7, lat: 40.7614, lng: -73.9776 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      {/* Map Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Map View</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Navigation className="w-4 h-4" />
            <span>{mapResults.length} results</span>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-96 bg-gradient-to-br from-blue-100 to-green-100">
        {/* Mock Map Background */}
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">Interactive Map</p>
            <p className="text-sm text-gray-500">Map integration would be implemented here</p>
          </div>
        </div>

        {/* Mock Map Pins */}
        {mapResults.map((result, index) => (
          <div
            key={result.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{
              left: `${30 + index * 20}%`,
              top: `${40 + index * 10}%`
            }}
          >
            <div className="bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors">
              <div className="text-sm font-medium">${result.price}</div>
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-600 group-hover:border-t-blue-700 mx-auto mt-1"></div>
            </div>

            {/* Hover Card */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-lg shadow-xl p-3 w-48 z-10">
              <h4 className="font-medium text-gray-900 mb-1">{result.name}</h4>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                  <span>{result.rating}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="w-3 h-3 text-green-600 mr-1" />
                  <span>${result.price}/night</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Map Controls */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors">
              Zoom In
            </button>
            <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors">
              Zoom Out
            </button>
          </div>
          <div className="text-sm text-gray-600">
            Use mouse to pan and zoom
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MapView;