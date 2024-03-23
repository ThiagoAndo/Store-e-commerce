import { Fragment, useContext } from 'react';
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

import Notification from "@/components/ui/notification/notification";
import NotificationContext from "@/store/context/notification-context";

import MainHeader from "./main-header";
import FilterHeader from "./filter-nav";
import Footer from "./footer";
import { AnimatePresence } from "framer-motion";
import Cart from "../cart/cart";

function Layout(props) {
  const currentPath = usePathname();
  const notificationCtx = useContext(NotificationContext);
  const activeNotification = notificationCtx.notification;
  const isVisible = useSelector((state) => state.cart.cartIsVisible);
  // obs melhorar modal animation com frame motion
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
