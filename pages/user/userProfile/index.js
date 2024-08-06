import {
  inpuShip,
  inpuPay,
  inpuReg,
  fieldChekout,
} from "@/components/ui/formInput/inputInfo";
import { useNotification } from "@/hooks/useNotification";
import UserCheckOut from "@/components/forms/UserCheckout";
import { getUserToken } from "@/helpers/functions";
import { useRouter } from "next/router";
import { setStorage, adrStorage } from "@/helpers/functions";

const inpCheck = [inpuReg[0], inpuReg[1], inpuReg[2]];
function ChangeData() {
  const { notification } = useNotification();
  const route = useRouter();
  async function handleCheck(data, whatChange) {
    if (whatChange.length === 0) {
      notification(
        null,
        "Invalid Action:",
        "USER DETAILS HAVE NOT CHANGED",
        "error"
      );
      return;
    }
    const id = localStorage.getItem("id") || null;
    const hasAddress = localStorage.getItem("line_one");
    const httpCAll = [];
    const user = {
      route: "user",
      method: "PATCH",
      id,
      first_name: data.first_name,
      last_name: data.last_name,
      email_address: data.email_address,
    };
    const add = {
      route: "add",
      method: hasAddress ? "PATCH" : "POST",
      line_one: data.line_one,
      line_two: data.line_two,
      town_city: data.town_city,
      constry_state: data.constry_state,
      id,
    };
    setStorage(user, "not_null");
    adrStorage(add);
    if (whatChange.length === 1 && whatChange[0] === "user") {
      httpCAll.push(user);
    } else if (whatChange.length === 1 && whatChange[0] === "add") {
      httpCAll.push(add);
    } else {
      httpCAll.push(user);
      httpCAll.push(add);
    }

    httpCAll.forEach(async (e, index) => {
      let data = null;
      let method = null;

      try {
        const token = getUserToken();
        const response = await fetch(
          // `http://localhost:8080/${e.route}`,
          `https://api-store-pj2y.onrender.com/${e.route}`,
          {
            method: e.method,
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify({ ...e }),
          }
        );
        if (response.ok) {
          data = await response.json();
        }
        if (data?.error) {
          notification(
            null,
            "Invalid Action:",
            data.error.toUpperCase(),
            "error"
          );
          return;
        }

        if (index === httpCAll.length - 1) {
          notification(
            null,
            "Sending Request:",
            "USER DETAILS HAVE BEEN UPDATED.",
            "success"
          );
          route.push("/");
        } else {
          notification(null, "Invalid Action:", data.message, "error");
        }
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
      checkout={false}
      profile={true}
    />
  );
}
export default ChangeData;
