import { useContext, useEffect, useState } from "react";
import { ProductContext } from "@/store/context/products-context";
import classes from "./filter-nav.module.css";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
function FilterHeader() {
  const store = useContext(ProductContext);
  const { scrollY } = useScroll();
  const [scrollPosition, setScrollPosition] = useState(0);
  const navWidth = useTransform(scrollY, [0, 30, 130], ["70%", "90%", "95%"]);
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
            <motion.button
              whileHover={{
                boxShadow: "0 1px 0px rgba(242, 100, 18, 0.8)",
                borderRadius: " 0.5rem",
                paddingBottom: "0.2rem",
              }}
              variants={{
                hidden: { opacity: 0, scale: 0.5 },
                visible: { opacity: 1, scale: [0.8, 1.3, 1] },
              }}
              transition={{ type: "spring", duration: 0.4 }}
              key={1}
              className={classes.filter}
              onClick={() => {
                handleClick(1);
              }}
            >
              Men
            </motion.button>
          </li>
          <li>
            <motion.button
              whileHover={{
                boxShadow: "0 1px 0px rgba(242, 100, 18, 0.8)",
                borderRadius: " 0.5rem",
                paddingBottom: "0.2rem",
              }}
              variants={{
                hidden: { opacity: 0, scale: 0.5 },
                visible: { opacity: 1, scale: [0.8, 1.3, 1] },
              }}
              transition={{ type: "spring", duration: 0.4 }}
              key={2}
              className={classes.filter}
              onClick={() => {
                handleClick(2);
              }}
            >
              Women
            </motion.button>
          </li>
          <li>
            <motion.button
              whileHover={{
                boxShadow: "0 1px 0px rgba(242, 100, 18, 0.8)",
                borderRadius: " 0.5rem",
                paddingBottom: "0.2rem",
              }}
              variants={{
                hidden: { opacity: 0, scale: 0.5 },
                visible: { opacity: 1, scale: [0.8, 1.3, 1] },
              }}
              transition={{ type: "spring", duration: 0.4 }}
              key={3}
              className={classes.filter}
              onClick={() => {
                handleClick(3);
              }}
            >
              Home
            </motion.button>
          </li>
          <li>
            <motion.button
              whileHover={{
                boxShadow: "0 1px 0px rgba(242, 100, 18, 0.8)",
                borderRadius: " 0.5rem",
                paddingBottom: "0.2rem",
              }}
              variants={{
                hidden: { opacity: 0, scale: 0.5 },
                visible: { opacity: 1, scale: [0.8, 1.3, 1] },
              }}
              transition={{ type: "spring", duration: 0.4 }}
              key={4}
              className={classes.filter}
              onClick={() => {
                handleClick(4);
              }}
            >
              Self care
            </motion.button>
          </li>
          <li>
            <motion.button
              whileHover={{
                boxShadow: "0 1px 0px rgba(242, 100, 18, 0.8)",
                borderRadius: " 0.5rem",
                paddingBottom: "0.2rem",
              }}
              variants={{
                hidden: { opacity: 0, scale: 0.5 },
                visible: { opacity: 1, scale: [0.8, 1.3, 1] },
              }}
              transition={{ type: "spring", duration: 0.4 }}
              key={5}
              className={classes.filter}
              onClick={() => {
                handleClick(5);
              }}
            >
              Electronics
            </motion.button>
          </li>
        </motion.ul>
        <AnimatePresence>
          {scrollPosition >= 700 ? (
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
