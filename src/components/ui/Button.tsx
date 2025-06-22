import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}) => {
  const baseStyles = "font-medium rounded-lg transition-all duration-200 flex items-center justify-center";
  
  const variantStyles = {
    primary: "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-md",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    outline: "border-2 border-gray-300 text-gray-700 hover:bg-gray-50",
    ghost: "text-gray-700 hover:bg-gray-100",
    danger: "bg-red-600 text-white hover:bg-red-700"
  };
  
  const sizeStyles = {
    sm: "text-sm px-3 py-1.5 space-x-1.5",
    md: "px-4 py-2 space-x-2",
    lg: "text-lg px-6 py-3 space-x-3"
  };
  
  const isDisabled = disabled || isLoading;
  
  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        isDisabled && "opacity-50 cursor-not-allowed",
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {isLoading ? (
        <>
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {leftIcon && <span>{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span>{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;