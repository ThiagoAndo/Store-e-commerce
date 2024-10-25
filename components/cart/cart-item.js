import { ProductContext } from "@/store/context/products-context";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { cartActions } from "@/store/redux/cart-slice";
import { formatValue } from "@/helpers/functions";
import { motion } from "framer-motion";
import { useContext } from "react";
import { deleteCartData, updateCartData } from "@/helpers/cart-actions";
import classes from "./cart-item.module.css";
import Image from "next/image";
import Button from "../ui/button/btn";

const CartItem = ({ title, amount, price, id, isShow }) => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const store = useContext(ProductContext);
  const [prt] = store.getProFiltered(id);
  let btnDisplay = null;
  if (amount === 1) btnDisplay = "🗑️";
  else btnDisplay = "-";
  const removeItemHandler = () => {
    dispatch(cartActions.removeItemFromCart(id));

    if (session) {
      if (amount > 1) {
        updateCartData({
          item_id: id,
          user_id: localStorage.getItem("id"),
          qnt: (amount -= 1),
        });
      } else {
        deleteCartData({ item_id: id, user_id: localStorage.getItem("id") }, 1);
      }
    }
  };
  const addItemHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id,
        title,
        price,
      })
    );
    if (session) {
      updateCartData({
        item_id: id,
        user_id: localStorage.getItem("id"),
        qnt: (amount += 1),
      });
    }
  };
  return (
    prt && (
      <>
        <h3 className={classes.title}>{title}</h3>
        <motion.li
          layout
          exit={{ y: -30, opacity: 0 }}
          className={classes.cart_item}
        >
          <div>
            <div className={classes.summary}>
              <Image
                src={prt.thumbnail}
                alt={prt.title}
                height={70}
                width={110}
              />
              <div>
                <span className={classes.price}>{formatValue(price)}</span>
              </div>
            </div>
          </div>
          <div className={classes.actions}>
            {isShow && (
              <Button style={classes.button} click={removeItemHandler}>
                {btnDisplay}
              </Button>
            )}
            <button className={classes.amount}>x {amount}</button>
            {isShow && (
              <Button style={classes.button} click={addItemHandler}>
                +
              </Button>
            )}
          </div>
        </motion.li>
      </>
    )
  );
};
export default CartItem;
