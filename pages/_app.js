import "../styles/globals.css";
import Layout from "../components/layouts/layout";
import ProductsContextProvider from "../store/products-context";
import { NotificationContextProvider } from "@/store/notification-context";
import StorageContextProvider from "@/store/storage-context";
import { SessionProvider } from "next-auth/react";

function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <StorageContextProvider>
      <NotificationContextProvider>
          <ProductsContextProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ProductsContextProvider>
      </NotificationContextProvider>
      </StorageContextProvider>
    </SessionProvider>
  );
}

export default App;
