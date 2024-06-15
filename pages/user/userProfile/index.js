import { useRouter } from "next/router";
import { setAdd } from "@/helpers/functions";
import {
  inpuShip,
  inpuPay,
  inpuReg,
  fieldChekout,
} from "@/components/ui/formInput/inputInfo";
import { useNotification } from "@/hooks/useNotification";
<<<<<<< HEAD
import { getUserToken, updateData } from "@/helpers/functions";
import UserCheckOut from "@/components/forms/UserCheckout";
const inpCheck = [inpuReg[0], inpuReg[1], inpuReg[2]];
function ChangeData() {
  const route = useRouter();
  const { notification } = useNotification();

  function handleCheck(data, whatChange) {
=======
import UserCheckOut from "@/components/forms/UserCheckout";
import { getUserToken } from "@/helpers/functions";
import { useRouter } from "next/router";
import { setStorage, adrStorage } from "@/helpers/functions";

const inpCheck = [inpuReg[0], inpuReg[1], inpuReg[2]];
function ChangeData() {
  const { notification } = useNotification();
  const route = useRouter();
  async function handleCheck(data, whatChange) {
>>>>>>> Profile-feature
    if (whatChange.length === 0) {
      notification(
        null,
        "Invalid Action:",
        "USER DETAILS HAVE NOT CHANGED",
        "error"
      );
<<<<<<< HEAD
    } else {
      const id = localStorage.getItem("id");
      if (whatChange.includes("detail")) {
        const { first_name, last_name, email_address } = data;
        const http = "user";
        fetchData({ id, first_name, last_name, email_address }, http);
      }

      if (whatChange.includes("address")) {
        const { line_one, line_two, town_city, constry_state } = data;
        const http = "add";
        fetchData({ id, line_one, line_two, town_city, constry_state }, http);
      }

      async function fetchData(data, url) {
        notification(null, "Sending Request:", "SAVING USER DATA", "pending");
        const token = getUserToken();
        const email = data.email_address

        try {
          let response = await fetch(
            // `http://localhost:8080/${url}`,
            `https://libraryapi-gtct.onrender.com/${url}`,
            {
              method: "PATCH",
              body: JSON.stringify(data),
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          );
          if (response.ok) {
            data = await response.json();
            if (data?.error) {
              throw data.message
            } else {
              notification(
                null,
                "Success:",
                "USER INFORMATION HAS BEEN UPDATED.",
                "success"
              );
              if (url === "user") {
                updateData(email);
              } else {
                setAdd(id);
              }

              route.push("/");
            }
          } else {
            throw "Connecting to the database failed!";
          }
        } catch (error) {
          console.log(error);
          notification(null, "Sending Request:", error, "error");
        }
      }
    }
=======
      return;
    }
    const id = localStorage.getItem("id") || null;
    const httpCAll = [];
    const user = {
      route: "user",
      id,
      first_name: data.first_name,
      last_name: data.last_name,
      email_address: data.email_address,
    };
    const add = {
      route: "add",
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
    } else if (whatChange.length === 1 && whatChange[0] === "user") {
      httpCAll.push(add);
    } else {
      httpCAll.push(user);
      httpCAll.push(add);
    }

    httpCAll.forEach(async (e, index) => {
      let data = null;
      try {
        const token = getUserToken();
        const response = await fetch(
          // `http://localhost:8080/${e.route}`,
          `https://libraryapi-gtct.onrender.com/${e.route}`,
          {
            method: "PATCH",
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
          notification(null, "Invalid Action:", data.error, "error");
          return;
        }

        if (index === httpCAll.length - 1) {
          notification(
            null,
            "Sending Request:",
            "USER DETAILS HAVE BEEN UPDATED",
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
>>>>>>> Profile-feature
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
