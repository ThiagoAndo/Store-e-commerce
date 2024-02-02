import ProductGrid from "../components/product/product-grid";
import { getAllProducts } from "../helpers/fetchProducts";
import { useContext, useEffect } from "react";
import { ProductContext } from "../store/products-context";

function Products(props) {
  const { products } = props;
  const store = useContext(ProductContext);
  useEffect(() => {
    store.addProducts(products);
  }, []);

  if (!products.hasOwnProperty("error")) {
    return <ProductGrid items={products} />;
  } else {
    return <h1>{products.error}</h1>;
  }
}
export async function getStaticProps() {
  const data = await getAllProducts();

  return {
    props: {
      products: data,
    },
    revalidate: 1130,
  };
}
export default Products;
