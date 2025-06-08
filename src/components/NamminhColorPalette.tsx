import React from 'react';

interface ColorSwatch {
  name: string;
  value: string;
  className: string;
  textColor?: string;
}

interface ColorGroup {
  title: string;
  description: string;
  colors: ColorSwatch[];
}

const NamminhColorPalette: React.FC = () => {
  const colorGroups: ColorGroup[] = [
    {
      title: 'Nam Minh Primary Blue',
      description: 'Main brand color - #0433c8 (RGB 4, 51, 200)',
      colors: [
        { name: 'primary-50', value: '#f0f4ff', className: 'bg-primary-50', textColor: 'text-primary-900' },
        { name: 'primary-100', value: '#e0e8ff', className: 'bg-primary-100', textColor: 'text-primary-900' },
        { name: 'primary-200', value: '#c7d2fe', className: 'bg-primary-200', textColor: 'text-primary-900' },
        { name: 'primary-300', value: '#a5b4fc', className: 'bg-primary-300', textColor: 'text-primary-900' },
        { name: 'primary-400', value: '#818cf8', className: 'bg-primary-400', textColor: 'text-white' },
        { name: 'primary-500', value: '#6366f1', className: 'bg-primary-500', textColor: 'text-white' },
        { name: 'primary-600', value: '#4f46e5', className: 'bg-primary-600', textColor: 'text-white' },
        { name: 'primary-700', value: '#0433c8', className: 'bg-primary-700', textColor: 'text-white' },
        { name: 'primary-800', value: '#032ba0', className: 'bg-primary-800', textColor: 'text-white' },
        { name: 'primary-900', value: '#022378', className: 'bg-primary-900', textColor: 'text-white' },
        { name: 'primary-950', value: '#01183a', className: 'bg-primary-950', textColor: 'text-white' },
      ]
    },
    {
      title: 'Nam Minh Brand Colors',
      description: 'Direct brand color variants',
      colors: [
        { name: 'namminh-blue', value: '#0433c8', className: 'bg-namminh-blue', textColor: 'text-white' },
        { name: 'namminh-blue-light', value: '#4f75ff', className: 'bg-namminh-blue-light', textColor: 'text-white' },
        { name: 'namminh-blue-dark', value: '#032ba0', className: 'bg-namminh-blue-dark', textColor: 'text-white' },
        { name: 'namminh-blue-darker', value: '#022378', className: 'bg-namminh-blue-darker', textColor: 'text-white' },
      ]
    },
    {
      title: 'Secondary Colors',
      description: 'Complementary orange colors for accents and CTAs',
      colors: [
        { name: 'secondary-50', value: '#fff7ed', className: 'bg-secondary-50', textColor: 'text-secondary-900' },
        { name: 'secondary-100', value: '#ffedd5', className: 'bg-secondary-100', textColor: 'text-secondary-900' },
        { name: 'secondary-200', value: '#fed7aa', className: 'bg-secondary-200', textColor: 'text-secondary-900' },
        { name: 'secondary-300', value: '#fdba74', className: 'bg-secondary-300', textColor: 'text-secondary-900' },
        { name: 'secondary-400', value: '#fb923c', className: 'bg-secondary-400', textColor: 'text-white' },
        { name: 'secondary-500', value: '#f97316', className: 'bg-secondary-500', textColor: 'text-white' },
        { name: 'secondary-600', value: '#ea580c', className: 'bg-secondary-600', textColor: 'text-white' },
        { name: 'secondary-700', value: '#c2410c', className: 'bg-secondary-700', textColor: 'text-white' },
        { name: 'secondary-800', value: '#9a3412', className: 'bg-secondary-800', textColor: 'text-white' },
      ]
    },
    {
      title: 'Accent Colors',
      description: 'Light blue/cyan colors for highlights and links',
      colors: [
        { name: 'accent-50', value: '#ecfeff', className: 'bg-accent-50', textColor: 'text-accent-900' },
        { name: 'accent-100', value: '#cffafe', className: 'bg-accent-100', textColor: 'text-accent-900' },
        { name: 'accent-200', value: '#a5f3fc', className: 'bg-accent-200', textColor: 'text-accent-900' },
        { name: 'accent-300', value: '#67e8f9', className: 'bg-accent-300', textColor: 'text-accent-900' },
        { name: 'accent-400', value: '#22d3ee', className: 'bg-accent-400', textColor: 'text-white' },
        { name: 'accent-500', value: '#06b6d4', className: 'bg-accent-500', textColor: 'text-white' },
        { name: 'accent-600', value: '#0891b2', className: 'bg-accent-600', textColor: 'text-white' },
      ]
    },
    {
      title: 'Neutral Colors',
      description: 'Gray scale for text and backgrounds',
      colors: [
        { name: 'neutral-50', value: '#f8fafc', className: 'bg-neutral-50', textColor: 'text-neutral-900' },
        { name: 'neutral-100', value: '#f1f5f9', className: 'bg-neutral-100', textColor: 'text-neutral-900' },
        { name: 'neutral-200', value: '#e2e8f0', className: 'bg-neutral-200', textColor: 'text-neutral-900' },
        { name: 'neutral-300', value: '#cbd5e1', className: 'bg-neutral-300', textColor: 'text-neutral-900' },
        { name: 'neutral-400', value: '#94a3b8', className: 'bg-neutral-400', textColor: 'text-white' },
        { name: 'neutral-500', value: '#64748b', className: 'bg-neutral-500', textColor: 'text-white' },
        { name: 'neutral-600', value: '#475569', className: 'bg-neutral-600', textColor: 'text-white' },
        { name: 'neutral-700', value: '#334155', className: 'bg-neutral-700', textColor: 'text-white' },
        { name: 'neutral-800', value: '#1e293b', className: 'bg-neutral-800', textColor: 'text-white' },
        { name: 'neutral-900', value: '#0f172a', className: 'bg-neutral-900', textColor: 'text-white' },
      ]
    }
  ];

  const ButtonExamples: React.FC = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-neutral-800 mb-4">Button Examples</h3>
      <div className="flex flex-wrap gap-4">
        <button className="btn-namminh-primary">
          Primary Button
        </button>
        <button className="btn-namminh-secondary">
          Secondary Button
        </button>
        <button className="btn-namminh-outline">
          Outline Button
        </button>
      </div>
    </div>
  );

  const GradientExamples: React.FC = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-neutral-800 mb-4">Gradient Examples</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="namminh-gradient h-24 rounded-lg flex items-center justify-center text-white font-medium">
          Nam Minh Gradient
        </div>
        <div className="namminh-gradient-mesh h-24 rounded-lg flex items-center justify-center text-white font-medium">
          Nam Minh Gradient Mesh
        </div>
      </div>
    </div>
  );

  const GlassExamples: React.FC = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-neutral-800 mb-4">Glass Effect Examples</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
        <div className="namminh-gradient h-32 rounded-lg relative">
          <div className="namminh-glass absolute inset-4 rounded-lg flex items-center justify-center text-primary-700 font-medium">
            Nam Minh Glass Light
          </div>
        </div>
        <div className="namminh-gradient-mesh h-32 rounded-lg relative">
          <div className="namminh-glass-dark absolute inset-4 rounded-lg flex items-center justify-center text-white font-medium">
            Nam Minh Glass Dark
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary-700 mb-4">Nam Minh Color Palette</h1>
        <p className="text-lg text-neutral-600 mb-2">
          Primary Brand Color: <span className="font-mono font-semibold text-primary-700">#0433c8</span>
        </p>
        <p className="text-sm text-neutral-500">
          RGB: 4, 51, 200 | HSL: 230°, 96%, 40%
        </p>
      </div>

      {colorGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-neutral-800 mb-2">{group.title}</h2>
            <p className="text-neutral-600">{group.description}</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {group.colors.map((color, colorIndex) => (
              <div 
                key={colorIndex}
                className={`${color.className} rounded-lg p-4 text-center transition-transform hover:scale-105 cursor-pointer shadow-sm hover:shadow-md`}
                onClick={() => navigator.clipboard.writeText(color.value)}
                title={`Click to copy ${color.value}`}
              >
                <div className={`${color.textColor || 'text-white'} font-medium text-sm mb-1`}>
                  {color.name}
                </div>
                <div className={`${color.textColor || 'text-white'} text-xs opacity-80 font-mono`}>
                  {color.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="border-t border-neutral-200 pt-8 space-y-8">
        <ButtonExamples />
        <GradientExamples />
        <GlassExamples />
      </div>

      <div className="bg-neutral-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4">Usage Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-neutral-600">
          <div>
            <h4 className="font-medium text-neutral-800 mb-2">Primary Usage</h4>
            <ul className="space-y-1">
              <li>• Use <code className="bg-neutral-200 px-1 rounded">primary-700</code> for main brand elements</li>
              <li>• Use <code className="bg-neutral-200 px-1 rounded">primary-600</code> for hover states</li>
              <li>• Use <code className="bg-neutral-200 px-1 rounded">primary-100-200</code> for backgrounds</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-neutral-800 mb-2">Color Combinations</h4>
            <ul className="space-y-1">
              <li>• Primary + Neutral for professional layouts</li>
              <li>• Primary + Secondary for vibrant CTAs</li>
              <li>• Primary + Accent for interactive elements</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NamminhColorPalette; 