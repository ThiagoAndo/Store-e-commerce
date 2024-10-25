import UserLogin from "@/components/forms/UserLogin";
import { useState, useContext } from "react";
import { signIn } from "next-auth/react";
import NotificationContext from "@/store/context/notification-context";
import { setStorage, setAdd } from "@/helpers/functions";
import { fetchCartData } from "@/helpers/cart-actions";
import { useDispatch } from "react-redux";
import { deleteCartData, sendCartData } from "@/helpers/cart-actions";
function Login() {
  const [feedback, setFeedback] = useState("");
  const notificationCtx = useContext(NotificationContext);
  const dispatch = useDispatch();

  function handleLogin({ email_address, password }) {
    notificationCtx.showNotification({
      title: "Sending Request:",
      message: `GETTING USER CREDENTIALS.`,
      status: "pending",
    });
    try {
      fetch(
        // `http://localhost:8080/user/get`,
        `https://api-store-pj2y.onrender.com/user/get`,
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
            notificationCtx.hideNotification()
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
            setAdd(data.id);
            
            const isCart = JSON.parse(localStorage.getItem("cart"));
            console.log(isCart);
            console.log("isCart");
            if (isCart === null) {
              dispatch(fetchCartData(data.id));
            } else {
              const user_id = localStorage.getItem("id");
              deleteCartData(user_id, 0);

              isCart.forEach((e) => {
                sendCartData(e);
              });
            }
          }
        });
    } catch (error) {
      notificationCtx.showNotification({
        title: "Sending Request:",
        message: error.message.toUpperCase(),
        status: "error",
      });
    }
  }

  return <UserLogin handling={handleLogin} LoginBack={feedback} />;
}

export default Login;
