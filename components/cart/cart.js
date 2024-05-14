import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { cartActions } from "@/store/redux/cart-slice";
import { deleteCartData } from "@/helpers/cart-actions";
import { formatValue } from "@/helpers/functions";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Button from "../ui/button/btn";
import classes from "./cart.module.css";
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
      dispatch(cartActions.toggle());
      router.push("/checkout");
    } else {
      dispatch(cartActions.toggle());
      localStorage.setItem("order", "ordering");
      router.push("/user/login");
    }
  }
  function handleRemove() {
    if (session) {
      const user_id = localStorage.getItem("id");
      deleteCartData(user_id, 0);
    }
    dispatch(cartActions.removeAll());
  }
  function handleClose() {
    dispatch(cartActions.toggle());
  }
  return (
    <>
      <AnimatePresence>
        <ul className={classes.cart_items}>
          {cart && (
            <li className={classes.li_action}>
              <h4>Cart ({cartQnt})</h4>
              <Button click={handleRemove}> Remove all</Button>
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
          <Button style={classes["button--alt"]} click={handleClose}>
            Close
          </Button>
          <Button style={classes.button} click={orderStorage}>
            Order
          </Button>
        </div>
      )}
    </>
  );
};
export default Cart;
