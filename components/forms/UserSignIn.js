import { AnimatePresence, motion, useAnimate, stagger } from "framer-motion";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

import Input from "../ui/formInput/input";
import style from "./UserSignIn.module.css";
import NotificationContext from "@/store/context/notification-context";
import {
  isEmailValid,
  isNameValid,
  isPasswordValid,
} from "@/helpers/functions";
import { inpuReg } from "@/helpers/inputInfo";

function UserSignIn({ submitHandler, feedBack }) {
  const [scope, animate] = useAnimate();
  const router = useRouter();
  const notificationCtx = useContext(NotificationContext);

  function hadleNotification(field) {
    notificationCtx.showNotification({
      title: "Wrong Input:",
      message: `Your ${field} is not valid. Make sure to enter a valid one!.`,
      status: "error",
    });
  }

  function handleFocus(e) {
    const myTarget = "#" + e.target.id;
    const labelTarget = "#lab" + e.target.id;
    animate(
      myTarget,
      { background: "#ddd6cb", color: "#142020" },
      { type: "spring", duration: 0.2 }
    );
    animate(
      labelTarget,
      { color: "#000000" },
      { type: "spring", duration: 0.2 }
    );
  }

  const handleEmpty = (label, input) => {
    animate(
      "#" + input,
      { x: [-10, 0, 10, 0], background: "#FA8072", color: "#FA8072" },
      { type: "spring", duration: 0.3, delay: stagger(0.05) }
    );

    animate(
      "#" + label,
      { x: [-10, 0, 10, 0], color: "#000000" },
      { type: "spring", duration: 0.3, delay: stagger(0.05) }
    );
  };

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const user = Object.fromEntries(fd.entries());

    // if (!line_one && !line_two && !town_city && !constry_state) {
    //   handleEmpty("labline_one", "line_one");
    //   handleEmpty("labline_two", "line_two");
    //   handleEmpty("labtown_city", "town_city");
    //   handleEmpty("labconstry_state", "constry_state");
    //   return;
    // } else if (!line_one) {
    //   handleEmpty("labline_one", "line_one");

    //   return;
    // } else if (!line_two) {
    //   handleEmpty("labline_two", "line_two");

    //   return;
    // } else if (!town_city) {
    //   handleEmpty("labtown_city", "town_city");

    //   return;
    // } else if (!constry_state) {
    //   handleEmpty("labconstry_state", "constry_state");

    //   return;
    // }

    let email = user.email_address.trim().toLowerCase();
    let first = user.first_name.trim().toLowerCase();
    let last = user.last_name.trim().toLowerCase();
    let password = user.password.trim();
    // let line_one = user.line_one.trim().toLowerCase();
    // let line_two = user.line_two.trim().toLowerCase();
    // let town_city = user.town_city.trim().toLowerCase();
    // let constry_state = user.constry_state.trim();
    if (!email && !password && !first && !last) {
      handleEmpty("labemail_address", "email_address");
      handleEmpty("labpassword", "password");
      handleEmpty("labfirst_name", "first_name");
      handleEmpty("lablast_name", "last_name");
      return;
    } else if (!email) {
      handleEmpty("labemail_address", "email_address");
      return;
    } else if (!password) {
      handleEmpty("labpassword", "password");
      return;
    } else if (!first) {
      handleEmpty("labfirst_name", "first_name");
      return;
    } else if (!last) {
      handleEmpty("lablast_name", "last_name");
      return;
    }

    first = first[0].toUpperCase() + first.slice(1);
    last = last[0].toUpperCase() + last.slice(1);

    email = isEmailValid(user.email_address);
    const name = isNameValid(first + " " + last);
    password = isPasswordValid(user.password);

    if (!email) {
      user.email_address = "";
      handleEmpty("labemail_address", "email_address");

      hadleNotification("email");
    } else if (!name) {
      user.first_name = "";
      user.last_name = "";
      hadleNotification("name");
      handleEmpty("labfirst_name", "first_name");
      handleEmpty("lablast_name", "last_name");
    } else if (!password) {
      user.password = "";
      hadleNotification("password");
      handleEmpty("labpassword", "password");
    }
    if (email && name && password) {
      submitHandler(user);
    }
  }

  useEffect(() => {
    const isOrdering = localStorage.getItem("order");
    if (feedBack?.message) {
      notificationCtx.showNotification({
        title: "Invalid Action:",
        message: feedBack.message,
        status: "error",
      });
      return;
    } else if (feedBack?.email_address) {
      notificationCtx.showNotification({
        title: "Registered:",
        message: "User registered successfully!",
        status: "success",
      });
      if (isOrdering === "ordering") {
        router.replace("/addressForm");
      } else {
        router.replace("/");
      }
    }
  }, [feedBack]);

  function handleGuest() {
    router.push("/addressForm");
  }

  return (
    <>
      <AnimatePresence>
        <motion.div
          className={style.container}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          <form onSubmit={handleSubmit} ref={scope}>
            <div className={style.action}>
              <h2>Registration</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 250 }}
                onClick={handleGuest}
              >
                Guest checkout
              </motion.button>
            </div>
            <div className={style.input_container}>
              {inpuReg.map((inp) => (
                <Input
                  key={inp.id}
                  id={inp.id}
                  ph={inp.ph}
                  handleFocus={handleFocus}
                />
              ))}

              {/*
            
           
             
         
         
           
              <div className={style.action}>
                <h2>SHIPPING INFO</h2>
              </div>
              <div className={style.input_container}>
                <div>
                  <label
                    className={style.label}
                    htmlFor="line_one"
                    id="labline_one"
                  >
                    Address line 1
                  </label>
                  <input
                    placeholder="e.g. 156 ashgrove"
                    className={style.input}
                    type="text"
                    id="line_one"
                    name="line_one"
                    onFocus={handleFocus}
                  />
                </div>
                <div>
                  <label
                    className={style.label}
                    htmlFor="line_two"
                    id="labline_two"
                  >
                    Town/City
                  </label>
                  <input
                    placeholder="e.g cookstown"
                    className={style.input}
                    type="text"
                    id="line_two"
                    name="line_two"
                    onFocus={handleFocus}
                  />
                </div>
                <div>
                  <label
                    className={style.label}
                    htmlFor="town_city"
                    id="labtown_city"
                  >
                    Address line 2
                  </label>
                  <input
                    placeholder="e.g. Dublin 12"
                    className={style.input}
                    type="text"
                    id="town_city"
                    name="town_city"
                    onFocus={handleFocus}
                  />
                </div>
                <div>
                  <label
                    className={style.label}
                    htmlFor="constry_state"
                    id="labconstry_state"
                  >
                    County/State
                  </label>
                  <input
                    placeholder="e.g. Dublin"
                    className={style.input}
                    type="text"
                    id="constry_state"
                    name="constry_state"
                    onFocus={handleFocus}
                  />
                </div> 
              </div>*/}
              <motion.button
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 150 }}
                className={style.button}
              >
                REGISTER
              </motion.button>
            </div>
          </form>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default UserSignIn;
