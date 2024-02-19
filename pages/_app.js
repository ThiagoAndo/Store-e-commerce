import "../styles/globals.css";
import Layout from "../components/layouts/layout";
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
