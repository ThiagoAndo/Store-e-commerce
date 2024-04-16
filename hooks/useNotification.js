import NotificationContext from "@/store/context/notification-context";
import { useContext } from "react";

export function useNotification() {
  const notificationCtx = useContext(NotificationContext);

  const hadleNotification = (
    field,
    passed = null,
    title = null,
    status = null
  ) => {
    const thisTitle = title || "Wrong Input:";
    const thisStatus = status || "error";
    const msg =
      passed || `your ${field} is not valid. Make sure to enter a valid one!.`;
    notificationCtx.showNotification({
      title: thisTitle,
      message: msg,
      status: thisStatus,
    });
  };

  return { handle: hadleNotification };
}
