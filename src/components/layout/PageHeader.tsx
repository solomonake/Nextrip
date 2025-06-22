import React from 'react';
import { cn } from '../../utils/cn';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  actions,
  className,
}) => {
  return (
    <div className={cn('mb-8', className)}>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          {description && <p className="text-lg text-gray-600">{description}</p>}
        </div>
        
        {actions && (
          <div className="mt-4 lg:mt-0 flex flex-wrap gap-3">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;