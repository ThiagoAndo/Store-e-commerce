import { useAccordionContext } from "./Accordion.jsx";
import { useAccordionItemContext } from "./AccordionItem.jsx";
import { motion } from "framer-motion";
import classes from "./Accordion.module.css";


export default function AccordionTitle({ className, date, hour, total }) {
  const { toggleItem, openItemId } = useAccordionContext();
  const id = useAccordionItemContext();
  const isOpen = openItemId === id;
  return (
    <div
      className={classes["title-comp"]}
      onClick={() => {
        toggleItem(id);
      }}
    >
      <h2 className={classes[className]}>{date}</h2>
      <h2 className={classes[className]}>{hour}</h2>
      <h2 className={classes[className]}>{total}</h2>
      <motion.h2
        animate={{
          rotate: isOpen ? 180 : 0,
        }}
        className={classes[className]}
      >
        &#9650;
      </motion.h2>
    </div>
  );
}
