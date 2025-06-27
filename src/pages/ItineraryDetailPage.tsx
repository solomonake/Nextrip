import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  DollarSign, 
  Plane, 
  Building, 
  Utensils, 
  Camera,
  Car,
  Check,
  Download,
  Share,
  ChevronLeft,
  Printer,
  QrCode,
  Smartphone,
  Mail,
  ExternalLink,
  AlertTriangle,
  Info,
  Star,
  Heart,
  Bookmark
} from 'lucide-react';
import { format, addDays, differenceInDays } from 'date-fns';

interface ItineraryItem {
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
  confirmationCode?: string;
  provider?: string;
  notes?: string;
  rating?: number;
  image?: string;
}

interface Trip {
  id: string;
  title: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  travelers: number;
  budget: {
    total: number;
    spent: number;
  };
  itinerary: ItineraryItem[];
}

const ItineraryDetailPage: React.FC = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [selectedDay, setSelectedDay] = useState(0);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from an API or context
    // For demo purposes, we'll create a mock trip
    setTimeout(() => {
      const mockTrip = generateMockTrip(tripId || '1');
      setTrip(mockTrip);
      setIsLoading(false);
    }, 800);
  }, [tripId]);

  const generateMockTrip = (id: string): Trip => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 7); // Trip starts in a week
    
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 7); // 7-day trip
    
    const itinerary: ItineraryItem[] = [];
    
    // Generate itinerary items for each day
    for (let day = 0; day < 7; day++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + day);
      
      // Morning activity
      itinerary.push({
        id: `day${day}-morning`,
        type: 'activity',
        title: day === 0 ? 'Arrival & Hotel Check-in' : `Day ${day + 1} Morning Exploration`,
        description: day === 0 
          ? 'Arrive at the airport, collect luggage, and transfer to hotel' 
          : 'Explore the local neighborhood and enjoy the morning atmosphere',
        startTime: new Date(currentDate.setHours(day === 0 ? 14 : 9, 0, 0)),
        location: day === 0 ? 'Airport & Hotel' : 'Local Neighborhood',
        cost: day === 0 ? 50 : 0, // Airport transfer cost
        status: 'planned',
        notes: day === 0 ? 'Taxi from airport to hotel' : 'Walking tour, no reservation needed'
      });
      
      // Lunch
      itinerary.push({
        id: `day${day}-lunch`,
        type: 'restaurant',
        title: `Lunch at ${['Local Bistro', 'Seaside Restaurant', 'Traditional Café', 'Market Food Court', 'Gourmet Deli', 'Street Food Market', 'Rooftop Restaurant'][day]}`,
        description: 'Enjoy local cuisine for lunch',
        startTime: new Date(currentDate.setHours(13, 0, 0)),
        location: 'City Center',
        cost: 25,
        status: day < 2 ? 'booked' : 'planned',
        confirmationCode: day < 2 ? `LUN${100 + day}` : undefined,
        provider: day < 2 ? 'OpenTable' : undefined,
        rating: 4.5,
        image: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      });
      
      // Afternoon activity
      itinerary.push({
        id: `day${day}-afternoon`,
        type: 'activity',
        title: `Visit to ${['Museum of Modern Art', 'Historical Castle', 'Botanical Gardens', 'Local Market', 'Beach', 'Mountain Viewpoint', 'Cultural Center'][day]}`,
        description: 'Explore one of the city\'s main attractions',
        startTime: new Date(currentDate.setHours(15, 0, 0)),
        endTime: new Date(currentDate.setHours(18, 0, 0)),
        location: 'Tourist Area',
        cost: 20,
        status: day < 3 ? 'booked' : 'planned',
        confirmationCode: day < 3 ? `ACT${200 + day}` : undefined,
        provider: day < 3 ? 'Viator' : undefined,
        rating: 4.7,
        image: 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      });
      
      // Dinner
      itinerary.push({
        id: `day${day}-dinner`,
        type: 'restaurant',
        title: `Dinner at ${['Gourmet Restaurant', 'Local Tavern', 'Seafood Place', 'Steakhouse', 'Ethnic Restaurant', 'Fine Dining', 'Local Favorite'][day]}`,
        description: 'Enjoy dinner at a recommended restaurant',
        startTime: new Date(currentDate.setHours(20, 0, 0)),
        location: 'Dining District',
        cost: 40,
        status: day < 2 ? 'booked' : 'planned',
        confirmationCode: day < 2 ? `DIN${300 + day}` : undefined,
        provider: day < 2 ? 'OpenTable' : undefined,
        rating: 4.8,
        image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      });
      
      // Add hotel stay for each night except the last
      if (day < 6) {
        itinerary.push({
          id: `day${day}-hotel`,
          type: 'hotel',
          title: 'Overnight Stay',
          description: 'Accommodation at the Grand Hotel',
          startTime: new Date(currentDate.setHours(22, 0, 0)),
          endTime: new Date(new Date(currentDate).setHours(9, 0, 0)),
          location: 'Grand Hotel, City Center',
          cost: 150,
          status: 'booked',
          confirmationCode: 'HTL12345',
          provider: 'Booking.com',
          image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        });
      }
      
      // Add flight for first and last day
      if (day === 0) {
        itinerary.push({
          id: 'outbound-flight',
          type: 'flight',
          title: 'Outbound Flight',
          description: 'Flight from Home to Destination',
          startTime: new Date(currentDate.setHours(8, 30, 0)),
          endTime: new Date(currentDate.setHours(11, 45, 0)),
          location: 'Airport',
          cost: 350,
          status: 'booked',
          confirmationCode: 'FL987654',
          provider: 'Delta Airlines',
          notes: 'Terminal 2, Seat 14A',
          image: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        });
      } else if (day === 6) {
        const lastDay = new Date(endDate);
        itinerary.push({
          id: 'return-flight',
          type: 'flight',
          title: 'Return Flight',
          description: 'Flight from Destination to Home',
          startTime: new Date(lastDay.setHours(18, 15, 0)),
          endTime: new Date(lastDay.setHours(21, 30, 0)),
          location: 'Airport',
          cost: 380,
          status: 'booked',
          confirmationCode: 'FL123456',
          provider: 'Delta Airlines',
          notes: 'Terminal 3, Seat 22C',
          image: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        });
      }
    }
    
    return {
      id,
      title: 'European Adventure',
      destination: 'Paris, France',
      startDate,
      endDate,
      travelers: 2,
      budget: {
        total: 3000,
        spent: 2450
      },
      itinerary
    };
  };

  const getItemsForDay = (dayIndex: number) => {
    if (!trip) return [];
    
    const dayStart = new Date(trip.startDate);
    dayStart.setDate(dayStart.getDate() + dayIndex);
    dayStart.setHours(0, 0, 0, 0);
    
    const dayEnd = new Date(dayStart);
    dayEnd.setHours(23, 59, 59, 999);
    
    return trip.itinerary.filter(item => {
      const itemDate = new Date(item.startTime);
      return itemDate >= dayStart && itemDate <= dayEnd;
    }).sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  };

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'flight': return Plane;
      case 'hotel': return Building;
      case 'restaurant': return Utensils;
      case 'activity': return Camera;
      case 'transport': return Car;
      default: return Camera;
    }
  };

  const getItemColor = (type: string) => {
    switch (type) {
      case 'flight': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'hotel': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'restaurant': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'activity': return 'bg-green-100 text-green-700 border-green-200';
      case 'transport': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'booked': return 'bg-green-100 text-green-800 border-green-200';
      case 'planned': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleShareItinerary = (method: 'email' | 'print' | 'download' | 'qr' | 'phone') => {
    // In a real app, this would implement the actual sharing functionality
    console.log(`Sharing itinerary via ${method}`);
    setShowShareOptions(false);
    
    // Mock implementation
    if (method === 'print') {
      window.print();
    } else if (method === 'download') {
      alert('Itinerary would be downloaded as PDF');
    } else if (method === 'email') {
      alert('Email sharing dialog would open');
    } else if (method === 'qr') {
      alert('QR code would be displayed');
    } else if (method === 'phone') {
      alert('SMS sharing dialog would open');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900">Loading your itinerary...</h2>
        </div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Itinerary Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            We couldn't find the itinerary you're looking for. It may have been deleted or you might not have access to it.
          </p>
          <Link
            to="/my-trips"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to My Trips
          </Link>
        </div>
      </div>
    );
  }

  const tripDays = differenceInDays(trip.endDate, trip.startDate) + 1;
  const days = Array.from({ length: tripDays }, (_, i) => addDays(trip.startDate, i));
  const dayItems = getItemsForDay(selectedDay);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Back Button */}
        <div className="mb-8">
          <Link
            to="/my-trips"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to My Trips
          </Link>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{trip.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{trip.destination}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>
                    {format(trip.startDate, 'MMM d')} - {format(trip.endDate, 'MMM d, yyyy')}
                  </span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  <span>${trip.budget.spent} / ${trip.budget.total}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 lg:mt-0 flex flex-wrap gap-3">
              <button
                onClick={() => setShowShareOptions(!showShareOptions)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Share className="w-4 h-4" />
                <span>Share</span>
              </button>
              
              <button
                onClick={() => handleShareItinerary('download')}
                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
              
              <button
                onClick={() => handleShareItinerary('print')}
                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Share Options Dropdown */}
        {showShareOptions && (
          <div className="relative z-10 mb-6">
            <div className="absolute right-0 top-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
              <button
                onClick={() => handleShareItinerary('email')}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors flex items-center space-x-3"
              >
                <Mail className="w-4 h-4 text-gray-600" />
                <span>Share via Email</span>
              </button>
              <button
                onClick={() => handleShareItinerary('phone')}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors flex items-center space-x-3"
              >
                <Smartphone className="w-4 h-4 text-gray-600" />
                <span>Share via SMS</span>
              </button>
              <button
                onClick={() => handleShareItinerary('qr')}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors flex items-center space-x-3"
              >
                <QrCode className="w-4 h-4 text-gray-600" />
                <span>Generate QR Code</span>
              </button>
              <button
                onClick={() => handleShareItinerary('download')}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors flex items-center space-x-3"
              >
                <Download className="w-4 h-4 text-gray-600" />
                <span>Download PDF</span>
              </button>
              <button
                onClick={() => handleShareItinerary('print')}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors flex items-center space-x-3"
              >
                <Printer className="w-4 h-4 text-gray-600" />
                <span>Print Itinerary</span>
              </button>
            </div>
          </div>
        )}

        {/* Trip Overview Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Trip Overview</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Trip Details */}
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">Trip Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{tripDays} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Travelers:</span>
                    <span className="font-medium">{trip.travelers} people</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Budget:</span>
                    <span className="font-medium">${trip.budget.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Spent:</span>
                    <span className="font-medium">${trip.budget.spent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Remaining:</span>
                    <span className="font-medium">${trip.budget.total - trip.budget.spent}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Important Bookings */}
            <div className="space-y-4">
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="font-medium text-purple-900 mb-2">Important Bookings</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <Plane className="w-4 h-4 text-purple-700 mt-0.5" />
                    <div>
                      <div className="font-medium">Outbound Flight</div>
                      <div className="text-gray-600">
                        {format(trip.startDate, 'MMM d')} • FL987654
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Building className="w-4 h-4 text-purple-700 mt-0.5" />
                    <div>
                      <div className="font-medium">Hotel Reservation</div>
                      <div className="text-gray-600">
                        Grand Hotel • HTL12345
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Plane className="w-4 h-4 text-purple-700 mt-0.5" />
                    <div>
                      <div className="font-medium">Return Flight</div>
                      <div className="text-gray-600">
                        {format(trip.endDate, 'MMM d')} • FL123456
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Trip Stats */}
            <div className="space-y-4">
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-medium text-green-900 mb-2">Trip Statistics</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Activities:</span>
                    <span className="font-medium">{trip.itinerary.filter(i => i.type === 'activity').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Restaurants:</span>
                    <span className="font-medium">{trip.itinerary.filter(i => i.type === 'restaurant').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Flights:</span>
                    <span className="font-medium">{trip.itinerary.filter(i => i.type === 'flight').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hotel Nights:</span>
                    <span className="font-medium">{trip.itinerary.filter(i => i.type === 'hotel').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Booked Items:</span>
                    <span className="font-medium">{trip.itinerary.filter(i => i.status === 'booked').length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Day Selector */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Daily Itinerary</h2>
          
          <div className="flex space-x-2 overflow-x-auto pb-2 mb-6">
            {days.map((day, index) => (
              <button
                key={index}
                onClick={() => setSelectedDay(index)}
                className={`flex-shrink-0 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  selectedDay === index
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <div className="text-center">
                  <div className="font-semibold">Day {index + 1}</div>
                  <div className="text-xs opacity-75">
                    {format(day, 'EEE, MMM d')}
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          {/* Day Header */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Day {selectedDay + 1}: {format(days[selectedDay], 'EEEE, MMMM d, yyyy')}
            </h3>
            <p className="text-gray-600">
              {dayItems.length} activities planned
            </p>
          </div>
          
          {/* Day Itinerary */}
          <div className="space-y-6">
            {dayItems.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-gray-400" />
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">No activities planned</h4>
                <p className="text-gray-600 mb-4">There are no activities planned for this day yet.</p>
              </div>
            ) : (
              dayItems.map((item, index) => {
                const ItemIcon = getItemIcon(item.type);
                
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`border-2 rounded-xl overflow-hidden ${getItemColor(item.type)}`}
                  >
                    <div className="p-6">
                      {/* Item Header */}
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div className="flex items-center space-x-3 mb-3 md:mb-0">
                          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                            <ItemIcon className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold">{item.title}</h4>
                            <div className="flex items-center space-x-4 text-sm">
                              <div className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                <span>{format(new Date(item.startTime), 'h:mm a')}</span>
                                {item.endTime && (
                                  <>
                                    <span className="mx-1">-</span>
                                    <span>{format(new Date(item.endTime), 'h:mm a')}</span>
                                  </>
                                )}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="w-3 h-3 mr-1" />
                                <span>{item.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </span>
                          {item.cost > 0 && (
                            <span className="bg-white px-3 py-1 rounded-full text-xs font-medium border border-gray-200">
                              ${item.cost}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Item Details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Left Column - Description */}
                        <div className="md:col-span-2">
                          <p className="text-sm mb-4">{item.description}</p>
                          
                          {/* Booking Details */}
                          {item.status === 'booked' && (
                            <div className="bg-white bg-opacity-50 rounded-lg p-4 mb-4">
                              <h5 className="font-medium text-sm mb-2">Booking Details</h5>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                {item.confirmationCode && (
                                  <div>
                                    <span className="text-gray-600">Confirmation:</span>
                                    <span className="font-medium ml-2">{item.confirmationCode}</span>
                                  </div>
                                )}
                                {item.provider && (
                                  <div>
                                    <span className="text-gray-600">Provider:</span>
                                    <span className="font-medium ml-2">{item.provider}</span>
                                  </div>
                                )}
                                {item.type === 'flight' && (
                                  <>
                                    <div>
                                      <span className="text-gray-600">Flight:</span>
                                      <span className="font-medium ml-2">{item.confirmationCode}</span>
                                    </div>
                                    <div>
                                      <span className="text-gray-600">Airline:</span>
                                      <span className="font-medium ml-2">{item.provider}</span>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          )}
                          
                          {/* Notes */}
                          {item.notes && (
                            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                              <div className="flex items-start space-x-2">
                                <Info className="w-4 h-4 text-yellow-600 mt-0.5" />
                                <div>
                                  <h5 className="font-medium text-sm text-yellow-800 mb-1">Notes</h5>
                                  <p className="text-sm text-yellow-700">{item.notes}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* Right Column - Image & Actions */}
                        <div>
                          {item.image && (
                            <div className="mb-3 rounded-lg overflow-hidden">
                              <img 
                                src={item.image} 
                                alt={item.title} 
                                className="w-full h-32 object-cover"
                              />
                            </div>
                          )}
                          
                          {/* Rating */}
                          {item.rating && (
                            <div className="flex items-center mb-3">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-4 h-4 ${i < Math.floor(item.rating!) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-600 ml-2">{item.rating}</span>
                            </div>
                          )}
                          
                          {/* Action Buttons */}
                          <div className="flex flex-wrap gap-2">
                            {item.status === 'booked' && item.provider && (
                              <a
                                href="#"
                                className="text-blue-600 hover:text-blue-700 text-sm flex items-center space-x-1"
                                onClick={(e) => {
                                  e.preventDefault();
                                  alert(`This would open the booking on ${item.provider}`);
                                }}
                              >
                                <ExternalLink className="w-3 h-3" />
                                <span>View Booking</span>
                              </a>
                            )}
                            
                            <button className="text-gray-600 hover:text-red-600 text-sm flex items-center space-x-1">
                              <Heart className="w-3 h-3" />
                              <span>Save</span>
                            </button>
                            
                            <button className="text-gray-600 hover:text-blue-600 text-sm flex items-center space-x-1">
                              <Bookmark className="w-3 h-3" />
                              <span>Add to Favorites</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
        
        {/* Day Summary */}
        {dayItems.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Day {selectedDay + 1} Summary</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Activities Summary */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-3">Activities</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Activities:</span>
                    <span className="font-medium">{dayItems.filter(i => i.type === 'activity' || i.type === 'restaurant').length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Booked:</span>
                    <span className="font-medium">{dayItems.filter(i => i.status === 'booked').length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Planned:</span>
                    <span className="font-medium">{dayItems.filter(i => i.status === 'planned').length}</span>
                  </div>
                </div>
              </div>
              
              {/* Cost Summary */}
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-medium text-green-900 mb-3">Costs</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Day Total:</span>
                    <span className="font-medium">${dayItems.reduce((sum, item) => sum + item.cost, 0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Activities:</span>
                    <span className="font-medium">${dayItems.filter(i => i.type === 'activity').reduce((sum, item) => sum + item.cost, 0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Meals:</span>
                    <span className="font-medium">${dayItems.filter(i => i.type === 'restaurant').reduce((sum, item) => sum + item.cost, 0)}</span>
                  </div>
                </div>
              </div>
              
              {/* Schedule Summary */}
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="font-medium text-purple-900 mb-3">Schedule</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Start Time:</span>
                    <span className="font-medium">
                      {dayItems.length > 0 
                        ? format(new Date(dayItems[0].startTime), 'h:mm a') 
                        : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">End Time:</span>
                    <span className="font-medium">
                      {dayItems.length > 0 
                        ? format(new Date(dayItems[dayItems.length - 1].startTime), 'h:mm a')
                        : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">
                      {dayItems.length > 0 
                        ? `${Math.round((new Date(dayItems[dayItems.length - 1].startTime).getTime() - new Date(dayItems[0].startTime).getTime()) / (1000 * 60 * 60))} hours`
                        : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Important Notes */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Important Notes</h2>
          
          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-900 mb-1">Check Travel Documents</h4>
                  <p className="text-sm text-yellow-800">
                    Make sure your passport is valid for at least 6 months beyond your travel dates and check if you need any visas for your destination.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">Local Emergency Numbers</h4>
                  <p className="text-sm text-blue-800">
                    Police: 112 | Ambulance: 15 | Fire: 18 | Tourist Police: +33 1 53 71 53 71
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-900 mb-1">Travel Insurance</h4>
                  <p className="text-sm text-green-800">
                    Your travel insurance policy (TI-12345678) covers medical emergencies, trip cancellation, and lost luggage. Emergency contact: +1-800-123-4567.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryDetailPage;