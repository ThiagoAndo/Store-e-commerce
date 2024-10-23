import { useContext, useEffect, useState } from "react";
import { ProductContext } from "@/store/context/products-context";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import NavMobile from "./nav-mobile";
import useMediaScreen from "@/hooks/useMediaScreen";
import ScrollBtn from "../ui/scrollTop/ScrollTop";
import NavDesk from "./nav-desk";
function FilterHeader() {
  const store = useContext(ProductContext);
  let { match: size } = useMediaScreen(
    "only screen and (min-width : 369px) and (max-width : 500px)"
  );

  function handleClick(num) {
    store.getFiltered(num);
  }

  return (
    <AnimatePresence>
      {size ? <NavMobile /> : <NavDesk handleClick={handleClick} />}
    </AnimatePresence>
  );
}
export default FilterHeader;
