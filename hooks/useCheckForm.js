// This application handles various scenarios with multiple forms.
// Each form is validated for empty fields, checks user input for correctness,
// and displays appropriate feedback messages accordingly

import { useNotification } from "@/hooks/useNotification";
import { gatherData } from "@/helpers/functions";
import {
  isEmailValid,
  // isNameValid,
  isPasswordValid,
} from "@/helpers/functions";
export default function useCheckForm() {
  const { notification } = useNotification();

  const isValid = ({ e, fields, empty }) => {
    e.preventDefault();
    const { data } = gatherData(e);
    let isOk = true;
    let i = 0;
    while (i < fields.length) {
      switch (fields[i].input) {
        case "first_name":
          const name = data.first_name.trim().split(" ");
          console.log("type name");
          console.log(typeof name);
          console.log(name);
          if (name.length > 1) {
            notification("first");
            empty(fields[i]);
            isOk = false;
            i = 1000;
          }
          break;
        case "last_name":
          const last = data.last_name.trim().split(" ");
          if (last.length > 1) {
            notification("last");
            empty(fields[i]);
            isOk = false;
            i = 1000;
          }
          break;
        case "email_address":
          console.log("chamo");
          if (!isEmailValid(data.email_address)) {
            notification("email");
            empty(fields[i]);
            isOk = false;
            i = 1000;
          }
          break;
        case "password":
          if (!isPasswordValid(data.password)) {
            notification("password");
            empty(fields[i]);
            isOk = false;
            i = 1000;
          }
          break;
      }
      i++;
    }

    return { isOk, data };
  };

  return { isValid };
}
