import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

// you can extend the theme and add custom colors, font styles, etc.
const colors = {
  navyBlue: '#1a365d',
  midnightBlue: '#153e75',
};

const fontWeights = {
  normal: 400,
  medium: 600,
  bold: 800,
};

const theme = extendTheme({ colors, fontWeights });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
