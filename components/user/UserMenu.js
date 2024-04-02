import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { sendCartData } from "@/helpers/cart-actions";
import { signOut } from "next-auth/react";

import { userActions } from "@/store/redux/user.slice";
import classes from "./UserMenu.module.css";

function UserMenu() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

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

  function logoutHandler() {
    dispatch(sendCartData(cart));
    setTimeout(() => {
      localStorage.clear();
    }, 900);

    setTimeout(() => {
      signOut({
        callbackUrl:
          "https://store-comerce-ahwgoy6xn-thiago-freitas-projects-0d31c9d5.vercel.app/",
      });
    }, 1000);
  }
  return (
    <motion.div
      className={classes.userMenu}
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ y: -30, opacity: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
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
