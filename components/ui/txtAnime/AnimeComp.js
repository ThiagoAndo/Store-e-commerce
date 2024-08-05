import style from "./AnimeComp.module.css";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../button/btn";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function Anime({ message, isError, isMsn, isDelete }) {
  const [showTxt, setShowTxt] = useState(true);
  const [showBtn, setShowBtn] = useState(false);
  let thisClass = null;
  const router = useRouter();
  let msg;
  msg = message.replaceAll(" ", "#");
  msg = msg.split("");

  if (isError) {
    thisClass = style.error;
  }
  if (isMsn) {
    thisClass = style.error + " " + style.msn;
  }

  if (isDelete) {
    thisClass = style.error + " " + style.delete;
  }

  function handleClick() {
    router.replace("/");
  }
  useEffect(() => {
    let timer;
    let timer2;
    if (isMsn) {
      timer = setTimeout(() => {
        setShowBtn(true);
      }, 2600);
      timer2 = setTimeout(() => {
        setShowTxt(false);
      }, 2500);
    }
    return () => {
      clearInterval(timer);
      clearInterval(timer2);
    };
  }, []);

  return (
    <div className={thisClass}>
      <AnimatePresence>
        {showTxt &&
          msg.map((letter, i) => (
            <motion.p
              className={letter === "#" ? style.trans : style.text}
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
