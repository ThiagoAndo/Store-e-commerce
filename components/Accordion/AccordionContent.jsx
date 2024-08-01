import { useAccordionContext } from "./Accordion.jsx";
import { useAccordionItemContext } from "./AccordionItem.jsx";
import { motion } from "framer-motion";
import { useFetch } from "@/pages/user/purchases/index.js";

export default function AccordionContent({ className, cart }) {
  const { openItemId } = useAccordionContext();
  const id = useAccordionItemContext();
  const { fetchedData } = useFetch("cart", cart);

  const isOpen = openItemId === id;

  console.log(id + " " + cart);
  console.log(fetchedData);

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={isOpen ? { height: "auto", opacity: 1 } : null}
      transition={{ duration: 0.6, type: "spring" }}
      className={
        isOpen ? `${className ?? ""} open` : `${className ?? ""} close`
      }
    >
      <motion.article
        initial={{ opacity: 0 }}
        animate={isOpen ? { opacity: 1 } : null}
        transition={{ duration: 1, type: "spring" }}
      >
        <p>You can&apos;t go wrong with us.</p>
        <p>
          We are in the business of planning highly individualized vacation
          trips for more than 20 years.
        </p>
      </motion.article>
    </motion.div>
  );
}
