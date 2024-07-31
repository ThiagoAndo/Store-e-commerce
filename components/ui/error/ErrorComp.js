import style from "./ErrorComp.module.css";
import { motion, AnimatePresence } from "framer-motion";

function ErrorComp({ message }) {
  let msg;
  console.log(msg);
  msg = message.replaceAll(" ", ".");
  msg = msg.split("");

  return (
    <motion.div
      className={style.error_h1}
      id="new-challenge-images"
    >
      {msg.map((letter, i) => (
        <motion.p
          className={style.text}
          initial={{ opacity: 0, rotateY: 0 }}
          animate={{
            opacity: 1,
            rotateY: [90, 180, 260, 360, 90, 180, 260, 36],
          }}
          transition={{
            duration: 0.15,
            delay: i / 10,
          }}
          key={i}
        >
          {letter}
        </motion.p>
      ))}
    </motion.div>
  );
}

export default ErrorComp;
