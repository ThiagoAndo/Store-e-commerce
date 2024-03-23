import { motion } from "framer-motion";
import { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "@/store/redux/cart-slice";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { ProductContext } from "@/store/context/products-context";
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

  const [isLogin, setIsLogin] = useState(false);
  const [cartClass, setCartClass] = useState(classes.icon_cart);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      setIsLogin(true);
    }
  }, [session]);

  useEffect(() => {
    if (stp) {
      handleClickIcon();
    }
    stp = true;
  }, [total]);

  function handleClick() {
    store.getFiltered(6);
  }
  function logoutHandler() {
    signOut();
  }

  function handleClickIcon() {
    if(total===0){
      setCartClass(classes.icon_cart);
    }else{
    setCartClass(classes.icon_cart_full + " " + classes.bump);
    setTimeout(() => {
      setCartClass(classes.icon_cart_full);
    }, 400);
  }
  }

  function handleToggle() {
    dispatch(cartActions.toggle());
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
            {currentPath.includes("product") ? " ⬅ Back" : "Next Store"}
          </Link>
        </motion.div>
        <motion.div
          className={classes.search}
          whileHover={{ width: 410 }}
          transition={{ type: "spring", duration: 0.6, marginRight: 0 }}
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
            className={classes.icon_user}
          >
            <div
              className={
                session?.user ? classes.icon_user_log : classes.icon_user
              }
            >
              {session?.user ? (
                <UserIcon />
              ) : (
                <Link href="/user/login">
                  <UserIcon />
                </Link>
              )}
            </div>
          </motion.div>

          <motion.div
            whileHover={{
              scale: 1.1,
              borderRadius: "10rem",
              boxShadow: "0px 2px 0px rgba(242, 100, 18, 0.8)",
            }}
            className={classes.cart_effec}
          >
            <div className={cartClass} onClick={handleToggle}>
              <CartIcon />
            </div>
          </motion.div>
        </div>
        {isLogin && (
          <div>
            <button onClick={logoutHandler}>Logout</button>
          </div>
        )}
      </nav>
    </header>
  );
}

export default MainHeader;
