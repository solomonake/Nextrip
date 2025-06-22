import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  Languages, 
  Volume2, 
  Copy, 
  Download, 
  Settings,
  Scan,
  X,
  RotateCcw,
  Zap,
  Globe,
  BookOpen,
  Mic,
  Type,
  Image as ImageIcon
} from 'lucide-react';

interface Translation {
  id: string;
  originalText: string;
  translatedText: string;
  fromLanguage: string;
  toLanguage: string;
  confidence: number;
  timestamp: Date;
}

interface Language {
  code: string;
  name: string;
  flag: string;
}

const ARTranslator: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [selectedFromLang, setSelectedFromLang] = useState('auto');
  const [selectedToLang, setSelectedToLang] = useState('en');
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'pending'>('pending');
  const [showSettings, setShowSettings] = useState(false);
  const [scanMode, setScanMode] = useState<'live' | 'photo'>('live');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const languages: Language[] = [
    { code: 'auto', name: 'Auto Detect', flag: '🌐' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'th', name: 'Thai', flag: '🇹🇭' },
    { code: 'vi', name: 'Vietnamese', flag: '🇻🇳' }
  ];

  const mockTranslations: Translation[] = [
    {
      id: '1',
      originalText: 'Où est la gare?',
      translatedText: 'Where is the train station?',
      fromLanguage: 'French',
      toLanguage: 'English',
      confidence: 0.98,
      timestamp: new Date('2024-03-15T14:30:00')
    },
    {
      id: '2',
      originalText: 'Cuánto cuesta esto?',
      translatedText: 'How much does this cost?',
      fromLanguage: 'Spanish',
      toLanguage: 'English',
      confidence: 0.95,
      timestamp: new Date('2024-03-15T13:45:00')
    },
    {
      id: '3',
      originalText: 'Wo ist das Badezimmer?',
      translatedText: 'Where is the bathroom?',
      fromLanguage: 'German',
      toLanguage: 'English',
      confidence: 0.97,
      timestamp: new Date('2024-03-15T12:20:00')
    }
  ];

  useEffect(() => {
    setTranslations(mockTranslations);
  }, []);

  const requestCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraPermission('granted');
      }
    } catch (error) {
      console.error('Camera access denied:', error);
      setCameraPermission('denied');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  };

  const startScanning = () => {
    if (cameraPermission === 'granted') {
      setIsScanning(true);
      // Simulate text detection and translation
      setTimeout(() => {
        simulateTranslation();
      }, 2000);
    } else {
      requestCameraAccess();
    }
  };

  const simulateTranslation = () => {
    const mockTexts = [
      { original: 'Sortie', translated: 'Exit', from: 'French', to: 'English' },
      { original: 'Entrada', translated: 'Entrance', from: 'Spanish', to: 'English' },
      { original: 'Ausgang', translated: 'Exit', from: 'German', to: 'English' },
      { original: 'Uscita', translated: 'Exit', from: 'Italian', to: 'English' }
    ];

    const randomText = mockTexts[Math.floor(Math.random() * mockTexts.length)];
    
    const newTranslation: Translation = {
      id: Date.now().toString(),
      originalText: randomText.original,
      translatedText: randomText.translated,
      fromLanguage: randomText.from,
      toLanguage: randomText.to,
      confidence: 0.92 + Math.random() * 0.07,
      timestamp: new Date()
    };

    setTranslations(prev => [newTranslation, ...prev]);
    setIsScanning(false);
  };

  const speakText = (text: string, language: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'English' ? 'en-US' : 'auto';
      speechSynthesis.speak(utterance);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getLanguageByCode = (code: string) => {
    return languages.find(lang => lang.code === code) || languages[0];
  };

  return (
    <div className="h-[800px] flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Scan className="w-6 h-6" />
            <div>
              <h2 className="text-xl font-bold">AR Translator</h2>
              <p className="text-sm opacity-90">Point your camera at text to translate instantly</p>
            </div>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Language Selection */}
        <div className="flex items-center space-x-4 mt-4">
          <div className="flex-1">
            <select
              value={selectedFromLang}
              onChange={(e) => setSelectedFromLang(e.target.value)}
              className="w-full bg-white bg-opacity-20 text-white rounded-lg px-3 py-2 text-sm"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code} className="text-gray-900">
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>
          
          <button
            onClick={() => {
              const temp = selectedFromLang;
              setSelectedFromLang(selectedToLang);
              setSelectedToLang(temp);
            }}
            className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          
          <div className="flex-1">
            <select
              value={selectedToLang}
              onChange={(e) => setSelectedToLang(e.target.value)}
              className="w-full bg-white bg-opacity-20 text-white rounded-lg px-3 py-2 text-sm"
            >
              {languages.filter(lang => lang.code !== 'auto').map(lang => (
                <option key={lang.code} value={lang.code} className="text-gray-900">
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Camera View */}
        <div className="flex-1 relative bg-gray-900">
          {cameraPermission === 'granted' ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              
              {/* AR Overlay */}
              <div className="absolute inset-0">
                {/* Scanning Frame */}
                <div className="absolute inset-4 border-2 border-white border-opacity-50 rounded-lg">
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-blue-400 rounded-tl-lg" />
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-blue-400 rounded-tr-lg" />
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-blue-400 rounded-bl-lg" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-blue-400 rounded-br-lg" />
                </div>

                {/* Scanning Animation */}
                {isScanning && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}

                {/* Instructions */}
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <div className="bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
                    <p className="text-sm">
                      {isScanning ? 'Scanning text...' : 'Point camera at text and tap scan'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <button
                  onClick={startScanning}
                  disabled={isScanning}
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                    isScanning 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700 shadow-lg'
                  } text-white`}
                >
                  {isScanning ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Scan className="w-6 h-6" />
                  )}
                </button>
              </div>
            </>
          ) : cameraPermission === 'denied' ? (
            <div className="flex items-center justify-center h-full text-white">
              <div className="text-center">
                <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">Camera Access Required</h3>
                <p className="text-gray-300 mb-4">Please enable camera access to use AR translation</p>
                <button
                  onClick={requestCameraAccess}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Enable Camera
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-white">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p>Requesting camera access...</p>
              </div>
            </div>
          )}
        </div>

        {/* Translation History */}
        <div className="w-80 bg-gray-50 border-l border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 flex items-center">
              <BookOpen className="w-4 h-4 mr-2" />
              Translation History
            </h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {translations.map((translation) => (
              <motion.div
                key={translation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
              >
                {/* Original Text */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">{translation.fromLanguage}</span>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => speakText(translation.originalText, translation.fromLanguage)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => copyToClipboard(translation.originalText)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-900 font-medium">{translation.originalText}</p>
                </div>

                {/* Translated Text */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">{translation.toLanguage}</span>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => speakText(translation.translatedText, translation.toLanguage)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => copyToClipboard(translation.translatedText)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-blue-600 font-medium">{translation.translatedText}</p>
                </div>

                {/* Metadata */}
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Confidence: {Math.round(translation.confidence * 100)}%</span>
                  <span>{translation.timestamp.toLocaleTimeString()}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-t border-gray-200 space-y-2">
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Download Offline Pack</span>
            </button>
            <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
              <Type className="w-4 h-4" />
              <span>Text Input Mode</span>
            </button>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full mx-4"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Translation Settings</h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Scan Mode
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setScanMode('live')}
                      className={`p-3 rounded-lg border-2 text-center transition-colors ${
                        scanMode === 'live'
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Zap className="w-5 h-5 mx-auto mb-1" />
                      <span className="text-sm font-medium">Live Scan</span>
                    </button>
                    <button
                      onClick={() => setScanMode('photo')}
                      className={`p-3 rounded-lg border-2 text-center transition-colors ${
                        scanMode === 'photo'
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <ImageIcon className="w-5 h-5 mx-auto mb-1" />
                      <span className="text-sm font-medium">Photo Mode</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm text-gray-700">Auto-detect language</span>
                  </label>
                </div>

                <div>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm text-gray-700">Save translation history</span>
                  </label>
                </div>

                <div>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm text-gray-700">Offline mode (requires download)</span>
                  </label>
                </div>
              </div>

              <div className="mt-6 flex space-x-3">
                <button
                  onClick={() => setShowSettings(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Settings
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ARTranslator;