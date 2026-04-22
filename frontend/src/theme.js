import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: { bg: '#0d0d1a', color: 'white' },
      '::-webkit-scrollbar': { width: '4px' },
      '::-webkit-scrollbar-thumb': { background: 'purple.500', borderRadius: '10px' }
    }
  }
});

export default theme;
