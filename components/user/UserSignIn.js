import { AnimatePresence, motion, useAnimate, stagger } from "framer-motion";
import {  useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import style from "./UserSignIn.module.css";
import NotificationContext from "@/store/notification-context";
import { isEmailValid, isNameValid, isPasswordValid } from "@/utils/functions";

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

    first = first[0].toUpperCase() + first.slice(1);
    last = last[0].toUpperCase() + last.slice(1);

    email = isEmailValid(user.email_address);
    const name = isNameValid(first + " " + last);
    password = isPasswordValid(user.password);

    if (!email) {
      user.email_address = "";
      hadleNotification("email");
      handleEmpty("labemail_address", "email_address");
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

  console.log("feedBack");
  console.log(feedBack);

  useEffect(() => {
    if (feedBack?.message) {
      notificationCtx.showNotification({
        title: "Invalid Action:",
        message: feedBack.message,
        status: "error",
      });
      return;
    } else if(feedBack?.email_address) {
      notificationCtx.showNotification({
        title: "Registered:",
        message: "User registered successfully!",
        status: "success",
      });

        router.replace("/");

    
    }
  }, [feedBack]);

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
                  htmlFor="email_address"
                  id="labemail_address"
                >
                  Your Email Address
                </label>
                <input
                  placeholder="e.g. stephenking@lorem.com"
                  className={style.input}
                  type="email"
                  id="email_address"
                  name="email_address"
                  onFocus={handleFocus}
                />
                <label
                  className={style.label}
                  htmlFor="password"
                  id="labpassword"
                >
                  Password
                </label>
                <input
                  placeholder="Minimum of eight characters"
                  className={style.input}
                  type="text"
                  id="password"
                  name="password"
                  onFocus={handleFocus}
                />
              </div>
              <div className={style.input_container}>
                <label
                  className={style.label}
                  htmlFor="first_name"
                  id="labfirst_name"
                >
                  First Name
                </label>
                <input
                  placeholder="e.g. Stephen"
                  className={style.input}
                  type="text"
                  id="first_name"
                  name="first_name"
                  onFocus={handleFocus}
                />
                <label
                  className={style.label}
                  htmlFor="last_name"
                  id="lablast_name"
                >
                  Last Name
                </label>
                <input
                  placeholder="e.g. King"
                  className={style.input}
                  type="text"
                  id="last_name"
                  name="last_name"
                  onFocus={handleFocus}
                />
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 150 }}
              className={style.button}
            >
              Register
            </motion.button>
          </form>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default UserSignIn;
