import style from "./AnimeComp.module.css";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../button/btn";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

/**
 * Anime Component:
 * Displays an animated message with optional styles for error, MSN (special message), or delete contexts.
 * Includes a button to navigate back to the home page after the animation finishes.
 */
function Anime({ message, isError, isMsn, isDelete }) {
  const [showTxt, setShowTxt] = useState(true); // Controls visibility of animated text
  const [showBtn, setShowBtn] = useState(false); // Controls visibility of the button
  let thisClass = null; // Dynamic class for styling
  const router = useRouter(); // Next.js router for navigation
  let msg;

  // Replace spaces with "#" and split message into an array of characters
  msg = message.replaceAll(" ", "#");
  msg = msg.split("");

  // Apply conditional classes based on props
  if (isError) {
    thisClass = style.error;
  }
  if (isMsn) {
    thisClass = style.error + " " + style.msn;
  }
  if (isDelete) {
    thisClass = style.error + " " + style.delete;
  }

  // Navigate to home page when the button is clicked
  function handleClick() {
    router.replace("/");
  }

  // Set timers for text animation and button appearance
  useEffect(() => {
    let timer;
    let timer2;
    if (isMsn) {
      timer = setTimeout(() => {
        setShowBtn(true); // Show button after the animation
      }, 2600);
      timer2 = setTimeout(() => {
        setShowTxt(false); // Hide text after the animation
      }, 2500);
    }
    return () => {
      clearInterval(timer); // Clear timers on cleanup
      clearInterval(timer2);
    };
  }, []);

  return (
    <div className={thisClass}>
      <AnimatePresence>
        {/* Animate the message text */}
        {showTxt &&
          msg.map((letter, i) => (
            <motion.p
              className={letter === "#" ? style.trans : style.text} // Apply special style for "#" (space replacement)
              initial={{ opacity: 0, rotateY: 0 }} // Initial state for animation
              animate={{
                opacity: 1,
                rotateY: [90, 180, 260, 360, 90, 180, 260, 36], // Rotate animation
              }}
              transition={{
                duration: 0.1,
                delay: i / 10, // Stagger animation for each letter
              }}
              key={i}
            >
              {letter}
            </motion.p>
          ))}
        {/* Display the button after the animation */}
        {showBtn && (
          <Button style={style.button} rotate={true} click={handleClick}>
            {"HOME"}
          </Button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Anime;
