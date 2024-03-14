import classes from "./filter-header.module.css";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "@/store/products-context";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";

function FilterHeader() {
  const store = useContext(ProductContext);
  const { scrollY } = useScroll();

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const header = useTransform(scrollY, [0, 30, 115], ["100%", "90%", "80%"]);
  const ul = useTransform(scrollY, [0, 30, 130], ["70%", "90%", "95%"]);
  const headerPos = useTransform(
    scrollY,
    [0, 30, 130, 175, 215],
    [0, 0, 0, 60, 90]
  );

  function handleClick(num) {
    store.getFiltered(num);
  }

  return (
    <AnimatePresence>
      <motion.header
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
        <motion.ul className={classes.navigation} style={{ width: ul }}>
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
        <Link href={'#'} className={classes.up_btn}>Up</Link>
      </motion.header>
    </AnimatePresence>
  );
}

export default FilterHeader;
