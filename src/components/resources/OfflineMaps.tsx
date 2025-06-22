import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Map, 
  Download, 
  Trash2, 
  WifiOff, 
  MapPin,
  Navigation,
  Search,
  Compass,
  MoreHorizontal,
  Check,
  X,
  Info,
  Clock,
  HardDrive,
  Layers,
  Route,
  Locate,
  Star,
  Bookmark,
  Wifi
} from 'lucide-react';

interface MapRegion {
  id: string;
  name: string;
  country: string;
  size: string;
  downloadStatus: 'available' | 'downloading' | 'downloaded';
  downloadProgress?: number;
  lastUpdated?: Date;
  thumbnail: string;
  isPopular: boolean;
}

interface DownloadedMap {
  id: string;
  name: string;
  country: string;
  size: string;
  downloadDate: Date;
  expiryDate: Date;
  thumbnail: string;
}

const OfflineMaps: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'browse' | 'downloaded'>('browse');
  const [availableMaps, setAvailableMaps] = useState<MapRegion[]>([]);
  const [downloadedMaps, setDownloadedMaps] = useState<DownloadedMap[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [storageUsed, setStorageUsed] = useState(0);
  const [storageTotal, setStorageTotal] = useState(1000);

  useEffect(() => {
    generateMockMapData();
  }, []);

  const generateMockMapData = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      // Generate available maps
      const mockAvailableMaps: MapRegion[] = [
        {
          id: '1',
          name: 'Paris',
          country: 'France',
          size: '45 MB',
          downloadStatus: 'available',
          thumbnail: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=300&h=200&fit=crop',
          isPopular: true
        },
        {
          id: '2',
          name: 'Tokyo',
          country: 'Japan',
          size: '78 MB',
          downloadStatus: 'available',
          thumbnail: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300&h=200&fit=crop',
          isPopular: true
        },
        {
          id: '3',
          name: 'Rome',
          country: 'Italy',
          size: '52 MB',
          downloadStatus: 'downloading',
          downloadProgress: 65,
          thumbnail: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=300&h=200&fit=crop',
          isPopular: true
        },
        {
          id: '4',
          name: 'Barcelona',
          country: 'Spain',
          size: '38 MB',
          downloadStatus: 'downloaded',
          lastUpdated: new Date('2024-03-01'),
          thumbnail: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=300&h=200&fit=crop',
          isPopular: false
        },
        {
          id: '5',
          name: 'London',
          country: 'United Kingdom',
          size: '67 MB',
          downloadStatus: 'available',
          thumbnail: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=300&h=200&fit=crop',
          isPopular: true
        },
        {
          id: '6',
          name: 'New York',
          country: 'United States',
          size: '82 MB',
          downloadStatus: 'available',
          thumbnail: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=300&h=200&fit=crop',
          isPopular: true
        },
        {
          id: '7',
          name: 'Bangkok',
          country: 'Thailand',
          size: '41 MB',
          downloadStatus: 'available',
          thumbnail: 'https://images.unsplash.com/photo-1508009603885-50cf7c8dd0d5?w=300&h=200&fit=crop',
          isPopular: false
        },
        {
          id: '8',
          name: 'Amsterdam',
          country: 'Netherlands',
          size: '35 MB',
          downloadStatus: 'available',
          thumbnail: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=300&h=200&fit=crop',
          isPopular: false
        }
      ];

      // Generate downloaded maps
      const mockDownloadedMaps: DownloadedMap[] = [
        {
          id: '4',
          name: 'Barcelona',
          country: 'Spain',
          size: '38 MB',
          downloadDate: new Date('2024-03-01'),
          expiryDate: new Date('2024-06-01'),
          thumbnail: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=300&h=200&fit=crop'
        },
        {
          id: '9',
          name: 'Kyoto',
          country: 'Japan',
          size: '42 MB',
          downloadDate: new Date('2024-02-15'),
          expiryDate: new Date('2024-05-15'),
          thumbnail: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&h=200&fit=crop'
        }
      ];

      // Calculate storage used
      const totalDownloaded = mockDownloadedMaps.reduce((total, map) => {
        return total + parseInt(map.size);
      }, 0);
      
      setAvailableMaps(mockAvailableMaps);
      setDownloadedMaps(mockDownloadedMaps);
      setStorageUsed(totalDownloaded);
      setIsLoading(false);
    }, 1000);
  };

  const startDownload = (mapId: string) => {
    setAvailableMaps(maps => maps.map(map => 
      map.id === mapId ? { ...map, downloadStatus: 'downloading', downloadProgress: 0 } : map
    ));

    // Simulate download progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setAvailableMaps(maps => maps.map(map => 
        map.id === mapId ? { ...map, downloadProgress: progress } : map
      ));

      if (progress >= 100) {
        clearInterval(interval);
        setAvailableMaps(maps => maps.map(map => 
          map.id === mapId ? { ...map, downloadStatus: 'downloaded', lastUpdated: new Date() } : map
        ));

        // Add to downloaded maps
        const mapToAdd = availableMaps.find(map => map.id === mapId);
        if (mapToAdd) {
          const expiryDate = new Date();
          expiryDate.setMonth(expiryDate.getMonth() + 3); // Expires in 3 months
          
          const downloadedMap: DownloadedMap = {
            id: mapToAdd.id,
            name: mapToAdd.name,
            country: mapToAdd.country,
            size: mapToAdd.size,
            downloadDate: new Date(),
            expiryDate,
            thumbnail: mapToAdd.thumbnail
          };
          
          setDownloadedMaps([...downloadedMaps, downloadedMap]);
          setStorageUsed(prev => prev + parseInt(mapToAdd.size));
        }
      }
    }, 300);
  };

  const deleteMap = (mapId: string) => {
    const mapToDelete = downloadedMaps.find(map => map.id === mapId);
    if (mapToDelete) {
      setDownloadedMaps(downloadedMaps.filter(map => map.id !== mapId));
      setStorageUsed(prev => prev - parseInt(mapToDelete.size));
      
      // Update available maps status
      setAvailableMaps(maps => maps.map(map => 
        map.id === mapId ? { ...map, downloadStatus: 'available' } : map
      ));
    }
  };

  const filteredMaps = availableMaps.filter(map => 
    map.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    map.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const popularMaps = filteredMaps.filter(map => map.isPopular);

  const getStoragePercentage = () => {
    return (storageUsed / storageTotal) * 100;
  };

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center h-[600px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading map data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Map className="w-6 h-6 text-indigo-600" />
          <div>
            <h2 className="text-xl font-bold text-gray-900">Offline Maps</h2>
            <p className="text-sm text-gray-600">Download maps for offline navigation</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('browse')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'browse'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Browse
          </button>
          <button
            onClick={() => setActiveTab('downloaded')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
              activeTab === 'downloaded'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <WifiOff className="w-4 h-4" />
            <span>Downloaded</span>
            {downloadedMaps.length > 0 && (
              <span className="bg-white bg-opacity-20 px-1.5 py-0.5 rounded-full text-xs">
                {downloadedMaps.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Storage Usage */}
      <div className="mb-6 bg-white rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-900 flex items-center">
            <HardDrive className="w-5 h-5 mr-2 text-indigo-600" />
            Storage Usage
          </h3>
          <span className="text-sm text-gray-600">
            {storageUsed} MB of {storageTotal} MB used
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 rounded-full"
            style={{ width: `${getStoragePercentage()}%` }}
          />
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a city or country..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      {/* Browse Maps Tab */}
      {activeTab === 'browse' && (
        <div className="space-y-8">
          {/* Popular Destinations */}
          {popularMaps.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-500" />
                Popular Destinations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {popularMaps.map((map) => (
                  <div
                    key={map.id}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-40">
                      <img
                        src={map.thumbnail}
                        alt={map.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 text-white">
                        <h4 className="font-bold text-lg">{map.name}</h4>
                        <p className="text-sm text-white/90">{map.country}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          Size: {map.size}
                        </div>
                        {map.downloadStatus === 'available' ? (
                          <button
                            onClick={() => startDownload(map.id)}
                            className="flex items-center space-x-1 bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700 transition-colors text-sm"
                          >
                            <Download className="w-3 h-3" />
                            <span>Download</span>
                          </button>
                        ) : map.downloadStatus === 'downloading' ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-indigo-600 rounded-full"
                                style={{ width: `${map.downloadProgress}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-600">{map.downloadProgress}%</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-1 text-green-600 text-sm">
                            <Check className="w-3 h-3" />
                            <span>Downloaded</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Available Maps */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-indigo-600" />
              All Available Maps
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMaps.map((map) => (
                <div
                  key={map.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-40">
                    <img
                      src={map.thumbnail}
                      alt={map.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 text-white">
                      <h4 className="font-bold text-lg">{map.name}</h4>
                      <p className="text-sm text-white/90">{map.country}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        Size: {map.size}
                      </div>
                      {map.downloadStatus === 'available' ? (
                        <button
                          onClick={() => startDownload(map.id)}
                          className="flex items-center space-x-1 bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700 transition-colors text-sm"
                        >
                          <Download className="w-3 h-3" />
                          <span>Download</span>
                        </button>
                      ) : map.downloadStatus === 'downloading' ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-indigo-600 rounded-full"
                              style={{ width: `${map.downloadProgress}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-600">{map.downloadProgress}%</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1 text-green-600 text-sm">
                          <Check className="w-3 h-3" />
                          <span>Downloaded</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Downloaded Maps Tab */}
      {activeTab === 'downloaded' && (
        <div>
          {downloadedMaps.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <WifiOff className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No downloaded maps</h3>
              <p className="text-gray-600 mb-6">
                Download maps to use them without an internet connection.
              </p>
              <button
                onClick={() => setActiveTab('browse')}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Browse Maps
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-200">
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-indigo-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Offline Maps Ready</h4>
                    <p className="text-sm text-gray-600">
                      {downloadedMaps.length} maps are available for offline use. Maps expire after 3 months and need to be updated.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {downloadedMaps.map((map) => (
                  <motion.div
                    key={map.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 h-40 md:h-auto relative">
                        <img
                          src={map.thumbnail}
                          alt={map.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <div className="bg-green-600 text-white px-2 py-1 rounded-lg text-xs font-medium flex items-center space-x-1">
                            <WifiOff className="w-3 h-3" />
                            <span>Offline</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-bold text-lg text-gray-900">{map.name}</h4>
                            <p className="text-gray-600">{map.country}</p>
                            
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                              <div className="flex items-center space-x-1">
                                <HardDrive className="w-3 h-3" />
                                <span>{map.size}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>Downloaded {map.downloadDate.toLocaleDateString()}</span>
                              </div>
                            </div>
                            
                            <div className="mt-2 text-sm text-orange-600 flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>Expires {map.expiryDate.toLocaleDateString()}</span>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <button
                              onClick={() => deleteMap(map.id)}
                              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                              <MoreHorizontal className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="flex space-x-3 mt-4">
                          <button className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2">
                            <Navigation className="w-4 h-4" />
                            <span>Open Map</span>
                          </button>
                          <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                            <Route className="w-4 h-4" />
                            <span>Directions</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Bottom Tips */}
      <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
          <Compass className="w-5 h-5 mr-2 text-indigo-600" />
          Offline Maps Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <Download className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Download Before Travel</h4>
              <p className="text-sm text-gray-600">
                Download maps while on WiFi to save data and ensure availability.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <Layers className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Save Storage Space</h4>
              <p className="text-sm text-gray-600">
                Download only the specific regions you need for your trip.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <Locate className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">GPS Works Offline</h4>
              <p className="text-sm text-gray-600">
                Your location will still work without internet connection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfflineMaps;