import classes from "./cart.module.css";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "@/store/redux/cart-slice";
import { formatValue } from "@/helpers/functions";
import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";
import { ProductContext } from "@/store/context/products-context";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import fetchUserAdd from "@/helpers/fetchUserAdrress";

import CartItem from "./cart-item";
const Cart = ({ cart = true }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const cartQnt = useSelector((state) => state.cart.totalQuantity);
  const total = useSelector((state) => state.cart.totalCart);
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();

  async function orderStorage() {
    if (session) {
      const id = localStorage.getItem("id");
      const ret = await fetchUserAdd(id);

      if (ret?.message) {
        dispatch(cartActions.toggle());
        localStorage.setItem("order", "no_address");
        router.push("/user/signIn");
      } else {
        localStorage.setItem("order", "ordering");
        dispatch(cartActions.toggle());
        router.push("/user/signIn");
      }
    } else {
      dispatch(cartActions.toggle());
      localStorage.setItem("order", "ordering");
      router.push("/user/login");
    }
  }

  function handleRemove() {
    dispatch(cartActions.removeAll());
  }

  const handleClose = () => {
    dispatch(cartActions.toggle());
  };

  return (
    <>
      <AnimatePresence>
        <ul className={classes.cart_items}>
          {cart && (
            <li className={classes.li_action}>
              <h4>Cart ({cartQnt})</h4>
              <motion.button
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 250 }}
                onClick={handleRemove}
              >
                Remove all
              </motion.button>
            </li>
          )}
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              title={item.name}
              amount={item.quantity}
              price={item.totalPrice}
              id={item.id}
              isShow={cart}
            />
          ))}
        </ul>
      </AnimatePresence>

      <div className={classes.total}>
        <span>Total Amount</span>
        <span className={classes.my_value}>{formatValue(total)}</span>
      </div>
      {cart && (
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
            transition={{ type: "spring" }}
            className={classes.button}
            onClick={orderStorage}
          >
            Order
          </motion.button>
        </div>
      )}
    </>
  );
};

export default Cart;
