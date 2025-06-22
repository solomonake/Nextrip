/**
 * Storage utility functions for managing local data
 */

// Generic storage functions
export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error getting item ${key} from localStorage:`, error);
      return defaultValue;
    }
  },
  
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting item ${key} in localStorage:`, error);
    }
  },
  
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item ${key} from localStorage:`, error);
    }
  }
};

// Trip-specific storage functions
export const tripStorage = {
  getTrips: () => storage.get('nextrip_saved_trips', []),
  saveTrip: (trip: any) => {
    const trips = tripStorage.getTrips();
    trips.push(trip);
    storage.set('nextrip_saved_trips', trips);
  },
  updateTrip: (tripId: number, updates: any) => {
    const trips = tripStorage.getTrips();
    const index = trips.findIndex((t: any) => t.id === tripId);
    if (index !== -1) {
      trips[index] = { ...trips[index], ...updates };
      storage.set('nextrip_saved_trips', trips);
    }
  },
  deleteTrip: (tripId: number) => {
    const trips = tripStorage.getTrips();
    const filteredTrips = trips.filter((t: any) => t.id !== tripId);
    storage.set('nextrip_saved_trips', filteredTrips);
  }
};

// User-specific storage functions
export const userStorage = {
  getUser: () => storage.get('nextrip_user', null),
  saveUser: (user: any) => storage.set('nextrip_user', user),
  clearUser: () => storage.remove('nextrip_user')
};