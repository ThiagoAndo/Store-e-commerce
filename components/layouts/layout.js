import { Fragment, useContext } from "react";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import Notification from "@/components/ui/notification/notification";
import NotificationContext from "@/store/context/notification-context";
import MainHeader from "./main-header";
import FilterHeader from "./filter-nav";
import Footer from "./footer";
import Cart from "../cart/cart";
import UserMenu from "../user/UserMenu";
import Modal from "../ui/modal/modal";

function Layout(props) {
  const currentPath = usePathname();
  const notificationCtx = useContext(NotificationContext);
  const activeNotification = notificationCtx.notification;
  const isVisible = useSelector((state) => state.cart.cartIsVisible);
  const isMenu = useSelector((state) => state.user.menuVisible);

  return (
    <Fragment>
      <AnimatePresence>
        {isVisible && (
          <Modal>
            <Cart />
          </Modal>
        )}
        {isVisible && (
          <Modal>
            <Cart />
          </Modal>
        )}
      </AnimatePresence>
      <MainHeader />
      {currentPath === "/" ? <FilterHeader /> : null}
      <main>{props.children}</main>
      <Footer />
      <AnimatePresence>{isMenu && <UserMenu />}</AnimatePresence>
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
