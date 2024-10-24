import React from "react";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "@/store/context/products-context";
import Link from "next/link";
import DetailSlider from "./product-slider";
import ProductInfo from "./product-info";
import classes from "./product-detail.module.css";

const ProductDetail = ({ id }) => {
  const [product, setProduct] = useState([]);
  const store = useContext(ProductContext);
  useEffect(() => {
    setProduct(store.getProFiltered(id));
  }, []);

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
  } else {
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
