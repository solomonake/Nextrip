import React, { useState } from 'react';
import { cn } from '../../utils/cn';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline' | 'contained';
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'default',
  className,
}) => {
  const getTabStyles = (tabId: string) => {
    const isActive = activeTab === tabId;
    
    switch (variant) {
      case 'pills':
        return isActive
          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100';
      
      case 'underline':
        return isActive
          ? 'text-blue-600 border-b-2 border-blue-600'
          : 'text-gray-600 hover:text-gray-900 border-b-2 border-transparent';
      
      case 'contained':
        return isActive
          ? 'bg-white text-blue-600 shadow-sm'
          : 'text-gray-600 hover:text-gray-900';
      
      default:
        return isActive
          ? 'bg-blue-100 text-blue-700'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100';
    }
  };
  
  const containerStyles = {
    default: 'flex space-x-1',
    pills: 'flex space-x-1',
    underline: 'flex space-x-6 border-b border-gray-200',
    contained: 'flex space-x-1 bg-gray-100 p-1 rounded-lg',
  };
  
  return (
    <div className={cn(containerStyles[variant], className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
            getTabStyles(tab.id)
          )}
        >
          {tab.icon && <span>{tab.icon}</span>}
          <span>{tab.label}</span>
          {tab.count !== undefined && (
            <span className="bg-white bg-opacity-20 px-1.5 py-0.5 rounded-full text-xs">
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default Tabs;