/**
 * Nam Minh Color Palette
 * Main brand color: #0433c8 (RGB 4, 51, 200)
 */

export const NAMMINH_COLORS = {
  // Main Nam Minh Brand Colors
  brand: {
    blue: '#0433c8',
    blueLight: '#4f75ff',
    blueDark: '#032ba0',
    blueDarker: '#022378',
  },

  // Primary Color Scale (Based on Nam Minh Blue)
  primary: {
    50: '#f0f4ff',
    100: '#e0e8ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#0433c8', // Main Nam Minh blue
    800: '#032ba0',
    900: '#022378',
    950: '#01183a',
  },

  // Secondary Colors (Complementary Orange)
  secondary: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
    950: '#431407',
  },

  // Accent Colors (Light Blue/Cyan)
  accent: {
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee',
    500: '#06b6d4',
    600: '#0891b2',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
    950: '#083344',
  },

  // Neutral Colors (Gray Scale)
  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },

  // Status Colors (Using Nam Minh Blue as base)
  status: {
    success: {
      light: '#d1fae5',
      main: '#10b981',
      dark: '#047857',
    },
    warning: {
      light: '#fef3c7',
      main: '#f59e0b',
      dark: '#d97706',
    },
    error: {
      light: '#fee2e2',
      main: '#ef4444',
      dark: '#dc2626',
    },
    info: {
      light: '#e0e8ff', // Using Nam Minh primary-100
      main: '#0433c8',  // Nam Minh blue
      dark: '#022378',  // Nam Minh blue darker
    },
  },
} as const;

// CSS Custom Properties (for use in CSS/SCSS)
export const NAMMINH_CSS_VARS = {
  '--namminh-blue': NAMMINH_COLORS.brand.blue,
  '--namminh-blue-light': NAMMINH_COLORS.brand.blueLight,
  '--namminh-blue-dark': NAMMINH_COLORS.brand.blueDark,
  '--namminh-blue-darker': NAMMINH_COLORS.brand.blueDarker,
  
  '--namminh-primary-50': NAMMINH_COLORS.primary[50],
  '--namminh-primary-100': NAMMINH_COLORS.primary[100],
  '--namminh-primary-200': NAMMINH_COLORS.primary[200],
  '--namminh-primary-300': NAMMINH_COLORS.primary[300],
  '--namminh-primary-400': NAMMINH_COLORS.primary[400],
  '--namminh-primary-500': NAMMINH_COLORS.primary[500],
  '--namminh-primary-600': NAMMINH_COLORS.primary[600],
  '--namminh-primary-700': NAMMINH_COLORS.primary[700],
  '--namminh-primary-800': NAMMINH_COLORS.primary[800],
  '--namminh-primary-900': NAMMINH_COLORS.primary[900],
  '--namminh-primary-950': NAMMINH_COLORS.primary[950],
} as const;

// Tailwind CSS Classes (for easy reference)
export const NAMMINH_TAILWIND_CLASSES = {
  backgrounds: {
    primary: 'bg-primary-700',
    primaryLight: 'bg-primary-100',
    primaryDark: 'bg-primary-800',
    secondary: 'bg-secondary-500',
    accent: 'bg-accent-500',
    neutral: 'bg-neutral-100',
  },
  text: {
    primary: 'text-primary-700',
    primaryLight: 'text-primary-600',
    primaryDark: 'text-primary-800',
    onPrimary: 'text-white',
    secondary: 'text-secondary-700',
    neutral: 'text-neutral-700',
    muted: 'text-neutral-500',
  },
  borders: {
    primary: 'border-primary-700',
    secondary: 'border-secondary-500',
    neutral: 'border-neutral-200',
  },
  hover: {
    primary: 'hover:bg-primary-800',
    secondary: 'hover:bg-secondary-600',
    accent: 'hover:bg-accent-600',
  },
} as const;

// Helper functions
export const getNamminhColor = (color: keyof typeof NAMMINH_COLORS.primary, shade: keyof typeof NAMMINH_COLORS.primary = 700) => {
  return NAMMINH_COLORS.primary[shade];
};

export const getNamminhBrandColor = (variant: keyof typeof NAMMINH_COLORS.brand = 'blue') => {
  return NAMMINH_COLORS.brand[variant];
};

// RGB values for the main Nam Minh blue
export const NAMMINH_BLUE_RGB = {
  r: 4,
  g: 51,
  b: 200,
} as const;

// HSL values for the main Nam Minh blue
export const NAMMINH_BLUE_HSL = {
  h: 230,
  s: 96,
  l: 40,
} as const; 