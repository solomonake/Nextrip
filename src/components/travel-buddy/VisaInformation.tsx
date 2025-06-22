import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Clock, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  ExternalLink,
  Download,
  Calendar,
  DollarSign,
  MapPin,
  Phone,
  Mail,
  Globe,
  Info,
  Camera,
  CreditCard,
  Plane,
  Building
} from 'lucide-react';

interface VisaRequirement {
  required: boolean;
  type: 'tourist' | 'business' | 'transit' | 'none';
  duration: string;
  processingTime: string;
  cost: number;
  validityPeriod: string;
  maxStay: string;
  multipleEntry: boolean;
}

interface RequiredDocument {
  id: string;
  name: string;
  description: string;
  required: boolean;
  format: string;
  tips: string[];
  sampleAvailable: boolean;
}

interface Embassy {
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  workingHours: string;
  appointmentRequired: boolean;
}

interface VisaInformationProps {
  fromCountry: string;
  toCountry: string;
  travelDate: Date;
  tripDuration: number;
  travelPurpose: 'tourism' | 'business' | 'transit';
}

const VisaInformation: React.FC<VisaInformationProps> = ({
  fromCountry,
  toCountry,
  travelDate,
  tripDuration,
  travelPurpose
}) => {
  const [visaInfo, setVisaInfo] = useState<VisaRequirement | null>(null);
  const [documents, setDocuments] = useState<RequiredDocument[]>([]);
  const [embassy, setEmbassy] = useState<Embassy | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'requirements' | 'documents' | 'embassy' | 'timeline'>('requirements');

  useEffect(() => {
    generateVisaInformation();
  }, [fromCountry, toCountry, travelPurpose]);

  const generateVisaInformation = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      // Simulate visa requirement check
      const needsVisa = checkVisaRequirement(fromCountry, toCountry);
      
      setVisaInfo({
        required: needsVisa,
        type: travelPurpose,
        duration: tripDuration > 30 ? 'Long-term' : 'Short-term',
        processingTime: needsVisa ? '5-15 business days' : 'N/A',
        cost: needsVisa ? (travelPurpose === 'business' ? 160 : 80) : 0,
        validityPeriod: needsVisa ? '6 months' : 'N/A',
        maxStay: needsVisa ? '90 days' : 'Visa-free travel',
        multipleEntry: needsVisa && travelPurpose === 'business'
      });

      if (needsVisa) {
        setDocuments(generateRequiredDocuments(travelPurpose));
        setEmbassy(generateEmbassyInfo(toCountry));
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const checkVisaRequirement = (from: string, to: string): boolean => {
    // Simplified visa requirement logic
    const visaFreeCountries = ['canada', 'uk', 'germany', 'france', 'japan', 'australia'];
    const fromLower = from.toLowerCase();
    const toLower = to.toLowerCase();
    
    // US citizens typically need visas for certain countries
    if (fromLower.includes('usa') || fromLower.includes('united states')) {
      return !visaFreeCountries.some(country => toLower.includes(country));
    }
    
    // Simulate other country requirements
    return Math.random() > 0.4; // 60% chance of needing visa
  };

  const generateRequiredDocuments = (purpose: string): RequiredDocument[] => {
    const baseDocuments: RequiredDocument[] = [
      {
        id: 'passport',
        name: 'Valid Passport',
        description: 'Passport must be valid for at least 6 months beyond travel date',
        required: true,
        format: 'Original document',
        tips: [
          'Check expiration date carefully',
          'Ensure at least 2 blank pages',
          'Make copies for backup',
          'Check for any damage'
        ],
        sampleAvailable: false
      },
      {
        id: 'application',
        name: 'Visa Application Form',
        description: 'Completed and signed visa application form',
        required: true,
        format: 'Online or paper form',
        tips: [
          'Fill out completely and accurately',
          'Use black ink if paper form',
          'Sign and date the form',
          'Double-check all information'
        ],
        sampleAvailable: true
      },
      {
        id: 'photos',
        name: 'Passport Photos',
        description: '2 recent passport-style photographs',
        required: true,
        format: '2x2 inches, color',
        tips: [
          'Taken within last 6 months',
          'White or off-white background',
          'Face directly toward camera',
          'Neutral expression'
        ],
        sampleAvailable: true
      },
      {
        id: 'itinerary',
        name: 'Travel Itinerary',
        description: 'Detailed travel plans including flights and accommodation',
        required: true,
        format: 'Printed document',
        tips: [
          'Include all flight details',
          'Show hotel reservations',
          'List planned activities',
          'Keep it realistic'
        ],
        sampleAvailable: true
      },
      {
        id: 'financial',
        name: 'Financial Proof',
        description: 'Bank statements showing sufficient funds',
        required: true,
        format: 'Last 3 months statements',
        tips: [
          'Show consistent income',
          'Highlight sufficient balance',
          'Include all accounts',
          'Get bank letter if needed'
        ],
        sampleAvailable: false
      },
      {
        id: 'insurance',
        name: 'Travel Insurance',
        description: 'Valid travel insurance covering medical expenses',
        required: true,
        format: 'Insurance certificate',
        tips: [
          'Minimum $50,000 coverage',
          'Valid for entire trip',
          'Include emergency evacuation',
          'Keep policy number handy'
        ],
        sampleAvailable: false
      }
    ];

    if (purpose === 'business') {
      baseDocuments.push(
        {
          id: 'invitation',
          name: 'Business Invitation Letter',
          description: 'Letter from host company or organization',
          required: true,
          format: 'Official letterhead',
          tips: [
            'Include company details',
            'State purpose of visit',
            'Specify duration',
            'Get it notarized if required'
          ],
          sampleAvailable: true
        },
        {
          id: 'employment',
          name: 'Employment Letter',
          description: 'Letter from your employer',
          required: true,
          format: 'Company letterhead',
          tips: [
            'Confirm employment status',
            'State salary information',
            'Approve leave of absence',
            'Include contact information'
          ],
          sampleAvailable: true
        }
      );
    }

    return baseDocuments;
  };

  const generateEmbassyInfo = (country: string): Embassy => {
    return {
      name: `Embassy of ${country}`,
      address: '123 Embassy Row, Washington, DC 20008',
      phone: '+1 (202) 555-0123',
      email: `consular@${country.toLowerCase().replace(/\s+/g, '')}.embassy.gov`,
      website: `https://www.${country.toLowerCase().replace(/\s+/g, '')}.embassy.gov`,
      workingHours: 'Monday-Friday: 9:00 AM - 5:00 PM',
      appointmentRequired: true
    };
  };

  const getVisaStatusColor = (required: boolean) => {
    return required 
      ? 'bg-orange-100 text-orange-800 border-orange-200'
      : 'bg-green-100 text-green-800 border-green-200';
  };

  const getVisaStatusIcon = (required: boolean) => {
    return required ? AlertTriangle : CheckCircle;
  };

  const tabs = [
    { id: 'requirements', label: 'Requirements', icon: Shield },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'embassy', label: 'Embassy Info', icon: Building },
    { id: 'timeline', label: 'Timeline', icon: Calendar }
  ];

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Checking Visa Requirements</h3>
        <p className="text-gray-600">Analyzing travel documents needed for {fromCountry} → {toCountry}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className={`p-6 text-white ${
        visaInfo?.required 
          ? 'bg-gradient-to-r from-orange-500 to-red-600'
          : 'bg-gradient-to-r from-green-500 to-emerald-600'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">🛂 Visa Information</h3>
            <p className="opacity-90">{fromCountry} → {toCountry}</p>
          </div>
          <div className="text-right">
            <div className={`inline-flex items-center px-4 py-2 rounded-full border-2 ${
              visaInfo?.required 
                ? 'border-white/30 bg-white/10'
                : 'border-white/30 bg-white/10'
            }`}>
              {React.createElement(getVisaStatusIcon(visaInfo?.required || false), { 
                className: "w-5 h-5 mr-2" 
              })}
              <span className="font-semibold">
                {visaInfo?.required ? 'Visa Required' : 'Visa-Free Travel'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-1 p-1 bg-gray-50">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  selectedTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {/* Requirements Tab */}
        {selectedTab === 'requirements' && visaInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Visa Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium capitalize">{visaInfo.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{visaInfo.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Processing Time:</span>
                      <span className="font-medium">{visaInfo.processingTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cost:</span>
                      <span className="font-medium">
                        {visaInfo.cost > 0 ? `$${visaInfo.cost}` : 'Free'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Validity:</span>
                      <span className="font-medium">{visaInfo.validityPeriod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Max Stay:</span>
                      <span className="font-medium">{visaInfo.maxStay}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Multiple Entry:</span>
                      <span className="font-medium">
                        {visaInfo.multipleEntry ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                    <Info className="w-4 h-4 mr-2" />
                    Important Notes
                  </h4>
                  <ul className="text-sm text-blue-800 space-y-2">
                    <li>• Apply at least 2-3 weeks before travel</li>
                    <li>• Passport must be valid for 6+ months</li>
                    <li>• All documents must be in English or translated</li>
                    <li>• Processing times may vary during peak seasons</li>
                    <li>• Keep copies of all submitted documents</li>
                  </ul>
                </div>

                {visaInfo.required && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-900 mb-3 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Action Required
                    </h4>
                    <p className="text-sm text-yellow-800 mb-3">
                      You need to apply for a visa before traveling. Start the process as soon as possible.
                    </p>
                    <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-700 transition-colors">
                      Start Visa Application
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Documents Tab */}
        {selectedTab === 'documents' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xl font-semibold text-gray-900">Required Documents</h4>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Download Checklist</span>
              </button>
            </div>

            {documents.map((doc, index) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <FileText className="w-4 h-4 text-gray-600" />
                      <h5 className="font-semibold text-gray-900">{doc.name}</h5>
                      {doc.required && (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                          Required
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{doc.description}</p>
                    <p className="text-xs text-gray-600 mb-3">Format: {doc.format}</p>
                    
                    {/* Tips */}
                    <div className="bg-gray-50 rounded p-3">
                      <h6 className="text-xs font-medium text-gray-900 mb-1">💡 Tips:</h6>
                      <ul className="text-xs text-gray-700 space-y-1">
                        {doc.tips.map((tip, tipIndex) => (
                          <li key={tipIndex}>• {tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-4">
                    {doc.sampleAvailable && (
                      <button className="text-blue-600 hover:text-blue-700 text-xs font-medium flex items-center space-x-1">
                        <ExternalLink className="w-3 h-3" />
                        <span>View Sample</span>
                      </button>
                    )}
                    <div className="w-6 h-6 border-2 border-gray-300 rounded flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-gray-300" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Embassy Tab */}
        {selectedTab === 'embassy' && embassy && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Building className="w-4 h-4 mr-2" />
                    Embassy Contact Information
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-gray-600 mt-0.5" />
                      <div>
                        <span className="font-medium">Address:</span>
                        <p className="text-gray-700">{embassy.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-600" />
                      <span className="font-medium">Phone:</span>
                      <a href={`tel:${embassy.phone}`} className="text-blue-600 hover:text-blue-700">
                        {embassy.phone}
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-600" />
                      <span className="font-medium">Email:</span>
                      <a href={`mailto:${embassy.email}`} className="text-blue-600 hover:text-blue-700">
                        {embassy.email}
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-gray-600" />
                      <span className="font-medium">Website:</span>
                      <a href={embassy.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 flex items-center space-x-1">
                        <span>Visit Website</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-600" />
                      <span className="font-medium">Hours:</span>
                      <span className="text-gray-700">{embassy.workingHours}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-3">Appointment Information</h4>
                  {embassy.appointmentRequired ? (
                    <div className="space-y-3">
                      <p className="text-sm text-blue-800">
                        Appointments are required for visa applications. Book well in advance.
                      </p>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                        Book Appointment
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm text-blue-800">
                      Walk-in applications accepted during business hours.
                    </p>
                  )}
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-900 mb-3">Before You Visit</h4>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• Bring all required documents</li>
                    <li>• Arrive 15 minutes early</li>
                    <li>• Bring exact change for fees</li>
                    <li>• No electronic devices allowed</li>
                    <li>• Dress professionally</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Timeline Tab */}
        {selectedTab === 'timeline' && visaInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h4 className="text-xl font-semibold text-gray-900">Visa Application Timeline</h4>
            
            {visaInfo.required ? (
              <div className="space-y-4">
                {[
                  { step: 1, title: 'Gather Documents', time: '1-2 weeks before', description: 'Collect all required documents and get translations if needed' },
                  { step: 2, title: 'Complete Application', time: '10-14 days before', description: 'Fill out visa application form and schedule appointment' },
                  { step: 3, title: 'Submit Application', time: '7-10 days before', description: 'Visit embassy/consulate with documents and pay fees' },
                  { step: 4, title: 'Processing Period', time: '5-15 business days', description: 'Wait for visa processing (may vary by season)' },
                  { step: 5, title: 'Collect Passport', time: '1-2 days before travel', description: 'Pick up passport with visa or receive by mail' }
                ].map((item, index) => (
                  <div key={item.step} className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-semibold text-blue-600">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-900">{item.title}</h5>
                      <p className="text-sm text-blue-600 font-medium">{item.time}</p>
                      <p className="text-sm text-gray-700 mt-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">No Visa Required!</h4>
                <p className="text-gray-600">
                  You can travel visa-free from {fromCountry} to {toCountry}. 
                  Just make sure your passport is valid for at least 6 months.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default VisaInformation;