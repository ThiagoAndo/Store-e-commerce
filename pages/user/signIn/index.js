import UserSignIn from "@/components/user/UserSignIn";
import { useState, useContext } from "react";
import { signIn } from "next-auth/react";
import NotificationContext from "@/store/context/notification-context";
import pkg from "bcryptjs";
const { hash } = pkg;
import uniqid from "uniqid";
import { getCurrentDate } from "../../../helpers/functions";
import { setStorage } from "../../../helpers/functions";

function SignIn() {
  const [feedbackItems, setFeedbackItems] = useState();
  const notificationCtx = useContext(NotificationContext);

  async function submitFormHandler(user) {
    notificationCtx.showNotification({
      title: "Sending Request:",
      message: `Registering new user.`,
      status: "pending",
    });

    user.password = await hash(user.password, 12);
    user.id = uniqid();
    user.created_at = getCurrentDate();
    let data = null;
    setStorage(user);
    try {
      let response = await fetch(
        "http://localhost:8080/events/user/new",
        // "https://libraryapi-gtct.onrender.com/events/user/new",
        {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        data = await response.json();
      } else {
        setFeedbackItems("Connecting to the database failed!");
        throw "Connecting to the database failed!";
      }

      if (data.hasOwnProperty("message")) {
        setFeedbackItems(data);
      } else {
        setFeedbackItems(data);
        signIn("credentials", {
          redirect: false,
          email: user.email,
        });
      }
    } catch (error) {
      notificationCtx.showNotification({
        title: "Sending Request:",
        message: error.message,
        status: "error",
      });
    }
  }

  return (
    <UserSignIn submitHandler={submitFormHandler} feedBack={feedbackItems} />
  );
}

export default SignIn;
