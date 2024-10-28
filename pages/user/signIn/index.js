import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { setStorage } from "../../../helpers/functions";
import { useNotification } from "@/hooks/useNotification";
import { useDispatch } from "react-redux";
import { sendCartData } from "@/helpers/cart-actions";

import UserSignIn from "@/components/forms/UserSignIn";
import Head from "next/head";

function SignIn() {
  const [isOrdering, setIsOrdering] = useState(null);
  const { notification } = useNotification();
  const dispatch = useDispatch();

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
        "https://api-store-pj2y.onrender.com/user/new",
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
          setStorage(data);
          signIn("credentials", {
            redirect: false,
            email: user.email,
          });
          if (isOrdering) {
            const cart = JSON.parse(localStorage.getItem("cart"));
            cart.map((p) => {
              const { id, name, price, quantity } = p;
              sendCartData({ id, name, price, quantity });
            });
            router.replace("/checkout");
          } else {
            router.replace("/");
          }
          notification(
            null,
            "Registered:",
            "USER REGISTERED SUCCESSFULLY!",
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
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <UserSignIn
        isOrdering={isOrdering}
        handleGuest={handleGuest}
        handleSubmit={submitFormHandler}
      />
    </>
  );
}

export default SignIn;
