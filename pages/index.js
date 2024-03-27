import ProductGrid from "../components/product/product-grid";
import { getAllProducts } from "../helpers/fetchProducts";
import { useContext, useEffect } from "react";
import { ProductContext } from "../store/context/products-context";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import {
  getStorageData,
  fetchCartData,
  sendCartData,
} from "@/helpers/cart-actions";
import { faL } from "@fortawesome/free-solid-svg-icons";

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
  console.log("items");
  console.log(items);

  useEffect(() => {
    if (items.length === 0) {
      if (session) {
        console.log("entrou");
        dispatch(fetchCartData());
        return;
      } else {
        dispatch(getStorageData());
      }
    }
  }, [session]);

  useEffect(() => {
    if (session && items.length > 0) {
      dispatch(sendCartData(items));
    }
  }, [items]);

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
