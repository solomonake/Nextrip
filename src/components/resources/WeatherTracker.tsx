import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Sun, CloudRain, Snowflake, Wind, Droplets, Eye, Thermometer, Compass, MapPin, Calendar, Clock, TrendingUp, TrendingDown, AlertTriangle, Umbrella, Shirt, Glasses as Sunglasses } from 'lucide-react';

interface WeatherData {
  location: string;
  country: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  visibility: number;
  uvIndex: number;
  pressure: number;
  sunrise: string;
  sunset: string;
  icon: string;
}

interface ForecastDay {
  date: Date;
  high: number;
  low: number;
  condition: string;
  icon: string;
  precipitation: number;
  windSpeed: number;
}

interface WeatherAlert {
  id: string;
  type: 'warning' | 'watch' | 'advisory';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  validUntil: Date;
}

const WeatherTracker: React.FC = () => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);
  const [selectedLocation, setSelectedLocation] = useState('Paris, France');
  const [isLoading, setIsLoading] = useState(true);
  const [unit, setUnit] = useState<'celsius' | 'fahrenheit'>('celsius');

  const locations = [
    'Paris, France',
    'Tokyo, Japan',
    'New York, USA',
    'London, UK',
    'Sydney, Australia',
    'Bangkok, Thailand',
    'Rome, Italy',
    'Barcelona, Spain',
    'Amsterdam, Netherlands',
    'Berlin, Germany'
  ];

  useEffect(() => {
    generateMockWeatherData();
  }, [selectedLocation]);

  const generateMockWeatherData = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      // Mock current weather
      const mockWeather: WeatherData = {
        location: selectedLocation.split(',')[0],
        country: selectedLocation.split(',')[1].trim(),
        temperature: Math.round(Math.random() * 30 + 5),
        feelsLike: Math.round(Math.random() * 30 + 5),
        condition: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Heavy Rain'][Math.floor(Math.random() * 5)],
        humidity: Math.round(Math.random() * 40 + 40),
        windSpeed: Math.round(Math.random() * 20 + 5),
        windDirection: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.floor(Math.random() * 8)],
        visibility: Math.round(Math.random() * 10 + 5),
        uvIndex: Math.round(Math.random() * 10),
        pressure: Math.round(Math.random() * 50 + 1000),
        sunrise: '06:30',
        sunset: '19:45',
        icon: '☀️'
      };

      // Mock 7-day forecast
      const mockForecast: ForecastDay[] = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        
        mockForecast.push({
          date,
          high: Math.round(Math.random() * 15 + mockWeather.temperature),
          low: Math.round(Math.random() * 10 + mockWeather.temperature - 10),
          condition: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain'][Math.floor(Math.random() * 4)],
          icon: ['☀️', '⛅', '☁️', '🌧️'][Math.floor(Math.random() * 4)],
          precipitation: Math.round(Math.random() * 80),
          windSpeed: Math.round(Math.random() * 15 + 5)
        });
      }

      // Mock weather alerts
      const mockAlerts: WeatherAlert[] = [
        {
          id: '1',
          type: 'warning',
          title: 'Heavy Rain Warning',
          description: 'Heavy rainfall expected in the next 6 hours. Potential for flooding in low-lying areas.',
          severity: 'medium',
          validUntil: new Date(Date.now() + 6 * 60 * 60 * 1000)
        }
      ];

      setCurrentWeather(mockWeather);
      setForecast(mockForecast);
      setAlerts(mockAlerts);
      setIsLoading(false);
    }, 1000);
  };

  const convertTemperature = (temp: number) => {
    if (unit === 'fahrenheit') {
      return Math.round((temp * 9/5) + 32);
    }
    return temp;
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny': return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'partly cloudy': return <Cloud className="w-8 h-8 text-gray-400" />;
      case 'cloudy': return <Cloud className="w-8 h-8 text-gray-500" />;
      case 'light rain': return <CloudRain className="w-8 h-8 text-blue-500" />;
      case 'heavy rain': return <CloudRain className="w-8 h-8 text-blue-600" />;
      case 'snow': return <Snowflake className="w-8 h-8 text-blue-300" />;
      default: return <Sun className="w-8 h-8 text-yellow-500" />;
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getClothingRecommendation = (temp: number, condition: string) => {
    if (temp < 5) return { icon: '🧥', text: 'Heavy coat, gloves, warm layers' };
    if (temp < 15) return { icon: '🧥', text: 'Jacket or sweater recommended' };
    if (temp < 25) return { icon: '👕', text: 'Light jacket or long sleeves' };
    return { icon: '👕', text: 'T-shirt, shorts, light clothing' };
  };

  const getActivityRecommendation = (condition: string, temp: number) => {
    if (condition.toLowerCase().includes('rain')) {
      return { icon: '🏛️', text: 'Indoor activities recommended' };
    }
    if (condition.toLowerCase().includes('sunny') && temp > 25) {
      return { icon: '🏊', text: 'Great day for water activities' };
    }
    if (condition.toLowerCase().includes('cloudy')) {
      return { icon: '🚶', text: 'Good conditions for sightseeing' };
    }
    return { icon: '🥾', text: 'Perfect weather for outdoor activities' };
  };

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center h-[600px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading weather data...</p>
        </div>
      </div>
    );
  }

  if (!currentWeather) return null;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Cloud className="w-6 h-6 text-blue-600" />
          <div>
            <h2 className="text-xl font-bold text-gray-900">Weather Tracker</h2>
            <p className="text-sm text-gray-600">Real-time weather and forecasts</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setUnit('celsius')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              unit === 'celsius'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            °C
          </button>
          <button
            onClick={() => setUnit('fahrenheit')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              unit === 'fahrenheit'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            °F
          </button>
        </div>
      </div>

      {/* Location Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <MapPin className="w-4 h-4 inline mr-1" />
          Location
        </label>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {locations.map(location => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Current Weather */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Weather Card */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-1">{currentWeather.location}</h3>
                <p className="text-white text-opacity-90 mb-4">{currentWeather.country}</p>
                <div className="flex items-center space-x-2">
                  <div className="text-6xl font-bold">{convertTemperature(currentWeather.temperature)}°</div>
                  <div>
                    <div className="text-xl">{currentWeather.condition}</div>
                    <div className="text-white text-opacity-90">
                      Feels like {convertTemperature(currentWeather.feelsLike)}°
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-6xl">{currentWeather.icon}</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <Wind className="w-4 h-4" />
                  <span className="font-medium">{currentWeather.windSpeed} km/h</span>
                </div>
                <div className="text-xs text-white text-opacity-80">Wind</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <Droplets className="w-4 h-4" />
                  <span className="font-medium">{currentWeather.humidity}%</span>
                </div>
                <div className="text-xs text-white text-opacity-80">Humidity</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <Eye className="w-4 h-4" />
                  <span className="font-medium">{currentWeather.visibility} km</span>
                </div>
                <div className="text-xs text-white text-opacity-80">Visibility</div>
              </div>
            </div>
          </div>

          {/* Weather Alerts */}
          {alerts.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
                Weather Alerts
              </h3>
              
              {alerts.map(alert => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg border ${getAlertColor(alert.severity)}`}
                >
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">{alert.title}</h4>
                      <p className="text-sm mt-1">{alert.description}</p>
                      <div className="text-xs mt-2">
                        Valid until: {alert.validUntil.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* 7-Day Forecast */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              7-Day Forecast
            </h3>
            <div className="space-y-4">
              {forecast.map((day, index) => (
                <div 
                  key={index} 
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    index === 0 ? 'bg-blue-50' : 'hover:bg-gray-50'
                  } transition-colors`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 text-center">
                      <div className="text-sm font-medium text-gray-900">
                        {day.date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className="text-xs text-gray-500">
                        {day.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                    <div className="text-2xl">{day.icon}</div>
                    <div className="text-sm">{day.condition}</div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <CloudRain className="w-3 h-3 text-blue-500" />
                      <span>{day.precipitation}%</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Wind className="w-3 h-3 text-gray-500" />
                      <span>{day.windSpeed} km/h</span>
                    </div>
                    <div className="w-20 text-right">
                      <span className="font-medium text-gray-900">{convertTemperature(day.high)}°</span>
                      <span className="text-gray-500 mx-1">/</span>
                      <span className="text-gray-500">{convertTemperature(day.low)}°</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Today's Details */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Thermometer className="w-5 h-5 mr-2" />
              Today's Details
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Feels Like</span>
                <span className="font-medium text-gray-900">{convertTemperature(currentWeather.feelsLike)}°</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Humidity</span>
                <span className="font-medium text-gray-900">{currentWeather.humidity}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Wind</span>
                <span className="font-medium text-gray-900">{currentWeather.windSpeed} km/h {currentWeather.windDirection}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Visibility</span>
                <span className="font-medium text-gray-900">{currentWeather.visibility} km</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">UV Index</span>
                <span className="font-medium text-gray-900">{currentWeather.uvIndex}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Pressure</span>
                <span className="font-medium text-gray-900">{currentWeather.pressure} hPa</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Sunrise</span>
                <span className="font-medium text-gray-900">{currentWeather.sunrise}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Sunset</span>
                <span className="font-medium text-gray-900">{currentWeather.sunset}</span>
              </div>
            </div>
          </div>

          {/* Travel Recommendations */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Umbrella className="w-5 h-5 mr-2" />
              Travel Recommendations
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <Shirt className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Clothing</h4>
                  <p className="text-sm text-gray-600">
                    {getClothingRecommendation(currentWeather.temperature, currentWeather.condition).text}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <Sunglasses className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Activities</h4>
                  <p className="text-sm text-gray-600">
                    {getActivityRecommendation(currentWeather.condition, currentWeather.temperature).text}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <Umbrella className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Precautions</h4>
                  <p className="text-sm text-gray-600">
                    {currentWeather.condition.toLowerCase().includes('rain') 
                      ? 'Bring an umbrella or raincoat' 
                      : currentWeather.temperature > 25 
                        ? 'Apply sunscreen and stay hydrated' 
                        : 'No special precautions needed'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Last Updated */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm">
                Last updated: {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherTracker;