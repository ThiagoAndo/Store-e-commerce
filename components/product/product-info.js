import { motion, AnimatePresence } from "framer-motion";
import { useState, useContext } from "react";
import StarRating from "../ui/StarRating";
import { StorageContext } from "@/store/storage-context";
import classes from "./product-info.module.css";

function ProductInfo({ props }) {
  const price = props.price - props.price * (props.discountPercentage * 0.01);
  const rating = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
  const store_storage = useContext(StorageContext);

  function format(value) {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  }
  function handleClick() {
    store_storage.addStorage(props.id);
  }

  return (
    <article className={classes.product}>
      <div className={classes.headerText}>
        <p>{props.brand}</p>
        <h2>{props.title}</h2>
        <div>
          <p>Description</p>
          <p>{props.description}</p>
        </div>
      </div>
      <div>
        <div className={classes.price}>
          <p>{format(price)}</p>
          <p>{format(props.price)}</p>
        </div>
        <div className={classes.rating}>
          <StarRating props={{ type: "score", score: rating }} key={"score"} />
          <p>( {(props.rating * 15).toFixed(0)} )</p>
        </div>
      </div>
      <div className={classes.actions}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 150 }}
          onClick={handleClick}
        >
          Add to cart
        </motion.button>
      </div>
    </article>
  );
}

export default ProductInfo;
