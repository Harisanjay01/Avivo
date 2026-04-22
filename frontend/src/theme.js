import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      50:  '#f0e6ff',
      100: '#d4b3ff',
      200: '#b97fff',
      300: '#9d4cff',
      400: '#8019ff',
      500: '#6600e6',
      600: '#4f00b3',
      700: '#380080',
      800: '#21004d',
      900: '#0b001a',
    },
  },
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: '#0d0d1a',
        color: 'whiteAlpha.900',
      },
      '::-webkit-scrollbar': { width: '6px' },
      '::-webkit-scrollbar-track': { background: '#1a1a2e' },
      '::-webkit-scrollbar-thumb': { background: '#6600e6', borderRadius: '3px' },
    },
  },
  components: {
    Button: {
      variants: {
        brand: {
          bg: 'brand.500',
          color: 'white',
          _hover: { bg: 'brand.400', transform: 'translateY(-1px)', boxShadow: '0 4px 20px rgba(102,0,230,0.5)' },
          _active: { bg: 'brand.600' },
          transition: 'all 0.2s ease',
        },
      },
    },
  },
});

export default theme;
