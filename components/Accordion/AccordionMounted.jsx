import { createContext, useContext } from "react";
import { motion } from "framer-motion";
import Accordion from "./Accordion.jsx";
import classes from "./Accordion.module.css";
const AccordionDataContext = createContext();

export function useAccordionDataContext() {
  const ctx = useContext(AccordionDataContext);

  if (!ctx) {
    throw new Error(
      "Accordion-related components must be wrapped by <Accordion>."
    );
  }

  return ctx;
}

function Mounted({ data }) {
  return (
    <motion.main
      className={classes.main}
      initial={{ y: 200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      <section>
        <h2>Why work with us?</h2>
        <AccordionDataContext.Provider value={{ data }}>
          <Accordion className="accordion">
            {data.map((inv) => (
              <Accordion.Item
                key={inv.paid_at}
                id={inv.paid_at}
                className="accordion-item"
              >
                <Accordion.Title
                  key={inv.paid_at}
                  className="accordion-item-title"
                >
                  {inv.paid_at}
                </Accordion.Title>
                <Accordion.Content
                  key={inv.paid_at}
                  className="accordion-item-content"
                />
              </Accordion.Item>
            ))}
          </Accordion>
        </AccordionDataContext.Provider>
      </section>
    </motion.main>
  );
}

export default Mounted;
