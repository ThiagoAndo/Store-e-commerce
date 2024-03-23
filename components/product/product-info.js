import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { cartActions } from "@/store/redux/cart-slice";
import { formatValue } from "@/helpers/functions";
// import { useContext } from "react";
// import { StorageContext } from "@/store/storage-context";
import StarRating from "../ui/rating/StarRating";
import classes from "./product-info.module.css";
function ProductInfo({ props }) {
  const dispatch = useDispatch();
  // const store_storage = useContext(StorageContext);
  const { title, brand, description, id } = props;

  let price = props.price - props.price * (props.discountPercentage * 0.01);
  const rating = Math.floor(Math.random() * (5 - 1 + 1)) + 1;

  function handleClick() {
    // store_storage.addStorage(props.id);
    dispatch(
      cartActions.addItemToCart({
        id,
        title,
        price,
      })
    );
  }

  return (
    <article className={classes.product}>
      <div className={classes.headerText}>
        <p>{brand}</p>
        <h2>{title}</h2>
        <div>
          <p>Description</p>
          <p>{description}</p>
        </div>
      </div>
      <div>
        <div className={classes.price}>
          <p>{formatValue(price)}</p>
          <p>{formatValue(props.price)}</p>
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
