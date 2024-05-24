import UserCheckOut from "@/components/forms/UserCheckout";
import { useContext } from "react";
import NotificationContext from "@/store/context/notification-context";
import { confActions } from "@/store/redux/conf.slice";
import { useDispatch } from "react-redux";

function CheckoutPage() {
  const notificationCtx = useContext(NotificationContext);
  const dispatch = useDispatch();

  function handleCheck(data) {
    notificationCtx.showNotification({
      title: "Sending Request:",
      message: `Processing Invoice.`,
      status: "pending",
    });
    let isGuest = () => {
      const isGuest = localStorage.getItem("guest");
      if (isGuest) {
        return JSON.parse(localStorage.getItem("cart"));
      } else {
        return false;
      }
    };

    const id = localStorage.getItem("id") || null;

    let order = {
      route: "order",
      id,
      name: data.first_name + " " + data.last_name,
      email: data.email_address,
      cart: isGuest(),
    };

    let add = {
      route: "add",
      line_one: data.line_one,
      line_two: data.line_two,
      town_city: data.town_city,
      constry_state: data.constry_state,
      id,
    };
    let myArray = [];
    if (id) {
      myArray = [order, add];
    } else {
      myArray = [order];
    }
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
        ).then((response) => {
          if (response && e.route === "add") {
            dispatch(confActions.toggle());
          }
        });
      } catch (error) {
        console.log(error);
      }
    });
  }
  return <UserCheckOut handleSubmit={handleCheck} />;
}

export default CheckoutPage;
