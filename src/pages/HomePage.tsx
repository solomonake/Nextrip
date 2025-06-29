import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, MapPin, Calendar, Users } from 'lucide-react';

const destinations = [
  {
    id: 1,
    name: 'Paris, France',
    image: 'https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg?auto=compress&cs=tinysrgb&w=1920',
    description: 'Explore the city of lights and romance'
  },
  {
    id: 2,
    name: 'Tokyo, Japan',
    image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1920',
    description: 'Discover the perfect blend of tradition and innovation'
  },
  {
    id: 3,
    name: 'Santorini, Greece',
    image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=1920',
    description: 'Relax on stunning beaches with crystal clear waters'
  },
  {
    id: 4,
    name: 'Kyoto, Japan',
    image: 'https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=1920',
    description: 'Experience ancient temples and traditional culture'
  },
  {
    id: 5,
    name: 'Bali, Indonesia',
    image: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=1920',
    description: 'Find your paradise on this tropical island'
  }
];

export default function HomePage() {
  const [currentDestination, setCurrentDestination] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDestination((prev) => (prev + 1) % destinations.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image Carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentDestination}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${destinations[currentDestination].image})` }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-[2px]" />
        </motion.div>
      </AnimatePresence>

      {/* Destination Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-2">
          {destinations.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentDestination ? 'bg-white w-6' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Destination Info */}
      <div className="absolute bottom-20 left-8 z-20 max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDestination}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-2 text-white mb-1">
                <MapPin className="w-4 h-4" />
                <h3 className="font-bold text-xl">{destinations[currentDestination].name}</h3>
              </div>
              <p className="text-white/90">{destinations[currentDestination].description}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Logo */}
          <div className="mb-8 inline-flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-bold text-white">NexTrip</span>
          </div>
          
          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg"
          >
            Plan Your Next Adventure with AI ✈️
          </motion.h1>
          
          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-white mb-12 max-w-3xl mx-auto drop-shadow-md"
          >
            Flights, hotels, activities — your entire trip, personalized for you by AI.
          </motion.p>
          
          {/* Primary CTA Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-8"
          >
            <Link
              to="/ai-buddy"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-semibold px-12 py-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Plan My Trip
            </Link>
          </motion.div>
          
          {/* Secondary Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/my-trips"
              className="bg-white/20 backdrop-blur-md text-white font-medium px-8 py-3 rounded-xl hover:bg-white/30 transition-colors shadow-md border border-white/20"
            >
              My Trips
            </Link>
            <Link
              to="/community"
              className="bg-white/20 backdrop-blur-md text-white font-medium px-8 py-3 rounded-xl hover:bg-white/30 transition-colors shadow-md border border-white/20"
            >
              Community
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent py-8 z-10 hidden md:block">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-6">
            <div className="flex items-center space-x-3 text-white/90">
              <Plane className="w-6 h-6 text-blue-400" />
              <div>
                <h3 className="font-semibold">AI-Powered Planning</h3>
                <p className="text-sm text-white/70">Personalized itineraries in seconds</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-white/90">
              <Calendar className="w-6 h-6 text-purple-400" />
              <div>
                <h3 className="font-semibold">Smart Scheduling</h3>
                <p className="text-sm text-white/70">Optimized for your preferences</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-white/90">
              <Users className="w-6 h-6 text-green-400" />
              <div>
                <h3 className="font-semibold">Travel Community</h3>
                <p className="text-sm text-white/70">Connect with fellow adventurers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}