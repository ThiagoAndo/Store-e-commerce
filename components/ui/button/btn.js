import { motion } from "framer-motion";
function Button({ children, rotate = false , click, style}) {
  return (
    <motion.button
      initial={rotate ? { opacity: 0, rotateY: 0 } : {}}
      animate={
        rotate
          ? {
              opacity: 1,
              rotateZ: [360, 260, 180, 90, 90, 360, 260, 180, 90, 0],
              scale: [0, 0.2, 0.4, 0.6, 0.8, 1.2, 1],
            }
          : {}
      }
      whileHover={rotate ? {} : { scale: 1.06 }}
      transition={{ type: "spring", stiffness: 150 }}
      className={style}
      onClick={click}
    >
      {children}
    </motion.button>
  );
}

export default Button;
