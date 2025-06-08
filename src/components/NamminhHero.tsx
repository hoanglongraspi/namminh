import React from 'react';

const NamminhHero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient inspired by logo */}
      <div className="absolute inset-0 namminh-gradient-mesh"></div>
      
      {/* Geometric shapes inspired by logo */}
      <div className="absolute inset-0">
        {/* Large geometric shape - top right */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary-600/30 rounded-full blur-3xl"></div>
        
        {/* Medium geometric shape - bottom left */}
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-primary-400/20 rounded-full blur-2xl"></div>
        
        {/* Small geometric shape - center */}
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-accent-400/30 rounded-full blur-xl"></div>
        
        {/* Diagonal lines inspired by logo background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-white/5 to-transparent transform -skew-y-12"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-white/3 to-transparent transform -skew-y-6"></div>
        </div>
      </div>

      {/* Main content inspired by logo typography */}
      <div className="relative z-10 text-center text-white px-6">
        {/* Large NM/Logo text */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-bold tracking-wider mb-4 drop-shadow-2xl">
            <span className="inline-block transform hover:scale-105 transition-transform duration-300">N</span>
            <span className="inline-block transform hover:scale-105 transition-transform duration-300 delay-75">M</span>
          </h1>
          
          {/* Decorative star element inspired by logo */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-6 h-6 bg-white transform rotate-45 opacity-80"></div>
              <div className="absolute inset-0 w-6 h-6 bg-white transform rotate-45 scale-50"></div>
              <div className="absolute inset-0 w-3 h-3 bg-accent-200 transform rotate-45 top-1.5 left-1.5"></div>
            </div>
          </div>
        </div>

        {/* Brand name inspired by logo */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.3em] mb-4 namminh-text-shadow-lg">
          NAM MINH
        </h2>

        {/* Tagline inspired by logo */}
        <p className="text-lg md:text-xl lg:text-2xl font-light tracking-[0.2em] opacity-90 mb-12">
          MEDICAL SOLUTION
        </p>

        {/* Call to action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn-namminh-primary text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
            Explore Solutions
          </button>
          <button className="btn-namminh-outline bg-white/10 backdrop-blur-sm text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300">
            Learn More
          </button>
        </div>
      </div>

      {/* Floating elements for added visual interest */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="animate-float absolute top-1/4 left-1/6 w-4 h-4 bg-white/20 rounded-full"></div>
        <div className="animate-float absolute top-2/3 right-1/5 w-3 h-3 bg-accent-300/30 rounded-full animation-delay-300"></div>
        <div className="animate-float absolute bottom-1/4 left-1/3 w-2 h-2 bg-white/15 rounded-full animation-delay-500"></div>
      </div>
    </section>
  );
};

export default NamminhHero; 