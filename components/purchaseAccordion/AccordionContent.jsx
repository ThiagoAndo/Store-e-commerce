import { motion } from "framer-motion";
import { useAccordionContext } from "./Accordion.jsx";
import { useAccordionItemContext } from "./AccordionItem.jsx";
import { useFetch } from "@/pages/user/purchases/index.js";
import classes from "./Accordion.module.css";

import CartItem from "../cart/cart-item.js";
export default function AccordionContent({ className, cart }) {
  const { openItemId } = useAccordionContext();
  const id = useAccordionItemContext();
  const { fetchedData } = useFetch("cart", cart);
  const isOpen = openItemId === id;

  const { items } = fetchedData ? fetchedData : { items: false };

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
        <ul className={classes.cart_items}>
          {items &&
            items.map((item) => (
              <CartItem
                key={item.item_id}
                title={item.name}
                amount={item.qnt}
                price={item.price}
                id={item.item_id}
                isShow={false}
              />
            ))}
        </ul>
      </motion.article>
    </motion.div>
  );
}
