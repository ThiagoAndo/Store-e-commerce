import { useAnimate, stagger, motion, AnimatePresence } from "framer-motion";

import classes from "./product-info.module.css";

// {description,price,discountPercentage,brand,title,rating}
function ProductInfo({ props }) {
  let price = props.price - props.price * (props.discountPercentage * 0.01);

  function format(value) {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  }

  return (
    <article className={classes.product}>
      <div className={classes.headerText}>
        <p>{props.brand}</p>
        <h2>{props.title}</h2>
        <p>Description</p>
        <p>{props.description}</p>
      </div>
      <div>
        <div className={classes.price}>
          <p>{format(price)}</p>
          <p>{format(props.price)}</p>
        </div>
        <p>{props.rating}</p>
        <p>{}</p>
      </div>
      <div className={classes.actions}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 150 }}
        >
          Add to cart
        </motion.button>
      </div>
    </article>
  );
}

export default ProductInfo;
