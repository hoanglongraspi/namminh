import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '',
  hover = false
}) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden ${
        hover ? 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className = '', 
  children 
}) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};

export const CardContent: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className = '', 
  children 
}) => {
  return <div className={`p-4 pt-0 ${className}`}>{children}</div>;
};

export const CardFooter: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className = '', 
  children 
}) => {
  return <div className={`p-4 pt-0 ${className}`}>{children}</div>;
};

export default Card;