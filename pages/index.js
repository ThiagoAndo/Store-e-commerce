import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import ProductGrid from "../components/product/product-grid";
import Anime from "@/components/ui/txtAnime/AnimeComp";
import { getAllProducts } from "../helpers/fetchProducts";
import { ProductContext } from "../store/context/products-context";
import { getStorageData } from "@/helpers/cart-actions";

function Products(props) {
  const { products } = props;
  const [scrollPosition, setScrollPosition] = useState(0);
  const items = useSelector((state) => state.cart.items);
  const store = useContext(ProductContext);
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    if (!products.hasOwnProperty("error")) {
      store.addProducts(products.products, products.images);
    }
  }, [store.addProducts]);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(getStorageData());
    }
  }, [session]);

  useEffect(() => {
    localStorage.removeItem("order");
    let timer1 = setTimeout(
      () => {
        localStorage.setItem("position", scrollPosition);
      },

      200
    );

    return () => {
      clearTimeout(timer1);
    };
  }, [scrollPosition]);

  useEffect(() => {
    let position = localStorage.getItem("position");
    if (!position) {
      position = window.scrollY;
    }
    localStorage.removeItem("position");
    window.scrollTo({
      top: position,
    });
    setInterval(() => {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }, 500);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!products.hasOwnProperty("error")) {
    return <ProductGrid />;
  } else {
    return (
      <Anime
        isError={true}
        isMsn={false}
        isDelete={false}
        message={products.error ?? "Could not feth products"}
      />
    );
  }
}
export async function getStaticProps() {
  const data = await getAllProducts();
  return {
    props: {
      products: data,
    },
    revalidate: 1200,
  };
}
export default Products;
