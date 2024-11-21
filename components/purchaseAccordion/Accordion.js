import { createContext, useContext, useState } from "react";
import AccordionItem from "./AccordionItem";
import AccordionTitle from "./AccordionTitle";
import AccordionContent from "./AccordionContent";
import classes from "./Accordion.module.css";

/**
 * AccordionContext:
 * A React Context used to manage the state of the accordion items.
 * Provides the `openItemId` and `toggleItem` functions to child components.
 */
const AccordionContext = createContext();

/**
 * useAccordionContext:
 * Custom hook to access the `AccordionContext`.
 * Ensures that accordion-related components are used within an <Accordion>.
 */
export function useAccordionContext() {
  const ctx = useContext(AccordionContext);

  if (!ctx) {
    throw new Error(
      "Accordion-related components must be wrapped by <Accordion>."
    );
  }

  return ctx;
}

/**
 * Accordion Component:
 * A container for the accordion functionality. It provides context to manage
 * the open/closed state of its items and allows nested Accordion components
 * to interact seamlessly.
 */
export default function Accordion({ children, className, id }) {
  const [openItemId, setOpenItemId] = useState(); // Tracks the currently open accordion item

  // Toggles the state of an accordion item based on its ID
  function toggleItem(id) {
    setOpenItemId((prevId) => (prevId === id ? null : id)); // Close if already open, otherwise open the item
  }

  // Context value shared with child components
  const contextValue = {
    openItemId,
    toggleItem,
  };

  return (
    <AccordionContext.Provider value={contextValue}>
      {/* Wrapper for accordion items */}
      <ul key={id} className={classes[className]}>
        {children}
      </ul>
    </AccordionContext.Provider>
  );
}

// Attach Accordion-related components as static properties for easy usage
Accordion.Item = AccordionItem;
Accordion.Title = AccordionTitle;
Accordion.Content = AccordionContent;
