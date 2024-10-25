import React from "react";
import { useContext, useEffect, useState, useCallback } from "react";
import { ProductContext } from "@/store/context/products-context";
import Link from "next/link";
import DetailSlider from "./product-slider";
import ProductInfo from "./product-info";
import classes from "./product-detail.module.css";
import { getProductById } from "@/helpers/fetchProducts";
import { getAllProducts } from "@/helpers/fetchProducts";

const ProductDetail = ({ id }) => {
  const [product, setProduct] = useState([]);
  const store = useContext(ProductContext);

  const print = useCallback(
    async function print() {
      if (store.products.length >= 1) {
        setProduct(store.getProFiltered(id));
      } else {
        const pro = await getProductById(id);
        const product = await getAllProducts();
        if (pro?.images) {
          store.addProducts(pro.products, pro.images);
          setProduct(store.products);
          store.addProducts(product.products, product.images);
        } else {
          setProduct("wrong id");
        }
      }
    },
    [id, store]
  );

  useEffect(() => {
    print();
  }, [print]);

  if (product.length === 1) {
    const [produc] = product;

    return (
      <div className={classes.container_pro}>
        <div className={classes.display}></div>
        <div className={classes.slider}>
          <DetailSlider img={produc.images} />
        </div>

        <div className={classes.info}>
          <ProductInfo props={produc} />
        </div>
        <div className={classes.display}></div>
      </div>
    );
  } else if (product == "wrong id") {
    return (
      <div className="not-found">
        <h1>Ooops...</h1>
        <h2>That page cannot be found :(</h2>
        <p>
          Go back to the <Link href="/">Homepage</Link>
        </p>
      </div>
    );
  }
};

export default ProductDetail;
