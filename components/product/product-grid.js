import ProductItem from "./product-item";
import classes from "./product-grid.module.css";
import { useContext } from "react";
import { ProductContext } from "@/store/context/products-context";
export default function ProductGrid() {
  const store = useContext(ProductContext);
  return (
    <ul className={classes.products}>
      {store.filtered.map((item) => (
        <li key={item.id}>
          <ProductItem {...item} />
        </li>
      ))}
    </ul>
  );
}
