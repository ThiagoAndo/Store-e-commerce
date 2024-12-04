import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { setStorage } from "../../../helpers/functions";
import { useNotification } from "@/hooks/useNotification";
import { sendCartData } from "@/helpers/cart-actions";

import UserSignIn from "@/components/forms/UserSignIn";
import Head from "next/head";

function SignIn() {
  // State to track if the user is placing an order
  const [isOrdering, setIsOrdering] = useState(null);
  const { notification } = useNotification();
  const router = useRouter();
  // Function to handle sign-in as a guest user
  function handleGuest() {
    localStorage.setItem("guest", "guest");
    router.replace("/checkout");
  }
  async function submitFormHandler(user) {
    // Display a notification indicating the request is being sent
    notification(null, "Sending Request:", "Registering new user.", "pending");
    let data = null;
    try {
      let response = await fetch(
        "http://localhost:8080/user/new",
        // "https://api-store-pj2y.onrender.com/user/new",
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
        // If the response contains an error message, display it
        if (data.hasOwnProperty("message")) {
          notification(null, "Invalid Action:", data.message);
        } else {
          // Store user data locally for autofilling forms
          setStorage(data);
          // Establish a session using NextAuth after successful user registration
          signIn("credentials", {
            redirect: false,
            email: user.email,
          });
          // If the user is placing an order, send cart data to the backend
          if (isOrdering) {
            const cart = JSON.parse(localStorage.getItem("cart"));
            // Send each cart item to the backend
            cart.map((p) => {
              const { id, name, price, quantity } = p;
              sendCartData({ id, name, price, quantity });
            });
            // Redirect the user to the checkout page after sending cart data
            router.replace("/checkout");
          } else {
            router.replace("/");
          }
          notification(
            null,
            "Registered:",
            "Your account has been created successfully! Welcome aboard!",
            "success"
          );
        }
      } else {
        throw new Error(
          "We couldn't connect to the server. Please check your internet connection and try again."
        );
      }
    } catch (error) {
      notification(null, "Erro: ", error.message, "error");
    }
  }
  // useEffect to check if the user is currently placing an order
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
