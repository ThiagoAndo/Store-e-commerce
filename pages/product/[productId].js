import ProductDetail from "@/components/product/product-detail";
import { getAllProducts } from "@/helpers/fetchProducts";
import { useContext } from "react";
import { ProductContext } from "@/store/context/products-context";
import Head from "next/head";

function DetailedProduct(props) {
  const store = useContext(ProductContext);
  const id = props.selectedEvent;
  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <ProductDetail id={id} />;
    </>
  );
}
export async function getStaticProps(context) {
  let eventId = context.params.productId;
  return {
    props: {
      selectedEvent: eventId,
    },
    revalidate: 30,
  };
}
export async function getStaticPaths() {
  const data = await getAllProducts();
  const paths = data.products.map((product) => ({
    params: { productId: product.id },
  }));

  return {
    paths: paths,
    fallback: false,
  };
}

export default DetailedProduct;
