import { motion } from "framer-motion";
import classes from "./ScrollTop.module.css"
export default function ScrollBtn() {
  const handleBtn = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
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
  );
}
