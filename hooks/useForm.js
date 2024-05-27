import {  useState } from "react";
import { useInputAnimation } from "@/hooks/useInput";
import { useNotification } from "@/hooks/useNotification";
import { useSelector } from "react-redux";

import {
  fieldRegister,
  fieldChekout,
} from "@/components/ui/formInput/inputInfo";
import { gatherData } from "@/helpers/functions";
import {
  isEmailValid,
  isNameValid,
  isPasswordValid,
} from "@/helpers/functions";

export default function useForm() {
  const { notification } = useNotification();
  const { focus, empty, scope } = useInputAnimation();
  const [checked, setChecked] = useState("e-money");
  const cartItems = useSelector((state) => state.cart.items);

  const getEvent = (e, isSignin, isLogin, isCheck) => {
    e.preventDefault();
    let inpFields = [];
    let name = true;

    if (isSignin) {
      inpFields = fieldRegister;
    } else if (isLogin) {
      inpFields.push(fieldRegister[2]);
      inpFields.push(fieldRegister[3]);
    } else if (isCheck) {
      inpFields = fieldChekout;
    }

    if (cartItems.length <= 0 && isCheck) {
      notification(
        null,
        "Empty cart:",
        `Choose a product to proceed.`,
        "pending"
      );
      return {
        check: false,
        signin: false,
      };
    }

    const { entries, data } = gatherData(e);
    let index = 0;
    let checkEmpty = 0;

    function confEmpty(passed) {
      entries.map(() => {
        focus({
          target: {
            id: passed[index].input,
          },
        });
      });

      entries.map((field) => {
        if (field === "") {
          empty(passed[index]);
          checkEmpty++;
        }
        index++;
      });
    }

    if (isSignin) {
      confEmpty(fieldRegister);
    } else if (isLogin) {
      confEmpty(inpFields);
      entries.unshift("","");
      inpFields.unshift("","")
    } else if (isCheck) {
      confEmpty(
        checked === "e-money"
          ? fieldChekout
          : [...fieldChekout.slice(0, [fieldChekout.length - 2])]
      );
    }

    if (checkEmpty > 0) {
      return {
        login: false,
        check: false,
        signin: false,
      };
    }

    if (isSignin || isCheck) {
      const first = entries[0][0].toUpperCase() + entries[0].slice(1);
      const last = entries[1][0].toUpperCase() + entries[1].slice(1);
      name = isNameValid(first + " " + last);
    }
    const email = isEmailValid(entries[2]);
    const password = isPasswordValid(entries[3]);

    if (!email) {
      empty(inpFields[2]);
      notification("email");
    } else if (!name) {
      notification("name", "make sure to write one name per field.");
      empty(inpFields[0]);
      empty(inpFields[1]);
    } else if (!password && (isSignin||isLogin)) {
      notification("password");
      empty(inpFields[3]);
    }
    return {
      login: email && password,
      check: email && name,
      signin: email && name && password,
      data,
    };
  };
  return {
    cartItems,
    scope,
    checked,
    focus,
    setChecked,
    getEvent,
  };
}
