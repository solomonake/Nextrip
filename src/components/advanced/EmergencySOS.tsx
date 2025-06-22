import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  Phone, 
  MapPin, 
  Clock, 
  Shield, 
  Users,
  Heart,
  X,
  Send,
  Navigation,
  Zap
} from 'lucide-react';

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
}

interface EmergencyService {
  id: string;
  name: string;
  number: string;
  type: 'police' | 'medical' | 'fire' | 'embassy' | 'tourist';
  available24h: boolean;
}

interface LocationData {
  latitude: number;
  longitude: number;
  address: string;
  accuracy: number;
}

interface EmergencySOSProps {
  isActive: boolean;
  onClose: () => void;
  destination?: string;
}

const EmergencySOS: React.FC<EmergencySOSProps> = ({ isActive, onClose, destination = 'Paris, France' }) => {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [emergencyType, setEmergencyType] = useState<string>('');
  const [message, setMessage] = useState('');
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);

  const emergencyContacts: EmergencyContact[] = [
    {
      id: '1',
      name: 'John Smith',
      relationship: 'Emergency Contact',
      phone: '+1-555-0123',
      email: 'john.smith@email.com'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      relationship: 'Family',
      phone: '+1-555-0456',
      email: 'sarah.j@email.com'
    }
  ];

  const emergencyServices: EmergencyService[] = [
    {
      id: '1',
      name: 'Police',
      number: '17',
      type: 'police',
      available24h: true
    },
    {
      id: '2',
      name: 'Medical Emergency (SAMU)',
      number: '15',
      type: 'medical',
      available24h: true
    },
    {
      id: '3',
      name: 'Fire Department',
      number: '18',
      type: 'fire',
      available24h: true
    },
    {
      id: '4',
      name: 'US Embassy Paris',
      number: '+33 1 43 12 22 22',
      type: 'embassy',
      available24h: false
    },
    {
      id: '5',
      name: 'Tourist Police',
      number: '+33 1 53 71 53 71',
      type: 'tourist',
      available24h: true
    }
  ];

  const emergencyTypes = [
    { id: 'medical', label: 'Medical Emergency', icon: Heart, color: 'bg-red-500' },
    { id: 'safety', label: 'Safety Threat', icon: Shield, color: 'bg-orange-500' },
    { id: 'lost', label: 'Lost/Stranded', icon: MapPin, color: 'bg-blue-500' },
    { id: 'accident', label: 'Accident', icon: AlertTriangle, color: 'bg-yellow-500' },
    { id: 'other', label: 'Other Emergency', icon: Phone, color: 'bg-gray-500' }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (countdown !== null && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => prev! - 1);
      }, 1000);
    } else if (countdown === 0) {
      triggerEmergency();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [countdown]);

  const startEmergencyCountdown = () => {
    setCountdown(10); // 10 second countdown
  };

  const cancelCountdown = () => {
    setCountdown(null);
  };

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationData: LocationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            address: `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`,
            accuracy: position.coords.accuracy
          };
          setLocation(locationData);
          setIsGettingLocation(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          // Fallback to mock location
          setLocation({
            latitude: 48.8566,
            longitude: 2.3522,
            address: 'Near Louvre Museum, Paris, France',
            accuracy: 10
          });
          setIsGettingLocation(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    } else {
      // Fallback for browsers without geolocation
      setLocation({
        latitude: 48.8566,
        longitude: 2.3522,
        address: 'Near Louvre Museum, Paris, France',
        accuracy: 10
      });
      setIsGettingLocation(false);
    }
  };

  const triggerEmergency = () => {
    setIsEmergencyActive(true);
    setCountdown(null);
    
    // In a real app, this would:
    // 1. Send location to emergency services
    // 2. Send alerts to emergency contacts
    // 3. Start live location sharing
    // 4. Contact local emergency services
    
    console.log('Emergency triggered!', {
      type: emergencyType,
      location,
      message,
      timestamp: new Date()
    });
  };

  const sendAlert = (contactId: string) => {
    const contact = emergencyContacts.find(c => c.id === contactId);
    if (contact) {
      // In a real app, this would send SMS/email
      console.log(`Sending alert to ${contact.name}:`, {
        location,
        message,
        emergencyType
      });
    }
  };

  const callEmergencyService = (serviceId: string) => {
    const service = emergencyServices.find(s => s.id === serviceId);
    if (service) {
      // In a real app, this would initiate a call
      window.open(`tel:${service.number}`);
    }
  };

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'police': return '👮';
      case 'medical': return '🚑';
      case 'fire': return '🚒';
      case 'embassy': return '🏛️';
      case 'tourist': return '🗺️';
      default: return '📞';
    }
  };

  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        >
          {/* Header */}
          <div className="bg-red-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Emergency SOS</h2>
                  <p className="text-sm opacity-90">{destination}</p>
                </div>
              </div>
              {!isEmergencyActive && countdown === null && (
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          <div className="p-6">
            {/* Emergency Countdown */}
            <AnimatePresence>
              {countdown !== null && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="text-center mb-6"
                >
                  <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                    <div className="text-3xl font-bold text-red-600">{countdown}</div>
                    <div className="absolute inset-0 border-4 border-red-500 rounded-full animate-ping" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Emergency Alert in {countdown} seconds
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Your location and emergency contacts will be notified
                  </p>
                  <button
                    onClick={cancelCountdown}
                    className="bg-gray-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Emergency Active State */}
            <AnimatePresence>
              {isEmergencyActive && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center mb-6"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Emergency Alert Sent!
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Your emergency contacts have been notified with your location
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-sm text-green-800">
                      Live location sharing is now active
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Emergency Interface */}
            {countdown === null && !isEmergencyActive && (
              <>
                {/* Emergency Type Selection */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Emergency Type</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {emergencyTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <button
                          key={type.id}
                          onClick={() => setEmergencyType(type.id)}
                          className={`p-3 rounded-lg border-2 text-left transition-colors ${
                            emergencyType === type.id
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <div className={`w-8 h-8 ${type.color} rounded-full flex items-center justify-center text-white`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-medium">{type.label}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Location */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Current Location</h3>
                    <button
                      onClick={getCurrentLocation}
                      disabled={isGettingLocation}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium disabled:opacity-50"
                    >
                      {isGettingLocation ? 'Getting...' : 'Update'}
                    </button>
                  </div>
                  {location ? (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-blue-900">{location.address}</p>
                          <p className="text-xs text-blue-700">
                            Accuracy: ±{location.accuracy}m
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={getCurrentLocation}
                      className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 transition-colors"
                    >
                      <MapPin className="w-5 h-5 mx-auto mb-1" />
                      <span className="text-sm">Get Current Location</span>
                    </button>
                  )}
                </div>

                {/* Message */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Additional Information</h3>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your emergency (optional)..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                </div>

                {/* Emergency Button */}
                <button
                  onClick={startEmergencyCountdown}
                  disabled={!emergencyType || !location}
                  className="w-full bg-red-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-6"
                >
                  🚨 SEND EMERGENCY ALERT
                </button>
              </>
            )}

            {/* Emergency Services */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Emergency Services</h3>
              <div className="space-y-2">
                {emergencyServices.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => callEmergencyService(service.id)}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{getServiceIcon(service.type)}</span>
                      <div className="text-left">
                        <p className="font-medium text-gray-900">{service.name}</p>
                        <p className="text-sm text-gray-600">{service.number}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {service.available24h && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          24/7
                        </span>
                      )}
                      <Phone className="w-4 h-4 text-gray-400" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Emergency Contacts */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Emergency Contacts</h3>
              <div className="space-y-2">
                {emergencyContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{contact.name}</p>
                        <p className="text-sm text-gray-600">{contact.relationship}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => sendAlert(contact.id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors flex items-center space-x-1"
                    >
                      <Send className="w-3 h-3" />
                      <span>Alert</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EmergencySOS;