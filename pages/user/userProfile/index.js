import { useRouter } from "next/router";
import { setAdd } from "@/helpers/functions";
import {
  inpuShip,
  inpuPay,
  inpuReg,
  fieldChekout,
} from "@/components/ui/formInput/inputInfo";
import { useNotification } from "@/hooks/useNotification";
import { getUserToken, updateData } from "@/helpers/functions";
import UserCheckOut from "@/components/forms/UserCheckout";
const inpCheck = [inpuReg[0], inpuReg[1], inpuReg[2]];
function ChangeData() {
  const route = useRouter();
  const { notification } = useNotification();

  function handleCheck(data, whatChange) {
    if (whatChange.length === 0) {
      notification(
        null,
        "Invalid Action:",
        "USER DETAILS HAVE NOT CHANGED",
        "error"
      );
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
            notification(
              null,
              "Success:",
              "USER INFORMATION HAS BEEN UPDATED.",
              "success"
            );
            if (url === "user") {
              
              updateData(data.email_address, )
            } else {
              setAdd(id);
            }

            route.push("/");
          } else {
            throw "Connecting to the database failed!";
          }
        } catch (error) {
          console.log(error);
          notification(null, "Sending Request:", error.message, "error");
        }
      }
    }
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
