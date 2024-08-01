import { useContext } from "react";
import { useRouter } from "next/router.js";
import { motion } from "framer-motion";
import { formatValue } from "@/helpers/functions.js";
import Accordion from "./Accordion.jsx";
import classes from "./Accordion.module.css";
import NotificationContext from "@/store/context/notification-context";

function Mounted({ data }) {
  console.log(data)
  console.log("data");
  const router = useRouter();
  const notificationCtx = useContext(NotificationContext);
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
        <Accordion className="accordion">
          {data.map((inv) => (
            <Accordion.Item
              key={inv.invoice_id + 1}
              id={inv.invoice_id}
              className="accordion-item"
            >
              <Accordion.Title
                className="accordion-item-title"
                date={ inv.paid_at.split("h")[0]}
                hour={ inv.paid_at.split("h")[1]}
                total={ formatValue(inv.total)}
              />
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
