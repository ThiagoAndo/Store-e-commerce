import { motion } from "framer-motion";
import { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "@/store/redux/cart-slice";
import { userActions } from "@/store/redux/user.slice";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { ProductContext } from "@/store/context/products-context";
import { useNotification } from "@/hooks/useNotification";
import Link from "next/link";
import classes from "./main-header.module.css";
import SearchBar from "./search-bar";
import UserIcon from "../ui/user/user-icon";
import CartIcon from "../ui/cart/cart-icon";
let stp = false;

function MainHeader() {
  const currentPath = usePathname();
  const dispatch = useDispatch();
  const store = useContext(ProductContext);
  const total = useSelector((state) => state.cart.totalQuantity);
  const [cartClass, setCartClass] = useState(classes.icon_cart);
  const { data: session } = useSession();
  const { notification } = useNotification();

  useEffect(() => {
    if (stp) {
      handleClickIcon();
    }
    if (total === 0) {
      handleToggle();
    }
    stp = true;
  }, [total]);

  function handleClick() {
    store.getFiltered(6);
  }

  function handleClickIcon() {
    if (total === 0) {
      setCartClass(classes.icon_cart);
    } else {
      setCartClass(classes.icon_cart_full + " " + classes.bump);
      setTimeout(() => {
        setCartClass(classes.icon_cart_full);
      }, 400);
    }
  }

  function handleToggle(click) {
    if (total === 0 && click === "click") {
      notification(
        null,
        "Empty cart:",
        `You have not choose any product.`,
        "pending"
      );
    }
    dispatch(cartActions.toggle());
  }
  function handleUserMenuVis() {
    if (session) dispatch(userActions.visible());
  }

  function handleUserMenuHid() {
    dispatch(userActions.hidden());
  }

  return (
    <header className={classes.header}>
      <nav className={classes.navigation}>
        <motion.div
          whileHover={{
            scale: 1.05,
            boxShadow: "0 2px 0px rgba(242, 100, 18, 0.8)",
            borderRadius: " 0.5rem",
            paddingBottom: "0.3rem",
          }}
          transition={{ type: "spring", duration: 0.3 }}
          onClick={handleClick}
        >
          <Link className={classes.link} href="/">
            {currentPath != "/" ? " ⬅ Back" : "Next Store"}
          </Link>
        </motion.div>
        <motion.div
          className={classes.search}
          whileHover={{ scale: [1.05, 1] }}
          transition={{ type: "spring", duration: 1, stiffness:100 }}
        >
          {currentPath === "/" ? <SearchBar /> : null}
        </motion.div>
        <div className={classes.icon_container}>
          <motion.div
            whileHover={{
              scale: 1.1,
              borderRadius: "10rem",
              boxShadow: "0 2px 0px rgba(242, 100, 18, 0.8)",
            }}
            transition={{ type: "spring", duration: 0.3 }}
            className={classes.cart_effec}
          >
            <div
              className={cartClass}
              onClick={handleToggle.bind(null, "click")}
            >
              <CartIcon />
            </div>
          </motion.div>

          {session?.user ? (
            <div
              className={classes.icon_user}
              onMouseEnter={handleUserMenuVis}
              onMouseLeave={handleUserMenuHid}
            >
              <div
                className={
                  session?.user ? classes.icon_user_log : classes.icon_user
                }
              >
                <UserIcon />
              </div>
            </div>
          ) : (
            <motion.div
              whileHover={{
                scale: 1.1,
                borderRadius: "10rem",
                boxShadow: "0 2px 0px rgba(242, 100, 18, 0.8)",
              }}
              transition={{ type: "spring", duration: 0.3 }}
              className={classes.icon_user}
            >
              <div
                className={
                  session?.user ? classes.icon_user_log : classes.icon_user
                }
              >
                <Link href="/user/login">
                  <UserIcon />
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default MainHeader;
