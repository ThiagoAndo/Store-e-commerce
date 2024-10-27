

import { Fragment, useContext } from "react";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import Notification from "@/components/ui/notification/notification";
import NotificationContext from "@/store/context/notification-context";
import MainHeader from "../components/navigation/main-header";
import FilterHeader from "../components/navigation/filter-nav";
import Footer from "../components/ui/footer/footer";
import Cart from "../components/cart/cart";
import UserMenu from "../components/userMenu/UserMenu";
import Modal from "../components/ui/modal/modal";
import ConfBlock from "../components/ConfirmationComp/confirmation";

function RootLayout(props) {
  const currentPath = usePathname();
  const notificationCtx = useContext(NotificationContext);
  const activeNotification = notificationCtx.notification;
  const isVisible = useSelector((state) => state.cart.cartIsVisible);
  const isMenu = useSelector((state) => state.user.menuVisible);
  const isConfVisible = useSelector((state) => state.conf.visible);

  return (
    <Fragment>
      <AnimatePresence>
        {isVisible && (
          <Modal key={0} cart={isVisible}>
            <Cart />
          </Modal>
        )}
        {isConfVisible && (
          <Modal key={1}>
            <ConfBlock />
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

export default RootLayout;
