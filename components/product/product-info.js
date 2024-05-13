import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { sendCartData, updateCartData } from "@/helpers/cart-actions";
import { cartActions } from "@/store/redux/cart-slice";
import { formatValue } from "@/helpers/functions";
import { getCurrentDate } from "@/helpers/functions";
import StarRating from "../ui/rating/StarRating";
import classes from "./product-info.module.css";
function ProductInfo({ props }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const cart = useSelector((state) => state.cart.items);

  const { title, brand, description, id } = props;
  let price = props.price - props.price * (props.discountPercentage * 0.01);
  const rating = Math.floor(Math.random() * (5 - 1 + 1)) + 1;

  let createAt = null;
  function handleClick() {
    const [prt] = cart.filter((prt) => {
      return prt.id === id;
    });

    if (items.length === 0) createAt = getCurrentDate();
    else createAt = items[0].createAt;
    createAt = dispatch(
      cartActions.addItemToCart({
        id,
        title,
        price,
        createAt,
      })
    );

    if (!prt?.id) {
      dispatch(
        sendCartData({
          createAt,
        })
      );
    } else {
      updateCartData({
        item_id: id,
        user_id: localStorage.getItem("id"),
        qnt: prt.quantity + 1,
      });
    }
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
