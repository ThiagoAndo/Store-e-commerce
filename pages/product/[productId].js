import ProductDetail from "@/components/product/product-detail"
import { getAllProducts, selectedId } from "@/helpers/fetchProducts";
function DetailedProduct(props) {
    const id = +props.selectedEvent;
  



    return <ProductDetail id={id} />;

  //OBS: Para resolver essa bucha sera nessessario fazer a juncao do produto com as imagems no backend

  //
}
export async function getStaticProps(context) {
  let eventId = context.params.productId;

  //   const data = await selectedId(eventId);
  //   console.log( 'data')
  //   console.log( data)

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
    fallback: "blocking",
  };
}

export default DetailedProduct