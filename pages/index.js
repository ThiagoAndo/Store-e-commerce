import ProductGrid from "../components/product/product-grid";
import { getAllProducts } from "../helpers/fetchProducts";
import { useContext, useEffect } from "react";
import { ProductContext } from "../store/products-context";

function Products(props) {
  const { products } = props;

  const store = useContext(ProductContext);
  useEffect(() => {
    if (!products.hasOwnProperty("error")) {
      store.addProducts(products.products, products.images);
    }
  }, [store.addProducts]);

  if (!products.hasOwnProperty("error")) {
    return <ProductGrid />;
  } else {
    return (
      <h1
        style={{
          marginTop: "5rem",
          color: "red",
          margin: "auto",
          width: "70%",
          textAlign: "center",
        }}
      >
        {products.error ?? "Could not feth products"}🚫
      </h1>
    );
  }
}
export async function getStaticProps() {
  const data = await getAllProducts();
  const paths = data.products.map((product) => ({
    params: { productId: product.id },
  }));

  return {
    props: {
      products: data,
    },
    // revalidate: 1130,((( will inplament it only if alawing add product )))
  };
}
export default Products;
