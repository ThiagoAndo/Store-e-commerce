import classes from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import { cartActions } from "@/store/redux/cart-slice";
import { formatValue } from "@/helpers/functions";
import { motion } from "framer-motion";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const { title, amount, price, id } = props;

  const removeItemHandler = () => {
    dispatch(cartActions.removeItemFromCart(id));
  };

  const addItemHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id,
        title,
        price,
      })
    );
  };

  return (
    <motion.li
      layout
      exit={{ y: -30, opacity: 0 }}
      className={classes["cart-item"]}
    >
      <div>
        <h2>{title}</h2>
        <div className={classes.summary}>
          <span className={price}>{formatValue(price)}</span>
          <span className={amount}>x {amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 250 }}
          onClick={removeItemHandler}
        >
          −
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 250 }}
          onClick={addItemHandler}
        >
          +
        </motion.button>
      </div>
    </motion.li>
  );
};

export default CartItem;
