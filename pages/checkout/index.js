import UserCheckOut from "@/components/forms/UserCheckout";
import {  useContext } from "react";
import NotificationContext from "@/store/context/notification-context";

function CheckoutPage() {
  const notificationCtx = useContext(NotificationContext);

  function handleCheck(data) {
    notificationCtx.showNotification({
      title: "Sending Request:",
      message: `Processing Invoice.`,
      status: "pending",
    });
    const isGuest = () => {
      const isGuest = localStorage.getItem("guest");
      if (isGuest) {
        return JSON.parse(localStorage.getItem("cart"));
      } else {
        return false;
      }
    };

    const thisBody = {
      id: localStorage.getItem("id") || null,
      name: data.first_name + " " + data.last_name,
      email: data.email_address,
      cart: isGuest(),
    };

    console.log(thisBody);
    try {
      fetch(
        `http://localhost:8080/order`,
        //  `https://libraryapi-gtct.onrender.com/user/get`,
        {
          method: "POST",
          body: JSON.stringify(thisBody),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
        });
    } catch (error) {
      notificationCtx.showNotification({
        title: "Sending Request:",
        message: error.message,
        status: "error",
      });
    }
  }

  return <UserCheckOut handleSubmit={handleCheck} />;
}

export default CheckoutPage;
