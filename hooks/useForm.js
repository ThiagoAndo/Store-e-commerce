import { useState } from "react";
import { useInputAnimation } from "@/hooks/useInput";
import { useNotification } from "@/hooks/useNotification";
import { useSelector } from "react-redux";
import {
  fieldRegister,
  fieldChekout,
  fieldProfile,
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
  let name;
  let email;
  let password;
  const getEvent = (e, isSignin, isLogin, isCheck, isProfile) => {
    e.preventDefault();
    let inpFields = [];
    let name = true;
    if (cartItems.length <= 0 && isCheck) {
      notification(null, "Empty cart:", `CHOSE A PEODUCT TO PROCEED.`, "error");
      return {
        check: false,
        signin: false,
      };
    }

    const { entries, data } = gatherData(e);

    let index = 0;
    let checkEmpty = 0;
    function confEmpty(passed, i, len) {
      const thiI = i || 0;
      const thisLeng = len || entries.length;

      entries.slice(thiI, thisLeng).map(() => {
        focus({
          target: {
            id: passed[index].input,
          },
        });
      });
      entries.slice(thiI, thisLeng).map((field, i) => {
        if (field === "") {
          empty(passed[i]);
          checkEmpty++;
        }
      });
    }
    if (isSignin) {
      inpFields = fieldRegister;
      confEmpty(fieldRegister);
    } else if (isLogin) {
      inpFields.push(fieldRegister[2]);
      inpFields.push(fieldRegister[3]);
      confEmpty(inpFields);
      entries.unshift("", "");
      inpFields.unshift("", "");
    } else if (isProfile[0] && isProfile[1][0]) {
      if (isProfile[1].length == 1) {
        if (isProfile[1][0] === "user") {
          confEmpty(fieldProfile.slice(0, 3), 0, 3);
          inpFields = fieldProfile.slice(0, 3);
        } else if (isProfile[1][0] === "add") {
          confEmpty(fieldProfile.slice(3, 7), 3, 7);
          inpFields = fieldProfile.slice(3, 5);
        }
      } else {
        confEmpty(fieldProfile);
        inpFields = fieldProfile;
      }
    } else if (isCheck) {
      inpFields = fieldChekout;
      confEmpty(
        checked === "e-money"
          ? fieldChekout
          : [...fieldChekout.slice(0, [fieldChekout.length - 2])]
      );
    }

    if (checkEmpty > 0) {
      if (isCheck || isProfile[0]) {
        notification(null, "Empty Fields:", `FILL IN THE FORM`, "error");
      }
      return {
        login: false,
        check: false,
        signin: false,
        prof: false,
      };
    }

    if (isSignin || isCheck || isProfile[0]) {
      const first = entries[0][0].toUpperCase() + entries[0].slice(1);
      const last = entries[1][0].toUpperCase() + entries[1].slice(1);
      name = isNameValid(first + " " + last);
    }
    email = isEmailValid(entries[2]);
    password = isPasswordValid(entries[3]);

    if (!email && (isSignin || isLogin || isCheck || isProfile[0])) {
      empty(inpFields[2]);
      notification("email");
    } else if (!name) {
      notification("name");
      empty(inpFields[0]);
      empty(inpFields[1]);
    } else if (!password && (isSignin || isLogin)) {
      notification("password");
      empty(inpFields[3]);
    }
    return {
      login: email && password,
      check: email && name,
      signin: email && name && password,
      prof: email && name,
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
