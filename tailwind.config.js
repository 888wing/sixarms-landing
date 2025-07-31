/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#0A0A0A',
        'dark-gray': '#1A1A1A',
        'medium-gray': '#2D2D2D',
        'light-gray': '#808080',
        accent: '#FF6B6B',
        'accent-light': '#FF8787',
        success: '#4ECDC4',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-glow': 'radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%)',
      },
      animation: {
        float: 'float 20s ease-in-out infinite',
        slideIn: 'slideIn 0.5s ease-out',
        pulse: 'pulse 2s ease-in-out infinite',
        blink: 'blink 1s ease-in-out infinite',
        typewriter: 'typewriter 2s steps(40) 1s forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '33%': { transform: 'translate(30px, -30px) rotate(120deg)' },
          '66%': { transform: 'translate(-20px, 20px) rotate(240deg)' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        typewriter: {
          from: { width: '0' },
          to: { width: '100%' },
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        'fluid-xs': 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
        'fluid-sm': 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)',
        'fluid-base': 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 1rem + 0.625vw, 1.25rem)',
        'fluid-xl': 'clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)',
        'fluid-2xl': 'clamp(1.5rem, 1.3rem + 1vw, 2rem)',
        'fluid-3xl': 'clamp(2rem, 1.7rem + 1.5vw, 3rem)',
        'fluid-4xl': 'clamp(2.5rem, 2rem + 2.5vw, 4rem)',
        'fluid-5xl': 'clamp(3rem, 2.5rem + 3.5vw, 6rem)',
      },
    },
  },
  plugins: [],
}