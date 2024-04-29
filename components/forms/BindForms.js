import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useInputAnimation } from "@/hooks/useInput";
import { useNotification } from "@/hooks/useNotification";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";

import {
  inpuReg,
  fieldNames,
  fieldChekout,
} from "@/components/ui/formInput/inputInfo";
import { gatherData } from "@/helpers/functions";
import {
  isEmailValid,
  isNameValid,
  isPasswordValid,
} from "@/helpers/functions";
import UserCheckOut from "./UserCheckout";
import UserSignIn from "./UserSignIn";

function BindForms({ submitHandler, feedBack }) {
  const { focus, empty, scope } = useInputAnimation();
  const [isGuest, setIsGuest] = useState(true);
  const [isOrdering, setIsOrdering] = useState(null);
  const { notification } = useNotification();
  const { data: session } = useSession();
  const cartItems = useSelector((state) => state.cart.items);
  const [checked, setChecked] = useState("e-money");



  useEffect(() => {
    if (feedBack?.message) {
      notification(null, feedBack.message, "Invalid Action:");
      return;
    } else if (feedBack?.email_address) {
      notification(
        null,
        "User registered successfully!",
        "Registered:",
        "success"
      );
    }

    const order = localStorage.getItem("order");
    if (order && session) {
      setIsGuest(true);
    } else if (order && !session) {
      setIsOrdering(true);
    }
  }, [feedBack, setIsOrdering, setIsGuest, notification]);

  // return isGuest === true ? (
  //   <UserCheckOut
  //     handleSubmit={"handleSubmit"}
  //     onOptionChange={"onOptionChange"}
  //     scope={"scope"}
  //   />
  // ) : (
  //   <UserSingIn
  //     handleSubmit={"handleSubmit"}
  //     isOrdering={"isOrdering"}
  //     isOrdehanhandleGuestdleGuestring={"handleGuest"}
  //     scope={"scope"}
  //   />
  // );

  return <UserSignIn handleGuest={handleGuest} />;
}

export default BindForms;
