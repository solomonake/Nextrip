import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  MapPin, 
  Star, 
  Clock, 
  DollarSign,
  Info,
  Navigation,
  Scan,
  X,
  Volume2,
  Bookmark,
  Share
} from 'lucide-react';

interface ARPoint {
  id: string;
  name: string;
  type: 'landmark' | 'restaurant' | 'hotel' | 'activity' | 'transport';
  distance: number;
  rating: number;
  price?: number;
  description: string;
  position: { x: number; y: number };
  facts: string[];
  reviews: number;
}

interface ARExplorerProps {
  isActive: boolean;
  onClose: () => void;
  location?: { lat: number; lng: number };
}

const ARExplorer: React.FC<ARExplorerProps> = ({ isActive, onClose, location }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [detectedPoints, setDetectedPoints] = useState<ARPoint[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<ARPoint | null>(null);
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'pending'>('pending');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (isActive) {
      requestCameraAccess();
    } else {
      stopCamera();
    }

    return () => stopCamera();
  }, [isActive]);

  const requestCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraPermission('granted');
        
        // Simulate AR detection after camera starts
        setTimeout(() => {
          simulateARDetection();
        }, 2000);
      }
    } catch (error) {
      console.error('Camera access denied:', error);
      setCameraPermission('denied');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const simulateARDetection = () => {
    setIsScanning(true);
    
    // Simulate detecting points of interest
    setTimeout(() => {
      const mockPoints: ARPoint[] = [
        {
          id: '1',
          name: 'Eiffel Tower',
          type: 'landmark',
          distance: 0.2,
          rating: 4.8,
          description: 'Iconic iron lattice tower and symbol of Paris',
          position: { x: 45, y: 30 },
          facts: [
            'Built in 1889 for the World\'s Fair',
            'Height: 330 meters (1,083 feet)',
            'Receives 7 million visitors annually',
            'Painted every 7 years to prevent rust'
          ],
          reviews: 125000
        },
        {
          id: '2',
          name: 'Le Jules Verne',
          type: 'restaurant',
          distance: 0.2,
          rating: 4.6,
          price: 250,
          description: 'Michelin-starred restaurant in the Eiffel Tower',
          position: { x: 65, y: 45 },
          facts: [
            'Located on the 2nd floor of Eiffel Tower',
            'Michelin 1-star restaurant',
            'Chef: Frédéric Anton',
            'Reservations required months in advance'
          ],
          reviews: 3200
        },
        {
          id: '3',
          name: 'Seine River Cruise',
          type: 'activity',
          distance: 0.5,
          rating: 4.4,
          price: 35,
          description: 'Scenic boat tour along the Seine River',
          position: { x: 25, y: 70 },
          facts: [
            'Duration: 1 hour',
            'Passes 37 bridges',
            'Audio guide in 14 languages',
            'Operates year-round'
          ],
          reviews: 8500
        }
      ];

      setDetectedPoints(mockPoints);
      setIsScanning(false);
    }, 3000);
  };

  const getPointIcon = (type: string) => {
    switch (type) {
      case 'landmark': return '🏛️';
      case 'restaurant': return '🍽️';
      case 'hotel': return '🏨';
      case 'activity': return '🎯';
      case 'transport': return '🚇';
      default: return '📍';
    }
  };

  const getPointColor = (type: string) => {
    switch (type) {
      case 'landmark': return 'bg-purple-500';
      case 'restaurant': return 'bg-orange-500';
      case 'hotel': return 'bg-blue-500';
      case 'activity': return 'bg-green-500';
      case 'transport': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black"
    >
      {/* Camera View */}
      <div className="relative w-full h-full">
        {cameraPermission === 'granted' ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        ) : cameraPermission === 'denied' ? (
          <div className="w-full h-full bg-gray-900 flex items-center justify-center">
            <div className="text-center text-white">
              <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">Camera Access Required</h3>
              <p className="text-gray-300 mb-4">Please enable camera access to use AR Explorer</p>
              <button
                onClick={requestCameraAccess}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Enable Camera
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full h-full bg-gray-900 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p>Requesting camera access...</p>
            </div>
          </div>
        )}

        {/* AR Overlay */}
        {cameraPermission === 'granted' && (
          <>
            {/* Header Controls */}
            <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-white">
                  <Scan className="w-5 h-5" />
                  <span className="font-medium">AR Explorer</span>
                  {isScanning && (
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-sm">Scanning...</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 bg-black/30 rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scanning Animation */}
            {isScanning && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 border-2 border-blue-400 rounded-lg animate-pulse" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-32 h-32 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
                </div>
              </div>
            )}

            {/* AR Points */}
            {detectedPoints.map((point) => (
              <motion.div
                key={point.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute cursor-pointer"
                style={{
                  left: `${point.position.x}%`,
                  top: `${point.position.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                onClick={() => setSelectedPoint(point)}
              >
                <div className="relative">
                  {/* Point Marker */}
                  <div className={`w-12 h-12 ${getPointColor(point.type)} rounded-full flex items-center justify-center text-white shadow-lg animate-pulse`}>
                    <span className="text-xl">{getPointIcon(point.type)}</span>
                  </div>
                  
                  {/* Distance Label */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                    {point.distance}km
                  </div>
                  
                  {/* Pulse Animation */}
                  <div className={`absolute inset-0 ${getPointColor(point.type)} rounded-full animate-ping opacity-30`} />
                </div>
              </motion.div>
            ))}

            {/* Bottom Instructions */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
              <div className="text-center text-white">
                <p className="text-sm opacity-75">Point your camera at landmarks to discover information</p>
                <div className="flex items-center justify-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-purple-500 rounded-full" />
                    <span className="text-xs">Landmarks</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-orange-500 rounded-full" />
                    <span className="text-xs">Restaurants</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span className="text-xs">Activities</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Point Details Modal */}
        <AnimatePresence>
          {selectedPoint && (
            <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl max-h-[70vh] overflow-y-auto"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-2xl">{getPointIcon(selectedPoint.type)}</span>
                      <h3 className="text-xl font-bold text-gray-900">{selectedPoint.name}</h3>
                    </div>
                    <p className="text-gray-600 text-sm">{selectedPoint.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedPoint(null)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Quick Info */}
                <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedPoint.distance}km away</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{selectedPoint.rating}</span>
                    <span>({selectedPoint.reviews.toLocaleString()} reviews)</span>
                  </div>
                  {selectedPoint.price && (
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4" />
                      <span>${selectedPoint.price}</span>
                    </div>
                  )}
                </div>

                {/* Facts */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Info className="w-4 h-4 mr-2" />
                    Interesting Facts
                  </h4>
                  <div className="space-y-2">
                    {selectedPoint.facts.map((fact, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                        <span className="text-sm text-gray-700">{fact}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                    <Navigation className="w-4 h-4" />
                    <span>Get Directions</span>
                  </button>
                  <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Share className="w-4 h-4" />
                  </button>
                  <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ARExplorer;