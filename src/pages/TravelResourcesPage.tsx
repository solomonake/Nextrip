import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Scan, 
  Calculator, 
  Cloud, 
  Phone, 
  Map,
  Languages,
  DollarSign,
  Thermometer,
  AlertTriangle,
  Navigation,
  Wifi,
  WifiOff,
  Camera,
  Volume2,
  Download,
  Star,
  MapPin,
  Clock,
  Battery,
  Signal
} from 'lucide-react';
import ARTranslator from '../components/resources/ARTranslator';
import CurrencyCalculator from '../components/resources/CurrencyCalculator';
import WeatherTracker from '../components/resources/WeatherTracker';
import EmergencyContacts from '../components/resources/EmergencyContacts';
import OfflineMaps from '../components/resources/OfflineMaps';
import { useAppState } from '../contexts/AppStateContext';

const TravelResourcesPage: React.FC = () => {
  const { appState, setResourcesActiveTab } = useAppState();
  const activeTab = appState.resourcesActiveTab;

  const tabs = [
    { 
      id: 'ar-translator', 
      label: 'AR Translator', 
      icon: Scan, 
      description: 'Scan and translate text in real-time',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      id: 'currency', 
      label: 'Currency Exchange', 
      icon: Calculator, 
      description: 'Real-time currency conversion',
      color: 'from-green-500 to-emerald-500'
    },
    { 
      id: 'weather', 
      label: 'Weather Tracker', 
      icon: Cloud, 
      description: 'Local weather and forecasts',
      color: 'from-purple-500 to-pink-500'
    },
    { 
      id: 'emergency', 
      label: 'Emergency Contacts', 
      icon: Phone, 
      description: 'Local emergency numbers',
      color: 'from-red-500 to-orange-500'
    },
    { 
      id: 'maps', 
      label: 'Offline Maps', 
      icon: Map, 
      description: 'Download maps for offline use',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const quickStats = [
    {
      icon: Languages,
      value: '100+',
      label: 'Languages Supported',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: DollarSign,
      value: '180+',
      label: 'Currencies Tracked',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Thermometer,
      value: '24/7',
      label: 'Weather Updates',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: AlertTriangle,
      value: '195',
      label: 'Countries Covered',
      color: 'bg-red-100 text-red-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Navigation className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Travel Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Essential tools for modern travelers. From AR translation to offline maps, 
            everything you need to navigate the world with confidence.
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-4 shadow-lg"
                >
                  <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setResourcesActiveTab(tab.id as any)}
                className={`relative overflow-hidden rounded-2xl p-6 text-white transition-all duration-300 transform hover:scale-105 ${
                  activeTab === tab.id 
                    ? 'shadow-2xl ring-4 ring-white ring-opacity-50' 
                    : 'shadow-lg hover:shadow-xl'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${tab.color}`} />
                <div className="relative z-10">
                  <Icon className="w-8 h-8 mb-4 mx-auto" />
                  <h3 className="font-bold text-lg mb-2">{tab.label}</h3>
                  <p className="text-sm opacity-90">{tab.description}</p>
                  {activeTab === tab.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
                    >
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </motion.div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Main Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {activeTab === 'ar-translator' && <ARTranslator />}
          {activeTab === 'currency' && <CurrencyCalculator />}
          {activeTab === 'weather' && <WeatherTracker />}
          {activeTab === 'emergency' && <EmergencyContacts />}
          {activeTab === 'maps' && <OfflineMaps />}
        </motion.div>

        {/* Bottom Tips */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">💡 Pro Travel Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <WifiOff className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Download Before You Go</h4>
              <p className="text-sm text-gray-600">Download maps and translation packs while connected to WiFi to use offline</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Battery className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Save Battery Life</h4>
              <p className="text-sm text-gray-600">Use airplane mode with WiFi to conserve battery while accessing offline features</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Signal className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Stay Connected</h4>
              <p className="text-sm text-gray-600">Keep emergency contacts accessible even without internet connection</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelResourcesPage;