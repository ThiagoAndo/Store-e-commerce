import UserLogin from "@/components/user/UserLogin";
import { useState, useContext } from "react";
import { signIn } from "next-auth/react";
import NotificationContext from "@/store/context/notification-context";

function Login() {
  const [feedback, setFeedback] = useState("");
  const notificationCtx = useContext(NotificationContext);

  function handleLogin(email, password) {
      notificationCtx.showNotification({
        title: "Sending Request:",
        message: `Getting User Credentials.`,
        status: "pending",
      });
    try {
      fetch(`/api/user/${email}/${password}`)
      
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
              email: email,
            });
            localStorage.setItem("id", data.id);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  return <UserLogin handling={handleLogin} LoginBack={feedback} />;
}

export default Login;
