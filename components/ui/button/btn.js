import { motion } from "framer-motion";
function Button(props) {
  return (
    <motion.button
      initial={props?.rotate ? { opacity: 0, rotateY: 0 } : {}}
      animate={
        props?.rotate
          ? {
              opacity: 1,
              rotateZ: [360, 260, 180, 90, 90, 360, 260, 180, 90, 0],
              scale: [0, 0.2, 0.4, 0.6, 0.8, 1.2, 1],
            }
          : {}
      }
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 150 }}
      className={props.style}
      onClick={props.click}
    >
      {props.children}
    </motion.button>
  );
}

export default Button;
