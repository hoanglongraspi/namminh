import React from 'react';

interface NamminhLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'compact' | 'icon';
  color?: 'light' | 'dark' | 'brand';
  className?: string;
}

const NamminhLogo: React.FC<NamminhLogoProps> = ({ 
  size = 'md', 
  variant = 'full', 
  color = 'brand',
  className = '' 
}) => {
  const sizeClasses = {
    sm: {
      container: 'h-8',
      mainText: 'text-2xl',
      brandText: 'text-xs',
      tagline: 'text-xs',
      star: 'w-2 h-2',
    },
    md: {
      container: 'h-12',
      mainText: 'text-4xl',
      brandText: 'text-sm',
      tagline: 'text-xs',
      star: 'w-3 h-3',
    },
    lg: {
      container: 'h-16',
      mainText: 'text-5xl',
      brandText: 'text-lg',
      tagline: 'text-sm',
      star: 'w-4 h-4',
    },
    xl: {
      container: 'h-24',
      mainText: 'text-7xl',
      brandText: 'text-2xl',
      tagline: 'text-base',
      star: 'w-6 h-6',
    }
  };

  const colorClasses = {
    light: {
      mainText: 'text-white',
      brandText: 'text-white/90',
      tagline: 'text-white/80',
      star: 'bg-white',
      starAccent: 'bg-accent-200',
    },
    dark: {
      mainText: 'text-primary-900',
      brandText: 'text-primary-800',
      tagline: 'text-primary-700',
      star: 'bg-primary-700',
      starAccent: 'bg-accent-500',
    },
    brand: {
      mainText: 'text-primary-700',
      brandText: 'text-primary-600',
      tagline: 'text-primary-500',
      star: 'bg-primary-700',
      starAccent: 'bg-accent-500',
    }
  };

  const currentSize = sizeClasses[size];
  const currentColor = colorClasses[color];

  // Icon variant - just the "NM" letters
  if (variant === 'icon') {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <span className={`${currentSize.mainText} ${currentColor.mainText} font-bold tracking-wider`}>
          NM
        </span>
      </div>
    );
  }

  // Compact variant - "NM" + "NAM MINH"
  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <span className={`${currentSize.mainText} ${currentColor.mainText} font-bold tracking-wider`}>
          NM
        </span>
        <div className="flex flex-col">
          <span className={`${currentSize.brandText} ${currentColor.brandText} font-light tracking-[0.2em] leading-tight`}>
            NAM MINH
          </span>
        </div>
      </div>
    );
  }

  // Full variant - Complete logo with all elements
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      {/* Main NM Letters */}
      <div className="relative mb-2">
        <span className={`${currentSize.mainText} ${currentColor.mainText} font-bold tracking-wider drop-shadow-sm`}>
          NM
        </span>
      </div>

      {/* Decorative star element */}
      <div className="flex justify-center mb-2">
        <div className="relative">
          <div className={`${currentSize.star} ${currentColor.star} transform rotate-45 opacity-80`}></div>
          <div className={`absolute inset-0 ${currentSize.star} ${currentColor.star} transform rotate-45 scale-50`}></div>
          <div className={`absolute inset-0 ${currentColor.starAccent} transform rotate-45 scale-50`} 
               style={{ 
                 width: `${parseInt(currentSize.star.split(' ')[1]) * 0.5}px`, 
                 height: `${parseInt(currentSize.star.split(' ')[3]) * 0.5}px`,
                 top: '25%',
                 left: '25%'
               }}></div>
        </div>
      </div>

      {/* Brand name */}
      <h2 className={`${currentSize.brandText} ${currentColor.brandText} font-light tracking-[0.3em] mb-1`}>
        NAM MINH
      </h2>

      {/* Tagline */}
      <p className={`${currentSize.tagline} ${currentColor.tagline} font-light tracking-[0.2em] opacity-90`}>
        MEDICAL SOLUTION
      </p>
    </div>
  );
};

// Animated version with gradient background (for special uses)
export const NamminhLogoAnimated: React.FC<Omit<NamminhLogoProps, 'color'>> = ({ 
  size = 'lg', 
  variant = 'full',
  className = '' 
}) => {
  return (
    <div className={`relative inline-block ${className}`}>
      {/* Gradient background */}
      <div className="absolute inset-0 namminh-gradient-mesh rounded-2xl -m-4 opacity-90"></div>
      
      {/* Logo content */}
      <div className="relative z-10 p-4">
        <NamminhLogo 
          size={size} 
          variant={variant} 
          color="light"
        />
      </div>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 namminh-gradient-mesh rounded-2xl -m-4 opacity-30 blur-xl"></div>
    </div>
  );
};

export default NamminhLogo; 