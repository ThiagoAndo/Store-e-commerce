import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { sendCartData } from "@/helpers/cart-actions";
import { signOut } from "next-auth/react";
import { cartActions } from "@/store/redux/cart-slice";
import NotificationContext from "@/store/context/notification-context";
import { useContext } from "react";
import { userActions } from "@/store/redux/user.slice";
import classes from "./UserMenu.module.css";

function UserMenu() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const notificationCtx = useContext(NotificationContext);
  const total = useSelector((state) => state.cart.totalQuantity);

  const email = localStorage.getItem("email");
  const name = localStorage.getItem("name");
  let userInitials = name.split(" ");
  userInitials = userInitials[0][0] + userInitials[1][0];
  function handleUserMenuVis() {
    dispatch(userActions.visible());
  }

  function handleUserMenuHid() {
    dispatch(userActions.hidden());
  }

  function handleToggle(click) {
    if (total === 0 && click === "click") {
      notificationCtx.showNotification({
        title: "Empty cart:",
        message: `You have not choose any product.`,
        status: "pending",
      });
    }
    dispatch(cartActions.toggle());
  }

  async function logoutHandler() {
    dispatch(sendCartData(cart));
    let myPromise = new Promise(function (myResolve, myReject) {
      localStorage.clear();
      const id = localStorage.getItem("id");

      if (!id) {
        myResolve("OK");
      } else {
        myReject("Error");
      }
    });
    const resolve = await myPromise;

    if (resolve === "OK") {
      signOut({
        callbackUrl:
          "https://store-comerce-ahwgoy6xn-thiago-freitas-projects-0d31c9d5.vercel.app/",
      });
    }
  }
  return (
    <motion.div
      className={classes.userMenu}
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{ duration: 0.7, type: "spring" }}
      onMouseEnter={handleUserMenuVis}
      onMouseLeave={handleUserMenuHid}
    >
      <ul className={classes.user_list}>
        <li>
          <div className={classes.head}>
            <div className={classes.head_log}>{userInitials}</div>
            <div className={classes.head_inf}>
              <div>{name}</div>
              <div>{email}</div>
            </div>
          </div>
        </li>
        <li>
          <div className={classes.body_inf}>
            <motion.p
              key={0}
              whileHover={{ scale: 1.01, color: "#ff9b05" }}
              transition={{ type: "spring", stiffness: 150 }}
              onClick={handleToggle.bind(null, "click")}
            >
              My cart
            </motion.p>
            <motion.p
              key={1}
              whileHover={{ scale: 1.01, color: "#ff9b05" }}
              transition={{ type: "spring", stiffness: 150 }}
            >
              Edit Profile
            </motion.p>
            <motion.p
              key={2}
              whileHover={{ scale: 1.01, color: "#ff9b05" }}
              transition={{ type: "spring", stiffness: 150 }}
            >
              My purchases
            </motion.p>
            <motion.p
              key={3}
              whileHover={{ scale: 1.01, color: "#ff9b05" }}
              transition={{ type: "spring", stiffness: 150 }}
              onClick={logoutHandler}
            >
              Log out
            </motion.p>
          </div>
        </li>
      </ul>
    </motion.div>
  );
}

export default UserMenu;
