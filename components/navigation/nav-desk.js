import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import ScrollBtn from "../ui/scrollTop/ScrollTop";

import {  useEffect, useState } from "react";
import classes from "./filter-nav.module.css"
export default function NavDesk({handleClick}) {
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
  const [scrollPosition, setScrollPosition] = useState(0);
  const { scrollY } = useScroll();
  const navWidth = useTransform(scrollY, [0, 30, 130], ["70%", "90%", "95%"]);
  return (
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
          <MenuBtn
            action={() => {
              handleClick(1);
            }}
          >
            Men
          </MenuBtn>
        </li>
        <li>
          <MenuBtn
            action={() => {
              handleClick(2);
            }}
          >
            Women
          </MenuBtn>
        </li>
        <li>
          <MenuBtn
            action={() => {
              handleClick(3);
            }}
          >
            Home
          </MenuBtn>
        </li>
        <li>
          <MenuBtn
            action={() => {
              handleClick(4);
            }}
          >
            Self care
          </MenuBtn>
        </li>
        <li>
          <MenuBtn
            action={() => {
              handleClick(5);
            }}
          >
            Electronics
          </MenuBtn>
        </li>
      </motion.ul>
      <AnimatePresence>
        {scrollPosition >= 150 ? <ScrollBtn /> : null}
      </AnimatePresence>
    </motion.nav>
  );
}


  function MenuBtn({ children, action }){
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