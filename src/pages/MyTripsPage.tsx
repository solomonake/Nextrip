import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Edit, Trash2, Eye, Plus } from 'lucide-react';
import TripCard from '../components/TripCard';

interface Trip {
  id: number;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: 'Planned' | 'Booked' | 'In Progress' | 'Completed';
  budget?: number;
  itinerary?: any;
}

export default function MyTripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);

  // Load trips from localStorage on component mount
  useEffect(() => {
    const savedTrips = localStorage.getItem('nextrip_saved_trips');
    if (savedTrips) {
      try {
        const parsedTrips = JSON.parse(savedTrips);
        setTrips(parsedTrips);
      } catch (error) {
        console.error('Error parsing saved trips:', error);
        setTrips([]);
      }
    }
  }, []);

  // Update trip status based on dates
  useEffect(() => {
    const updateTripStatuses = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const updatedTrips = trips.map(trip => {
        const startDate = new Date(trip.startDate);
        const endDate = new Date(trip.endDate);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);

        let newStatus = trip.status;

        // Auto-update status based on dates
        if (today > endDate && trip.status !== 'Completed') {
          newStatus = 'Completed';
        } else if (today >= startDate && today <= endDate && trip.status !== 'In Progress') {
          newStatus = 'In Progress';
        }

        return { ...trip, status: newStatus };
      });

      // Only update if there are actual changes
      const hasChanges = updatedTrips.some((trip, index) => trip.status !== trips[index]?.status);
      if (hasChanges) {
        setTrips(updatedTrips);
        localStorage.setItem('nextrip_saved_trips', JSON.stringify(updatedTrips));
      }
    };

    if (trips.length > 0) {
      updateTripStatuses();
    }
  }, [trips]);

  const handleEditTrip = (tripId: string) => {
    console.log('Editing trip:', tripId);
    // TODO: Implement edit functionality
    // This could open a modal or navigate to an edit page
  };

  const handleDeleteTrip = (tripId: string) => {
    const updatedTrips = trips.filter(trip => trip.id !== parseInt(tripId));
    setTrips(updatedTrips);
    localStorage.setItem('nextrip_saved_trips', JSON.stringify(updatedTrips));
    console.log('Deleting trip:', tripId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Centered with Top-Right Button */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12 text-center lg:text-left">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Trips</h1>
            <p className="text-lg text-gray-600">Manage and track all your travel adventures</p>
          </div>
          <div className="mt-6 lg:mt-0">
            <a
              href="/ai-buddy"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              <span>Plan New Trip</span>
            </a>
          </div>
        </div>

        {/* Trips Grid or Empty State */}
        {trips.length === 0 ? (
          /* Empty State - Centered */
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              You don't have any trips yet.
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start planning your next adventure with our AI-powered trip planner.
            </p>
            <a
              href="/ai-buddy"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              <span>Plan a New Trip</span>
            </a>
          </div>
        ) : (
          /* Trips Grid - Responsive and Equal Height Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trips.map((trip) => (
              <TripCard 
                key={trip.id} 
                trip={trip} 
                handleEditTrip={handleEditTrip}
                handleDeleteTrip={handleDeleteTrip}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}