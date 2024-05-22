import UserCheckOut from "@/components/forms/UserCheckout";
import { useContext, useEffect } from "react";
import NotificationContext from "@/store/context/notification-context";
import { confActions } from "@/store/redux/conf.slice";
import { useDispatch, useSelector } from "react-redux";

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

    let order = {
      route: "order",
      id: localStorage.getItem("id") || null,
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
      id: localStorage.getItem("id") || null,
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
        ).then((response) => {
          if (response && e.route ==="add") {
            dispatch(confActions.toggle());
          }
        });
      } catch (error) {
        console.log(error);
      }
    });
  }
  useEffect(() => {}, []);
  return (
      <UserCheckOut handleSubmit={handleCheck} />
  );
}

export default CheckoutPage;
