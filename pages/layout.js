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
import Head from "next/head";

function RootLayout(props) {
  const currentPath = usePathname();
  const notificationCtx = useContext(NotificationContext);
  const activeNotification = notificationCtx.notification;
  const isVisible = useSelector((state) => state.cart.cartIsVisible);
  const isMenu = useSelector((state) => state.user.menuVisible);
  const isConfVisible = useSelector((state) => state.conf.visible);
  return (
    <Fragment>
      <Head>
        <meta name="keywords" content="e-commerce, Next, React" />
        <meta name="author" content="Thiago Freitas" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:title" content="Next Store" />
        <meta
          name="description"
          content="A full-stack E-commerce web app built with Next.JS and Express.JS"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          itemprop="image"
          content="https://res.cloudinary.com/dkobmlalb/image/upload/v1730116328/store_kbzxlf.png"
        />
        <meta property="og:url" content="https://store-comerce.vercel.app/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Next Store" />
        <meta
          name="twitter:description"
          content="A full-stack E-commerce web app built with Next.JS and Express.JS"
        />
        <meta
          name="twitter:image"
          itemprop="image"
          content="https://res.cloudinary.com/dkobmlalb/image/upload/v1730116328/store_kbzxlf.png"
        />
      </Head>

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
