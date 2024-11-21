import { motion } from "framer-motion";
import { useAccordionContext } from "./Accordion";
import { useAccordionItemContext } from "./AccordionItem";
import { useFetch } from "@/pages/user/purchases/index";
import classes from "./Accordion.module.css";
import CartItem from "../cart/cart-item";

/**
 * AccordionContent Component:
 * Displays the detailed content of an accordion item, including a list of cart items.
 * Uses Framer Motion for smooth open/close animations and integrates data fetched from a server.
 */
export default function AccordionContent({ className, cart }) {
  const { openItemId } = useAccordionContext(); // Access the currently open accordion item
  const id = useAccordionItemContext(); // Get the ID of the current accordion item
  const { fetchedData } = useFetch("cart", cart); // Fetch cart data associated with this accordion item
  const isOpen = openItemId === id; // Determine if the current accordion item is open

  const { items } = fetchedData ? fetchedData : { items: false }; // Extract items from fetched data, or default to false if no data

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }} // Initial animation state when closed
      animate={isOpen ? { height: "auto", opacity: 1 } : null} // Expand and fade in if open
      transition={{ duration: 0.6, type: "spring" }} // Smooth spring transition
      className={
        isOpen ? `${className ?? ""} open` : `${className ?? ""} close` // Add open/close class based on state
      }
    >
      <motion.article
        initial={{ opacity: 0 }} // Start with opacity 0
        animate={isOpen ? { opacity: 1 } : null} // Fade in content if open
        transition={{ duration: 1, type: "spring" }} // Smooth transition for content visibility
      >
        {/* Render a list of cart items */}
        <ul className={classes.cart_items}>
          {items &&
            items.map((item) => (
              <CartItem
                key={item.item_id} // Unique key for each cart item
                title={item.name} // Item name
                amount={item.qnt} // Item quantity
                price={item.price} // Item price
                id={item.item_id} // Item ID
                isShow={false} // Hide additional cart item controls
              />
            ))}
        </ul>
      </motion.article>
    </motion.div>
  );
}
