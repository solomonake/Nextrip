import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  MessageCircle,
  Zap,
  Navigation,
  Calendar,
  Search,
  Phone
} from 'lucide-react';

interface VoiceCommand {
  id: string;
  command: string;
  response: string;
  action?: () => void;
  timestamp: Date;
}

interface VoiceAssistantProps {
  onNavigate?: (path: string) => void;
  onSearch?: (query: string) => void;
  onBooking?: (type: string, details: any) => void;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({
  onNavigate,
  onSearch,
  onBooking
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [commands, setCommands] = useState<VoiceCommand[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Check for speech recognition support
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setSpeechSupported(true);
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscript(transcript);

        if (event.results[current].isFinal) {
          processVoiceCommand(transcript);
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    }

    // Check for speech synthesis support
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current && speechSupported) {
      setIsListening(true);
      setTranscript('');
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const speak = (text: string) => {
    if (synthRef.current) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      synthRef.current.speak(utterance);
    }
  };

  const processVoiceCommand = async (command: string) => {
    setIsProcessing(true);
    const lowerCommand = command.toLowerCase();
    
    let response = '';
    let action: (() => void) | undefined;

    // Flight search commands
    if (lowerCommand.includes('search flights') || lowerCommand.includes('find flights')) {
      const destination = extractDestination(lowerCommand);
      response = destination 
        ? `Searching for flights to ${destination}...`
        : 'Searching for flights. Please specify your destination.';
      action = () => {
        if (destination && onSearch) {
          onSearch(destination);
          onNavigate?.('/search?type=flights');
        }
      };
    }
    // Hotel search commands
    else if (lowerCommand.includes('search hotels') || lowerCommand.includes('find hotels')) {
      const destination = extractDestination(lowerCommand);
      response = destination 
        ? `Looking for hotels in ${destination}...`
        : 'Searching for hotels. Where would you like to stay?';
      action = () => {
        if (destination && onSearch) {
          onSearch(destination);
          onNavigate?.('/search?type=hotels');
        }
      };
    }
    // Navigation commands
    else if (lowerCommand.includes('go to') || lowerCommand.includes('navigate to')) {
      if (lowerCommand.includes('home')) {
        response = 'Taking you to the home page.';
        action = () => onNavigate?.('/');
      } else if (lowerCommand.includes('search')) {
        response = 'Opening search page.';
        action = () => onNavigate?.('/search');
      } else if (lowerCommand.includes('trips') || lowerCommand.includes('itinerary')) {
        response = 'Opening your trips.';
        action = () => onNavigate?.('/itinerary');
      } else if (lowerCommand.includes('profile')) {
        response = 'Opening your profile.';
        action = () => onNavigate?.('/profile');
      }
    }
    // Itinerary commands
    else if (lowerCommand.includes('show my trips') || lowerCommand.includes('my itinerary')) {
      response = 'Here are your current trips.';
      action = () => onNavigate?.('/itinerary');
    }
    // Booking commands
    else if (lowerCommand.includes('book') && lowerCommand.includes('flight')) {
      response = 'I can help you book a flight. Let me open the booking page.';
      action = () => onNavigate?.('/search?type=flights');
    }
    else if (lowerCommand.includes('book') && lowerCommand.includes('hotel')) {
      response = 'I can help you book a hotel. Let me open the booking page.';
      action = () => onNavigate?.('/search?type=hotels');
    }
    // Weather commands
    else if (lowerCommand.includes('weather')) {
      const destination = extractDestination(lowerCommand);
      response = destination 
        ? `The weather in ${destination} is partly cloudy with a high of 24°C. Perfect for sightseeing!`
        : 'Which destination would you like weather information for?';
    }
    // Help commands
    else if (lowerCommand.includes('help') || lowerCommand.includes('what can you do')) {
      response = 'I can help you search for flights and hotels, navigate the app, check weather, and manage your trips. Try saying "search flights to Paris" or "show my trips".';
    }
    // Default response
    else {
      response = 'I\'m not sure how to help with that. Try asking me to search for flights, find hotels, or navigate to different pages.';
    }

    const newCommand: VoiceCommand = {
      id: Date.now().toString(),
      command,
      response,
      action,
      timestamp: new Date()
    };

    setCommands(prev => [newCommand, ...prev.slice(0, 4)]); // Keep last 5 commands
    speak(response);
    
    if (action) {
      setTimeout(action, 1000); // Execute action after speaking
    }

    setIsProcessing(false);
    setTranscript('');
  };

  const extractDestination = (command: string): string | null => {
    const patterns = [
      /(?:to|in|for)\s+([a-zA-Z\s]+?)(?:\s|$)/,
      /flights?\s+([a-zA-Z\s]+?)(?:\s|$)/,
      /hotels?\s+([a-zA-Z\s]+?)(?:\s|$)/
    ];

    for (const pattern of patterns) {
      const match = command.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }
    return null;
  };

  const quickCommands = [
    { text: 'Search flights to Paris', icon: Search },
    { text: 'Find hotels in Tokyo', icon: Search },
    { text: 'Show my trips', icon: Calendar },
    { text: 'Navigate home', icon: Navigation },
    { text: 'What\'s the weather like?', icon: MessageCircle },
    { text: 'Help me book a flight', icon: Phone }
  ];

  if (!speechSupported) {
    return (
      <div className="fixed bottom-4 right-4 bg-gray-100 text-gray-600 p-4 rounded-lg shadow-lg">
        <p className="text-sm">Voice commands not supported in this browser</p>
      </div>
    );
  }

  return (
    <>
      {/* Voice Assistant Toggle */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsActive(!isActive)}
        className={`fixed bottom-4 right-4 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isActive 
            ? 'bg-blue-600 text-white' 
            : 'bg-white text-gray-600 hover:bg-gray-50'
        }`}
      >
        {isListening ? (
          <div className="relative">
            <Mic className="w-6 h-6" />
            <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-30" />
          </div>
        ) : (
          <Mic className="w-6 h-6" />
        )}
      </motion.button>

      {/* Voice Assistant Panel */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-4 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5" />
                  <span className="font-semibold">Voice Assistant</span>
                </div>
                <div className="flex items-center space-x-2">
                  {isListening && (
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                      <span className="text-xs">Listening...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Voice Controls */}
              <div className="flex items-center justify-center space-x-4 mb-4">
                <button
                  onClick={isListening ? stopListening : startListening}
                  disabled={isProcessing}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    isListening
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  } disabled:opacity-50`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  <span>{isListening ? 'Stop' : 'Start'}</span>
                </button>
                
                <button
                  onClick={() => synthRef.current?.cancel()}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  <VolumeX className="w-4 h-4" />
                  <span>Mute</span>
                </button>
              </div>

              {/* Current Transcript */}
              {transcript && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>You said:</strong> "{transcript}"
                  </p>
                </div>
              )}

              {/* Processing Indicator */}
              {isProcessing && (
                <div className="mb-4 p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm text-yellow-800">Processing your request...</span>
                  </div>
                </div>
              )}

              {/* Recent Commands */}
              {commands.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Recent Commands</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {commands.map((cmd) => (
                      <div key={cmd.id} className="p-2 bg-gray-50 rounded text-xs">
                        <p className="font-medium text-gray-900">"{cmd.command}"</p>
                        <p className="text-gray-600 mt-1">{cmd.response}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Commands */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Try saying:</h4>
                <div className="grid grid-cols-1 gap-2">
                  {quickCommands.map((cmd, index) => {
                    const Icon = cmd.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => processVoiceCommand(cmd.text)}
                        className="flex items-center space-x-2 p-2 text-left text-xs bg-gray-50 hover:bg-gray-100 rounded transition-colors"
                      >
                        <Icon className="w-3 h-3 text-gray-500" />
                        <span>"{cmd.text}"</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-3 bg-gray-50 border-t border-gray-200">
              <p className="text-xs text-gray-600 text-center">
                Powered by AI • Speak naturally for best results
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VoiceAssistant;