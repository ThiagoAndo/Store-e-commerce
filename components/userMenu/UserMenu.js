import { useDispatch, useSelector } from "react-redux";
import { getStorageUser } from "@/helpers/functions";
import { userActions } from "@/store/redux/user.slice";
import { cartActions } from "@/store/redux/cart-slice";
import { useContext } from "react";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import classes from "./UserMenu.module.css";
import { confActions } from "@/store/redux/conf.slice";
import NotificationContext from "@/store/context/notification-context";
function UserMenu() {
  const dispatch = useDispatch();
  const notificationCtx = useContext(NotificationContext);
  const router = useRouter();
  const total = useSelector((state) => state.cart.totalQuantity);
  const { user } = getStorageUser();
  const userInitials = user[0][0] + "" + user[1][0];
  function handleUserMenuVis() {
    dispatch(userActions.visible());
  }
  function handleUserMenuHid() {
    dispatch(userActions.hidden());
  }
  function handleRoutes(route) {
    router.push(`/user/${route}`);
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
  function handleStartDeletion(){
    dispatch(confActions.changeType("delete"))
    dispatch(confActions.toggle());

  }

  async function logoutHandler() {
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
  const MenuOpt = ({ children, action }) => {
    return (
      <motion.p key={0} whileHover={{ color: "#ff9b05" }} onClick={action}>
        {children}
      </motion.p>
    );
  };
  return (
    <motion.div
      className={classes.userMenu}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, type: "spring" }}
      onMouseEnter={handleUserMenuVis}
      onMouseLeave={handleUserMenuHid}
    >
      <ul className={classes.user_list}>
        <li>
          <div className={classes.head}>
            <div className={classes.head_log}>{userInitials}</div>
            <div className={classes.head_inf}>
              <div>{`${user[0] + " " + user[1]}`}</div>
              <div>{user[2]}</div>
            </div>
          </div>
        </li>
        <li>
          <div className={classes.body_inf}>
            <MenuOpt action={handleToggle.bind(null, "click")}>My cart</MenuOpt>
            <MenuOpt action={handleRoutes.bind(null, "userProfile")}>
              Edit Profile
            </MenuOpt>
            <MenuOpt action={handleRoutes.bind(null, "purchases")}>
              My purchases
            </MenuOpt>
            <MenuOpt action={logoutHandler}>Log out</MenuOpt>
            <MenuOpt action={handleStartDeletion}>Delete account</MenuOpt>
          </div>
        </li>
      </ul>
    </motion.div>
  );
}

export default UserMenu;
