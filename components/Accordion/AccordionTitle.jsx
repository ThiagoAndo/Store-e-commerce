import { useAccordionContext } from "./Accordion.jsx";
import { useAccordionItemContext } from "./AccordionItem.jsx";
import { useAccordionDataContext } from "./AccordionMounted.jsx";
import { motion } from "framer-motion";
import classes from "./Accordion.module.css";

export default function AccordionTitle({ className, children }) {
  const { toggleItem, openItemId } = useAccordionContext();
  const{data} =useAccordionDataContext()
  const id = useAccordionItemContext();
  const isOpen = openItemId === id;
  return (
    <div className={classes["title-comp"]} onClick={() => toggleItem(id)}>
      <h3 className={classes[className]}>{children}</h3>
      <motion.h3
        animate={{
          rotate: isOpen ? 180 : 0,
        }}
        className={classes[className]}
      >
        &#9650;
      </motion.h3>
    </div>
  );
}
