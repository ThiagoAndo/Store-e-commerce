import classes from "./filter-header.module.css";
import { useContext } from "react";
import { ProductContext } from "@/store/products-context";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

function FilterHeader() {
  const store = useContext(ProductContext);
  const { scrollY } = useScroll();
  const yCity = useTransform(scrollY, [0, 200], [0, -100]);
console.log('scrollY')
console.log(scrollY.current)
  function handleClick(num) {
    store.getFiltered(num);
  }

  return (
    <AnimatePresence>
      <motion.header
        className={classes.header}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3, type: "spring" }}
        style={{ height: yCity }}
      >
        <ul className={classes.navigation}>
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
        </ul>
      </motion.header>
    </AnimatePresence>
  );
}

export default FilterHeader;
