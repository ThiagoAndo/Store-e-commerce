import ProductItem from "./product-item";
import classes from "./product-grid.module.css";

export default function ProductGrid({ items }) {

  return (
    <ul className={classes.meals}>
      {items.map((item) => (
        <li key={item.id}>
          <ProductItem {... item} />
        </li>
      ))}
    </ul>
  );
}
