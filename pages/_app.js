import "../styles/globals.css";
import Layout from "../components/layout/layout";
import ProductsContextProvider from "../store/products-context";

function MyApp({ Component, pageProps }) {
  return (
    <ProductsContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ProductsContextProvider>
  );
}

export default MyApp;
