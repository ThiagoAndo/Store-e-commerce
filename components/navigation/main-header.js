import { motion } from "framer-motion";
import { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "@/store/redux/cart-slice";
import { userActions } from "@/store/redux/user.slice";
import { usePathname } from "next/navigation";
import { ProductContext } from "@/store/context/products-context";
import { useNotification } from "@/hooks/useNotification";
import Link from "next/link";
import classes from "./main-header.module.css";
import SearchBar from "./search-bar";
import UserIcon from "../ui/user/user-icon";
import CartIcon from "../ui/cart/cart-icon";
import useMediaScreen from "@/hooks/useMediaScreen";
import { useSession } from "next-auth/react";
import NavMobile from "./nav-mobile";

let stp = false;
function MainHeader() {
  const currentPath = usePathname();
  const dispatch = useDispatch();
  const store = useContext(ProductContext);
  const total = useSelector((state) => state.cart.totalQuantity);
  const [cartClass, setCartClass] = useState(classes.icon_cart);

  const { notification } = useNotification();
  let { match: size } = useMediaScreen(
    "only screen and (min-width : 369px) and (max-width : 500px)"
  );

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

  return (
    <header className={classes.header}>
      <nav
        className={currentPath === "/" ? classes.navigation : classes.display}
      >
        <motion.div
          whileHover={
            !size && {
              boxShadow: "0 2px 0px rgba(242, 100, 18, 0.8)",
              borderRadius: " 0.5rem",
            }
          }
          transition={{ type: "spring", duration: 0.3 }}
          onClick={handleClick}
          className={classes.cont}
        >
          <Link
            className={
              currentPath === "/"
                ? classes.link
                : `${classes.link + " " + classes.no_margin}`
            }
            href="/"
          >
            {currentPath != "/" ? " ⬅  Back" : "Next Store"}
          </Link>
        </motion.div>
        <div
          className={
            currentPath === "/"
              ? classes.search
              : `${classes.search + " " + classes.no_width}`
          }
        >
          {currentPath === "/" ? <SearchBar /> : null}
        </div>
        <div className={classes.icon_container}>
          <motion.div
            whileHover={{
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
              {size ? null : <DeskActions />}
        </div>
      </nav>
      {size ? <NavMobile /> : null}
    </header>
  );
}

function DeskActions() {
  const { data: session } = useSession();
  const dispatch = useDispatch();

  function handleUserMenuVis() {
    dispatch(userActions.visible());
  }

  function handleUserMenuHid() {
    dispatch(userActions.hidden());
  }

  return session?.user ? (
    <div
      className={classes.icon_user}
      onMouseEnter={handleUserMenuVis}
      onMouseLeave={handleUserMenuHid}
    >
      <div
        className={session?.user ? classes.icon_user_log : classes.icon_user}
      >
        <UserIcon />
      </div>
    </div>
  ) : (
    <motion.div
      whileHover={{
        borderRadius: "10rem",
        boxShadow: "0 2px 0px rgba(242, 100, 18, 0.8)",
      }}
      transition={{ type: "spring", duration: 0.3 }}
      className={classes.icon_user}
    >
      <div
        className={session?.user ? classes.icon_user_log : classes.icon_user}
      >
        <Link href="/user/login">
          <UserIcon />
        </Link>
      </div>
    </motion.div>
  );
}

export default MainHeader;
