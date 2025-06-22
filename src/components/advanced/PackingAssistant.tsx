import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Check, 
  Plus, 
  Trash2, 
  Cloud, 
  Sun, 
  CloudRain,
  Snowflake,
  Shirt,
  Zap,
  Camera,
  Plane,
  MapPin,
  Calendar,
  Users,
  Download,
  Share
} from 'lucide-react';

interface PackingItem {
  id: string;
  name: string;
  category: 'clothing' | 'electronics' | 'toiletries' | 'documents' | 'accessories' | 'other';
  essential: boolean;
  packed: boolean;
  quantity: number;
  weatherDependent: boolean;
  activityDependent: boolean;
}

interface TripDetails {
  destination: string;
  startDate: Date;
  endDate: Date;
  travelers: number;
  activities: string[];
  weather: {
    avgTemp: number;
    conditions: 'sunny' | 'rainy' | 'cloudy' | 'snowy';
    precipitation: number;
  };
}

interface PackingAssistantProps {
  tripDetails: TripDetails;
}

const PackingAssistant: React.FC<PackingAssistantProps> = ({ tripDetails }) => {
  const [packingList, setPackingList] = useState<PackingItem[]>([]);
  const [customItem, setCustomItem] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isGenerating, setIsGenerating] = useState(true);

  const categories = [
    { id: 'all', label: 'All Items', icon: Package },
    { id: 'clothing', label: 'Clothing', icon: Shirt },
    { id: 'electronics', label: 'Electronics', icon: Zap },
    { id: 'toiletries', label: 'Toiletries', icon: Package },
    { id: 'documents', label: 'Documents', icon: Package },
    { id: 'accessories', label: 'Accessories', icon: Camera },
    { id: 'other', label: 'Other', icon: Package }
  ];

  useEffect(() => {
    generatePackingList();
  }, [tripDetails]);

  const generatePackingList = () => {
    setIsGenerating(true);
    
    // Simulate AI generation delay
    setTimeout(() => {
      const duration = Math.ceil((tripDetails.endDate.getTime() - tripDetails.startDate.getTime()) / (1000 * 60 * 60 * 24));
      const baseItems = generateBaseItems(duration);
      const weatherItems = generateWeatherItems(tripDetails.weather);
      const activityItems = generateActivityItems(tripDetails.activities);
      
      const allItems = [...baseItems, ...weatherItems, ...activityItems];
      setPackingList(allItems);
      setIsGenerating(false);
    }, 2000);
  };

  const generateBaseItems = (duration: number): PackingItem[] => {
    const baseItems = [
      // Documents
      { name: 'Passport', category: 'documents', essential: true, quantity: 1 },
      { name: 'Travel Insurance', category: 'documents', essential: true, quantity: 1 },
      { name: 'Flight Tickets', category: 'documents', essential: true, quantity: 1 },
      { name: 'Hotel Confirmations', category: 'documents', essential: true, quantity: 1 },
      
      // Electronics
      { name: 'Phone Charger', category: 'electronics', essential: true, quantity: 1 },
      { name: 'Power Bank', category: 'electronics', essential: false, quantity: 1 },
      { name: 'Camera', category: 'electronics', essential: false, quantity: 1 },
      { name: 'Universal Adapter', category: 'electronics', essential: true, quantity: 1 },
      
      // Toiletries
      { name: 'Toothbrush', category: 'toiletries', essential: true, quantity: 1 },
      { name: 'Toothpaste', category: 'toiletries', essential: true, quantity: 1 },
      { name: 'Shampoo', category: 'toiletries', essential: true, quantity: 1 },
      { name: 'Sunscreen', category: 'toiletries', essential: true, quantity: 1 },
      
      // Clothing (based on duration)
      { name: 'Underwear', category: 'clothing', essential: true, quantity: duration + 2 },
      { name: 'Socks', category: 'clothing', essential: true, quantity: duration + 1 },
      { name: 'T-shirts', category: 'clothing', essential: true, quantity: Math.ceil(duration / 2) },
      { name: 'Pants/Jeans', category: 'clothing', essential: true, quantity: Math.ceil(duration / 3) },
      { name: 'Comfortable Shoes', category: 'clothing', essential: true, quantity: 1 },
      
      // Accessories
      { name: 'Sunglasses', category: 'accessories', essential: false, quantity: 1 },
      { name: 'Watch', category: 'accessories', essential: false, quantity: 1 },
      { name: 'Wallet', category: 'accessories', essential: true, quantity: 1 }
    ];

    return baseItems.map((item, index) => ({
      id: `base-${index}`,
      ...item,
      packed: false,
      weatherDependent: false,
      activityDependent: false
    })) as PackingItem[];
  };

  const generateWeatherItems = (weather: TripDetails['weather']): PackingItem[] => {
    const weatherItems = [];

    if (weather.avgTemp < 10) {
      weatherItems.push(
        { name: 'Winter Coat', category: 'clothing', essential: true, quantity: 1 },
        { name: 'Warm Sweaters', category: 'clothing', essential: true, quantity: 2 },
        { name: 'Thermal Underwear', category: 'clothing', essential: true, quantity: 2 },
        { name: 'Winter Boots', category: 'clothing', essential: true, quantity: 1 },
        { name: 'Gloves', category: 'accessories', essential: true, quantity: 1 },
        { name: 'Winter Hat', category: 'accessories', essential: true, quantity: 1 }
      );
    } else if (weather.avgTemp > 25) {
      weatherItems.push(
        { name: 'Shorts', category: 'clothing', essential: true, quantity: 3 },
        { name: 'Tank Tops', category: 'clothing', essential: true, quantity: 3 },
        { name: 'Sandals', category: 'clothing', essential: false, quantity: 1 },
        { name: 'Sun Hat', category: 'accessories', essential: false, quantity: 1 },
        { name: 'Swimwear', category: 'clothing', essential: false, quantity: 1 }
      );
    }

    if (weather.conditions === 'rainy' || weather.precipitation > 50) {
      weatherItems.push(
        { name: 'Rain Jacket', category: 'clothing', essential: true, quantity: 1 },
        { name: 'Umbrella', category: 'accessories', essential: true, quantity: 1 },
        { name: 'Waterproof Shoes', category: 'clothing', essential: true, quantity: 1 }
      );
    }

    return weatherItems.map((item, index) => ({
      id: `weather-${index}`,
      ...item,
      packed: false,
      weatherDependent: true,
      activityDependent: false
    })) as PackingItem[];
  };

  const generateActivityItems = (activities: string[]): PackingItem[] => {
    const activityItems = [];

    if (activities.includes('hiking')) {
      activityItems.push(
        { name: 'Hiking Boots', category: 'clothing', essential: true, quantity: 1 },
        { name: 'Backpack', category: 'accessories', essential: true, quantity: 1 },
        { name: 'Water Bottle', category: 'accessories', essential: true, quantity: 1 },
        { name: 'First Aid Kit', category: 'other', essential: true, quantity: 1 }
      );
    }

    if (activities.includes('swimming') || activities.includes('beach')) {
      activityItems.push(
        { name: 'Swimsuit', category: 'clothing', essential: true, quantity: 2 },
        { name: 'Beach Towel', category: 'accessories', essential: true, quantity: 1 },
        { name: 'Flip Flops', category: 'clothing', essential: true, quantity: 1 }
      );
    }

    if (activities.includes('business')) {
      activityItems.push(
        { name: 'Business Suit', category: 'clothing', essential: true, quantity: 1 },
        { name: 'Dress Shoes', category: 'clothing', essential: true, quantity: 1 },
        { name: 'Laptop', category: 'electronics', essential: true, quantity: 1 },
        { name: 'Business Cards', category: 'documents', essential: false, quantity: 1 }
      );
    }

    if (activities.includes('photography')) {
      activityItems.push(
        { name: 'DSLR Camera', category: 'electronics', essential: false, quantity: 1 },
        { name: 'Extra Batteries', category: 'electronics', essential: false, quantity: 4 },
        { name: 'Memory Cards', category: 'electronics', essential: false, quantity: 2 },
        { name: 'Tripod', category: 'electronics', essential: false, quantity: 1 }
      );
    }

    return activityItems.map((item, index) => ({
      id: `activity-${index}`,
      ...item,
      packed: false,
      weatherDependent: false,
      activityDependent: true
    })) as PackingItem[];
  };

  const togglePacked = (itemId: string) => {
    setPackingList(prev => prev.map(item => 
      item.id === itemId ? { ...item, packed: !item.packed } : item
    ));
  };

  const addCustomItem = () => {
    if (customItem.trim()) {
      const newItem: PackingItem = {
        id: `custom-${Date.now()}`,
        name: customItem.trim(),
        category: 'other',
        essential: false,
        packed: false,
        quantity: 1,
        weatherDependent: false,
        activityDependent: false
      };
      setPackingList(prev => [...prev, newItem]);
      setCustomItem('');
    }
  };

  const removeItem = (itemId: string) => {
    setPackingList(prev => prev.filter(item => item.id !== itemId));
  };

  const getWeatherIcon = (conditions: string) => {
    switch (conditions) {
      case 'sunny': return Sun;
      case 'rainy': return CloudRain;
      case 'cloudy': return Cloud;
      case 'snowy': return Snowflake;
      default: return Cloud;
    }
  };

  const filteredItems = selectedCategory === 'all' 
    ? packingList 
    : packingList.filter(item => item.category === selectedCategory);

  const packedCount = packingList.filter(item => item.packed).length;
  const totalCount = packingList.length;
  const progressPercentage = totalCount > 0 ? (packedCount / totalCount) * 100 : 0;

  if (isGenerating) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-blue-600 animate-pulse" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Generating Your Packing List</h3>
          <p className="text-gray-600 mb-4">AI is analyzing your trip details...</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">Smart Packing Assistant</h3>
            <div className="flex items-center space-x-4 text-sm opacity-90">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{tripDetails.destination}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{Math.ceil((tripDetails.endDate.getTime() - tripDetails.startDate.getTime()) / (1000 * 60 * 60 * 24))} days</span>
              </div>
              <div className="flex items-center space-x-1">
                {React.createElement(getWeatherIcon(tripDetails.weather.conditions), { className: "w-4 h-4" })}
                <span>{tripDetails.weather.avgTemp}°C</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{packedCount}/{totalCount}</div>
            <div className="text-sm opacity-90">Items Packed</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-white/20 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
              className="bg-white h-2 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex space-x-2 overflow-x-auto">
          {categories.map((category) => {
            const Icon = category.icon;
            const count = category.id === 'all' 
              ? packingList.length 
              : packingList.filter(item => item.category === category.id).length;
            
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{category.label}</span>
                <span className="bg-white/50 px-1.5 py-0.5 rounded text-xs">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Add Custom Item */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={customItem}
            onChange={(e) => setCustomItem(e.target.value)}
            placeholder="Add custom item..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && addCustomItem()}
          />
          <button
            onClick={addCustomItem}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </div>

      {/* Packing List */}
      <div className="p-4">
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                item.packed 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-gray-50 border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => togglePacked(item.id)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    item.packed
                      ? 'bg-green-600 border-green-600 text-white'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {item.packed && <Check className="w-3 h-3" />}
                </button>
                
                <div>
                  <div className="flex items-center space-x-2">
                    <span className={`font-medium ${item.packed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                      {item.name}
                    </span>
                    {item.quantity > 1 && (
                      <span className="text-xs bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded">
                        x{item.quantity}
                      </span>
                    )}
                    {item.essential && (
                      <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
                        Essential
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-gray-500 capitalize">{item.category}</span>
                    {item.weatherDependent && (
                      <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">
                        Weather
                      </span>
                    )}
                    {item.activityDependent && (
                      <span className="text-xs bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded">
                        Activity
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {!item.essential && (
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex space-x-2">
          <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export List</span>
          </button>
          <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
            <Share className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PackingAssistant;