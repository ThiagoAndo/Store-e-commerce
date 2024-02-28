import "../styles/globals.css";
import Layout from "../components/layouts/layout";
import ProductsContextProvider from "../store/products-context";
import { NotificationContextProvider } from "@/store/notification-context";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <NotificationContextProvider>
        <ProductsContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ProductsContextProvider>
      </NotificationContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
