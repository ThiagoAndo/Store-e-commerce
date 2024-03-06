import { useRef, useContext, useEffect } from "react";
import { useAnimate, stagger, motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { isEmailValid, isPasswordValid } from "@/utils/functions";
import NotificationContext from "@/store/notification-context";

import style from "./UserLogin.module.css";

function UserLogin({ handling, LoginBack }) {
  const notificationCtx = useContext(NotificationContext);
  const emailInputRef = useRef();
  const passwortInputRef = useRef();
  const [scope, animate] = useAnimate();
  const router = useRouter();
  const { data: session, status } = useSession();

  function handleClick(e) {
    e.preventDefault();
    router.replace("/user/signIn");
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
    const inp = "#" + input;

    animate(
      inp,
      { x: [-10, 0, 10, 0], background: "#FA8072", color: "#FA8072" },
      { type: "spring", duration: 0.3, delay: stagger(0.05) }
    );

    animate(
      "#" + label,
      { x: [-10, 0, 10, 0], color: "#FA8072" },
      { type: "spring", duration: 0.3, delay: stagger(0.05) }
    );
  };

  function loginHandler(e) {
    e.preventDefault();
    let email = emailInputRef.current.value.trim().toLowerCase();
    let password = passwortInputRef.current.value.trim();

    function hadleNotification(field) {
      notificationCtx.showNotification({
        title: "Wrong Input:",
        message: `Your ${field} is not valid. Make sure to enter a valid one!.`,
        status: "error",
      });
    }

    if (!email && !password) {
      handleEmpty("labEmail", "Email");
      handleEmpty("labPassword", "Password");
      return;
    } else if (!email) {
      handleEmpty("labEmail", "Email");
      return;
    } else if (!password) {
      handleEmpty("labPassword", "Password");
      return;
    }

    if (!isEmailValid(email) ) {
      hadleNotification("email");
      handleEmpty("labEmail", "Email");

      return;
    } else if (!isPasswordValid(password)) {
      hadleNotification("password");
      handleEmpty("labPassword", "Password");

      return;
    } else if (isEmailValid(email) && isPasswordValid(password)) {
      handling(email, password);
    }
  }

  useEffect(() => {
    if(LoginBack?.message){
      notificationCtx.showNotification({
        title: "Not Found:",
        message: LoginBack.message ,
        status: "error",
      });

    if (LoginBack.message.slice(0, 5) === "Could") {
      handleEmpty("labEmail", "Email");
      emailInputRef.current.value = "";
      return;
    } else if (LoginBack.message.slice(0, 5) === "Wrong") {
      handleEmpty("labPassword", "Password");
      passwortInputRef.current.value = "";
      return;
    }
  }
    if (session) {
      router.replace("/");
    }
  }, [LoginBack, session]);

  return (
    <>
      <AnimatePresence>
        <motion.div key={1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className={style.h2_container}
        >
          <p className={style.paragraph}>Already Registered?</p>
          <p className={style.paragraph}>New User?</p>
        </motion.div>
        <div className={style.container}>
          <motion.form key={2}
            initial={{ x: -15, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className={style.form}
            onSubmit={loginHandler}
            ref={scope}
          >
            <div className={style.cont_container}>
              <label className={style.label} htmlFor="email" id="labEmail">
                Your Email Address
              </label>
              <input
                placeholder="e.g. stephenking@lorem.com"
                className={style.input}
                type="text"
                id="Email"
                ref={emailInputRef}
                onFocus={handleFocus}
              />
              <label
                className={style.label}
                htmlFor="password"
                id="labPassword"
              >
                Password
              </label>
              <input
                placeholder="Minimum of eight characters"
                className={style.input}
                type="text"
                id="Password"
                ref={passwortInputRef}
                onFocus={handleFocus}
              />
            </div>
            <motion.button key={3}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 150 }}
              className={style.button}
            >
              Sign in Securely{" "}
            </motion.button>
          </motion.form>

          <motion.form key={4}
            initial={{ x: 15, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className={style.form}
          >
            <div className={style.cont_container}>
              <h3>✔ Receive special offers and promotions.</h3>
              <h3>✔ Speed your way through checkout.</h3>
              <h3>✔ View your order history and your current addresses.</h3>
              <h3>✔ Access your saved items. </h3>
              <h3>✔ Instant access to your account.</h3>
            </div>
            <motion.button key={5}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 150 }}
              className={style.button}
              onClick={handleClick}
            >
              Continue Securely
            </motion.button>
          </motion.form>
        </div>
      </AnimatePresence>
    </>
  );
}

export default UserLogin;
