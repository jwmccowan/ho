import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import TopNav from "../components/molecules/TopNav";
import "../styles/global.css";
import theme from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <TopNav />
      <main>
        <Component {...pageProps} />
      </main>
    </ChakraProvider>
  );
}

export default MyApp;
