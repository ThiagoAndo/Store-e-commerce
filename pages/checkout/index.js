import UserCheckOut from "@/components/forms/UserCheckout";
import { useContext } from "react";
import NotificationContext from "@/store/context/notification-context";
import { confActions } from "@/store/redux/conf.slice";
import { useDispatch } from "react-redux";
import { getUserToken, set, setAdd } from "@/helpers/functions";
import {
  inpuShip,
  inpuPay,
  inpuReg,
  fieldChekout,
} from "@/components/ui/formInput/inputInfo";

function CheckoutPage() {
  const notificationCtx = useContext(NotificationContext);
  const dispatch = useDispatch();
  const inpCheck = inpuReg.slice();
  inpCheck.pop();
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
    let reqArray = [];
    if (id) {
      reqArray = [order, add];
    } else {
      reqArray = [order];
    }
    reqArray.forEach((e) => {
      try {
        const token = getUserToken();
        fetch(
          // `http://localhost:8080/${e.route}`,
          `https://libraryapi-gtct.onrender.com/${e.route}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify({ ...e }),
          }
        ).then((response) => {
          console.log(response);
          if (response.ok && e.route != "add") {
            const id = localStorage.getItem("id");
            setAdd(id);
            dispatch(confActions.toggle());
          }
        });
      } catch (error) {
        console.log(error);
      }
    });
  }

  return (
    <UserCheckOut
      handleSubmit={handleCheck}
      inpuShip={inpuShip}
      inpuPay={inpuPay}
      inpCheck={inpCheck}
      fieldChekout={fieldChekout}
      checkout={true}
      profile={false}
    />
  );
}
export default CheckoutPage;
