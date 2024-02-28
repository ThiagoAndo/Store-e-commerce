import { useRef, useContext, useEffect, useState } from "react";
import { useAnimate, stagger } from "framer-motion";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { isEmailValid, isPasswordValid } from "@/utils/functions";
import NotificationContext from "@/store/notification-context";

import style from "./UserLogin.module.css";

function UserLogin({ handling, feedback }) {
  const notificationCtx = useContext(NotificationContext);
  const emailInputRef = useRef();
  const passwortInputRef = useRef();
  const [scope, animate] = useAnimate();
  const router = useRouter();
  const { data: session, status } = useSession();

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
    console.log(inp);

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
    let email = emailInputRef.current.value;
    let password = passwortInputRef.current.value;

    function hadleNotification(field) {
      notificationCtx.showNotification({
        title: "Wrong Input:",
        message: `Your ${field} is not valid. Make sure to enter a valid one!.`,
        status: "error",
      });
    }

    if (!email.trim() && !password.trim()) {
      handleEmpty("labEmail", "Email");
      handleEmpty("labPassword", "Password");
      return;
    } else if (!email.trim()) {
      handleEmpty("labEmail", "Email");
      return;
    } else if (!password.trim()) {
      handleEmpty("labPassword", "Password");
      return;
    }

    if (!isEmailValid(email) || feedback.slice(0, 4) === "Could") {
      hadleNotification("email");
      handleEmpty("labEmail", "Email");

      return;
    } else if (!isPasswordValid(password) || feedback.slice(0, 4) === "Wrong") {
      hadleNotification("password");
      handleEmpty("labPassword", "Password");

      return;
    } else if (isEmailValid(email) && isPasswordValid(password)) {
      handling(email, password);
    }
  }

  useEffect(() => {
    if (feedback != "") {
      notificationCtx.showNotification({
        title: "Not Found:",
        message: feedback,
        status: "error",
      });
    }

    if (feedback.slice(0, 5) === "Could") {
      handleEmpty("labEmail", "Email");
      emailInputRef.current.value = "";
      return;
    } else if (feedback.slice(0, 5) === "Wrong") {
      handleEmpty("labPassword", "Password");
      passwortInputRef.current.value = "";

      return;
    }

    if (session) {
      router.replace("/");
    }
  }, [feedback, session]);

  return (
    <>
      <div className={style.h2_container}>
        <p className={style.paragraph}>Already Registered?</p>
        <p className={style.paragraph}>New User?</p>
      </div>
      <div className={style.container}>
        <form className={style.form} onSubmit={loginHandler} ref={scope}>
          <label className={style.label} htmlFor="email" id="labEmail">
            Your Email Address
          </label>
          <br />
          <input
            className={style.input}
            type="text"
            id="Email"
            ref={emailInputRef}
            onFocus={handleFocus}
          />
          <br />
          <label className={style.label} htmlFor="password" id="labPassword">
            Password
          </label>
          <br />
          <input
            className={style.input}
            type="text"
            id="Password"
            ref={passwortInputRef}
            onFocus={handleFocus}
          />
          <br />
          <button className={style.button}>Sign in Securely </button>
        </form>

        <form className={style.form}>
          <h3>✔ Receive special offers and promotions.</h3>
          <h3>✔ Speed your way through checkout.</h3>
          <h3>✔ View your order history and your current addresses.</h3>
          <h3>✔ Access your saved items. </h3>
          <h3>✔ Instant access to your account.</h3>
          <button className={style.button}>Sign in Securely </button>
        </form>
      </div>
    </>
  );
}

export default UserLogin;
