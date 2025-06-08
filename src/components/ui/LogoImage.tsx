import React from 'react';
import { Link } from 'react-router-dom';

interface LogoImageProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  withGlow?: boolean;
  href?: string;
  showText?: boolean;
  rounded?: boolean | 'full';
  variant?: 'light' | 'dark';
}

const LogoImage: React.FC<LogoImageProps> = ({ 
  size = 'md', 
  className = '', 
  withGlow = false,
  href,
  showText = false,
  rounded = true,
  variant = 'light'
}) => {
  const sizeClasses = {
    sm: 'h-8 sm:h-10',
    md: 'h-10 sm:h-12',
    lg: 'h-12 sm:h-16',
    xl: 'h-16 sm:h-20'
  };

  const textSizeClasses = {
    sm: 'text-lg sm:text-xl',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
    xl: 'text-3xl sm:text-4xl'
  };

  const getRoundedClasses = () => {
    if (rounded === 'full') return 'rounded-full';
    if (rounded === true) return 'rounded-2xl';
    return '';
  };

  const getTextColorClasses = () => {
    if (variant === 'dark') {
      return {
        primary: 'text-white',
        secondary: 'text-primary-200'
      };
    }
    return {
      primary: 'text-primary-700',
      secondary: 'text-primary-600'
    };
  };

  const logoElement = (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        {withGlow && (
          <div className={`absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 ${getRoundedClasses()} blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
        )}
        <img 
          src="/image.png" 
          alt="Nam Minh Medical Solution Logo"
          className={`relative ${sizeClasses[size]} w-auto ${getRoundedClasses()} transition-all duration-300 transform group-hover:scale-105 drop-shadow-md`}
        />
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <span className={`${textSizeClasses[size]} font-bold ${getTextColorClasses().primary} leading-tight tracking-wide`}>
            Nam Minh
          </span>
          <span className={`${size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : size === 'lg' ? 'text-base' : 'text-lg'} font-medium ${getTextColorClasses().secondary} tracking-widest uppercase`}>
            Med
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link to={href} className="flex items-center group">
        {logoElement}
      </Link>
    );
  }

  return logoElement;
};

export default LogoImage; 