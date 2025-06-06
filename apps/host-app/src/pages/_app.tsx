import "./globals.css";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import store from "@/presentation/store";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
          <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
