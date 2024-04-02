import { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";

import classes from "./notification.module.css";
import NotificationContext from "../../../store/context/notification-context";

function Notification(props) {
  const notificationCtx = useContext(NotificationContext);

  const { title, message, status } = props;

  let statusClasses = "";

  if (status === "success") {
    statusClasses = classes.success;
  }

  if (status === "error") {
    statusClasses = classes.error;
  }

  if (status === "pending") {
    statusClasses = classes.pending;
  }

  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    <AnimatePresence>
      <motion.div
        className={activeClasses}
        onClick={notificationCtx.hideNotification}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ y: -30, opacity: 0 }}
        transition={{ duration: 0.3, type: "spring" }}
      >
        <h2>{title}</h2>
        <h3>{message}</h3>
      </motion.div>
    </AnimatePresence>
  );
}

export default Notification;
