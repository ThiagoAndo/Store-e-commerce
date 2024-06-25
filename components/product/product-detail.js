import React from "react";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "@/store/context/products-context";
import Link from "next/link";
import ProductSlider from "../ui/slider/slider";
import ProductInfo from "./product-info";
import classes from "./product-detail.module.css";

const ProductDetail = ({ id }) => {
  const [product, setProduct] = useState([]);
  const store = useContext(ProductContext);
  useEffect(() => {
    setProduct(store.getProFiltered(id));
  }, [id]);

  if (product.length === 1) {
    const [produc] = product;
    return (
      <div className={classes.container_pro}>
        <ProductSlider myproduc={produc} />
        <div className={classes.product_info}>
          <ProductInfo props={produc} />
        </div>
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
