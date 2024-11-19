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

    const msg = {
      first: "First name only",
      last: "Last name only",
      email: "Email is not valid",
      password: "Password must contain at least eight characters",
    };

    notificationCtx.showNotification({
      title: thisTitle,
      message: msg[field] || passed,
      status: thisStatus,
    });
  };

  return { notification: hadleNotification };
}
