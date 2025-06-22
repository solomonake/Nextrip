import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  AlertTriangle, 
  Shield, 
  Heart, 
  Flame,
  MapPin,
  Globe,
  Clock,
  Copy,
  ExternalLink,
  Download,
  Star,
  Plus,
  X,
  Check,
  Info,
  Building,
  Stethoscope,
  Siren
} from 'lucide-react';

interface EmergencyNumber {
  id: string;
  type: 'police' | 'ambulance' | 'fire' | 'general';
  number: string;
  description: string;
  icon: React.ElementType;
}

interface EmergencyContact {
  id: string;
  name: string;
  type: 'embassy' | 'hospital' | 'pharmacy' | 'insurance' | 'custom';
  phone: string;
  address?: string;
  website?: string;
  hours?: string;
  notes?: string;
  isFavorite: boolean;
}

interface Country {
  name: string;
  code: string;
  flag: string;
}

const EmergencyContacts: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState('France');
  const [emergencyNumbers, setEmergencyNumbers] = useState<EmergencyNumber[]>([]);
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContact, setNewContact] = useState<Partial<EmergencyContact>>({
    name: '',
    type: 'custom',
    phone: '',
    isFavorite: false
  });

  const countries: Country[] = [
    { name: 'France', code: 'FR', flag: '🇫🇷' },
    { name: 'Japan', code: 'JP', flag: '🇯🇵' },
    { name: 'United States', code: 'US', flag: '🇺🇸' },
    { name: 'United Kingdom', code: 'GB', flag: '🇬🇧' },
    { name: 'Australia', code: 'AU', flag: '🇦🇺' },
    { name: 'Thailand', code: 'TH', flag: '🇹🇭' },
    { name: 'Italy', code: 'IT', flag: '🇮🇹' },
    { name: 'Spain', code: 'ES', flag: '🇪🇸' },
    { name: 'Germany', code: 'DE', flag: '🇩🇪' },
    { name: 'Canada', code: 'CA', flag: '🇨🇦' }
  ];

  useEffect(() => {
    generateMockEmergencyData();
  }, [selectedCountry]);

  const generateMockEmergencyData = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      // Generate emergency numbers based on country
      const numbers: EmergencyNumber[] = [];
      
      if (selectedCountry === 'France') {
        numbers.push(
          { id: '1', type: 'general', number: '112', description: 'European Emergency Number', icon: Phone },
          { id: '2', type: 'police', number: '17', description: 'Police', icon: Shield },
          { id: '3', type: 'ambulance', number: '15', description: 'Ambulance (SAMU)', icon: Heart },
          { id: '4', type: 'fire', number: '18', description: 'Fire Department', icon: Flame }
        );
      } else if (selectedCountry === 'Japan') {
        numbers.push(
          { id: '1', type: 'police', number: '110', description: 'Police', icon: Shield },
          { id: '2', type: 'ambulance', number: '119', description: 'Ambulance & Fire', icon: Heart }
        );
      } else if (selectedCountry === 'United States') {
        numbers.push(
          { id: '1', type: 'general', number: '911', description: 'Emergency Services', icon: Phone }
        );
      } else {
        numbers.push(
          { id: '1', type: 'general', number: '112', description: 'International Emergency Number', icon: Phone }
        );
      }

      // Generate emergency contacts based on country
      const mockContacts: EmergencyContact[] = [
        {
          id: '1',
          name: `${selectedCountry} Tourist Police`,
          type: 'police',
          phone: '+' + Math.floor(Math.random() * 100) + ' ' + Math.floor(Math.random() * 10000000000),
          address: 'Central Station, Main Street',
          website: 'https://police.gov',
          hours: '24/7',
          isFavorite: true
        },
        {
          id: '2',
          name: `International Hospital of ${selectedCountry}`,
          type: 'hospital',
          phone: '+' + Math.floor(Math.random() * 100) + ' ' + Math.floor(Math.random() * 10000000000),
          address: 'Medical District, Healthcare Avenue',
          website: 'https://hospital.com',
          hours: '24/7',
          notes: 'English-speaking staff available',
          isFavorite: false
        },
        {
          id: '3',
          name: `US Embassy in ${selectedCountry}`,
          type: 'embassy',
          phone: '+' + Math.floor(Math.random() * 100) + ' ' + Math.floor(Math.random() * 10000000000),
          address: 'Diplomatic Quarter, Embassy Row',
          website: 'https://embassy.gov',
          hours: 'Mon-Fri: 9:00-17:00',
          isFavorite: true
        },
        {
          id: '4',
          name: 'Travel Insurance Hotline',
          type: 'insurance',
          phone: '+1 800 123 4567',
          website: 'https://travelinsurance.com',
          hours: '24/7',
          notes: 'Policy #: TI-12345678',
          isFavorite: false
        }
      ];

      setEmergencyNumbers(numbers);
      setContacts(mockContacts);
      setIsLoading(false);
    }, 1000);
  };

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      const contact: EmergencyContact = {
        id: Date.now().toString(),
        name: newContact.name,
        type: newContact.type as any,
        phone: newContact.phone,
        address: newContact.address,
        website: newContact.website,
        hours: newContact.hours,
        notes: newContact.notes,
        isFavorite: newContact.isFavorite || false
      };
      
      setContacts([...contacts, contact]);
      setShowAddContact(false);
      setNewContact({
        name: '',
        type: 'custom',
        phone: '',
        isFavorite: false
      });
    }
  };

  const toggleFavorite = (id: string) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, isFavorite: !contact.isFavorite } : contact
    ));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'police': return Shield;
      case 'ambulance': return Heart;
      case 'fire': return Flame;
      case 'embassy': return Building;
      case 'hospital': return Stethoscope;
      case 'pharmacy': return Heart;
      case 'insurance': return Shield;
      default: return Phone;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'police': return 'bg-blue-100 text-blue-800';
      case 'ambulance': return 'bg-red-100 text-red-800';
      case 'fire': return 'bg-orange-100 text-orange-800';
      case 'embassy': return 'bg-purple-100 text-purple-800';
      case 'hospital': return 'bg-green-100 text-green-800';
      case 'pharmacy': return 'bg-green-100 text-green-800';
      case 'insurance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center h-[600px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading emergency contacts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Phone className="w-6 h-6 text-red-600" />
          <div>
            <h2 className="text-xl font-bold text-gray-900">Emergency Contacts</h2>
            <p className="text-sm text-gray-600">Local emergency numbers and important contacts</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddContact(true)}
          className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Contact</span>
        </button>
      </div>

      {/* Country Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Globe className="w-4 h-4 inline mr-1" />
          Select Country
        </label>
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        >
          {countries.map(country => (
            <option key={country.code} value={country.name}>
              {country.flag} {country.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Emergency Numbers */}
        <div className="lg:col-span-2 space-y-6">
          {/* Emergency Numbers Card */}
          <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
              Emergency Numbers in {selectedCountry}
            </h3>
            <div className="space-y-3">
              {emergencyNumbers.map((emergency) => {
                const Icon = emergency.icon;
                return (
                  <div key={emergency.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <Icon className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{emergency.description}</div>
                        <div className="text-sm text-gray-500">Emergency Service</div>
                      </div>
                    </div>
                    <a
                      href={`tel:${emergency.number}`}
                      className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      <span className="font-bold">{emergency.number}</span>
                    </a>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-4 p-3 bg-white rounded-lg border border-red-100">
              <div className="flex items-start space-x-3">
                <Info className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Important Note</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    In case of emergency, dial the local emergency number. These numbers are free to call and work without a SIM card or network coverage.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Contacts */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Phone className="w-5 h-5 mr-2 text-blue-600" />
              Important Contacts
            </h3>
            <div className="space-y-4">
              {contacts.map((contact) => {
                const TypeIcon = getTypeIcon(contact.type);
                return (
                  <motion.div
                    key={contact.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getTypeColor(contact.type)}`}>
                          <TypeIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold text-gray-900">{contact.name}</h4>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTypeColor(contact.type)}`}>
                              {contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <a
                              href={`tel:${contact.phone}`}
                              className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                              {contact.phone}
                            </a>
                            <button
                              onClick={() => copyToClipboard(contact.phone)}
                              className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>
                          {contact.address && (
                            <div className="flex items-center space-x-1 text-sm text-gray-600 mt-1">
                              <MapPin className="w-3 h-3" />
                              <span>{contact.address}</span>
                            </div>
                          )}
                          {contact.hours && (
                            <div className="flex items-center space-x-1 text-sm text-gray-600 mt-1">
                              <Clock className="w-3 h-3" />
                              <span>{contact.hours}</span>
                            </div>
                          )}
                          {contact.notes && (
                            <div className="text-sm text-gray-600 mt-1 italic">
                              {contact.notes}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <button
                          onClick={() => toggleFavorite(contact.id)}
                          className={`p-2 rounded-full transition-colors ${
                            contact.isFavorite ? 'text-yellow-500' : 'text-gray-300 hover:text-gray-400'
                          }`}
                        >
                          <Star className="w-5 h-5 fill-current" />
                        </button>
                        {contact.website && (
                          <a
                            href={contact.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 text-sm flex items-center space-x-1"
                          >
                            <span>Website</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Offline Access */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Download className="w-5 h-5 mr-2 text-blue-600" />
              Offline Access
            </h3>
            <p className="text-sm text-gray-700 mb-4">
              Download emergency contacts for {selectedCountry} to access them without internet connection.
            </p>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Save for Offline</span>
            </button>
          </div>

          {/* Emergency Phrases */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-green-600" />
              Emergency Phrases
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">Help!</span>
                  <div className="flex space-x-1">
                    <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                      <Volume2 className="w-3 h-3" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-blue-600">
                  {selectedCountry === 'France' ? 'Au secours!' : 
                   selectedCountry === 'Japan' ? 'Tasukete!' : 
                   selectedCountry === 'Spain' ? '¡Ayuda!' : 'Help!'}
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">I need a doctor</span>
                  <div className="flex space-x-1">
                    <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                      <Volume2 className="w-3 h-3" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-blue-600">
                  {selectedCountry === 'France' ? 'J\'ai besoin d\'un médecin' : 
                   selectedCountry === 'Japan' ? 'Isha ga hitsuyō desu' : 
                   selectedCountry === 'Spain' ? 'Necesito un médico' : 'I need a doctor'}
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">Call the police</span>
                  <div className="flex space-x-1">
                    <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                      <Volume2 className="w-3 h-3" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-blue-600">
                  {selectedCountry === 'France' ? 'Appelez la police' : 
                   selectedCountry === 'Japan' ? 'Keisatsu o yonde kudasai' : 
                   selectedCountry === 'Spain' ? 'Llame a la policía' : 'Call the police'}
                </p>
              </div>
            </div>
            <button className="w-full mt-4 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              View All Phrases
            </button>
          </div>

          {/* Safety Tips */}
          <div className="bg-orange-50 rounded-2xl p-6 border border-orange-200">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Siren className="w-5 h-5 mr-2 text-orange-600" />
              Safety Tips for {selectedCountry}
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>• Save emergency numbers to your phone</p>
              <p>• Keep a physical copy of important contacts</p>
              <p>• Know the location of your country's embassy</p>
              <p>• Register with your embassy before traveling</p>
              <p>• Share your itinerary with someone at home</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Contact Modal */}
      {showAddContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Add Emergency Contact</h3>
              <button
                onClick={() => setShowAddContact(false)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Name
                </label>
                <input
                  type="text"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="e.g., Local Hospital"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Type
                </label>
                <select
                  value={newContact.type}
                  onChange={(e) => setNewContact({ ...newContact, type: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="embassy">Embassy</option>
                  <option value="hospital">Hospital</option>
                  <option value="pharmacy">Pharmacy</option>
                  <option value="insurance">Insurance</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="e.g., +33 1 23 45 67 89"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address (Optional)
                </label>
                <input
                  type="text"
                  value={newContact.address || ''}
                  onChange={(e) => setNewContact({ ...newContact, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="e.g., 123 Main Street"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website (Optional)
                </label>
                <input
                  type="url"
                  value={newContact.website || ''}
                  onChange={(e) => setNewContact({ ...newContact, website: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="e.g., https://example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  value={newContact.notes || ''}
                  onChange={(e) => setNewContact({ ...newContact, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Any additional information"
                  rows={3}
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="favorite"
                  checked={newContact.isFavorite}
                  onChange={(e) => setNewContact({ ...newContact, isFavorite: e.target.checked })}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="favorite" className="ml-2 block text-sm text-gray-700">
                  Add to favorites
                </label>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddContact(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddContact}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Check className="w-4 h-4" />
                <span>Save Contact</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default EmergencyContacts;