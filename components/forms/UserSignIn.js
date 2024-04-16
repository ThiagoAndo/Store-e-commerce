import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInputAnimation } from "@/hooks/useInput";
import { useNotification } from "@/hooks/useNotification";
import { useRouter } from "next/router";
import { inpuReg } from "@/helpers/inputInfo";
import { inpuShip } from "@/helpers/inputInfo";
import { inpuCheck } from "@/helpers/inputInfo";
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
  const router = useRouter();
  const [isGuest, setIsGuest] = useState(false);
  const { focus, empty, scope } = useInputAnimation();
  const { handle } = useNotification();

  let entries = [];

  const fieldNames = [
    { label: "labemail_address", input: "email_address" },
    { label: "labfirst_name", input: "first_name" },
    { label: "lablast_name", input: "last_name" },
    { label: "labpassword", input: "password" },
  ];

  function handleGuest() {
    setIsGuest(!isGuest);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const user = Object.fromEntries(fd.entries());

    const acquisitionChannel = fd.getAll("acquisition");
    const data = Object.fromEntries(fd.entries());
    data.acquisition = acquisitionChannel;

    let index = 0;
    let check = 0;

    let line_one = user.line_one.trim().toLowerCase();
    let line_two = user.line_two.trim().toLowerCase();
    let town_city = user.town_city.trim().toLowerCase();
    let constry_state = user.constry_state.trim();

    entries[0] = user.email_address.trim().toLowerCase();
    entries[1] = user.first_name.trim().toLowerCase();
    entries[2] = user.last_name.trim().toLowerCase();
    entries[3] = user.password.trim();

    entries.map((field) => {
      if (!field) {
        empty(fieldNames[index]);
        check++;
      }
      index++;
    });
    if (check > 0) return;

    entries[1] = entries[1][0].toUpperCase() + entries[1].slice(1);
    entries[2] = entries[2][0].toUpperCase() + entries[2].slice(1);

    const email = isEmailValid(entries[0]);
    const name = isNameValid(entries[1] + " " + entries[2]);
    const password = isPasswordValid(entries[3]);

    if (!email) {
      empty(fieldNames[0]);
      handle("email");
    } else if (!name) {
      handle("name", "make sure to write one name per field.");
      empty(fieldNames[1]);
      empty(fieldNames[2]);
    } else if (!password) {
      handle("password");
      empty(fieldNames[3]);
    }
    if (email && name && password) {
      // submitHandler(user);
    }
  }

  useEffect(() => {
    const isOrdering = localStorage.getItem("order");
    if (feedBack?.message) {
      handle(null, feedBack.message, "Invalid Action:");
      return;
    } else if (feedBack?.email_address) {
      handle(null, "User registered successfully!", "Registered:", "success");

      if (isOrdering === "ordering") {
        router.replace("/addressForm");
      } else {
        router.replace("/");
      }
    }
  }, [feedBack]);

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
            <motion.a
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 250 }}
              onClick={handleGuest}
            >
              Guest checkout
            </motion.a>
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
        className={style.container + " " + style_2.container}
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <form onSubmit={handleSubmit}>
          <div className={style.action}>
            <h2>CHECKOUT</h2>
          </div>
          <div className={style_2.inf}>
            {inpuCheck.map((inp) => (
              <Input
                key={inp.id}
                id={inp.id}
                ph={inp.ph}
                typeI={inp.type}
                styleL={style.label}
                styleP={style.input}
                handleFocus={focus}
              />
            ))}
          </div>
        </form>
        <div className={style_2.summary}>
          <Cart cart={false} />
        </div>
      </motion.div>
    </AnimatePresence>
  );

  return isGuest === true ? checkOut : singIn;
}

export default UserSignIn;
