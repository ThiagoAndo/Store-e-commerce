import classes from "./cart-item.module.css";
import { useDispatch } from "react-redux";
import { cartActions } from "@/store/redux/cart-slice";
import { formatValue } from "@/helpers/functions";
import { motion } from "framer-motion";
import { useContext } from "react";
import { ProductContext } from "@/store/context/products-context";
import Image from "next/image";


const CartItem = (props) => {
  const dispatch = useDispatch();
  const store = useContext(ProductContext);
  const { title, amount, price, id } = props;
  const [prt] = store.getProFiltered(id);
  let btnDisplay = null;
  if (amount === 1) btnDisplay = "🗑️";
  else btnDisplay = "-";

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
    prt && (
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
              <h3>{title}</h3>
              <span className={classes.price}>{formatValue(price)}</span>
            </div>
          </div>
        </div>
        <div className={classes.actions}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring" }}
            onClick={removeItemHandler}
          >
            {btnDisplay}
          </motion.button>
          <button className={classes.amount}>x {amount}</button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring" }}
            onClick={addItemHandler}
          >
            +
          </motion.button>
        </div>
      </motion.li>
    )
  );
};

export default CartItem;
