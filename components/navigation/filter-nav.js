import { useContext, useEffect, useState } from "react";
import { ProductContext } from "@/store/context/products-context";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import classes from "./filter-nav.module.css";
function FilterHeader() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { scrollY } = useScroll();
  const navWidth = useTransform(scrollY, [0, 30, 130], ["70%", "90%", "95%"]);
  const store = useContext(ProductContext);
  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };
  const handleBtn = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  function handleClick(num) {
    store.getFiltered(num);
  }
  const MenuBtn = ({ children, action }) => {
    return (
      <motion.button
        whileHover={{ color: "#ff9b05" }}
        transition={{ type: "spring", duration: 0.4 }}
        className={classes.filter}
        onClick={action}
      >
        {children}
      </motion.button>
    );
  };
  return (
    <AnimatePresence>
      <motion.nav
        className={
          scrollPosition >= 121
            ? `${classes.header + " " + classes.fixed}`
            : classes.header
        }
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 },
          },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3, type: "spring" }}
      >
        <motion.ul className={classes.navigation} style={{ width: navWidth }}>
          <li>
            <MenuBtn action={() => { handleClick(1) }}> Men </MenuBtn>
          </li>
          <li>
            <MenuBtn action={() => { handleClick(2) }}> Women </MenuBtn>
          </li>
          <li>
            <MenuBtn action={() => { handleClick(3) }}> Home </MenuBtn>
          </li>
          <li>
            <MenuBtn action={() => { handleClick(4) }}> Self care </MenuBtn>
          </li>
          <li>
            <MenuBtn action={() => { handleClick(5) }}> Electronics</MenuBtn>
          </li>
        </motion.ul>
        <AnimatePresence>
          {scrollPosition >= 150 ? (
            <motion.button
              className={classes.up_btn}
              onClick={handleBtn}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, scale: [0.3, 0.6, 0.9, 1.5, 1] },
              }}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 1, scale: [1, 0.9, 0.6, 0.3, 0] }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              Up
            </motion.button>
          ) : null}
        </AnimatePresence>
      </motion.nav>
    </AnimatePresence>
  );
}
export default FilterHeader;
