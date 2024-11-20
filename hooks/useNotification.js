import NotificationContext from "@/store/context/notification-context";
import { useContext } from "react";
/**
 * useNotification Hook
 * A custom hook to manage notifications within the application using NotificationContext.
 * It provides a utility function to display standardized or custom notifications.
 */
export function useNotification() {
  // Access the NotificationContext to trigger notifications
  const notificationCtx = useContext(NotificationContext);
  /**
   * Displays a notification with a customizable message and status.
   *
   * @param {string} field - A predefined key to fetch a standard message (e.g., "First name", "Last name").
   * @param {string} [title=null] - Optional custom title for the notification.
   * @param {string} [passed=null] - Custom message for the notification if no predefined message exists.
   * @param {string} [status=null] - Status of the notification (e.g., "error", "success").
   */
  const hadleNotification = (
    field,
    title = null,
    passed = null,
    status = null
  ) => {
    // Default values for the notification title and status
    const thisTitle = title || "Wrong Input:";
    const thisStatus = status || "error";
    // Predefined error messages for specific fields
    const msg = {
      first: "First name only",
      last: "Last name only",
      email: "Email is not valid",
      password: "Password must contain at least eight characters",
    };
    // Triggers the notification using the context's `showNotification` method
    notificationCtx.showNotification({
      title: thisTitle,
      message: msg[field] || passed, // Uses predefined message or custom message
      status: thisStatus,
    });
  };

  return { notification: hadleNotification }; // Exposes the notification handler
}
