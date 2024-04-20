import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { useInputAnimation } from "@/hooks/useInput";
import { useNotification } from "@/hooks/useNotification";
import { useRouter } from "next/router";
import Radio from "../ui/formInput/inputRadio";
import {
  inpuReg,
  inpuShip,
  inpuPay,
  fieldNames,
} from "@/components/ui/formInput/inputInfo";
import { gatherData } from "@/helpers/functions";
import Cart from "../cart/cart";
import Input from "../ui/formInput/input";
import style from "./UserSignIn.module.css";
import style_2 from "./UserCheck.module.css";

import {
  isEmailValid,
  isNameValid,
  isPasswordValid,
} from "@/helpers/functions";

function UserSignIn({ submitHandler, feedBack }) {
  const cartItems = useSelector((state) => state.cart.items);
  const { focus, empty, scope } = useInputAnimation();
  const [isGuest, setIsGuest] = useState(false);
  const [isOrdering, setIsOrdering] = useState(null);
  const [checked, setChecked] = useState("e-money");
  const { notification } = useNotification();
  const router = useRouter();
  const inpCheck = inpuReg.slice();

  inpCheck.pop();
  const namesCheck = [
    ...fieldNames.slice(0, 3),
    ...fieldNames.slice(4, fieldNames.length),
  ];

  const onOptionChange = (val) => {
    setChecked(val);
  };

  function handleGuest() {
    setIsGuest(!isGuest);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (cartItems.length <= 0 && isGuest) {
      notification(
        null,
        "Empty cart:",
        `You have not choose any product.`,
        "pending"
      );
      return;
    }

    const entries = gatherData(e);
    let index = 0;
    let check = 0;

    function confEmpty(fields) {
      entries.map((field) => {
        if (field === "") {
          empty(fields[index]);
          check++;
        }
        index++;
      });
    }
    confEmpty(
      isGuest === true
        ? namesCheck
        : checked === "e-money"
        ? fieldNames
        : [...fieldNames[fieldNames.length - 2]]
    );

    if (check > 0) return;

    const first = entries[0][0].toUpperCase() + entries[0].slice(1);
    const last = entries[1][0].toUpperCase() + entries[1].slice(1);

    const email = isEmailValid(entries[2]);
    const name = isNameValid(first + " " + last);
    const password = isPasswordValid(entries[3]);

    if (!email) {
      empty(fieldNames[2]);
      notification("email");
    } else if (!name) {
      notification("name", "make sure to write one name per field.");
      empty(fieldNames[0]);
      empty(fieldNames[1]);
    } else if (!password && !isGuest) {
      notification("password");
      empty(fieldNames[3]);
    }
    if (email && name && password && !isGuest) {
      submitHandler({
        first_name: first,
        last_name: last,
        email_address: entries[2],
        password: entries[3],
      });
    }
  }

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
    if (order) {
      setIsOrdering(true);
      setIsGuest(true);
    }
  }, [feedBack, setIsOrdering, setIsGuest, notification]);

  const singIn = (
    <>
      <motion.div
        className={style.container}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <form onSubmit={handleSubmit} ref={scope}>
          <div className={style.action}>
            <h2>REGISTRATION</h2>
            {isOrdering && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 250 }}
                onClick={handleGuest}
              >
                Guest checkout
              </motion.a>
            )}
          </div>
          <div className={style.input_container}>
            {inpuReg.map((inp) => (
              <Input
                key={inp.id}
                id={inp.id}
                ph={inp.ph}
                typeI={inp.type}
                handleFocus={focus}
              />
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 150 }}
            className={style.button}
          >
            REGISTER
          </motion.button>
        </form>
      </motion.div>
    </>
  );

  const checkOut = (
    <AnimatePresence>
      <motion.div
        className={style_2.check_pag}
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <div className={style.container + " " + style_2.container}>
          <form onSubmit={handleSubmit} ref={scope}>
            <div className={style.action}>
              <h2>CHECKOUT</h2>
            </div>
            <p>BILLING DETAILS</p>
            <div className={style_2.detail}>
              {inpCheck.map((inp) => (
                <Input
                  key={inp.id}
                  id={inp.id}
                  ph={inp.ph}
                  typeI={inp.type}
                  handleFocus={focus}
                />
              ))}
            </div>
            <p>SHIPPING INFO</p>
            <div className={style_2.shipping}>
              {inpuShip.map((inp) => (
                <Input
                  key={inp.id}
                  id={inp.id}
                  ph={inp.ph}
                  typeI={inp.type}
                  handleFocus={focus}
                />
              ))}
            </div>
            <p>SHIPPING INFO</p>
            <div className={style_2.payment}>
              <p>Payment Method </p>
              <Radio
                id={"e-money"}
                lab={"e-money"}
                onChoice={onOptionChange}
                check={checked}
              />
              <Radio
                id={"cash"}
                name={"acquisition"}
                lab={"Cash on Delivery"}
                onChoice={onOptionChange}
                check={checked}
              />
              {inpuPay.map((inp) => (
                <Input
                  key={inp.id}
                  id={inp.id}
                  ph={inp.ph}
                  typeI={inp.type}
                  dis={checked === "e-money" ? false : true}
                  handleFocus={focus}
                />
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 150 }}
              className={style.button}
            >
              CONTINUE & PAY
            </motion.button>
          </form>
        </div>
        {cartItems.length > 0 && (
          <div className={style_2.summary}>
            <Cart cart={false} />
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );

  return isGuest === true ? checkOut : singIn;
}

export default UserSignIn;
