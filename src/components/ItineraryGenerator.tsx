import React from 'react';
import { MapPin, Calendar, DollarSign, Plane, Building, UtensilsCrossed, Camera, Gift, Star, Clock, Users } from 'lucide-react';

interface TravelDetails {
  startingLocation: string;
  destination: string;
  dateRange: string;
  budgets: {
    flight: string;
    hotel: string;
    food: string;
    activities: string;
    souvenirs: string;
  };
}

interface ItineraryGeneratorProps {
  travelDetails: TravelDetails;
  onBack: () => void;
}

interface Itinerary {
  id: number;
  title: string;
  description: string;
  flight: {
    airline: string;
    price: number;
    duration: string;
    stops: string;
  };
  hotel: {
    name: string;
    rating: number;
    price: number;
    location: string;
    amenities: string[];
  };
  restaurants: Array<{
    name: string;
    cuisine: string;
    priceRange: string;
    rating: number;
    specialty: string;
  }>;
  activities: Array<{
    name: string;
    type: string;
    price: number;
    duration: string;
    description: string;
  }>;
  souvenirs: {
    location: string;
    items: string[];
    budget: number;
  };
  totalCost: number;
  savings: number;
}

const ItineraryGenerator: React.FC<ItineraryGeneratorProps> = ({ travelDetails, onBack }) => {
  const generateItineraries = (): Itinerary[] => {
    const budgets = {
      flight: parseInt(travelDetails.budgets.flight),
      hotel: parseInt(travelDetails.budgets.hotel),
      food: parseInt(travelDetails.budgets.food),
      activities: parseInt(travelDetails.budgets.activities),
      souvenirs: parseInt(travelDetails.budgets.souvenirs)
    };

    const totalBudget = Object.values(budgets).reduce((sum, budget) => sum + budget, 0);
    const destination = travelDetails.destination.toLowerCase();

    return [
      generateBudgetItinerary(budgets, destination, totalBudget),
      generateBalancedItinerary(budgets, destination, totalBudget),
      generateLuxuryItinerary(budgets, destination, totalBudget)
    ];
  };

  const generateBudgetItinerary = (budgets: any, destination: string, totalBudget: number): Itinerary => {
    const flightCost = Math.min(budgets.flight * 0.8, budgets.flight - 50);
    const hotelCost = Math.min(budgets.hotel * 0.75, budgets.hotel - 100);
    const activitiesCost = budgets.activities * 0.8;
    
    return {
      id: 1,
      title: "Budget Explorer",
      description: "Smart savings without compromising on experiences",
      flight: {
        airline: getAirlineForRoute(destination, "budget"),
        price: flightCost,
        duration: getFlightDuration(destination),
        stops: "1 stop"
      },
      hotel: {
        name: getBudgetHotel(destination),
        rating: 3.5,
        price: hotelCost,
        location: "City Center",
        amenities: ["Free WiFi", "Breakfast", "24/7 Front Desk"]
      },
      restaurants: getBudgetRestaurants(destination),
      activities: getBudgetActivities(destination, activitiesCost),
      souvenirs: {
        location: getShoppingLocation(destination, "budget"),
        items: ["Local crafts", "Postcards", "Magnets", "Local snacks"],
        budget: budgets.souvenirs * 0.9
      },
      totalCost: flightCost + hotelCost + (budgets.food * 0.85) + activitiesCost + (budgets.souvenirs * 0.9),
      savings: totalBudget - (flightCost + hotelCost + (budgets.food * 0.85) + activitiesCost + (budgets.souvenirs * 0.9))
    };
  };

  const generateBalancedItinerary = (budgets: any, destination: string, totalBudget: number): Itinerary => {
    const flightCost = budgets.flight * 0.95;
    const hotelCost = budgets.hotel * 0.9;
    const activitiesCost = budgets.activities * 0.95;
    
    return {
      id: 2,
      title: "Perfect Balance",
      description: "The ideal mix of comfort, culture, and adventure",
      flight: {
        airline: getAirlineForRoute(destination, "standard"),
        price: flightCost,
        duration: getFlightDuration(destination),
        stops: "Direct"
      },
      hotel: {
        name: getStandardHotel(destination),
        rating: 4.2,
        price: hotelCost,
        location: "Downtown",
        amenities: ["Pool", "Gym", "Restaurant", "Concierge", "Free WiFi"]
      },
      restaurants: getStandardRestaurants(destination),
      activities: getStandardActivities(destination, activitiesCost),
      souvenirs: {
        location: getShoppingLocation(destination, "standard"),
        items: ["Artisan goods", "Local specialties", "Clothing", "Jewelry"],
        budget: budgets.souvenirs
      },
      totalCost: flightCost + hotelCost + (budgets.food * 0.95) + activitiesCost + budgets.souvenirs,
      savings: totalBudget - (flightCost + hotelCost + (budgets.food * 0.95) + activitiesCost + budgets.souvenirs)
    };
  };

  const generateLuxuryItinerary = (budgets: any, destination: string, totalBudget: number): Itinerary => {
    const flightCost = budgets.flight;
    const hotelCost = budgets.hotel;
    const activitiesCost = budgets.activities;
    
    return {
      id: 3,
      title: "Premium Experience",
      description: "Luxury accommodations and exclusive experiences",
      flight: {
        airline: getAirlineForRoute(destination, "premium"),
        price: flightCost,
        duration: getFlightDuration(destination),
        stops: "Direct"
      },
      hotel: {
        name: getLuxuryHotel(destination),
        rating: 4.8,
        price: hotelCost,
        location: "Prime Location",
        amenities: ["Spa", "Fine Dining", "Butler Service", "Premium WiFi", "Rooftop Bar"]
      },
      restaurants: getLuxuryRestaurants(destination),
      activities: getLuxuryActivities(destination, activitiesCost),
      souvenirs: {
        location: getShoppingLocation(destination, "luxury"),
        items: ["Designer items", "Premium local products", "Art pieces", "Luxury goods"],
        budget: budgets.souvenirs
      },
      totalCost: flightCost + hotelCost + budgets.food + activitiesCost + budgets.souvenirs,
      savings: 0
    };
  };

  // Helper functions for generating realistic content
  const getAirlineForRoute = (destination: string, tier: string) => {
    const airlines = {
      budget: ["Southwest", "JetBlue", "Spirit", "Frontier"],
      standard: ["American", "Delta", "United", "Alaska"],
      premium: ["Delta One", "American First", "United Polaris", "Emirates"]
    };
    return airlines[tier as keyof typeof airlines][Math.floor(Math.random() * airlines[tier as keyof typeof airlines].length)];
  };

  const getFlightDuration = (destination: string) => {
    if (destination.includes('europe') || destination.includes('paris') || destination.includes('london')) return "8h 30m";
    if (destination.includes('asia') || destination.includes('tokyo') || destination.includes('bangkok')) return "14h 20m";
    if (destination.includes('australia')) return "17h 45m";
    return "3h 45m"; // Domestic
  };

  const getBudgetHotel = (destination: string) => {
    const hotels = [
      "City Center Inn", "Traveler's Lodge", "Downtown Hostel", "Budget Stay Hotel",
      "Comfort Inn Express", "Economy Suites", "Backpacker's Haven"
    ];
    return hotels[Math.floor(Math.random() * hotels.length)];
  };

  const getStandardHotel = (destination: string) => {
    const hotels = [
      "Grand Plaza Hotel", "Metropolitan Inn", "City View Suites", "Harbor Hotel",
      "Downtown Marriott", "Hilton Garden Inn", "Courtyard by Marriott"
    ];
    return hotels[Math.floor(Math.random() * hotels.length)];
  };

  const getLuxuryHotel = (destination: string) => {
    const hotels = [
      "The Ritz-Carlton", "Four Seasons Resort", "St. Regis Hotel", "Waldorf Astoria",
      "The Peninsula", "Mandarin Oriental", "Park Hyatt"
    ];
    return hotels[Math.floor(Math.random() * hotels.length)];
  };

  const getBudgetRestaurants = (destination: string) => [
    { name: "Local Eats Cafe", cuisine: "Local", priceRange: "$", rating: 4.1, specialty: "Traditional dishes" },
    { name: "Street Food Market", cuisine: "Various", priceRange: "$", rating: 4.3, specialty: "Authentic street food" },
    { name: "Family Diner", cuisine: "Comfort Food", priceRange: "$", rating: 4.0, specialty: "Home-style cooking" }
  ];

  const getStandardRestaurants = (destination: string) => [
    { name: "Bistro Central", cuisine: "International", priceRange: "$$", rating: 4.4, specialty: "Fusion cuisine" },
    { name: "The Local Table", cuisine: "Regional", priceRange: "$$", rating: 4.5, specialty: "Farm-to-table" },
    { name: "Seaside Grill", cuisine: "Seafood", priceRange: "$$", rating: 4.3, specialty: "Fresh catch daily" }
  ];

  const getLuxuryRestaurants = (destination: string) => [
    { name: "Le Gourmet", cuisine: "Fine Dining", priceRange: "$$$", rating: 4.8, specialty: "Michelin-starred chef" },
    { name: "Rooftop Elegance", cuisine: "Contemporary", priceRange: "$$$", rating: 4.7, specialty: "City views & wine" },
    { name: "The Chef's Table", cuisine: "Tasting Menu", priceRange: "$$$", rating: 4.9, specialty: "7-course experience" }
  ];

  const getBudgetActivities = (destination: string, budget: number) => [
    { name: "City Walking Tour", type: "Cultural", price: Math.round(budget * 0.2), duration: "3 hours", description: "Explore historic neighborhoods" },
    { name: "Local Museum Visit", type: "Educational", price: Math.round(budget * 0.3), duration: "2 hours", description: "Learn about local history" },
    { name: "Public Park & Gardens", type: "Nature", price: Math.round(budget * 0.1), duration: "2 hours", description: "Relax in beautiful gardens" }
  ];

  const getStandardActivities = (destination: string, budget: number) => [
    { name: "Guided City Tour", type: "Cultural", price: Math.round(budget * 0.35), duration: "4 hours", description: "Professional guide & transport" },
    { name: "Popular Attraction Pass", type: "Sightseeing", price: Math.round(budget * 0.4), duration: "Full day", description: "Access to top attractions" },
    { name: "Local Experience Workshop", type: "Cultural", price: Math.round(budget * 0.25), duration: "3 hours", description: "Hands-on local craft" }
  ];

  const getLuxuryActivities = (destination: string, budget: number) => [
    { name: "Private City Tour", type: "Exclusive", price: Math.round(budget * 0.4), duration: "6 hours", description: "Personal guide & luxury vehicle" },
    { name: "VIP Attraction Access", type: "Premium", price: Math.round(budget * 0.35), duration: "Full day", description: "Skip lines & exclusive areas" },
    { name: "Sunset Helicopter Tour", type: "Adventure", price: Math.round(budget * 0.25), duration: "1 hour", description: "Aerial city views" }
  ];

  const getShoppingLocation = (destination: string, tier: string) => {
    const locations = {
      budget: "Local Markets & Souvenir Shops",
      standard: "Shopping District & Artisan Quarter",
      luxury: "Premium Boutiques & Designer Stores"
    };
    return locations[tier as keyof typeof locations];
  };

  const itineraries = generateItineraries();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <button
              onClick={onBack}
              className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6"
            >
              ← Back to planning
            </button>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Camera className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Your Personalized Itineraries
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              I've created 3 complete travel plans for your trip from{' '}
              <span className="font-semibold text-indigo-600">{travelDetails.startingLocation}</span> to{' '}
              <span className="font-semibold text-indigo-600">{travelDetails.destination}</span>.
              Each fits within your budget and offers a different travel style.
            </p>
          </div>

          {/* Itineraries Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {itineraries.map((itinerary) => (
              <div key={itinerary.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                {/* Header */}
                <div className={`p-6 ${
                  itinerary.id === 1 ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                  itinerary.id === 2 ? 'bg-gradient-to-r from-blue-500 to-indigo-600' :
                  'bg-gradient-to-r from-purple-500 to-pink-600'
                } text-white`}>
                  <h3 className="text-2xl font-bold mb-2">{itinerary.title}</h3>
                  <p className="text-sm opacity-90">{itinerary.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-3xl font-bold">${itinerary.totalCost.toLocaleString()}</span>
                      <span className="text-sm opacity-75 ml-2">total</span>
                    </div>
                    {itinerary.savings > 0 && (
                      <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                        <span className="text-sm font-medium">Save ${itinerary.savings}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Flight */}
                  <div>
                    <div className="flex items-center mb-3">
                      <Plane className="w-5 h-5 text-blue-600 mr-2" />
                      <h4 className="font-semibold text-gray-900">Flight</h4>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">{itinerary.flight.airline}</p>
                          <p className="text-sm text-gray-600">{itinerary.flight.duration} • {itinerary.flight.stops}</p>
                        </div>
                        <span className="font-bold text-blue-600">${itinerary.flight.price}</span>
                      </div>
                    </div>
                  </div>

                  {/* Hotel */}
                  <div>
                    <div className="flex items-center mb-3">
                      <Building className="w-5 h-5 text-purple-600 mr-2" />
                      <h4 className="font-semibold text-gray-900">Hotel</h4>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">{itinerary.hotel.name}</p>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                              {[...Array(Math.floor(itinerary.hotel.rating))].map((_, i) => (
                                <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                              ))}
                              <span className="text-sm text-gray-600 ml-1">{itinerary.hotel.rating}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{itinerary.hotel.location}</p>
                        </div>
                        <span className="font-bold text-purple-600">${itinerary.hotel.price}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {itinerary.hotel.amenities.slice(0, 3).map((amenity, i) => (
                          <span key={i} className="text-xs bg-white px-2 py-1 rounded text-gray-600">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Restaurants */}
                  <div>
                    <div className="flex items-center mb-3">
                      <UtensilsCrossed className="w-5 h-5 text-orange-600 mr-2" />
                      <h4 className="font-semibold text-gray-900">Top Restaurants</h4>
                    </div>
                    <div className="space-y-2">
                      {itinerary.restaurants.map((restaurant, i) => (
                        <div key={i} className="bg-gray-50 rounded-lg p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-sm">{restaurant.name}</p>
                              <p className="text-xs text-gray-600">{restaurant.cuisine} • {restaurant.priceRange}</p>
                              <p className="text-xs text-gray-500">{restaurant.specialty}</p>
                            </div>
                            <div className="flex items-center">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span className="text-xs text-gray-600 ml-1">{restaurant.rating}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Activities */}
                  <div>
                    <div className="flex items-center mb-3">
                      <Camera className="w-5 h-5 text-green-600 mr-2" />
                      <h4 className="font-semibold text-gray-900">Activities</h4>
                    </div>
                    <div className="space-y-2">
                      {itinerary.activities.map((activity, i) => (
                        <div key={i} className="bg-gray-50 rounded-lg p-3">
                          <div className="flex justify-between items-start mb-1">
                            <p className="font-medium text-sm">{activity.name}</p>
                            <span className="text-sm font-medium text-green-600">${activity.price}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-gray-600">
                            <span>{activity.type}</span>
                            <span>•</span>
                            <div className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {activity.duration}
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{activity.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Souvenirs */}
                  <div>
                    <div className="flex items-center mb-3">
                      <Gift className="w-5 h-5 text-pink-600 mr-2" />
                      <h4 className="font-semibold text-gray-900">Souvenirs</h4>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-sm">{itinerary.souvenirs.location}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {itinerary.souvenirs.items.map((item, i) => (
                              <span key={i} className="text-xs bg-white px-2 py-1 rounded text-gray-600">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                        <span className="font-bold text-pink-600">${itinerary.souvenirs.budget}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 bg-gray-50 border-t">
                  <button className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
                    itinerary.id === 1 ? 'bg-green-600 hover:bg-green-700 text-white' :
                    itinerary.id === 2 ? 'bg-blue-600 hover:bg-blue-700 text-white' :
                    'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}>
                    Choose This Itinerary
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Budget Summary */}
          <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Budget Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Category</th>
                    <th className="text-center py-3 px-4">Your Budget</th>
                    <th className="text-center py-3 px-4">Budget Explorer</th>
                    <th className="text-center py-3 px-4">Perfect Balance</th>
                    <th className="text-center py-3 px-4">Premium Experience</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Flight</td>
                    <td className="text-center py-3 px-4">${travelDetails.budgets.flight}</td>
                    <td className="text-center py-3 px-4">${itineraries[0].flight.price}</td>
                    <td className="text-center py-3 px-4">${itineraries[1].flight.price}</td>
                    <td className="text-center py-3 px-4">${itineraries[2].flight.price}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Hotel</td>
                    <td className="text-center py-3 px-4">${travelDetails.budgets.hotel}</td>
                    <td className="text-center py-3 px-4">${itineraries[0].hotel.price}</td>
                    <td className="text-center py-3 px-4">${itineraries[1].hotel.price}</td>
                    <td className="text-center py-3 px-4">${itineraries[2].hotel.price}</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="py-3 px-4 font-bold">Total Cost</td>
                    <td className="text-center py-3 px-4 font-bold">
                      ${Object.values(travelDetails.budgets).reduce((sum, budget) => sum + parseInt(budget), 0).toLocaleString()}
                    </td>
                    <td className="text-center py-3 px-4 font-bold text-green-600">
                      ${itineraries[0].totalCost.toLocaleString()}
                    </td>
                    <td className="text-center py-3 px-4 font-bold text-blue-600">
                      ${itineraries[1].totalCost.toLocaleString()}
                    </td>
                    <td className="text-center py-3 px-4 font-bold text-purple-600">
                      ${itineraries[2].totalCost.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryGenerator;