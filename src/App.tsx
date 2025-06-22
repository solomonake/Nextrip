import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ItineraryPage from './pages/ItineraryPage';
import ProfilePage from './pages/ProfilePage';
import TravelBuddyPage from './pages/TravelBuddyPage';
import VoiceAssistant from './components/advanced/VoiceAssistant';
import { AuthProvider } from './contexts/AuthContext';
import { TripProvider } from './contexts/TripContext';
import { useNavigate } from 'react-router-dom';
import MyTripsPage from './pages/MyTripsPage';
import CommunityPage from './pages/CommunityPage';
import TravelResourcesPage from './pages/TravelResourcesPage';


function AppContent() {
  const navigate = useNavigate();

  const handleVoiceNavigate = (path: string) => {
    navigate(path);
  };

  const handleVoiceSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex-1"
      >
        <Routes>
          <Route path="/my-trips" element={<MyTripsPage />} />
          <Route path="/ai-buddy" element={<TravelBuddyPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/resources" element={<TravelResourcesPage />} />

          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/itinerary" element={<ItineraryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/travel-buddy" element={<TravelBuddyPage />} />
        </Routes>
      </motion.main>
      <Footer />
      
      {/* Voice Assistant */}
      <VoiceAssistant 
        onNavigate={handleVoiceNavigate}
        onSearch={handleVoiceSearch}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <TripProvider>
        <Router>
          <AppContent />
        </Router>
      </TripProvider>
    </AuthProvider>
  );
}

export default App;