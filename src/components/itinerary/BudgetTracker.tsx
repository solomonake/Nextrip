import React from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Plane, 
  Building, 
  Utensils, 
  Camera, 
  Car,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { Trip } from '../../contexts/TripContext';

interface BudgetTrackerProps {
  trip: Trip;
}

const BudgetTracker: React.FC<BudgetTrackerProps> = ({ trip }) => {
  const { budget } = trip;
  const spentPercentage = (budget.spent / budget.total) * 100;
  const remaining = budget.total - budget.spent;

  const categories = [
    { 
      key: 'flights', 
      label: 'Flights', 
      icon: Plane, 
      color: 'blue',
      allocated: budget.categories.flights,
      spent: Math.round(budget.categories.flights * 0.3) // Mock spent amount
    },
    { 
      key: 'hotels', 
      label: 'Hotels', 
      icon: Building, 
      color: 'purple',
      allocated: budget.categories.hotels,
      spent: Math.round(budget.categories.hotels * 0.6)
    },
    { 
      key: 'food', 
      label: 'Food & Dining', 
      icon: Utensils, 
      color: 'orange',
      allocated: budget.categories.food,
      spent: Math.round(budget.categories.food * 0.4)
    },
    { 
      key: 'activities', 
      label: 'Activities', 
      icon: Camera, 
      color: 'green',
      allocated: budget.categories.activities,
      spent: Math.round(budget.categories.activities * 0.2)
    },
    { 
      key: 'transport', 
      label: 'Transport', 
      icon: Car, 
      color: 'gray',
      allocated: budget.categories.transport,
      spent: Math.round(budget.categories.transport * 0.8)
    }
  ];

  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
  const actualSpentPercentage = (totalSpent / budget.total) * 100;

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-700 border-blue-200',
      purple: 'bg-purple-100 text-purple-700 border-purple-200',
      orange: 'bg-orange-100 text-orange-700 border-orange-200',
      green: 'bg-green-100 text-green-700 border-green-200',
      gray: 'bg-gray-100 text-gray-700 border-gray-200'
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  const getProgressColor = (spent: number, allocated: number) => {
    const percentage = (spent / allocated) * 100;
    if (percentage > 90) return 'bg-red-500';
    if (percentage > 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-6">
      {/* Budget Overview */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Budget Overview</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">${budget.total.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Budget</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">${totalSpent.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Spent</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">${(budget.total - totalSpent).toLocaleString()}</div>
            <div className="text-sm text-gray-600">Remaining</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Budget Usage</span>
            <span className="text-sm text-gray-600">{actualSpentPercentage.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${actualSpentPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-3 rounded-full ${
                actualSpentPercentage > 90 ? 'bg-red-500' :
                actualSpentPercentage > 70 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
            />
          </div>
        </div>

        {/* Budget Status */}
        <div className={`flex items-center space-x-2 p-3 rounded-lg ${
          actualSpentPercentage > 90 ? 'bg-red-50 text-red-700' :
          actualSpentPercentage > 70 ? 'bg-yellow-50 text-yellow-700' :
          'bg-green-50 text-green-700'
        }`}>
          {actualSpentPercentage > 90 ? (
            <AlertTriangle className="w-5 h-5" />
          ) : (
            <CheckCircle className="w-5 h-5" />
          )}
          <span className="text-sm font-medium">
            {actualSpentPercentage > 90 ? 'Budget Alert: You\'re close to your limit' :
             actualSpentPercentage > 70 ? 'Budget Warning: Monitor your spending' :
             'Budget Status: On track'}
          </span>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Category Breakdown</h3>
        
        <div className="space-y-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const spentPercentage = (category.spent / category.allocated) * 100;
            const colorClasses = getColorClasses(category.color);
            
            return (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`p-4 rounded-lg border-2 ${colorClasses}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{category.label}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      ${category.spent} / ${category.allocated}
                    </div>
                    <div className="text-xs opacity-75">
                      {spentPercentage.toFixed(1)}% used
                    </div>
                  </div>
                </div>
                
                <div className="w-full bg-white bg-opacity-50 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(spentPercentage, 100)}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className={`h-2 rounded-full ${getProgressColor(category.spent, category.allocated)}`}
                  />
                </div>
                
                <div className="mt-2 text-xs opacity-75">
                  ${category.allocated - category.spent} remaining
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Spending Insights */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Spending Insights</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Top Spending Categories</h4>
            {categories
              .sort((a, b) => b.spent - a.spent)
              .slice(0, 3)
              .map((category, index) => {
                const Icon = category.icon;
                return (
                  <div key={category.key} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon className="w-4 h-4 text-gray-600" />
                      <span className="text-sm">{category.label}</span>
                    </div>
                    <span className="text-sm font-medium">${category.spent}</span>
                  </div>
                );
              })}
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Budget Recommendations</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-start space-x-2">
                <TrendingUp className="w-4 h-4 text-green-600 mt-0.5" />
                <span>You're doing well with activity spending</span>
              </div>
              <div className="flex items-start space-x-2">
                <TrendingDown className="w-4 h-4 text-orange-600 mt-0.5" />
                <span>Consider reducing hotel costs for more activities</span>
              </div>
              <div className="flex items-start space-x-2">
                <DollarSign className="w-4 h-4 text-blue-600 mt-0.5" />
                <span>Set aside 10% for unexpected expenses</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetTracker;