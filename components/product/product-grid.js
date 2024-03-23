import ProductItem from "./product-item";
import classes from "./product-grid.module.css";
import { useContext, useEffect } from "react";
import { ProductContext } from "@/store/context/products-context";

export default function ProductGrid() {
  const store = useContext(ProductContext);

  return (
    <ul className={classes.meals}>
      {store.filtered.map((item) => (
        <li key={item.id}>
          <ProductItem {...item} />
        </li>
      ))}
    </ul>
  );
}
