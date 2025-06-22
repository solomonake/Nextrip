/**
 * API utility functions for making requests to external services
 */

// Base API request function with error handling
export async function fetchApi<T>(
  url: string, 
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Weather API
export const weatherApi = {
  getWeather: async (location: string) => {
    // This would use a real API key in production
    const mockWeatherData = {
      location,
      temperature: Math.round(Math.random() * 30 + 5),
      condition: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Heavy Rain'][Math.floor(Math.random() * 5)],
      humidity: Math.round(Math.random() * 40 + 40),
      windSpeed: Math.round(Math.random() * 20 + 5),
    };
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockWeatherData;
  }
};

// Currency API
export const currencyApi = {
  getExchangeRates: async (baseCurrency: string) => {
    // This would use a real API key in production
    const mockRates: Record<string, number> = {
      USD: 1.0,
      EUR: 0.85,
      GBP: 0.73,
      JPY: 110.0,
      CAD: 1.25,
      AUD: 1.35,
      CHF: 0.92,
      CNY: 6.45,
    };
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return { base: baseCurrency, rates: mockRates };
  }
};

// Maps API
export const mapsApi = {
  searchPlaces: async (query: string) => {
    // This would use a real API key in production
    const mockPlaces = [
      { id: '1', name: 'Grand Plaza Hotel', lat: 40.7589, lng: -73.9851, rating: 4.5 },
      { id: '2', name: 'City Center', lat: 40.7505, lng: -73.9934, rating: 4.2 },
      { id: '3', name: 'Central Park', lat: 40.7812, lng: -73.9665, rating: 4.8 },
    ];
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockPlaces;
  }
};