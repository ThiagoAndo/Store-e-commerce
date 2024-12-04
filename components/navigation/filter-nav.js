import { useContext, useEffect, useState } from "react";
import { ProductContext } from "@/store/context/products-context";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import ScrollBtn from "../scrollTop/ScrollTop";
import classes from "./filter-nav.module.css";
import useMediaScreen from "@/hooks/useMediaScreen";
/**
 * FilterHeader Component:
 * This component renders a responsive navigation header with filter buttons.
 * It adapts based on the scroll position and screen size, utilizing animations for a smooth UI.
 * The filters allow users to sort products into specific categories.
 */
function FilterHeader() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { scrollY } = useScroll();
  const navWidth = useTransform(scrollY, [0, 30, 130], ["70%", "90%", "95%"]);
  const store = useContext(ProductContext);
  let { match: size } = useMediaScreen(
    "only screen and (min-width : 369px) and (max-width : 500px)"
  );
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
  function handleClick(num) {
    store.getFiltered(num);
  }
  // Reusable button component for category filters
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
      {size === true ? null : (
        <motion.nav
          key={"nav"}
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
          <motion.ul
            key={"ul"}
            className={classes.navigation}
            style={{ width: navWidth }}
          >
            {["Men", "Women", "Home", "Self care", "Electronics", "Show all"].map(
              (btn, i) => (
                <li key={btn}>
                  <MenuBtn
                    action={() => {
                      handleClick(i + 1);
                    }}
                  >
                    {btn}
                  </MenuBtn>
                </li>
              )
            )}
          </motion.ul>
        </motion.nav>
      )}
      {scrollPosition >= 150 ? <ScrollBtn /> : null}
    </AnimatePresence>
  );
}
export default FilterHeader;
