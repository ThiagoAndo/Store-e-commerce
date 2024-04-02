import ProductGrid from "../components/product/product-grid";
import { getAllProducts } from "../helpers/fetchProducts";
import { useContext, useEffect } from "react";
import { ProductContext } from "../store/context/products-context";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { getStorageData, fetchCartData } from "@/helpers/cart-actions";

function Products(props) {
  const { products } = props;
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const store = useContext(ProductContext);

  useEffect(() => {
    if (!products.hasOwnProperty("error")) {
      store.addProducts(products.products, products.images);
    }
  }, [store.addProducts]);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(getStorageData());
      if (session) {
        dispatch(fetchCartData());
      }
    }
  }, [session]);

  if (!products.hasOwnProperty("error")) {
    return <ProductGrid />;
  } else {
    return (
      <h1
        style={{
          color: "red",
          margin: "auto",
          marginTop: "5rem",
          marginBottom: "5rem",
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
  return {
    props: {
      products: data,
    },
    // revalidate: 1130,((( will inplament it only if alawing add product )))
  };
}
export default Products;
