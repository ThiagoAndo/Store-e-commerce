import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import ProductGrid from "../components/product/product-grid";
import Anime from "@/components/ui/animeComp/AnimeComp";
import { getAllProducts } from "../helpers/fetchProducts";
import { ProductContext } from "../store/context/products-context";
import { getStorageData } from "@/helpers/cart-actions";
import Head from "next/head";

export const metadata = {
  openGraph: {
    title: "Next Store",
    url: "https://store-comerce.vercel.app/",
    description: "E-commerce web app built with Next.JS",
    type: "website",
    images: [
      {
        url: "https://drive.google.com/file/d/1ZF6kpPq-bYCgiqRZc6jtL5Vq69VkeZ4b/view",
        type: "image/jpg",
        width: 1200,
        height: 630,
        alt: "Home",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Next Store",
    url: "https://store-comerce.vercel.app/",
    description: "E-commerce web app built with Next.JS",
    type: "website",
    images: [
      {
        url: "https://drive.google.com/file/d/1ZF6kpPq-bYCgiqRZc6jtL5Vq69VkeZ4b/view",
        type: "image/jpg",
        width: 1200,
        height: 630,
        alt: "Home",
      },
    ],
  },
};
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
    return (
      <>
        <Head>
          <title>Home</title>
        </Head>
        <ProductGrid />
      </>
    );
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
    revalidate: 200,
  };
}
export default Products;
