/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  // Configure dark mode to be toggled manually with a 'dark' class
  darkMode: 'class',

  // Specify the files to scan for Tailwind classes
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  // Define and extend the default theme
  theme: {
    extend: {
      // Add custom animation delay values
      animationDelay: {
        2000: '2000ms',
        4000: '4000ms',
      },
      // You can also add custom animations, colors, etc. here
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },

  // Add custom plugins
  plugins: [
    // Plugin to add the animation-delay utility
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'animation-delay': (value) => ({
            'animation-delay': value,
          }),
        },
        { values: theme('animationDelay') }
      );
    }),
  ],
};
