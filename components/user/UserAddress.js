import { AnimatePresence, motion, useAnimate, stagger } from "framer-motion";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import style from "./UserSignIn.module.css";
import NotificationContext from "@/store/context/notification-context";
import {
  isEmailValid,
  isNameValid,
  isPasswordValid,
} from "@/helpers/functions";

function UserSignIn({ submitHandler, feedBack }) {
  const [scope, animate] = useAnimate();
  const router = useRouter();
  const { data: session, status } = useSession();
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
      { color: "#ddd6cb" },
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
      { x: [-10, 0, 10, 0], color: "#FA8072" },
      { type: "spring", duration: 0.3, delay: stagger(0.05) }
    );
  };

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const user = Object.fromEntries(fd.entries());

    let email = user.email_address.trim().toLowerCase();
    let first = user.first_name.trim().toLowerCase();
    let last = user.last_name.trim().toLowerCase();
    let password = user.password.trim();

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
          <form className={style.form} onSubmit={handleSubmit} ref={scope}>
            <div className={style.cont_container}>
              <div className={style.input_container}>
                <label
                  className={style.label}
                  htmlFor="line_one"
                  id="labeline_one"
                >
                  Your Email Address
                </label>
                <input
                  placeholder="e.g. 156 ashgrove"
                  className={style.input}
                  type="text"
                  id="line_one"
                  name="line_one"
                  onFocus={handleFocus}
                />
                <label
                  className={style.label}
                  htmlFor="line_two"
                  id="labline_two"
                >
                  Password
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
              <div className={style.input_container}>
                <label
                  className={style.label}
                  htmlFor="town_city"
                  id="labtown_city"
                >
                  First Name
                </label>
                <input
                  placeholder="e.g. Dublin 12"
                  className={style.input}
                  type="text"
                  id="town_city"
                  name="town_city"
                  onFocus={handleFocus}
                />
                <label
                  className={style.label}
                  htmlFor="constry_state"
                  id="labconstry_state"
                >
                  Last Name
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
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 150 }}
              className={style.button}
            >
              Continue
            </motion.button>
          </form>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default UserSignIn;
