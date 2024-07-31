import Accordion from "./Accordion.jsx";
import classes from "./Accordion.module.css";
import { motion, AnimatePresence } from "framer-motion";

function Mounted() {
  return (
    <AnimatePresence>
      <motion.main 
        className={classes.main}
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <section>
          <h2>Why work with us?</h2>
          <Accordion className="accordion">
            <Accordion.Item id="experience" className="accordion-item">
                <Accordion.Title className="accordion-item-title">
                  We got 20 years of experience
                </Accordion.Title>
                <Accordion.Content className="accordion-item-content" />
            </Accordion.Item>
          </Accordion>
        </section>
      </motion.main>
    </AnimatePresence>
  );
}

export default Mounted;
