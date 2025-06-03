import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  className = '',
  children,
  ...props
}) => {
  const baseClasses = 
    'inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transform-gpu relative overflow-hidden group';

  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 active:from-blue-800 active:to-blue-900 focus-visible:ring-blue-500 shadow-lg hover:shadow-xl hover:-translate-y-0.5 hover:scale-[1.02]',
    secondary: 'bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 active:from-teal-700 active:to-teal-800 focus-visible:ring-teal-500 shadow-lg hover:shadow-xl hover:-translate-y-0.5 hover:scale-[1.02]',
    outline: 'border-2 border-blue-600 bg-transparent hover:bg-blue-50 active:bg-blue-100 text-blue-700 focus-visible:ring-blue-500 shadow-soft hover:shadow-medium',
    ghost: 'bg-transparent hover:bg-blue-50 active:bg-blue-100 text-blue-700 focus-visible:ring-blue-500',
    gradient: 'bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 hover:from-blue-600 hover:via-teal-600 hover:to-purple-600 shadow-glow hover:shadow-glow-lg hover:-translate-y-1 hover:scale-105 focus-visible:ring-purple-500',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-2.5',
    xl: 'px-10 py-5 text-xl gap-3',
  };

  const colorClasses = variant === 'outline' || variant === 'ghost' 
    ? '' 
    : 'text-white';

  const widthClass = fullWidth ? 'w-full' : '';

  const classes = [
    baseClasses,
    variants[variant],
    sizes[size],
    colorClasses,
    widthClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <button className={classes} {...props}>
      {/* Shimmer effect for gradient variant */}
      {variant === 'gradient' && (
        <div className="absolute inset-0 -top-1 -bottom-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500"></div>
      )}
      
      <span className="relative flex items-center justify-center gap-2">
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </span>
    </button>
  );
};

export default Button;