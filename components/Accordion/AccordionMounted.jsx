import { useContext } from "react";
import { useRouter } from "next/router.js";
import { motion } from "framer-motion";
import Accordion from "./Accordion.jsx";
import classes from "./Accordion.module.css";
import NotificationContext from "@/store/context/notification-context";

function Mounted({ data }) {
  const router = useRouter();
  const notificationCtx = useContext(NotificationContext);
  console.log(data);
  console.log("data");

  if (data?.length === 0) {
    router.replace("/");
    notificationCtx.showNotification({
      title: "Nothing to show:",
      message: `You have not made any purchase.`,
      status: "pending",
    });
  }
  return (
    <motion.article
      className={classes.main}
      initial={{ y: 200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      <section>
        <h2>Why work with us?</h2>
        <Accordion className="accordion">
          {data.map((inv) => (
            <Accordion.Item
              key={inv.invoice_id + 1}
              id={inv.invoice_id}
              className="accordion-item"
            >
              <Accordion.Title className="accordion-item-title">
                {"Date: " +
                  inv.paid_at.split("h")[0] +
                  "  Hour:  " +
                  inv.paid_at.split("h")[1]}
              </Accordion.Title>
              <Accordion.Content
                cart={inv.cart_id}
                className="accordion-item-content"
              />
            </Accordion.Item>
          ))}
        </Accordion>
      </section>
    </motion.article>
  );
}

export default Mounted;
