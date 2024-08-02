import style from "./AnimeComp.module.css";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../button/btn";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function Anime({ message, isError = true }) {
  const [showTxt, setShowTxt] = useState(true);
  const [showBtn, setShowBtn] = useState(false);

  let thisClass= null;

  // if(isError)

  const router = useRouter();
  let msg;
  msg = message.replaceAll(" ", ".");
  msg = msg.split("");
  function handleClick() {
    router.replace("/");
  }
  useEffect(() => {
    let timer;
    if (!isError) {
      timer = setTimeout(() => {
        setShowBtn(true);
      }, 2600);
    }
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let timer2;
    if (!isError) {
      timer2 = setTimeout(() => {
        setShowTxt(false);
      }, 2500);
    }
    return () => clearInterval(timer2);
  }, []);

  return (
    <div
      className={isError ? style.error : style.error + " " + style.msn}
    >
      <AnimatePresence>
        {showTxt &&
          msg.map((letter, i) => (
            <motion.p
              className={
                letter === "." ?  style.trans : style.text
              }
              initial={{ opacity: 0, rotateY: 0 }}
              animate={{
                opacity: 1,
                rotateY: [90, 180, 260, 360, 90, 180, 260, 36],
              }}
              transition={{
                duration: 0.1,
                delay: i / 10,
              }}
              key={i}
            >
              {letter}
            </motion.p>
          ))}
        {showBtn && (
          <Button style={style.button} rotate={true} click={handleClick}>
            {" ⬅ Back"}
          </Button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Anime;
