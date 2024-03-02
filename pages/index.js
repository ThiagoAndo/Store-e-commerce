import ProductGrid from "../components/product/product-grid";
import { getAllProducts } from "../helpers/fetchProducts";
import { useContext, useEffect } from "react";
import { ProductContext } from "../store/products-context";

function Products(props) {
  const { products } = props;
  const store = useContext(ProductContext);
  useEffect(() => {

    products.length > 1 && store.addProducts(products);
  }, [store.addProducts]);

  if (!products.hasOwnProperty("error") && products.length > 1) {
    return <ProductGrid items={products} />;
  } else {
    return <h1 style={{marginTop:'5rem',color:'red',margin:'auto', width:'70%', textAlign:'center'}}>{products.error?? 'Could not feth products'}🚫</h1>;
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
