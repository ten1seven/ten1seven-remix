// const plugins = require('@viget/tailwindcss-plugins')
const {
  rem,
  remPair,
  pxPair,
} = require('@viget/tailwindcss-plugins/utilities/fns')

module.exports = {
  content: ['./app/**/*.jsx'],
  darkMode: 'media',
  mode: 'jit',
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000',
      white: '#fff',
      purple: '#639',
      blue: '#1a709f',
      red: '#bf371f',
      gray: {
        lightest: '#eee',
        light: '#ddd',
        medium: '#707070',
        dark: '#444',
        darker: '#696969',
      },
    },
    fontFamily: {
      khula: ['Khula', 'sans-serif'],
      sans: ['Helvetica', 'Helvetica Neue', 'Arial', 'sans-serif'],
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    },
    fontWeight: {
      light: '300',
      normal: '400',
      bold: '700',
    },
    maxWidth: {
      full: '100%',
      ...remPair(900),
    },
    extend: {},
  },
  variants: {
    extend: {
      padding: ['group-hover'],
    },
  },
  plugins: [],
}
