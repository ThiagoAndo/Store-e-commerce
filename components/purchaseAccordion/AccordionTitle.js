import { useAccordionContext } from "./Accordion";
import { useAccordionItemContext } from "./AccordionItem";
import { motion } from "framer-motion";
import classes from "./Accordion.module.css";
export default function AccordionTitle({ className, date, hour, total }) {
 date =  date.replaceAll("-","/")
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
      <h2 className={classes[className]}>
        Date: <span>{date}</span>
      </h2>
      <h2 className={classes[className]}>
        Hour: <span>{hour}</span>
      </h2>
      <h2 className={classes[className]}>
        Total: <span>{total}</span>
      </h2>
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
