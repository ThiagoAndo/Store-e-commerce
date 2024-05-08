import UserLogin from "@/components/forms/UserLogin";
import { useState, useContext } from "react";
import { signIn } from "next-auth/react";
import NotificationContext from "@/store/context/notification-context";
import { setStorage } from "@/helpers/functions";
function Login() {
  const [feedback, setFeedback] = useState("");
  const notificationCtx = useContext(NotificationContext);

  function handleLogin({ email_address, password }) {
    notificationCtx.showNotification({
      title: "Sending Request:",
      message: `Getting User Credentials.`,
      status: "pending",
    });
    try {
      fetch(
        // `http://localhost:8080/events/user/get`
        `https://libraryapi-gtct.onrender.com/user/get`,
        {
          method: "POST",
          body: JSON.stringify({
            email: email_address,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            setFeedback({ message: "Connecting to the database failed!" });
            throw "Connecting to the database failed!";
          }
        })
        .then((data) => {
          if (data.hasOwnProperty("message")) {
            setFeedback(data);
          } else {
            signIn("credentials", {
              redirect: false,
              email: email_address,
            });
            setStorage(data);
          }
        });
    } catch (error) {
      notificationCtx.showNotification({
        title: "Sending Request:",
        message: error.message,
        status: "error",
      });
    }
  }

  return <UserLogin handling={handleLogin} LoginBack={feedback} />;
}

export default Login;
