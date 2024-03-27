import { Fragment, useContext, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getStorageData } from "@/helpers/cart-actions";
import { AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { sendCartData } from "@/helpers/cart-actions";
import Notification from "@/components/ui/notification/notification";
import NotificationContext from "@/store/context/notification-context";
import MainHeader from "./main-header";
import FilterHeader from "./filter-nav";
import Footer from "./footer";
import Cart from "../cart/cart";

function Layout(props) {
  const currentPath = usePathname();
  const notificationCtx = useContext(NotificationContext);
  const activeNotification = notificationCtx.notification;
  const isVisible = useSelector((state) => state.cart.cartIsVisible);
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const { data: session } = useSession();
  useEffect(() => {
    const checkStorage = Number(localStorage.getItem("qnt"));

    if (items.length === 0 && checkStorage && !session) {
      dispatch(getStorageData());
    }
  }, []);

  useEffect(() => {
    if (session && items.length > 0) {
      dispatch(sendCartData(items));
    }
  }, [items]);

  return (
    <Fragment>
      <AnimatePresence>{isVisible && <Cart />}</AnimatePresence>
      <MainHeader />
      {currentPath === "/" ? <FilterHeader /> : null}
      <main>{props.children}</main>
      <Footer />
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </Fragment>
  );
}

export default Layout;
