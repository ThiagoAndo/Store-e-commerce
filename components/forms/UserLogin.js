import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { inpuReg } from "@/components/ui/formInput/inputInfo";
import { useNotification } from "@/hooks/useNotification";
import Input from "../ui/formInput/input";
import useForm from "@/hooks/useForm";
import {
  fieldRegister,
} from "@/components/ui/formInput/inputInfo";

import style from "./UserLogin.module.css";

function UserLogin({ handling, LoginBack }) {
  const { scope, focus, getEvent } = useForm();
  const router = useRouter();
  const { data: session } = useSession();
  const { notification } = useNotification();
  const fields = [];
  fields.push(inpuReg[2]);
  fields.push(inpuReg[3]);
  const fieldNames = [];
  fieldNames.push(fieldRegister[2]);
  fieldNames.push(fieldRegister[3]);

  function handleClick(e) {
    e.preventDefault();
    router.replace("/user/signIn");
  }

  function loginHandler(e) {
    const { login, data } = getEvent(e, false, true, false);
    login && handling(data);
   
  }

  useEffect(() => {
    const isOrdering = localStorage.getItem("order");
    if (LoginBack?.message) {
      if (LoginBack.message.slice(0, 5) === "Could") {
        notification(
          null,
          "email might not be right, Or user has not been registered",
          "Not Found"
        );
        empty(fieldNames[0]);
        return;
      } else if (LoginBack.message.slice(0, 5) === "Wrong") {
        empty(fieldNames[1]);
        notification(null, "wrong password", null);
        return;
      }
    }
    if (session && !isOrdering) {
      router.replace("/");
    } else if (session && isOrdering) {
      router.replace("/checkout");
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
