import { motion } from "framer-motion";
function Button(props) {
  return (
    <motion.button
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
