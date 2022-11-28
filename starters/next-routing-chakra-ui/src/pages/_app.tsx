import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

// you can extend the theme and add custom colors, font styles, etc.
const colors = {
  brand: {
    50: "#1a365d",
    100: "#153e75",
    500: "#2464ec",
  },
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
