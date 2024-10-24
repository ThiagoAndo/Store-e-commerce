import { Fragment, useContext } from "react";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import Notification from "@/components/ui/notification/notification";
import NotificationContext from "@/store/context/notification-context";
import MainHeader from "../navigation/main-header";
import FilterHeader from "../navigation/filter-nav";
import NavMobile from "../navigation/nav-mobile";
import Footer from "../ui/footer/footer";
import Cart from "../cart/cart";
import UserMenu from "../userMenu/UserMenu";
import Modal from "../ui/modal/modal";
import ConfBlock from "../ConfirmationComp/confirmation";
import Head from "next/head";

function Layout(props) {
  const currentPath = usePathname();
  const notificationCtx = useContext(NotificationContext);
  const activeNotification = notificationCtx.notification;
  const isVisible = useSelector((state) => state.cart.cartIsVisible);
  const isMenu = useSelector((state) => state.user.menuVisible);
  const isConfVisible = useSelector((state) => state.conf.visible);


  return (
    <Fragment>
      <Head>
        <title>Home</title>
      </Head>
      <AnimatePresence>
        {isVisible && (
          <Modal cart={isVisible}>
            <Cart />
          </Modal>
        )}
        {isConfVisible && (
          <Modal>
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

export default Layout;
