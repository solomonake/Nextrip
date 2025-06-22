import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Clock, 
  MapPin, 
  Plane, 
  Building, 
  Utensils, 
  Camera,
  Car,
  Edit,
  Trash2,
  Check,
  Calendar
} from 'lucide-react';
import { Trip, ItineraryItem } from '../../contexts/TripContext';
import { useTrip } from '../../contexts/TripContext';
import { format, addDays, differenceInDays } from 'date-fns';

interface ItineraryTimelineProps {
  trip: Trip;
}

const ItineraryTimeline: React.FC<ItineraryTimelineProps> = ({ trip }) => {
  const { addItineraryItem, updateItineraryItem } = useTrip();
  const [selectedDay, setSelectedDay] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);

  // Validate dates before using them
  const isValidDate = (date: Date): boolean => {
    return date instanceof Date && !isNaN(date.getTime());
  };

  if (!isValidDate(trip.startDate) || !isValidDate(trip.endDate)) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-8 h-8 text-red-500" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Invalid Trip Dates</h3>
        <p className="text-gray-600">
          This trip has invalid dates. Please edit the trip to set valid start and end dates.
        </p>
      </div>
    );
  }

  const tripDays = differenceInDays(trip.endDate, trip.startDate) + 1;
  const days = Array.from({ length: tripDays }, (_, i) => addDays(trip.startDate, i));

  const getItemsForDay = (dayIndex: number) => {
    const dayStart = addDays(trip.startDate, dayIndex);
    const dayEnd = addDays(dayStart, 1);
    
    return trip.itinerary.filter(item => {
      const itemDate = new Date(item.startTime);
      return isValidDate(itemDate) && itemDate >= dayStart && itemDate < dayEnd;
    }).sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  };

  const getItemIcon = (type: string) => {
    const icons = {
      flight: Plane,
      hotel: Building,
      restaurant: Utensils,
      activity: Camera,
      transport: Car
    };
    return icons[type as keyof typeof icons] || Camera;
  };

  const getItemColor = (type: string) => {
    const colors = {
      flight: 'bg-blue-100 text-blue-700 border-blue-200',
      hotel: 'bg-purple-100 text-purple-700 border-purple-200',
      restaurant: 'bg-orange-100 text-orange-700 border-orange-200',
      activity: 'bg-green-100 text-green-700 border-green-200',
      transport: 'bg-gray-100 text-gray-700 border-gray-200'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const handleAddItem = (dayIndex: number) => {
    const newItem: ItineraryItem = {
      id: Date.now().toString(),
      type: 'activity',
      title: 'New Activity',
      description: 'Add details about this activity',
      startTime: addDays(trip.startDate, dayIndex),
      location: trip.destination,
      cost: 0,
      status: 'planned'
    };
    
    addItineraryItem(newItem);
  };

  const toggleItemStatus = (item: ItineraryItem) => {
    const newStatus = item.status === 'completed' ? 'planned' : 'completed';
    updateItineraryItem(item.id, { status: newStatus });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Day Selector */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {days.map((day, index) => (
            <button
              key={index}
              onClick={() => setSelectedDay(index)}
              className={`flex-shrink-0 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                selectedDay === index
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="text-center">
                <div className="font-semibold">Day {index + 1}</div>
                <div className="text-xs opacity-75">
                  {format(day, 'MMM d')}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Content */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            {format(days[selectedDay], 'EEEE, MMMM d, yyyy')}
          </h3>
          <button
            onClick={() => handleAddItem(selectedDay)}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Add Item</span>
          </button>
        </div>

        {/* Timeline Items */}
        <div className="space-y-4">
          {getItemsForDay(selectedDay).length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">No plans for this day</h4>
              <p className="text-gray-600 mb-4">Start building your itinerary by adding activities</p>
              <button
                onClick={() => handleAddItem(selectedDay)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                Add First Item
              </button>
            </div>
          ) : (
            getItemsForDay(selectedDay).map((item, index) => {
              const Icon = getItemIcon(item.type);
              const colorClass = getItemColor(item.type);
              const itemDate = new Date(item.startTime);
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`relative flex items-start space-x-4 p-4 rounded-lg border-2 ${colorClass} ${
                    item.status === 'completed' ? 'opacity-75' : ''
                  }`}
                >
                  {/* Timeline Line */}
                  {index < getItemsForDay(selectedDay).length - 1 && (
                    <div className="absolute left-8 top-16 w-0.5 h-8 bg-gray-300" />
                  )}

                  {/* Icon */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    item.status === 'completed' ? 'bg-green-500' : 'bg-white'
                  }`}>
                    {item.status === 'completed' ? (
                      <Check className="w-4 h-4 text-white" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className={`font-medium ${item.status === 'completed' ? 'line-through' : ''}`}>
                          {item.title}
                        </h4>
                        <p className="text-sm opacity-75 mt-1">{item.description}</p>
                        
                        <div className="flex items-center space-x-4 mt-2 text-xs opacity-75">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>
                              {isValidDate(itemDate) ? format(itemDate, 'HH:mm') : 'Invalid time'}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{item.location}</span>
                          </div>
                          {item.cost > 0 && (
                            <div className="flex items-center space-x-1">
                              <span>${item.cost}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => toggleItemStatus(item)}
                          className={`p-1 rounded transition-colors ${
                            item.status === 'completed'
                              ? 'text-green-600 hover:text-green-700'
                              : 'text-gray-400 hover:text-gray-600'
                          }`}
                        >
                          <Check className="w-4 h-4" />
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
            })
          )}
        </div>

        {/* Day Summary */}
        {getItemsForDay(selectedDay).length > 0 && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Day {selectedDay + 1} Summary</span>
              <div className="flex space-x-4">
                <span className="text-gray-600">
                  {getItemsForDay(selectedDay).length} activities
                </span>
                <span className="text-gray-600">
                  ${getItemsForDay(selectedDay).reduce((sum, item) => sum + item.cost, 0)} total cost
                </span>
                <span className="text-green-600">
                  {getItemsForDay(selectedDay).filter(item => item.status === 'completed').length} completed
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItineraryTimeline;