import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { setStorage } from "../../../helpers/functions";
import { useNotification } from "@/hooks/useNotification";
import UserSignIn from "@/components/forms/UserSignIn";

function SignIn() {
  const [feedbackItems, setFeedbackItems] = useState();
  const [isOrdering, setIsOrdering] = useState(null);
  const { notification } = useNotification();
  const router = useRouter();

  function handleGuest() {
    localStorage.setItem("guest", "guest");
    router.replace("/checkout");
  }

  async function submitFormHandler(user) {
    notification(null, "Sending Request:", "REGISTERING NEW USER.", "pending");
    let data = null;
    try {
      let response = await fetch(
        // "http://localhost:8080/user/new",
        "https://libraryapi-gtct.onrender.com/user/new",
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
        localStorage.setItem("password", user.password);
      } else {
        throw "Connecting to the database failed!";
      }

      if (data.hasOwnProperty("message")) {
        setFeedbackItems({ message: data.message });
      } else {
        setStorage(data);
        setFeedbackItems({ ok: "ok" });
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
      notification(null, "Invalid Action:", feedbackItems.message.toUpperCase());
      setFeedbackItems("");

      return;
    } else if (feedbackItems?.ok) {
      router.replace("/");
      notification(
        null,
        "USER REGISTERED SUCCESSFULLY!",
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
