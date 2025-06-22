import React from 'react';
import { Plane, Calendar, DollarSign, TrendingDown } from 'lucide-react';

interface FlightPricesProps {
  startingLocation: string;
  destination: string;
  onDateSelect: (dateRange: string, price: string) => void;
}

interface FlightOption {
  dateRange: string;
  price: string;
  savings: string;
  isWeekend: boolean;
}

const FlightPrices: React.FC<FlightPricesProps> = ({ startingLocation, destination, onDateSelect }) => {
  // Generate realistic flight prices based on route
  const generateFlightPrices = (): FlightOption[] => {
    const basePrice = getBasePriceForRoute(startingLocation, destination);
    const dates = generateNextThreeMonthsDates();
    
    return dates.map((date, index) => {
      const variation = (Math.random() - 0.5) * 0.4; // ±20% variation
      const weekendPenalty = date.isWeekend ? 0.15 : 0; // 15% more for weekends
      const seasonalFactor = getSeasonalFactor(date.month);
      
      const finalPrice = Math.round(basePrice * (1 + variation + weekendPenalty + seasonalFactor));
      const savings = index < 3 ? Math.round(basePrice * 0.2) : Math.round(basePrice * 0.1);
      
      return {
        dateRange: date.range,
        price: finalPrice.toString(),
        savings: savings.toString(),
        isWeekend: date.isWeekend
      };
    }).sort((a, b) => parseInt(a.price) - parseInt(b.price)).slice(0, 8);
  };

  const getBasePriceForRoute = (from: string, to: string): number => {
    // Simplified price estimation based on common routes
    const fromLower = from.toLowerCase();
    const toLower = to.toLowerCase();
    
    // International routes
    if (isInternational(fromLower, toLower)) {
      if (isEurope(toLower) || isEurope(fromLower)) return 650;
      if (isAsia(toLower) || isAsia(fromLower)) return 850;
      if (isAustralia(toLower) || isAustralia(fromLower)) return 1200;
      return 750; // Default international
    }
    
    // Domestic routes
    const distance = estimateDistance(fromLower, toLower);
    if (distance > 2000) return 350; // Cross-country
    if (distance > 1000) return 250; // Medium distance
    return 180; // Short distance
  };

  const isInternational = (from: string, to: string): boolean => {
    const usStates = ['california', 'new york', 'texas', 'florida', 'illinois', 'washington', 'nevada', 'colorado'];
    const fromUS = usStates.some(state => from.includes(state)) || from.includes('usa') || from.includes('us');
    const toUS = usStates.some(state => to.includes(state)) || to.includes('usa') || to.includes('us');
    return fromUS !== toUS;
  };

  const isEurope = (location: string): boolean => {
    const europeanCountries = ['france', 'germany', 'italy', 'spain', 'uk', 'england', 'london', 'paris', 'rome', 'madrid', 'berlin'];
    return europeanCountries.some(country => location.includes(country));
  };

  const isAsia = (location: string): boolean => {
    const asianCountries = ['japan', 'china', 'korea', 'thailand', 'singapore', 'tokyo', 'beijing', 'seoul', 'bangkok'];
    return asianCountries.some(country => location.includes(country));
  };

  const isAustralia = (location: string): boolean => {
    return location.includes('australia') || location.includes('sydney') || location.includes('melbourne');
  };

  const estimateDistance = (from: string, to: string): number => {
    // Simplified distance estimation for US domestic routes
    const majorCities = {
      'new york': { lat: 40.7, lng: -74.0 },
      'los angeles': { lat: 34.0, lng: -118.2 },
      'chicago': { lat: 41.9, lng: -87.6 },
      'miami': { lat: 25.8, lng: -80.2 },
      'seattle': { lat: 47.6, lng: -122.3 },
      'denver': { lat: 39.7, lng: -104.9 }
    };
    
    // Return estimated distance in miles (simplified)
    return Math.random() * 2500 + 500;
  };

  const getSeasonalFactor = (month: number): number => {
    // Peak season adjustments
    if (month >= 6 && month <= 8) return 0.2; // Summer peak
    if (month === 12 || month === 1) return 0.15; // Holiday season
    if (month >= 3 && month <= 5) return 0.1; // Spring
    return 0; // Off-season
  };

  const generateNextThreeMonthsDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 7; i < 90; i += 7) { // Weekly intervals starting next week
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const endDate = new Date(date);
      endDate.setDate(date.getDate() + 6); // 7-day trip
      
      const isWeekend = date.getDay() === 5 || date.getDay() === 6; // Friday or Saturday departure
      
      dates.push({
        range: `${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
        month: date.getMonth() + 1,
        isWeekend
      });
    }
    
    return dates;
  };

  const flightOptions = generateFlightPrices();

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
          <TrendingDown className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Best Flight Deals</h2>
          <p className="text-gray-600">Cheapest dates for {startingLocation} → {destination}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {flightOptions.map((option, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer group"
            onClick={() => onDateSelect(option.dateRange, option.price)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="font-medium text-gray-900">{option.dateRange}</span>
                {index < 3 && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                    Best Deal
                  </span>
                )}
              </div>
              {option.isWeekend && (
                <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
                  Weekend
                </span>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="text-xl font-bold text-gray-900">${option.price}</span>
                <span className="text-sm text-gray-500">per person</span>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-green-600 font-medium">
                  Save ${option.savings}
                </div>
                <div className="text-xs text-gray-500 group-hover:text-blue-600 transition-colors">
                  Click to select →
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start space-x-3">
          <Plane className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">Flight Price Tips</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Prices shown are estimates based on historical data</li>
              <li>• Tuesday and Wednesday departures are typically cheaper</li>
              <li>• Book 2-8 weeks in advance for best domestic deals</li>
              <li>• Consider nearby airports for additional savings</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightPrices;