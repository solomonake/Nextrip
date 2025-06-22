import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Send, 
  MapPin, 
  Clock, 
  DollarSign, 
  Star,
  Lightbulb,
  MessageCircle,
  Bot,
  User,
  Camera,
  Utensils
} from 'lucide-react';
import { Trip } from '../../contexts/TripContext';

interface AIAssistantProps {
  trip: Trip;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: Suggestion[];
}

interface Suggestion {
  id: string;
  type: 'activity' | 'restaurant' | 'tip';
  title: string;
  description: string;
  price?: number;
  rating?: number;
  location?: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ trip }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: `Welcome to your AI travel assistant! I'm here to help you make the most of your trip to ${trip.destination}. I can suggest activities, restaurants, optimize your itinerary, and answer any travel questions you have.`,
      timestamp: new Date(),
      suggestions: [
        {
          id: '1',
          type: 'activity',
          title: 'Local Walking Tour',
          description: 'Explore the historic downtown with a knowledgeable local guide',
          price: 25,
          rating: 4.8,
          location: 'Downtown'
        },
        {
          id: '2',
          type: 'restaurant',
          title: 'Authentic Local Cuisine',
          description: 'Family-owned restaurant serving traditional dishes',
          price: 35,
          rating: 4.6,
          location: 'Old Town'
        },
        {
          id: '3',
          type: 'tip',
          title: 'Best Time to Visit Attractions',
          description: 'Visit popular attractions early morning or late afternoon to avoid crowds',
          location: 'City Center'
        }
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    "What are the must-see attractions?",
    "Recommend local restaurants",
    "Best time to visit popular spots?",
    "Transportation options",
    "Weather forecast",
    "Cultural etiquette tips"
  ];

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(message);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    let response = '';
    let suggestions: Suggestion[] = [];

    if (lowerMessage.includes('restaurant') || lowerMessage.includes('food') || lowerMessage.includes('eat')) {
      response = `Here are some excellent dining options in ${trip.destination} that fit your budget and preferences:`;
      suggestions = [
        {
          id: '1',
          type: 'restaurant',
          title: 'The Local Bistro',
          description: 'Farm-to-table restaurant with seasonal menu',
          price: 45,
          rating: 4.7,
          location: 'Downtown'
        },
        {
          id: '2',
          type: 'restaurant',
          title: 'Street Food Market',
          description: 'Authentic local street food experience',
          price: 15,
          rating: 4.5,
          location: 'Market District'
        }
      ];
    } else if (lowerMessage.includes('attraction') || lowerMessage.includes('see') || lowerMessage.includes('visit')) {
      response = `Based on your travel style and the time you have, here are the top attractions I recommend:`;
      suggestions = [
        {
          id: '1',
          type: 'activity',
          title: 'Historic City Center',
          description: 'UNESCO World Heritage site with stunning architecture',
          price: 0,
          rating: 4.9,
          location: 'City Center'
        },
        {
          id: '2',
          type: 'activity',
          title: 'Art Museum',
          description: 'World-class collection of contemporary and classical art',
          price: 20,
          rating: 4.6,
          location: 'Arts District'
        }
      ];
    } else if (lowerMessage.includes('weather') || lowerMessage.includes('climate')) {
      response = `The weather in ${trip.destination} during your visit is expected to be pleasant. Here are some tips:`;
      suggestions = [
        {
          id: '1',
          type: 'tip',
          title: 'Pack Layers',
          description: 'Temperatures can vary throughout the day, so bring layers',
          location: 'General'
        },
        {
          id: '2',
          type: 'tip',
          title: 'Rain Preparation',
          description: 'There\'s a chance of light rain, consider bringing an umbrella',
          location: 'General'
        }
      ];
    } else {
      response = `I'd be happy to help you with that! Based on your trip to ${trip.destination}, here are some personalized recommendations:`;
      suggestions = [
        {
          id: '1',
          type: 'tip',
          title: 'Local Transportation',
          description: 'The metro system is efficient and cost-effective for getting around',
          location: 'Citywide'
        },
        {
          id: '2',
          type: 'activity',
          title: 'Hidden Gem',
          description: 'A beautiful viewpoint that most tourists miss',
          price: 0,
          rating: 4.8,
          location: 'Hillside'
        }
      ];
    }

    return {
      id: Date.now().toString(),
      type: 'ai',
      content: response,
      timestamp: new Date(),
      suggestions
    };
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const addSuggestionToItinerary = (suggestion: Suggestion) => {
    // This would integrate with the itinerary system
    console.log('Adding to itinerary:', suggestion);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-[600px] flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold">AI Travel Assistant</h3>
            <p className="text-sm opacity-90">Powered by advanced travel intelligence</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
              <div className={`flex items-start space-x-2 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                
                <div className={`rounded-2xl px-4 py-2 ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-75 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>

              {/* Suggestions */}
              {message.suggestions && message.suggestions.length > 0 && (
                <div className="mt-3 space-y-2">
                  {message.suggestions.map((suggestion) => (
                    <motion.div
                      key={suggestion.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => addSuggestionToItinerary(suggestion)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            {suggestion.type === 'activity' && <Camera className="w-4 h-4 text-green-600" />}
                            {suggestion.type === 'restaurant' && <Utensils className="w-4 h-4 text-orange-600" />}
                            {suggestion.type === 'tip' && <Lightbulb className="w-4 h-4 text-yellow-600" />}
                            <h4 className="font-medium text-sm">{suggestion.title}</h4>
                          </div>
                          <p className="text-xs text-gray-600 mb-2">{suggestion.description}</p>
                          
                          <div className="flex items-center space-x-3 text-xs text-gray-500">
                            {suggestion.location && (
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-3 h-3" />
                                <span>{suggestion.location}</span>
                              </div>
                            )}
                            {suggestion.rating && (
                              <div className="flex items-center space-x-1">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                <span>{suggestion.rating}</span>
                              </div>
                            )}
                            {suggestion.price !== undefined && (
                              <div className="flex items-center space-x-1">
                                <DollarSign className="w-3 h-3" />
                                <span>{suggestion.price === 0 ? 'Free' : `$${suggestion.price}`}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <button className="ml-2 text-blue-600 hover:text-blue-700 text-xs font-medium">
                          Add
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-gray-600" />
              </div>
              <div className="bg-gray-100 rounded-2xl px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Quick Questions */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuickQuestion(question)}
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
            >
              {question}
            </button>
          ))}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputMessage);
          }}
          className="flex space-x-2"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask me anything about your trip..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isTyping}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIAssistant;