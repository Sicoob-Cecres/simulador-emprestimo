import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import { SimuladorProvider } from "../contexts/SimuladorContext";

import { customTheme } from "../styles/theme";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <ChakraProvider theme={customTheme}>
        <Layout>
          <SimuladorProvider>
            <Component {...pageProps} />
          </SimuladorProvider>
        </Layout>  
      </ChakraProvider>
  );
}

export default MyApp;
