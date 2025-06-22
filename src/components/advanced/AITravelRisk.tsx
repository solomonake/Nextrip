import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  Shield, 
  Cloud, 
  Activity, 
  Globe,
  TrendingUp,
  TrendingDown,
  Info,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface RiskAssessment {
  destination: string;
  overallRisk: 'low' | 'medium' | 'high';
  healthRisk: number;
  weatherRisk: number;
  politicalRisk: number;
  safetyRisk: number;
  recommendations: string[];
  alerts: Alert[];
}

interface Alert {
  id: string;
  type: 'health' | 'weather' | 'political' | 'safety';
  severity: 'info' | 'warning' | 'critical';
  title: string;
  description: string;
  date: Date;
}

interface AITravelRiskProps {
  destination: string;
  travelDate: Date;
}

const AITravelRisk: React.FC<AITravelRiskProps> = ({ destination, travelDate }) => {
  const [riskAssessment, setRiskAssessment] = useState<RiskAssessment | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate AI risk assessment
    const generateRiskAssessment = (): RiskAssessment => {
      const risks = {
        health: Math.random() * 100,
        weather: Math.random() * 100,
        political: Math.random() * 100,
        safety: Math.random() * 100
      };

      const overallScore = (risks.health + risks.weather + risks.political + risks.safety) / 4;
      const overallRisk = overallScore < 30 ? 'low' : overallScore < 70 ? 'medium' : 'high';

      return {
        destination,
        overallRisk,
        healthRisk: risks.health,
        weatherRisk: risks.weather,
        politicalRisk: risks.political,
        safetyRisk: risks.safety,
        recommendations: [
          'Consider travel insurance for medical emergencies',
          'Check visa requirements and passport validity',
          'Monitor weather conditions closer to travel date',
          'Register with your embassy if staying long-term'
        ],
        alerts: [
          {
            id: '1',
            type: 'weather',
            severity: 'warning',
            title: 'Monsoon Season Approaching',
            description: 'Heavy rainfall expected during your travel period. Pack waterproof gear.',
            date: new Date()
          },
          {
            id: '2',
            type: 'health',
            severity: 'info',
            title: 'Vaccination Recommended',
            description: 'Hepatitis A vaccination recommended for this destination.',
            date: new Date()
          }
        ]
      };
    };

    setTimeout(() => {
      setRiskAssessment(generateRiskAssessment());
      setIsLoading(false);
    }, 1500);
  }, [destination, travelDate]);

  const getRiskColor = (risk: number) => {
    if (risk < 30) return 'text-green-600 bg-green-100';
    if (risk < 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getOverallRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'high': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getAlertIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return XCircle;
      case 'warning': return AlertTriangle;
      case 'info': return Info;
      default: return CheckCircle;
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'info': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!riskAssessment) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-6"
    >
      <div className="flex items-center mb-6">
        <Shield className="w-6 h-6 text-blue-600 mr-3" />
        <h3 className="text-xl font-semibold text-gray-900">AI Travel Risk Assessment</h3>
      </div>

      {/* Overall Risk */}
      <div className={`p-4 rounded-lg border-2 mb-6 ${getOverallRiskColor(riskAssessment.overallRisk)}`}>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-lg">Overall Risk Level</h4>
            <p className="text-sm opacity-75">Based on current conditions for {destination}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold capitalize">{riskAssessment.overallRisk}</div>
            <div className="text-xs opacity-75">Risk Level</div>
          </div>
        </div>
      </div>

      {/* Risk Categories */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium">Health Risk</span>
            </div>
            <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(riskAssessment.healthRisk)}`}>
              {Math.round(riskAssessment.healthRisk)}%
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Cloud className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Weather Risk</span>
            </div>
            <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(riskAssessment.weatherRisk)}`}>
              {Math.round(riskAssessment.weatherRisk)}%
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium">Political Risk</span>
            </div>
            <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(riskAssessment.politicalRisk)}`}>
              {Math.round(riskAssessment.politicalRisk)}%
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">Safety Risk</span>
            </div>
            <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(riskAssessment.safetyRisk)}`}>
              {Math.round(riskAssessment.safetyRisk)}%
            </span>
          </div>
        </div>
      </div>

      {/* Active Alerts */}
      {riskAssessment.alerts.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Active Alerts</h4>
          <div className="space-y-2">
            {riskAssessment.alerts.map((alert) => {
              const AlertIcon = getAlertIcon(alert.severity);
              return (
                <div
                  key={alert.id}
                  className={`p-3 rounded-lg border ${getAlertColor(alert.severity)}`}
                >
                  <div className="flex items-start space-x-3">
                    <AlertIcon className="w-4 h-4 mt-0.5" />
                    <div className="flex-1">
                      <h5 className="font-medium text-sm">{alert.title}</h5>
                      <p className="text-xs opacity-75 mt-1">{alert.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">AI Recommendations</h4>
        <div className="space-y-2">
          {riskAssessment.recommendations.map((recommendation, index) => (
            <div key={index} className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
              <span className="text-sm text-gray-700">{recommendation}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-blue-700">
          <strong>Note:</strong> Risk assessments are updated in real-time using AI analysis of global data sources. 
          Always check official government travel advisories before traveling.
        </p>
      </div>
    </motion.div>
  );
};

export default AITravelRisk;