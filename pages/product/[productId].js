import ProductDetail from "@/components/product/product-detail"
import { getAllProducts, selectedId } from "@/helpers/fetchProducts";
function DetailedProduct(props) {
    const id = props.selectedEvent;
    return <ProductDetail id={id} />;


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

export default DetailedProduct