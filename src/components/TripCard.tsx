import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Edit, Trash2, Eye } from 'lucide-react';

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

interface TripCardProps {
  trip: Trip;
  handleEditTrip: (tripId: string) => void;
  handleDeleteTrip: (tripId: string) => void;
}

export default function TripCard({ trip, handleEditTrip, handleDeleteTrip }: TripCardProps) {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Planned': return 'bg-blue-100 text-blue-800';
      case 'Booked': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-orange-100 text-orange-800';
      case 'Completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleViewItinerary = () => {
    navigate(`/itinerary/${trip.id}`);
  };

  const handleEdit = () => {
    handleEditTrip(trip.id.toString());
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${trip.name}"?`)) {
      handleDeleteTrip(trip.id.toString());
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      <div className="p-6 flex-1 flex flex-col">
        {/* Trip Header with Status Badge */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{trip.name}</h3>
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{trip.destination}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</span>
            </div>
            {trip.budget && (
              <div className="mt-2 text-sm text-gray-600">
                Budget: ${trip.budget.toLocaleString()}
              </div>
            )}
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(trip.status)}`}>
            {trip.status}
          </span>
        </div>

        {/* Spacer to push buttons to bottom */}
        <div className="flex-1"></div>

        {/* Action Buttons - Centered and Equal Width */}
        <div className="flex space-x-3 mt-6">
          <button 
            onClick={handleViewItinerary}
            className="flex-1 flex items-center justify-center space-x-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <Eye className="w-4 h-4" />
            <span>View Itinerary</span>
          </button>
          <button 
            onClick={handleEdit}
            className="flex-1 flex items-center justify-center space-x-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </button>
          <button 
            onClick={handleDelete}
            className="flex-1 flex items-center justify-center space-x-1 border border-red-300 text-red-600 py-3 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}