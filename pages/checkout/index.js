import UserCheckOut from "@/components/forms/UserCheckout";
import { useContext } from "react";
import NotificationContext from "@/store/context/notification-context";
import { confActions } from "@/store/redux/conf.slice";
import { useDispatch } from "react-redux";
import { getUserToken } from "@/helpers/functions";
import { inpuShip, inpuPay, inpuReg, fieldChekout } from "@/helpers/inputInfo";
import { adrStorage } from "@/helpers/functions";
import Head from "next/head";

function CheckoutPage() {
  const notificationCtx = useContext(NotificationContext);
  const dispatch = useDispatch();
  const inpCheck = inpuReg.slice();
  inpCheck.pop();
   function handleCheck(data) {
    notificationCtx.showNotification({
      title: "Sending Request:",
      message: `PROCESSING INVOICE.`,
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
    const id = localStorage.getItem("id") || "Guest";
    const { first_name, last_name, email_address } = data;
    const { line_one, line_two, town_city, constry_state } = data;
    let user = {};
    if (isGuest()) {
      user = { id, first_name, last_name, email_address, cart: isGuest() };
    } else {
      user = { id, first_name, last_name, email_address };
    }
    const order = {
      route: "order",
      user,
    };

    const add = {
      route: "add",
      add: {
        line_one,
        line_two,
        town_city,
        constry_state,
        id,
      },
    };
    const keys = ["user", "add"];

    adrStorage(add.add);

    let reqArray = [];
    if (id != "Guest") {
      reqArray = [order, add];
    } else {
      reqArray = [order];
    }
    reqArray.forEach(async (e, i) => {
      try {
        const token = getUserToken();
        const response = await fetch(
          // `http://localhost:8080/${e.route}`,
          `https://api-store-pj2y.onrender.com/${e.route}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify({ ...e[keys[i]] }),
          }
        );

        if (response.ok && e.route != "add") {
          dispatch(confActions.changeType("conf"));
          dispatch(confActions.toggle());
          notificationCtx.hideNotification();
        }
      } catch (error) {
        notificationCtx.showNotification({
          title: "Error:",
          message: error.message.toUpperCase(),
          status: "error",
        });
      }
    });
  }

  return (
    <>
      <Head>
        <title>Checkout</title>
      </Head>
      <UserCheckOut
        handleSubmit={handleCheck}
        inpuShip={inpuShip}
        inpuPay={inpuPay}
        inpCheck={inpCheck}
        fieldChekout={fieldChekout}
        checkout={true}
        profile={false}
      />
    </>
  );
}
export default CheckoutPage;
