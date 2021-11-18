import type { AppProps } from "next/app";
import useAppAuthentication from "../hooks/use-app-authentication";
import "../styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  useAppAuthentication();
  return <Component {...pageProps} />;
}

export default MyApp;
