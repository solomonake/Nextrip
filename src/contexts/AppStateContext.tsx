import React, { createContext, useContext, useState, useEffect } from 'react';

// Define types for our app state
interface AppState {
  // AI Buddy state
  travelDetails: {
    startingLocation: string;
    destination: string;
    startDate: Date | null;
    endDate: Date | null;
    travelers: string;
    travelStyle: string;
    budgets: {
      flight: string;
      hotel: string;
      food: string;
      activities: string;
      souvenirs: string;
    }
  };
  
  // Search state
  searchFilters: {
    type: 'flights' | 'hotels' | 'cars' | 'activities';
    destination: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    priceRange: [number, number];
    rating: number;
    amenities: string[];
    sortBy: 'price' | 'rating' | 'distance' | 'popularity';
  };
  
  // Resources state
  resourcesActiveTab: 'ar-translator' | 'currency' | 'weather' | 'emergency' | 'maps';
  
  // Community state
  communityActiveTab: 'feed' | 'collab-matching' | 'collab-requests' | 'my-profile' | 'missions';
}

// Define the initial state
const initialState: AppState = {
  travelDetails: {
    startingLocation: '',
    destination: '',
    startDate: null,
    endDate: null,
    travelers: '1',
    travelStyle: 'adventure',
    budgets: {
      flight: '0',
      hotel: '0',
      food: '0',
      activities: '0',
      souvenirs: '0'
    }
  },
  searchFilters: {
    type: 'flights',
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    priceRange: [0, 1000],
    rating: 0,
    amenities: [],
    sortBy: 'popularity'
  },
  resourcesActiveTab: 'ar-translator',
  communityActiveTab: 'feed'
};

// Create the context
interface AppStateContextType {
  appState: AppState;
  updateTravelDetails: (details: Partial<AppState['travelDetails']>) => void;
  updateSearchFilters: (filters: Partial<AppState['searchFilters']>) => void;
  setResourcesActiveTab: (tab: AppState['resourcesActiveTab']) => void;
  setCommunityActiveTab: (tab: AppState['communityActiveTab']) => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

// Create the provider component
export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage if available
  const [appState, setAppState] = useState<AppState>(() => {
    const savedState = localStorage.getItem('nextrip_app_state');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        
        // Convert date strings back to Date objects
        if (parsedState.travelDetails) {
          if (parsedState.travelDetails.startDate) {
            parsedState.travelDetails.startDate = parsedState.travelDetails.startDate ? new Date(parsedState.travelDetails.startDate) : null;
          }
          if (parsedState.travelDetails.endDate) {
            parsedState.travelDetails.endDate = parsedState.travelDetails.endDate ? new Date(parsedState.travelDetails.endDate) : null;
          }
        }
        
        return { ...initialState, ...parsedState };
      } catch (error) {
        console.error('Error parsing saved app state:', error);
        return initialState;
      }
    }
    return initialState;
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('nextrip_app_state', JSON.stringify(appState));
  }, [appState]);

  // Update functions for different parts of the state
  const updateTravelDetails = (details: Partial<AppState['travelDetails']>) => {
    setAppState(prev => ({
      ...prev,
      travelDetails: {
        ...prev.travelDetails,
        ...details
      }
    }));
  };

  const updateSearchFilters = (filters: Partial<AppState['searchFilters']>) => {
    setAppState(prev => ({
      ...prev,
      searchFilters: {
        ...prev.searchFilters,
        ...filters
      }
    }));
  };

  const setResourcesActiveTab = (tab: AppState['resourcesActiveTab']) => {
    setAppState(prev => ({
      ...prev,
      resourcesActiveTab: tab
    }));
  };

  const setCommunityActiveTab = (tab: AppState['communityActiveTab']) => {
    setAppState(prev => ({
      ...prev,
      communityActiveTab: tab
    }));
  };

  return (
    <AppStateContext.Provider
      value={{
        appState,
        updateTravelDetails,
        updateSearchFilters,
        setResourcesActiveTab,
        setCommunityActiveTab
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

// Custom hook for using the context
export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};