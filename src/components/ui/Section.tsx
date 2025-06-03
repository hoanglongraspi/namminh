import React from 'react';
import Container from './Container';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  title?: string;
  subtitle?: string;
  centered?: boolean;
  fullWidth?: boolean;
}

const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  id,
  title,
  subtitle,
  centered = false,
  fullWidth = false,
}) => {
  const ContentWrapper = fullWidth ? React.Fragment : Container;

  return (
    <section
      id={id}
      className={`py-12 md:py-16 lg:py-20 ${className}`}
    >
      <ContentWrapper>
        {(title || subtitle) && (
          <div className={`mb-12 ${centered ? 'text-center mx-auto max-w-3xl' : ''}`}>
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-gray-600 max-w-3xl">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </ContentWrapper>
    </section>
  );
};

export default Section;