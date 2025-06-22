import React from 'react';
import { motion } from 'framer-motion';
import { 
  Leaf, 
  Zap, 
  Droplets, 
  Recycle, 
  Award,
  TrendingUp,
  Info
} from 'lucide-react';

interface SustainabilityMetrics {
  overallScore: number;
  carbonFootprint: number;
  energyEfficiency: number;
  waterConservation: number;
  wasteReduction: number;
  localSourcing: number;
  certifications: string[];
  offsetOptions: OffsetOption[];
}

interface OffsetOption {
  id: string;
  type: 'forest' | 'renewable' | 'community';
  title: string;
  description: string;
  cost: number;
  impact: string;
}

interface SustainabilityScoreProps {
  type: 'hotel' | 'flight' | 'activity';
  itemName: string;
  metrics?: SustainabilityMetrics;
}

const SustainabilityScore: React.FC<SustainabilityScoreProps> = ({ 
  type, 
  itemName, 
  metrics 
}) => {
  // Mock data if no metrics provided
  const defaultMetrics: SustainabilityMetrics = {
    overallScore: Math.floor(Math.random() * 40) + 60, // 60-100 range
    carbonFootprint: Math.floor(Math.random() * 30) + 70,
    energyEfficiency: Math.floor(Math.random() * 25) + 75,
    waterConservation: Math.floor(Math.random() * 35) + 65,
    wasteReduction: Math.floor(Math.random() * 30) + 70,
    localSourcing: Math.floor(Math.random() * 40) + 60,
    certifications: ['LEED Gold', 'Green Key', 'EarthCheck'],
    offsetOptions: [
      {
        id: '1',
        type: 'forest',
        title: 'Forest Restoration',
        description: 'Plant trees in deforested areas',
        cost: 12,
        impact: 'Offsets 1.2 tons CO2'
      },
      {
        id: '2',
        type: 'renewable',
        title: 'Solar Energy Project',
        description: 'Support renewable energy infrastructure',
        cost: 8,
        impact: 'Offsets 0.8 tons CO2'
      },
      {
        id: '3',
        type: 'community',
        title: 'Clean Cooking Stoves',
        description: 'Provide efficient stoves to rural communities',
        cost: 15,
        impact: 'Offsets 1.5 tons CO2'
      }
    ]
  };

  const data = metrics || defaultMetrics;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreGrade = (score: number) => {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    return 'D';
  };

  const getOffsetIcon = (type: string) => {
    switch (type) {
      case 'forest': return '🌳';
      case 'renewable': return '⚡';
      case 'community': return '🏘️';
      default: return '🌱';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-6"
    >
      <div className="flex items-center mb-6">
        <Leaf className="w-6 h-6 text-green-600 mr-3" />
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Sustainability Score</h3>
          <p className="text-sm text-gray-600">{itemName}</p>
        </div>
      </div>

      {/* Overall Score */}
      <div className="text-center mb-6">
        <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full text-3xl font-bold ${getScoreColor(data.overallScore)}`}>
          {getScoreGrade(data.overallScore)}
        </div>
        <div className="mt-2">
          <div className="text-2xl font-bold text-gray-900">{data.overallScore}/100</div>
          <div className="text-sm text-gray-600">Sustainability Score</div>
        </div>
      </div>

      {/* Metrics Breakdown */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium">Energy Efficiency</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-20 h-2 bg-gray-200 rounded-full">
              <div 
                className="h-2 bg-yellow-500 rounded-full"
                style={{ width: `${data.energyEfficiency}%` }}
              />
            </div>
            <span className="text-sm font-medium">{data.energyEfficiency}%</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Droplets className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium">Water Conservation</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-20 h-2 bg-gray-200 rounded-full">
              <div 
                className="h-2 bg-blue-500 rounded-full"
                style={{ width: `${data.waterConservation}%` }}
              />
            </div>
            <span className="text-sm font-medium">{data.waterConservation}%</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Recycle className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium">Waste Reduction</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-20 h-2 bg-gray-200 rounded-full">
              <div 
                className="h-2 bg-green-500 rounded-full"
                style={{ width: `${data.wasteReduction}%` }}
              />
            </div>
            <span className="text-sm font-medium">{data.wasteReduction}%</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium">Local Sourcing</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-20 h-2 bg-gray-200 rounded-full">
              <div 
                className="h-2 bg-purple-500 rounded-full"
                style={{ width: `${data.localSourcing}%` }}
              />
            </div>
            <span className="text-sm font-medium">{data.localSourcing}%</span>
          </div>
        </div>
      </div>

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
            <Award className="w-4 h-4 mr-2" />
            Certifications
          </h4>
          <div className="flex flex-wrap gap-2">
            {data.certifications.map((cert, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Carbon Offset Options */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Carbon Offset Options</h4>
        <div className="space-y-3">
          {data.offsetOptions.map((option) => (
            <div
              key={option.id}
              className="p-3 border border-gray-200 rounded-lg hover:border-green-300 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">{getOffsetIcon(option.type)}</span>
                  <div>
                    <h5 className="font-medium text-sm">{option.title}</h5>
                    <p className="text-xs text-gray-600 mt-1">{option.description}</p>
                    <p className="text-xs text-green-600 font-medium mt-1">{option.impact}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">${option.cost}</div>
                  <button className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 transition-colors">
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-3 bg-green-50 rounded-lg">
        <div className="flex items-start space-x-2">
          <Info className="w-4 h-4 text-green-600 mt-0.5" />
          <div className="text-xs text-green-700">
            <p className="font-medium">Sustainability Impact</p>
            <p>Choosing eco-friendly options helps preserve destinations for future travelers and supports local communities.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SustainabilityScore;