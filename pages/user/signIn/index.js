import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import pkg from "bcryptjs";
const { hash } = pkg;
import uniqid from "uniqid";
import { getCurrentDate } from "../../../helpers/functions";
import { setStorage } from "../../../helpers/functions";
import { useNotification } from "@/hooks/useNotification";
import UserSignIn from "@/components/forms/UserSignIn";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

function SignIn() {
  const [feedbackItems, setFeedbackItems] = useState();
  const [isOrdering, setIsOrdering] = useState(null);
  const { notification } = useNotification();
  const [isGuest, setIsGuest] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();

  function handleGuest() {
    router.replace("/checkout");
  }

  async function submitFormHandler(user) {
    notification(null, "Sending Request:", "Registering new user", "pending");
    user.password = await hash(user.password, 12);
    user.id = uniqid();
    user.created_at = getCurrentDate();
    let data = null;
    setStorage(user);
    try {
      let response = await fetch(
        // "http://localhost:8080/events/user/new",
        "https://libraryapi-gtct.onrender.com/events/user/new",
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
      notification(null, "Sending Request:", error.message, "error");
    }
  }

  useEffect(() => {
    if (feedbackItems?.message) {
      notification(null, feedbackItems.message, "Invalid Action:");
      return;
    } else if (feedbackItems?.email_address) {
      router.replace("/");
      notification(
        null,
        "User registered successfully!",
        "Registered:",
        "success"
      );
    }

    const order = localStorage.getItem("order");
    if (order) {
      setIsOrdering(true);
    }
  }, [feedbackItems]);

  return (
    <UserSignIn
      isOrdering={isOrdering}
      handleGuest={handleGuest}
      handleSubmit={submitFormHandler}
    />
  );
}

export default SignIn;
