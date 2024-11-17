import "../styles/globals.css";
import RootLayout from "./layout";
import ProductsContextProvider from "../store/context/products-context";
import { NotificationContextProvider } from "@/store/context/notification-context";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import store from "@/store/redux";



function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
          <NotificationContextProvider>
            <ProductsContextProvider>
              <RootLayout>
                <Component {...pageProps} />
              </RootLayout>
            </ProductsContextProvider>
          </NotificationContextProvider>
      </Provider>
    </SessionProvider>
  );
}

export default App;
