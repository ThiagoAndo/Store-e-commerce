import UserLogin from "@/components/forms/UserLogin";
import { useState, useContext } from "react";
import { signIn } from "next-auth/react";
import NotificationContext from "@/store/context/notification-context";
import { setStorage, setAddress } from "@/helpers/functions";
import { fetchCartData } from "@/helpers/cart-actions";
import { useDispatch } from "react-redux";
import { deleteCartData, sendCartData } from "@/helpers/cart-actions";

import Head from "next/head";
function Login() {
  const [feedback, setFeedback] = useState("");
  const notificationCtx = useContext(NotificationContext);
  const dispatch = useDispatch();
  // Handles the user login process, including user authentication and cart management
  // function handleLogin({ email_address, password }) {
  function handleLogin() {
    // notificationCtx.showNotification({
    //   title: "Sending Request:",
    //   message: `GETTING USER CREDENTIALS.`,
    //   status: "pending",
    // });

    signIn("credentials", {
      redirect: false,
      email: "ando.thiago@gmail.com",
    });

       setStorage({ id:"34",
         email_address:"ando.thiago@gmail.com",
          first_name:"Thiago",
           last_name:"Freitas",
            token:"zvvzxcvxzcvxzcvxc" });
    // try {
    //   fetch(
    //     // `http://localhost:8080/user/get`,
    //     `https://api-store-pj2y.onrender.com/user/get`,
    //     {
    //       method: "POST",
    //       body: JSON.stringify({
    //         email: email_address,
    //         password,
    //       }),
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   )
    //     .then((response) => {
    //       if (response.ok) {
    //         // Hides notification once user data is successfully retrieved
    //         notificationCtx.hideNotification();
    //         return response.json();
    //       } else {
    //         // Sets feedback message if database connection fails
    //         setFeedback({ message: "Connecting to the database failed!" });
    //         throw "Connecting to the database failed!";
    //       }
    //     })
    //     .then((data) => {
    //       // Displays a response message if user input does not match database records
    //       if (data.hasOwnProperty("message")) {
    //         setFeedback(data);
    //       } else {
    //         // Establishes a session using NextAuth after successful user verification
    //         signIn("credentials", {
    //           redirect: false,
    //           email: email_address,
    //         });
    //         // Saves user data locally for autofilling forms
    //         setStorage(data);
    //         setAddress(data.id);
    //         // Manages cart data based on the current user session
    //         const isCart = JSON.parse(localStorage.getItem("cart"));
    //         if (isCart === null) {
    //           // Fetches existing cart data if no local cart is found
    //           dispatch(fetchCartData(data.id));
    //         } else {
    //           // Deletes the previous cart and replaces it with the new local cart data
    //           const user_id = localStorage.getItem("id");
    //           deleteCartData(user_id);
    //           isCart.map((p) => {
    //             const { id, name, price, quantity } = p;
    //             sendCartData({ id, name, price, quantity });
    //           });
    //         }
    //       }
    //     });
    // } catch (error) {
    //   notificationCtx.showNotification({
    //     title: "Sending Request:",
    //     message: error.message.toUpperCase(),
    //     status: "error",
    //   });
    // }
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <UserLogin handling={handleLogin} LoginBack={feedback} />
    </>
  );
}

export default Login;
