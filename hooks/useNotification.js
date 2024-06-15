import NotificationContext from "@/store/context/notification-context";
import { useContext } from "react";

export function useNotification() {
  const notificationCtx = useContext(NotificationContext);
  const hadleNotification = (
    field,
    title = null,
    passed = null,
    status = null
  ) => {
    const thisTitle = title || "Wrong Input:";
    const thisStatus = status || "error";
    const msg =
      passed ||
      `YOUR ${field.toUpperCase()} IS NOT VALID! MAKE SURE TO ENTER A VALID ONE.`;
    notificationCtx.showNotification({
      title: thisTitle,
      message: msg,
      status: thisStatus,
    });
  };

  return { notification: hadleNotification };
}
