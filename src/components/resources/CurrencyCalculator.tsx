import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  TrendingUp, 
  TrendingDown, 
  RefreshCw, 
  Star,
  Clock,
  DollarSign,
  BarChart3,
  Globe,
  Bookmark,
  ArrowUpDown
} from 'lucide-react';

interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  rate: number;
}

interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  change24h: number;
  lastUpdated: Date;
}

const CurrencyCalculator: React.FC = () => {
  const [amount, setAmount] = useState<string>('100');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([]);
  const [favorites, setFavorites] = useState<string[]>(['USD', 'EUR', 'GBP', 'JPY']);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const currencies: Currency[] = [
    { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸', rate: 1.0 },
    { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺', rate: 0.85 },
    { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧', rate: 0.73 },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵', rate: 110.0 },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦', rate: 1.25 },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺', rate: 1.35 },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', flag: '🇨🇭', rate: 0.92 },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳', rate: 6.45 },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳', rate: 74.5 },
    { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷', rate: 1180.0 },
    { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬', rate: 1.35 },
    { code: 'THB', name: 'Thai Baht', symbol: '฿', flag: '🇹🇭', rate: 33.2 },
    { code: 'MXN', name: 'Mexican Peso', symbol: '$', flag: '🇲🇽', rate: 20.1 },
    { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷', rate: 5.2 },
    { code: 'RUB', name: 'Russian Ruble', symbol: '₽', flag: '🇷🇺', rate: 75.0 }
  ];

  useEffect(() => {
    generateMockExchangeRates();
  }, []);

  const generateMockExchangeRates = () => {
    const rates: ExchangeRate[] = [];
    
    favorites.forEach(currency => {
      if (currency !== 'USD') {
        const currencyData = currencies.find(c => c.code === currency);
        if (currencyData) {
          rates.push({
            from: 'USD',
            to: currency,
            rate: currencyData.rate,
            change24h: (Math.random() - 0.5) * 5, // Random change between -2.5% and +2.5%
            lastUpdated: new Date()
          });
        }
      }
    });

    setExchangeRates(rates);
  };

  const refreshRates = () => {
    setIsLoading(true);
    setTimeout(() => {
      generateMockExchangeRates();
      setLastUpdated(new Date());
      setIsLoading(false);
    }, 1000);
  };

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const calculateConversion = () => {
    const fromRate = currencies.find(c => c.code === fromCurrency)?.rate || 1;
    const toRate = currencies.find(c => c.code === toCurrency)?.rate || 1;
    const numAmount = parseFloat(amount) || 0;
    
    // Convert to USD first, then to target currency
    const usdAmount = numAmount / fromRate;
    const convertedAmount = usdAmount * toRate;
    
    return convertedAmount;
  };

  const addToFavorites = (currencyCode: string) => {
    if (!favorites.includes(currencyCode)) {
      setFavorites([...favorites, currencyCode]);
    }
  };

  const removeFromFavorites = (currencyCode: string) => {
    setFavorites(favorites.filter(code => code !== currencyCode));
  };

  const formatCurrency = (amount: number, currencyCode: string) => {
    const currency = currencies.find(c => c.code === currencyCode);
    if (!currency) return amount.toFixed(2);
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: currencyCode === 'JPY' || currencyCode === 'KRW' ? 0 : 2
    }).format(amount);
  };

  const convertedAmount = calculateConversion();

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Calculator className="w-6 h-6 text-green-600" />
          <div>
            <h2 className="text-xl font-bold text-gray-900">Currency Exchange</h2>
            <p className="text-sm text-gray-600">Real-time currency conversion</p>
          </div>
        </div>
        <button
          onClick={refreshRates}
          disabled={isLoading}
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Calculator */}
        <div className="lg:col-span-2 space-y-6">
          {/* Amount Input */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full text-3xl font-bold bg-transparent border-none outline-none text-gray-900"
              placeholder="0.00"
            />
          </div>

          {/* Currency Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* From Currency */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">From</label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full bg-transparent text-lg font-semibold text-gray-900 border-none outline-none"
              >
                {currencies.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.flag} {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
              <div className="mt-2 text-2xl font-bold text-gray-900">
                {formatCurrency(parseFloat(amount) || 0, fromCurrency)}
              </div>
            </div>

            {/* Swap Button */}
            <div className="hidden md:flex items-center justify-center">
              <button
                onClick={swapCurrencies}
                className="w-12 h-12 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <ArrowUpDown className="w-5 h-5" />
              </button>
            </div>

            {/* To Currency */}
            <div className="bg-white border-2 border-blue-200 rounded-2xl p-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">To</label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full bg-transparent text-lg font-semibold text-gray-900 border-none outline-none"
              >
                {currencies.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.flag} {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
              <div className="mt-2 text-2xl font-bold text-blue-600">
                {formatCurrency(convertedAmount, toCurrency)}
              </div>
            </div>
          </div>

          {/* Exchange Rate Info */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Exchange Rate</h3>
                <p className="text-2xl font-bold text-blue-600">
                  1 {fromCurrency} = {(convertedAmount / (parseFloat(amount) || 1)).toFixed(4)} {toCurrency}
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1 text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">+0.25%</span>
                </div>
                <p className="text-xs text-gray-500">24h change</p>
              </div>
            </div>
          </div>

          {/* Quick Amounts */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Convert</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[1, 5, 10, 20, 50, 100, 500, 1000].map(quickAmount => (
                <button
                  key={quickAmount}
                  onClick={() => setAmount(quickAmount.toString())}
                  className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-center"
                >
                  <div className="font-semibold text-gray-900">{quickAmount}</div>
                  <div className="text-xs text-gray-500">{fromCurrency}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Favorites */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Star className="w-4 h-4 mr-2 text-yellow-500" />
              Favorite Currencies
            </h3>
            <div className="space-y-3">
              {favorites.map(currencyCode => {
                const currency = currencies.find(c => c.code === currencyCode);
                const rate = exchangeRates.find(r => r.to === currencyCode);
                
                if (!currency) return null;
                
                return (
                  <div key={currencyCode} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{currency.flag}</span>
                      <div>
                        <div className="font-medium text-gray-900">{currency.code}</div>
                        <div className="text-xs text-gray-500">{currency.name}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">
                        {currency.rate.toFixed(4)}
                      </div>
                      {rate && (
                        <div className={`text-xs flex items-center ${
                          rate.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {rate.change24h >= 0 ? (
                            <TrendingUp className="w-3 h-3 mr-1" />
                          ) : (
                            <TrendingDown className="w-3 h-3 mr-1" />
                          )}
                          {Math.abs(rate.change24h).toFixed(2)}%
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Market Trends */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <BarChart3 className="w-4 h-4 mr-2 text-blue-500" />
              Market Trends
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Strongest Today</span>
                <div className="flex items-center space-x-1 text-green-600">
                  <span className="font-medium">CHF</span>
                  <TrendingUp className="w-3 h-3" />
                  <span className="text-xs">+1.2%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Weakest Today</span>
                <div className="flex items-center space-x-1 text-red-600">
                  <span className="font-medium">GBP</span>
                  <TrendingDown className="w-3 h-3" />
                  <span className="text-xs">-0.8%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Most Volatile</span>
                <div className="flex items-center space-x-1 text-orange-600">
                  <span className="font-medium">BTC</span>
                  <BarChart3 className="w-3 h-3" />
                  <span className="text-xs">±3.5%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Last Updated */}
          <div className="bg-gray-50 rounded-2xl p-4">
            <div className="flex items-center space-x-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            </div>
          </div>

          {/* Offline Mode */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <h4 className="font-medium text-blue-900 mb-2">💡 Offline Mode</h4>
            <p className="text-sm text-blue-800 mb-3">
              Download exchange rates for offline use when traveling without internet.
            </p>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              Download Offline Rates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyCalculator;