import { motion, AnimatePresence } from "framer-motion";
import { isEmailValid, isPasswordValid } from "@/helpers/functions";
import { useInputAnimation } from "@/hooks/useInput";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { inpuReg } from "@/components/ui/formInput/inputInfo";
import { useNotification } from "@/hooks/useNotification";
import Input from "../ui/formInput/input";
import style from "./UserLogin.module.css";

function UserLogin({ handling, LoginBack }) {
  const router = useRouter();
  const { data: session } = useSession();
  const { focus, empty, scope } = useInputAnimation();
  const { handle } = useNotification();
  let user;
  const fields = [];
  fields.push(inpuReg[2]);
  fields.push(inpuReg[3]);
  const fieldNames = [
    { label: "labemail_address", input: "email_address" },
    { label: "labpassword", input: "password" },
  ];

  function handleClick(e) {
    e.preventDefault();
    router.replace("/user/signIn");
  }

  function loginHandler(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    user = Object.fromEntries(fd.entries());
    let entries = [];
    let index = 0;
    let check = 0;
    entries[0] = user.email_address.trim().toLowerCase();
    entries[1] = user.password.trim();

    entries.map((field) => {
      if (!field) {
        empty(fieldNames[index]);
        check++;
      }
      index++;
    });

    if (check > 0) return;

    if (!isEmailValid(entries[0])) {
      handle("email");
      empty(fieldNames[0]);

      return;
    } else if (!isPasswordValid(entries[1])) {
      handle("password");
      empty(fieldNames[1]);

      return;
    } else if (isEmailValid(entries[0]) && isPasswordValid(entries[1])) {
      handling(entries[0], entries[1]);
    }
  }

  useEffect(() => {
    if (LoginBack?.message) {
      if (LoginBack.message.slice(0, 5) === "Could") {
        handle(
          null,
          "email might not be right, Or user has not been registered",
          "Not Found"
        );
        empty(fieldNames[0]);
        return;
      } else if (LoginBack.message.slice(0, 5) === "Wrong") {
        empty(fieldNames[1]);
        handle(null, "wrong password", null);
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
        <motion.div
          key={1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className={style.h2_container}
        >
          <p className={style.paragraph}>Already Registered?</p>
          <p className={style.paragraph}>New User?</p>
        </motion.div>
        <div className={style.container}>
          <motion.form
            key={2}
            initial={{ x: -15, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className={style.form}
            onSubmit={loginHandler}
            ref={scope}
          >
            <div className={style.cont_container}>
              {fields.map((inp) => (
                <Input
                  key={inp.id}
                  id={inp.id}
                  ph={inp.ph}
                  typeI={inp.typeI}
                  handleFocus={focus}
                />
              ))}
            </div>
            <motion.button
              key={3}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 150 }}
              className={style.button}
            >
              Sign in Securely
            </motion.button>
          </motion.form>

          <motion.form
            key={4}
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
            <motion.button
              key={5}
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
