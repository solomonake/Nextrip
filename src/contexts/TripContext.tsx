import React, { createContext, useContext, useState } from 'react';

export interface Trip {
  id: string;
  title: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  travelers: number;
  budget: {
    total: number;
    spent: number;
    categories: {
      flights: number;
      hotels: number;
      food: number;
      activities: number;
      transport: number;
    };
  };
  itinerary: ItineraryItem[];
  bookings: Booking[];
  collaborators?: string[];
}

export interface ItineraryItem {
  id: string;
  type: 'flight' | 'hotel' | 'activity' | 'restaurant' | 'transport';
  title: string;
  description: string;
  startTime: Date;
  endTime?: Date;
  location: string;
  cost: number;
  status: 'planned' | 'booked' | 'completed';
  bookingId?: string;
}

export interface Booking {
  id: string;
  type: 'flight' | 'hotel' | 'car' | 'activity';
  title: string;
  details: any;
  cost: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  confirmationCode?: string;
}

interface TripContextType {
  currentTrip: Trip | null;
  trips: Trip[];
  setCurrentTrip: (trip: Trip | null) => void;
  addTrip: (trip: Trip) => void;
  updateTrip: (tripId: string, updates: Partial<Trip>) => void;
  deleteTrip: (tripId: string) => void;
  addItineraryItem: (item: ItineraryItem) => void;
  updateItineraryItem: (itemId: string, updates: Partial<ItineraryItem>) => void;
  addBooking: (booking: Booking) => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const useTrip = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
};

export const TripProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);

  const addTrip = (trip: Trip) => {
    setTrips(prev => [...prev, trip]);
    setCurrentTrip(trip);
  };

  const updateTrip = (tripId: string, updates: Partial<Trip>) => {
    setTrips(prev => prev.map(trip => 
      trip.id === tripId ? { ...trip, ...updates } : trip
    ));
    if (currentTrip?.id === tripId) {
      setCurrentTrip(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const deleteTrip = (tripId: string) => {
    setTrips(prev => prev.filter(trip => trip.id !== tripId));
    if (currentTrip?.id === tripId) {
      setCurrentTrip(null);
    }
  };

  const addItineraryItem = (item: ItineraryItem) => {
    if (!currentTrip) return;
    
    const updatedTrip = {
      ...currentTrip,
      itinerary: [...currentTrip.itinerary, item]
    };
    
    updateTrip(currentTrip.id, updatedTrip);
  };

  const updateItineraryItem = (itemId: string, updates: Partial<ItineraryItem>) => {
    if (!currentTrip) return;
    
    const updatedItinerary = currentTrip.itinerary.map(item =>
      item.id === itemId ? { ...item, ...updates } : item
    );
    
    updateTrip(currentTrip.id, { itinerary: updatedItinerary });
  };

  const addBooking = (booking: Booking) => {
    if (!currentTrip) return;
    
    const updatedTrip = {
      ...currentTrip,
      bookings: [...currentTrip.bookings, booking]
    };
    
    updateTrip(currentTrip.id, updatedTrip);
  };

  return (
    <TripContext.Provider value={{
      currentTrip,
      trips,
      setCurrentTrip,
      addTrip,
      updateTrip,
      deleteTrip,
      addItineraryItem,
      updateItineraryItem,
      addBooking
    }}>
      {children}
    </TripContext.Provider>
  );
};