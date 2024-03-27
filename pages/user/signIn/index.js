import UserSignIn from "@/components/user/UserSignIn";
import { useState, useContext } from "react";
import { signIn } from "next-auth/react";
import NotificationContext from "@/store/context/notification-context";

function SignIn() {
  const [feedbackItems, setFeedbackItems] = useState();
  const notificationCtx = useContext(NotificationContext);

  function submitFormHandler(user) {
    notificationCtx.showNotification({
      title: "Sending Request:",
      message: `Registering new user.`,
      status: "pending",
    });
    try {
      fetch("/api/user/new", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            setFeedbackItems("Connecting to the database failed!");
            throw "Connecting to the database failed!";
          }
        })
        .then((data) => {
          if (data.hasOwnProperty("message")) {
            setFeedbackItems(data);
          } else {
            setFeedbackItems(data);
            signIn("credentials", {
              redirect: false,
              email: user.email,
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <UserSignIn submitHandler={submitFormHandler} feedBack={feedbackItems} />
  );
}

export default SignIn;
