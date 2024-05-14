import UserCheckOut from "@/components/forms/UserCheckout";
import { useContext } from "react";
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

    const id = localStorage.getItem("id") || null;

    const order = {
      route: "order",
      id,
      name: data.first_name + " " + data.last_name,
      email: data.email_address,
      cart: isGuest(),
    };

    const add = {
      route: "add",
      line_one: data.line_one,
      line_two: data.line_two,
      town_city: data.town_city,
      constry_state: data.constry_state,
      id,
    };
    const myArray = [order, add];

    myArray.forEach((e) => {
      console.log(e.identifier);
      console.log({ ...e });

      try {
        fetch(
          // `http://localhost:8080/${e.route}`,
           `https://libraryapi-gtct.onrender.com/${e.route}`,
          {
            method: "POST",
            body: JSON.stringify({ ...e }),
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
        console.log(error);
      }
    });
  }

  return <UserCheckOut handleSubmit={handleCheck} />;
}

export default CheckoutPage;
