import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { setStorage } from "../../../helpers/functions";
import { useNotification } from "@/hooks/useNotification";
import UserSignIn from "@/components/forms/UserSignIn";

function SignIn() {
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
        if (data.hasOwnProperty("message")) {
          notification(null, "Invalid Action:", data.message.toUpperCase());
        } else {
          signIn("credentials", {
            redirect: false,
            email: user.email,
          });
          router.replace("/");
          setStorage(data);
          notification(
            null,
            "USER REGISTERED SUCCESSFULLY!",
            "Registered:",
            "success"
          );
        }
      } else {
        throw "Connecting to the database failed!";
      }
    } catch (error) {
      notification(null, "Sending Request:", error.message, "error");
    }
  }
  useEffect(() => {
    const order = localStorage.getItem("order");
    if (order) {
      setIsOrdering(true);
    }
  }, []);

  return (
    <UserSignIn
      isOrdering={isOrdering}
      handleGuest={handleGuest}
      handleSubmit={submitFormHandler}
    />
  );
}

export default SignIn;
