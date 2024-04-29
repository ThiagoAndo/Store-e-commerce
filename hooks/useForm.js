import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useInputAnimation } from "@/hooks/useInput";
import { useNotification } from "@/hooks/useNotification";
import { useSession } from "next-auth/react";
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

  const getEvent = (e, isGuest = false) => {
    e.preventDefault();
    let inpFields;

    isGuest === true ? (inpFields = fieldChekout) : (inpFields = fieldRegister);

    if (cartItems.length <= 0 && isGuest) {
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
    let check = 0;

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
          check++;
        }
        index++;
      });
    }

    if (!isGuest) {
      confEmpty(fieldRegister);
    } else {
      confEmpty(
        checked === "e-money"
          ? fieldChekout
          : [...fieldChekout.slice(0, [fieldChekout.length - 2])]
      );
    }

    if (check > 0) {
      return {
        check: false,
        signin: false,
      };
    }

    const first = entries[0][0].toUpperCase() + entries[0].slice(1);
    const last = entries[1][0].toUpperCase() + entries[1].slice(1);

    const email = isEmailValid(entries[2]);
    const name = isNameValid(first + " " + last);
    const password = isPasswordValid(entries[3]);

    if (!email) {
      empty(inpFields[2]);
      notification("email");
    } else if (!name) {
      notification("name", "make sure to write one name per field.");
      empty(inpFields[0]);
      empty(inpFields[1]);
    } else if (!password && !isGuest) {
      notification("password");
      empty(inpFields[3]);
    }
    return {
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
