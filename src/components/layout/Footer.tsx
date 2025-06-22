import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Heart, ExternalLink, Navigation, Scan, Calculator, Cloud, Phone, Map } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Plane className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                NexTrip
              </span>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              AI-powered travel planning that adapts to your style. From solo adventures to group getaways, 
              we make every journey extraordinary.
            </p>
            
            {/* Built on Bolt Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 rounded-full border border-purple-200">
              <div className="w-5 h-5 bg-gradient-to-r from-purple-600 to-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">⚡</span>
              </div>
              <span className="text-sm font-medium text-gray-700">Built on Bolt</span>
              <ExternalLink className="w-3 h-3 text-gray-500" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/my-trips" className="text-gray-600 hover:text-gray-900 transition-colors">
                  My Trips
                </Link>
              </li>
              <li>
                <Link to="/ai-buddy" className="text-gray-600 hover:text-gray-900 transition-colors">
                  AI Travel Buddy
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Account Settings
                </Link>
              </li>
            </ul>
          </div>

          {/* Travel Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Travel Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/resources" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center space-x-2">
                  <Navigation className="w-4 h-4" />
                  <span>All Resources</span>
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center space-x-2">
                  <Scan className="w-4 h-4" />
                  <span>AR Translator</span>
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center space-x-2">
                  <Calculator className="w-4 h-4" />
                  <span>Currency Exchange</span>
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center space-x-2">
                  <Cloud className="w-4 h-4" />
                  <span>Weather Tracker</span>
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Emergency Contacts</span>
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center space-x-2">
                  <Map className="w-4 h-4" />
                  <span>Offline Maps</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2024 NexTrip. All rights reserved.
            </p>
            <div className="flex items-center space-x-1 text-sm text-gray-500 mt-4 md:mt-0">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>for travelers worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;