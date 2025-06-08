import React from 'react';
import NamminhLogo, { NamminhLogoAnimated } from '../components/NamminhLogo';
import NamminhHero from '../components/NamminhHero';

const LogoDemoPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <NamminhHero />

      {/* Logo Variations Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold namminh-text-gradient mb-4">
              Nam Minh Logo Variations
            </h2>
            <div className="namminh-section-divider w-32 mx-auto mb-4"></div>
            <p className="text-neutral-600 text-lg">
              Logo components inspired by your beautiful brand design
            </p>
          </div>

          {/* Logo Size Variations */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center p-6 bg-white rounded-xl shadow-soft">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">Small</h3>
              <NamminhLogo size="sm" variant="full" color="brand" />
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-soft">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">Medium</h3>
              <NamminhLogo size="md" variant="full" color="brand" />
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-soft">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">Large</h3>
              <NamminhLogo size="lg" variant="full" color="brand" />
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-soft">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">Extra Large</h3>
              <NamminhLogo size="xl" variant="full" color="brand" />
            </div>
          </div>

          {/* Logo Variants */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 bg-white rounded-xl shadow-soft">
              <h3 className="text-lg font-semibold text-neutral-800 mb-6">Full Logo</h3>
              <NamminhLogo size="lg" variant="full" color="brand" />
            </div>
            
            <div className="text-center p-8 bg-white rounded-xl shadow-soft">
              <h3 className="text-lg font-semibold text-neutral-800 mb-6">Compact Logo</h3>
              <NamminhLogo size="lg" variant="compact" color="brand" />
            </div>
            
            <div className="text-center p-8 bg-white rounded-xl shadow-soft">
              <h3 className="text-lg font-semibold text-neutral-800 mb-6">Icon Only</h3>
              <NamminhLogo size="lg" variant="icon" color="brand" />
            </div>
          </div>

          {/* Color Variants */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 bg-white rounded-xl shadow-soft">
              <h3 className="text-lg font-semibold text-neutral-800 mb-6">Brand Colors</h3>
              <NamminhLogo size="lg" variant="compact" color="brand" />
            </div>
            
            <div className="text-center p-8 namminh-geometric-bg rounded-xl shadow-soft">
              <h3 className="text-lg font-semibold text-white mb-6">Light (for dark backgrounds)</h3>
              <NamminhLogo size="lg" variant="compact" color="light" />
            </div>
            
            <div className="text-center p-8 bg-neutral-100 rounded-xl shadow-soft">
              <h3 className="text-lg font-semibold text-neutral-800 mb-6">Dark</h3>
              <NamminhLogo size="lg" variant="compact" color="dark" />
            </div>
          </div>

          {/* Animated Logo */}
          <div className="text-center mb-16">
            <h3 className="text-2xl font-semibold text-neutral-800 mb-8">Animated Logo with Background</h3>
            <div className="flex justify-center">
              <NamminhLogoAnimated size="xl" variant="full" />
            </div>
          </div>
        </div>
      </section>

      {/* Design Elements Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold namminh-text-gradient mb-4">
              Design Elements
            </h2>
            <div className="namminh-section-divider w-32 mx-auto mb-4"></div>
            <p className="text-neutral-600 text-lg">
              Components inspired by your logo design
            </p>
          </div>

          {/* Glass Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="h-48 namminh-geometric-bg rounded-xl relative overflow-hidden">
              <div className="namminh-card-glass absolute inset-4 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-xl font-semibold mb-2">Glass Card</h3>
                  <p className="text-white/80">Nam Minh inspired design</p>
                </div>
              </div>
            </div>

            <div className="h-48 namminh-gradient rounded-xl flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-xl font-semibold mb-2">Gradient Background</h3>
                <p className="text-white/80">Brand color gradient</p>
              </div>
            </div>

            <div className="h-48 namminh-gradient-mesh rounded-xl flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-xl font-semibold mb-2">Animated Mesh</h3>
                <p className="text-white/80">Dynamic gradient animation</p>
              </div>
            </div>
          </div>

          {/* Text Styles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="p-8 bg-neutral-50 rounded-xl">
              <h3 className="text-xl font-semibold text-neutral-800 mb-4">Gradient Text</h3>
              <h4 className="text-3xl font-bold namminh-text-gradient mb-2">NAM MINH</h4>
              <p className="text-lg text-primary-600">MEDICAL SOLUTION</p>
            </div>

            <div className="p-8 namminh-geometric-bg rounded-xl text-white">
              <h3 className="text-xl font-semibold mb-4">Hero Text Style</h3>
              <h4 className="text-3xl font-bold namminh-hero-text mb-2">NAM MINH</h4>
              <p className="text-lg text-white/80">MEDICAL SOLUTION</p>
            </div>
          </div>

          {/* Button Styles */}
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-neutral-800 mb-8">Nam Minh Buttons</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="btn-namminh-primary">Primary Button</button>
              <button className="btn-namminh-secondary">Secondary Button</button>
              <button className="btn-namminh-outline">Outline Button</button>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Guidelines */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold namminh-text-gradient mb-4">
              Logo Usage Guidelines
            </h2>
            <div className="namminh-section-divider w-32 mx-auto mb-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-soft">
              <h3 className="text-xl font-semibold text-neutral-800 mb-4">✅ Do's</h3>
              <ul className="space-y-2 text-neutral-600">
                <li>• Use the full logo when space permits</li>
                <li>• Maintain proper spacing around the logo</li>
                <li>• Use brand colors for consistency</li>
                <li>• Use compact version for small spaces</li>
                <li>• Use light version on dark backgrounds</li>
                <li>• Keep the star element aligned</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-soft">
              <h3 className="text-xl font-semibold text-neutral-800 mb-4">❌ Don'ts</h3>
              <ul className="space-y-2 text-neutral-600">
                <li>• Don't distort the logo proportions</li>
                <li>• Don't change the color scheme</li>
                <li>• Don't remove the star element</li>
                <li>• Don't use on low-contrast backgrounds</li>
                <li>• Don't rotate or skew the logo</li>
                <li>• Don't make it too small to read</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LogoDemoPage; 