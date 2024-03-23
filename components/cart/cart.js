import classes from "./cart.module.css";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "@/store/redux/cart-slice";
import { formatValue } from "@/helpers/functions";
import { AnimatePresence, motion } from "framer-motion";

import CartItem from "./cart-item";
import Modal from "../ui/modal/modal";
const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.totalCart);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(cartActions.toggle());
  };

  return (
    <Modal>
      <AnimatePresence>
        <ul className={classes["cart-items"]}>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              title={item.name}
              amount={item.quantity}
              price={item.totalPrice}
              id={item.id}
            />
          ))}
        </ul>
      </AnimatePresence>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span className={classes.my_value}>{formatValue(total)}</span>
      </div>
      <div className={classes.actions}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 250 }}
          className={classes["button--alt"]}
          onClick={handleClose}
        >
          Close
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 250 }}
          className={classes.button}
          onClick={handleClose}
        >
          Order
        </motion.button>
      </div>
    </Modal>
  );
};

export default Cart;
