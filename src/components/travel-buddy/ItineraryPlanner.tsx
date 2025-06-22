import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Star, 
  DollarSign,
  Plus,
  Edit,
  Trash2,
  Check,
  Navigation,
  Camera,
  Utensils,
  Building,
  Car,
  Plane,
  Sun,
  Moon,
  Coffee,
  Download,
  Share
} from 'lucide-react';

interface ItineraryDay {
  date: Date;
  activities: ItineraryActivity[];
  totalCost: number;
  estimatedWalkingTime: number;
}

interface ItineraryActivity {
  id: string;
  time: string;
  title: string;
  type: 'attraction' | 'restaurant' | 'transport' | 'hotel' | 'activity' | 'shopping';
  location: string;
  duration: number; // in minutes
  cost: number;
  description: string;
  rating?: number;
  bookingRequired: boolean;
  tips: string[];
  coordinates?: { lat: number; lng: number };
}

interface ItineraryPlannerProps {
  destination: string;
  startDate: Date;
  endDate: Date;
  budget: number;
  activityTypes: string[];
  travelers: number;
}

const ItineraryPlanner: React.FC<ItineraryPlannerProps> = ({
  destination,
  startDate,
  endDate,
  budget,
  activityTypes,
  travelers
}) => {
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAddActivity, setShowAddActivity] = useState(false);

  const generateDetailedItinerary = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const days: ItineraryDay[] = [];
      const tripDuration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      
      for (let i = 0; i < tripDuration; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        
        const dayActivities = generateDayActivities(i + 1, currentDate);
        const totalCost = dayActivities.reduce((sum, activity) => sum + activity.cost, 0);
        const walkingTime = calculateWalkingTime(dayActivities);
        
        days.push({
          date: currentDate,
          activities: dayActivities,
          totalCost,
          estimatedWalkingTime: walkingTime
        });
      }
      
      setItinerary(days);
      setIsGenerating(false);
    }, 2000);
  };

  const generateDayActivities = (dayNumber: number, date: Date): ItineraryActivity[] => {
    const activities: ItineraryActivity[] = [];
    const isFirstDay = dayNumber === 1;
    const isLastDay = dayNumber === Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    // Morning activities
    if (isFirstDay) {
      activities.push({
        id: `${dayNumber}-arrival`,
        time: '10:00',
        title: 'Airport Arrival & Hotel Check-in',
        type: 'transport',
        location: `${destination} Airport`,
        duration: 120,
        cost: 0,
        description: 'Arrive at airport, collect luggage, and transfer to hotel',
        bookingRequired: false,
        tips: ['Keep important documents handy', 'Exchange currency if needed', 'Download offline maps']
      });
    } else {
      activities.push({
        id: `${dayNumber}-breakfast`,
        time: '08:30',
        title: 'Local Breakfast Experience',
        type: 'restaurant',
        location: 'Traditional Cafe',
        duration: 60,
        cost: 15 * travelers,
        description: 'Start your day with authentic local breakfast',
        rating: 4.5,
        bookingRequired: false,
        tips: ['Try the local specialty', 'Ask for recommendations from locals']
      });
    }

    // Main morning activity
    const morningActivity = generateActivityByType('morning', dayNumber);
    activities.push(morningActivity);

    // Lunch
    activities.push({
      id: `${dayNumber}-lunch`,
      time: '12:30',
      title: 'Lunch Break',
      type: 'restaurant',
      location: 'Local Restaurant',
      duration: 90,
      cost: 25 * travelers,
      description: 'Enjoy a delicious local lunch',
      rating: 4.3,
      bookingRequired: false,
      tips: ['Try regional specialties', 'Stay hydrated']
    });

    // Afternoon activity
    const afternoonActivity = generateActivityByType('afternoon', dayNumber);
    activities.push(afternoonActivity);

    // Evening activity
    if (!isLastDay) {
      const eveningActivity = generateActivityByType('evening', dayNumber);
      activities.push(eveningActivity);
    } else {
      activities.push({
        id: `${dayNumber}-departure`,
        time: '18:00',
        title: 'Departure Preparation',
        type: 'transport',
        location: 'Hotel',
        duration: 120,
        cost: 0,
        description: 'Pack and prepare for departure',
        bookingRequired: false,
        tips: ['Check flight times', 'Pack souvenirs carefully', 'Leave time for airport security']
      });
    }

    return activities;
  };

  const generateActivityByType = (timeOfDay: string, dayNumber: number): ItineraryActivity => {
    const activityTemplates = {
      morning: [
        {
          title: 'Historic City Walking Tour',
          type: 'attraction' as const,
          location: 'Historic District',
          duration: 180,
          cost: 20 * travelers,
          description: 'Explore the historic heart of the city with a knowledgeable guide',
          rating: 4.7,
          bookingRequired: true,
          tips: ['Wear comfortable walking shoes', 'Bring a camera', 'Listen to local stories']
        },
        {
          title: 'Main Museum Visit',
          type: 'attraction' as const,
          location: 'City Museum',
          duration: 150,
          cost: 15 * travelers,
          description: 'Discover the rich history and culture through fascinating exhibits',
          rating: 4.5,
          bookingRequired: false,
          tips: ['Get audio guide', 'Check for special exhibitions', 'Allow extra time']
        }
      ],
      afternoon: [
        {
          title: 'Local Market Exploration',
          type: 'shopping' as const,
          location: 'Central Market',
          duration: 120,
          cost: 30 * travelers,
          description: 'Browse local crafts, taste regional foods, and find unique souvenirs',
          rating: 4.4,
          bookingRequired: false,
          tips: ['Bargain respectfully', 'Try local snacks', 'Bring cash']
        },
        {
          title: 'Scenic Viewpoint Visit',
          type: 'attraction' as const,
          location: 'City Viewpoint',
          duration: 90,
          cost: 10 * travelers,
          description: 'Enjoy panoramic views of the city and surrounding landscape',
          rating: 4.8,
          bookingRequired: false,
          tips: ['Best light for photos', 'Check weather conditions', 'Bring layers']
        }
      ],
      evening: [
        {
          title: 'Traditional Dinner Experience',
          type: 'restaurant' as const,
          location: 'Traditional Restaurant',
          duration: 120,
          cost: 45 * travelers,
          description: 'Savor authentic local cuisine in a traditional setting',
          rating: 4.6,
          bookingRequired: true,
          tips: ['Make reservations', 'Try the tasting menu', 'Ask about wine pairings']
        },
        {
          title: 'Evening Cultural Show',
          type: 'activity' as const,
          location: 'Cultural Center',
          duration: 90,
          cost: 35 * travelers,
          description: 'Experience local music, dance, or theater performance',
          rating: 4.5,
          bookingRequired: true,
          tips: ['Book tickets in advance', 'Dress appropriately', 'Learn about the performance']
        }
      ]
    };

    const templates = activityTemplates[timeOfDay as keyof typeof activityTemplates];
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    const timeSlots = {
      morning: '09:30',
      afternoon: '14:30',
      evening: '19:00'
    };

    return {
      id: `${dayNumber}-${timeOfDay}`,
      time: timeSlots[timeOfDay as keyof typeof timeSlots],
      ...template
    };
  };

  const calculateWalkingTime = (activities: ItineraryActivity[]): number => {
    // Estimate walking time between activities (simplified)
    return activities.length * 15; // 15 minutes average between locations
  };

  const getActivityIcon = (type: string) => {
    const icons = {
      attraction: Camera,
      restaurant: Utensils,
      transport: Car,
      hotel: Building,
      activity: Star,
      shopping: MapPin
    };
    return icons[type as keyof typeof icons] || MapPin;
  };

  const getTimeIcon = (time: string) => {
    const hour = parseInt(time.split(':')[0]);
    if (hour < 12) return Sun;
    if (hour < 17) return Sun;
    return Moon;
  };

  const addCustomActivity = (dayIndex: number) => {
    // This would open a modal to add custom activity
    setShowAddActivity(true);
  };

  const exportItinerary = () => {
    // Generate downloadable itinerary
    const itineraryText = itinerary.map((day, index) => {
      const dayText = `Day ${index + 1} - ${day.date.toLocaleDateString()}\n` +
        day.activities.map(activity => 
          `${activity.time} - ${activity.title} (${activity.location}) - $${activity.cost}`
        ).join('\n') +
        `\nDaily Total: $${day.totalCost}\n\n`;
      return dayText;
    }).join('');

    const blob = new Blob([itineraryText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${destination}-itinerary.txt`;
    a.click();
  };

  React.useEffect(() => {
    generateDetailedItinerary();
  }, [destination, startDate, endDate]);

  if (isGenerating) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Creating Your Detailed Itinerary</h3>
        <p className="text-gray-600">Optimizing routes, checking opening hours, and finding the best experiences...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">📅 Detailed Itinerary</h3>
            <p className="opacity-90">{destination} • {itinerary.length} days</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">
              ${itinerary.reduce((sum, day) => sum + day.totalCost, 0)}
            </div>
            <div className="text-sm opacity-90">Total Cost</div>
          </div>
        </div>
      </div>

      {/* Day Selector */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex space-x-2 overflow-x-auto">
          {itinerary.map((day, index) => (
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
                  {day.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
                <div className="text-xs font-medium text-green-600">
                  ${day.totalCost}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Day Details */}
      {itinerary[selectedDay] && (
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-xl font-semibold text-gray-900">
                {itinerary[selectedDay].date.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h4>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{itinerary[selectedDay].estimatedWalkingTime} min walking</span>
                </div>
                <div className="flex items-center space-x-1">
                  <DollarSign className="w-4 h-4" />
                  <span>${itinerary[selectedDay].totalCost} total</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => addCustomActivity(selectedDay)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Activity</span>
            </button>
          </div>

          {/* Activities Timeline */}
          <div className="space-y-4">
            {itinerary[selectedDay].activities.map((activity, index) => {
              const ActivityIcon = getActivityIcon(activity.type);
              const TimeIcon = getTimeIcon(activity.time);
              
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="relative flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {/* Timeline Line */}
                  {index < itinerary[selectedDay].activities.length - 1 && (
                    <div className="absolute left-8 top-16 w-0.5 h-8 bg-gray-300" />
                  )}

                  {/* Time & Icon */}
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <TimeIcon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="text-sm font-medium text-gray-900">{activity.time}</div>
                  </div>

                  {/* Activity Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <ActivityIcon className="w-4 h-4 text-gray-600" />
                          <h5 className="font-semibold text-gray-900">{activity.title}</h5>
                          {activity.rating && (
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span className="text-xs text-gray-600">{activity.rating}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{activity.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{Math.floor(activity.duration / 60)}h {activity.duration % 60}m</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="w-3 h-3" />
                            <span>${activity.cost}</span>
                          </div>
                          {activity.bookingRequired && (
                            <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                              Booking Required
                            </span>
                          )}
                        </div>
                        
                        <p className="text-sm text-gray-700 mb-3">{activity.description}</p>
                        
                        {/* Tips */}
                        {activity.tips.length > 0 && (
                          <div className="bg-blue-50 border border-blue-200 rounded p-3">
                            <h6 className="text-xs font-medium text-blue-900 mb-1">💡 Tips:</h6>
                            <ul className="text-xs text-blue-800 space-y-1">
                              {activity.tips.map((tip, tipIndex) => (
                                <li key={tipIndex}>• {tip}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2 ml-4">
                        <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                          <Navigation className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Day Summary */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <h5 className="font-semibold text-gray-900 mb-2">Day Summary</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Activities:</span>
                <span className="font-medium ml-2">{itinerary[selectedDay].activities.length}</span>
              </div>
              <div>
                <span className="text-gray-600">Total Cost:</span>
                <span className="font-medium ml-2">${itinerary[selectedDay].totalCost}</span>
              </div>
              <div>
                <span className="text-gray-600">Walking Time:</span>
                <span className="font-medium ml-2">{itinerary[selectedDay].estimatedWalkingTime} min</span>
              </div>
              <div>
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium ml-2">
                  {Math.floor(itinerary[selectedDay].activities.reduce((sum, a) => sum + a.duration, 0) / 60)}h
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="border-t border-gray-200 p-4 bg-gray-50">
        <div className="flex space-x-3">
          <button
            onClick={exportItinerary}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export Itinerary</span>
          </button>
          <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
            <Share className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItineraryPlanner;